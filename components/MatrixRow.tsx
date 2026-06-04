import MatrixCell from './MatrixCell'
import type { MatrixData, CellContent } from '@/lib/types'
import styles from '@/styles/MatrixGrid.module.css'

interface MatrixRowProps {
  rowKey: string
  rowLabel?: string
  columns: string[]
  // Lookup map: colKey → cell data (may be undefined for empty cells)
  cellMap: Record<string, MatrixData | undefined>
  onCellChange: (rowKey: string, colKey: string, value: CellContent['value']) => void
  readOnly?: boolean
}

export default function MatrixRow({
  rowKey,
  rowLabel,
  columns,
  cellMap,
  onCellChange,
  readOnly = false,
}: MatrixRowProps) {
  return (
    <tr>
      <td className={styles.tdRowKey} title={rowKey}>
        {rowLabel ?? rowKey}
      </td>

      {columns.map(colKey => {
        const cell = cellMap[colKey]
        const value = cell?.content.value ?? ''
        const type = cell?.content.type ?? 'text'

        return (
          <td key={colKey} className={styles.td}>
            <MatrixCell
              rowKey={rowKey}
              colKey={colKey}
              value={value}
              type={type}
              onChange={onCellChange}
              readOnly={readOnly}
            />
          </td>
        )
      })}
    </tr>
  )
}
