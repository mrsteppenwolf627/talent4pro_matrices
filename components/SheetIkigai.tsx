'use client'

import { useIkigai } from '@/hooks/useIkigai'
import IkigaiQuadrant from './IkigaiQuadrant'
import IkigaiCenter from './IkigaiCenter'
import { IKIGAI_QUADRANTS } from '@/data/ikigaiQuadrantsReal'
import styles from '@/styles/Ikigai.module.css'

interface SheetIkigaiProps {
  matrixId: string
  matrixType: string
}

export default function SheetIkigai({ matrixId }: SheetIkigaiProps) {
  const {
    metadata,
    data,
    loading,
    saving,
    error,
    lastSaved,
    updateQuestionAnswer,
    updateIkigai,
    saveData,
  } = useIkigai(matrixId)

  if (loading) return <div className={styles.container}>Cargando matriz Ikigai...</div>
  if (error) return <div className={styles.container}>Error: {error}</div>

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>{metadata?.title || 'Matriz Ikigai'}</h1>
          <p className={styles.subtitle}>Encuentra tu propósito de vida (Detallado)</p>
        </div>
        <div className={styles.saveStatus}>
          {saving ? (
            <span className={styles.saving}>Guardando cambios...</span>
          ) : lastSaved ? (
            <span>Guardado a las {lastSaved.toLocaleTimeString()}</span>
          ) : (
            <span>Autoguardado activado</span>
          )}
        </div>
      </header>

      <div className={styles.grid}>
        {IKIGAI_QUADRANTS.map((quadrant) => (
          <IkigaiQuadrant
            key={quadrant.id}
            quadrant={quadrant}
            answers={data[quadrant.id]}
            onChange={updateQuestionAnswer}
          />
        ))}
      </div>

      <IkigaiCenter
        value={data.ikigai || ''}
        onChange={updateIkigai}
        onSave={saveData}
      />
    </div>
  )
}
