import { useCallback } from 'react'
import type { CellContent } from '@/lib/types'
import styles from '@/styles/MatrixGrid.module.css'

interface MatrixCellProps {
  rowKey: string
  colKey: string
  value: CellContent['value']
  type: CellContent['type']
  onChange: (rowKey: string, colKey: string, value: CellContent['value']) => void
  readOnly?: boolean
}

export default function MatrixCell({
  rowKey,
  colKey,
  value,
  type,
  onChange,
  readOnly = false,
}: MatrixCellProps) {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const raw = e.target
      if (raw instanceof HTMLInputElement && raw.type === 'checkbox') {
        onChange(rowKey, colKey, raw.checked)
      } else if (raw instanceof HTMLInputElement && raw.type === 'number') {
        onChange(rowKey, colKey, raw.valueAsNumber)
      } else {
        onChange(rowKey, colKey, raw.value)
      }
    },
    [rowKey, colKey, onChange]
  )

  if (type === 'formula') {
    return (
      <div className={styles.cellFormula} title="Valor calculado">
        {String(value ?? '')}
      </div>
    )
  }

  if (type === 'checkbox') {
    return (
      <input
        type="checkbox"
        className={styles.cellInput}
        checked={Boolean(value)}
        onChange={handleChange}
        disabled={readOnly}
        aria-label={`${rowKey} ${colKey}`}
      />
    )
  }

  if (type === 'number') {
    return (
      <input
        type="number"
        className={styles.cellInput}
        value={value as number ?? ''}
        onChange={handleChange}
        disabled={readOnly}
        step="any"
        aria-label={`${rowKey} ${colKey}`}
      />
    )
  }

  // Default: text (textarea for multi-line descriptors)
  return (
    <textarea
      className={styles.cellInput}
      value={value as string ?? ''}
      onChange={handleChange}
      disabled={readOnly}
      rows={2}
      aria-label={`${rowKey} ${colKey}`}
    />
  )
}
