"use client"

import Image from "next/image"
import { useCallback, useRef, useState } from "react"
import { MktContainer, MktSectionX } from "@/components/marketing-layout"
import { useT } from "@/lib/i18n/locale-context"

interface IntegrationLogo {
  name: string
  src: string
  optical: number
}

const LOGOS: IntegrationLogo[] = [
  { name: "HubSpot", src: "/integrations/hubspot.png", optical: 0.95 },
  { name: "Google Workspace", src: "/integrations/google.png", optical: 0.95 },
  { name: "Salesforce", src: "/integrations/salesforce.png", optical: 1.10 },
  { name: "Microsoft 365", src: "/integrations/microsoft.png", optical: 0.95 },
  { name: "Slack", src: "/integrations/slack.png", optical: 1.00 },
]

const REPEAT_COUNT = 8
const TRACK = Array.from({ length: REPEAT_COUNT }, () => LOGOS).flat()

interface HoveredState {
  name: string
  x: number
}

function LogoCell({
  logo,
  onEnter,
  onLeave,
}: {
  logo: IntegrationLogo
  onEnter: (name: string, el: HTMLDivElement) => void
  onLeave: () => void
}) {
  const innerHeight = 56 * logo.optical
  const innerWidth = innerHeight * 1.7

  return (
    <div
      className="group relative flex shrink-0 items-center justify-center px-7 md:px-9"
      onMouseEnter={(e) => onEnter(logo.name, e.currentTarget)}
      onMouseLeave={onLeave}
    >
      <div
        className="relative flex items-center justify-center"
        style={{ height: `${innerHeight}px`, width: `${innerWidth}px` }}
      >
        <Image
          src={logo.src}
          alt={logo.name}
          fill
          sizes="160px"
          className="object-contain transition-all duration-300 ease-out group-hover:opacity-100"
          style={{
            opacity: 0.65,
            filter: "saturate(0.9)",
          }}
          draggable={false}
        />
      </div>
    </div>
  )
}

export function IntegrationsBand() {
  const bandRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState<HoveredState | null>(null)
  const t = useT()

  const handleEnter = useCallback((name: string, cell: HTMLDivElement) => {
    const band = bandRef.current
    if (!band) return
    const cellRect = cell.getBoundingClientRect()
    const bandRect = band.getBoundingClientRect()
    setHovered({
      name,
      x: cellRect.left - bandRect.left + cellRect.width / 2,
    })
  }, [])

  const handleLeave = useCallback(() => setHovered(null), [])

  return (
    <section
      id="connect"
      className="scroll-mt-24 overflow-hidden py-14 md:py-16"
      style={{ backgroundColor: "var(--mkt-bg)" }}
    >
      <MktSectionX>
        <MktContainer className="relative z-10">
        <div className="mb-6 flex items-center justify-center gap-3">
          <div
            aria-hidden="true"
            className="h-px w-6"
            style={{ background: "var(--mkt-border-strong)" }}
          />
          <p
            className="text-[10px] font-medium uppercase"
            style={{
              color: "var(--mkt-text-muted)",
              letterSpacing: "0.18em",
            }}
          >
            {t.integrations.eyebrow}
          </p>
          <div
            aria-hidden="true"
            className="h-px w-6"
            style={{ background: "var(--mkt-border-strong)" }}
          />
        </div>

        <h2
          className="text-balance text-center font-serif text-[28px] font-normal leading-[1.18] tracking-[-0.022em] md:text-[34px]"
          style={{ color: "var(--mkt-text)" }}
        >
          {t.integrations.headline}
        </h2>

        <p
          className="mx-auto mt-5 max-w-xl text-balance text-center text-[14px] leading-[1.65] tracking-[-0.005em] md:text-[15px]"
          style={{ color: "var(--mkt-text-muted)" }}
        >
          {t.integrations.description}
        </p>
        </MktContainer>
      </MktSectionX>

      <div ref={bandRef} className="relative z-10 mt-10 md:mt-12">
        <div
          className="group/track"
          style={{
            overflow: "clip",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)",
            maskImage:
              "linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)",
          }}
        >
          <div
            className="flex w-max items-center py-6 will-change-transform group-hover/track:[animation-play-state:paused]"
            style={{
              animation: "sv-marquee 110s linear infinite",
            }}
          >
            {TRACK.map((logo, i) => (
              <LogoCell
                key={`${logo.name}-${i}`}
                logo={logo}
                onEnter={handleEnter}
                onLeave={handleLeave}
              />
            ))}
          </div>
        </div>

        <div
          aria-hidden={!hovered}
          className="pointer-events-none absolute top-0 z-30"
          style={{
            left: hovered ? `${hovered.x}px` : "50%",
            transform: "translate(-50%, calc(-100% - 6px))",
            opacity: hovered ? 1 : 0,
            transition:
              "opacity 200ms cubic-bezier(0.22, 0.8, 0.36, 1), left 240ms cubic-bezier(0.22, 0.8, 0.36, 1)",
          }}
        >
          <div
            className="relative whitespace-nowrap rounded-[6px] border px-3 py-[6px]"
            style={{
              background: "#ffffff",
              borderColor: "var(--mkt-border-strong)",
              boxShadow: "0 4px 16px rgba(26,26,46,0.08)",
            }}
          >
            <span
              className="text-[10.5px] font-medium tracking-[-0.005em]"
              style={{ color: "var(--mkt-text)" }}
            >
              {hovered?.name ?? ""}
            </span>
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/2 rotate-45"
              style={{
                width: "6px",
                height: "6px",
                background: "#ffffff",
                borderRight: "1px solid var(--mkt-border-strong)",
                borderBottom: "1px solid var(--mkt-border-strong)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
