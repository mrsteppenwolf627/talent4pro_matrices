import { getScoreColor, getScoreLabel } from '@/data/mtpAreas'
import styles from '@/styles/MTP.module.css'

interface MTPScoreInputProps {
  areaId: number
  value: number
  onChange: (areaId: number, value: number) => void
  readOnly?: boolean
}

const SCORES = [0, 1, 2, 3, 4, 5] as const

export default function MTPScoreInput({
  areaId,
  value,
  onChange,
  readOnly = false,
}: MTPScoreInputProps) {
  return (
    <div className={styles.scoreInput}>
      <div className={styles.scoreTrack} role="radiogroup" aria-label="Puntuación 0 a 5">
        {SCORES.map(score => {
          const color = getScoreColor(score)
          const isSelected = value === score

          return (
            <label
              key={score}
              className={styles.scoreOption}
              style={{ color: isSelected ? color : undefined }}
            >
              <input
                type="radio"
                name={`mtp-area-${areaId}`}
                value={score}
                checked={isSelected}
                onChange={() => !readOnly && onChange(areaId, score)}
                disabled={readOnly}
              />
              <span className={styles.scoreOptionBtn} style={isSelected ? { borderColor: color } : {}}>
                {score}
                <span className={styles.scoreOptionDot} style={{ backgroundColor: color }} />
              </span>
            </label>
          )
        })}
      </div>
      <div style={{ fontSize: '0.7rem', color: getScoreColor(value), fontWeight: 500 }}>
        {getScoreLabel(value)}
      </div>
    </div>
  )
}
