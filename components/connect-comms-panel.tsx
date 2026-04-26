"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

// ─── Design tokens ────────────────────────────────────────────────────────────

const PANEL_BG     = "#070E1F"
const DIVIDER      = "rgba(147,147,147,0.09)"
const DIVIDER_MED  = "rgba(147,147,147,0.13)"
const ACCENT_BLUE  = "#5B9CF6"
const ACCENT_GREEN = "#4ADE80"
const ACCENT_AMBER = "#FBBF24"

// ─── Thread data ──────────────────────────────────────────────────────────────

interface Message {
  sender: string
  initials: string
  role: string
  time: string
  body: string
  tags?: string[]
  isOwn?: boolean
}

interface Thread {
  id: string
  subject: string
  account: string
  accountType: string
  status: "active" | "pending" | "resolved"
  lastActivity: string
  unread: boolean
  messages: Message[]
}

const THREADS: Thread[] = [
  {
    id: "t1",
    subject: "Pacific Corridor: regulatory timeline confirmation",
    account: "Manila Energy",
    accountType: "Company",
    status: "active",
    lastActivity: "2h ago",
    unread: true,
    messages: [
      {
        sender: "Adrian Santos",
        initials: "AS",
        role: "CEO · Manila Energy",
        time: "Tue 8 Apr, 09:14",
        body: "Following our conversation last week, I've confirmed with the Ministry that the approved vendor list will be finalised no later than 15 June. The window we discussed is real. I'd suggest we move the internal review forward.",
        tags: ["Chile Ministry", "Pacific Corridor", "Regulatory"],
      },
      {
        sender: "You",
        initials: "BC",
        role: "Account Lead",
        time: "Tue 8 Apr, 11:02",
        body: "Understood. I'll brief the team today and we can schedule the internal review for next week. One question: is the June 15 date firm, or is there still room for slippage on their side?",
        isOwn: true,
      },
      {
        sender: "Adrian Santos",
        initials: "AS",
        role: "CEO · Manila Energy",
        time: "Tue 8 Apr, 14:38",
        body: "Firm as of this morning. The Minister's office confirmed it in writing. I'll forward the note. Worth noting: Andes Power has been told the same date, and they're moving faster than we expected.",
        tags: ["Andes Power", "Competitive signal"],
      },
    ],
  },
  {
    id: "t2",
    subject: "Lagos Infrastructure: Q2 steering committee prep",
    account: "Lagos Infrastructure Fund",
    accountType: "Fund",
    status: "pending",
    lastActivity: "Yesterday",
    unread: true,
    messages: [
      {
        sender: "Amara Diallo",
        initials: "AD",
        role: "Committee Chair",
        time: "Mon 7 Apr, 16:22",
        body: "Before Thursday's session, I want to make sure the revised financing model is on the agenda. It was raised in January and never formally addressed. I'd like a number, not a range, this time.",
        tags: ["Financing model", "Steering committee"],
      },
      {
        sender: "You",
        initials: "BC",
        role: "Account Lead",
        time: "Mon 7 Apr, 17:45",
        body: "Noted. We'll have a specific figure ready for Thursday. I'll also circulate the updated stakeholder mapping before end of day Wednesday.",
        isOwn: true,
      },
    ],
  },
  {
    id: "t3",
    subject: "Frontier Group: Abuja corridor follow-up",
    account: "Frontier Group",
    accountType: "Company",
    status: "resolved",
    lastActivity: "3 days ago",
    unread: false,
    messages: [
      {
        sender: "Sarah Okonkwo",
        initials: "SO",
        role: "CFO · Frontier Group",
        time: "Fri 4 Apr, 10:08",
        body: "The Abuja corridor data you shared was exactly what we needed. The infrastructure gap analysis landed well with the investment committee. We're ready to move to the next stage. Can we schedule a call for next week?",
        tags: ["Abuja corridor", "Investment committee"],
      },
    ],
  },
]

// ─── Status badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: Thread["status"] }) {
  const config = {
    active:   { label: "Active",   bg: "rgba(74,222,128,0.07)",  border: "rgba(74,222,128,0.18)",  color: ACCENT_GREEN },
    pending:  { label: "Pending",  bg: "rgba(251,191,36,0.07)",  border: "rgba(251,191,36,0.18)",  color: ACCENT_AMBER },
    resolved: { label: "Resolved", bg: "rgba(147,147,147,0.07)", border: "rgba(147,147,147,0.16)", color: "rgba(255,255,255,0.38)" },
  }[status]

  return (
    <span
      className="rounded-full px-2 py-[2px] text-[8.5px] font-semibold uppercase tracking-[0.07em]"
      style={{ background: config.bg, border: `1px solid ${config.border}`, color: config.color }}
    >
      {config.label}
    </span>
  )
}

// ─── Thread list item ─────────────────────────────────────────────────────────

