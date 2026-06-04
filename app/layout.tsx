import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Talent4Pro Matrices',
  description: 'Sistema de matrices de evaluación de talento',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
