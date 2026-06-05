import Link from 'next/link'
import type { MatrixMetadata } from '@/lib/types'
import styles from '@/styles/MatricesList.module.css'

interface MatricesListProps {
  matrices: MatrixMetadata[]
  loading: boolean
  error: string | null
  onRefresh: () => void
}

export default function MatricesList({ matrices, loading, error, onRefresh }: MatricesListProps) {
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

  return (
    <div className={styles.grid}>
      {matrices.map((matrix) => (
        <Link
          key={matrix.id}
          href={`/matrices/${matrix.type}/${matrix.id}`}
          className={styles.card}
        >
          <span className={`${styles.badge} ${getTypeClass(matrix.type)}`}>
            {getTypeLabel(matrix.type)}
          </span>
          <h3 className={styles.cardTitle}>{matrix.title}</h3>
          <p className={styles.cardDate}>
            Creada el {new Date(matrix.created_at).toLocaleDateString('es-ES', {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            })}
          </p>
        </Link>
      ))}
    </div>
  )
}
