"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send } from "lucide-react"

// ─── Data ─────────────────────────────────────────────────────────────────────

const QUESTION = "What do we already know about Manila Energy?"

const INSIGHTS = [
  {
    index: "01",
    headline: "Intent confirmed across your own files — never formally tracked",
    detail:
      "Manila Energy appears in three separate internal documents: the Panama project debrief, the Q3 Colombia brief, and a regional strategy note. Each time, the context is the same — South America as an active expansion track. The signal was consistent. It was never captured in any account record.",
  },
  {
    index: "02",
    headline: "You hold the CEO's real brief. No competitor does.",
    detail:
      "Q3 meeting notes record the CEO naming regional credibility, stakeholder alignment, and a trusted local anchor as prerequisites for any formal approach. None of this language appears in their investor materials or public positioning. Your team has intelligence no one else has access to.",
  },
  {
    index: "03",
    headline: "The account went quiet — not cold",
    detail:
      "Follow-up threads show four unanswered emails after the CEO conversation, each referencing market entry sequencing and local introductions. Manila Energy never formally closed the door. The conversation stalled. It is still recoverable — with the right context and the right framing.",
  },
]

type Phase = "idle" | "loading" | "revealed"

// ─── Animated dots ─────────────────────────────────────────────────────────────

function ThinkingDots() {
  return (
    <span className="flex items-center gap-[3px]">
      {[0, 0.22, 0.44].map((delay, i) => (
        <motion.span
          key={i}
          className="block h-[3px] w-[3px] rounded-full bg-[#556]"
          animate={{ opacity: [0.25, 0.85, 0.25] }}
          transition={{ duration: 1.1, repeat: Infinity, delay, ease: "easeInOut" }}
        />
      ))}
    </span>
  )
}

// ─── User bubble ──────────────────────────────────────────────────────────────

function UserBubble() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex justify-end"
    >
      <div
        className="max-w-[84%] rounded-[10px] rounded-tr-[3px] px-3.5 py-2.5"
        style={{
          background: "rgba(91,156,246,0.09)",
          border: "1px solid rgba(91,156,246,0.15)",
        }}
      >
        <p className="text-[12.5px] leading-snug tracking-[-0.011em] text-white/72">
          {QUESTION}
        </p>
      </div>
    </motion.div>
  )
}

// ─── Panel ────────────────────────────────────────────────────────────────────

