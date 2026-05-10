"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

// ─── Design tokens (Aksum dark panel system) ──────────────────────────────
// Document cards render on the same dark surface family as the other panels.
// All text uses white/opacity tones consistent with the rest of the system.

const CARD_BG = "#080F1E"
const CARD_BORDER = "1px solid rgba(147,147,147,0.13)"
const DIVIDER = "rgba(147,147,147,0.09)"

// ─── Document card content ─────────────────────────────────────────────────────

function LinkedInCard() {
  return (
    <div className="flex flex-col gap-4 font-sans">
      <div className="flex items-center gap-3">
        <div
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[9px] font-semibold tracking-[0.05em] text-white/70"
          style={{
            background: "rgba(91,156,246,0.10)",
            border: "1px solid rgba(91,156,246,0.18)",
          }}
        >
          MC
        </div>
        <div>
          <p className="text-[12px] font-semibold leading-tight tracking-[-0.012em] text-white/85">
            Meridian Capital
          </p>
          <p className="text-[10.5px] tracking-[-0.008em] text-[#5e6878]">
            Investment Advisory · 12h
          </p>
        </div>
      </div>
      <div className="space-y-2.5 text-[12px] leading-relaxed tracking-[-0.010em] text-white/55">
        <p>
          The infrastructure gap in Southeast Asian logistics isn{"'"}t closing; it{"'"}s
          shifting. Three signals from our latest research:
        </p>
        <p>
          <span className="text-white/70">1.</span> Cold-chain investment in Vietnam
          grew 34% YoY while warehouse utilisation plateaued.
        </p>
        <p>
          <span className="text-white/70">2.</span> Last-mile providers are
          consolidating faster than regulatory frameworks can adapt.
        </p>
        <p>
          <span className="text-white/70">3.</span> The capital flowing into port
          modernisation is being undercut by underinvestment in digital customs.
        </p>
        <p className="pt-0.5 text-[10px] tracking-normal text-[#4a5060]">
          #SupplyChain #EmergingMarkets #Infrastructure
        </p>
      </div>
    </div>
  )
}

function NewsletterCard() {
  return (
    <div className="flex flex-col gap-3 font-sans">
      <div className="flex items-baseline justify-between">
        <p className="text-[9.5px] font-semibold uppercase tracking-[0.10em] text-[#5e6878]">
          Weekly Intelligence Brief
        </p>
        <p className="text-[9.5px] text-[#4a5060]">Vol. 38</p>
      </div>
      <div className="h-px" style={{ background: DIVIDER }} />
      <h4 className="font-serif text-[15px] font-normal leading-snug tracking-[-0.020em] text-white/88">
        Why Middle East sovereign wealth is quietly repricing African telecom
      </h4>
      <div className="space-y-2.5 text-[12px] leading-relaxed tracking-[-0.010em] text-white/52">
        <p>
          Over the past quarter, three Gulf-based sovereign funds have increased their
          exposure to sub-Saharan mobile infrastructure, but through secondary markets,
          not headline deals.
        </p>
        <p>
          Our analysis across 142 stakeholder conversations and 28 regulatory filings
          surfaces a consistent thesis: spectrum reallocation in Nigeria, Kenya, and
          Ethiopia is creating arbitrage windows that traditional PE is too slow to capture.
        </p>
        <p className="font-medium text-[#5e6878]">Continue reading →</p>
      </div>
    </div>
  )
}

function OutreachCard() {
  return (
    <div className="flex flex-col gap-3 font-sans">
      <div className="space-y-[5px]">
        <div className="flex items-center gap-2 text-[10.5px]">
          <span className="w-8 shrink-0 text-[#4a5060]">To</span>
          <span className="text-white/55">j.navarro@horizonpartners.com</span>
        </div>
        <div className="flex items-start gap-2 text-[10.5px]">
          <span className="w-8 shrink-0 text-[#4a5060]">Re</span>
          <span className="text-white/55">
            Following up: Horizon{"'"}s Southeast Asia pipeline
          </span>
        </div>
      </div>
      <div className="h-px" style={{ background: DIVIDER }} />
      <div className="space-y-2.5 text-[12px] leading-relaxed tracking-[-0.010em] text-white/52">
        <p>Julia,</p>
        <p>
          Good speaking with you at the Singapore forum. You mentioned Horizon is
          evaluating two logistics-adjacent deals in the Mekong corridor, so I wanted to
          share some context that might be relevant.
        </p>
        <p>
          Our intelligence suggests the Vietnamese government is quietly accelerating
          customs digitisation in Q3, which could materially improve cross-border
          throughput at the Lao Bao and Moc Bai checkpoints. We{"'"}ve seen early signals
          from three ministry-level conversations in the past six weeks.
        </p>
        <p>Happy to walk through the detail if useful. Would Thursday work?</p>
        <p className="text-[#5e6878]">
          Best,
          <br />
          Daniel Chen · Meridian Capital
        </p>
      </div>
    </div>
  )
}

