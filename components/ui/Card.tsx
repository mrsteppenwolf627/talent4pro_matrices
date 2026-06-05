import styles from '@/styles/ui.module.css'

interface CardProps {
  children: React.ReactNode
  className?: string
  borderLeft?: boolean
  style?: React.CSSProperties
}

export function Card({ children, className, borderLeft, style }: CardProps) {
  const classes = [
    styles.card,
    borderLeft ? styles.cardBorderLeft : '',
    className,
  ].filter(Boolean).join(' ')

  return (
    <div className={classes} style={style}>
      {children}
    </div>
  )
}
