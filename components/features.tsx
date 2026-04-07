"use client"

import { motion } from "framer-motion"
import { Network, TrendingUp, Send } from "lucide-react"
import Image from "next/image"
import Lottie from "lottie-react"
import scene1 from "@/public/scene1.json"
import { WorldIntelligenceMap } from "@/components/world-intelligence-map"
import { MarketingActivationShowcase } from "@/components/marketing-activation-showcase"

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
  mapComponent?: boolean   // renders WorldIntelligenceMap
  showcaseComponent?: React.ReactNode
  fullBleed?: boolean      // map bleeds to the left viewport edge
  reversed?: boolean       // text on right, media on left
  showLogo?: boolean
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const slides: Slide[] = [
  {
    id: "sales-intelligence",
    icon: <Network className="h-6 w-6 text-foreground" />,
    eyebrow: "01 — Sales Intelligence",
    title: "Know what's already known.",
    description:
      "Sovereign aggregates every prior interaction, signal, and mention across your organization — so no opportunity starts from zero.",
    lottie: scene1,
    lottieAspect: "aspect-[1146/1071]",
    showLogo: true,
  },
  {
    id: "strategic-intelligence",
    icon: <TrendingUp className="h-6 w-6 text-foreground" />,
    eyebrow: "02 — Strategic Intelligence",
    title: "Surface the signals your team is too busy to read.",
    description:
      "Sovereign identifies patterns, emerging themes, and underserved opportunities across your internal information — turning information overload into strategic clarity.",
    mapComponent: true,
    reversed: true,
    fullBleed: true,
  },
  {
    id: "marketing-activation",
    icon: <Send className="h-6 w-6 text-foreground" />,
    eyebrow: "03 — Marketing Activation",
    title: "Publish with purpose.",
    description:
      "Sovereign turns processed intelligence into targeted outbound content — for the right people, at the right moment — across sales outreach, newsletters, and stakeholder communication.",
    showcaseComponent: <MarketingActivationShowcase />,
    showLogo: true,
  },
]

// ─── Text block (shared across layouts) ───────────────────────────────────────

function TextBlock({ slide, padded = false }: { slide: Slide; padded?: boolean }) {
  return (
    <div className={`flex flex-col ${padded ? "justify-center px-10 py-20 xl:px-16" : ""}`}>
      <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-muted/50">
        {slide.icon}
      </div>
      <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.10em] text-muted-foreground/60">
        {slide.eyebrow}
      </p>
      <h3 className="mb-4 font-serif text-3xl font-normal tracking-[-0.025em] text-foreground md:text-4xl">
        {slide.title}
      </h3>
      <p className="text-pretty text-[15px] leading-relaxed tracking-[-0.011em] text-muted-foreground">
        {slide.description}
      </p>
      {slide.showLogo && (
        <div className="mt-8">
          <Image
            src="/sovereign_logo.svg"
            alt="Sovereign"
            width={32}
            height={32}
            className="opacity-15"
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
        className="border-t border-border"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
      >
        <div className="grid items-stretch lg:grid-cols-[3fr_2fr]">
          {/* Left — map bleeds to the viewport left edge */}
          <div className="min-h-[60vh] self-stretch lg:min-h-[70vh]">
            <WorldIntelligenceMap className="h-full rounded-none border-0" />
          </div>

          {/* Right — text, padded, separated by a border */}
          <div className="border-t border-border lg:border-l lg:border-t-0">
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
      className={`w-full overflow-hidden rounded-xl border border-border shadow-md shadow-black/5 ${slide.lottieAspect ?? ""} ${mediaOrder}`}
    >
      <Lottie animationData={slide.lottie} loop autoplay className="h-full w-full" />
    </div>
  ) : (
    <div
      className={`relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-border bg-muted/30 shadow-md shadow-black/5 ${mediaOrder}`}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm text-muted-foreground">{slide.placeholder}</span>
      </div>
    </div>
  )

  return (
    <motion.div
      className="border-t border-border px-6 py-20 md:py-28"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="mx-auto max-w-6xl">
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
    <section>
      {slides.map(slide => (
        <FeatureBlock key={slide.id} slide={slide} />
      ))}
    </section>
  )
}
