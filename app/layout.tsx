import type { Metadata } from 'next'
import { Inter, Playfair_Display, Gabarito } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { cookies } from 'next/headers'
import { PageTransition } from '@/components/page-transition'
import { LocaleProvider } from '@/lib/i18n/locale-context'
import { DEFAULT_LOCALE, LOCALE_COOKIE, isLocale } from '@/lib/i18n/config'
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
  title: 'Aksum | Internal Knowledge Platform',
  description: 'Aksum turns interviews, documents, and conversations into reusable internal knowledge — connected, searchable, and ready for your team.',
  generator: 'v0.app',
  // Icons are handled by the Next.js app-router file convention via
  // `app/icon.svg` — that gives us a content-fingerprinted URL which forces
  // browsers to bypass any cached favicon from a previous brand.
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Read the persisted locale on the server so SSR matches the user's last
  // choice and `useT()` consumers receive a real provider — not the safe
  // English fallback (which is what makes the switcher silently no-op).
  const cookieStore = await cookies()
  const cookieValue = cookieStore.get(LOCALE_COOKIE)?.value
  const initialLocale = isLocale(cookieValue) ? cookieValue : DEFAULT_LOCALE

  return (
    <html lang={initialLocale}>
      <body className={`${inter.variable} ${playfair.variable} ${gabarito.variable} font-sans antialiased`}>
        <LocaleProvider initialLocale={initialLocale}>
          <PageTransition>{children}</PageTransition>
        </LocaleProvider>
        <Analytics />
      </body>
    </html>
  )
}
