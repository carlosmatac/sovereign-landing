"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

// ─── Card data ────────────────────────────────────────────────────────────────

interface OutputCard {
  id: string
  tab: string
  type: string
  content: React.ReactNode
}

function LinkedInCard() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0f172a] text-[10px] font-semibold tracking-[0.05em] text-white">
          MC
        </div>
        <div>
          <p className="text-sm font-semibold tracking-[-0.015em] text-[#0f172a]">Meridian Capital</p>
          <p className="text-[11px] text-[#0f172a]/40">Investment Advisory · 12h</p>
        </div>
      </div>
      <div className="space-y-3 text-[13px] leading-relaxed tracking-[-0.011em] text-[#0f172a]/75">
        <p>
          The infrastructure gap in Southeast Asian logistics isn{"'"}t closing — it{"'"}s
          shifting. Three signals from our latest research:
        </p>
        <p>
          <span className="font-medium text-[#0f172a]">1.</span> Cold-chain investment in Vietnam
          grew 34% YoY while warehouse utilisation plateaued.
        </p>
        <p>
          <span className="font-medium text-[#0f172a]">2.</span> Last-mile providers are
          consolidating faster than regulatory frameworks can adapt.
        </p>
        <p>
          <span className="font-medium text-[#0f172a]">3.</span> The capital flowing into port
          modernisation is being undercut by underinvestment in digital customs.
        </p>
        <p className="pt-1 text-[11px] tracking-normal text-[#0f172a]/35">
          #SupplyChain #EmergingMarkets #Infrastructure
        </p>
      </div>
    </div>
  )
}

function NewsletterCard() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-medium uppercase tracking-[0.10em] text-[#0f172a]/35">
          Weekly Intelligence Brief
        </p>
        <p className="text-[11px] text-[#0f172a]/25">Vol. 38</p>
      </div>
      <div className="h-px bg-[#0f172a]/6" />
      <h4 className="font-serif text-lg font-normal leading-snug tracking-[-0.02em] text-[#0f172a]">
        Why Middle East sovereign wealth is quietly repricing African telecom
      </h4>
      <div className="space-y-3 text-[13px] leading-relaxed tracking-[-0.011em] text-[#0f172a]/70">
        <p>
          Over the past quarter, three Gulf-based sovereign funds have increased their exposure
          to sub-Saharan mobile infrastructure — but through secondary markets, not headline deals.
        </p>
        <p>
          Our analysis across 142 stakeholder conversations and 28 regulatory filings surfaces a
          consistent thesis: spectrum reallocation in Nigeria, Kenya, and Ethiopia is creating
          arbitrage windows that traditional PE is too slow to capture.
        </p>
        <p className="font-medium text-[#0f172a]/45">
          Continue reading →
        </p>
      </div>
    </div>
  )
}

function OutreachCard() {
  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-[11px] text-[#0f172a]/35">
          <span className="font-medium">To:</span>
          <span className="text-[#0f172a]/55">j.navarro@horizonpartners.com</span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-[#0f172a]/35">
          <span className="font-medium">Subject:</span>
          <span className="text-[#0f172a]/55">
            Following up — Horizon{"'"}s Southeast Asia pipeline
          </span>
        </div>
      </div>
      <div className="h-px bg-[#0f172a]/6" />
      <div className="space-y-3 text-[13px] leading-relaxed tracking-[-0.011em] text-[#0f172a]/70">
        <p>Julia,</p>
        <p>
          Good speaking with you at the Singapore forum. You mentioned Horizon is evaluating
          two logistics-adjacent deals in the Mekong corridor — I wanted to share some
          context that might be relevant.
        </p>
        <p>
          Our intelligence suggests the Vietnamese government is quietly accelerating
          customs digitisation in Q3, which could materially improve cross-border
          throughput at the Lao Bao and Moc Bai checkpoints. We{"'"}ve seen early signals from
          three ministry-level conversations in the past six weeks.
        </p>
        <p>
          Happy to walk through the detail if useful. Would Thursday work?
        </p>
        <p className="pt-1 text-[#0f172a]/45">
          Best,<br />
          Daniel Chen · Meridian Capital
        </p>
      </div>
    </div>
  )
}

function StakeholderBriefCard() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-medium uppercase tracking-[0.10em] text-[#0f172a]/35">
          Stakeholder Brief
        </p>
        <p className="text-[10px] font-medium uppercase tracking-[0.05em] text-[#0f172a]/25">Confidential</p>
      </div>
      <div className="h-px bg-[#0f172a]/6" />
      <h4 className="font-serif text-lg font-normal leading-snug tracking-[-0.02em] text-[#0f172a]">
        Board Preparation: Equinox Media — Expansion Review
      </h4>
      <div className="space-y-3 text-[13px] leading-relaxed tracking-[-0.011em] text-[#0f172a]/70">
        <div>
          <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.08em] text-[#0f172a]/40">
            Key context
          </p>
          <p>
            Equinox Media{"'"}s board meets April 14 to decide on the East Africa expansion.
            The CEO has signalled openness to a phased approach, but the CFO remains
            sceptical about unit economics below $2M ARR.
          </p>
        </div>
        <div>
          <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.08em] text-[#0f172a]/40">
            Recommended angles
          </p>
          <p>
            Lead with the regulatory tailwind in Kenya{"'"}s media licensing reform. Reference
            the Frontier Group precedent — they achieved breakeven in 14 months by
            co-locating sales and editorial operations.
          </p>
        </div>
      </div>
    </div>
  )
}

const cards: OutputCard[] = [
  { id: "linkedin", tab: "LinkedIn", type: "LinkedIn Post", content: <LinkedInCard /> },
  { id: "newsletter", tab: "Newsletter", type: "Newsletter Snippet", content: <NewsletterCard /> },
  { id: "outreach", tab: "Outreach", type: "Sales Outreach", content: <OutreachCard /> },
  { id: "brief", tab: "Brief", type: "Stakeholder Brief", content: <StakeholderBriefCard /> },
]

// ─── Showcase component ───────────────────────────────────────────────────────

const ROTATE_INTERVAL = 4000

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
      className="flex h-full w-full flex-col overflow-hidden rounded-xl border border-[#0f172a]/[0.06] bg-white shadow-md shadow-black/5"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Card type label */}
      <div className="flex items-center justify-between border-b border-[#0f172a]/[0.06] px-6 py-3">
        <AnimatePresence mode="wait">
          <motion.p
            key={cards[active].id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="text-[11px] font-medium uppercase tracking-[0.10em] text-[#0f172a]/30"
          >
            {cards[active].type}
          </motion.p>
        </AnimatePresence>
        <div className="flex gap-1">
          {cards.map((_, i) => (
            <div
              key={i}
              className={`h-[3px] rounded-full transition-all duration-500 ${
                i === active ? "w-4 bg-[#0f172a]/20" : "w-[3px] bg-[#0f172a]/8"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Card content */}
      <div className="relative flex-1 overflow-y-auto px-6 py-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={cards[active].id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {cards[active].content}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Tab navigation */}
      <div className="flex items-center justify-center gap-1 border-t border-[#0f172a]/[0.06] px-4 py-2.5">
        {cards.map((card, i) => (
          <button
            key={card.id}
            onClick={() => handleTabClick(i)}
            className={`rounded-md px-3 py-1.5 text-[11px] font-medium tracking-[-0.011em] transition-all duration-200 ${
              i === active
                ? "bg-[#0f172a] text-white"
                : "text-[#0f172a]/35 hover:text-[#0f172a]/60"
            }`}
          >
            {card.tab}
          </button>
        ))}
      </div>
    </div>
  )
}