function StakeholderBriefCard() {
  return (
    <div className="flex flex-col gap-3 font-sans">
      <div className="flex items-baseline justify-between">
        <p className="text-[9.5px] font-semibold uppercase tracking-[0.10em] text-[#5e6878]">
          Stakeholder Brief
        </p>
        <p className="text-[9px] font-semibold uppercase tracking-[0.06em] text-[#4a5060]">
          Confidential
        </p>
      </div>
      <div className="h-px" style={{ background: DIVIDER }} />
      <h4 className="font-serif text-[15px] font-normal leading-snug tracking-[-0.020em] text-white/88">
        Board Preparation: Equinox Media · Expansion Review
      </h4>
      <div className="space-y-3 text-[12px] leading-relaxed tracking-[-0.010em] text-white/52">
        <div>
          <p className="mb-1 text-[9px] font-semibold uppercase tracking-[0.08em] text-[#5e6878]">
            Key context
          </p>
          <p>
            Equinox Media{"'"}s board meets April 14 to decide on the East Africa
            expansion. The CEO has signalled openness to a phased approach, but the CFO
            remains sceptical about unit economics below $2M ARR.
          </p>
        </div>
        <div>
          <p className="mb-1 text-[9px] font-semibold uppercase tracking-[0.08em] text-[#5e6878]">
            Recommended angles
          </p>
          <p>
            Lead with the regulatory tailwind in Kenya{"'"}s media licensing reform.
            Reference the Frontier Group precedent: they achieved breakeven in 14 months
            by co-locating sales and editorial operations.
          </p>
        </div>
      </div>
    </div>
  )
}

// ─── Tab data ──────────────────────────────────────────────────────────────────

interface OutputCard {
  id: string
  tab: string
  label: string
  content: React.ReactNode
}

const cards: OutputCard[] = [
  {
    id: "linkedin",
    tab: "LinkedIn",
    label: "LinkedIn Post",
    content: <LinkedInCard />,
  },
  {
    id: "newsletter",
    tab: "Newsletter",
    label: "Newsletter Snippet",
    content: <NewsletterCard />,
  },
  {
    id: "outreach",
    tab: "Outreach",
    label: "Sales Outreach",
    content: <OutreachCard />,
  },
  {
    id: "brief",
    tab: "Brief",
    label: "Stakeholder Brief",
    content: <StakeholderBriefCard />,
  },
]

// ─── Showcase component ───────────────────────────────────────────────────────

const ROTATE_INTERVAL = 4500

