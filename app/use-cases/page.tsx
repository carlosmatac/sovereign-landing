import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { ArrowRight } from "lucide-react"
import { getServerT } from "@/lib/i18n/server"
import { getDictionary } from "@/lib/i18n/config"

// Metadata is generated server-side at request time. We use the EN dictionary
// for the static export here — Next.js metadata is cached, so dynamic per-locale
// titles would require generateMetadata + reading the cookie there too. Keeping
// EN as the canonical SEO target is the simpler, safer default.
export const metadata: Metadata = {
  title: getDictionary("en").useCases.metaTitle,
  description: getDictionary("en").useCases.metaDescription,
}

// ─── Texture constants ────────────────────────────────────────────────────────

const GRAIN_BG =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)'/%3E%3C/svg%3E\")"

const DOT_GRID =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Ccircle cx='0.5' cy='0.5' r='0.75' fill='white'/%3E%3C/svg%3E\")"

// ─── Section image with cinematic scrim + optional overlay title ─────────────

function SectionImage({
  src,
  alt,
  aspectClass,
  label,
  headline,
}: {
  src: string
  alt: string
  aspectClass: string
  label?: string
  headline?: string
}) {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-2xl ${aspectClass}`}
      style={{ border: "1px solid rgba(147,147,147,0.12)" }}
    >
      {/* Photo — slightly dimmed so the overlay text breathes */}
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover object-center"
        style={{ opacity: 0.72 }}
        sizes="(min-width: 1024px) 900px, 100vw"
      />

      {/* Deep bottom scrim — anchors the text overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(6,13,28,0.96) 0%, rgba(6,13,28,0.70) 28%, rgba(6,13,28,0.20) 55%, transparent 100%)",
        }}
      />

      {/* Subtle top-edge darkening so the image doesn't blow out at the top */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(6,13,28,0.30) 0%, transparent 30%)",
        }}
      />

      {/* Title overlay — bottom-left anchored */}
      {(label || headline) && (
        <div className="absolute inset-x-0 bottom-0 p-7 md:p-10">
          {label && (
            <p
              className="mb-3 font-serif text-3xl font-normal leading-[1.08] tracking-[-0.020em] text-white md:text-4xl lg:text-[2.8rem]"
              style={{ textShadow: "0 2px 16px rgba(0,0,0,0.60)" }}
            >
              {label}
            </p>
          )}
          {headline && (
            <h2
              className="text-[13px] font-normal leading-[1.55] tracking-[-0.008em] md:text-[14px]"
              style={{ color: "rgba(255,255,255,0.58)", textShadow: "0 1px 8px rgba(0,0,0,0.55)" }}
            >
              {headline}
            </h2>
          )}
        </div>
      )}
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function UseCasesPage() {
  const t = await getServerT()
  const u = t.useCases

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#060D1C" }}>
      <Header />

      {/* Textures */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{ backgroundImage: GRAIN_BG, backgroundRepeat: "repeat", backgroundSize: "300px 300px", opacity: 0.035 }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{ backgroundImage: DOT_GRID, backgroundRepeat: "repeat", backgroundSize: "24px 24px", opacity: 0.022 }}
      />

      <main className="relative z-10 overflow-x-hidden">

        {/* ── HERO ──────────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 100% 60% at 50% -10%, rgba(10,22,52,0.92) 0%, transparent 60%)",
            }}
          />
          <div className="relative mx-auto max-w-5xl px-6 pb-20 pt-32 md:pb-24 md:pt-44">
            <p
              className="mb-5 text-[11px] font-medium uppercase tracking-[0.14em]"
              style={{ color: "rgba(255,255,255,0.28)" }}
            >
              {u.eyebrow}
            </p>
            <h1 className="mb-7 max-w-2xl font-serif text-5xl font-normal leading-[1.05] tracking-[-0.032em] text-white md:text-6xl lg:text-[4rem]">
              {u.headline}
            </h1>
            <p
              className="max-w-xl text-[16px] leading-[1.82] tracking-[-0.011em]"
              style={{ color: "rgba(255,255,255,0.48)" }}
            >
              {u.intro}
            </p>

            {/* Thin hairline rule */}
            <div
              aria-hidden="true"
              className="mt-16 h-px"
              style={{ background: "rgba(255,255,255,0.07)" }}
            />
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            01 — Sales Teams
            Layout: wide cinematic image full-width above, copy below centre
        ════════════════════════════════════════════════════════════════════ */}
        <section
          id="sales"
          className="relative border-t border-white/[0.06]"
          style={{ background: "#060D1C" }}
        >
          {/* Accent glow — warm blue */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(8,20,58,0.85) 0%, transparent 60%)",
            }}
          />

          <div className="relative mx-auto max-w-5xl px-6 pt-20 md:pt-28">
            <SectionImage
              src="/savannah.png"
              alt={u.sales.imageAlt}
              aspectClass="aspect-[21/8]"
              label={u.sales.label}
              headline={u.sales.headline}
            />

            {/* Copy — centred under the wide image */}
            <div className="mx-auto mt-10 max-w-2xl pb-24 text-center">
              <p
                className="text-[15px] leading-[1.82] tracking-[-0.011em]"
                style={{ color: "rgba(255,255,255,0.50)" }}
              >
                {u.sales.body}
              </p>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            02 — Editorial Teams
            Layout: portrait image left (40%), copy right (60%) — asymmetric
        ════════════════════════════════════════════════════════════════════ */}
        <section
          id="editorial"
          className="relative border-t border-white/[0.06]"
          style={{ background: "#060D1C" }}
        >
          {/* Accent glow — cool green tint */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 65% 55% at 20% 40%, rgba(6,30,24,0.75) 0%, transparent 65%)",
            }}
          />

          <div className="relative mx-auto max-w-5xl px-6 py-20 md:py-28">
            <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-14">
              {/* Portrait image */}
              <div className="w-full shrink-0 lg:w-[38%]">
                <SectionImage
                  src="/african_city.png"
                  alt={u.editorial.imageAlt}
                  aspectClass="aspect-[3/4]"
                  label={u.editorial.label}
                  headline={u.editorial.headline}
                />
              </div>

              {/* Copy — sits higher than centre, anchored to top */}
              <div className="flex flex-col justify-start pt-0 lg:pt-6">
                <p
                  className="mb-8 text-[15px] leading-[1.82] tracking-[-0.011em]"
                  style={{ color: "rgba(255,255,255,0.50)" }}
                >
                  {u.editorial.body}
                </p>
                {/* Three brief value points */}
                <div className="space-y-3">
                  {u.editorial.points.map((point) => (
                    <div key={point} className="flex items-start gap-3">
                      <div
                        className="mt-[7px] h-[4px] w-[4px] shrink-0 rounded-full"
                        style={{ background: "rgba(52,211,153,0.60)" }}
                      />
                      <p
                        className="text-[13.5px] leading-[1.70] tracking-[-0.010em]"
                        style={{ color: "rgba(255,255,255,0.45)" }}
                      >
                        {point}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            03 — Marketing Teams
            Layout: copy left (55%), square image right (45%)
            + horizontal accent band below
        ════════════════════════════════════════════════════════════════════ */}
        <section
          id="marketing"
          className="relative border-t border-white/[0.06]"
          style={{ background: "#060D1C" }}
        >
          {/* Accent glow — warm violet tint */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 65% 55% at 80% 40%, rgba(26,14,52,0.72) 0%, transparent 65%)",
            }}
          />

          <div className="relative mx-auto max-w-5xl px-6 py-20 md:py-28">
            <div className="flex flex-col gap-10 lg:flex-row-reverse lg:items-start lg:gap-14">
              {/* Square image */}
              <div className="w-full shrink-0 lg:w-[42%]">
                <SectionImage
                  src="/tropical.png"
                  alt={u.marketing.imageAlt}
                  aspectClass="aspect-square"
                  label={u.marketing.label}
                  headline={u.marketing.headline}
                />
              </div>

              {/* Copy */}
              <div className="flex flex-col justify-center lg:pt-2">
                <p
                  className="mb-8 text-[15px] leading-[1.82] tracking-[-0.011em]"
                  style={{ color: "rgba(255,255,255,0.50)" }}
                >
                  {u.marketing.body}
                </p>
                {/* Three brief value points */}
                <div className="space-y-3">
                  {u.marketing.points.map((point) => (
                    <div key={point} className="flex items-start gap-3">
                      <div
                        className="mt-[7px] h-[4px] w-[4px] shrink-0 rounded-full"
                        style={{ background: "rgba(167,139,250,0.65)" }}
                      />
                      <p
                        className="text-[13.5px] leading-[1.70] tracking-[-0.010em]"
                        style={{ color: "rgba(255,255,255,0.45)" }}
                      >
                        {point}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            04 — Leadership & Strategy
            Layout: full-width horizontal band image, copy below in two columns
        ════════════════════════════════════════════════════════════════════ */}
        <section
          id="leadership"
          className="relative border-t border-white/[0.06]"
          style={{ background: "#060D1C" }}
        >
          {/* Accent glow — deep amber/bronze */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 45% at 50% 20%, rgba(30,18,8,0.80) 0%, transparent 60%)",
            }}
          />

          <div className="relative mx-auto max-w-5xl px-6 pt-20 md:pt-28">
            {/* Horizontal band image */}
            <SectionImage
              src="/asia.png"
              alt={u.leadership.imageAlt}
              aspectClass="aspect-[3/1]"
              label={u.leadership.label}
              headline={u.leadership.headline}
            />

            {/* Two-column copy below — asymmetric 3fr/2fr */}
            <div className="mt-10 grid grid-cols-1 gap-10 pb-24 lg:grid-cols-[3fr_2fr] lg:gap-20">
              <div>
                <p
                  className="text-[15px] leading-[1.82] tracking-[-0.011em]"
                  style={{ color: "rgba(255,255,255,0.50)" }}
                >
                  {u.leadership.body}
                </p>
              </div>
              {/* Right column — three headline value points */}
              <div className="flex flex-col justify-end gap-5">
                {u.leadership.cards.map(({ label, body }) => (
                  <div
                    key={label}
                    className="rounded-xl px-5 py-4"
                    style={{
                      background: "rgba(255,255,255,0.022)",
                      border: "1px solid rgba(147,147,147,0.09)",
                    }}
                  >
                    <p
                      className="mb-1 text-[12px] font-semibold tracking-[-0.010em]"
                      style={{ color: "rgba(255,255,255,0.72)" }}
                    >
                      {label}
                    </p>
                    <p
                      className="text-[12px] leading-[1.68] tracking-[-0.008em]"
                      style={{ color: "rgba(255,255,255,0.40)" }}
                    >
                      {body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CLOSING — audience summary strip ──────────────────────────────── */}
        <section
          className="relative border-t border-white/[0.06]"
          style={{ background: "#060D1C" }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(6,14,44,0.65) 0%, transparent 65%)",
            }}
          />
          {/* Local dot field */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: DOT_GRID,
              backgroundRepeat: "repeat",
              backgroundSize: "20px 20px",
              opacity: 0.07,
            }}
          />

          <div className="relative mx-auto max-w-5xl px-6 py-20 md:py-24">
            <div
              className="grid grid-cols-2 gap-px md:grid-cols-4"
              style={{ background: "rgba(255,255,255,0.06)" }}
            >
              {u.summary.map(({ audience, short }) => (
                <div
                  key={audience}
                  className="flex flex-col gap-2 p-6 md:p-8"
                  style={{ background: "#060D1C" }}
                >
                  <p
                    className="text-[10px] font-semibold uppercase tracking-[0.11em]"
                    style={{ color: "rgba(255,255,255,0.28)" }}
                  >
                    {audience}
                  </p>
                  <p
                    className="font-serif text-[16px] font-normal leading-[1.25] tracking-[-0.016em] text-white md:text-[17px]"
                  >
                    {short}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA STRIP ─────────────────────────────────────────────────────── */}
        <section
          className="relative border-t border-white/[0.06]"
          style={{ background: "#060D1C" }}
        >
          <div className="relative mx-auto max-w-5xl px-6 py-20 md:py-24">
            <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-serif text-2xl font-normal leading-[1.14] tracking-[-0.022em] text-white md:text-3xl">
                  {u.cta.headline}
                </h2>
                <p
                  className="mt-2 text-[14px] leading-[1.70] tracking-[-0.010em]"
                  style={{ color: "rgba(255,255,255,0.42)" }}
                >
                  {u.cta.body}
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                <Link
                  href="/request-demo"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium tracking-[-0.011em] text-[#070E1F] transition-opacity hover:opacity-90"
                >
                  {t.shared.ctaStrip.requestDemo}
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
                </Link>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-[-0.011em] transition-colors hover:bg-white/[0.06]"
                  style={{ border: "1px solid rgba(255,255,255,0.14)", color: "rgba(255,255,255,0.60)" }}
                >
                  {t.shared.ctaStrip.explorePlatform}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── FOOTER NAV ────────────────────────────────────────────────────── */}
        <footer
          className="relative mx-auto flex max-w-5xl items-center justify-between px-6 py-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
        >
          <Link
            href="/"
            className="text-[12px] tracking-[-0.011em] transition-opacity hover:opacity-60"
            style={{ color: "rgba(255,255,255,0.28)" }}
          >
            {t.shared.footerNav.back}
          </Link>
          <Link
            href="/request-demo"
            className="text-[12px] font-medium tracking-[-0.011em] transition-opacity hover:opacity-80"
            style={{ color: "rgba(255,255,255,0.50)" }}
          >
            {t.shared.footerNav.requestDemo}
          </Link>
        </footer>
      </main>
    </div>
  )
}
