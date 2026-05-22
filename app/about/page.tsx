import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { AKLineCut } from "@/components/ak-line-cut"
import { getServerT } from "@/lib/i18n/server"
import { getDictionary } from "@/lib/i18n/config"

export const metadata: Metadata = {
  title: getDictionary("en").about.metaTitle,
  description: getDictionary("en").about.metaDescription,
}

// Non-uniform atmospheric dissolve:
// Ellipse center at 36% Y — protects faces, aggressively fades lower body.
const FOUNDERS_MASK =
  "radial-gradient(" +
  "ellipse 90% 76% at 50% 36%, " +
  "rgba(0,0,0,1) 0%, " +
  "rgba(0,0,0,1) 20%, " +
  "rgba(0,0,0,0.92) 34%, " +
  "rgba(0,0,0,0.68) 48%, " +
  "rgba(0,0,0,0.30) 62%, " +
  "rgba(0,0,0,0.07) 74%, " +
  "transparent 84%" +
  ")"

export default async function AboutPage() {
  const t = await getServerT()
  const a = t.about

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--mkt-bg)" }}>
      <Header />

      <main className="relative overflow-x-hidden">

        {/* ── HERO ────────────────────────────────────────────────────────── */}
        <section className="relative">
          <div className="relative mx-auto max-w-5xl px-6 pb-20 pt-32 md:pb-24 md:pt-40">
            {/* Eyebrow */}
            <p
              className="mb-10 text-[11px] font-medium uppercase tracking-[0.12em]"
              style={{ color: "var(--mkt-text-muted)" }}
            >
              {a.eyebrow}
            </p>

            {/* Editorial two-column: text left, 3D video inset right */}
            <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_auto] lg:gap-16">
              {/* Left — typography dominant */}
              <div className="flex flex-col gap-7">
                <h1
                  className="font-serif text-4xl font-normal leading-[1.06] tracking-[-0.030em] md:text-5xl lg:text-[3.4rem]"
                  style={{ color: "var(--mkt-text)" }}
                >
                  {a.headlineLine1}
                  <br />
                  {a.headlineLine2}
                </h1>
                <p
                  className="max-w-[42ch] text-pretty text-[15px] leading-[1.80] tracking-[-0.011em]"
                  style={{ color: "var(--mkt-text-muted)" }}
                >
                  {a.intro}
                </p>
              </div>

              {/* Right — code-generated AK line-cut */}
              <div
                className="hidden self-center lg:block"
                style={{
                  width: "520px",
                  height: "341px",
                  flexShrink: 0,
                  transform: "translateY(8px)",
                }}
              >
                <AKLineCut className="h-full w-full" />
              </div>
            </div>

            <div
              aria-hidden="true"
              className="mt-14 h-px"
              style={{ background: "var(--mkt-border)" }}
            />
          </div>
        </section>

        {/* ── STORY BODY ──────────────────────────────────────────────────── */}
        <section className="relative">
          <div className="mx-auto max-w-5xl px-6 pb-20 pt-16 md:pb-28 md:pt-24">

            {/* ── Opening columns: Instinct · Field | Shift ───────────────── */}
            <div className="grid grid-cols-1 gap-x-16 gap-y-10 lg:grid-cols-2">

              {/* Left: first two narrative paragraphs */}
              <div
                className="space-y-10 text-[15.5px] leading-[1.90] tracking-[-0.010em]"
                style={{ color: "var(--mkt-text-muted)" }}
              >
                <div>
                  <p
                    className="mb-2.5 text-[10px] font-medium uppercase tracking-[0.14em]"
                    style={{ color: "rgba(26,26,46,0.35)" }}
                  >
                    {a.sections.instinct.label}
                  </p>
                  <p>{a.sections.instinct.body}</p>
                </div>

                <div>
                  <p
                    className="mb-2.5 text-[10px] font-medium uppercase tracking-[0.14em]"
                    style={{ color: "rgba(26,26,46,0.35)" }}
                  >
                    {a.sections.field.label}
                  </p>
                  <p>{a.sections.field.body}</p>
                </div>
              </div>

              {/* Right: crystallisation — elevated weight */}
              <div
                className="text-[15.5px] leading-[1.90] tracking-[-0.010em]"
                style={{ color: "var(--mkt-text-muted)" }}
              >
                <div>
                  <p
                    className="mb-2.5 text-[10px] font-medium uppercase tracking-[0.14em]"
                    style={{ color: "rgba(26,26,46,0.35)" }}
                  >
                    {a.sections.shift.label}
                  </p>
                  <p
                    className="text-[16px] leading-[1.84] tracking-[-0.013em]"
                    style={{ color: "var(--mkt-text)" }}
                  >
                    {a.sections.shift.body}
                  </p>
                </div>
              </div>
            </div>

            {/* ── Editorial image break ──────────────────────────────────── */}
            <div className="relative -mx-0 mt-16 sm:-mx-4 md:mt-20">
              <Image
                src="/signal.png"
                alt={a.imageAlt}
                width={2048}
                height={880}
                className="block h-auto w-full"
                priority={false}
              />
              {/* Text stays white — it renders over the photograph */}
              <p
                className="pointer-events-none absolute left-1/2 top-[56%] w-[90%] max-w-xl -translate-x-1/2 text-center font-serif font-normal tracking-[-0.032em] text-white sm:top-[55%] md:top-[54%]"
                style={{
                  textShadow:
                    "0 1px 2px rgba(0,0,0,0.35), 0 0 20px rgba(0,0,0,0.2)",
                }}
              >
                <span className="block text-[clamp(1.25rem,3.2vw,2.1rem)] leading-[1.08]">
                  {a.signalBanner.line1}
                </span>
                <span className="mt-[0.3em] block text-[clamp(1.25rem,3.2vw,2.1rem)] leading-[1.05]">
                  {a.signalBanner.line2}
                </span>
              </p>
            </div>

            {/* ── Closing columns: Pattern | Purpose ──────────────────────── */}
            <div className="mt-16 grid grid-cols-1 gap-x-16 gap-y-10 md:mt-20 lg:grid-cols-2">

              {/* Left */}
              <div
                className="text-[15.5px] leading-[1.90] tracking-[-0.010em]"
                style={{ color: "var(--mkt-text-muted)" }}
              >
                <div>
                  <p
                    className="mb-2.5 text-[10px] font-medium uppercase tracking-[0.14em]"
                    style={{ color: "rgba(26,26,46,0.35)" }}
                  >
                    {a.sections.pattern.label}
                  </p>
                  <p>{a.sections.pattern.body}</p>
                </div>
              </div>

              {/* Right */}
              <div
                className="text-[15.5px] leading-[1.90] tracking-[-0.010em]"
                style={{ color: "var(--mkt-text-muted)" }}
              >
                <div>
                  <p
                    className="mb-2.5 text-[10px] font-medium uppercase tracking-[0.14em]"
                    style={{ color: "rgba(26,26,46,0.35)" }}
                  >
                    {a.sections.purpose.label}
                  </p>
                  <p>{a.sections.purpose.body}</p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ── FOUNDERS ────────────────────────────────────────────────────── */}
        <section className="relative pb-20 md:pb-28">

          {/* Team intro — sits ABOVE the image */}
          <div className="relative mx-auto mb-4 max-w-2xl px-6 text-center md:mb-2">
            <p
              className="text-[15px] leading-[1.88] tracking-[-0.011em]"
              style={{ color: "var(--mkt-text-muted)" }}
            >
              {a.founders.bodyMuted}
              <span style={{ color: "var(--mkt-text)" }}>
                {a.founders.bodyEmphasis}
              </span>
            </p>
          </div>

          {/* Founder illustration — atmospheric dissolve */}
          <div className="relative mx-auto max-w-4xl px-2 sm:px-6">
            <Image
              src="/draw-founders.png"
              alt={a.founders.imageAlt}
              width={1344}
              height={896}
              className="h-auto w-full"
              style={{
                filter: "saturate(0.82) contrast(1.04) brightness(0.94)",
                maskImage: FOUNDERS_MASK,
                WebkitMaskImage: FOUNDERS_MASK,
              }}
            />
          </div>

          {/* Names — below the image, minimal */}
          <div className="relative mx-auto mt-0 max-w-4xl px-6 text-center md:-mt-4">
            <p
              className="text-[11px] font-medium uppercase tracking-[0.10em]"
              style={{ color: "var(--mkt-text-muted)" }}
            >
              {a.founders.caption}
            </p>
          </div>
        </section>

        {/* ── FOOTER NAV ──────────────────────────────────────────────────── */}
        <footer
          className="relative mx-auto flex max-w-5xl items-center justify-between px-6 py-8"
          style={{ borderTop: "1px solid var(--mkt-border)" }}
        >
          <Link
            href="/"
            className="text-[12px] tracking-[-0.011em] transition-opacity hover:opacity-60"
            style={{ color: "var(--mkt-text-muted)" }}
          >
            {t.shared.footerNav.back}
          </Link>
          <Link
            href="/request-demo"
            className="text-[12px] font-medium tracking-[-0.011em] transition-opacity hover:opacity-80"
            style={{ color: "var(--mkt-text)" }}
          >
            {t.shared.footerNav.requestDemo}
          </Link>
        </footer>
      </main>
    </div>
  )
}
