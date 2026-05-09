import type { Metadata } from "next"
import { LegalDocPage } from "@/components/legal-doc-page"
import { getDictionary } from "@/lib/i18n/config"
import { getServerLocale } from "@/lib/i18n/server"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale()
  const { legal } = getDictionary(locale)
  return {
    title: legal.termsOfUse.metaTitle,
    description: legal.termsOfUse.metaDescription,
  }
}

export default function TermsOfUsePage() {
  return <LegalDocPage slug="terms-of-use" />
}
