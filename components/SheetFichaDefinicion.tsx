'use client'

import FichaSection from './FichaSection'
import { useFichaDefinicion } from '@/hooks/useFichaDefinicion'
import { FICHA_SECTIONS } from '@/data/fichaDefinicionFields'
import type { MatrixType } from '@/lib/types'
import styles from '@/styles/FichaDefinicion.module.css'

interface SheetFichaDefinicionProps {
  matrixId: string
  matrixType: MatrixType
  readOnly?: boolean
}

export default function SheetFichaDefinicion({
  matrixId,
  matrixType,
  readOnly = false,
}: SheetFichaDefinicionProps) {
  const {
    metadata,
    data,
    loading,
    saving,
    error,
    isDirty,
    lastSaved,
    filledCount,
    totalFields,
    progressPct,
    updateField,
    saveData,
  } = useFichaDefinicion(matrixId)

  // ── Save status text ──────────────────────────────────────────────────────

  const statusText = saving
    ? 'Guardando…'
    : isDirty
    ? 'Cambios sin guardar'
    : lastSaved
    ? `Guardado ${lastSaved.toLocaleTimeString()}`
    : ''

  const statusClass = saving
    ? styles.saveStatusSaving
    : isDirty
    ? styles.saveStatusDirty
    : styles.saveStatusSaved

  // ── Loading ───────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.loading}>
          <span className={styles.spinner} aria-hidden="true" />
          Cargando ficha…
        </div>
      </div>
    )
  }

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className={styles.page}>
      {/* ── Toolbar ─────────────────────────────────────────────────────── */}
      <div className={styles.toolbar}>
        <div className={styles.toolbarLeft}>
          <h1 className={styles.toolbarTitle}>
            {metadata?.title ?? 'Ficha Definición de Empresa'}
          </h1>
          <span className={styles.toolbarMeta}>
            {filledCount} de {totalFields} campos completados
          </span>
        </div>

        {!readOnly && (
          <div className={styles.toolbarRight}>
            {statusText && (
              <span className={`${styles.saveStatus} ${statusClass}`}>
                {statusText}
              </span>
            )}
            <button
              type="button"
              className={styles.btnSave}
              onClick={saveData}
              disabled={saving || !isDirty}
            >
              {saving ? 'Guardando…' : 'Guardar'}
            </button>
          </div>
        )}
      </div>

      {/* ── Progress ────────────────────────────────────────────────────── */}
      <div>
        <div className={styles.progressBar} role="progressbar" aria-valuenow={progressPct} aria-valuemin={0} aria-valuemax={100}>
          <div className={styles.progressFill} style={{ width: `${progressPct}%` }} />
        </div>
        <p className={styles.progressLabel}>{progressPct}% completado</p>
      </div>

      {/* ── Error ───────────────────────────────────────────────────────── */}
      {error && (
        <div className={styles.errorBanner} role="alert">
          {error}
        </div>
      )}

      {/* ── Sections ────────────────────────────────────────────────────── */}
      {FICHA_SECTIONS.map((section, index) => (
        <FichaSection
          key={section.id}
          section={section}
          data={data}
          onFieldChange={updateField}
          defaultOpen={index === 0}
          readOnly={readOnly}
        />
      ))}
    </div>
  )
}
