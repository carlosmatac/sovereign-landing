"use client"

import { useRef, useState } from "react"
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion"
import { MktContainer, MktSectionX } from "@/components/marketing-layout"
import { useT } from "@/lib/i18n/locale-context"

// ─── Individual step card ─────────────────────────────────────────────────────

function StepCard({
  phase,
  index,
  total,
  scrollYProgress,
}: {
  phase: { label: string; description: string }
  index: number
  total: number
  scrollYProgress: MotionValue<number>
}) {
  // Canvas is divided into (total + 1) equal segments — 4 steps + 1 final view
  const SEG = 1 / (total + 1)
  const start = index * SEG
  const end = (index + 1) * SEG

  // Fade/move in over first 30% of segment, hold, fade/move out over last 30%
  const fadeIn  = start + SEG * 0.28
  const fadeOut = end   - SEG * 0.28

  const opacity = useTransform(
    scrollYProgress,
    [Math.max(0, start - 0.01), fadeIn, fadeOut, Math.min(1, end + 0.01)],
    [0, 1, 1, 0],
  )
  const y = useTransform(
    scrollYProgress,
    [Math.max(0, start - 0.01), fadeIn, fadeOut, Math.min(1, end + 0.01)],
    [44, 0, 0, -30],
  )
  const scale = useTransform(
    scrollYProgress,
    [Math.max(0, start - 0.01), fadeIn, fadeOut, Math.min(1, end + 0.01)],
    [0.96, 1, 1, 0.975],
  )

  const stepNum  = String(index + 1).padStart(2, "0")
  const totalNum = String(total).padStart(2, "0")

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
      style={{ opacity, y, scale }}
    >
      {/* Step counter */}
      <p
        className="mb-7 text-[11px] font-medium uppercase tracking-[0.22em]"
        style={{ color: "var(--mkt-text-muted)", fontVariantNumeric: "tabular-nums" }}
      >
        {stepNum}&thinsp;/&thinsp;{totalNum}
      </p>

      {/* Primary word — large editorial serif */}
      <h2
        className="font-serif font-normal leading-[0.92] tracking-[-0.03em]"
        style={{
          color: "var(--mkt-text)",
          fontSize: "clamp(60px, 10vw, 138px)",
        }}
      >
        {phase.label}
      </h2>

      {/* Subtitle */}
      <p
        className="mx-auto mt-7 max-w-[340px] text-[15px] leading-relaxed tracking-[-0.008em] sm:max-w-[420px] md:text-[17px]"
        style={{ color: "var(--mkt-text-muted)" }}
      >
        {phase.description}
      </p>
    </motion.div>
  )
}

// ─── Final composed view (all four steps in one row) ─────────────────────────

