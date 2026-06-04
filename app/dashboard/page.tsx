'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'

export default function DashboardPage() {
  const { user, loading, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login')
    }
  }, [user, loading, router])

  const handleLogout = async () => {
    await logout()
    router.push('/')
    router.refresh()
  }

  if (loading) {
    return <div className="loading">Cargando...</div>
  }

  if (!user) {
    return null
  }

  const displayName = user.user_metadata?.name || user.email

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Talent4Pro Matrices</h1>
        <div className="user-info">
          <span>Bienvenido, {displayName}</span>
          <button onClick={handleLogout} className="btn-secondary">
            Cerrar Sesión
          </button>
        </div>
      </header>

      <section className="dashboard-content">
        <h2>Panel Principal</h2>
        <p>Aquí aparecerán tus matrices de evaluación de talento.</p>
        <Link href="/matrices" className="btn-primary">
          Ver Matrices →
        </Link>
      </section>
    </div>
  )
}
