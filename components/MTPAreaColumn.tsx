'use client'

import type { MTPArea } from '@/data/mtpAreasReal'
import MTPAreaBlock from './MTPAreaBlock'
import styles from '@/styles/MTPNew.module.css'

interface MTPAreaColumnProps {
  title: string
  areas: MTPArea[]
  type: 'internal' | 'external'
  scores: Record<number, number>
  onScoreChange: (areaId: number, value: number) => void
}

export default function MTPAreaColumn({ title, areas, type, scores, onScoreChange }: MTPAreaColumnProps) {
  const columnClass = type === 'internal' ? styles.internalColumn : styles.externalColumn

  return (
    <div className={`${styles.column} ${columnClass}`}>
      <h2 className={styles.columnTitle}>{title}</h2>
      {areas.map((area) => (
        <MTPAreaBlock
          key={area.id}
          area={area}
          score={scores[area.id] || 0}
          onScoreChange={onScoreChange}
        />
      ))}
    </div>
  )
}
