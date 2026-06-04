'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const { register, loading } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')
    setSuccessMsg('')

    if (password.length < 6) {
      setErrorMsg('La contraseña debe tener al menos 6 caracteres.')
      return
    }

    const result = await register(email, password, name)

    if (result.success) {
      // Supabase envía email de confirmación — informamos al usuario
      setSuccessMsg(
        'Cuenta creada. Revisa tu email para confirmar tu cuenta, luego inicia sesión.'
      )
      setTimeout(() => router.push('/auth/login'), 3000)
    } else {
      setErrorMsg(
        (result.error as Error)?.message || 'Error al crear la cuenta. Intenta de nuevo.'
      )
    }
  }

  return (
    <main className="auth-page">
      <div className="auth-card">
        <h1>Crear Cuenta</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Tu nombre"
              required
              disabled={loading}
              autoComplete="name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
              disabled={loading}
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Mínimo 6 caracteres"
              required
              disabled={loading}
              autoComplete="new-password"
            />
          </div>

          {errorMsg && <p className="error-msg">{errorMsg}</p>}

          {successMsg && (
            <p style={{
              color: '#166534',
              background: '#f0fdf4',
              border: '1px solid #bbf7d0',
              borderRadius: '8px',
              padding: '0.6rem 0.9rem',
              fontSize: '0.875rem',
              marginBottom: '0.75rem'
            }}>
              {successMsg}
            </p>
          )}

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
          </button>
        </form>

        <p className="auth-link">
          ¿Ya tienes cuenta?{' '}
          <Link href="/auth/login">Inicia Sesión</Link>
        </p>
      </div>
    </main>
  )
}