function ThreadItem({
  thread,
  isActive,
  onClick,
}: {
  thread: Thread
  isActive: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="w-full px-4 py-3 text-left transition-colors duration-150"
      style={{
        background: isActive ? "rgba(91,156,246,0.06)" : "transparent",
        borderBottom: `1px solid ${DIVIDER}`,
        borderLeft: isActive ? `2px solid ${ACCENT_BLUE}` : "2px solid transparent",
      }}
    >
      <div className="mb-1.5 flex items-start justify-between gap-2">
        <p
          className="text-[11.5px] font-medium leading-snug tracking-[-0.010em]"
          style={{ color: isActive ? "rgba(255,255,255,0.88)" : "rgba(255,255,255,0.62)" }}
        >
          {thread.subject}
        </p>
        {thread.unread && (
          <div
            className="mt-[3px] h-[6px] w-[6px] shrink-0 rounded-full"
            style={{ background: ACCENT_BLUE }}
          />
        )}
      </div>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <span
            className="rounded-full px-1.5 py-[2px] text-[8px] font-medium uppercase tracking-[0.06em]"
            style={{
              background: "rgba(91,156,246,0.07)",
              border: "1px solid rgba(91,156,246,0.14)",
              color: "rgba(91,156,246,0.72)",
            }}
          >
            {thread.accountType}
          </span>
          <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.32)" }}>
            {thread.account}
          </span>
        </div>
        <span className="shrink-0 text-[9.5px]" style={{ color: "rgba(255,255,255,0.22)" }}>
          {thread.lastActivity}
        </span>
      </div>
    </button>
  )
}

// ─── Message bubble ───────────────────────────────────────────────────────────

