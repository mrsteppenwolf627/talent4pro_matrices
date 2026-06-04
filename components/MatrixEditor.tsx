'use client'

import { useCallback } from 'react'
import MatrixGrid from './MatrixGrid'
import { useMatrix } from '@/hooks/useMatrix'
import type { CellContent, MatrixType } from '@/lib/types'
import styles from '@/styles/MatrixGrid.module.css'

interface MatrixEditorProps {
  matrixId: string
  matrixType: MatrixType
  readOnly?: boolean
}

export default function MatrixEditor({
  matrixId,
  matrixType,
  readOnly = false,
}: MatrixEditorProps) {
  const {
    metadata,
    data,
    loading,
    saving,
    error,
    isDirty,
    lastSaved,
    updateCell,
    saveMatrix,
  } = useMatrix(matrixId)

  const handleCellChange = useCallback(
    (rowKey: string, colKey: string, value: CellContent['value']) => {
      updateCell(rowKey, colKey, value)
    },
    [updateCell]
  )

  const handleSave = async () => {
    await saveMatrix()
  }

  const saveLabel = (() => {
    if (saving) return 'Guardando...'
    if (isDirty) return 'Guardar cambios'
    return 'Guardado'
  })()

  const statusText = (() => {
    if (saving) return 'Guardando...'
    if (isDirty) return 'Cambios sin guardar'
    if (lastSaved) return `Guardado ${lastSaved.toLocaleTimeString()}`
    return ''
  })()

  const statusClass = isDirty ? styles.saveStatusDirty : styles.saveStatusSaved

  return (
    <div className={styles.editorContainer}>
      {/* ── Toolbar ─────────────────────────────────────────────────────── */}
      <div className={styles.editorToolbar}>
        <h2 className={styles.editorTitle}>
          {metadata?.title ?? `Matriz ${matrixType}`}
        </h2>

        {!readOnly && (
          <div className={styles.toolbarRight}>
            {statusText && (
              <span className={`${styles.saveStatus} ${statusClass}`}>
                {statusText}
              </span>
            )}
            <button
              className={styles.btnSave}
              onClick={handleSave}
              disabled={saving || !isDirty}
              aria-label="Guardar matriz"
            >
              {saveLabel}
            </button>
          </div>
        )}
      </div>

      {/* ── Error banner ─────────────────────────────────────────────────── */}
      {error && (
        <div className={styles.errorBanner} role="alert">
          {error}
        </div>
      )}

      {/* ── Grid ─────────────────────────────────────────────────────────── */}
      <MatrixGrid
        data={data}
        onCellChange={handleCellChange}
        loading={loading}
        readOnly={readOnly}
      />
    </div>
  )
}
