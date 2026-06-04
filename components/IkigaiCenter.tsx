import styles from '@/styles/Ikigai.module.css'

interface IkigaiCenterProps {
  value: string
  onChange: (value: string) => void
  autoSynthesis: string // generated from quadrant content
  readOnly?: boolean
}

export default function IkigaiCenter({
  value,
  onChange,
  autoSynthesis,
  readOnly = false,
}: IkigaiCenterProps) {
  return (
    <div className={styles.center}>
      <div className={styles.centerHeader}>
        <span className={styles.centerIcon} aria-hidden="true">☯</span>
        Tu Ikigai — Propósito de Vida
      </div>

      <div className={styles.centerBody}>
        {autoSynthesis && !value && (
          <p className={styles.centerHint}>
            Síntesis automática (puedes editarla y personalizarla):
          </p>
        )}

        {autoSynthesis && !value ? (
          <>
            <p className={styles.centerPlaceholder}>{autoSynthesis}</p>
            <button
              type="button"
              onClick={() => onChange(autoSynthesis)}
              style={{
                background: 'none',
                border: '1px solid #2D5016',
                borderRadius: '6px',
                padding: '0.4rem 0.85rem',
                color: '#2D5016',
                fontSize: '0.8rem',
                cursor: 'pointer',
                alignSelf: 'flex-start',
              }}
            >
              Usar esta síntesis
            </button>
          </>
        ) : (
          <textarea
            className={styles.centerInput}
            value={value}
            onChange={e => onChange(e.target.value)}
            disabled={readOnly}
            rows={4}
            placeholder={
              autoSynthesis
                ? autoSynthesis
                : 'Completa los 4 cuadrantes para ver tu síntesis de Ikigai…'
            }
            aria-label="Tu Ikigai — síntesis personal"
          />
        )}

        {!autoSynthesis && (
          <p className={styles.centerHint}>
            Rellena los 4 cuadrantes para que aparezca tu síntesis de Ikigai.
          </p>
        )}
      </div>
    </div>
  )
}
