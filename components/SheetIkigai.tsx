'use client'

import IkigaiQuadrant from './IkigaiQuadrant'
import IkigaiCenter from './IkigaiCenter'
import { useIkigai } from '@/hooks/useIkigai'
import { IKIGAI_QUADRANTS, GRID_ORDER, QUADRANT_BY_ID } from '@/data/ikigaiQuadrants'
import type { QuadrantId } from '@/data/ikigaiQuadrants'
import type { MatrixType } from '@/lib/types'
import styles from '@/styles/Ikigai.module.css'

interface SheetIkigaiProps {
  matrixId: string
  matrixType: MatrixType
  readOnly?: boolean
}

export default function SheetIkigai({
  matrixId,
  matrixType,
  readOnly = false,
}: SheetIkigaiProps) {
  const {
    metadata,
    data,
    loading,
    saving,
    error,
    isDirty,
    lastSaved,
    filledQuadrants,
    totalQuadrants,
    autoSynthesis,
    updateQuadrant,
    updateCenter,
    saveData,
  } = useIkigai(matrixId)

  const statusText = saving
    ? 'Guardando…'
    : isDirty
    ? 'Cambios sin guardar'
    : lastSaved
    ? `Guardado ${lastSaved.toLocaleTimeString()}`
    : ''

  const statusClass = saving
    ? styles.saveStatus
    : isDirty
    ? styles.saveStatusDirty
    : styles.saveStatusSaved

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.loading}>
          <span className={styles.spinner} aria-hidden="true" />
          Cargando matriz Ikigai…
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      {/* ── Toolbar ───────────────────────────────────────────────────────── */}
      <div className={styles.toolbar}>
        <div>
          <h1 className={styles.toolbarTitle}>
            {metadata?.title ?? 'Matriz Ikigai'}
          </h1>
          <p className={styles.toolbarMeta}>
            {filledQuadrants}/{totalQuadrants} cuadrantes completados
          </p>
        </div>

        {!readOnly && (
          <div className={styles.toolbarRight}>
            {statusText && (
              <span className={`${styles.saveStatus} ${statusClass}`}>{statusText}</span>
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

      {/* ── Fill pips ─────────────────────────────────────────────────────── */}
      <div className={styles.fillRow} aria-label={`${filledQuadrants} de ${totalQuadrants} cuadrantes`}>
        {IKIGAI_QUADRANTS.map(q => (
          <div
            key={q.id}
            className={`${styles.fillPip} ${data[q.id]?.trim() ? styles.fillPipDone : ''}`}
            style={data[q.id]?.trim() ? { background: q.color } : {}}
            title={q.title}
          />
        ))}
      </div>

      {/* ── Error ─────────────────────────────────────────────────────────── */}
      {error && <div className={styles.errorBanner} role="alert">{error}</div>}

      {/* ── Grid 2×2 ──────────────────────────────────────────────────────── */}
      <p className={styles.diagramLabel}>
        Completa los 4 cuadrantes para descubrir tu propósito de vida
      </p>

      <div className={styles.grid}>
        {GRID_ORDER.map(id => (
          <IkigaiQuadrant
            key={id}
            def={QUADRANT_BY_ID[id]}
            value={data[id] ?? ''}
            onChange={updateQuadrant as (id: QuadrantId, v: string) => void}
            readOnly={readOnly}
          />
        ))}
      </div>

      {/* ── Center / Ikigai ───────────────────────────────────────────────── */}
      <IkigaiCenter
        value={data.ikigai ?? ''}
        onChange={updateCenter}
        autoSynthesis={autoSynthesis}
        readOnly={readOnly}
      />
    </div>
  )
}
