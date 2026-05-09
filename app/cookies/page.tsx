import type { Metadata } from "next"
import { LegalDocPage } from "@/components/legal-doc-page"
import { getDictionary } from "@/lib/i18n/config"
import { getServerLocale } from "@/lib/i18n/server"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale()
  const { legal } = getDictionary(locale)
  return {
    title: legal.cookies.metaTitle,
    description: legal.cookies.metaDescription,
  }
}

export default function CookiePolicyPage() {
  return <LegalDocPage slug="cookies" />
}
