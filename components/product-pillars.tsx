"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Archive, Megaphone, Settings2, TrendingUp } from "lucide-react"
import { useT } from "@/lib/i18n/locale-context"

type PillarKey = "capture" | "prepare" | "activate" | "connect"

const IMAGE_FIRST_PILLARS: ReadonlySet<PillarKey> = new Set(["prepare", "connect"])

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
  const imageFirst = IMAGE_FIRST_PILLARS.has(active)

  const textColumn = (
    <div
      className={`order-1 flex flex-col justify-center lg:col-span-5 ${
        imageFirst ? "lg:order-2 lg:col-start-8" : "lg:order-1 lg:col-start-1"
      }`}
    >
      <h3
        className="font-serif text-[36px] font-normal leading-[1.08] tracking-[-0.025em] sm:text-[42px] md:text-[48px] lg:text-[52px] xl:text-[56px] xl:leading-[1.06]"
        style={{ color: "var(--mkt-text)" }}
      >
        {pillar.label}
      </h3>

      <p
        className="mt-6 max-w-xl text-[18px] leading-relaxed tracking-[-0.01em] md:max-w-2xl md:text-[20px] md:leading-[1.65] lg:text-[21px]"
        style={{ color: "var(--mkt-text-muted)" }}
      >
        {pillar.description}
      </p>

      <ul
        className="mt-12 border-t pt-10"
        style={{ borderColor: "rgba(26,26,46,0.08)" }}
      >
        {pillar.bullets.map((bullet, index) => (
          <li key={bullet}>
            {index > 0 && (
              <div
                className="my-5 h-px w-full max-w-md"
                style={{ backgroundColor: "rgba(26,26,46,0.1)" }}
                aria-hidden="true"
              />
            )}
            <p
              className="text-[15px] leading-snug tracking-[-0.008em] md:text-[17px] md:leading-relaxed"
              style={{ color: "var(--mkt-text-muted)" }}
            >
              {bullet}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )

  const visualColumn = (
    <div
      className={`order-2 flex min-h-[360px] items-center justify-center overflow-visible lg:col-span-7 lg:min-h-[640px] xl:min-h-[720px] ${
        imageFirst ? "lg:order-1 lg:col-start-1" : "lg:order-2 lg:col-start-6"
      }`}
    >
      {active === "capture" ? (
        <div className="relative flex w-full items-center justify-center overflow-visible py-4 lg:py-0">
          <Image
            src="/capture.png"
            alt="Inputs such as interviews, PDFs, and notes flow into Aksum and emerge as structured people, companies, topics, and summaries."
            width={6798}
            height={6798}
            className="h-auto w-full max-w-none origin-center object-contain sm:w-[108%] lg:w-[128%] lg:scale-[1.05] xl:w-[138%] xl:scale-[1.08]"
            sizes="(min-width: 1280px) 50vw, (min-width: 1024px) 48vw, 90vw"
            priority
          />
        </div>
      ) : (
        <div
          aria-hidden="true"
          className="min-h-[360px] w-full sm:min-h-[420px] lg:min-h-[640px] xl:min-h-[720px]"
          style={{ backgroundColor: "rgba(255,255,255,0.28)" }}
        />
      )}
    </div>
  )

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={active}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4, ease: [0.22, 0.8, 0.36, 1] }}
        className="grid min-h-[420px] grid-cols-1 gap-12 md:min-h-[500px] lg:grid-cols-12 lg:items-center lg:gap-10 lg:min-h-[600px] xl:min-h-[680px] xl:gap-12"
      >
        {textColumn}
        {visualColumn}
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
        <div className="mx-auto w-[calc(100vw-4rem)] max-w-full overflow-visible">
          <div
            className="min-h-[560px] overflow-visible px-6 py-20 sm:px-10 sm:py-24 md:min-h-[640px] md:px-12 md:py-28 lg:min-h-[760px] lg:px-16 lg:py-32 xl:min-h-[820px] xl:px-20 xl:py-36"
            style={{ backgroundColor: "var(--mkt-cta-band)" }}
          >
            <PillarFeaturePanel active={active} />
          </div>
        </div>
      </div>
    </section>
  )
}
