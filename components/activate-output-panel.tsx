"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

// ─── Design tokens ────────────────────────────────────────────────────────────

const CARD_BG     = "#080F1E"
const CARD_BORDER = "1px solid rgba(147,147,147,0.13)"
const DIVIDER     = "rgba(147,147,147,0.09)"

// ─── Output card content ──────────────────────────────────────────────────────

function NewsletterOutput() {
  return (
    <div className="flex flex-col gap-4 font-sans">
      <div className="flex items-baseline justify-between">
        <p className="text-[9.5px] font-semibold uppercase tracking-[0.10em] text-[#5e6878]">
          Intelligence Brief · Vol. 44
        </p>
        <p className="text-[9px] text-[#4a5060]">April 2026</p>
      </div>
      <div className="h-px" style={{ background: DIVIDER }} />
      <h4 className="font-serif text-[16px] font-normal leading-snug tracking-[-0.020em] text-white/88">
        West Africa's infrastructure cycle is entering a new phase — and most capital is still positioned for the last one
      </h4>
      <div className="space-y-3 text-[12px] leading-relaxed tracking-[-0.010em] text-white/52">
        <p>
          Across 38 stakeholder conversations conducted this quarter, a consistent pattern has emerged: the infrastructure investment thesis that drove capital allocation into West Africa between 2019 and 2023 is no longer the dominant frame among the region's most active operators.
        </p>
        <p>
          Three signals stand out. First, the regulatory environment in Nigeria has shifted materially since the Petroleum Industry Act — execution risk has declined, but the window for first-mover advantage is narrowing. Second, Ghana's port modernisation programme is creating procurement opportunities that are not yet visible in public tender databases. Third, the Francophone corridor — Côte d'Ivoire to Senegal — is attracting a new class of infrastructure investor that is not yet well-covered by existing research.
        </p>
        <div
          className="rounded-lg px-4 py-3"
          style={{ background: "rgba(91,156,246,0.05)", border: "1px solid rgba(91,156,246,0.12)" }}
        >
          <p className="mb-1 text-[9.5px] font-semibold uppercase tracking-[0.08em] text-[#5B9CF6]">
            This week's signal
          </p>
          <p className="text-[11.5px] leading-relaxed text-white/60">
            NNPC's revised domestic supply mandate, confirmed in a March 2026 ministry briefing, will structurally alter the economics of independent power producers in the Lagos corridor by Q3 2026.
          </p>
        </div>
        <p className="text-[10.5px] text-[#4a5060]">
          Drawn from 38 internal conversations · 14 regulatory filings · 6 sector briefs
        </p>
      </div>
    </div>
  )
}

