'use client'

import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { Button } from './ui/Button'
import styles from './Navigation.module.css'

export default function Navigation() {
  const { user, logout } = useAuth()

  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.logo}>Talent4Pro</Link>
      
      <div className={styles.links}>
        <Link href="/dashboard" className={styles.link}>Dashboard</Link>
        <Link href="/matrices" className={styles.link}>Matrices</Link>
      </div>

      <div className={styles.actions}>
        {user ? (
          <Button variant="secondary" onClick={logout}>Cerrar Sesión</Button>
        ) : (
          <Link href="/auth/login"><Button variant="primary">Login</Button></Link>
        )}
      </div>
    </nav>
  )
}
