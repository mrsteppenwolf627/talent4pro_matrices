'use client'

import type { MTPArea } from '@/data/mtpAreasReal'
import MTPQuestion from './MTPQuestion'
import styles from '@/styles/MTPNew.module.css'

interface MTPAreaBlockProps {
  area: MTPArea
  score: number
  onScoreChange: (areaId: number, value: number) => void
}

export default function MTPAreaBlock({ area, score, onScoreChange }: MTPAreaBlockProps) {
  const scoreClass = styles[`score_${score}`] || styles.score_0

  return (
    <div className={`${styles.areaBlock} ${scoreClass}`}>
      <div className={styles.areaHeader}>
        <div className={styles.areaTitle}>
          <span className={styles.areaId}>{area.id}</span>
          {area.title}
        </div>
        <div className={styles.areaDesc}>{area.description}</div>
      </div>

      <div className={styles.questionsList}>
        {area.questions.map((q, idx) => (
          <MTPQuestion key={idx} text={q} />
        ))}
      </div>

      <div className={styles.scoreWrapper}>
        <div className={styles.scoreLabel}>Nivel de implementación (0-5)</div>
        <div className={styles.radioGroup}>
          {[0, 1, 2, 3, 4, 5].map((val) => (
            <label key={val} className={styles.radioItem}>
              <input
                type="radio"
                name={`area_${area.id}`}
                value={val}
                checked={score === val}
                onChange={() => onScoreChange(area.id, val)}
                className={styles.radioInput}
              />
              <span className={styles.radioValue}>{val}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}
