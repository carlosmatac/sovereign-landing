import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { HeroDashboardPanel, HeroDashboardPanelMobile } from "@/components/hero-dashboard-panel"

// Film grain overlay — URL-encoded SVG feTurbulence, tiled at low opacity
const GRAIN_BG =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)'/%3E%3C/svg%3E\")"

// Fine dot grid — aligned 24px technical texture, adds precision depth
const DOT_GRID =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Ccircle cx='0.5' cy='0.5' r='0.75' fill='white'/%3E%3C/svg%3E\")"

export function Hero() {
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

        {/* Badge */}
        <div className="mb-7 inline-flex items-center rounded-full border border-white/15 bg-white/[0.07] px-4 py-1.5 text-[13px] tracking-[-0.01em] text-white/50">
          Intelligence for the organisations that move markets
        </div>

        {/* Headline */}
        <h1 className="text-balance font-serif text-4xl font-normal tracking-[-0.03em] text-white md:text-5xl lg:text-6xl">
          What your organisation knows, finally put to work.
        </h1>

        {/* Subheadline */}
        <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed tracking-[-0.011em] text-white/55">
          Sovereign transforms internal knowledge into sales advantage, strategic
          clarity, and targeted communication — at the speed decisions actually need.
        </p>

        {/* Buttons */}
        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button
            asChild
            size="lg"
            className="rounded-full bg-white px-8 font-medium tracking-[-0.011em] text-[#070E1F] hover:bg-white/92"
          >
            <Link href="/request-demo">Request Demo</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-full border-white/20 bg-transparent px-8 font-medium tracking-[-0.011em] text-white/80 hover:bg-white/[0.08] hover:text-white"
          >
            Explore the Platform
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
