'use client'

import styles from '@/styles/Ikigai.module.css'

interface IkigaiCenterProps {
  value: string
  onChange: (id: 'ikigai', value: string) => void
  onSave: () => void
}

export default function IkigaiCenter({ value, onChange, onSave }: IkigaiCenterProps) {
  return (
    <div className={styles.centerSection}>
      <div className={styles.centerBox}>
        <h2 className={styles.centerTitle}>🎯 MI IKIGAI (Síntesis)</h2>
        <p className={styles.centerSubtitle}>
          Tu propósito de vida definitivo, la intersección de tus respuestas.
        </p>
        <textarea
          className={styles.centerTextarea}
          placeholder="Escribe aquí tu síntesis de Ikigai..."
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
