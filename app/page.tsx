import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function HomePage() {
  const cookieStore = await cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll() {
          // Server Component — cookies are read-only here
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    redirect('/dashboard')
  }

  return (
    <main className="home-page">
      <h1>Talent4Pro Matrices</h1>
      <p>Digitaliza y automatiza tus matrices de evaluación de talento.</p>
      <Link href="/auth/login" className="btn-primary">
        Iniciar Sesión
      </Link>
    </main>
  )
}
