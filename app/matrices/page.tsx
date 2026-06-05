'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { useMatricesList } from '@/hooks/useMatricesList'
import MatricesList from '@/components/MatricesList'
import CreateMatrixModal from '@/components/CreateMatrixModal'
import styles from '@/styles/MatricesList.module.css'

export default function MatricesPage() {
  const { user, loading: authLoading } = useAuth()
  const { matrices, loading: listLoading, error, refresh } = useMatricesList()
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login')
    }
  }, [user, authLoading, router])

  if (authLoading) {
    return <div className={styles.loading}>Cargando...</div>
  }

  if (!user) {
    return null
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Mis Matrices</h1>
        <div>
          <button 
            onClick={() => refresh()} 
            className={styles.refreshButton}
            disabled={listLoading}
          >
            {listLoading ? 'Cargando...' : 'Refrescar'}
          </button>
          <button 
            onClick={() => setIsModalOpen(true)} 
            className={styles.createButton}
          >
            + Nueva Matriz
          </button>
        </div>
      </header>

      <main>
        <MatricesList 
          matrices={matrices}
          loading={listLoading}
          error={error}
          onRefresh={refresh}
        />
      </main>

      <CreateMatrixModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  )
}
