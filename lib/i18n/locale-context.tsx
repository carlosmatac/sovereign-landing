"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE,
  LOCALE_COOKIE_MAX_AGE,
  getDictionary,
  isLocale,
  type Dictionary,
  type Locale,
} from "./config"

interface LocaleContextValue {
  locale: Locale
  t: Dictionary
  setLocale: (next: Locale) => void
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

interface LocaleProviderProps {
  /**
   * Locale resolved on the server (from cookie) and forwarded into the
   * client tree. Using this prop guarantees server and client render the
   * exact same content on first paint — no hydration mismatch, no flash
   * of English content for a Spanish-locked user.
   */
  initialLocale: Locale
  children: React.ReactNode
}

export function LocaleProvider({ initialLocale, children }: LocaleProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale)
  const router = useRouter()

  // If a different tab updates the cookie/localStorage we keep the
  // current tab in sync. Cheap and rarely fires; safe to register once.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === LOCALE_COOKIE && isLocale(e.newValue)) {
        setLocaleState(e.newValue)
      }
    }
    window.addEventListener("storage", onStorage)
    return () => window.removeEventListener("storage", onStorage)
  }, [])

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    if (typeof document !== "undefined") {
      // Cookie — read by the server so SSR matches the user's last choice.
      document.cookie =
        `${LOCALE_COOKIE}=${next}; Max-Age=${LOCALE_COOKIE_MAX_AGE};` +
        ` Path=/; SameSite=Lax`
      // Mirror to localStorage so cross-tab syncs propagate via the storage event.
      try {
        window.localStorage.setItem(LOCALE_COOKIE, next)
      } catch {
        // localStorage can throw in private modes — safe to ignore.
      }
      // Update the <html lang="…"> attribute live so accessibility tools
      // (screen readers, browser translate banners, etc.) get the right hint.
      document.documentElement.lang = next
    }
    // Re-fetch the current route's RSC payload with the updated cookie so
    // SERVER components (subpages, page bodies that read getServerT()) swap
    // to the new locale immediately. Client components already update via
    // the state setter above; this line is what makes the SSR side react.
    router.refresh()
  }, [router])

  const value = useMemo<LocaleContextValue>(
    () => ({ locale, t: getDictionary(locale), setLocale }),
    [locale, setLocale]
  )

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

function useLocaleContext(): LocaleContextValue {
  const ctx = useContext(LocaleContext)
  if (!ctx) {
    // Safe fallback — components built before the provider was wired up
    // still render in the default locale instead of crashing.
    return {
      locale: DEFAULT_LOCALE,
      t: getDictionary(DEFAULT_LOCALE),
      setLocale: () => {},
    }
  }
  return ctx
}

/** Returns the active dictionary. Use as `const t = useT()` then `t.hero.headline`. */
export function useT(): Dictionary {
  return useLocaleContext().t
}

/** Returns the active locale + setter for the language switcher. */
export function useLocale(): { locale: Locale; setLocale: (next: Locale) => void } {
  const { locale, setLocale } = useLocaleContext()
  return { locale, setLocale }
}
