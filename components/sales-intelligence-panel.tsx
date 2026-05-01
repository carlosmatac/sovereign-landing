"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send } from "lucide-react"

// ─── Chat data ────────────────────────────────────────────────────────────────

const PRIOR_USER = "Walk me through our South America accounts"

const PRIOR_RESPONSE =
  "4 accounts with engagement in the past quarter. Manila Energy leads on signal density: 3 internal documents and a recorded CEO conversation, all pointing to active expansion interest. Signal is there. Hasn't been formally actioned."

const QUESTION = "What do we already know about Manila Energy?"

const INSIGHTS = [
  {
    index: "01",
    headline: "Intent confirmed across your own files, never formally tracked",
    detail:
      "Manila Energy appears in three separate internal documents: the Panama project debrief, the Q3 Colombia brief, and a regional strategy note. Each time, the context is the same: South America as an active expansion track. The signal was consistent. It was never captured in any account record.",
  },
  {
    index: "02",
    headline: "You hold the CEO's real brief. No competitor does.",
    detail:
      "Q3 meeting notes record the CEO naming regional credibility, stakeholder alignment, and a trusted local anchor as prerequisites for any formal approach. None of this language appears in their investor materials or public positioning. Your team has intelligence no one else has access to.",
  },
  {
    index: "03",
    headline: "The account went quiet, not cold",
    detail:
      "Follow-up threads show four unanswered emails after the CEO conversation, each referencing market entry sequencing and local introductions. Manila Energy never formally closed the door. The conversation stalled. It is still recoverable, with the right context and the right framing.",
  },
]

type Phase = "idle" | "loading" | "revealed"

// ─── Interview background panel data ─────────────────────────────────────────

const ENTITIES = [
  { name: "Adrian Santos", kind: "PERSON" },
  { name: "Manila Energy", kind: "ORGANIZATION" },
  { name: "Chile Ministry of Energy", kind: "GOVERNMENT" },
  { name: "South America", kind: "REGION" },
  { name: "Andes Power", kind: "ORGANIZATION" },
  { name: "Colombia", kind: "REGION" },
]

const TOPICS = ["expansion", "positioning", "regulation", "infrastructure", "partnerships"]

const ENTITY_COLOR: Record<string, string> = {
  PERSON: "#5B9CF6",
  ORGANIZATION: "#34D399",
  GOVERNMENT: "#A78BFA",
  REGION: "#FBBF24",
}

// ─── Sub-components ───────────────────────────────────────────────────────────

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

