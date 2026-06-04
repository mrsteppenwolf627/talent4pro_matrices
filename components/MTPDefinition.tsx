import styles from '@/styles/MTP.module.css'

interface MTPDefinitionProps {
  value: string
  onChange: (value: string) => void
  readOnly?: boolean
}

export default function MTPDefinition({ value, onChange, readOnly = false }: MTPDefinitionProps) {
  return (
    <div className={styles.mtpDefinition}>
      <p className={styles.mtpDefinitionLabel}>Tu Propósito Transformador Masivo (MTP)</p>
      <textarea
        className={styles.mtpDefinitionInput}
        value={value}
        onChange={e => onChange(e.target.value)}
        disabled={readOnly}
        rows={3}
        placeholder="Edita aquí tu MTP definitivo…"
        aria-label="Propósito Transformador Masivo"
      />
    </div>
  )
}
