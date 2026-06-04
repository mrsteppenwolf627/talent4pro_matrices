import { useCallback, useEffect, useRef, useState } from 'react'
import { supabase } from '@/lib/supabase-client'
import { IKIGAI_QUADRANTS } from '@/data/ikigaiQuadrants'
import type { QuadrantId } from '@/data/ikigaiQuadrants'
import type { MatrixData, MatrixMetadata } from '@/lib/types'

export type IkigaiData = Record<QuadrantId | 'ikigai', string>

interface IkigaiState {
  metadata: MatrixMetadata | null
  data: IkigaiData
  loading: boolean
  saving: boolean
  error: string | null
  isDirty: boolean
  lastSaved: Date | null
}

const AUTO_SAVE_MS = 30_000
const IKIGAI_KEYS = [...IKIGAI_QUADRANTS.map(q => q.id), 'ikigai'] as const

// ── Converters ────────────────────────────────────────────────────────────────

function cellsToIkigaiData(cells: MatrixData[]): IkigaiData {
  const data: IkigaiData = { passion: '', profession: '', mission: '', vocation: '', ikigai: '' }
  for (const cell of cells) {
    if (cell.column_key === 'value' && cell.row_key in data) {
      (data as Record<string, string>)[cell.row_key] = String(cell.content.value ?? '')
    }
  }
  return data
}

function ikigaiDataToCells(data: IkigaiData) {
  return IKIGAI_KEYS.map(key => ({
    row_key: key,
    column_key: 'value',
    content: { value: data[key] ?? '', type: 'text' as const },
  }))
}

// ── Auto-synthesis ────────────────────────────────────────────────────────────

export function generateIkigaiSynthesis(data: IkigaiData): string {
  const filled = IKIGAI_QUADRANTS.filter(q => data[q.id]?.trim())
  if (filled.length < 4) return ''

  // Extract first meaningful line from each quadrant (up to 60 chars)
  const firstLine = (text: string) =>
    text.split('\n').find(l => l.trim())?.trim().slice(0, 60) ?? ''

  const passion    = firstLine(data.passion)
  const profession = firstLine(data.profession)
  const mission    = firstLine(data.mission)
  const vocation   = firstLine(data.vocation)

  return (
    `Mi Ikigai está en la intersección de lo que amo (${passion}), ` +
    `lo que el mundo necesita (${mission}), ` +
    `lo que se me da bien (${vocation}) ` +
    `y por lo que me pagan (${profession}).`
  )
}

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useIkigai(matrixId: string) {
  const [state, setState] = useState<IkigaiState>({
    metadata: null,
    data: { passion: '', profession: '', mission: '', vocation: '', ikigai: '' },
    loading: true,
    saving: false,
    error: null,
    isDirty: false,
    lastSaved: null,
  })

  const dataRef = useRef<IkigaiData>({ passion: '', profession: '', mission: '', vocation: '', ikigai: '' })
  const isDirtyRef = useRef(false)
  dataRef.current = state.data
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
      const data = cellsToIkigaiData((json.cells ?? []) as MatrixData[])

      setState(prev => ({
        ...prev,
        metadata: json.metadata ?? null,
        data,
        loading: false,
        isDirty: false,
      }))
    } catch (err) {
      setState(prev => ({ ...prev, loading: false, error: (err as Error).message }))
    }
  }, [matrixId, getToken])

  useEffect(() => { loadData() }, [loadData])

  // ── Update quadrant ─────────────────────────────────────────────────────────

  const updateQuadrant = useCallback((id: QuadrantId, value: string) => {
    setState(prev => ({
      ...prev,
      data: { ...prev.data, [id]: value },
      isDirty: true,
    }))
  }, [])

  const updateCenter = useCallback((value: string) => {
    setState(prev => ({
      ...prev,
      data: { ...prev.data, ikigai: value },
      isDirty: true,
    }))
  }, [])

  // ── Save ────────────────────────────────────────────────────────────────────

  const saveData = useCallback(async (silent = false) => {
    if (!isDirtyRef.current) return
    if (!silent) setState(prev => ({ ...prev, saving: true, error: null }))

    try {
      const token = await getToken()
      const cells = ikigaiDataToCells(dataRef.current)

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

  // ── Derived ─────────────────────────────────────────────────────────────────

  const filledQuadrants = IKIGAI_QUADRANTS.filter(q => state.data[q.id]?.trim()).length
  const autoSynthesis = generateIkigaiSynthesis(state.data)

  return {
    metadata: state.metadata,
    data: state.data,
    loading: state.loading,
    saving: state.saving,
    error: state.error,
    isDirty: state.isDirty,
    lastSaved: state.lastSaved,
    filledQuadrants,
    totalQuadrants: IKIGAI_QUADRANTS.length,
    autoSynthesis,
    updateQuadrant,
    updateCenter,
    saveData: () => saveData(false),
    loadData,
  }
}
