import { useCallback, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase-client'
import type { MatrixMetadata, CreateMatrixPayload } from '@/lib/types'

interface MatricesListState {
  matrices: MatrixMetadata[]
  loading: boolean
  creating: boolean
  error: string | null
}

export function useMatricesList() {
  const [state, setState] = useState<MatricesListState>({
    matrices: [],
    loading: true,
    creating: false,
    error: null,
  })

  const getToken = useCallback(async () => {
    const { data: { session } } = await supabase.auth.getSession()
    return session?.access_token ?? null
  }, [])

  const fetchMatrices = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }))

    try {
      const token = await getToken()
      if (!token) {
        setState(prev => ({ ...prev, loading: false, error: 'No authenticated session' }))
        return
      }

      const res = await fetch('/api/matrices/list', {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error ?? `Error ${res.status}`)
      }

      const json = await res.json()
      setState(prev => ({
        ...prev,
        matrices: json.data ?? [],
        loading: false,
      }))
    } catch (err) {
      setState(prev => ({ ...prev, loading: false, error: (err as Error).message }))
    }
  }, [getToken])

  useEffect(() => {
    fetchMatrices()
  }, [fetchMatrices])

  const createMatrix = async (payload: CreateMatrixPayload) => {
    setState(prev => ({ ...prev, creating: true, error: null }))

    try {
      const token = await getToken()
      if (!token) throw new Error('No authenticated session')

      const res = await fetch('/api/matrices/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error ?? `Error ${res.status}`)
      }

      const json = await res.json()
      setState(prev => ({ ...prev, creating: false }))
      return { success: true, id: json.id as string }
    } catch (err) {
      const error = (err as Error).message
      setState(prev => ({ ...prev, creating: false, error }))
      return { success: false, error }
    }
  }

  return {
    matrices: state.matrices,
    loading: state.loading,
    creating: state.creating,
    error: state.error,
    refresh: fetchMatrices,
    createMatrix,
  }
}
