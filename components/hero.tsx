"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
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

      {/* Centered copy block */}
      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-6 pb-12 pt-24 text-center md:pb-16 md:pt-36 lg:pt-40">
        {/* Logo Stamp */}
        <div className="mb-7">
          <Image
            src="/sovereign_logo.svg"
            alt="Sovereign"
            width={40}
            height={40}
            loading="eager"
            className="opacity-20"
          />
        </div>

        {/* Badge — traveling border-light */}
        <div
          className="relative mb-7 inline-flex overflow-hidden rounded-full p-px"
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
        <h1 className="text-balance font-serif text-4xl font-normal tracking-[-0.03em] text-white md:text-5xl lg:text-6xl">
          {t.hero.headline}
        </h1>

        {/* Subheadline */}
        <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed tracking-[-0.011em] text-white/55">
          {t.hero.subheadline}
        </p>

        {/* Buttons */}
        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button
            asChild
            size="lg"
            className="rounded-full bg-white px-8 font-medium tracking-[-0.011em] text-[#070E1F] hover:bg-white/92"
          >
            <Link href="/request-demo">{t.hero.primaryCta}</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-full border-white/20 bg-transparent px-8 font-medium tracking-[-0.011em] text-white/80 hover:bg-white/[0.08] hover:text-white"
          >
            {t.hero.secondaryCta}
          </Button>
        </div>
      </div>

      {/* Dashboard panel — mobile shows a simplified readable view, desktop shows the full panel */}
      <div className="relative z-10 mx-auto max-w-[1100px] px-6 pb-16 md:pb-24 lg:pb-28">
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
