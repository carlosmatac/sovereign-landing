"use client"

import { motion } from "framer-motion"
import { Network, TrendingUp, Send } from "lucide-react"
import Image from "next/image"
import Lottie from "lottie-react"
import scene1 from "@/public/scene1.json"
import { WorldIntelligenceMap } from "@/components/world-intelligence-map"
import { MarketingActivationShowcase } from "@/components/marketing-activation-showcase"

// Film grain — consistent with hero and trust banner
const GRAIN_BG =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)'/%3E%3C/svg%3E\")"

// ─── Types ────────────────────────────────────────────────────────────────────

interface Slide {
  id: string
  icon: React.ReactNode
  eyebrow: string
  title: string
  description: string
  placeholder?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  lottie?: any
  lottieAspect?: string
  mapComponent?: boolean
  showcaseComponent?: React.ReactNode
  fullBleed?: boolean
  reversed?: boolean
  showLogo?: boolean
  // Per-section atmospheric gradient for depth variation
  atmoGradient: string
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const slides: Slide[] = [
  {
    id: "sales-intelligence",
    icon: <Network className="h-6 w-6 text-white/70" />,
    eyebrow: "01 — Sales Intelligence",
    title: "Know what's already known.",
    description:
      "Sovereign aggregates every prior interaction, signal, and mention across your organization — so no opportunity starts from zero.",
    lottie: scene1,
    lottieAspect: "aspect-[1146/1071]",
    showLogo: true,
    // Glow from bottom-left — anchors this section to the left side of the page
    atmoGradient:
      "radial-gradient(ellipse 90% 70% at 10% 110%, rgba(6,16,52,0.75) 0%, transparent 55%)",
  },
  {
    id: "strategic-intelligence",
    icon: <TrendingUp className="h-6 w-6 text-white/70" />,
    eyebrow: "02 — Strategic Intelligence",
    title: "Surface the signals your team is too busy to read.",
    description:
      "Sovereign identifies patterns, emerging themes, and underserved opportunities across your internal information — turning information overload into strategic clarity.",
    mapComponent: true,
    reversed: true,
    fullBleed: true,
    // Right-side depth — complements the full-bleed map on the left
    atmoGradient:
      "radial-gradient(ellipse 60% 100% at 100% 50%, rgba(4,10,34,0.65) 0%, transparent 55%)",
  },
  {
    id: "marketing-activation",
    icon: <Send className="h-6 w-6 text-white/70" />,
    eyebrow: "03 — Marketing Activation",
    title: "Publish with purpose.",
    description:
      "Sovereign turns processed intelligence into targeted outbound content — for the right people, at the right moment — across sales outreach, newsletters, and stakeholder communication.",
    showcaseComponent: <MarketingActivationShowcase />,
    showLogo: true,
    // Glow from top-right — creates asymmetric rhythm vs Sales Intelligence
    atmoGradient:
      "radial-gradient(ellipse 90% 70% at 90% -10%, rgba(6,18,54,0.75) 0%, transparent 55%)",
  },
]

// ─── Text block (shared across layouts) ───────────────────────────────────────

function TextBlock({ slide, padded = false }: { slide: Slide; padded?: boolean }) {
  return (
    <div className={`flex flex-col ${padded ? "justify-center px-10 py-20 xl:px-16" : ""}`}>
      <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.12] bg-white/[0.05]">
        {slide.icon}
      </div>
      <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.10em] text-white/35">
        {slide.eyebrow}
      </p>
      <h3 className="mb-4 font-serif text-3xl font-normal tracking-[-0.025em] text-white md:text-4xl">
        {slide.title}
      </h3>
      <p className="text-pretty text-[15px] leading-relaxed tracking-[-0.011em] text-white/55">
        {slide.description}
      </p>
      {slide.showLogo && (
        <div className="mt-8">
          <Image
            src="/sovereign_logo.svg"
            alt="Sovereign"
            width={32}
            height={32}
            className="opacity-[0.12]"
          />
        </div>
      )}
    </div>
  )
}

// ─── Feature block ────────────────────────────────────────────────────────────

function FeatureBlock({ slide }: { slide: Slide }) {
  // ── Full-bleed layout (Strategic Intelligence) ──────────────────────────────
  if (slide.fullBleed && slide.mapComponent) {
    return (
      <motion.div
        id={slide.id}
        className="relative border-t border-white/[0.08]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
      >
        {/* Per-section atmospheric gradient */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0"
          style={{ background: slide.atmoGradient }}
        />

        <div className="relative z-10 grid items-stretch lg:grid-cols-[3fr_2fr]">
          {/* Left — map bleeds to the viewport left edge */}
          <div className="min-h-[60vh] self-stretch lg:min-h-[70vh]">
            <WorldIntelligenceMap className="h-full rounded-none border-0" />
          </div>

          {/* Right — text, padded, separated by a border */}
          <div className="border-t border-white/[0.08] lg:border-l lg:border-t-0">
            <TextBlock slide={slide} padded />
          </div>
        </div>
      </motion.div>
    )
  }

  // ── Standard layout ─────────────────────────────────────────────────────────
  const textOrder  = slide.reversed ? "lg:order-2" : ""
  const mediaOrder = slide.reversed ? "lg:order-1" : ""

  const mediaEl = slide.showcaseComponent ? (
    <div className={`w-full ${mediaOrder}`}>
      {slide.showcaseComponent}
    </div>
  ) : slide.lottie ? (
    <div
      className={`w-full overflow-hidden rounded-xl border border-white/[0.10] shadow-md shadow-black/30 ${slide.lottieAspect ?? ""} ${mediaOrder}`}
    >
      <Lottie animationData={slide.lottie} loop autoplay className="h-full w-full" />
    </div>
  ) : (
    <div
      className={`relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-white/[0.10] bg-white/[0.03] shadow-md shadow-black/30 ${mediaOrder}`}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm text-white/40">{slide.placeholder}</span>
      </div>
    </div>
  )

  return (
    <motion.div
      id={slide.id}
      className="relative border-t border-white/[0.08] px-6 py-20 md:py-28"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Per-section atmospheric gradient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{ background: slide.atmoGradient }}
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className={textOrder}>
            <TextBlock slide={slide} />
          </div>
          {mediaEl}
        </div>
      </div>
    </motion.div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function Features() {
  return (
    <section className="relative overflow-hidden">
      {/* Shared film grain — single layer for the entire features section */}
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

      {slides.map(slide => (
        <FeatureBlock key={slide.id} slide={slide} />
      ))}
    </section>
  )
}
