import type { Metadata } from 'next'
import { Playfair_Display, Bodoni_Moda, Montserrat } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['700', '800', '900'],
  variable: '--font-serif',
  display: 'swap',
})

const bodoni = Bodoni_Moda({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-bodoni',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Talent4Pro Matrices',
  description: 'Sistema de matrices de evaluación de talento',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${playfair.variable} ${bodoni.variable} ${montserrat.variable}`}>
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navigation />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