// Blinking text caret used inside the simulated copilot input. We render
// it as a thin tinted bar (2px wide, ~14px tall) driven by a plain CSS
// keyframe (`sv-caret-blink` in app/globals.css). CSS gives us a *hard*
// on/off flip at the 50% mark, which reads as a real text-cursor blink;
// Framer Motion's `times` array can't reliably express two equal stops
// in a row, so we keep this off the JS animation system entirely.
//
// `position: relative; top: 1.5px` aligns the bar's vertical centre with
// the cap-height of the surrounding text, otherwise the caret sits
// slightly above baseline due to descender padding. The caret colour
// borrows the existing #5B9CF6 accent so it reads as part of the
// active-input language.
function BlinkingCaret({ side = "end" }: { side?: "start" | "end" }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block align-middle ${
        side === "start" ? "mr-[6px]" : "ml-[2px]"
      }`}
      style={{
        width: "2px",
        height: "14px",
        background:
          "linear-gradient(180deg, rgba(120,175,255,1) 0%, rgba(91,156,246,0.85) 100%)",
        borderRadius: "1px",
        boxShadow: "0 0 8px rgba(91,156,246,0.55)",
        position: "relative",
        top: "1.5px",
        animation: "sv-caret-blink 1.05s steps(1, end) infinite",
        willChange: "opacity",
      }}
    />
  )
}

function UserBubble({ text, faded = false }: { text: string; faded?: boolean }) {
  return (
    <div className="flex justify-end">
      <div
        className="max-w-[84%] rounded-[10px] rounded-tr-[3px] px-3.5 py-2.5"
        style={{
          background: faded ? "rgba(91,156,246,0.055)" : "rgba(91,156,246,0.09)",
          border: `1px solid ${faded ? "rgba(91,156,246,0.09)" : "rgba(91,156,246,0.15)"}`,
        }}
      >
        <p
          className="text-[12.5px] leading-snug tracking-[-0.011em]"
          style={{ color: faded ? "rgba(255,255,255,0.38)" : "rgba(255,255,255,0.72)" }}
        >
          {text}
        </p>
      </div>
    </div>
  )
}

function AksumBubble({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2">
      <div
        className="mt-[3px] flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full"
        style={{
          background: "rgba(147,147,147,0.055)",
          border: "1px solid rgba(147,147,147,0.11)",
        }}
      >
        <div className="h-[5px] w-[5px] rounded-full" style={{ background: "rgba(255,255,255,0.22)" }} />
      </div>
      <p className="text-[11px] leading-[1.65] tracking-[-0.005em] text-[#4a5060]">{text}</p>
    </div>
  )
}

// ─── Background: Interview Detail Panel ──────────────────────────────────────

function InterviewDetailBackground() {
  return (
    <div
      className="w-full overflow-hidden rounded-[17px]"
      style={{
        background: "#070E1F",
        border: "1px solid rgba(147,147,147,0.13)",
      }}
    >
      {/* Window chrome */}
      <div
        className="flex items-center justify-between px-4 py-[11px]"
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
            Aksum · Interviews
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

      {/* Header */}
      <div
        className="px-5 pb-3.5 pt-4"
        style={{ borderBottom: "1px solid rgba(147,147,147,0.08)" }}
      >
        <p className="mb-2.5 text-[9px] tracking-[-0.005em]" style={{ color: "rgba(255,255,255,0.22)" }}>
          ← Back to Interviews
        </p>
        <h2 className="mb-1.5 text-[13px] font-semibold leading-snug tracking-[-0.015em] text-white">
          Manila Energy: South America Strategy
        </h2>
        <div className="mb-1 flex flex-wrap items-center gap-x-2.5 gap-y-1">
          {["Feb 2026", "Philippines", "48m 22s", "2 speakers (recorded)"].map((m) => (
            <span key={m} className="text-[9px] text-[#5e6878]">
              {m}
            </span>
          ))}
        </div>
        <p className="text-[8.5px] text-[#4a5060]">Role (upload): CEO</p>
      </div>

      {/* Audio timeline */}
      <div
        className="flex items-center gap-3 px-5 py-2.5"
        style={{ borderBottom: "1px solid rgba(147,147,147,0.08)" }}
      >
        <div
          className="h-[3px] flex-1 overflow-hidden rounded-full"
          style={{ background: "rgba(255,255,255,0.05)" }}
        >
          <div
            className="h-full w-[34%] rounded-full"
            style={{ background: "rgba(91,156,246,0.45)" }}
          />
        </div>
        <span className="text-[8px] tabular-nums text-[#4a5060]">16:38 / 48:22</span>
      </div>

      {/* Main content */}
      <div className="flex" style={{ borderBottom: "1px solid rgba(147,147,147,0.08)" }}>
        {/* Left column */}
        <div
          className="flex-1 px-5 py-4"
          style={{ borderRight: "1px solid rgba(147,147,147,0.08)" }}
        >
          {/* Executive Summary */}
          <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.08em] text-[#5e6878]">
            Executive Summary
          </p>
          <p className="mb-4 text-[10px] leading-[1.72] tracking-[-0.005em] text-[#777]">
            The conversation centres on Manila Energy{"'"}s ambitions to establish a regional presence
            in South America, with Chile and Colombia identified as primary entry points. Santos
            outlines a phased approach, beginning with regulatory alignment and local partnership
            development before committing capital. He emphasises stakeholder credibility and trusted
            local anchors as non-negotiable prerequisites for formal market entry.
          </p>

          {/* Topics */}
          <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.08em] text-[#5e6878]">
            Topics
          </p>
          <div className="mb-4 flex flex-wrap gap-1.5">
            {TOPICS.map((t) => (
              <span
                key={t}
                className="rounded-full px-2 py-[3px] text-[8.5px] tracking-[-0.005em]"
                style={{
                  background: "rgba(255,255,255,0.035)",
                  border: "1px solid rgba(147,147,147,0.12)",
                  color: "rgba(255,255,255,0.42)",
                }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* Transcript */}
          <p className="mb-2.5 text-[9px] font-semibold uppercase tracking-[0.08em] text-[#5e6878]">
            Full Transcript
          </p>
          <div className="space-y-3">
            <div>
              <p className="mb-0.5 text-[8.5px] font-semibold text-[#4a5060]">B. Carles</p>
              <p className="text-[9.5px] leading-[1.68] text-[#666]">
                "What{"'"}s driving Manila Energy{"'"}s renewed focus on South America, particularly
                now, after years of concentration in Southeast Asia?"
              </p>
            </div>
            <div>
              <p className="mb-0.5 text-[8.5px] font-semibold text-[#5e6878]">Adrian Santos</p>
              <p className="text-[9.5px] leading-[1.68] text-[#666]">
                "The fundamentals changed. Chile{"'"}s energy transition is creating procurement
                windows that didn{"'"}t exist three years ago. And in Colombia, the infrastructure
                gap is widening in our direction. We{"'"}re moving deliberately; the question
                isn{"'"}t whether, it{"'"}s how and with whom."
              </p>
            </div>
            <div>
              <p className="mb-0.5 text-[8.5px] font-semibold text-[#4a5060]">B. Carles</p>
              <p className="text-[9.5px] leading-[1.68] text-[#666]">
                "And local credibility, how critical is that to the timeline?"
              </p>
            </div>
            <div>
              <p className="mb-0.5 text-[8.5px] font-semibold text-[#5e6878]">Adrian Santos</p>
              <p className="text-[9.5px] leading-[1.68] text-[#666]">
                "It{"'"}s the prerequisite. We will not move capital into a market where we
                don{"'"}t have a trusted anchor. Andes Power is one conversation we{"'"}re
                monitoring closely."
              </p>
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="w-[36%] shrink-0 px-4 py-4">
          <p className="mb-2.5 text-[9px] font-semibold uppercase tracking-[0.08em] text-[#5e6878]">
            Entities Mentioned
          </p>
          <p className="mb-3 text-[8.5px] text-[#4a5060]">6 unique · 18 mentions</p>
          <div className="space-y-2.5">
            {ENTITIES.map((e) => (
              <div key={e.name} className="flex items-start gap-1.5">
                <div
                  className="mt-[4px] h-[5px] w-[5px] shrink-0 rounded-full"
                  style={{ background: ENTITY_COLOR[e.kind] ?? "#777" }}
                />
                <div>
                  <p className="text-[9.5px] font-medium leading-tight text-white/55">
                    {e.name}
                  </p>
                  <p className="text-[8px] text-[#4a5060]">{e.kind}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Foreground: Chat panel ───────────────────────────────────────────────────

function SalesIntelligencePanel() {
  const [phase, setPhase] = useState<Phase>("idle")
  const [inputFocused, setInputFocused] = useState(false)
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

  // ── Foreground panel ────────────────────────────────────────────────────
  // Sharper than the background interview panel. The fill is a top-down
  // gradient (rather than the flat #070E1F used by background panels) so
  // the surface picks up a faint highlight that reads as "this is the
  // active panel". Border + shadow are heavier so the panel feels lifted
  // out of the composition. Height is generous to accommodate the wider
  // composition above it.
  return (
    <div
      className="relative flex h-[560px] w-full flex-col overflow-hidden rounded-[18px]"
      style={{
        background:
          "linear-gradient(180deg, #0B1631 0%, #081024 30%, #060E1F 100%)",
        border: "1px solid rgba(178,194,224,0.18)",
        boxShadow: [
          "inset 0 1px 0 rgba(255,255,255,0.045)",
          "0 0 0 1px rgba(255,255,255,0.030)",
          "0 48px 110px -18px rgba(0,0,0,0.78)",
          "0 14px 32px -8px rgba(0,0,0,0.60)",
          "0 0 60px -10px rgba(91,156,246,0.08)",
        ].join(", "),
      }}
    >
      {/* Window chrome */}
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
            Aksum · Copilot
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

      {/* Conversation area — flex-1 + overflow-y-auto so the panel height never changes */}
      <div className="flex flex-1 flex-col gap-3 overflow-y-auto px-5 pb-3 pt-5">
        {/* ── Static prior conversation ── */}
        <UserBubble text={PRIOR_USER} faded />
        <AksumBubble text={PRIOR_RESPONSE} />

        {/* Thin separator — marks the boundary between history and current session */}
        <div
          aria-hidden="true"
          className="my-1 border-t"
          style={{ borderColor: "rgba(255,255,255,0.05)" }}
        />

        {/* ── Interactive conversation area ── */}
        <AnimatePresence mode="wait">
          {phase === "idle" && (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.12 } }}
              className="flex items-center gap-2 py-1"
            >
              <div
                className="h-[5px] w-[5px] shrink-0 rounded-full"
                style={{ background: "rgba(255,255,255,0.12)" }}
              />
              <p className="text-[10.5px] text-[#3a4050]">
                Ask Aksum what it already knows.
              </p>
            </motion.div>
          )}

          {phase === "loading" && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.12 } }}
              transition={{ duration: 0.25 }}
              className="flex flex-col gap-3"
            >
              <UserBubble text={QUESTION} />
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
                    <circle
                      cx="4.5"
                      cy="4.5"
                      r="3.25"
                      stroke="rgba(255,255,255,0.32)"
                      strokeWidth="0.9"
                    />
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

          {phase === "revealed" && (
            <motion.div
              key="revealed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-3"
            >
              <UserBubble text={QUESTION} />
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
                    className="relative rounded-[8px] px-4 py-3.5"
                    style={{
                      background: "rgba(255,255,255,0.028)",
                      border: "1px solid rgba(147,147,147,0.12)",
                    }}
                  >
                    {/* Citation accent — a 2px tinted bar at the left edge
                        ties each insight back to the blue accent used by
                        the input/send button, so the foreground panel
                        carries one consistent action colour. */}
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-2.5 bottom-2.5 w-[2px] rounded-r-full"
                      style={{
                        background:
                          "linear-gradient(to bottom, rgba(91,156,246,0.55), rgba(91,156,246,0.18))",
                      }}
                    />
                    <div className="flex items-start gap-3">
                      <span
                        className="mt-0.5 shrink-0 text-[9px] font-semibold tabular-nums tracking-[0.04em]"
                        style={{ color: "rgba(91,156,246,0.55)" }}
                      >
                        {item.index}
                      </span>
                      <div>
                        <p className="mb-1.5 text-[12.5px] font-medium leading-snug tracking-[-0.012em] text-white/90">
                          {item.headline}
                        </p>
                        <p className="text-[11px] leading-[1.65] tracking-[-0.005em] text-[#8a8f9c]">
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

      {/* ── Input footer ────────────────────────────────────────────────
          Re-built as a proper actionable surface. The container reads
          as a lifted "input row" rather than a faded label:
            • dark fill noticeably distinct from the panel surface
            • crisp 1px border + a subtle inset highlight (top edge)
            • focus state adds a soft blue ring + brightens the border,
              tying into the existing #5B9CF6 accent used elsewhere
            • placeholder text is more readable (white/55 vs the old
              white/42), with a small "/" badge that hints at a real
              keyboard affordance — exactly like the Linear reference
            • send button uses a filled blue accent so it clearly reads
              as the primary action; idle shows a soft glow ring */}
      <div className="shrink-0 px-4 pb-4 pt-3.5">
        <motion.div
          tabIndex={phase === "idle" ? 0 : -1}
          onFocus={() => setInputFocused(true)}
          onBlur={() => setInputFocused(false)}
          className="flex items-center gap-3 rounded-[10px] px-3.5 py-3 transition-all duration-200 outline-none"
          style={{
            background:
              phase === "idle"
                ? "rgba(8,14,32,0.80)"
                : "rgba(8,14,32,0.50)",
            border: `1px solid ${
              phase === "idle"
                ? inputFocused
                  ? "rgba(91,156,246,0.45)"
                  : "rgba(178,194,224,0.20)"
                : "rgba(147,147,147,0.08)"
            }`,
            boxShadow:
              phase === "idle"
                ? inputFocused
                  ? "inset 0 1px 0 rgba(255,255,255,0.04), 0 0 0 3px rgba(91,156,246,0.10)"
                  : "inset 0 1px 0 rgba(255,255,255,0.04)"
                : "none",
          }}
        >
          {/* Input text — switches between the active prompt (with a
              trailing caret) and a soft placeholder (with a leading
              caret) once the message has been sent. The wrapping span
              uses `truncate`/`min-w-0` so very narrow viewports never
              push the send button out of the row. */}
          <span
            className="flex min-w-0 flex-1 items-center truncate text-[12.5px] tracking-[-0.011em] transition-colors duration-200"
            style={{
              color:
                phase === "idle"
                  ? "rgba(255,255,255,0.62)"
                  : "rgba(255,255,255,0.34)",
            }}
          >
            {phase === "idle" ? (
              <>
                <span className="truncate">{QUESTION}</span>
                <BlinkingCaret side="end" />
              </>
            ) : (
              <>
                <BlinkingCaret side="start" />
                <span className="truncate">Talk with Aksum</span>
              </>
            )}
          </span>

          {/* Keyboard hint — present only at idle, mirrors the Linear-style
              "/" affordance. Recedes once the user has acted. */}
          {phase === "idle" && (
            <span
              className="hidden shrink-0 items-center gap-1 rounded-[5px] px-1.5 py-[2px] text-[9.5px] font-medium uppercase tracking-[0.06em] sm:flex"
              style={{
                background: "rgba(178,194,224,0.06)",
                border: "1px solid rgba(178,194,224,0.12)",
                color: "rgba(255,255,255,0.40)",
              }}
            >
              <span className="font-mono text-[10px] leading-none">/</span>
              <span className="leading-none">ask</span>
            </span>
          )}

          <motion.button
            onClick={handleSend}
            disabled={phase !== "idle"}
            whileHover={phase === "idle" ? { scale: 1.05 } : {}}
            whileTap={phase === "idle" ? { scale: 0.94 } : {}}
            className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[8px] transition-all duration-200"
            style={{
              background:
                phase === "idle"
                  ? "linear-gradient(180deg, rgba(91,156,246,0.95) 0%, rgba(74,135,225,0.95) 100%)"
                  : "rgba(178,194,224,0.04)",
              border: `1px solid ${
                phase === "idle"
                  ? "rgba(91,156,246,0.55)"
                  : "rgba(147,147,147,0.08)"
              }`,
              boxShadow:
                phase === "idle"
                  ? "inset 0 1px 0 rgba(255,255,255,0.20), 0 4px 14px -2px rgba(91,156,246,0.40)"
                  : "none",
              cursor: phase === "idle" ? "pointer" : "default",
            }}
          >
            <Send
              className="h-3.5 w-3.5 transition-all duration-200"
              style={{
                color:
                  phase === "idle"
                    ? "rgba(255,255,255,0.96)"
                    : "rgba(255,255,255,0.18)",
              }}
            />
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}

// ─── Composition: layered foreground + background ─────────────────────────────
//
// Hierarchy principle (taken from the Linear reference): only the *background*
// panel reads as recessed. The foreground panel must look fully active —
// crisp, readable, with stronger borders and shadows than the surrounding
// surface. The background can be dimmed and gently blurred; the foreground
// must not.
//
// Layout principle: now that the section container is `max-w-[1320px]`
// (matching the hero dashboard), we let both panels be substantially larger
// instead of leaving empty horizontal space:
//   • background interview panel: 60% width, parked at the left, dimmed
//   • foreground copilot panel : 50% width, parked at the right, sharp
//   • the two overlap by ~10% of the container, which gives the
//     composition real depth without colliding the readable content of
//     either panel.
//
// Heights are bumped (foreground panel is 560px, composition `minHeight`
// is 580px) so the wider container does not feel under-filled vertically.

export function SalesIntelligenceComposition() {
  return (
    <div className="relative w-full overflow-hidden" style={{ minHeight: 580 }}>
      {/* Background interview panel — visibly recessed:
            • lower opacity (0.55) pushes it behind the foreground
            • slight blur (~1px) softens the type so the eye is not
              pulled into reading it
            • a desaturating filter takes the colour temperature down
              so the foreground panel reads as the warm/active surface
          The wrapper still uses `pointer-events-none` so the recessed
          panel never steals interaction from the foreground. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-3 hidden w-[60%] lg:block"
        style={{
          opacity: 0.55,
          filter: "blur(1px) saturate(0.85)",
          zIndex: 0,
        }}
      >
        <InterviewDetailBackground />
      </div>

      {/* A subtle dark wash over the background panel further pushes it
          into the depth plane. Sits between the background and the
          foreground in the z-stack so only the background gets dimmed. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 hidden w-[60%] lg:block"
        style={{
          background:
            "linear-gradient(90deg, rgba(6,13,28,0.32) 0%, rgba(6,13,28,0.55) 100%)",
          zIndex: 10,
        }}
      />

      {/* Foreground chat panel — wider than before (50%) and right-aligned
          at desktop. Sits visibly above the background plane via the
          stronger border + shadow defined inside <SalesIntelligencePanel>. */}
      <div className="relative z-20 lg:ml-auto lg:w-[50%]">
        <SalesIntelligencePanel />
      </div>

      {/* Bottom gradient — dissolves the composition into the section below */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-20"
        style={{
          background:
            "linear-gradient(to top, rgba(6,13,28,0.92) 0%, transparent 100%)",
        }}
      />
    </div>
  )
}
