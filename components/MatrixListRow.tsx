'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { MatrixMetadata } from '@/lib/types'
import DeleteConfirmModal from './DeleteConfirmModal'
import styles from '@/styles/MatricesList.module.css'

interface MatrixListRowProps {
  matrix: MatrixMetadata
  onDelete: (id: string) => Promise<{ success: boolean; error?: string }>
  getTypeLabel: (type: string) => string
  getTypeClass: (type: string) => string
}

export default function MatrixListRow({ matrix, onDelete, getTypeLabel, getTypeClass }: MatrixListRowProps) {
  const [showModal, setShowModal] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const handleDelete = async () => {
    setDeleting(true)
    const result = await onDelete(matrix.id)
    setDeleting(false)
    if (result.success) {
      setShowModal(false)
    }
  }

  return (
    <>
      <tr className={styles.tableRow}>
        <td className={styles.tableCell}>
          <span className={`${styles.badge} ${getTypeClass(matrix.type)}`}>
            {getTypeLabel(matrix.type)}
          </span>
        </td>
        <td className={styles.tableCell}>
          <span className={styles.rowTitle}>{matrix.title}</span>
        </td>
        <td className={styles.tableCell}>
          {new Date(matrix.created_at).toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })}
        </td>
        <td className={styles.tableCell}>
          <div className={styles.rowActions}>
            <Link
              href={`/matrices/${matrix.type}/${matrix.id}`}
              className={styles.viewButton}
            >
              Ver
            </Link>
            <button
              onClick={() => setShowModal(true)}
              className={styles.deleteIconButton}
              title="Eliminar matriz"
            >
              🗑️
            </button>
          </div>
        </td>
      </tr>

      {showModal && (
        <DeleteConfirmModal
          matrixTitle={matrix.title}
          onConfirm={handleDelete}
          onCancel={() => setShowModal(false)}
          loading={deleting}
        />
      )}
    </>
  )
}
