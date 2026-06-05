import styles from '@/styles/ui.module.css'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export function Button({ variant = 'primary', size = 'md', className, ...props }: ButtonProps) {
  const classes = [
    styles.button,
    styles[variant],
    styles[size],
    className,
  ].filter(Boolean).join(' ')

  return <button className={classes} {...props} />
}