export function MarketingActivationShowcase() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const startTimer = useCallback(() => {
    intervalRef.current = setInterval(() => {
      setActive(prev => (prev + 1) % cards.length)
    }, ROTATE_INTERVAL)
  }, [])

  const stopTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  useEffect(() => {
    if (!paused) startTimer()
    return stopTimer
  }, [paused, startTimer, stopTimer])

  const handleTabClick = (index: number) => {
    stopTimer()
    setActive(index)
    if (!paused) startTimer()
  }

  return (
    <div
      className="flex h-full w-full flex-col overflow-hidden rounded-[14px]"
      style={{
        background: "#070E1F",
        border: "1px solid rgba(147,147,147,0.16)",
        boxShadow:
          "0 0 0 1px rgba(255,255,255,0.025), 0 36px 80px -16px rgba(0,0,0,0.75), 0 8px 24px -6px rgba(0,0,0,0.55)",
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── Window chrome ── */}
      <div
        className="flex shrink-0 items-center justify-between px-4 py-[11px]"
        style={{
          background: "linear-gradient(to bottom, #0D1B32, #0B1729)",
          borderBottom: "1px solid rgba(147,147,147,0.10)",
        }}
      >
        <div className="flex items-center gap-3">
          <div className="flex gap-[5px]">
            {(
              [
                "rgba(255,95,86,0.42)",
                "rgba(255,189,68,0.42)",
                "rgba(40,200,64,0.42)",
              ] as const
            ).map((color, i) => (
              <div
                key={i}
                className="h-[9px] w-[9px] rounded-full"
                style={{ background: color }}
              />
            ))}
          </div>
          <span
            className="text-[10.5px] font-medium uppercase tracking-[0.07em]"
            style={{ color: "rgba(255,255,255,0.28)" }}
          >
            Aksum · Output
          </span>
        </div>

        <div
          className="flex items-center gap-1.5 rounded-full px-2 py-[3px]"
          style={{
            background: "rgba(74,222,128,0.07)",
            border: "1px solid rgba(74,222,128,0.17)",
          }}
        >
          <div className="h-[5px] w-[5px] rounded-full bg-[#4ADE80]" />
          <span className="text-[8.5px] font-semibold uppercase tracking-[0.09em] text-[#4ADE80]">
            Ready
          </span>
        </div>
      </div>

      {/* ── Integrated tab strip ── */}
      <div
        className="flex shrink-0 items-center gap-0.5 px-3 py-[9px]"
        style={{ borderBottom: "1px solid rgba(147,147,147,0.10)" }}
      >
        {cards.map((card, i) => (
          <button
            key={card.id}
            onClick={() => handleTabClick(i)}
            className={`rounded-[6px] px-3 py-[6px] text-[11px] font-medium tracking-[-0.011em] transition-all duration-200 ${
              i === active
                ? "bg-white/[0.08] text-white/90"
                : "text-white/35 hover:bg-white/[0.04] hover:text-white/60"
            }`}
          >
            {card.tab}
          </button>
        ))}

        {/* Output type label — right-aligned, fades on switch */}
        <div className="ml-auto pr-1">
          <AnimatePresence mode="wait">
            <motion.p
              key={cards[active].id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="text-[10px] font-medium uppercase tracking-[0.09em]"
              style={{ color: "rgba(255,255,255,0.22)" }}
            >
              {cards[active].label}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Document area ── */}
      <div className="flex flex-1 flex-col overflow-hidden px-4 pb-4 pt-3">
        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={cards[active].id}
              initial={{ opacity: 0, y: 7 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="overflow-hidden rounded-[9px] px-5 py-5"
              style={{
                background: CARD_BG,
                border: CARD_BORDER,
                boxShadow: "0 1px 3px rgba(0,0,0,0.30), 0 4px 14px rgba(0,0,0,0.22)",
              }}
            >
              {cards[active].content}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

// ─── Composition: showcase (left) + image editorial (right) ───────────────────

export function MarketingActivationComposition() {
  return (
    // Mobile: stacked column, explicit per-panel heights.
    // lg+: side-by-side row, fixed 520 px container height.
    <div className="flex flex-col gap-4 lg:h-[520px] lg:flex-row lg:items-stretch">
      {/* Left: existing interactive showcase panel */}
      <div className="h-[440px] w-full shrink-0 lg:h-full lg:w-[57%]">
        <MarketingActivationShowcase />
      </div>

      {/* Right: cinematic image with editorial text anchored at the bottom */}
      <div
        className="relative h-[300px] w-full overflow-hidden rounded-[17px] lg:h-auto lg:flex-1"
        style={{ border: "1px solid rgba(147,147,147,0.13)" }}
      >
        <Image
          src="/square(2).png"
          alt=""
          fill
          className="object-cover object-center"
          sizes="(min-width: 1024px) 40vw, 100vw"
        />

        {/* Bottom content — no gradient scrim over the artwork so the PNG stays clean */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-7">
          <div
            className="mb-4 h-px w-10"
            style={{ background: "rgba(255,255,255,0.14)" }}
          />
          <p
            className="mb-3 font-serif text-[18px] font-normal leading-snug tracking-[-0.020em]"
            style={{
              color: "rgba(255,255,255,0.92)",
              textShadow:
                "0 1px 2px rgba(0,0,0,0.65), 0 0 24px rgba(4,9,20,0.9)",
            }}
          >
            Deploy authority where others only see uncertainty.
          </p>
          <p
            className="text-[12px] leading-[1.72] tracking-[-0.010em]"
            style={{
              color: "rgba(255,255,255,0.52)",
              textShadow:
                "0 1px 2px rgba(0,0,0,0.55), 0 0 18px rgba(4,9,20,0.85)",
            }}
          >
            Aksum doesn&apos;t just extract data; it builds an authority layer for strategic
            communication. We turn fragmented frontier-market signals into high-fidelity outbound
            assets, from specialist newsletters to LinkedIn-ready briefings, ensuring every message
            is grounded in primary-source truth.
          </p>
        </div>
      </div>
    </div>
  )
}
