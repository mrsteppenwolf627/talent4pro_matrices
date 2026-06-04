import styles from '@/styles/FichaDefinicion.module.css'

interface FichaFieldProps {
  label: string
  fieldKey: string
  value: string
  placeholder?: string
  onChange: (key: string, value: string) => void
  readOnly?: boolean
}

export default function FichaField({
  label,
  fieldKey,
  value,
  placeholder,
  onChange,
  readOnly = false,
}: FichaFieldProps) {
  return (
    <div className={styles.field}>
      <label className={styles.fieldLabel} htmlFor={fieldKey}>
        {label}
      </label>
      <textarea
        id={fieldKey}
        className={`${styles.fieldInput} ${value ? styles.fieldInputFilled : ''}`}
        value={value}
        placeholder={placeholder}
        onChange={e => onChange(fieldKey, e.target.value)}
        disabled={readOnly}
        rows={5}
        aria-label={label}
      />
    </div>
  )
}
