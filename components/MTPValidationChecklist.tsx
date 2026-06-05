'use client'

import { useState } from 'react'
import { MTP_VALIDATION_MUST_HAVE, MTP_VALIDATION_MUST_NOT } from '@/data/mtpAreasReal'
import styles from '@/styles/MTPNew.module.css'

export default function MTPValidationChecklist() {
  const [checkedMust, setCheckedMust] = useState<Record<number, boolean>>({})
  const [checkedMustNot, setCheckedMustNot] = useState<Record<number, boolean>>({})

  const toggleMust = (idx: number) => {
    setCheckedMust(prev => ({ ...prev, [idx]: !prev[idx] }))
  }

  const toggleMustNot = (idx: number) => {
    setCheckedMustNot(prev => ({ ...prev, [idx]: !prev[idx] }))
  }

  return (
    <div className={styles.checklistGrid}>
      <div className={styles.checkSection}>
        <h3 className={`${styles.checkTitle} ${styles.titleMust}`}>Debe tener (Must Have)</h3>
        {MTP_VALIDATION_MUST_HAVE.map((item, idx) => (
          <label key={idx} className={styles.checkItem}>
            <input
              type="checkbox"
              className={styles.checkbox}
              checked={!!checkedMust[idx]}
              onChange={() => toggleMust(idx)}
            />
            {item}
          </label>
        ))}
      </div>

      <div className={styles.checkSection}>
        <h3 className={`${styles.checkTitle} ${styles.titleMustNot}`}>No debe tener (Must NOT)</h3>
        {MTP_VALIDATION_MUST_NOT.map((item, idx) => (
          <label key={idx} className={styles.checkItem}>
            <input
              type="checkbox"
              className={styles.checkbox}
              checked={!!checkedMustNot[idx]}
              onChange={() => toggleMustNot(idx)}
            />
            {item}
          </label>
        ))}
      </div>
    </div>
  )
}
