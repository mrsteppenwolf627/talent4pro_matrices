import styles from '@/styles/ui.module.css'

interface ProgressBarProps {
  value: number
  max?: number
  color?: 'primary' | 'success' | 'warning' | 'danger' | 'auto'
  className?: string
}

const colorMap = {
  primary: styles.progressColorPrimary,
  success: styles.progressColorSuccess,
  warning: styles.progressColorWarning,
  danger:  styles.progressColorDanger,
}

export function ProgressBar({ value, max = 100, color = 'auto', className }: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))

  let resolvedColor: keyof typeof colorMap
  if (color === 'auto') {
    if (pct >= 100)      resolvedColor = 'success'
    else if (pct >= 50)  resolvedColor = 'warning'
    else                 resolvedColor = 'danger'
  } else {
    resolvedColor = color
  }

  return (
    <div className={`${styles.progressTrack} ${className || ''}`} role="progressbar" aria-valuenow={value} aria-valuemax={max}>
      <div
        className={`${styles.progressFill} ${colorMap[resolvedColor]}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}
