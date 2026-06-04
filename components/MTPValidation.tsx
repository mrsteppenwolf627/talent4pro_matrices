import MTPDefinition from './MTPDefinition'
import { MTP_AREAS, getScoreColor } from '@/data/mtpAreas'
import type { MTPValidationResult } from '@/hooks/useMTP'
import styles from '@/styles/MTP.module.css'

interface MTPValidationProps {
  scores: Record<number, number>
  validating: boolean
  result: MTPValidationResult | null
  mtpText: string
  onValidate: () => void
  onMtpTextChange: (value: string) => void
}

export default function MTPValidation({
  scores,
  validating,
  result,
  mtpText,
  onValidate,
  onMtpTextChange,
}: MTPValidationProps) {
  // Areas with score >= 3 are considered "strengths"
  const strengths = MTP_AREAS.filter(a => (scores[a.id] ?? 0) >= 3)
  const totalScore = Object.values(scores).reduce((s, v) => s + v, 0)
  const maxScore = MTP_AREAS.length * 5
  const avgScore = MTP_AREAS.length > 0 ? totalScore / MTP_AREAS.length : 0

  return (
    <div className={styles.validationSection}>
      <div className={styles.validationHeader}>
        ★ Síntesis y Validación del MTP
      </div>

      <div className={styles.validationBody}>

        {/* Attribute chips — areas with score ≥ 3 */}
        <div>
          <p style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.5rem' }}>
            Atributos destacados (puntuación ≥ 3):
          </p>
          {strengths.length === 0 ? (
            <p style={{ fontSize: '0.825rem', color: '#6b7280' }}>
              Ningún área supera 3/5 aún. Aumenta las puntuaciones para ver tus atributos.
            </p>
          ) : (
            <div className={styles.attributesSummary}>
              {strengths.map(area => {
                const score = scores[area.id] ?? 0
                const color = getScoreColor(score)
                return (
                  <span
                    key={area.id}
                    className={styles.attributeChip}
                    style={{ borderColor: color, color }}
                  >
                    <span style={{ fontWeight: 700 }}>{score}/5</span>
                    {area.title}
                  </span>
                )
              })}
            </div>
          )}
        </div>

        {/* Summary scores */}
        <p style={{ fontSize: '0.825rem', color: '#6b7280' }}>
          Puntuación total: <strong>{totalScore}/{maxScore}</strong>
          {' · '}
          Media: <strong>{avgScore.toFixed(1)}/5</strong>
          {' · '}
          Áreas evaluadas: <strong>{Object.keys(scores).length}/{MTP_AREAS.length}</strong>
        </p>

        {/* Validate button */}
        <button
          type="button"
          className={styles.btnValidate}
          onClick={onValidate}
          disabled={validating || Object.keys(scores).length < MTP_AREAS.length}
          title={
            Object.keys(scores).length < MTP_AREAS.length
              ? 'Evalúa todas las áreas antes de validar'
              : 'Validar MTP'
          }
        >
          {validating ? 'Validando…' : '✓ Validar MTP'}
        </button>

        {Object.keys(scores).length < MTP_AREAS.length && (
          <p style={{ fontSize: '0.775rem', color: '#92400e' }}>
            Faltan {MTP_AREAS.length - Object.keys(scores).length} área(s) por evaluar.
          </p>
        )}

        {/* Result: OK */}
        {result?.isValid && (
          <div className={styles.resultOk}>
            <p className={styles.resultTitle}>✓ MTP Válido</p>
            <p style={{ fontSize: '0.875rem' }}>{result.message}</p>
            <MTPDefinition
              value={mtpText}
              onChange={onMtpTextChange}
            />
          </div>
        )}

        {/* Result: ERROR */}
        {result && !result.isValid && (
          <div className={styles.resultError}>
            <p className={styles.resultTitle}>✗ MTP Incompleto</p>
            {result.errors.length > 0 && (
              <ul className={styles.errorList}>
                {result.errors.map((e, i) => <li key={i}>{e}</li>)}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
