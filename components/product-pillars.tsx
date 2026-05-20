"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Archive, Megaphone, Settings2, TrendingUp } from "lucide-react"
import { useT } from "@/lib/i18n/locale-context"

type PillarKey = "capture" | "prepare" | "activate" | "connect"

const PILLAR_META: ReadonlyArray<{
  key: PillarKey
  icon: typeof Archive
}> = [
  { key: "capture", icon: Archive },
  { key: "prepare", icon: TrendingUp },
  { key: "activate", icon: Megaphone },
  { key: "connect", icon: Settings2 },
]

function PillarFeaturePanel({ active }: { active: PillarKey }) {
  const t = useT()
  const pillar = t.homepagePillars.pillars[active]
  const Icon = PILLAR_META.find((p) => p.key === active)!.icon

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={active}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4, ease: [0.22, 0.8, 0.36, 1] }}
        className="grid min-h-[360px] grid-cols-1 gap-10 md:min-h-[420px] lg:grid-cols-12 lg:gap-14 lg:min-h-[460px]"
      >
        <div className="flex flex-col justify-center lg:col-span-7">
          <div
            className="flex h-11 w-11 items-center justify-center rounded-xl"
            style={{ backgroundColor: "rgba(255,255,255,0.55)" }}
          >
            <Icon
              className="h-5 w-5"
              style={{ color: "var(--mkt-accent)" }}
              strokeWidth={2.25}
            />
          </div>

          <h3
            className="mt-5 font-serif text-[32px] font-normal leading-[1.1] tracking-[-0.025em] sm:text-[38px] md:text-[44px] md:leading-[1.08]"
            style={{ color: "var(--mkt-text)" }}
          >
            {pillar.label}
          </h3>

          <p
            className="mt-5 max-w-xl text-[16px] leading-relaxed tracking-[-0.01em] md:text-[18px] md:leading-[1.65]"
            style={{ color: "var(--mkt-text-muted)" }}
          >
            {pillar.description}
          </p>

          <ul
            className="mt-10 space-y-3 border-t pt-8"
            style={{ borderColor: "rgba(26,26,46,0.08)" }}
          >
            {pillar.bullets.map((bullet) => (
              <li
                key={bullet}
                className="flex items-start gap-3 text-[14px] leading-snug tracking-[-0.008em] md:text-[15px]"
                style={{ color: "var(--mkt-text-muted)" }}
              >
                <span
                  className="mt-2 h-1 w-1 shrink-0 rounded-full"
                  style={{ backgroundColor: "var(--mkt-accent)" }}
                />
                {bullet}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-stretch lg:col-span-5">
          <div
            aria-hidden="true"
            className="min-h-[260px] w-full sm:min-h-[300px] lg:min-h-[380px]"
            style={{ backgroundColor: "rgba(255,255,255,0.28)" }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export function ProductPillars() {
  const t = useT()
  const [active, setActive] = useState<PillarKey>("capture")

  return (
    <section
      id="features"
      className="scroll-mt-24 py-20 md:py-28"
      style={{ backgroundColor: "var(--mkt-bg)" }}
    >
      <div className="mx-auto max-w-5xl px-6">
        <p
          className="text-center text-[10px] font-medium uppercase tracking-[0.18em]"
          style={{ color: "var(--mkt-text-muted)" }}
        >
          {t.homepagePillars.eyebrow}
        </p>
        <h2
          className="mt-4 text-balance text-center font-serif text-[28px] font-normal tracking-[-0.022em] md:text-[38px] md:leading-[1.15]"
          style={{ color: "var(--mkt-text)" }}
        >
          {t.homepagePillars.headline}
        </h2>

        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {PILLAR_META.map(({ key, icon: TabIcon }) => {
            const isActive = key === active
            const label = t.homepagePillars.pillars[key].label
            return (
              <button
                key={key}
                type="button"
                onClick={() => setActive(key)}
                className="inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-[13px] font-medium tracking-[-0.01em] transition-all"
                style={{
                  borderColor: isActive
                    ? "var(--mkt-accent)"
                    : "var(--mkt-border-strong)",
                  backgroundColor: isActive ? "#ffffff" : "transparent",
                  color: isActive ? "var(--mkt-text)" : "var(--mkt-text-muted)",
                  boxShadow: isActive
                    ? "0 2px 8px rgba(26,26,46,0.06)"
                    : "none",
                }}
              >
                <TabIcon
                  className="h-3.5 w-3.5"
                  style={{
                    color: isActive ? "var(--mkt-accent)" : "var(--mkt-text-muted)",
                  }}
                />
                {label}
              </button>
            )
          })}
        </div>
      </div>

      <div className="mt-10 flex w-full justify-center">
        <div className="mx-auto w-[calc(100vw-4rem)] max-w-full">
          <div
            className="min-h-[480px] px-6 py-16 sm:px-10 sm:py-20 md:min-h-[520px] md:px-14 md:py-24 lg:px-20 lg:py-28"
            style={{ backgroundColor: "var(--mkt-cta-band)" }}
          >
            <PillarFeaturePanel active={active} />
          </div>
        </div>
      </div>
    </section>
  )
}
