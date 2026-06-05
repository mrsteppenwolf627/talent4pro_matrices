import styles from '@/styles/ui.module.css'

interface SectionProps {
  children: React.ReactNode
  bgLight?: boolean
  className?: string
}

export function Section({ children, bgLight = false, className }: SectionProps) {
  return (
    <section className={`${styles.section} ${bgLight ? styles.sectionBgLight : ''} ${className || ''}`}>
      {children}
    </section>
  )
}