export function SalesIntelligencePanel() {
  const [phase, setPhase] = useState<Phase>("idle")
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  const handleSend = () => {
    if (phase !== "idle") return
    setPhase("loading")
    timerRef.current = setTimeout(() => setPhase("revealed"), 2600)
  }

  return (
    <div
      className="w-full overflow-hidden rounded-[14px]"
      style={{
        background: "#070E1F",
        border: "1px solid rgba(147,147,147,0.16)",
        boxShadow:
          "0 0 0 1px rgba(255,255,255,0.025), 0 36px 80px -16px rgba(0,0,0,0.75), 0 8px 24px -6px rgba(0,0,0,0.55)",
      }}
    >
      {/* ── Window chrome ── */}
      <div
        className="flex items-center justify-between px-4 py-[11px]"
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
            Sovereign · Copilot
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
            Live
          </span>
        </div>
      </div>

      {/* ── Conversation area ── */}
      <div className="flex min-h-[310px] flex-col gap-4 px-5 py-5">
        <AnimatePresence mode="wait">

          {/* Idle — empty state */}
          {phase === "idle" && (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.12 } }}
              className="flex flex-1 flex-col items-center justify-center gap-2.5"
            >
              <div
                className="mb-1 flex h-8 w-8 items-center justify-center rounded-full"
                style={{
                  background: "rgba(147,147,147,0.055)",
                  border: "1px solid rgba(147,147,147,0.11)",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="5.5" stroke="rgba(255,255,255,0.22)" strokeWidth="1" />
                  <circle cx="7" cy="7" r="2" fill="rgba(255,255,255,0.22)" />
                  <line x1="7" y1="1" x2="7" y2="2.5" stroke="rgba(255,255,255,0.22)" strokeWidth="1" strokeLinecap="round" />
                  <line x1="7" y1="11.5" x2="7" y2="13" stroke="rgba(255,255,255,0.22)" strokeWidth="1" strokeLinecap="round" />
                  <line x1="1" y1="7" x2="2.5" y2="7" stroke="rgba(255,255,255,0.22)" strokeWidth="1" strokeLinecap="round" />
                  <line x1="11.5" y1="7" x2="13" y2="7" stroke="rgba(255,255,255,0.22)" strokeWidth="1" strokeLinecap="round" />
                </svg>
              </div>
              <p className="text-[11.5px] text-[#555]">Ask about any account or relationship</p>
              <p className="text-[10px] text-[#3b4050]">
                Press send — see what Sovereign already knows.
              </p>
            </motion.div>
          )}

          {/* Loading */}
          {phase === "loading" && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.12 } }}
              transition={{ duration: 0.25 }}
              className="flex flex-1 flex-col gap-4"
            >
              <UserBubble />

              {/* Searching indicator */}
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18, duration: 0.3 }}
                className="flex items-center gap-2.5"
              >
                <div
                  className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full"
                  style={{
                    background: "rgba(147,147,147,0.065)",
                    border: "1px solid rgba(147,147,147,0.13)",
                  }}
                >
                  <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                    <circle cx="4.5" cy="4.5" r="3.25" stroke="rgba(255,255,255,0.32)" strokeWidth="0.9" />
                    <path
                      d="M4.5 2.75v1.75l1 1"
                      stroke="rgba(255,255,255,0.32)"
                      strokeWidth="0.9"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="text-[11px] text-[#5e6878]">Searching internal context</span>
                <ThinkingDots />
              </motion.div>
            </motion.div>
          )}

          {/* Revealed */}
          {phase === "revealed" && (
            <motion.div
              key="revealed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="flex flex-1 flex-col gap-3.5"
            >
              <UserBubble />

              {/* Response cards */}
              <div className="flex flex-col gap-2.5">
                {INSIGHTS.map((item, i) => (
                  <motion.div
                    key={item.index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.42,
                      delay: i * 0.19,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                    className="rounded-[8px] px-4 py-3.5"
                    style={{
                      background: "rgba(255,255,255,0.024)",
                      border: "1px solid rgba(147,147,147,0.10)",
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className="mt-0.5 shrink-0 text-[9px] font-semibold tabular-nums tracking-[0.04em]"
                        style={{ color: "rgba(255,255,255,0.17)" }}
                      >
                        {item.index}
                      </span>
                      <div>
                        <p className="mb-1.5 text-[12.5px] font-medium leading-snug tracking-[-0.012em] text-white/85">
                          {item.headline}
                        </p>
                        <p className="text-[11px] leading-[1.65] tracking-[-0.005em] text-[#757575]">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Input footer ── */}
      <div
        className="px-4 pb-4 pt-3"
        style={{ borderTop: "1px solid rgba(147,147,147,0.08)" }}
      >
        <motion.div
          className="flex items-center gap-3 rounded-[9px] px-4 py-[11px] transition-colors duration-200"
          style={{
            background: "rgba(255,255,255,0.025)",
            border: `1px solid ${
              phase === "idle"
                ? "rgba(147,147,147,0.16)"
                : "rgba(147,147,147,0.07)"
            }`,
          }}
        >
          <span
            className="flex-1 truncate text-[12px] tracking-[-0.011em] transition-colors duration-200"
            style={{
              color:
                phase === "idle"
                  ? "rgba(255,255,255,0.42)"
                  : "rgba(255,255,255,0.16)",
            }}
          >
            {QUESTION}
          </span>

          <motion.button
            onClick={handleSend}
            disabled={phase !== "idle"}
            whileHover={phase === "idle" ? { scale: 1.06 } : {}}
            whileTap={phase === "idle" ? { scale: 0.93 } : {}}
            className="flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-[7px] transition-all duration-200"
            style={{
              background:
                phase === "idle"
                  ? "rgba(255,255,255,0.10)"
                  : "rgba(255,255,255,0.03)",
              border:
                phase === "idle"
                  ? "1px solid rgba(255,255,255,0.17)"
                  : "1px solid rgba(147,147,147,0.07)",
              cursor: phase === "idle" ? "pointer" : "default",
            }}
          >
            <Send
              className="h-3.5 w-3.5 transition-all duration-200"
              style={{
                color:
                  phase === "idle"
                    ? "rgba(255,255,255,0.70)"
                    : "rgba(255,255,255,0.16)",
              }}
            />
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}
