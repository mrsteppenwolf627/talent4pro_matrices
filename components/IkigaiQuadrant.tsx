import { useState } from 'react'
import type { IkigaiQuadrantDef, QuadrantId } from '@/data/ikigaiQuadrants'
import styles from '@/styles/Ikigai.module.css'

interface IkigaiQuadrantProps {
  def: IkigaiQuadrantDef
  value: string
  onChange: (id: QuadrantId, value: string) => void
  readOnly?: boolean
}

export default function IkigaiQuadrant({
  def,
  value,
  onChange,
  readOnly = false,
}: IkigaiQuadrantProps) {
  const [questionsOpen, setQuestionsOpen] = useState(false)
  const isFilled = value.trim().length > 0

  return (
    <div className={styles.quadrant} style={{ background: def.colorLight }}>
      {/* Accent bar */}
      <div className={styles.quadrantAccent} style={{ background: def.color }} />

      {/* Header */}
      <div className={styles.quadrantHeader}>
        <span className={styles.quadrantIcon} aria-hidden="true">{def.icon}</span>
        <div className={styles.quadrantTitleGroup}>
          <div className={styles.quadrantTitle} style={{ color: def.color }}>
            {def.title}
          </div>
          <div className={styles.quadrantSubtitle}>{def.subtitle}</div>
        </div>
        <span
          className={`${styles.quadrantBadge} ${isFilled ? styles.quadrantBadgeFilled : ''}`}
          style={isFilled ? { background: def.color + '22', color: def.color, borderColor: def.color } : {}}
        >
          {isFilled ? '✓' : 'Pendiente'}
        </span>
      </div>

      {/* Textarea */}
      <textarea
        className={styles.quadrantInput}
        style={{ borderColor: isFilled ? def.color + '66' : undefined, color: def.color }}
        value={value}
        placeholder={def.placeholder}
        onChange={e => onChange(def.id, e.target.value)}
        disabled={readOnly}
        rows={6}
        aria-label={`${def.title}: ${def.subtitle}`}
      />

      {/* Questions accordion */}
      <button
        type="button"
        className={styles.questionsToggle}
        onClick={() => setQuestionsOpen(o => !o)}
        aria-expanded={questionsOpen}
      >
        <svg
          className={`${styles.chevron} ${questionsOpen ? styles.chevronOpen : ''}`}
          viewBox="0 0 16 16" fill="none" aria-hidden="true"
        >
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {questionsOpen ? 'Ocultar' : 'Ver'} preguntas guía ({def.questions.length})
      </button>

      {questionsOpen && (
        <ul className={styles.questionsList} role="list">
          {def.questions.map((q, i) => (
            <li key={i} className={styles.questionsItem}>
              <span
                className={styles.questionsBullet}
                style={{ color: def.color }}
                aria-hidden="true"
              >›</span>
              {q}
            </li>
          ))}
        </ul>
      )}

      <div className={styles.quadrantBottom} />
    </div>
  )
}
