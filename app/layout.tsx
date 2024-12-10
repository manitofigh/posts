import { Cormorant_Garamond, Aboreto } from 'next/font/google'
import { Providers } from './providers'
import Header from '@/components/Header'
import './globals.css'

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-cormorant-garamond',
})

const aboreto = Aboreto({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-aboreto',
})

export const metadata = {
  title: 'Mani Tofigh\'s Boring Writings',
  description: 'Some stuff that I find boring, and worthy of writing about.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${cormorantGaramond.variable} ${aboreto.variable} font-sans antialiased`}>
        <Providers>
          <Header />
          <main className="container mx-auto px-4 py-8">{children}</main>
        </Providers>
      </body>
    </html>
  )
}
