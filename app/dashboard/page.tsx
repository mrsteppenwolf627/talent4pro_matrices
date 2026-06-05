'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/Button'
import styles from './dashboard.module.css'

export default function DashboardPage() {
  const { user, loading, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) router.push('/auth/login')
  }, [user, loading, router])

  const handleLogout = async () => {
    await logout()
    router.push('/')
    router.refresh()
  }

  if (loading) return <div className="loading">Cargando</div>
  if (!user) return null

  const displayName = user.user_metadata?.name || user.email?.split('@')[0] || 'Usuario'

  return (
    <div className={styles.page}>

      {/* ── Sección 1: Negro + acento cian ─────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroAccent}>
          <p className={styles.heroAccentLabel}>Dashboard</p>
          <span className={styles.heroAccentBg}>T4</span>
        </div>
        <div className={styles.heroContent}>
          <p className={styles.greeting}>Bienvenido de vuelta</p>
          <h1 className={styles.heroTitle}>{displayName}</h1>
          <p className={styles.heroSub}>Sistema de matrices de evaluación de talento</p>
          <div style={{ marginTop: 16 }}>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              Cerrar sesión
            </Button>
          </div>
        </div>
      </section>

      {/* ── Sección 2: Blanco, tres tarjetas en grid ───────────────────────── */}
      <section className={styles.typesSection}>
        <div className={styles.inner}>
          <p className={styles.sectionEyebrow}>Herramientas disponibles</p>
          <h2 className={styles.sectionTitle}>Tres matrices. Un sistema.</h2>
          <div className={styles.typesGrid}>
            <div className={styles.typeCard} style={{ borderTopColor: 'var(--ws-cyan)' }}>
              <div className={styles.typeIcon}>📋</div>
              <div className={styles.typeLabel}>Ficha Definición</div>
              <p className={styles.typeDesc}>Perfil completo en 12 secciones y 106 preguntas. El punto de partida de toda evaluación.</p>
            </div>
            <div className={styles.typeCard} style={{ borderTopColor: 'var(--ws-orange)' }}>
              <div className={styles.typeIcon}>🎯</div>
              <div className={styles.typeLabel}>MTP</div>
              <p className={styles.typeDesc}>Propósito Masivo Transformador. Valida atributos internos IDEAS y externos SCALE.</p>
            </div>
            <div className={styles.typeCard} style={{ borderTopColor: 'var(--ws-red)' }}>
              <div className={styles.typeIcon}>⭕</div>
              <div className={styles.typeLabel}>Ikigai</div>
              <p className={styles.typeDesc}>Pasión, vocación, misión y profesión. Encuentra el propósito de vida real.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Sección 3: Naranja, CTA asimétrico ─────────────────────────────── */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaLayout}>
          <h2 className={styles.ctaTitle}>
            Tus matrices<br />te esperan.
          </h2>
          <div className={styles.ctaRight}>
            <p className={styles.ctaDesc}>
              Accede a todas tus evaluaciones, crea nuevas matrices y continúa desde donde lo dejaste. Todo en un solo lugar.
            </p>
            <Link href="/matrices">
              <Button variant="primary" size="lg">Ver mis matrices →</Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