function MessageBubble({ msg }: { msg: Message }) {
  if (msg.isOwn) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[82%]">
          <div className="mb-1 flex items-center justify-end gap-2">
            <span className="text-[9.5px]" style={{ color: "rgba(255,255,255,0.28)" }}>
              {msg.time}
            </span>
            <span className="text-[10px] font-medium" style={{ color: "rgba(255,255,255,0.45)" }}>
              {msg.sender}
            </span>
          </div>
          <div
            className="rounded-[10px] rounded-tr-[3px] px-4 py-3"
            style={{
              background: "rgba(91,156,246,0.08)",
              border: "1px solid rgba(91,156,246,0.14)",
            }}
          >
            <p
              className="text-[12.5px] leading-[1.70] tracking-[-0.010em]"
              style={{ color: "rgba(255,255,255,0.70)" }}
            >
              {msg.body}
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-start gap-3">
      <div
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[9px] font-semibold"
        style={{
          background: "rgba(147,147,147,0.08)",
          border: "1px solid rgba(147,147,147,0.14)",
          color: "rgba(255,255,255,0.55)",
        }}
      >
        {msg.initials}
      </div>
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-center gap-2">
          <span className="text-[10.5px] font-semibold" style={{ color: "rgba(255,255,255,0.72)" }}>
            {msg.sender}
          </span>
          <span className="text-[9.5px]" style={{ color: "rgba(255,255,255,0.28)" }}>
            {msg.role}
          </span>
          <span className="ml-auto text-[9.5px]" style={{ color: "rgba(255,255,255,0.22)" }}>
            {msg.time}
          </span>
        </div>
        <div
          className="rounded-[10px] rounded-tl-[3px] px-4 py-3"
          style={{
            background: "rgba(255,255,255,0.028)",
            border: `1px solid ${DIVIDER_MED}`,
          }}
        >
          <p
            className="text-[12.5px] leading-[1.70] tracking-[-0.010em]"
            style={{ color: "rgba(255,255,255,0.62)" }}
          >
            {msg.body}
          </p>
          {msg.tags && msg.tags.length > 0 && (
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {msg.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full px-2 py-[2px] text-[9px]"
                  style={{
                    background: "rgba(91,156,246,0.05)",
                    border: "1px solid rgba(91,156,246,0.12)",
                    color: "rgba(91,156,246,0.65)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export function ConnectCommsPanel() {
  const [activeId, setActiveId] = useState<string>("t1")
  const activeThread = THREADS.find((t) => t.id === activeId)!

  return (
    <div
      className="flex w-full overflow-hidden rounded-[17px]"
      style={{
        background: PANEL_BG,
        border: "1px solid rgba(147,147,147,0.16)",
        boxShadow:
          "0 0 0 1px rgba(255,255,255,0.025), 0 40px 100px -20px rgba(0,0,0,0.80), 0 8px 24px -6px rgba(0,0,0,0.55)",
        minHeight: 520,
      }}
    >
      {/* ── Left: thread list ── */}
      <div
        className="flex w-[38%] shrink-0 flex-col"
        style={{ borderRight: `1px solid ${DIVIDER_MED}` }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-4 py-[11px]"
          style={{
            background: "linear-gradient(to bottom, #0D1B32, #0B1729)",
            borderBottom: `1px solid ${DIVIDER_MED}`,
          }}
        >
          <div className="flex items-center gap-3">
            <div className="flex gap-[5px]">
              {(["rgba(255,95,86,0.42)", "rgba(255,189,68,0.42)", "rgba(40,200,64,0.42)"] as const).map(
                (c, i) => <div key={i} className="h-[9px] w-[9px] rounded-full" style={{ background: c }} />,
              )}
            </div>
            <span
              className="text-[10.5px] font-medium uppercase tracking-[0.07em]"
              style={{ color: "rgba(255,255,255,0.28)" }}
            >
              Aksum · Communications
            </span>
          </div>
        </div>

        {/* Search bar */}
        <div className="px-3 py-2.5" style={{ borderBottom: `1px solid ${DIVIDER}` }}>
          <div
            className="flex items-center gap-2 rounded-lg px-3 py-1.5"
            style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${DIVIDER}` }}
          >
            <svg className="h-3 w-3 shrink-0" fill="none" viewBox="0 0 16 16" style={{ color: "rgba(255,255,255,0.22)" }}>
              <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M10.5 10.5L13 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.22)" }}>
              Search threads…
            </span>
          </div>
        </div>

        {/* Filter row */}
        <div className="flex items-center gap-1.5 px-3 py-2" style={{ borderBottom: `1px solid ${DIVIDER}` }}>
          {["All", "Active", "Pending"].map((f, i) => (
            <button
              key={f}
              className="rounded-full px-2.5 py-[3px] text-[9.5px] font-medium transition-colors duration-150"
              style={{
                background: i === 0 ? "rgba(255,255,255,0.08)" : "transparent",
                border: i === 0 ? "1px solid rgba(255,255,255,0.14)" : "1px solid transparent",
                color: i === 0 ? "rgba(255,255,255,0.72)" : "rgba(255,255,255,0.32)",
              }}
            >
              {f}
            </button>
          ))}
          <span className="ml-auto text-[9px]" style={{ color: "rgba(255,255,255,0.22)" }}>
            3 threads
          </span>
        </div>

        {/* Thread list */}
        <div className="flex-1 overflow-y-auto">
          {THREADS.map((thread) => (
            <ThreadItem
              key={thread.id}
              thread={thread}
              isActive={activeId === thread.id}
              onClick={() => setActiveId(thread.id)}
            />
          ))}
        </div>
      </div>

      {/* ── Right: thread detail ── */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Thread header */}
        <div
          className="shrink-0 px-5 py-3.5"
          style={{
            background: "linear-gradient(to bottom, #0D1B32, #0B1729)",
            borderBottom: `1px solid ${DIVIDER_MED}`,
          }}
        >
          <div className="mb-1.5 flex items-start justify-between gap-3">
            <p className="text-[13px] font-semibold leading-snug tracking-[-0.012em] text-white">
              {activeThread.subject}
            </p>
            <StatusBadge status={activeThread.status} />
          </div>
          <div className="flex items-center gap-3">
            <span
              className="rounded-full px-2 py-[2px] text-[8.5px] font-medium uppercase tracking-[0.06em]"
              style={{
                background: "rgba(91,156,246,0.07)",
                border: "1px solid rgba(91,156,246,0.14)",
                color: "rgba(91,156,246,0.72)",
              }}
            >
              {activeThread.accountType}
            </span>
            <span className="text-[10.5px]" style={{ color: "rgba(255,255,255,0.40)" }}>
              {activeThread.account}
            </span>
            <span className="text-[9.5px]" style={{ color: "rgba(255,255,255,0.22)" }}>
              · {activeThread.messages.length} messages
            </span>
          </div>
        </div>

        {/* Messages */}
        <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-5 pb-4 pt-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.20 }}
              className="flex flex-col gap-4"
            >
              {activeThread.messages.map((msg, i) => (
                <MessageBubble key={i} msg={msg} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Context strip — shows what Aksum knows about this thread */}
        <div
          className="shrink-0 px-5 py-3"
          style={{ borderTop: `1px solid ${DIVIDER}` }}
        >
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[9.5px] font-medium uppercase tracking-[0.09em]" style={{ color: "rgba(255,255,255,0.22)" }}>
              Context
            </span>
            {activeThread.messages
              .flatMap((m) => m.tags ?? [])
              .filter((v, i, a) => a.indexOf(v) === i)
              .slice(0, 5)
              .map((tag) => (
                <span
                  key={tag}
                  className="rounded-full px-2 py-[2px] text-[9px]"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(147,147,147,0.12)",
                    color: "rgba(255,255,255,0.38)",
                  }}
                >
                  {tag}
                </span>
              ))}
            <span className="ml-auto text-[9px]" style={{ color: "rgba(255,255,255,0.18)" }}>
              Linked to account memory
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
