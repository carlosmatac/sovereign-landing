import Link from "next/link"
import { Header } from "@/components/header"
import { LegalMarkdownBody } from "@/components/legal-markdown"
import { SiteFooterBar } from "@/components/site-footer-bar"
import { getServerLocale, getServerT } from "@/lib/i18n/server"
import type { LegalSlug } from "@/lib/legal/config"
import { loadLegalDoc } from "@/lib/legal/load-doc"

const GRAIN_BG =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)'/%3E%3C/svg%3E\")"

const DOT_GRID =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Ccircle cx='0.5' cy='0.5' r='0.75' fill='white'/%3E%3C/svg%3E\")"

export async function LegalDocPage({ slug }: { slug: LegalSlug }) {
  const locale = await getServerLocale()
  const markdown = await loadLegalDoc(slug, locale)
  const t = await getServerT()

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#060D1C" }}>
      <Header />

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage: GRAIN_BG,
          backgroundRepeat: "repeat",
          backgroundSize: "300px 300px",
          opacity: 0.035,
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage: DOT_GRID,
          backgroundRepeat: "repeat",
          backgroundSize: "24px 24px",
          opacity: 0.022,
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 55% at 50% -10%, rgba(10,24,56,0.55) 0%, transparent 55%)",
        }}
      />

      <main className="relative z-10">
        <div className="mx-auto max-w-3xl px-6 pb-24 pt-28 md:pt-36">
          <Link
            href="/"
            className="mb-12 inline-flex text-sm tracking-[-0.011em] text-white/40 transition-colors hover:text-white/65"
          >
            {t.shared.footerNav.back}
          </Link>
          <article className="pb-8">
            <LegalMarkdownBody markdown={markdown} />
          </article>
        </div>
      </main>

      <div className="relative z-10" style={{ backgroundColor: "#060D1C" }}>
        <SiteFooterBar />
      </div>
    </div>
  )
}
