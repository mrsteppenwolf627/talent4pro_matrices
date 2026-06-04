import { useCallback, useEffect, useRef, useState } from 'react'
import { supabase } from '@/lib/supabase-client'
import type { MatrixData, MatrixMetadata, CellContent } from '@/lib/types'

interface MatrixState {
  metadata: MatrixMetadata | null
  data: MatrixData[]
  loading: boolean
  saving: boolean
  error: string | null
  isDirty: boolean
  lastSaved: Date | null
}

const AUTO_SAVE_INTERVAL_MS = 30_000

export function useMatrix(matrixId: string) {
  const [state, setState] = useState<MatrixState>({
    metadata: null,
    data: [],
    loading: true,
    saving: false,
    error: null,
    isDirty: false,
    lastSaved: null,
  })

  // Keep a mutable ref for auto-save so the interval always sees latest state
  const dataRef = useRef<MatrixData[]>([])
  const isDirtyRef = useRef(false)
  dataRef.current = state.data
  isDirtyRef.current = state.isDirty

  // Helper: get current session token for API calls
  const getToken = useCallback(async (): Promise<string | null> => {
    const { data: { session } } = await supabase.auth.getSession()
    return session?.access_token ?? null
  }, [])

  // ─── Load ──────────────────────────────────────────────────────────────────

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
      setState(prev => ({
        ...prev,
        metadata: json.metadata ?? null,
        data: json.cells ?? [],
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
  }, [matrixId])

  useEffect(() => {
    loadData()
  }, [loadData])

  // ─── Update cell (local only, marks dirty) ─────────────────────────────────

  const updateCell = useCallback(
    (rowKey: string, colKey: string, value: CellContent['value']) => {
      setState(prev => {
        const existingIndex = prev.data.findIndex(
          d => d.row_key === rowKey && d.column_key === colKey
        )

        let nextData: MatrixData[]

        if (existingIndex >= 0) {
          nextData = prev.data.map((cell, i) =>
            i === existingIndex
              ? {
                  ...cell,
                  content: { ...cell.content, value },
                  version: cell.version + 1,
                  updated_at: new Date().toISOString(),
                }
              : cell
          )
        } else {
          // New cell — will be created on save
          const newCell: MatrixData = {
            id: `temp_${rowKey}_${colKey}_${Date.now()}`,
            matrix_id: matrixId,
            row_key: rowKey,
            column_key: colKey,
            content: { value, type: 'text' },
            version: 1,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          }
          nextData = [...prev.data, newCell]
        }

        return { ...prev, data: nextData, isDirty: true }
      })
    },
    [matrixId]
  )

  // ─── Save (explicit or auto-save) ─────────────────────────────────────────

  const saveMatrix = useCallback(async (silent = false) => {
    if (!isDirtyRef.current) return

    if (!silent) {
      setState(prev => ({ ...prev, saving: true, error: null }))
    }

    try {
      const token = await getToken()
      const res = await fetch(`/api/matrices/${matrixId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ cells: dataRef.current }),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error ?? `Error ${res.status}`)
      }

      const json = await res.json()

      setState(prev => ({
        ...prev,
        data: json.cells ?? prev.data,
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

  // ─── Auto-save every 30s ───────────────────────────────────────────────────

  useEffect(() => {
    const timer = setInterval(() => {
      if (isDirtyRef.current) {
        saveMatrix(true)
      }
    }, AUTO_SAVE_INTERVAL_MS)

    return () => clearInterval(timer)
  }, [saveMatrix])

  return {
    metadata: state.metadata,
    data: state.data,
    loading: state.loading,
    saving: state.saving,
    error: state.error,
    isDirty: state.isDirty,
    lastSaved: state.lastSaved,
    updateCell,
    saveMatrix: () => saveMatrix(false),
    loadData,
  }
}
