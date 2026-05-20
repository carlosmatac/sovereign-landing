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

export function ProductPillars() {
  const t = useT()
  const [active, setActive] = useState<PillarKey>("capture")
  const pillar = t.homepagePillars.pillars[active]
  const Icon = PILLAR_META.find((p) => p.key === active)!.icon

  return (
    <section
      id="features"
      className="scroll-mt-24 px-6 py-20 md:py-28"
      style={{ backgroundColor: "var(--mkt-band-alt)" }}
    >
      <div className="mx-auto max-w-5xl">
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

        <div
          className="relative mt-10 overflow-hidden rounded-2xl border bg-white p-8 md:p-12"
          style={{ borderColor: "var(--mkt-border)" }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 0.8, 0.36, 1] }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                  style={{ backgroundColor: "var(--mkt-band)" }}
                >
                  <Icon
                    className="h-5 w-5"
                    style={{ color: "var(--mkt-accent)" }}
                  />
                </div>
                <div>
                  <h3
                    className="font-serif text-2xl font-normal tracking-[-0.02em] md:text-3xl"
                    style={{ color: "var(--mkt-text)" }}
                  >
                    {pillar.label}
                  </h3>
                  <p
                    className="mt-3 max-w-2xl text-[15px] leading-relaxed tracking-[-0.008em] md:text-base"
                    style={{ color: "var(--mkt-text-muted)" }}
                  >
                    {pillar.description}
                  </p>
                </div>
              </div>

              <ul className="mt-8 grid gap-3 sm:grid-cols-3">
                {pillar.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-start gap-2.5 rounded-lg px-3 py-2.5 text-[14px] leading-snug tracking-[-0.008em]"
                    style={{
                      color: "var(--mkt-text)",
                      backgroundColor: "var(--mkt-band-alt)",
                    }}
                  >
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ backgroundColor: "var(--mkt-accent)" }}
                    />
                    {bullet}
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
