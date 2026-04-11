"use client"

import { motion } from "framer-motion"
import { MarketingActivationComposition } from "@/components/marketing-activation-showcase"
import { SalesIntelligenceComposition } from "@/components/sales-intelligence-panel"
import { FloatingEntityScene } from "@/components/floating-entity-scene"

// Film grain — consistent with hero and trust banner
const GRAIN_BG =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)'/%3E%3C/svg%3E\")"

// Fine dot grid — 24px spacing, same cadence as hero
const DOT_GRID =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Ccircle cx='0.5' cy='0.5' r='0.75' fill='white'/%3E%3C/svg%3E\")"

// ─── Types ────────────────────────────────────────────────────────────────────

interface Slide {
  id: string
  eyebrow: string
  title: string
  description: string
  showcaseComponent: React.ReactNode
  // When true, the visual spans the full section width (no horizontal container)
  visualFullWidth?: boolean
  // Tailwind class for the inner visual wrapper — controls max-width and height
  visualWrapperClass?: string
  atmoGradient: string
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const slides: Slide[] = [
  {
    id: "sales-intelligence",
    eyebrow: "01 — Sales Intelligence",
    title: "Know what's already known.",
    description:
      "Sovereign aggregates every prior interaction, signal, and mention across your organization — so no opportunity starts from zero.",
    showcaseComponent: <SalesIntelligenceComposition />,
    visualWrapperClass: "mx-auto max-w-5xl",
    atmoGradient:
      "radial-gradient(ellipse 70% 55% at 50% 0%, rgba(6,16,52,0.80) 0%, transparent 60%)",
  },
  {
    id: "strategic-intelligence",
    eyebrow: "02 — Strategic Intelligence",
    title: "Surface the signals your team is too busy to read.",
    description:
      "Sovereign identifies patterns, emerging themes, and underserved opportunities across your internal information — turning information overload into strategic clarity.",
    showcaseComponent: <FloatingEntityScene />,
    visualFullWidth: true,
    atmoGradient:
      "radial-gradient(ellipse 80% 45% at 50% 12%, rgba(6,14,44,0.65) 0%, transparent 65%)",
  },
  {
    id: "marketing-activation",
    eyebrow: "03 — Marketing Activation",
    title: "Publish with purpose.",
    description:
      "Sovereign turns processed intelligence into targeted outbound content — for the right people, at the right moment — across sales outreach, newsletters, and stakeholder communication.",
    showcaseComponent: <MarketingActivationComposition />,
    visualWrapperClass: "mx-auto max-w-5xl h-[520px]",
    atmoGradient:
      "radial-gradient(ellipse 70% 55% at 50% 0%, rgba(6,14,46,0.80) 0%, transparent 60%)",
  },
]

// ─── Feature block ────────────────────────────────────────────────────────────

function FeatureBlock({ slide }: { slide: Slide }) {
  return (
    <motion.div
      id={slide.id}
      className="relative overflow-hidden border-t border-white/[0.08]"
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

      {/* Editorial copy block — eyebrow full-width, then headline left / description right */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 pb-14 pt-24">
        <p className="mb-8 text-[11px] font-medium uppercase tracking-[0.10em] text-white/35">
          {slide.eyebrow}
        </p>
        <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-[3fr_2fr] lg:gap-16">
          <h3 className="font-serif font-normal leading-[1.07] tracking-[-0.025em] text-white text-4xl lg:text-5xl">
            {slide.title}
          </h3>
          <p className="text-pretty text-[15px] leading-relaxed tracking-[-0.011em] text-white/52 lg:pb-1.5">
            {slide.description}
          </p>
        </div>
      </div>

      {/* Visual reveal — full-width or wide-centered */}
      {slide.visualFullWidth ? (
        <>
          <div
            aria-hidden="true"
            className="pointer-events-none mx-6 border-t border-white/[0.05]"
          />
          <div className="relative z-10 w-full pb-4">
            {slide.showcaseComponent}
          </div>
        </>
      ) : (
        <div className="relative z-10 px-6 pb-24 md:pb-32">
          <div className={slide.visualWrapperClass ?? "mx-auto max-w-5xl"}>
            {slide.showcaseComponent}
          </div>
        </div>
      )}
    </motion.div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function Features() {
  return (
    <section className="relative overflow-hidden">
      {/* Shared film grain */}
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

      {/* Dot grid */}
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

      {slides.map(slide => (
        <FeatureBlock key={slide.id} slide={slide} />
      ))}
    </section>
  )
}
