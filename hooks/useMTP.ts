import { useCallback, useEffect, useRef, useState } from 'react'
import { supabase } from '@/lib/supabase-client'
import { MTP_AREAS } from '@/data/mtpAreas'
import type { MatrixData, MatrixMetadata } from '@/lib/types'

export interface MTPValidationResult {
  isValid: boolean
  message: string
  errors: string[]
  mtpDefinition: string
}

type Scores = Record<number, number>

interface MTPState {
  metadata: MatrixMetadata | null
  scores: Scores
  mtpText: string
  loading: boolean
  saving: boolean
  validating: boolean
  error: string | null
  isDirty: boolean
  lastSaved: Date | null
  validationResult: MTPValidationResult | null
}

const AUTO_SAVE_MS = 30_000
const SCORE_COL = 'score'
const MTP_TEXT_ROW = '__mtp_definition__'

// ── Converters ────────────────────────────────────────────────────────────────

function cellsToScores(cells: MatrixData[]): { scores: Scores; mtpText: string } {
  const scores: Scores = {}
  let mtpText = ''

  for (const cell of cells) {
    if (cell.column_key !== SCORE_COL) continue

    if (cell.row_key === MTP_TEXT_ROW) {
      mtpText = String(cell.content.value ?? '')
    } else {
      const areaId = parseInt(cell.row_key.replace('area_', ''), 10)
      if (!isNaN(areaId)) {
        scores[areaId] = Number(cell.content.value ?? 0)
      }
    }
  }

  return { scores, mtpText }
}

function scoresToCells(scores: Scores, mtpText: string) {
  const cells = Object.entries(scores).map(([areaId, value]) => ({
    row_key: `area_${areaId}`,
    column_key: SCORE_COL,
    content: { value, type: 'number' as const },
  }))

  cells.push({
    row_key: MTP_TEXT_ROW,
    column_key: SCORE_COL,
    content: { value: mtpText, type: 'text' as const },
  })

  return cells
}

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useMTP(matrixId: string) {
  const [state, setState] = useState<MTPState>({
    metadata: null,
    scores: {},
    mtpText: '',
    loading: true,
    saving: false,
    validating: false,
    error: null,
    isDirty: false,
    lastSaved: null,
    validationResult: null,
  })

  const scoresRef = useRef<Scores>({})
  const mtpTextRef = useRef('')
  const isDirtyRef = useRef(false)
  scoresRef.current = state.scores
  mtpTextRef.current = state.mtpText
  isDirtyRef.current = state.isDirty

  const getToken = useCallback(async () => {
    const { data: { session } } = await supabase.auth.getSession()
    return session?.access_token ?? null
  }, [])

  // ── Load ────────────────────────────────────────────────────────────────────

  const loadData = useCallback(async () => {
    if (!matrixId) return
    setState(prev => ({ ...prev, loading: true, error: null }))

    try {
      const token = await getToken()
      const res = await fetch(`/api/matrices/${matrixId}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      })
      if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`)

      const json = await res.json()
      const { scores, mtpText } = cellsToScores((json.cells ?? []) as MatrixData[])

      setState(prev => ({
        ...prev,
        metadata: json.metadata ?? null,
        scores,
        mtpText,
        loading: false,
        isDirty: false,
      }))
    } catch (err) {
      setState(prev => ({ ...prev, loading: false, error: (err as Error).message }))
    }
  }, [matrixId, getToken])

  useEffect(() => { loadData() }, [loadData])

  // ── Update score ────────────────────────────────────────────────────────────

  const updateScore = useCallback((areaId: number, value: number) => {
    setState(prev => ({
      ...prev,
      scores: { ...prev.scores, [areaId]: value },
      isDirty: true,
      // Reset validation when scores change
      validationResult: null,
    }))
  }, [])

  const updateMtpText = useCallback((text: string) => {
    setState(prev => ({ ...prev, mtpText: text, isDirty: true }))
  }, [])

  // ── Save ────────────────────────────────────────────────────────────────────

  const saveData = useCallback(async (silent = false) => {
    if (!isDirtyRef.current) return
    if (!silent) setState(prev => ({ ...prev, saving: true, error: null }))

    try {
      const token = await getToken()
      const cells = scoresToCells(scoresRef.current, mtpTextRef.current)

      const res = await fetch(`/api/matrices/${matrixId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ cells }),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error ?? `Error ${res.status}`)
      }

      setState(prev => ({
        ...prev,
        saving: false,
        isDirty: false,
        lastSaved: new Date(),
        error: null,
      }))
    } catch (err) {
      setState(prev => ({
        ...prev,
        saving: false,
        error: silent ? prev.error : (err as Error).message,
      }))
    }
  }, [matrixId, getToken])

  // ── Auto-save ───────────────────────────────────────────────────────────────

  useEffect(() => {
    const t = setInterval(() => { if (isDirtyRef.current) saveData(true) }, AUTO_SAVE_MS)
    return () => clearInterval(t)
  }, [saveData])

  // ── Validate MTP ────────────────────────────────────────────────────────────

  const validateMTP = useCallback(async () => {
    setState(prev => ({ ...prev, validating: true, error: null }))

    try {
      const token = await getToken()
      const res = await fetch(`/api/matrices/${matrixId}/validate-mtp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ scores: scoresRef.current }),
      })

      const json = await res.json()

      const result: MTPValidationResult = {
        isValid: json.isValid ?? false,
        message: json.message ?? '',
        errors: json.errors ?? [],
        mtpDefinition: json.mtpDefinition ?? '',
      }

      setState(prev => ({
        ...prev,
        validating: false,
        validationResult: result,
        // Pre-fill MTP text if generated and currently empty
        mtpText: prev.mtpText || result.mtpDefinition,
        isDirty: !prev.mtpText && !!result.mtpDefinition ? true : prev.isDirty,
      }))
    } catch (err) {
      setState(prev => ({
        ...prev,
        validating: false,
        error: (err as Error).message,
      }))
    }
  }, [matrixId, getToken])

  // ── Derived ────────────────────────────────────────────────────────────────

  const totalScore = Object.values(state.scores).reduce((s, v) => s + v, 0)
  const scoredAreas = Object.keys(state.scores).length
  const avgScore = scoredAreas > 0 ? totalScore / scoredAreas : 0

  return {
    metadata: state.metadata,
    scores: state.scores,
    mtpText: state.mtpText,
    loading: state.loading,
    saving: state.saving,
    validating: state.validating,
    error: state.error,
    isDirty: state.isDirty,
    lastSaved: state.lastSaved,
    validationResult: state.validationResult,
    totalScore,
    avgScore,
    scoredAreas,
    totalAreas: MTP_AREAS.length,
    updateScore,
    updateMtpText,
    saveData: () => saveData(false),
    validateMTP,
    loadData,
  }
}
