import styles from '@/styles/ui.module.css'

interface BadgeProps {
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'default'
  children: React.ReactNode
  className?: string
}

const variantMap = {
  primary: styles.badgePrimary,
  success: styles.badgeSuccess,
  warning: styles.badgeWarning,
  error:   styles.badgeError,
  default: styles.badgeDefault,
}

export function Badge({ variant = 'default', children, className }: BadgeProps) {
  return (
    <span className={`${styles.badge} ${variantMap[variant]} ${className || ''}`}>
      {children}
    </span>
  )
}
