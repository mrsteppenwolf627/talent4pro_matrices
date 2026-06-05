import { useCallback, useEffect, useRef, useState } from 'react'
import { supabase } from '@/lib/supabase-client'
import type { MatrixData, MatrixMetadata } from '@/lib/types'
import { MTP_AREAS_INTERNAL, MTP_AREAS_EXTERNAL } from '@/data/mtpAreasReal'

export interface MTPValidationResult {
  isValid: boolean
  message: string
  errors: string[]
  mtpDefinition: string
}

type Scores = Record<number, number>

interface MTPNewState {
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

export function useMTPNew(matrixId: string) {
  const [state, setState] = useState<MTPNewState>({
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
  
  useEffect(() => {
    scoresRef.current = state.scores
    mtpTextRef.current = state.mtpText
    isDirtyRef.current = state.isDirty
  }, [state.scores, state.mtpText, state.isDirty])

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
      if (!res.ok) throw new Error(`Error ${res.status}`)

      const json = await res.json()
      const cells = (json.cells ?? []) as MatrixData[]
      
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

  // ── Actions ─────────────────────────────────────────────────────────────────

  const updateScore = useCallback((areaId: number, value: number) => {
    setState(prev => ({
      ...prev,
      scores: { ...prev.scores, [areaId]: value },
      isDirty: true,
      validationResult: null,
    }))
  }, [])

  const updateMtpText = useCallback((text: string) => {
    setState(prev => ({ ...prev, mtpText: text, isDirty: true }))
  }, [])

  const saveData = useCallback(async (silent = false) => {
    if (!isDirtyRef.current) return
    if (!silent) setState(prev => ({ ...prev, saving: true, error: null }))

    try {
      const token = await getToken()
      const cells = Object.entries(scoresRef.current).map(([areaId, value]) => ({
        row_key: `area_${areaId}`,
        column_key: SCORE_COL,
        content: { value, type: 'number' as const },
      }))

      cells.push({
        row_key: MTP_TEXT_ROW,
        column_key: SCORE_COL,
        content: { value: mtpTextRef.current, type: 'text' as const },
      })

      const res = await fetch(`/api/matrices/${matrixId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ cells }),
      })

      if (!res.ok) throw new Error(`Error ${res.status}`)

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

  useEffect(() => {
    const t = setInterval(() => { if (isDirtyRef.current) saveData(true) }, AUTO_SAVE_MS)
    return () => clearInterval(t)
  }, [saveData])

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
        mtpText: prev.mtpText || result.mtpDefinition,
        isDirty: !prev.mtpText && !!result.mtpDefinition ? true : prev.isDirty,
      }))
    } catch (err) {
      setState(prev => ({ ...prev, validating: false, error: (err as Error).message }))
    }
  }, [matrixId, getToken])

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
    areasInternal: MTP_AREAS_INTERNAL,
    areasExternal: MTP_AREAS_EXTERNAL,
    updateScore,
    updateMtpText,
    saveData: () => saveData(false),
    validateMTP,
  }
}
