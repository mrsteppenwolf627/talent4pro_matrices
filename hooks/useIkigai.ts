import { useCallback, useEffect, useRef, useState } from 'react'
import { supabase } from '@/lib/supabase-client'
import type { MatrixData, MatrixMetadata } from '@/lib/types'

interface IkigaiValues {
  passion: string
  vocation: string
  mission: string
  profession: string
  ikigai: string
}

interface IkigaiState {
  metadata: MatrixMetadata | null
  values: IkigaiValues
  loading: boolean
  saving: boolean
  error: string | null
  isDirty: boolean
  lastSaved: Date | null
}

const AUTO_SAVE_MS = 30_000
const COL_KEY = 'content'

export function useIkigai(matrixId: string) {
  const [state, setState] = useState<IkigaiState>({
    metadata: null,
    values: {
      passion: '',
      vocation: '',
      mission: '',
      profession: '',
      ikigai: ''
    },
    loading: true,
    saving: false,
    error: null,
    isDirty: false,
    lastSaved: null,
  })

  const valuesRef = useRef(state.values)
  const isDirtyRef = useRef(state.isDirty)
  
  useEffect(() => {
    valuesRef.current = state.values
    isDirtyRef.current = state.isDirty
  }, [state.values, state.isDirty])

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
      
      const values: IkigaiValues = {
        passion: '',
        vocation: '',
        mission: '',
        profession: '',
        ikigai: ''
      }

      for (const cell of cells) {
        if (cell.column_key === COL_KEY && values.hasOwnProperty(cell.row_key)) {
          values[cell.row_key as keyof IkigaiValues] = String(cell.content.value ?? '')
        }
      }

      setState(prev => ({
        ...prev,
        metadata: json.metadata ?? null,
        values,
        loading: false,
        isDirty: false,
      }))
    } catch (err) {
      setState(prev => ({ ...prev, loading: false, error: (err as Error).message }))
    }
  }, [matrixId, getToken])

  useEffect(() => { loadData() }, [loadData])

  // ── Actions ─────────────────────────────────────────────────────────────────

  const updateQuadrant = useCallback((id: keyof IkigaiValues, value: string) => {
    setState(prev => ({
      ...prev,
      values: { ...prev.values, [id]: value },
      isDirty: true
    }))
  }, [])

  const saveData = useCallback(async (silent = false) => {
    if (!isDirtyRef.current) return
    if (!silent) setState(prev => ({ ...prev, saving: true, error: null }))

    try {
      const token = await getToken()
      const cells = Object.entries(valuesRef.current).map(([key, value]) => ({
        row_key: key,
        column_key: COL_KEY,
        content: { value, type: 'text' as const },
      }))

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

  return {
    metadata: state.metadata,
    values: state.values,
    loading: state.loading,
    saving: state.saving,
    error: state.error,
    isDirty: state.isDirty,
    lastSaved: state.lastSaved,
    updateQuadrant,
    saveData: () => saveData(false),
  }
}
