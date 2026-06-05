'use client'

import type { IkigaiQuadrantDef } from '@/data/ikigaiQuadrantsReal'
import type { IkigaiData } from '@/hooks/useIkigai'
import IkigaiQuestionField from './IkigaiQuestionField'
import styles from '@/styles/Ikigai.module.css'

interface IkigaiQuadrantProps {
  quadrant: IkigaiQuadrantDef
  answers: Record<number, string>
  onChange: (quadrant: keyof Omit<IkigaiData, 'ikigai'>, index: number, value: string) => void
}

export default function IkigaiQuadrant({ quadrant, answers, onChange }: IkigaiQuadrantProps) {
  const answeredCount = Object.keys(answers).filter(k => answers[Number(k)].trim() !== '').length

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
          {answeredCount}/{quadrant.questions.length} campos
        </div>
      </div>

      <div className={styles.questionsList}>
        {quadrant.questions.map((q, idx) => (
          <IkigaiQuestionField
            key={idx}
            index={idx}
            question={q}
            answer={answers[idx] || ''}
            onChange={(val) => onChange(quadrant.id, idx, val)}
          />
        ))}
      </div>
    </div>
  )
}
