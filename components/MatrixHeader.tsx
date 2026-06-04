import styles from '@/styles/MatrixGrid.module.css'

interface MatrixHeaderProps {
  columns: string[]
  rowKeyLabel?: string
}

export default function MatrixHeader({ columns, rowKeyLabel = 'Competencia' }: MatrixHeaderProps) {
  return (
    <thead className={styles.thead}>
      <tr>
        <th className={`${styles.th} ${styles.thRowKey}`}>
          {rowKeyLabel}
        </th>
        {columns.map(col => (
          <th key={col} className={styles.th}>
            {col}
          </th>
        ))}
      </tr>
    </thead>
  )
}
