'use client'

import MTPArea from './MTPArea'
import MTPValidation from './MTPValidation'
import { useMTP } from '@/hooks/useMTP'
import { MTP_AREAS } from '@/data/mtpAreas'
import type { MatrixType } from '@/lib/types'
import styles from '@/styles/MTP.module.css'

interface SheetMTPProps {
  matrixId: string
  matrixType: MatrixType
  readOnly?: boolean
}

export default function SheetMTP({
  matrixId,
  matrixType,
  readOnly = false,
}: SheetMTPProps) {
  const {
    metadata,
    scores,
    mtpText,
    loading,
    saving,
    validating,
    error,
    isDirty,
    lastSaved,
    validationResult,
    totalScore,
    avgScore,
    scoredAreas,
    totalAreas,
    updateScore,
    updateMtpText,
    saveData,
    validateMTP,
  } = useMTP(matrixId)

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
          Cargando matriz MTP…
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
            {metadata?.title ?? 'Matriz MTP'}
          </h1>
          <p className={styles.toolbarMeta}>
            {scoredAreas}/{totalAreas} áreas evaluadas
            {scoredAreas > 0 && ` · Media ${avgScore.toFixed(1)}/5 · Total ${totalScore}/${totalAreas * 5}`}
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

      {/* ── Score summary ─────────────────────────────────────────────────── */}
      <div className={styles.scoreSummary}>
        <span className={styles.scoreSummaryTotal}>{totalScore}</span>
        <span className={styles.scoreSummaryLabel}>
          / {totalAreas * 5} puntos totales
        </span>
        <span style={{ color: '#d1c9bf' }}>·</span>
        <span className={styles.scoreSummaryLabel}>
          Media <strong>{avgScore.toFixed(1)}/5</strong>
        </span>
        <span style={{ color: '#d1c9bf' }}>·</span>
        <span className={styles.scoreSummaryLabel}>
          {scoredAreas}/{totalAreas} áreas evaluadas
        </span>
      </div>

      {/* ── Error ─────────────────────────────────────────────────────────── */}
      {error && (
        <div className={styles.errorBanner} role="alert">{error}</div>
      )}

      {/* ── Areas grid ────────────────────────────────────────────────────── */}
      <div className={styles.areasGrid}>
        {MTP_AREAS.map(area => (
          <MTPArea
            key={area.id}
            area={area}
            score={scores[area.id] ?? 0}
            onScoreChange={updateScore}
            readOnly={readOnly}
          />
        ))}
      </div>

      {/* ── Validation ────────────────────────────────────────────────────── */}
      <MTPValidation
        scores={scores}
        validating={validating}
        result={validationResult}
        mtpText={mtpText}
        onValidate={validateMTP}
        onMtpTextChange={updateMtpText}
      />
    </div>
  )
}
