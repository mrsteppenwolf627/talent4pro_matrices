import { useState } from 'react'
import FichaField from './FichaField'
import type { FichaSection as FichaSectionType } from '@/data/fichaDefinicionFields'
import styles from '@/styles/FichaDefinicion.module.css'

interface FichaSectionProps {
  section: FichaSectionType
  data: Record<string, string>
  onFieldChange: (key: string, value: string) => void
  defaultOpen?: boolean
  readOnly?: boolean
}

export default function FichaSection({
  section,
  data,
  onFieldChange,
  defaultOpen = false,
  readOnly = false,
}: FichaSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  const filledCount = section.fields.filter(f => data[f.key]?.trim()).length
  const totalCount = section.fields.length
  const allFilled = filledCount === totalCount

  return (
    <div className={styles.section}>
      <button
        type="button"
        className={styles.sectionHeader}
        onClick={() => setIsOpen(o => !o)}
        aria-expanded={isOpen}
        aria-controls={`section-body-${section.id}`}
      >
        <div className={styles.sectionHeaderLeft}>
          <span className={styles.sectionTitle}>{section.title}</span>
          <span className={`${styles.sectionBadge} ${allFilled ? styles.sectionBadgeFilled : ''}`}>
            {filledCount}/{totalCount}
          </span>
        </div>

        {/* Chevron icon */}
        <svg
          className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {isOpen && (
        <div
          id={`section-body-${section.id}`}
          className={styles.sectionBody}
          role="region"
          aria-label={section.title}
        >
          {section.fields.map(field => (
            <FichaField
              key={field.key}
              fieldKey={field.key}
              label={field.label}
              value={data[field.key] ?? ''}
              placeholder={field.placeholder}
              onChange={onFieldChange}
              readOnly={readOnly}
            />
          ))}
        </div>
      )}
    </div>
  )
}
