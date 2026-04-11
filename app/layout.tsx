import type { Metadata } from 'next'
import { Inter, Playfair_Display, Gabarito } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-serif",
});
const gabarito = Gabarito({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-gabarito",
});

export const metadata: Metadata = {
  title: 'Sovereign | Frontier Markets Intelligence, Decoded',
  description: 'Transforming exclusive interviews with Ministers, CEOs, and Diplomats into a searchable, AI-powered business intelligence database for the Global South.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/sovereign_log_fondo.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${playfair.variable} ${gabarito.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
