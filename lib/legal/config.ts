import type { Locale } from "@/lib/i18n/config"

export type LegalSlug = "privacy-policy" | "cookies" | "terms-of-use"

export const LEGAL_DOC_FILES: Record<LegalSlug, Record<Locale, string>> = {
  "privacy-policy": {
    en: "Privacy Policy of Aksum.md",
    es: "Política de Privacidad.md",
  },
  cookies: {
    en: "Cookies Policy.md",
    es: "Política de Cookies.md",
  },
  "terms-of-use": {
    en: "Terms of Use Aksum.md",
    es: "Términos de Uso.md",
  },
}
