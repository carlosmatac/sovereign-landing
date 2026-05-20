"use client"

import Link from "next/link"
import { useT } from "@/lib/i18n/locale-context"
import { RequestDemoButton } from "@/components/request-demo-button"
import { HeroKnowledgeGraph } from "@/components/hero-knowledge-graph"

export function Hero() {
  const t = useT()

  return (
    <section
      id="hero"
      className="relative overflow-hidden"
      style={{ backgroundColor: "var(--mkt-hero-band)" }}
    >
      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-20 pt-28 md:pb-24 md:pt-32 lg:pb-28 lg:pt-36">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <span
              className="inline-flex items-center rounded-full border px-4 py-1.5 text-[13px] tracking-[-0.01em]"
              style={{
                borderColor: "rgba(255,255,255,0.28)",
                color: "rgba(255,255,255,0.88)",
                backgroundColor: "rgba(255,255,255,0.12)",
              }}
            >
              {t.hero.badge}
            </span>

            <h1
              className="mt-6 text-balance font-serif text-4xl font-normal tracking-[-0.025em] text-white md:text-5xl lg:text-[56px] lg:leading-[1.08]"
            >
              {t.hero.headline}
            </h1>

            <p
              className="mt-6 max-w-lg text-pretty text-base leading-relaxed tracking-[-0.011em] md:text-lg"
              style={{ color: "rgba(255,255,255,0.78)" }}
            >
              {t.hero.subheadline}
            </p>

            <div className="mt-8">
              <RequestDemoButton>{t.hero.primaryCta}</RequestDemoButton>
            </div>
          </div>

          <div className="relative flex items-center justify-center lg:justify-end lg:overflow-visible">
            <HeroKnowledgeGraph />
          </div>
        </div>
      </div>
    </section>
  )
}
