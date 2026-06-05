'use client'

import styles from '@/styles/Ikigai.module.css'

interface IkigaiCenterProps {
  value: string
  onChange: (id: 'ikigai', value: string) => void
  onSave: () => void
  quadrantsValues?: {
    passion: string
    vocation: string
    mission: string
    profession: string
  }
}

export default function IkigaiCenter({ value, onChange, onSave, quadrantsValues }: IkigaiCenterProps) {
  const generateSuggestion = () => {
    if (!quadrantsValues) return ''
    const parts = []
    if (quadrantsValues.passion) parts.push(`Mi pasión es ${quadrantsValues.passion}`)
    if (quadrantsValues.vocation) parts.push(`mi vocación es ${quadrantsValues.vocation}`)
    if (quadrantsValues.mission) parts.push(`mi misión es ${quadrantsValues.mission}`)
    if (quadrantsValues.profession) parts.push(`y mi profesión es ${quadrantsValues.profession}`)
    return parts.join(', ').replace(/, ([^,]*)$/, ' $1') + '.'
  }

  const suggestion = generateSuggestion()

  return (
    <div className={styles.centerSection}>
      <div className={styles.centerBox}>
        <h2 className={styles.centerTitle}>MI IKIGAI</h2>
        <p className={styles.centerSubtitle}>
          La síntesis de tu propósito de vida. La intersección perfecta entre lo que amas, en lo que eres bueno, lo que el mundo necesita y por lo que te pagan.
        </p>
        
        {!value && suggestion.length > 5 && (
          <div style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: '#f0fdf4', borderRadius: '0.5rem', border: '1px dashed #22c55e', fontSize: '0.875rem', color: '#166534', textAlign: 'left' }}>
            <strong>Sugerencia auto-generada:</strong><br/>
            {suggestion}
            <button 
              onClick={() => onChange('ikigai', suggestion)}
              style={{ marginLeft: '1rem', padding: '0.25rem 0.5rem', backgroundColor: '#22c55e', color: 'white', border: 'none', borderRadius: '0.25rem', cursor: 'pointer', fontSize: '0.75rem' }}
            >
              Usar sugerencia
            </button>
          </div>
        )}

        <textarea
          className={styles.centerTextarea}
          placeholder="Escribe aquí tu propósito de vida definitivo..."
          value={value}
          onChange={(e) => onChange('ikigai', e.target.value)}
        />
        <button className={styles.btnSave} onClick={onSave}>
          GUARDAR IKIGAI
        </button>
      </div>
    </div>
  )
}
