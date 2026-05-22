"use client"

import { useRef } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { MktContainer, MktSectionX } from "@/components/marketing-layout"
import { useT } from "@/lib/i18n/locale-context"

function PhaseWord({
  label,
  description,
  index,
}: {
  label: string
  description: string
  index: number
  total?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" })

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center text-center"
      initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
      animate={
        isInView
          ? { opacity: 1, y: 0, filter: "blur(0px)" }
          : { opacity: 0, y: 24, filter: "blur(6px)" }
      }
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.22, 0.8, 0.36, 1],
      }}
    >
      <motion.span
        className="font-serif text-3xl font-normal tracking-[-0.03em] md:text-5xl lg:text-6xl"
        style={{ color: "var(--mkt-text)" }}
        initial={{ letterSpacing: "0.08em" }}
        animate={isInView ? { letterSpacing: "-0.03em" } : { letterSpacing: "0.08em" }}
        transition={{ duration: 0.8, delay: index * 0.15 + 0.1 }}
      >
        {label}
      </motion.span>
      <motion.p
        className="mt-3 max-w-[180px] text-[13px] leading-relaxed tracking-[-0.008em] md:text-[14px]"
        style={{ color: "var(--mkt-text-muted)" }}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: index * 0.15 + 0.35 }}
      >
        {description}
      </motion.p>
    </motion.div>
  )
}

export function SloganFlow() {
  const t = useT()
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })
  const lineScale = useTransform(scrollYProgress, [0.1, 0.5], [0, 1])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-16 md:py-20"
      style={{ backgroundColor: "var(--mkt-bg)" }}
    >
      <MktSectionX>
        <motion.div
          className="absolute left-1/2 top-1/2 hidden h-px w-[60%] -translate-x-1/2 -translate-y-1/2 origin-left lg:block"
          style={{
            scaleX: lineScale,
            backgroundColor: "var(--mkt-border-strong)",
          }}
        />

        <MktContainer className="relative">
        <p
          className="text-center text-[10px] font-medium uppercase tracking-[0.18em]"
          style={{ color: "var(--mkt-text-muted)" }}
        >
          {t.sloganFlow.eyebrow}
        </p>

        <div className="relative mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-8">
          {t.sloganFlow.phases.map((phase, i) => (
            <PhaseWord
              key={phase.label}
              label={phase.label}
              description={phase.description}
              index={i}
            />
          ))}
        </div>

        <div className="mt-12 flex items-center justify-center gap-3 md:hidden">
          {t.sloganFlow.phases.map((phase, i) => (
            <span key={phase.label} className="flex items-center gap-3">
              <span
                className="font-serif text-lg tracking-[-0.02em]"
                style={{ color: "var(--mkt-text)" }}
              >
                {phase.label}
              </span>
              {i < t.sloganFlow.phases.length - 1 && (
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
