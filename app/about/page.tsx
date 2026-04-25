import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { getServerT } from "@/lib/i18n/server"
import { getDictionary } from "@/lib/i18n/config"

export const metadata: Metadata = {
  title: getDictionary("en").about.metaTitle,
  description: getDictionary("en").about.metaDescription,
}

const GRAIN_BG =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)'/%3E%3C/svg%3E\")"

const DOT_GRID =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Ccircle cx='0.5' cy='0.5' r='0.75' fill='white'/%3E%3C/svg%3E\")"

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
    <div className="min-h-screen" style={{ backgroundColor: "#060D1C" }}>
      <Header />

      <main className="relative overflow-x-hidden">
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

        {/* ── HERO ────────────────────────────────────────────────────────── */}
        <section className="relative z-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 100% 60% at 30% 0%, rgba(10,24,56,0.72) 0%, transparent 58%)",
            }}
          />

          <div className="relative mx-auto max-w-5xl px-6 pb-20 pt-32 md:pb-24 md:pt-40">
            {/* Eyebrow */}
            <p
              className="mb-10 text-[11px] font-medium uppercase tracking-[0.12em]"
              style={{ color: "rgba(255,255,255,0.28)" }}
            >
              {a.eyebrow}
            </p>

            {/* Editorial two-column: text left, 3D video inset right */}
            <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_auto] lg:gap-16">
              {/* Left — typography dominant */}
              <div className="flex flex-col gap-7">
                <h1
                  className="font-serif text-4xl font-normal leading-[1.06] tracking-[-0.030em] text-white md:text-5xl lg:text-[3.4rem]"
                >
                  {a.headlineLine1}
                  <br />
                  {a.headlineLine2}
                </h1>
                <p
                  className="max-w-[42ch] text-pretty text-[15px] leading-[1.80] tracking-[-0.011em]"
                  style={{ color: "rgba(255,255,255,0.50)" }}
                >
                  {a.intro}
                </p>
              </div>

              {/* Right — 3D video in a contained square inset */}
              <div
                className="relative hidden overflow-hidden rounded-2xl lg:block"
                style={{
                  width: "290px",
                  height: "290px",
                  flexShrink: 0,
                  border: "1px solid rgba(255,255,255,0.07)",
                  boxShadow: "0 32px 80px -24px rgba(0,0,0,0.70)",
                }}
              >
                <video
                  className="absolute inset-0 h-full w-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  aria-hidden="true"
                  style={{
                    filter: "saturate(0.82) contrast(1.06) brightness(0.84)",
                  }}
                >
                  <source src="/AK_3d.mp4" type="video/mp4" />
                </video>
                <div
                  className="absolute inset-x-0 bottom-0 h-24"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(6,13,28,0.65) 0%, transparent 100%)",
                  }}
                />
              </div>
            </div>

            <div
              aria-hidden="true"
              className="mt-14 h-px"
              style={{ background: "rgba(255,255,255,0.07)" }}
            />
          </div>
        </section>

        {/* ── STORY BODY ──────────────────────────────────────────────────── */}
        <section className="relative z-10">
          <div className="mx-auto max-w-5xl px-6 pb-20 pt-16 md:pb-28 md:pt-24">

            {/* ── Opening columns: Instinct · Field | Shift ───────────────── */}
            <div className="grid grid-cols-1 gap-x-16 gap-y-10 lg:grid-cols-2">

              {/* Left: first two narrative paragraphs */}
              <div
                className="space-y-10 text-[15.5px] leading-[1.90] tracking-[-0.010em]"
                style={{ color: "rgba(255,255,255,0.50)" }}
              >
                <div>
                  <p
                    className="mb-2.5 text-[10px] font-medium uppercase tracking-[0.14em]"
                    style={{ color: "rgba(255,255,255,0.20)" }}
                  >
                    {a.sections.instinct.label}
                  </p>
                  <p>{a.sections.instinct.body}</p>
                </div>

                <div>
                  <p
                    className="mb-2.5 text-[10px] font-medium uppercase tracking-[0.14em]"
                    style={{ color: "rgba(255,255,255,0.20)" }}
                  >
                    {a.sections.field.label}
                  </p>
                  <p>{a.sections.field.body}</p>
                </div>
              </div>

              {/* Right: crystallisation — elevated weight */}
              <div
                className="text-[15.5px] leading-[1.90] tracking-[-0.010em]"
                style={{ color: "rgba(255,255,255,0.50)" }}
              >
                <div>
                  <p
                    className="mb-2.5 text-[10px] font-medium uppercase tracking-[0.14em]"
                    style={{ color: "rgba(255,255,255,0.20)" }}
                  >
                    {a.sections.shift.label}
                  </p>
                  <p
                    className="text-[16px] leading-[1.84] tracking-[-0.013em]"
                    style={{ color: "rgba(255,255,255,0.72)" }}
                  >
                    {a.sections.shift.body}
                  </p>
                </div>
              </div>
            </div>

            {/* ── Editorial image break ──────────────────────────────────── */}
            {/* Extends slightly beyond the text px-6 on each side */}
            <div className="group relative -mx-0 mt-16 overflow-hidden rounded-2xl sm:-mx-4 md:mt-20">
              <div className="relative h-[280px] w-full overflow-hidden rounded-2xl sm:h-[360px] md:h-[440px]">
                <Image
                  src="/port.png"
                  alt={a.imageAlt}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                  style={{
                    objectPosition: "center 40%",
                    filter: "saturate(0.88) contrast(1.04) brightness(0.86)",
                    transitionProperty: "transform, filter",
                  }}
                />

                {/* Cinematic scrim — heavier at bottom where text sits */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(6,13,28,0.90) 0%, rgba(6,13,28,0.48) 40%, rgba(6,13,28,0.12) 100%)",
                  }}
                />
                {/* Subtle side vignettes for depth */}
                <div
                  className="absolute inset-y-0 left-0 w-1/5"
                  style={{
                    background:
                      "linear-gradient(to right, rgba(6,13,28,0.45) 0%, transparent 100%)",
                  }}
                />

                {/* Editorial text — bottom left */}
                <div className="absolute bottom-0 left-0 p-6 sm:p-8 md:p-10">
                  <p
                    className="font-serif text-xl font-normal leading-[1.18] tracking-[-0.022em] text-white sm:text-2xl md:text-[1.65rem]"
                    style={{ textShadow: "0 1px 12px rgba(0,0,0,0.55)" }}
                  >
                    {a.imageQuote}
                  </p>
                </div>
              </div>
            </div>

            {/* ── Closing columns: Pattern | Purpose ──────────────────────── */}
            <div className="mt-16 grid grid-cols-1 gap-x-16 gap-y-10 md:mt-20 lg:grid-cols-2">

              {/* Left */}
              <div
                className="text-[15.5px] leading-[1.90] tracking-[-0.010em]"
                style={{ color: "rgba(255,255,255,0.50)" }}
              >
                <div>
                  <p
                    className="mb-2.5 text-[10px] font-medium uppercase tracking-[0.14em]"
                    style={{ color: "rgba(255,255,255,0.20)" }}
                  >
                    {a.sections.pattern.label}
                  </p>
                  <p>{a.sections.pattern.body}</p>
                </div>
              </div>

              {/* Right */}
              <div
                className="text-[15.5px] leading-[1.90] tracking-[-0.010em]"
                style={{ color: "rgba(255,255,255,0.50)" }}
              >
                <div>
                  <p
                    className="mb-2.5 text-[10px] font-medium uppercase tracking-[0.14em]"
                    style={{ color: "rgba(255,255,255,0.20)" }}
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
        <section className="relative z-10 pb-20 md:pb-28">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-full"
            style={{
              background:
                "radial-gradient(ellipse 70% 55% at 50% 30%, rgba(8,18,50,0.45) 0%, transparent 65%)",
            }}
          />

          {/* Team intro — sits ABOVE the image */}
          <div className="relative mx-auto mb-4 max-w-2xl px-6 text-center md:mb-2">
            <p
              className="text-[15px] leading-[1.88] tracking-[-0.011em]"
              style={{ color: "rgba(255,255,255,0.42)" }}
            >
              {a.founders.bodyMuted}
              <span style={{ color: "rgba(255,255,255,0.70)" }}>
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
                filter: "saturate(0.78) contrast(1.05) brightness(0.91)",
                maskImage: FOUNDERS_MASK,
                WebkitMaskImage: FOUNDERS_MASK,
              }}
            />
          </div>

          {/* Names — below the image, minimal */}
          <div className="relative mx-auto mt-0 max-w-4xl px-6 text-center md:-mt-4">
            <p
              className="text-[11px] font-medium uppercase tracking-[0.10em]"
              style={{ color: "rgba(255,255,255,0.28)" }}
            >
              {a.founders.caption}
            </p>
          </div>
        </section>

        {/* ── FOOTER NAV ──────────────────────────────────────────────────── */}
        <footer
          className="relative z-10 mx-auto flex max-w-5xl items-center justify-between px-6 py-8"
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
