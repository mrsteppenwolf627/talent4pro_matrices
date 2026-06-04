import { useState } from 'react'
import MTPScoreInput from './MTPScoreInput'
import { getScoreColor, getScoreLabel } from '@/data/mtpAreas'
import type { MTPAreaDef } from '@/data/mtpAreas'
import styles from '@/styles/MTP.module.css'

interface MTPAreaProps {
  area: MTPAreaDef
  score: number
  onScoreChange: (areaId: number, value: number) => void
  readOnly?: boolean
}

export default function MTPArea({
  area,
  score,
  onScoreChange,
  readOnly = false,
}: MTPAreaProps) {
  const [questionsOpen, setQuestionsOpen] = useState(false)
  const color = getScoreColor(score)

  return (
    <div className={styles.areaCard}>
      {/* Color accent top bar */}
      <div className={styles.areaCardAccent} style={{ backgroundColor: color }} />

      {/* Header */}
      <div className={styles.areaHeader}>
        <div className={styles.areaHeaderLeft}>
          <div className={styles.areaBadge}>{area.id}</div>
          <div className={styles.areaTitle}>{area.title}</div>
          <div className={styles.areaDesc}>{area.description}</div>
        </div>

        {/* Score pill */}
        <div className={styles.scorePill}>
          <span className={styles.scorePillValue} style={{ color }}>
            {score}
          </span>
          <span className={styles.scorePillMax}>/5</span>
          <span className={styles.scorePillLabel}>{getScoreLabel(score)}</span>
        </div>
      </div>

      {/* Score selector */}
      <MTPScoreInput
        areaId={area.id}
        value={score}
        onChange={onScoreChange}
        readOnly={readOnly}
      />

      {/* Questions accordion */}
      <button
        type="button"
        className={styles.questionsToggle}
        onClick={() => setQuestionsOpen(o => !o)}
        aria-expanded={questionsOpen}
      >
        <svg
          className={`${styles.questionsChevron} ${questionsOpen ? styles.questionsChevronOpen : ''}`}
          viewBox="0 0 16 16" fill="none" aria-hidden="true"
        >
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {questionsOpen ? 'Ocultar' : 'Ver'} preguntas guía ({area.questions.length})
      </button>

      {questionsOpen && (
        <ul className={styles.questionsList} role="list">
          {area.questions.map((q, i) => (
            <li key={i} className={styles.questionsListItem}>
              <span className={styles.questionsBullet} aria-hidden="true">›</span>
              {q}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
