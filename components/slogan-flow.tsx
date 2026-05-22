"use client"

import { useRef, useState, useEffect } from "react"
import {
  motion,
  useTransform,
  useMotionValue,
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

  // Fade/move in over first 28% of segment, hold, fade out over last 28%
  const fadeIn  = start + SEG * 0.28
  const fadeOut = end   - SEG * 0.28

  // Step 0 (Capture) starts fully visible so there's no blank moment when the
  // section first enters the viewport. All other steps fade in normally.
  const opacityInput = index === 0
    ? [0, fadeOut, Math.min(1, end + 0.01)]
    : [Math.max(0, start - 0.01), fadeIn, fadeOut, Math.min(1, end + 0.01)]
  const opacityOutput = index === 0
    ? [1, 1, 0]
    : [0, 1, 1, 0]

  const yInput = index === 0
    ? [0, fadeOut, Math.min(1, end + 0.01)]
    : [Math.max(0, start - 0.01), fadeIn, fadeOut, Math.min(1, end + 0.01)]
  const yOutput = index === 0
    ? [0, 0, -30]
    : [44, 0, 0, -30]

  const scaleInput = index === 0
    ? [0, fadeOut, Math.min(1, end + 0.01)]
    : [Math.max(0, start - 0.01), fadeIn, fadeOut, Math.min(1, end + 0.01)]
  const scaleOutput = index === 0
    ? [1, 1, 0.975]
    : [0.96, 1, 1, 0.975]

  const opacity = useTransform(scrollYProgress, opacityInput, opacityOutput)
  const y       = useTransform(scrollYProgress, yInput,       yOutput)
  const scale   = useTransform(scrollYProgress, scaleInput,   scaleOutput)

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
  const finalStart = total * SEG

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
      <p
        className="mb-10 text-[10px] font-medium uppercase tracking-[0.2em]"
        style={{ color: "var(--mkt-text-muted)" }}
      >
        The operating model
      </p>

      <div className="flex items-start justify-center">
        {phases.map((phase, i) => (
          <div key={phase.label} className="flex items-start">
            <div className="flex flex-col items-center px-4 text-center sm:px-7 lg:px-10">
              <p
                className="mb-1 text-[9px] font-medium uppercase tracking-[0.18em]"
                style={{ color: "var(--mkt-text-muted)", opacity: 0.55 }}
              >
                {String(i + 1).padStart(2, "0")}
              </p>
              <span
                className="font-serif font-normal leading-none tracking-[-0.025em]"
                style={{
                  color: "var(--mkt-text)",
                  fontSize: "clamp(20px, 3.2vw, 50px)",
                }}
              >
                {phase.label}
              </span>
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

// ─── Mobile fallback ──────────────────────────────────────────────────────────

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

          <div
            className="mt-14 flex flex-wrap items-center justify-center gap-2 border-t pt-10"
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

  // Manual MotionValue — set via getBoundingClientRect() in the scroll/resize
  // listeners below. This avoids Framer Motion's useScroll, which measures the
  // section offset synchronously on mount and gets a stale value in Chrome/Safari
  // when large images above the section haven't finished loading yet.
  const progressMV = useMotionValue(0)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const calculate = () => {
      const rect = section.getBoundingClientRect()
      const scrollable = rect.height - window.innerHeight
      // Guard: section must be taller than viewport to have meaningful progress
      if (scrollable <= 0) return
      // -rect.top: distance the section top has traveled above the viewport top.
      // Divide by scrollable to normalize 0→1, clamp for safety.
      const v = Math.max(0, Math.min(1, -rect.top / scrollable))
      progressMV.set(v)
      setActiveIndex(Math.min(total, Math.floor(v / SEG)))
    }

    window.addEventListener("scroll", calculate, { passive: true })
    window.addEventListener("resize", calculate)

    // Catch layout shifts when images/fonts above the section finish loading —
    // their size increase pushes the section further down the page, which
    // changes rect.top and would otherwise leave progress stale.
    const ro = new ResizeObserver(calculate)
    ro.observe(document.body)

    calculate()

    return () => {
      window.removeEventListener("scroll", calculate)
      window.removeEventListener("resize", calculate)
      ro.disconnect()
    }
  }, [progressMV, SEG, total])

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="relative hidden lg:block"
      style={{
        // dvh accounts for browser chrome on Safari/Chrome correctly
        minHeight: `${(total + 1.5) * 100}dvh`,
        backgroundColor: "var(--mkt-bg)",
      }}
    >
      {/* Sticky stage — no overflow: hidden or transform on any ancestor,
          both of which break position: sticky in Chrome/Safari */}
      <div className="sticky top-0 flex h-screen flex-col">

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

        {/* Card stage */}
        <div className="relative flex-1 overflow-hidden">
          {phases.map((phase, i) => (
            <StepCard
              key={phase.label}
              phase={phase}
              index={i}
              total={total}
              scrollYProgress={progressMV}
            />
          ))}
          <FinalView phases={phases} scrollYProgress={progressMV} />
        </div>

        {/* Progress pill indicator */}
        <div className="flex items-center justify-center gap-[7px] pb-9">
          {Array.from({ length: total + 1 }).map((_, i) => {
            const isActive   = activeIndex === i
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
