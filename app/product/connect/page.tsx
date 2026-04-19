import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { ConnectCommsPanel } from "@/components/connect-comms-panel"
import { ConnectProjectDashboard } from "@/components/connect-project-dashboard"
import { ArrowRight, ChevronRight, Settings2 } from "lucide-react"
import { getServerT } from "@/lib/i18n/server"
import { getDictionary } from "@/lib/i18n/config"

export const metadata: Metadata = {
  title: getDictionary("en").product.connect.metaTitle,
  description: getDictionary("en").product.connect.metaDescription,
}

const GRAIN_BG =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)'/%3E%3C/svg%3E\")"

const DOT_GRID =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Ccircle cx='0.5' cy='0.5' r='0.75' fill='white'/%3E%3C/svg%3E\")"

const ACCENT_BLUE = "#5B9CF6"

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ConnectWorkflowPage() {
  const t = await getServerT()
  const c = t.product.connect
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#060D1C" }}>
      <Header />

      {/* Textures */}
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

      <main className="relative z-10 overflow-x-hidden">

        {/* ── HERO ──────────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 120% 55% at 50% -5%, rgba(10,24,56,0.90) 0%, transparent 60%)",
            }}
          />

          <div className="relative mx-auto max-w-5xl px-6 pb-20 pt-32 md:pb-24 md:pt-40">
            {/* Breadcrumb */}
            <div className="mb-8 flex items-center gap-2">
              <Link
                href="/"
                className="text-[11px] font-medium uppercase tracking-[0.10em] transition-opacity hover:opacity-70"
                style={{ color: "rgba(255,255,255,0.28)" }}
              >
                {t.shared.breadcrumb.platform}
              </Link>
              <ChevronRight className="h-3 w-3" style={{ color: "rgba(255,255,255,0.18)" }} strokeWidth={1.5} />
              <p
                className="text-[11px] font-medium uppercase tracking-[0.10em]"
                style={{ color: "rgba(255,255,255,0.50)" }}
              >
                {c.crumb}
              </p>
            </div>

            {/* Eyebrow */}
            <div className="mb-5 flex items-center gap-2.5">
              <div
                className="flex h-7 w-7 items-center justify-center rounded-lg"
                style={{
                  background: "rgba(91,156,246,0.10)",
                  border: "1px solid rgba(91,156,246,0.22)",
                }}
              >
                <Settings2 className="h-3.5 w-3.5" style={{ color: ACCENT_BLUE }} strokeWidth={1.5} />
              </div>
              <p
                className="text-[11px] font-medium uppercase tracking-[0.12em]"
                style={{ color: "rgba(255,255,255,0.28)" }}
              >
                {c.eyebrow}
              </p>
            </div>

            {/* Headline + lead */}
            <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-[3fr_2fr] lg:gap-20">
              <h1 className="font-serif text-4xl font-normal leading-[1.06] tracking-[-0.030em] text-white md:text-5xl lg:text-[3.2rem]">
                {c.headlineLine1}
                <br />
                {c.headlineLine2}
              </h1>
              <p
                className="text-pretty text-[15px] leading-[1.80] tracking-[-0.011em] lg:pb-1"
                style={{ color: "rgba(255,255,255,0.50)" }}
              >
                {c.lead}
              </p>
            </div>

            <div
              aria-hidden="true"
              className="mt-14 h-px"
              style={{ background: "rgba(255,255,255,0.07)" }}
            />
          </div>
        </section>

        {/* ── COMMUNICATIONS SHOWCASE ───────────────────────────────────────── */}
        <section
          className="relative border-t border-white/[0.06]"
          style={{ background: "#060D1C" }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(6,18,52,0.80) 0%, transparent 65%)",
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
              opacity: 0.055,
            }}
          />

          <div className="relative mx-auto max-w-5xl px-6 pt-20 md:pt-28">
            <div className="mb-14 grid grid-cols-1 gap-8 lg:grid-cols-[3fr_2fr] lg:gap-20">
              <div>
                <p
                  className="mb-4 text-[11px] font-medium uppercase tracking-[0.12em]"
                  style={{ color: "rgba(255,255,255,0.28)" }}
                >
                  {c.comms.eyebrow}
                </p>
                <h2 className="font-serif text-3xl font-normal leading-[1.10] tracking-[-0.025em] text-white md:text-4xl">
                  {c.comms.titleLine1}
                  <br />
                  {c.comms.titleLine2}
                </h2>
              </div>
              <p
                className="text-[15px] leading-[1.80] tracking-[-0.011em] lg:pt-10"
                style={{ color: "rgba(255,255,255,0.48)" }}
              >
                {c.comms.body}
              </p>
            </div>
          </div>

          <div className="relative mx-auto max-w-5xl px-6 pb-16">
            <ConnectCommsPanel />
          </div>

          <div className="relative mx-auto max-w-5xl px-6 pb-24">
            <div
              className="grid grid-cols-1 gap-px sm:grid-cols-2"
              style={{ background: "rgba(255,255,255,0.06)" }}
            >
              {c.comms.benefits.map(({ title, body }) => (
                <div key={title} className="p-8" style={{ background: "#060D1C" }}>
                  <h3 className="mb-3 font-serif text-[17px] font-normal leading-[1.22] tracking-[-0.018em] text-white">
                    {title}
                  </h3>
                  <p
                    className="text-[14px] leading-[1.80] tracking-[-0.010em]"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                  >
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROJECT DASHBOARD SHOWCASE ────────────────────────────────────── */}
        <section
          className="relative border-t border-white/[0.06]"
          style={{ background: "#060D1C" }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(6,14,46,0.75) 0%, transparent 65%)",
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
              opacity: 0.075,
            }}
          />

          <div className="relative mx-auto max-w-5xl px-6 pt-20 md:pt-28">
            <div className="mb-14 grid grid-cols-1 gap-8 lg:grid-cols-[3fr_2fr] lg:gap-20">
              <div>
                <p
                  className="mb-4 text-[11px] font-medium uppercase tracking-[0.12em]"
                  style={{ color: "rgba(255,255,255,0.28)" }}
                >
                  {c.dashboard.eyebrow}
                </p>
                <h2 className="font-serif text-3xl font-normal leading-[1.10] tracking-[-0.025em] text-white md:text-4xl">
                  {c.dashboard.titleLine1}
                  <br />
                  {c.dashboard.titleLine2}
                </h2>
              </div>
              <p
                className="text-[15px] leading-[1.80] tracking-[-0.011em] lg:pt-10"
                style={{ color: "rgba(255,255,255,0.48)" }}
              >
                {c.dashboard.body}
              </p>
            </div>
          </div>

          <div className="relative mx-auto max-w-5xl px-6 pb-16">
            <ConnectProjectDashboard />
          </div>

          {/* Explanatory strip */}
          <div className="relative mx-auto max-w-5xl px-6 pb-16">
            <div
              className="rounded-2xl px-8 py-8 md:px-12 md:py-10"
              style={{
                background: "rgba(255,255,255,0.018)",
                border: "1px solid rgba(147,147,147,0.10)",
              }}
            >
              <p
                className="mb-2 text-[11px] font-medium uppercase tracking-[0.12em]"
                style={{ color: "rgba(255,255,255,0.22)" }}
              >
                {t.shared.panelExplain.whatYouAreLookingAt}
              </p>
              <p
                className="max-w-3xl text-[15px] leading-[1.80] tracking-[-0.011em]"
                style={{ color: "rgba(255,255,255,0.52)" }}
              >
                {c.dashboard.explainBody}
              </p>
            </div>
          </div>

          <div className="relative mx-auto max-w-5xl px-6 pb-24">
            <div
              className="grid grid-cols-1 gap-px sm:grid-cols-2"
              style={{ background: "rgba(255,255,255,0.06)" }}
            >
              {c.dashboard.benefits.map(({ title, body }) => (
                <div key={title} className="p-8" style={{ background: "#060D1C" }}>
                  <h3 className="mb-3 font-serif text-[17px] font-normal leading-[1.22] tracking-[-0.018em] text-white">
                    {title}
                  </h3>
                  <p
                    className="text-[14px] leading-[1.80] tracking-[-0.010em]"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                  >
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CLOSING STATEMENT ─────────────────────────────────────────────── */}
        <section
          className="relative border-t border-white/[0.06]"
          style={{ background: "#060D1C" }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(6,14,44,0.60) 0%, transparent 65%)",
            }}
          />

          <div className="relative mx-auto max-w-5xl px-6 py-20 md:py-28">
            <p
              className="mb-12 text-[11px] font-medium uppercase tracking-[0.12em]"
              style={{ color: "rgba(255,255,255,0.28)" }}
            >
              {t.shared.closing.whatChanges}
            </p>

            <div
              className="grid grid-cols-1 gap-px sm:grid-cols-3"
              style={{ background: "rgba(255,255,255,0.06)" }}
            >
              {c.closing.map(({ stat, label, body }) => (
                <div key={stat} className="p-8" style={{ background: "#060D1C" }}>
                  <p className="mb-1 font-serif text-[22px] font-normal leading-tight tracking-[-0.020em] text-white">
                    {stat}
                  </p>
                  <p
                    className="mb-4 text-[12px] font-medium uppercase tracking-[0.08em]"
                    style={{ color: "rgba(255,255,255,0.28)" }}
                  >
                    {label}
                  </p>
                  <p
                    className="text-[14px] leading-[1.78] tracking-[-0.010em]"
                    style={{ color: "rgba(255,255,255,0.42)" }}
                  >
                    {body}
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
                  {c.cta.headline}
                </h2>
                <p
                  className="mt-2 text-[14px] leading-[1.70] tracking-[-0.010em]"
                  style={{ color: "rgba(255,255,255,0.42)" }}
                >
                  {c.cta.body}
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
