import "server-only"
import fs from "node:fs/promises"
import path from "node:path"
import type { Locale } from "@/lib/i18n/config"
import { LEGAL_DOC_FILES, type LegalSlug } from "./config"

export async function loadLegalDoc(slug: LegalSlug, locale: Locale): Promise<string> {
  const filename = LEGAL_DOC_FILES[slug][locale]
  const fullPath = path.join(process.cwd(), "legal", filename)
  return fs.readFile(fullPath, "utf-8")
}
