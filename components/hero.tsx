"use client"

import Image from "next/image"
import { useT } from "@/lib/i18n/locale-context"
import { RequestDemoButton } from "@/components/request-demo-button"

function HeroLogoObject() {
  return (
    <div
      className="hero-logo-stage flex flex-col items-center"
      style={{ perspective: "900px", perspectiveOrigin: "50% 45%" }}
    >
      <div
        className="hero-logo-object"
        style={{
          width: "clamp(220px, 38vw, 480px)",
          height: "clamp(220px, 38vw, 480px)",
          transform: "rotateX(22deg) rotateZ(-3deg) translateY(-8px)",
          transition: "transform .55s cubic-bezier(.22,.68,0,1.2), filter .55s ease",
          filter:
            "drop-shadow(0 28px 38px rgba(90,70,50,.22)) drop-shadow(0 8px 14px rgba(90,70,50,.13))",
          cursor: "default",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget
          el.style.transform = "rotateX(14deg) rotateZ(-1.5deg) translateY(-18px)"
          el.style.filter =
            "drop-shadow(0 40px 52px rgba(90,70,50,.28)) drop-shadow(0 12px 20px rgba(90,70,50,.15))"
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget
          el.style.transform = "rotateX(22deg) rotateZ(-3deg) translateY(-8px)"
          el.style.filter =
            "drop-shadow(0 28px 38px rgba(90,70,50,.22)) drop-shadow(0 8px 14px rgba(90,70,50,.13))"
        }}
      >
        <Image
          src="/ak.svg"
          alt="Aksum"
          width={360}
          height={360}
          className="block h-full w-full select-none"
          priority
        />
      </div>

      {/* Ground shadow */}
      <div
        style={{
          width: "clamp(160px, 24vw, 320px)",
          height: "36px",
          background:
            "radial-gradient(ellipse at center, rgba(90,70,50,.18) 0%, transparent 72%)",
          marginTop: "8px",
          transition: "width .55s ease, opacity .55s ease",
        }}
        aria-hidden="true"
      />
    </div>
  )
}

export function Hero() {
  const t = useT()

  return (
    <section
      id="hero"
      className="overflow-x-hidden pb-8 pt-16 md:pb-10 lg:pb-12"
      style={{ backgroundColor: "var(--mkt-bg)" }}
    >
      <div
        className="relative -mt-16 mx-3 min-h-[640px] overflow-hidden sm:mx-4 md:mx-5 lg:mx-6 xl:mx-8 md:min-h-[760px] lg:min-h-[880px] xl:min-h-[960px]"
        style={{
          background: "linear-gradient(160deg, #f9f6f1 0%, #ede8df 50%, #e8e0d4 100%)",
        }}
      >
        <div className="relative z-10 flex min-h-[inherit] items-center px-6 pb-12 pt-16 sm:px-10 md:px-14 md:pb-16 lg:px-20 lg:pb-20 xl:px-24">
          <div className="grid w-full grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-12 xl:gap-20">
            <div className="mx-auto w-full max-w-2xl lg:max-w-none lg:justify-self-center lg:pl-8 xl:pl-16 2xl:pl-24">
              <span
                className="inline-flex items-center rounded-full border px-5 py-2 text-[14px] tracking-[-0.01em]"
                style={{
                  borderColor: "rgba(90,70,50,0.22)",
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

            <div className="relative flex items-end justify-center pb-8 lg:justify-center lg:overflow-visible lg:pb-0 xl:justify-end xl:pr-8 2xl:pr-16">
              <HeroLogoObject />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
