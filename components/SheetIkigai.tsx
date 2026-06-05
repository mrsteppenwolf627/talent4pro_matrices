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
    values,
    loading,
    saving,
    error,
    lastSaved,
    updateQuadrant,
    saveData,
  } = useIkigai(matrixId)

  if (loading) return <div className={styles.container}>Cargando matriz Ikigai...</div>
  if (error) return <div className={styles.container}>Error: {error}</div>

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>{metadata?.title || 'Matriz Ikigai'}</h1>
          <p className={styles.subtitle}>Encuentra tu propósito de vida (Modelo 2x2 + Síntesis)</p>
        </div>
        <div className={styles.saveStatus}>
          {saving ? (
            <span className={styles.saving}>Guardando cambios...</span>
          ) : lastSaved ? (
            <span>Último guardado: {lastSaved.toLocaleTimeString()}</span>
          ) : (
            <span>Los cambios se guardan automáticamente cada 30s</span>
          )}
        </div>
      </header>

      <div className={styles.grid}>
        {IKIGAI_QUADRANTS.map((quadrant) => (
          <IkigaiQuadrant
            key={quadrant.id}
            quadrant={quadrant}
            value={values[quadrant.id] || ''}
            onChange={updateQuadrant}
          />
        ))}
      </div>

      <IkigaiCenter
        value={values.ikigai || ''}
        onChange={updateQuadrant}
        onSave={saveData}
        quadrantsValues={{
          passion: values.passion || '',
          vocation: values.vocation || '',
          mission: values.mission || '',
          profession: values.profession || ''
        }}
      />
    </div>
  )
}