function BoardBriefOutput() {
  return (
    <div className="flex flex-col gap-4 font-sans">
      <div className="flex items-baseline justify-between">
        <p className="text-[9.5px] font-semibold uppercase tracking-[0.10em] text-[#5e6878]">
          Board Brief
        </p>
        <p className="text-[9px] font-semibold uppercase tracking-[0.06em] text-[#4a5060]">
          Confidential
        </p>
      </div>
      <div className="h-px" style={{ background: DIVIDER }} />
      <h4 className="font-serif text-[16px] font-normal leading-snug tracking-[-0.020em] text-white/88">
        Lagos Infrastructure Fund — Q1 2026 Review &amp; Strategic Outlook
      </h4>
      <div className="space-y-3 text-[12px] leading-relaxed tracking-[-0.010em] text-white/52">
        <div>
          <p className="mb-1.5 text-[9px] font-semibold uppercase tracking-[0.08em] text-[#5e6878]">
            Executive Summary
          </p>
          <p>
            The fund's three active positions are performing within projected parameters. The Apapa port logistics investment has reached operational breakeven 11 weeks ahead of schedule. The Abuja commercial real estate position remains on hold pending resolution of the zoning amendment — legal counsel expects a decision by May 2026.
          </p>
        </div>
        <div>
          <p className="mb-1.5 text-[9px] font-semibold uppercase tracking-[0.08em] text-[#5e6878]">
            Key Decisions Required
          </p>
          <div className="space-y-1.5">
            {[
              "Approve extension of the Eko Atlantic position through Q3 2026",
              "Authorise due diligence on the Côte d'Ivoire logistics opportunity",
              "Review revised fee structure for the Abuja anchor tenant",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="mt-0.5 shrink-0 text-[9px] tabular-nums text-[#4a5060]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-[11.5px] leading-snug text-white/58">{item}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-1.5 text-[9px] font-semibold uppercase tracking-[0.08em] text-[#5e6878]">
            Risk Flags
          </p>
          <p className="text-[11.5px] leading-relaxed text-white/52">
            Currency volatility in the naira corridor remains the primary macro risk. Our analysis of 12 central bank communications since January 2026 suggests the current stabilisation is structural, not cyclical — but the board should note that three of our portfolio companies have unhedged naira exposure above 40%.
          </p>
        </div>
      </div>
    </div>
  )
}

function InvestorMemoOutput() {
  return (
    <div className="flex flex-col gap-4 font-sans">
      <div className="flex items-baseline justify-between">
        <p className="text-[9.5px] font-semibold uppercase tracking-[0.10em] text-[#5e6878]">
          Investor Memorandum
        </p>
        <p className="text-[9px] text-[#4a5060]">Draft · April 2026</p>
      </div>
      <div className="h-px" style={{ background: DIVIDER }} />
      <h4 className="font-serif text-[16px] font-normal leading-snug tracking-[-0.020em] text-white/88">
        Pacific Corridor Infrastructure Programme — Series B Investment Case
      </h4>
      <div className="space-y-3 text-[12px] leading-relaxed tracking-[-0.010em] text-white/52">
        <div>
          <p className="mb-1.5 text-[9px] font-semibold uppercase tracking-[0.08em] text-[#5e6878]">
            Opportunity
          </p>
          <p>
            The Pacific Corridor Programme represents a $340M infrastructure deployment across Chile and Colombia, structured as a phased joint venture between Manila Energy and Andes Power. The regulatory pathway has been confirmed at the ministerial level — a process that took 14 months and is documented in 22 internal stakeholder conversations.
          </p>
        </div>
        <div>
          <p className="mb-1.5 text-[9px] font-semibold uppercase tracking-[0.08em] text-[#5e6878]">
            Why Now
          </p>
          <p>
            Chile's energy transition procurement cycle opens in Q3 2026. The window for anchor positioning closes when the Ministry of Energy finalises its approved vendor list — expected in June. Three competing consortia are known to be in preparation; none has the stakeholder depth that the current intelligence base provides.
          </p>
        </div>
        <div className="flex items-center gap-6">
          {[
            { label: "Target IRR", value: "18–22%" },
            { label: "Hold Period", value: "7 years" },
            { label: "Anchor LP", value: "Confirmed" },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-[9px] text-[#4a5060]">{label}</p>
              <p className="text-[14px] font-semibold tracking-[-0.012em] text-white/75">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function AnnualReviewOutput() {
  return (
    <div className="flex flex-col gap-4 font-sans">
      <div className="flex items-baseline justify-between">
        <p className="text-[9.5px] font-semibold uppercase tracking-[0.10em] text-[#5e6878]">
          Annual Intelligence Review
        </p>
        <p className="text-[9px] text-[#4a5060]">2025 · Full Year</p>
      </div>
      <div className="h-px" style={{ background: DIVIDER }} />
      <h4 className="font-serif text-[16px] font-normal leading-snug tracking-[-0.020em] text-white/88">
        Emerging Markets Infrastructure — Signals, Themes, and Strategic Implications
      </h4>
      <div className="space-y-3 text-[12px] leading-relaxed tracking-[-0.010em] text-white/52">
        <p>
          This review synthesises intelligence gathered across 214 stakeholder conversations, 47 regulatory filings, and 28 internal strategy documents produced during 2025. It is structured around the three themes that recurred most consistently across geographies and sectors.
        </p>
        <div className="space-y-2">
          {[
            {
              n: "01",
              title: "Execution has replaced access as the primary differentiator",
              body: "In 2023, the dominant challenge was market access. By 2025, the organisations generating the strongest returns were those that had solved execution — not those with the best deal flow.",
            },
            {
              n: "02",
              title: "Regulatory risk is increasingly localised and predictable",
              body: "Contrary to the prevailing narrative, regulatory unpredictability has declined in 11 of the 14 markets we track. The risk is now concentrated in specific sectors and specific administrations.",
            },
          ].map(({ n, title, body }) => (
            <div
              key={n}
              className="rounded-lg px-3.5 py-3"
              style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(147,147,147,0.09)" }}
            >
              <div className="mb-1 flex items-center gap-2">
                <span className="text-[9px] tabular-nums text-[#4a5060]">{n}</span>
                <p className="text-[11px] font-semibold leading-tight tracking-[-0.010em] text-white/70">{title}</p>
              </div>
              <p className="text-[11px] leading-relaxed text-white/42">{body}</p>
            </div>
          ))}
        </div>
        <p className="text-[10.5px] text-[#4a5060]">
          214 conversations · 47 filings · 28 strategy documents · 12 markets
        </p>
      </div>
    </div>
  )
}

// ─── Tab data ─────────────────────────────────────────────────────────────────

interface OutputTab {
  id: string
  tab: string
  label: string
  content: React.ReactNode
}

const TABS: OutputTab[] = [
  { id: "newsletter",    tab: "Newsletter",    label: "Intelligence Brief",    content: <NewsletterOutput />    },
  { id: "board-brief",  tab: "Board Brief",   label: "Board Brief",           content: <BoardBriefOutput />    },
  { id: "investor-memo",tab: "Investor Memo", label: "Investor Memorandum",   content: <InvestorMemoOutput />  },
  { id: "annual-review",tab: "Annual Review", label: "Annual Review",         content: <AnnualReviewOutput />  },
]

const ROTATE_INTERVAL = 5000

// ─── Component ────────────────────────────────────────────────────────────────

export function ActivateOutputPanel() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const startTimer = useCallback(() => {
    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % TABS.length)
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
      className="flex w-full flex-col overflow-hidden rounded-[17px]"
      style={{
        background: "#070E1F",
        border: "1px solid rgba(147,147,147,0.16)",
        boxShadow:
          "0 0 0 1px rgba(255,255,255,0.025), 0 40px 100px -20px rgba(0,0,0,0.80), 0 8px 24px -6px rgba(0,0,0,0.55)",
        minHeight: 480,
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Window chrome */}
      <div
        className="flex shrink-0 items-center justify-between px-5 py-[11px]"
        style={{
          background: "linear-gradient(to bottom, #0D1B32, #0B1729)",
          borderBottom: "1px solid rgba(147,147,147,0.10)",
        }}
      >
        <div className="flex items-center gap-3">
          <div className="flex gap-[5px]">
            {(["rgba(255,95,86,0.42)", "rgba(255,189,68,0.42)", "rgba(40,200,64,0.42)"] as const).map(
              (color, i) => (
                <div key={i} className="h-[9px] w-[9px] rounded-full" style={{ background: color }} />
              ),
            )}
          </div>
          <span
            className="text-[10.5px] font-medium uppercase tracking-[0.07em]"
            style={{ color: "rgba(255,255,255,0.28)" }}
          >
            Sovereign · Output
          </span>
        </div>
        <div className="flex items-center gap-3">
          <AnimatePresence mode="wait">
            <motion.p
              key={TABS[active].id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="text-[10px] font-medium uppercase tracking-[0.09em]"
              style={{ color: "rgba(255,255,255,0.22)" }}
            >
              {TABS[active].label}
            </motion.p>
          </AnimatePresence>
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
      </div>

      {/* Tab strip */}
      <div
        className="flex shrink-0 items-center gap-0.5 overflow-x-auto px-4 py-[9px] scrollbar-none"
        style={{ borderBottom: "1px solid rgba(147,147,147,0.10)" }}
      >
        {TABS.map((tab, i) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(i)}
            className={`shrink-0 rounded-[6px] px-3 py-[6px] text-[11px] font-medium tracking-[-0.011em] transition-all duration-200 ${
              i === active
                ? "bg-white/[0.08] text-white/90"
                : "text-white/35 hover:bg-white/[0.04] hover:text-white/60"
            }`}
          >
            {tab.tab}
          </button>
        ))}

        {/* Progress bar — resets on each tab change */}
        <div className="ml-auto flex items-center gap-2 pr-1">
          <div
            className="h-[2px] w-16 overflow-hidden rounded-full"
            style={{ background: "rgba(255,255,255,0.06)" }}
          >
            <motion.div
              key={`${active}-progress`}
              className="h-full rounded-full"
              style={{ background: "rgba(255,255,255,0.22)" }}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: ROTATE_INTERVAL / 1000, ease: "linear" }}
            />
          </div>
        </div>
      </div>

      {/* Document area */}
      <div className="flex flex-1 flex-col overflow-hidden px-5 pb-5 pt-4">
        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={TABS[active].id}
              initial={{ opacity: 0, y: 7 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="overflow-hidden rounded-[10px] px-5 py-5"
              style={{
                background: CARD_BG,
                border: CARD_BORDER,
                boxShadow: "0 1px 3px rgba(0,0,0,0.30), 0 4px 14px rgba(0,0,0,0.22)",
              }}
            >
              {TABS[active].content}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Footer strip — source context */}
      <div
        className="shrink-0 px-5 py-3"
        style={{ borderTop: "1px solid rgba(147,147,147,0.08)" }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {[
              { label: "Sources", value: "47" },
              { label: "Entities", value: "112" },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center gap-1.5">
                <span className="text-[11px] font-semibold tabular-nums" style={{ color: "rgba(255,255,255,0.55)" }}>
                  {value}
                </span>
                <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.22)" }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
          <span className="text-[10px] tracking-[-0.005em]" style={{ color: "rgba(255,255,255,0.18)" }}>
            Drawn from internal context only
          </span>
        </div>
      </div>
    </div>
  )
}
