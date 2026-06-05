'use client'

import { useMTPNew } from '@/hooks/useMTPNew'
import MTPAreaColumn from './MTPAreaColumn'
import MTPCenterPanel from './MTPCenterPanel'
import styles from '@/styles/MTPNew.module.css'

interface SheetMTPNewProps {
  matrixId: string
  matrixType: string
}

export default function SheetMTPNew({ matrixId }: SheetMTPNewProps) {
  const {
    metadata,
    scores,
    mtpText,
    loading,
    saving,
    validating,
    error,
    lastSaved,
    validationResult,
    areasInternal,
    areasExternal,
    updateScore,
    updateMtpText,
    validateMTP,
  } = useMTPNew(matrixId)

  if (loading) return <div className={styles.container}>Cargando matriz MTP...</div>
  if (error) return <div className={styles.container}>Error: {error}</div>

  return (
    <div className={styles.container}>
      <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#1e293b' }}>
            {metadata?.title || 'Matriz MTP'}
          </h1>
          <p style={{ color: '#64748b' }}>Propósito Transformativo Masivo (Basado en el modelo ExO)</p>
        </div>
        <div style={{ textAlign: 'right', fontSize: '0.875rem', color: '#94a3b8' }}>
          {saving ? (
            <span style={{ color: '#3b82f6', fontWeight: 600 }}>Guardando cambios...</span>
          ) : lastSaved ? (
            <span>Último guardado: {lastSaved.toLocaleTimeString()}</span>
          ) : (
            <span>Los cambios se guardan automáticamente</span>
          )}
        </div>
      </header>

      <div className={styles.layout}>
        {/* Izquierda: Atributos Internos */}
        <MTPAreaColumn
          title="Atributos Internos (IDEAS)"
          areas={areasInternal}
          type="internal"
          scores={scores}
          onScoreChange={updateScore}
        />

        {/* Centro: MTP Definitivo y Validación */}
        <MTPCenterPanel
          mtpText={mtpText}
          validating={validating}
          validationResult={validationResult}
          onMTPChange={updateMtpText}
          onValidate={validateMTP}
        />

        {/* Derecha: Atributos Externos (SCALE) */}
        <MTPAreaColumn
          title="Atributos Externos (SCALE)"
          areas={areasExternal}
          type="external"
          scores={scores}
          onScoreChange={updateScore}
        />
      </div>
    </div>
  )
}
