import { useCallback, useEffect, useRef, useState } from 'react'
import { supabase } from '@/lib/supabase-client'
import { FICHA_SECTIONS, TOTAL_FIELDS } from '@/data/fichaDefinicionFields'
import type { MatrixData, MatrixMetadata } from '@/lib/types'

export type FichaData = Record<string, string>

interface FichaState {
  metadata: MatrixMetadata | null
  data: FichaData
  loading: boolean
  saving: boolean
  error: string | null
  isDirty: boolean
  lastSaved: Date | null
}

const AUTO_SAVE_MS = 30_000

// ── Converters ────────────────────────────────────────────────────────────────

function cellsToFichaData(cells: MatrixData[]): FichaData {
  return cells.reduce<FichaData>((acc, cell) => {
    if (cell.column_key === 'value') {
      acc[cell.row_key] = String(cell.content.value ?? '')
    }
    return acc
  }, {})
}

function fichaDataToCells(data: FichaData): Array<{
  row_key: string
  column_key: string
  content: { value: string; type: 'text' }
}> {
  return Object.entries(data)
    .filter(([key]) =>
      FICHA_SECTIONS.some(s => s.fields.some(f => f.key === key))
    )
    .map(([key, value]) => ({
      row_key: key,
      column_key: 'value',
      content: { value, type: 'text' as const },
    }))
}

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useFichaDefinicion(matrixId: string) {
  const [state, setState] = useState<FichaState>({
    metadata: null,
    data: {},
    loading: true,
    saving: false,
    error: null,
    isDirty: false,
    lastSaved: null,
  })

  const dataRef = useRef<FichaData>({})
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
      const fichaData = cellsToFichaData((json.cells ?? []) as MatrixData[])

      setState(prev => ({
        ...prev,
        metadata: json.metadata ?? null,
        data: fichaData,
        loading: false,
        isDirty: false,
      }))
    } catch (err) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: (err as Error).message,
      }))
    }
  }, [matrixId, getToken])

  useEffect(() => { loadData() }, [loadData])

  // ── Update field (local, marks dirty) ──────────────────────────────────────

  const updateField = useCallback((key: string, value: string) => {
    setState(prev => ({
      ...prev,
      data: { ...prev.data, [key]: value },
      isDirty: true,
    }))
  }, [])

  // ── Save ────────────────────────────────────────────────────────────────────

  const saveData = useCallback(async (silent = false) => {
    if (!isDirtyRef.current) return

    if (!silent) setState(prev => ({ ...prev, saving: true, error: null }))

    try {
      const token = await getToken()
      const cells = fichaDataToCells(dataRef.current)

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
    const timer = setInterval(() => {
      if (isDirtyRef.current) saveData(true)
    }, AUTO_SAVE_MS)
    return () => clearInterval(timer)
  }, [saveData])

  // ── Progress ────────────────────────────────────────────────────────────────

  const filledCount = Object.values(state.data).filter(v => v.trim()).length
  const progressPct = Math.round((filledCount / TOTAL_FIELDS) * 100)

  return {
    metadata: state.metadata,
    data: state.data,
    loading: state.loading,
    saving: state.saving,
    error: state.error,
    isDirty: state.isDirty,
    lastSaved: state.lastSaved,
    filledCount,
    totalFields: TOTAL_FIELDS,
    progressPct,
    updateField,
    saveData: () => saveData(false),
    loadData,
  }
}
