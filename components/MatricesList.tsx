'use client'

import { useState } from 'react'
import type { MatrixMetadata } from '@/lib/types'
import MatrixCard from './MatrixCard'
import MatrixListRow from './MatrixListRow'
import styles from '@/styles/MatricesList.module.css'

type ViewMode = 'cards' | 'list'

interface MatricesListProps {
  matrices: MatrixMetadata[]
  loading: boolean
  error: string | null
  onRefresh: () => void
  onDelete: (id: string) => Promise<{ success: boolean; error?: string }>
}

const getTypeLabel = (type: string) => {
  switch (type) {
    case '1-ficha-definicion': return 'Ficha Definición'
    case '2-mtp': return 'MTP'
    case '3-ikigai': return 'Ikigai'
    default: return type
  }
}

const getTypeClass = (type: string) => {
  switch (type) {
    case '1-ficha-definicion': return styles.type_1_ficha
    case '2-mtp': return styles.type_2_mtp
    case '3-ikigai': return styles.type_3_ikigai
    default: return styles.type_other
  }
}

export default function MatricesList({ matrices, loading, error, onRefresh, onDelete }: MatricesListProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('cards')

  if (loading) {
    return <div className={styles.loading}>Cargando tus matrices...</div>
  }

  if (error) {
    return (
      <div className={styles.error}>
        Error: {error}
        <button onClick={onRefresh} className={styles.refreshButton}>Reintentar</button>
      </div>
    )
  }

  if (matrices.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No tienes matrices creadas aún.</p>
        <p>¡Crea tu primera matriz para comenzar!</p>
      </div>
    )
  }

  return (
    <div>
      <div className={styles.viewToggle}>
        <button
          onClick={() => setViewMode('cards')}
          className={`${styles.toggleButton} ${viewMode === 'cards' ? styles.toggleActive : ''}`}
        >
          Tarjetas
        </button>
        <button
          onClick={() => setViewMode('list')}
          className={`${styles.toggleButton} ${viewMode === 'list' ? styles.toggleActive : ''}`}
        >
          Lista
        </button>
      </div>

      {viewMode === 'cards' ? (
        <div className={styles.grid}>
          {matrices.map((matrix) => (
            <MatrixCard
              key={matrix.id}
              matrix={matrix}
              onDelete={onDelete}
              getTypeLabel={getTypeLabel}
              getTypeClass={getTypeClass}
            />
          ))}
        </div>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.tableHeader}>Tipo</th>
                <th className={styles.tableHeader}>Título</th>
                <th className={styles.tableHeader}>Fecha creada</th>
                <th className={styles.tableHeader}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {matrices.map((matrix) => (
                <MatrixListRow
                  key={matrix.id}
                  matrix={matrix}
                  onDelete={onDelete}
                  getTypeLabel={getTypeLabel}
                  getTypeClass={getTypeClass}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
