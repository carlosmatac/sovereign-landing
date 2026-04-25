"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronRight } from "lucide-react"

// ─── Types ────────────────────────────────────────────────────────────────────

type SectionId = "sales-intel" | "commercial-prep" | "account-context" | "relationship" | "meeting-prep"

interface ConversationSection {
  id: SectionId
  label: string
  exchanges: Exchange[]
}

interface Exchange {
  user: string
  response: ResponseBlock[]
}

interface ResponseBlock {
  type: "text" | "insight" | "signal" | "warning" | "source-ref"
  content: string
  index?: string
  sources?: string[]
}

// ─── Conversation data ────────────────────────────────────────────────────────

const SECTIONS: ConversationSection[] = [
  {
    id: "sales-intel",
    label: "Sales Intelligence",
    exchanges: [
      {
        user: "What do we know about Meridian Capital's position on infrastructure debt?",
        response: [
          {
            type: "insight",
            index: "01",
            content:
              "Meridian's head of infrastructure, David Lowe, stated in your March 2025 interview that they were actively reducing exposure to greenfield risk — specifically in markets without a functioning regulatory anchor. That conversation is stored in the Lagos Infrastructure brief.",
            sources: ["Lagos Infrastructure brief · Mar 2025", "David Lowe interview · 48m"],
          },
          {
            type: "insight",
            index: "02",
            content:
              "In a follow-up email thread from April 2025, Lowe's associate referenced a 'revised mandate' that would allow brownfield re-entry in West Africa under specific conditions. That thread was never formally actioned in your CRM. The signal is live.",
            sources: ["Email thread · Apr 2025 · 3 messages"],
          },
          {
            type: "signal",
            content:
              "Two other internal documents reference Meridian in the context of the Nigeria corridor — both from Q4 2024. The framing in both is consistent: they are watching, not moving. That may have changed.",
          },
        ],
      },
    ],
  },
  {
    id: "commercial-prep",
    label: "Commercial Preparation",
    exchanges: [
      {
        user: "We have a call with Frontier Group next Thursday. What should we not repeat?",
        response: [
          {
            type: "warning",
            content:
              "The Q2 2024 debrief notes that Frontier's CFO, Sarah Okonkwo, explicitly said the regional market entry framing 'felt generic' and that they had heard the same pitch from two other firms that quarter. That framing should not reappear.",
            sources: ["Q2 2024 debrief · internal brief"],
          },
          {
            type: "insight",
            index: "01",
            content:
              "What worked in the September 2024 conversation was the specificity around the Abuja corridor — Okonkwo responded directly to the infrastructure gap data from the Nigeria brief. That was the moment the conversation shifted.",
            sources: ["Sep 2024 meeting notes · 22 min"],
          },
          {
            type: "insight",
            index: "02",
            content:
              "There is an unresolved thread from November 2024 where Frontier asked for a comparison of two regulatory frameworks. That request was acknowledged but never answered. Arriving with that analysis would close an open loop they remember.",
            sources: ["Nov 2024 follow-up · email chain · 5 messages"],
          },
        ],
      },
    ],
  },
  {
    id: "account-context",
    label: "Account Context",
    exchanges: [
      {
        user: "Give me the full picture on the Manila Energy account before I brief the team.",
        response: [
          {
            type: "text",
            content:
              "Manila Energy appears across 14 internal sources spanning 18 months. The account has never been formally opened — but the intelligence density is unusually high for a prospect at this stage.",
          },
          {
            type: "insight",
            index: "01",
            content:
              "The CEO, Adrian Santos, has been recorded in three separate conversations. Across all three, the same themes recur: South America as an active expansion corridor, Chile and Colombia as priority entry points, and a stated requirement for a trusted local anchor before committing capital.",
            sources: ["Feb 2026 interview · 48m", "Q3 2025 CEO conversation", "Panama debrief · Oct 2025"],
          },
          {
            type: "insight",
            index: "02",
            content:
              "The Q3 Colombia brief references Manila Energy in the context of a competitor approach — another firm made contact in August 2025. Santos's response, as recorded in your notes, was non-committal but not dismissive. The window is still open.",
            sources: ["Q3 Colombia brief · internal", "Aug 2025 competitor note"],
          },
          {
            type: "insight",
            index: "03",
            content:
              "Four unanswered follow-up emails from your team between September and December 2025. Each referenced market entry sequencing and local introductions. Manila Energy never formally closed the door — the conversation stalled on your side.",
            sources: ["Follow-up thread · Sep–Dec 2025 · 4 messages"],
          },
        ],
      },
    ],
  },
  {
    id: "relationship",
    label: "Relationship Context",
    exchanges: [
      {
        user: "How does Carlos Vega connect to the Andes Power account?",
        response: [
          {
            type: "insight",
            index: "01",
            content:
              "Carlos Vega appears in the Andes Power account as a former board observer — referenced in the 2024 annual strategy brief. He is not currently listed as an active contact, but the relationship predates the current leadership team.",
            sources: ["Andes Power strategy brief · 2024", "Entity record · Carlos Vega"],
          },
          {
            type: "insight",
            index: "02",
            content:
              "Vega also appears in the Chile Ministry of Energy context — specifically in a 2023 regulatory consultation document stored in the Santiago corridor project. That connection is not visible in your CRM. It is only surfaced here because both sources are in the same workspace.",
            sources: ["Santiago corridor project · 2023", "Chile Ministry consultation doc"],
          },
          {
            type: "signal",
            content:
              "The overlap between Vega, Andes Power, and the Chile Ministry creates a triangulation point that has commercial relevance for the Manila Energy approach. Santos named Andes Power as a company he was 'monitoring closely' — and Vega is the bridge.",
          },
        ],
      },
    ],
  },
  {
    id: "meeting-prep",
    label: "Meeting Preparation",
    exchanges: [
      {
        user: "Prepare me for the Lagos Infrastructure steering committee tomorrow.",
        response: [
          {
            type: "insight",
            index: "01",
            content:
              "The last steering committee, in January 2026, ended with three open items: the revised financing model, the regulatory timeline for Phase 2, and a request for updated stakeholder mapping. None of those items appear in any document created since January. They will likely be raised again.",
            sources: ["Jan 2026 steering committee notes · 1h 14m"],
          },
          {
            type: "insight",
            index: "02",
            content:
              "Amara Diallo, the committee chair, has been consistent across four recorded interactions: she responds to specificity and pushes back on anything that feels like a holding position. The November 2025 session notes record her saying 'I need a number, not a range' in response to the financing discussion.",
            sources: ["Nov 2025 session · Amara Diallo", "Four recorded interactions"],
          },
          {
            type: "insight",
            index: "03",
            content:
              "The NNPC representative on the committee, Emeka Osei, has not spoken in the last two sessions. His silence follows a pattern visible in the Q4 2025 project brief — there is a noted tension between his position and the committee's current direction. Worth monitoring.",
            sources: ["Q4 2025 project brief · internal", "Session attendance records"],
          },
          {
            type: "signal",
            content:
              "One external document in your workspace — a Reuters piece from March 2026 — references a policy shift that directly affects Phase 2 of the Lagos Infrastructure plan. It has not been discussed in any internal document. You may be the only person in the room who has seen it.",
          },
        ],
      },
    ],
  },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function UserBubble({ text }: { text: string }) {
  return (
    <div className="flex justify-end">
      <div
        className="max-w-[88%] rounded-[10px] rounded-tr-[3px] px-4 py-3"
        style={{
          background: "rgba(91,156,246,0.08)",
          border: "1px solid rgba(91,156,246,0.14)",
        }}
      >
        <p
          className="text-[13px] leading-snug tracking-[-0.011em]"
          style={{ color: "rgba(255,255,255,0.75)" }}
        >
          {text}
        </p>
      </div>
    </div>
  )
}

function SourceRef({ sources }: { sources: string[] }) {
  return (
    <div className="mt-2.5 flex flex-wrap gap-1.5">
      {sources.map((s) => (
        <span
          key={s}
          className="rounded-full px-2 py-[3px] text-[10px] tracking-[-0.005em]"
          style={{
            background: "rgba(91,156,246,0.06)",
            border: "1px solid rgba(91,156,246,0.14)",
            color: "rgba(91,156,246,0.72)",
          }}
        >
          {s}
        </span>
      ))}
    </div>
  )
}

function ResponseCard({ block, delay }: { block: ResponseBlock; delay: number }) {
  if (block.type === "text") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.38, delay, ease: [0.25, 0.1, 0.25, 1] }}
        className="flex items-start gap-2.5"
      >
        <div
          className="mt-[5px] h-[16px] w-[16px] shrink-0 rounded-full flex items-center justify-center"
          style={{
            background: "rgba(147,147,147,0.055)",
            border: "1px solid rgba(147,147,147,0.11)",
          }}
        >
          <div className="h-[4px] w-[4px] rounded-full" style={{ background: "rgba(255,255,255,0.22)" }} />
        </div>
        <p className="text-[12px] leading-[1.70] tracking-[-0.005em] text-[#4a5060]">{block.content}</p>
      </motion.div>
    )
  }

  if (block.type === "signal") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.38, delay, ease: [0.25, 0.1, 0.25, 1] }}
        className="rounded-[8px] px-4 py-3"
        style={{
          background: "rgba(251,191,36,0.04)",
          border: "1px solid rgba(251,191,36,0.12)",
        }}
      >
        <div className="flex items-start gap-2.5">
          <div
            className="mt-[4px] h-[5px] w-[5px] shrink-0 rounded-full"
            style={{ background: "#FBBF24" }}
          />
          <p className="text-[12px] leading-[1.68] tracking-[-0.005em]" style={{ color: "rgba(251,191,36,0.72)" }}>
            {block.content}
          </p>
        </div>
      </motion.div>
    )
  }

  if (block.type === "warning") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.38, delay, ease: [0.25, 0.1, 0.25, 1] }}
        className="rounded-[8px] px-4 py-3"
        style={{
          background: "rgba(239,68,68,0.04)",
          border: "1px solid rgba(239,68,68,0.12)",
        }}
      >
        <div className="flex items-start gap-2.5">
          <div
            className="mt-[4px] h-[5px] w-[5px] shrink-0 rounded-full"
            style={{ background: "rgba(239,68,68,0.72)" }}
          />
          <p className="text-[12px] leading-[1.68] tracking-[-0.005em]" style={{ color: "rgba(239,68,68,0.65)" }}>
            {block.content}
          </p>
        </div>
      </motion.div>
    )
  }

  // insight
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className="rounded-[8px] px-4 py-3.5"
      style={{
        background: "rgba(255,255,255,0.022)",
        border: "1px solid rgba(147,147,147,0.10)",
      }}
    >
      <div className="flex items-start gap-3">
        {block.index && (
          <span
            className="mt-0.5 shrink-0 text-[9px] font-semibold tabular-nums tracking-[0.04em]"
            style={{ color: "rgba(255,255,255,0.17)" }}
          >
            {block.index}
          </span>
        )}
        <div className="min-w-0">
          <p className="text-[12px] leading-[1.68] tracking-[-0.005em] text-[#757575]">
            {block.content}
          </p>
          {block.sources && <SourceRef sources={block.sources} />}
        </div>
      </div>
    </motion.div>
  )
}

