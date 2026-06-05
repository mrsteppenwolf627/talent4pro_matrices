'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useMatricesList } from '@/hooks/useMatricesList'
import type { MatrixType } from '@/lib/types'
import styles from '@/styles/MatricesList.module.css'

interface CreateMatrixModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function CreateMatrixModal({ isOpen, onClose }: CreateMatrixModalProps) {
  const router = useRouter()
  const { createMatrix, creating } = useMatricesList()
  const [type, setType] = useState<MatrixType>('1-ficha-definicion')
  const [title, setTitle] = useState('')
  const [error, setError] = useState<string | null>(null)

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!title.trim()) {
      setError('El título es obligatorio')
      return
    }

    const result = await createMatrix({ type, title: title.trim() })

    if (result.success && result.id) {
      onClose()
      router.push(`/matrices/${type}/${result.id}`)
    } else {
      setError(result.error ?? 'Error al crear la matriz')
    }
  }

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <h2 className={styles.modalTitle}>Crear Nueva Matriz</h2>

        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Tipo de Matriz</label>
            <select
              className={styles.select}
              value={type}
              onChange={e => setType(e.target.value as MatrixType)}
              disabled={creating}
            >
              <option value="1-ficha-definicion">1. Ficha de Definición</option>
              <option value="2-mtp">2. MTP (Propósito Transformativo Masivo)</option>
              <option value="3-ikigai">3. Ikigai</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Título</label>
            <input
              type="text"
              className={styles.input}
              placeholder="Ej: Mi Proyecto Innovador"
              value={title}
              onChange={e => setTitle(e.target.value)}
              disabled={creating}
              autoFocus
            />
          </div>

          <div className={styles.modalActions}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={onClose}
              disabled={creating}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={creating}
            >
              {creating ? 'Creando...' : 'Crear Matriz'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
