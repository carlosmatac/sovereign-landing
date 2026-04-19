// Server-side dictionary access for App Router pages.
//
// Server Components can't subscribe to React context, so they read the
// persisted locale directly from the cookie via this helper. The client-side
// `LocaleProvider` is initialised from the same cookie, which keeps SSR and
// hydration aligned and allows the cookie to act as the single source of
// truth across both rendering contexts.
//
// Usage from a page:
//
//   import { getServerT } from "@/lib/i18n/server"
//   export default async function Page() {
//     const t = await getServerT()
//     return <h1>{t.useCases.hero.headline}</h1>
//   }

import "server-only"
import { cookies } from "next/headers"
import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE,
  getDictionary,
  isLocale,
  type Dictionary,
  type Locale,
} from "./config"

export async function getServerLocale(): Promise<Locale> {
  const cookieStore = await cookies()
  const value = cookieStore.get(LOCALE_COOKIE)?.value
  return isLocale(value) ? value : DEFAULT_LOCALE
}

export async function getServerT(): Promise<Dictionary> {
  return getDictionary(await getServerLocale())
}
