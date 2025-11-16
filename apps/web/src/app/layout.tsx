import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Stellar Loans | Auto Loan Refinancing in Texas',
  description:
    'AI-powered auto loan refinancing with transparent pricing. Save money on your car loan with no hidden fees. Serving Texas.',
  keywords: [
    'auto refinance',
    'car loan refinance',
    'Texas auto loans',
    'refinance car',
    'lower car payment',
    'stellar loans',
  ],
  metadataBase: new URL('https://stellarloans.io'),
  openGraph: {
    title: 'Stellar Loans | Auto Loan Refinancing in Texas',
    description:
      'AI-powered auto loan refinancing with transparent pricing. No hidden fees.',
    url: 'https://stellarloans.io',
    siteName: 'Stellar Loans',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stellar Loans | Auto Loan Refinancing in Texas',
    description:
      'AI-powered auto loan refinancing with transparent pricing. No hidden fees.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
