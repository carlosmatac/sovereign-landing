"use client"

import Image from "next/image"
import { useT } from "@/lib/i18n/locale-context"
import { RequestDemoButton } from "@/components/request-demo-button"
import { HeroKnowledgeGraph } from "@/components/hero-knowledge-graph"

export function Hero() {
  const t = useT()

  return (
    <section
      id="hero"
      className="overflow-x-hidden pb-8 pt-16 md:pb-10 lg:pb-12"
      style={{ backgroundColor: "var(--mkt-bg)" }}
    >
      <div className="relative -mt-16 mx-3 min-h-[640px] overflow-hidden sm:mx-4 md:mx-5 lg:mx-6 xl:mx-8 md:min-h-[760px] lg:min-h-[880px] xl:min-h-[960px]">
        <Image
          src="/hero.png"
          alt=""
          fill
          priority
          className="object-cover object-center scale-[1.06]"
          sizes="100vw"
        />

        <div className="relative z-10 flex min-h-[inherit] items-center px-6 pb-12 pt-16 sm:px-10 md:px-14 md:pb-16 lg:px-20 lg:pb-20 xl:px-24">
          <div className="grid w-full grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-12 xl:gap-20">
            <div className="mx-auto w-full max-w-2xl lg:max-w-none lg:justify-self-center lg:pl-8 xl:pl-16 2xl:pl-24">
              <span
                className="inline-flex items-center rounded-full border px-5 py-2 text-[14px] tracking-[-0.01em]"
                style={{
                  borderColor: "rgba(255,255,255,0.55)",
                  color: "var(--mkt-text)",
                  backgroundColor: "rgba(255,255,255,0.72)",
                }}
              >
                {t.hero.badge}
              </span>

              <h1 className="mt-7 text-balance">
                <span
                  className="block font-serif text-[2.75rem] font-normal leading-[1.08] tracking-[-0.025em] sm:text-5xl md:text-6xl lg:text-[4.25rem] xl:text-[4.75rem] xl:leading-[1.06]"
                  style={{ color: "var(--mkt-text)" }}
                >
                  {t.hero.title}
                </span>
                <span
                  className="mt-2 block font-serif text-[2rem] font-normal italic leading-[1.12] tracking-[-0.02em] sm:text-[2.25rem] md:text-[2.75rem] lg:text-[3rem] xl:text-[3.25rem]"
                  style={{ color: "var(--mkt-hero-accent)" }}
                >
                  {t.hero.accentLine}
                </span>
              </h1>

              <p
                className="mt-7 max-w-xl text-pretty text-lg leading-relaxed tracking-[-0.011em] md:text-xl md:leading-[1.65] lg:max-w-2xl"
                style={{ color: "rgba(26, 26, 46, 0.88)" }}
              >
                {t.hero.subheadline}
              </p>

              <div className="mt-10">
                <RequestDemoButton className="h-12 px-8 text-[15px]">
                  {t.hero.primaryCta}
                </RequestDemoButton>
              </div>
            </div>

            <div className="relative flex items-center justify-center lg:justify-end lg:overflow-visible">
              <HeroKnowledgeGraph />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
