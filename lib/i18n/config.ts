// Locale registry for the landing.
//
// Adding a new language is a 3-step change:
//   1. Create lib/i18n/dictionaries/<code>.ts that satisfies `Dictionary`.
//   2. Add it to `dictionaries` and `LOCALES` below.
//   3. Add it to the LanguageSwitcher options.

import { en } from "./dictionaries/en"
import { es } from "./dictionaries/es"
import type { Dictionary } from "./dictionaries/en"

export type Locale = "en" | "es"

export const LOCALES: readonly Locale[] = ["en", "es"] as const
export const DEFAULT_LOCALE: Locale = "en"

// Cookie name kept short and namespaced so it doesn't collide with anything.
export const LOCALE_COOKIE = "sv-locale"
// 1-year persistence — long enough that a user choosing ES once stays in ES.
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365

const dictionaries: Record<Locale, Dictionary> = { en, es }

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries[DEFAULT_LOCALE]
}

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (LOCALES as readonly string[]).includes(value)
}

export type { Dictionary }
