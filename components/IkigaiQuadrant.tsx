'use client'

import type { IkigaiQuadrantDef } from '@/data/ikigaiQuadrantsReal'
import IkigaiQuestion from './IkigaiQuestion'
import styles from '@/styles/Ikigai.module.css'

interface IkigaiQuadrantProps {
  quadrant: IkigaiQuadrantDef
  value: string
  onChange: (id: IkigaiQuadrantDef['id'], value: string) => void
}

export default function IkigaiQuadrant({ quadrant, value, onChange }: IkigaiQuadrantProps) {
  const isCompleted = value.trim().length > 0

  return (
    <div className={styles.quadrant} style={{ borderColor: quadrant.color }}>
      <div className={styles.quadrantHeader}>
        <div className={styles.headerLeft}>
          <span className={styles.icon}>{quadrant.icon}</span>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span className={styles.quadrantSubtitle}>{quadrant.subtitle}</span>
            <h2 className={styles.quadrantTitle} style={{ color: quadrant.color }}>{quadrant.title}</h2>
          </div>
        </div>
        <div className={styles.badge}>
          {isCompleted ? 'COMPLETADO' : 'PENDIENTE'}
        </div>
      </div>

      <div className={styles.questionsBox}>
        <div className={styles.questionsList}>
          {quadrant.questions.map((q, idx) => (
            <IkigaiQuestion key={idx} text={q} />
          ))}
        </div>
      </div>

      <textarea
        className={styles.textarea}
        placeholder={`Describe aquí tu ${quadrant.title.toLowerCase()} basándote en las preguntas guía...`}
        value={value}
        onChange={(e) => onChange(quadrant.id, e.target.value)}
        style={{ borderColor: quadrant.color }}
      />
    </div>
  )
}
