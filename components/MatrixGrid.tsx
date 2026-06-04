import { useMemo } from 'react'
import MatrixHeader from './MatrixHeader'
import MatrixRow from './MatrixRow'
import type { MatrixData, CellContent } from '@/lib/types'
import styles from '@/styles/MatrixGrid.module.css'

interface MatrixGridProps {
  data: MatrixData[]
  onCellChange: (rowKey: string, colKey: string, value: CellContent['value']) => void
  loading?: boolean
  readOnly?: boolean
  // Optional labels to display instead of raw keys
  columnLabels?: Record<string, string>
  rowLabels?: Record<string, string>
}

export default function MatrixGrid({
  data,
  onCellChange,
  loading = false,
  readOnly = false,
  columnLabels = {},
  rowLabels = {},
}: MatrixGridProps) {

  // Derive ordered row keys and column keys from data (preserves insertion order)
  const { rows, columns } = useMemo(() => {
    const rowSet = new Map<string, true>()
    const colSet = new Map<string, true>()
    for (const cell of data) {
      rowSet.set(cell.row_key, true)
      colSet.set(cell.column_key, true)
    }
    return {
      rows: [...rowSet.keys()],
      columns: [...colSet.keys()],
    }
  }, [data])

  // Build a 2-level lookup: rowKey → colKey → MatrixData
  const lookup = useMemo(() => {
    const map: Record<string, Record<string, MatrixData>> = {}
    for (const cell of data) {
      if (!map[cell.row_key]) map[cell.row_key] = {}
      map[cell.row_key][cell.column_key] = cell
    }
    return map
  }, [data])

  // Column display labels
  const columnDisplayLabels = columns.map(k => columnLabels[k] ?? k)

  return (
    <div className={styles.container}>
      <div className={styles.tableWrapper}>
        <table className={styles.table} role="grid">
          <MatrixHeader columns={columnDisplayLabels} />

          <tbody className={styles.tbody}>
            {loading ? (
              <tr className={styles.loadingRow}>
                <td colSpan={columns.length + 1}>
                  <span className={styles.spinner} aria-hidden="true" />
                  Cargando datos...
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr className={styles.loadingRow}>
                <td colSpan={columns.length + 1}>
                  No hay datos en esta matriz.
                </td>
              </tr>
            ) : (
              rows.map(rowKey => (
                <MatrixRow
                  key={rowKey}
                  rowKey={rowKey}
                  rowLabel={rowLabels[rowKey]}
                  columns={columns}
                  cellMap={lookup[rowKey] ?? {}}
                  onCellChange={onCellChange}
                  readOnly={readOnly}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
