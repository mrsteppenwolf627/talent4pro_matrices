'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { MatrixMetadata } from '@/lib/types'
import DeleteConfirmModal from './DeleteConfirmModal'
import { Card } from './ui/Card'
import { Button } from './ui/Button'
import styles from '@/styles/MatricesList.module.css'

interface MatrixCardProps {
  matrix: MatrixMetadata
  onDelete: (id: string) => Promise<{ success: boolean; error?: string }>
  getTypeLabel: (type: string) => string
  getTypeClass: (type: string) => string
}

export default function MatrixCard({ matrix, onDelete, getTypeLabel, getTypeClass }: MatrixCardProps) {
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
      <Card className={styles.card}>
        <span className={`${styles.badge} ${getTypeClass(matrix.type)}`}>
          {getTypeLabel(matrix.type)}
        </span>
        <h3 className={styles.cardTitle}>{matrix.title}</h3>
        <p className={styles.cardDate}>
          {new Date(matrix.created_at).toLocaleDateString('es-ES')}
        </p>
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
          <Link href={`/matrices/${matrix.type}/${matrix.id}`} style={{ flex: 1 }}>
            <Button variant="secondary" style={{ width: '100%' }}>Ver</Button>
          </Link>
          <Button variant="danger" onClick={() => setShowModal(true)}>🗑️</Button>
        </div>
      </Card>

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
