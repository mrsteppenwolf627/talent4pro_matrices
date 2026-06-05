import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import styles from './home.module.css'

export default async function HomePage() {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll() { return cookieStore.getAll() }, setAll() {} } }
  )
  const { data: { user } } = await supabase.auth.getUser()
  if (user) redirect('/dashboard')

  return (
    <>
      {/* ── HERO: Asimétrico negro + naranja ──────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroLeft}>
          <span className={styles.heroLeftLabel}>Talent4Pro</span>
          <span className={styles.heroLeftNumber}>T4</span>
          <p className={styles.heroLeftTag}>
            Evalúa.<br />Descubre.<br />Transforma.
          </p>
        </div>

        <div className={styles.heroRight}>
          <p className={styles.heroEyebrow}>Sistema de Evaluación de Talento</p>
          <h1 className={styles.heroHeading}>
            El talento<br />no se adivina.
          </h1>
          <hr className={styles.heroDivider} />
          <p className={styles.heroSub}>
            Digitaliza tus matrices de Ficha de Definición, MTP e Ikigai.
            Decisiones basadas en datos, no en intuición.
          </p>
          <div className={styles.heroActions}>
            <Link href="/auth/login" className={styles.btnHeroPrimary}>
              Iniciar sesión
            </Link>
            <Link href="/auth/register" className={styles.btnHeroSecondary}>
              Crear cuenta
            </Link>
          </div>
        </div>
      </section>

      {/* ── FEATURES: Blanco, grid 3col con hover negro ───────────────────── */}
      <section className={styles.features}>
        <div className={styles.featuresInner}>
          <div className={styles.featuresTop}>
            <div>
              <p className={styles.featuresEyebrow}>Herramientas</p>
              <h2 className={styles.featuresHeading}>
                Tres matrices.<br />Un sistema.
              </h2>
              <hr className={styles.featuresDivider} />
            </div>
            <p className={styles.featuresDesc}>
              Cada herramienta diseñada para una dimensión distinta del talento.
              Juntas, construyen un perfil completo, documentado y escalable.
            </p>
          </div>

          <div className={styles.featuresGrid}>
            <div className={styles.featureItem}>
              <p className={styles.featureNumber}>01</p>
              <div className={styles.featureIcon}>📋</div>
              <h3 className={styles.featureTitle}>Ficha Definición</h3>
              <p className={styles.featureDesc}>
                106 preguntas en 12 secciones. Define el perfil completo de empresa o persona con rigor estructural.
              </p>
            </div>
            <div className={styles.featureItem}>
              <p className={styles.featureNumber}>02</p>
              <div className={styles.featureIcon}>🎯</div>
              <h3 className={styles.featureTitle}>MTP</h3>
              <p className={styles.featureDesc}>
                Propósito Masivo Transformador. Evalúa 11 áreas de atributos internos y externos con validación automática.
              </p>
            </div>
            <div className={styles.featureItem}>
              <p className={styles.featureNumber}>03</p>
              <div className={styles.featureIcon}>⭕</div>
              <h3 className={styles.featureTitle}>Ikigai</h3>
              <p className={styles.featureDesc}>
                Los 4 cuadrantes del propósito: pasión, vocación, misión y profesión. Pregunta a pregunta, respuesta a respuesta.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA: Dark, asimétrico ─────────────────────────────────────────── */}
      <section className={styles.cta}>
        <div className={styles.ctaLeft}>
          <p className={styles.ctaEyebrow}>Empieza hoy</p>
          <h2 className={styles.ctaHeading}>
            El momento<br />es ahora.
          </h2>
        </div>
        <div className={styles.ctaRight}>
          <p className={styles.ctaSub}>
            Crea tu cuenta gratuita. Sin tarjeta de crédito.
            Accede a todas las matrices desde el primer día.
          </p>
          <Link href="/auth/register" className={styles.btnHeroPrimary}>
            Crear cuenta gratis
          </Link>
        </div>
      </section>
    </>
  )
}