function FinalView({
  phases,
  scrollYProgress,
}: {
  phases: Array<{ label: string; description: string }>
  scrollYProgress: MotionValue<number>
}) {
  const total = phases.length
  const SEG = 1 / (total + 1)
  const finalStart = total * SEG // 0.8

  const opacity = useTransform(
    scrollYProgress,
    [finalStart - 0.01, finalStart + SEG * 0.35, 1],
    [0, 1, 1],
  )
  const y = useTransform(
    scrollYProgress,
    [finalStart - 0.01, finalStart + SEG * 0.4, 1],
    [36, 0, 0],
  )

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6"
      style={{ opacity, y }}
    >
      {/* Eyebrow above the row */}
      <p
        className="mb-10 text-[10px] font-medium uppercase tracking-[0.2em]"
        style={{ color: "var(--mkt-text-muted)" }}
      >
        The operating model
      </p>

      {/* Horizontal step row */}
      <div className="flex items-start justify-center">
        {phases.map((phase, i) => (
          <div key={phase.label} className="flex items-start">
            <div className="flex flex-col items-center px-4 text-center sm:px-7 lg:px-10">
              {/* Mini step number */}
              <p
                className="mb-1 text-[9px] font-medium uppercase tracking-[0.18em]"
                style={{ color: "var(--mkt-text-muted)", opacity: 0.55 }}
              >
                {String(i + 1).padStart(2, "0")}
              </p>
              {/* Phase label */}
              <span
                className="font-serif font-normal leading-none tracking-[-0.025em]"
                style={{
                  color: "var(--mkt-text)",
                  fontSize: "clamp(20px, 3.2vw, 50px)",
                }}
              >
                {phase.label}
              </span>
              {/* Description */}
              <p
                className="mt-3 text-[11px] leading-relaxed tracking-[-0.005em] sm:text-[12px] md:text-[13px]"
                style={{
                  color: "var(--mkt-text-muted)",
                  maxWidth: "clamp(100px, 14vw, 170px)",
                }}
              >
                {phase.description}
              </p>
            </div>

            {/* Arrow divider */}
            {i < phases.length - 1 && (
              <div
                className="mt-[0.3em] flex-shrink-0 leading-none"
                style={{
                  color: "var(--mkt-accent)",
                  opacity: 0.3,
                  fontSize: "clamp(14px, 2vw, 26px)",
                }}
              >
                →
              </div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  )
}

// ─── Mobile fallback (shown below lg breakpoint) ──────────────────────────────

function MobileFallback({
  phases,
  eyebrow,
}: {
  phases: Array<{ label: string; description: string }>
  eyebrow: string
}) {
  return (
    <section className="lg:hidden py-16" style={{ backgroundColor: "var(--mkt-bg)" }}>
      <MktSectionX>
        <MktContainer>
          <p
            className="text-center text-[10px] font-medium uppercase tracking-[0.18em]"
            style={{ color: "var(--mkt-text-muted)" }}
          >
            {eyebrow}
          </p>

          <div className="mt-12 space-y-14">
            {phases.map((phase, i) => (
              <div key={phase.label} className="text-center">
                <p
                  className="mb-3 text-[11px] font-medium uppercase tracking-[0.2em]"
                  style={{ color: "var(--mkt-text-muted)" }}
                >
                  {String(i + 1).padStart(2, "0")}&thinsp;/&thinsp;{String(phases.length).padStart(2, "0")}
                </p>
                <h2
                  className="font-serif text-[48px] font-normal leading-none tracking-[-0.03em] sm:text-[60px]"
                  style={{ color: "var(--mkt-text)" }}
                >
                  {phase.label}
                </h2>
                <p
                  className="mx-auto mt-4 max-w-xs text-[15px] leading-relaxed tracking-[-0.008em]"
                  style={{ color: "var(--mkt-text-muted)" }}
                >
                  {phase.description}
                </p>
              </div>
            ))}
          </div>

          {/* Compact final row */}
          <div
            className="mt-14 flex items-center justify-center gap-2 border-t pt-10 flex-wrap"
            style={{ borderColor: "var(--mkt-border)" }}
          >
            {phases.map((phase, i) => (
              <span key={phase.label} className="flex items-center gap-2">
                <span
                  className="font-serif text-[18px] tracking-[-0.02em]"
                  style={{ color: "var(--mkt-text)" }}
                >
                  {phase.label}
                </span>
                {i < phases.length - 1 && (
                  <span style={{ color: "var(--mkt-accent)", opacity: 0.4 }}>→</span>
                )}
              </span>
            ))}
          </div>
        </MktContainer>
      </MktSectionX>
    </section>
  )
}

// ─── Desktop scroll storytelling ─────────────────────────────────────────────

function DesktopScrollStory({
  phases,
  eyebrow,
}: {
  phases: Array<{ label: string; description: string }>
  eyebrow: string
}) {
  const total = phases.length  // 4
  const SEG = 1 / (total + 1)

  const sectionRef = useRef<HTMLElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  })

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActiveIndex(Math.min(total, Math.floor(v / SEG)))
  })

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="relative hidden lg:block"
      style={{
        // 5.5 scenes × 100vh — gives ~90vh of scroll per step at 100vh viewport
        minHeight: `${(total + 1.5) * 100}vh`,
        backgroundColor: "var(--mkt-bg)",
      }}
    >
      {/* Sticky stage — occupies full viewport while user scrolls the outer section */}
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">

        {/* Persistent eyebrow */}
        <MktSectionX>
          <MktContainer>
            <p
              className="pt-10 text-center text-[10px] font-medium uppercase tracking-[0.18em]"
              style={{ color: "var(--mkt-text-muted)" }}
            >
              {eyebrow}
            </p>
          </MktContainer>
        </MktSectionX>

        {/* Card stage — all cards overlap here, each fades in/out via transform */}
        <div className="relative flex-1">
          {phases.map((phase, i) => (
            <StepCard
              key={phase.label}
              phase={phase}
              index={i}
              total={total}
              scrollYProgress={scrollYProgress}
            />
          ))}
          <FinalView phases={phases} scrollYProgress={scrollYProgress} />
        </div>

        {/* Progress pill indicator */}
        <div className="flex items-center justify-center gap-[7px] pb-9">
          {Array.from({ length: total + 1 }).map((_, i) => {
            const isActive  = activeIndex === i
            const isFinalDot = i === total
            return (
              <div
                key={i}
                className="rounded-full transition-all duration-300"
                style={{
                  height: 6,
                  width: isActive ? (isFinalDot ? 28 : 22) : 6,
                  background: isActive
                    ? isFinalDot
                      ? "var(--mkt-accent)"
                      : "var(--mkt-text)"
                    : "rgba(26,26,46,0.14)",
                }}
              />
            )
          })}
        </div>

      </div>
    </section>
  )
}

// ─── Public export ────────────────────────────────────────────────────────────

export function SloganFlow() {
  const t = useT()
  return (
    <>
      <MobileFallback phases={t.sloganFlow.phases} eyebrow={t.sloganFlow.eyebrow} />
      <DesktopScrollStory phases={t.sloganFlow.phases} eyebrow={t.sloganFlow.eyebrow} />
    </>
  )
}
