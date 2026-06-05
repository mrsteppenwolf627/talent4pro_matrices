import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <span className={styles.brand}>Talent4Pro</span>
        <p className={styles.copy}>
          &copy; {new Date().getFullYear()} Talent4Pro. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}
