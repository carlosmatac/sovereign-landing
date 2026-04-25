"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { HeroDashboardPanel, HeroDashboardPanelMobile } from "@/components/hero-dashboard-panel"
import { useT } from "@/lib/i18n/locale-context"

// Film grain overlay — URL-encoded SVG feTurbulence, tiled at low opacity
const GRAIN_BG =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)'/%3E%3C/svg%3E\")"

// Fine dot grid — aligned 24px technical texture, adds precision depth
const DOT_GRID =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Ccircle cx='0.5' cy='0.5' r='0.75' fill='white'/%3E%3C/svg%3E\")"

export function Hero() {
  const t = useT()
  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: "#060D1C" }}>

      {/* Tonal depth — very soft radial that adds barely perceptible atmosphere at the top */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 140% 50% at 50% -8%, rgba(10,24,56,0.9) 0%, transparent 68%)",
        }}
      />

      {/* Film grain — 3.5% opacity, adds tactility and cinematic premium feel */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: GRAIN_BG,
          backgroundRepeat: "repeat",
          backgroundSize: "300px 300px",
          opacity: 0.035,
        }}
      />

      {/* Dot grid — fine 24px technical texture, registers as depth not decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: DOT_GRID,
          backgroundRepeat: "repeat",
          backgroundSize: "24px 24px",
          opacity: 0.025,
        }}
      />

      {/* Above-the-fold copy — split composition on desktop, stacked on mobile.
          Headline anchors the left column; supporting copy + the single CTA
          live in the right column with the CTA pushed to the bottom edge so
          it visually anchors the row. Top padding is tightened so the hero
          starts sooner under the detached header. */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-20 md:pt-24 lg:pt-28">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-x-16">
          {/* LEFT — badge + headline */}
          <div className="lg:col-span-7">
            {/* Badge — traveling border-light */}
            <div
              className="relative inline-flex overflow-hidden rounded-full p-px"
              style={{ background: "rgba(255,255,255,0.10)" }}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-[-75%]"
                style={{
                  background:
                    "conic-gradient(from 0deg, transparent 0%, transparent 62%, rgba(255,255,255,0.50) 72%, rgba(255,255,255,0.18) 78%, transparent 86%, transparent 100%)",
                  animation: "badge-orbit 4s linear infinite",
                }}
              />
              <span
                className="relative z-10 inline-flex items-center rounded-full px-4 py-1.5 text-[13px] tracking-[-0.01em] text-white/50"
                style={{ background: "rgba(6,13,28,0.88)" }}
              >
                {t.hero.badge}
              </span>
            </div>

            {/* Headline */}
            <h1 className="mt-6 text-balance font-serif text-4xl font-normal tracking-[-0.025em] text-white md:text-5xl lg:text-[64px] lg:leading-[1.04]">
              {t.hero.headline}
            </h1>
          </div>

          {/* RIGHT — supporting copy + CTA. On lg+, the column stretches to
              the row height and pushes the CTA to the bottom so it lines up
              with the bottom of the headline opposite. */}
          <div className="flex flex-col gap-7 lg:col-span-5 lg:justify-between lg:gap-0">
            <p className="text-pretty text-base leading-relaxed tracking-[-0.011em] text-white/55 md:text-lg lg:max-w-md lg:pt-2">
              {t.hero.subheadline}
            </p>

            <div className="lg:pt-6">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-white px-8 font-medium tracking-[-0.011em] text-[#070E1F] hover:bg-white/92"
              >
                <Link href="/request-demo">{t.hero.primaryCta}</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard panel — wider container, pulled tight to the copy row so it
          appears earlier in the viewport and reads as the centerpiece of the
          first screen. Mobile shows a simplified readable view, desktop shows
          the full panel. */}
      <div className="relative z-10 mx-auto max-w-[1320px] px-6 pb-16 pt-12 md:pb-20 md:pt-14 lg:pb-24 lg:pt-16">
        <div className="block lg:hidden">
          <HeroDashboardPanelMobile />
        </div>
        <div className="hidden lg:block">
          <HeroDashboardPanel />
        </div>
      </div>
    </section>
  )
}
