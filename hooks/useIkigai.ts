import { useCallback, useEffect, useRef, useState } from 'react'
import { supabase } from '@/lib/supabase-client'
import type { MatrixData, MatrixMetadata } from '@/lib/types'

// Structure: Record<QuadrantId, Record<QuestionIndex, Answer>>
export interface IkigaiData {
  passion: Record<number, string>
  vocation: Record<number, string>
  mission: Record<number, string>
  profession: Record<number, string>
  ikigai: string
}

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
const COL_KEY = 'content'

export function useIkigai(matrixId: string) {
  const [state, setState] = useState<IkigaiState>({
    metadata: null,
    data: {
      passion: {},
      vocation: {},
      mission: {},
      profession: {},
      ikigai: ''
    },
    loading: true,
    saving: false,
    error: null,
    isDirty: false,
    lastSaved: null,
  })

  const dataRef = useRef(state.data)
  const isDirtyRef = useRef(state.isDirty)
  
  useEffect(() => {
    dataRef.current = state.data
    isDirtyRef.current = state.isDirty
  }, [state.data, state.isDirty])

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
      
      const data: IkigaiData = {
        passion: {},
        vocation: {},
        mission: {},
        profession: {},
        ikigai: ''
      }

      for (const cell of cells) {
        if (cell.column_key === COL_KEY) {
          if (cell.row_key === 'ikigai') {
            data.ikigai = String(cell.content.value ?? '')
          } else if (cell.row_key.startsWith('q_')) {
            // Format: q_quadrantId_index
            const parts = cell.row_key.split('_')
            if (parts.length === 3) {
              const quadrant = parts[1] as keyof IkigaiData
              const index = parseInt(parts[2], 10)
              if (data.hasOwnProperty(quadrant) && !isNaN(index)) {
                data[quadrant][index] = String(cell.content.value ?? '')
              }
            }
          }
        }
      }

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

  // ── Actions ─────────────────────────────────────────────────────────────────

  const updateQuestionAnswer = useCallback((quadrant: keyof Omit<IkigaiData, 'ikigai'>, index: number, value: string) => {
    setState(prev => ({
      ...prev,
      data: {
        ...prev.data,
        [quadrant]: { ...prev.data[quadrant], [index]: value }
      },
      isDirty: true
    }))
  }, [])

  const updateIkigai = useCallback((value: string) => {
    setState(prev => ({
      ...prev,
      data: { ...prev.data, ikigai: value },
      isDirty: true
    }))
  }, [])

  const saveData = useCallback(async (silent = false) => {
    if (!isDirtyRef.current) return
    if (!silent) setState(prev => ({ ...prev, saving: true, error: null }))

    try {
      const token = await getToken()
      const cells: any[] = []
      
      // Add quadrant answers
      Object.entries(dataRef.current).forEach(([quadrant, val]) => {
        if (quadrant === 'ikigai') return
        
        Object.entries(val as Record<number, string>).forEach(([index, answer]) => {
          cells.push({
            row_key: `q_${quadrant}_${index}`,
            column_key: COL_KEY,
            content: { value: answer, type: 'text' as const },
          })
        })
      })

      // Add ikigai synthesis
      cells.push({
        row_key: 'ikigai',
        column_key: COL_KEY,
        content: { value: dataRef.current.ikigai, type: 'text' as const },
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

  return {
    metadata: state.metadata,
    data: state.data,
    loading: state.loading,
    saving: state.saving,
    error: state.error,
    isDirty: state.isDirty,
    lastSaved: state.lastSaved,
    updateQuestionAnswer,
    updateIkigai,
    saveData: () => saveData(false),
  }
}
