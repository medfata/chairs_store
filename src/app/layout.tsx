import { Inter } from 'next/font/google'
import './globals.css'
import type { Metadata } from 'next'
import LanguageProviderWrapper from '../components/LanguageProviderWrapper'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Premium Chair Store',
  description: 'Découvrez notre collection de chaises et pièces détachées de haute qualité',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <LanguageProviderWrapper>
          {children}
        </LanguageProviderWrapper>
      </body>
    </html>
  )
}
