import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase-client'
import type { User, Session } from '@supabase/supabase-js'

interface AuthState {
  user: User | null
  session: Session | null
  loading: boolean
  error: Error | null
}

export function useAuth() {
  const [auth, setAuth] = useState<AuthState>({
    user: null,
    session: null,
    loading: true,
    error: null
  })

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuth(prev => ({
        ...prev,
        session,
        user: session?.user || null,
        loading: false
      }))
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setAuth(prev => ({
          ...prev,
          session,
          user: session?.user || null
        }))
      }
    )

    return () => subscription?.unsubscribe()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      if (error) throw error
      return { success: true, data }
    } catch (error) {
      setAuth(prev => ({ ...prev, error: error as Error }))
      return { success: false, error }
    }
  }

  const register = async (email: string, password: string, name: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name } }
      })
      if (error) throw error
      return { success: true, data }
    } catch (error) {
      setAuth(prev => ({ ...prev, error: error as Error }))
      return { success: false, error }
    }
  }

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      return { success: true }
    } catch (error) {
      setAuth(prev => ({ ...prev, error: error as Error }))
      return { success: false, error }
    }
  }

  return {
    ...auth,
    login,
    register,
    logout
  }
}