function SectionTab({
  section,
  isActive,
  onClick,
}: {
  section: ConversationSection
  isActive: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="shrink-0 rounded-full px-3 py-1.5 text-[11px] font-medium tracking-[-0.008em] transition-all duration-150"
      style={{
        background: isActive ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.03)",
        border: isActive ? "1px solid rgba(255,255,255,0.18)" : "1px solid rgba(147,147,147,0.12)",
        color: isActive ? "rgba(255,255,255,0.88)" : "rgba(255,255,255,0.38)",
      }}
    >
      {section.label}
    </button>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export function PrepareSellCopilot() {
  const [activeSectionId, setActiveSectionId] = useState<SectionId>("sales-intel")
  const [visibleExchanges, setVisibleExchanges] = useState<Record<SectionId, number>>({
    "sales-intel": 1,
    "commercial-prep": 1,
    "account-context": 1,
    "relationship": 1,
    "meeting-prep": 1,
  })
  const scrollRef = useRef<HTMLDivElement>(null)

  const activeSection = SECTIONS.find((s) => s.id === activeSectionId)!
  const currentVisible = visibleExchanges[activeSectionId]

  const handleSectionChange = (id: SectionId) => {
    setActiveSectionId(id)
    setTimeout(() => {
      scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" })
    }, 50)
  }

  return (
    <div
      className="flex w-full flex-col overflow-hidden rounded-[17px]"
      style={{
        background: "#070E1F",
        border: "1px solid rgba(147,147,147,0.16)",
        boxShadow:
          "0 0 0 1px rgba(255,255,255,0.025), 0 40px 100px -20px rgba(0,0,0,0.80), 0 8px 24px -6px rgba(0,0,0,0.55)",
        minHeight: 580,
      }}
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
            Aksum · Copilot
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] tracking-[-0.005em]" style={{ color: "rgba(255,255,255,0.22)" }}>
            Searching across internal memory
          </span>
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
      </div>

      {/* Section tabs */}
      <div
        className="flex shrink-0 items-center gap-2 overflow-x-auto px-5 py-3 scrollbar-none"
        style={{ borderBottom: "1px solid rgba(147,147,147,0.08)" }}
      >
        {SECTIONS.map((section) => (
          <SectionTab
            key={section.id}
            section={section}
            isActive={activeSectionId === section.id}
            onClick={() => handleSectionChange(section.id)}
          />
        ))}
      </div>

      {/* Conversation area */}
      <div
        ref={scrollRef}
        className="flex flex-1 flex-col gap-4 overflow-y-auto px-5 pb-4 pt-5"
        style={{ minHeight: 0 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSectionId}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.22 }}
            className="flex flex-col gap-4"
          >
            {activeSection.exchanges.slice(0, currentVisible).map((exchange, ei) => (
              <div key={ei} className="flex flex-col gap-3">
                <UserBubble text={exchange.user} />
                {exchange.response.map((block, bi) => (
                  <ResponseCard key={bi} block={block} delay={bi * 0.12} />
                ))}
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Context footer */}
      <div
        className="shrink-0 px-5 py-3"
        style={{ borderTop: "1px solid rgba(147,147,147,0.08)" }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {[
              { label: "Sources", value: "47" },
              { label: "Entities", value: "112" },
              { label: "Connections", value: "284" },
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
            Reasoning over internal context only
          </span>
        </div>
      </div>
    </div>
  )
}
