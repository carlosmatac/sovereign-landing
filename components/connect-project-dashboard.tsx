"use client"

import { useState } from "react"

// ─── Design tokens ────────────────────────────────────────────────────────────

const PANEL_BG     = "#070E1F"
const SURFACE      = "#080F1E"
const DIVIDER      = "rgba(147,147,147,0.09)"
const DIVIDER_MED  = "rgba(147,147,147,0.13)"
const ACCENT_BLUE  = "#5B9CF6"
const ACCENT_GREEN = "#4ADE80"
const ACCENT_AMBER = "#FBBF24"
const ACCENT_RED   = "#F87171"
const TEXT_PRIMARY = "rgba(255,255,255,0.88)"
const TEXT_MID     = "rgba(255,255,255,0.52)"
const TEXT_DIM     = "rgba(255,255,255,0.28)"
const TEXT_GHOST   = "rgba(255,255,255,0.18)"

// ─── Data ─────────────────────────────────────────────────────────────────────

const DEALS = [
  { name: "Sonangol — Annual Report",     value: "$48,000",  stage: "Closed",     stageColor: ACCENT_GREEN },
  { name: "Ministry of Finance — Brief",  value: "$22,500",  stage: "Invoiced",   stageColor: ACCENT_AMBER },
  { name: "Cabinda Energy — Sector Pack", value: "$31,000",  stage: "In Review",  stageColor: ACCENT_BLUE  },
  { name: "Angola LNG — Strategy Note",   value: "$18,000",  stage: "Drafting",   stageColor: "rgba(147,147,147,0.55)" },
  { name: "MINPET — Regulatory Brief",    value: "$14,500",  stage: "Pending",    stageColor: ACCENT_AMBER },
]

const TEAM = [
  { initials: "BC", name: "B. Carles",    role: "Owner",       color: ACCENT_BLUE  },
  { initials: "MR", name: "M. Rojas",     role: "Lead Writer", color: "#34D399"    },
  { initials: "DK", name: "D. Kowalski",  role: "Researcher",  color: "#A78BFA"    },
  { initials: "LO", name: "L. Ortega",    role: "Analyst",     color: "#FBBF24"    },
]

const SOURCES = [
  { type: "Interviews",  count: 12, color: ACCENT_BLUE  },
  { type: "Emails",      count: 34, color: "#34D399"    },
  { type: "Reports",     count: 8,  color: "#A78BFA"    },
  { type: "Meetings",    count: 19, color: ACCENT_AMBER },
  { type: "Notes",       count: 27, color: "rgba(147,147,147,0.55)" },
]

const ACTIVITY = [
  { time: "Today, 09:14",   text: "Adrian Santos email linked to account context",    type: "email"    },
  { time: "Today, 08:30",   text: "Steering committee notes uploaded and processed",  type: "meeting"  },
  { time: "Yesterday",      text: "Cabinda Energy draft reviewed and approved",        type: "deal"     },
  { time: "Mon 7 Apr",      text: "Ministry of Finance invoice sent — $22,500",        type: "invoice"  },
  { time: "Fri 4 Apr",      text: "Sonangol Annual Report delivered and closed",       type: "closed"   },
]

const ACTIVITY_COLORS: Record<string, string> = {
  email:   ACCENT_BLUE,
  meeting: "#A78BFA",
  deal:    "#34D399",
  invoice: ACCENT_AMBER,
  closed:  ACCENT_GREEN,
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function KpiCard({
  label,
  value,
  sub,
  accent,
}: {
  label: string
  value: string
  sub?: string
  accent?: string
}) {
  return (
    <div
      className="flex flex-col gap-1 rounded-xl p-4"
      style={{ background: SURFACE, border: `1px solid ${DIVIDER_MED}` }}
    >
      <p className="text-[9.5px] font-semibold uppercase tracking-[0.09em]" style={{ color: TEXT_DIM }}>
        {label}
      </p>
      <p
        className="text-[22px] font-semibold tabular-nums leading-none tracking-[-0.020em]"
        style={{ color: accent ?? TEXT_PRIMARY }}
      >
        {value}
      </p>
      {sub && (
        <p className="text-[9.5px]" style={{ color: TEXT_GHOST }}>
          {sub}
        </p>
      )}
    </div>
  )
}

function ProgressBar({
  value,
  max,
  color,
}: {
  value: number
  max: number
  color: string
}) {
  const pct = Math.min((value / max) * 100, 100)
  return (
    <div className="h-[5px] w-full overflow-hidden rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{ width: `${pct}%`, background: color }}
      />
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export function ConnectProjectDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "deals" | "sources">("overview")

  return (
    <div
      className="w-full overflow-hidden rounded-[17px]"
      style={{
        background: PANEL_BG,
        border: "1px solid rgba(147,147,147,0.16)",
        boxShadow:
          "0 0 0 1px rgba(255,255,255,0.025), 0 40px 100px -20px rgba(0,0,0,0.80), 0 8px 24px -6px rgba(0,0,0,0.55)",
      }}
    >
      {/* ── Window chrome ── */}
      <div
        className="flex items-center justify-between px-5 py-[11px]"
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
            Sovereign · Projects
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[9.5px]" style={{ color: TEXT_GHOST }}>
            Angola 2025
          </span>
          <div
            className="flex items-center gap-1.5 rounded-full px-2 py-[3px]"
            style={{ background: "rgba(74,222,128,0.07)", border: "1px solid rgba(74,222,128,0.17)" }}
          >
            <div className="h-[5px] w-[5px] rounded-full bg-[#4ADE80]" />
            <span className="text-[8.5px] font-semibold uppercase tracking-[0.09em] text-[#4ADE80]">
              Active
            </span>
          </div>
        </div>
      </div>

      {/* ── Project identity bar ── */}
      <div
        className="flex flex-wrap items-center justify-between gap-4 px-5 py-4"
        style={{ borderBottom: `1px solid ${DIVIDER_MED}` }}
      >
        <div>
          <div className="mb-1 flex items-center gap-2.5">
            <h3 className="text-[18px] font-semibold leading-none tracking-[-0.018em] text-white">
              Angola 2025
            </h3>
            <span
              className="rounded-full px-2 py-[2px] text-[8.5px] font-semibold uppercase tracking-[0.07em]"
              style={{
                background: "rgba(91,156,246,0.08)",
                border: "1px solid rgba(91,156,246,0.18)",
                color: ACCENT_BLUE,
              }}
            >
              West Africa
            </span>
          </div>
          <p className="text-[11px]" style={{ color: TEXT_DIM }}>
            Energy &amp; Infrastructure · Luanda · Owner: B. Carles
          </p>
        </div>
        <div className="flex items-center gap-3">
          {TEAM.map(({ initials, name, color }) => (
            <div key={initials} className="flex flex-col items-center gap-1">
              <div
                className="flex h-7 w-7 items-center justify-center rounded-full text-[9px] font-semibold"
                style={{
                  background: `${color}18`,
                  border: `1px solid ${color}38`,
                  color,
                }}
              >
                {initials}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Tab strip ── */}
      <div
        className="flex items-center gap-0.5 px-4 py-2"
        style={{ borderBottom: `1px solid ${DIVIDER}` }}
      >
        {(["overview", "deals", "sources"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="rounded-[6px] px-3 py-[5px] text-[11px] font-medium capitalize tracking-[-0.010em] transition-all duration-150"
            style={{
              background: activeTab === tab ? "rgba(255,255,255,0.08)" : "transparent",
              color: activeTab === tab ? "rgba(255,255,255,0.88)" : "rgba(255,255,255,0.35)",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ── Tab content ── */}
      {activeTab === "overview" && (
        <div className="p-5">
          {/* KPI row */}
          <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <KpiCard label="Revenue Target"  value="$280k"  sub="Full year 2025"        />
            <KpiCard label="Achieved"        value="$134k"  sub="48% of target"  accent={ACCENT_GREEN} />
            <KpiCard label="Closed Deals"    value="3"      sub="of 8 active"           />
            <KpiCard label="Outstanding"     value="$22.5k" sub="1 invoice pending" accent={ACCENT_AMBER} />
          </div>

          {/* Revenue progress */}
          <div
            className="mb-5 rounded-xl p-4"
            style={{ background: SURFACE, border: `1px solid ${DIVIDER_MED}` }}
          >
            <div className="mb-3 flex items-center justify-between">
              <p className="text-[10px] font-semibold uppercase tracking-[0.09em]" style={{ color: TEXT_DIM }}>
                Revenue Progress
              </p>
              <p className="text-[11px] font-semibold tabular-nums" style={{ color: ACCENT_GREEN }}>
                $134,000 / $280,000
              </p>
            </div>
            <ProgressBar value={134} max={280} color={ACCENT_GREEN} />
            <div className="mt-2 flex justify-between">
              <span className="text-[9px]" style={{ color: TEXT_GHOST }}>Collected: $111,500</span>
              <span className="text-[9px]" style={{ color: TEXT_GHOST }}>Pending: $22,500</span>
            </div>
          </div>

          {/* Two-column: recent deals + activity */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1fr]">
            {/* Recent deals */}
            <div
              className="rounded-xl overflow-hidden"
              style={{ background: SURFACE, border: `1px solid ${DIVIDER_MED}` }}
            >
              <div className="px-4 py-3" style={{ borderBottom: `1px solid ${DIVIDER}` }}>
                <p className="text-[10px] font-semibold uppercase tracking-[0.09em]" style={{ color: TEXT_DIM }}>
                  Recent Deals
                </p>
              </div>
              <div className="divide-y" style={{ borderColor: DIVIDER }}>
                {DEALS.slice(0, 4).map(({ name, value, stage, stageColor }) => (
                  <div key={name} className="flex items-center justify-between px-4 py-2.5">
                    <div className="min-w-0 flex-1 pr-3">
                      <p className="truncate text-[11px] font-medium" style={{ color: TEXT_PRIMARY }}>
                        {name}
                      </p>
                      <p className="text-[9.5px] tabular-nums" style={{ color: TEXT_GHOST }}>
                        {value}
                      </p>
                    </div>
                    <span
                      className="shrink-0 rounded-full px-2 py-[2px] text-[8.5px] font-semibold"
                      style={{
                        background: `${stageColor}14`,
                        border: `1px solid ${stageColor}30`,
                        color: stageColor,
                      }}
                    >
                      {stage}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity feed */}
            <div
              className="rounded-xl overflow-hidden"
              style={{ background: SURFACE, border: `1px solid ${DIVIDER_MED}` }}
            >
              <div className="px-4 py-3" style={{ borderBottom: `1px solid ${DIVIDER}` }}>
                <p className="text-[10px] font-semibold uppercase tracking-[0.09em]" style={{ color: TEXT_DIM }}>
                  Recent Activity
                </p>
              </div>
              <div className="divide-y" style={{ borderColor: DIVIDER }}>
                {ACTIVITY.map(({ time, text, type }) => (
                  <div key={time} className="flex items-start gap-3 px-4 py-2.5">
                    <div
                      className="mt-[3px] h-[6px] w-[6px] shrink-0 rounded-full"
                      style={{ background: ACTIVITY_COLORS[type] }}
                    />
                    <div>
                      <p className="text-[11px] leading-snug" style={{ color: TEXT_MID }}>
                        {text}
                      </p>
                      <p className="mt-0.5 text-[9.5px]" style={{ color: TEXT_GHOST }}>
                        {time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Team strip */}
          <div
            className="mt-4 rounded-xl p-4"
            style={{ background: SURFACE, border: `1px solid ${DIVIDER_MED}` }}
          >
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.09em]" style={{ color: TEXT_DIM }}>
              Team
            </p>
            <div className="flex flex-wrap gap-3">
              {TEAM.map(({ initials, name, role, color }) => (
                <div key={initials} className="flex items-center gap-2">
                  <div
                    className="flex h-6 w-6 items-center justify-center rounded-full text-[8.5px] font-semibold"
                    style={{ background: `${color}18`, border: `1px solid ${color}38`, color }}
                  >
                    {initials}
                  </div>
                  <div>
                    <p className="text-[10.5px] font-medium leading-none" style={{ color: TEXT_PRIMARY }}>
                      {name}
                    </p>
                    <p className="text-[9px]" style={{ color: TEXT_GHOST }}>
                      {role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "deals" && (
        <div className="p-5">
          <div
            className="overflow-hidden rounded-xl"
            style={{ background: SURFACE, border: `1px solid ${DIVIDER_MED}` }}
          >
            <div
              className="grid grid-cols-[1fr_auto_auto] gap-4 px-4 py-2.5"
              style={{ borderBottom: `1px solid ${DIVIDER}` }}
            >
              {["Deal", "Value", "Stage"].map((h) => (
                <p key={h} className="text-[9px] font-semibold uppercase tracking-[0.09em]" style={{ color: TEXT_GHOST }}>
                  {h}
                </p>
              ))}
            </div>
            {DEALS.map(({ name, value, stage, stageColor }) => (
              <div
                key={name}
                className="grid grid-cols-[1fr_auto_auto] items-center gap-4 px-4 py-3"
                style={{ borderBottom: `1px solid ${DIVIDER}` }}
              >
                <p className="text-[12px] font-medium" style={{ color: TEXT_PRIMARY }}>
                  {name}
                </p>
                <p className="text-[11.5px] tabular-nums font-semibold" style={{ color: TEXT_MID }}>
                  {value}
                </p>
                <span
                  className="rounded-full px-2.5 py-[3px] text-[9px] font-semibold"
                  style={{
                    background: `${stageColor}14`,
                    border: `1px solid ${stageColor}30`,
                    color: stageColor,
                  }}
                >
                  {stage}
                </span>
              </div>
            ))}
            {/* Total row */}
            <div
              className="flex items-center justify-between px-4 py-3"
              style={{ background: "rgba(255,255,255,0.02)" }}
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.09em]" style={{ color: TEXT_DIM }}>
                Total Pipeline
              </p>
              <p className="text-[14px] font-semibold tabular-nums" style={{ color: TEXT_PRIMARY }}>
                $134,000
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === "sources" && (
        <div className="p-5">
          <div className="mb-4">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.09em]" style={{ color: TEXT_DIM }}>
              Information sources feeding this project
            </p>
            <div className="space-y-2.5">
              {SOURCES.map(({ type, count, color }) => (
                <div key={type}>
                  <div className="mb-1 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-[5px] w-[5px] rounded-full" style={{ background: color }} />
                      <span className="text-[11px] font-medium" style={{ color: TEXT_PRIMARY }}>
                        {type}
                      </span>
                    </div>
                    <span className="text-[11px] tabular-nums font-semibold" style={{ color: TEXT_MID }}>
                      {count}
                    </span>
                  </div>
                  <ProgressBar value={count} max={40} color={color} />
                </div>
              ))}
            </div>
          </div>

          <div
            className="rounded-xl p-4"
            style={{ background: SURFACE, border: `1px solid ${DIVIDER_MED}` }}
          >
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.09em]" style={{ color: TEXT_DIM }}>
              Recent sources added
            </p>
            <div className="space-y-2">
              {[
                { label: "Steering committee notes · 8 Apr 2026",   type: "Meeting",   color: "#A78BFA" },
                { label: "Adrian Santos email thread · 8 Apr 2026", type: "Email",     color: "#34D399" },
                { label: "Sonangol Annual Report brief · 4 Apr",    type: "Report",    color: ACCENT_BLUE },
                { label: "Luanda field notes · 2 Apr 2026",         type: "Notes",     color: "rgba(147,147,147,0.55)" },
                { label: "MINPET regulatory interview · 28 Mar",    type: "Interview", color: ACCENT_BLUE },
              ].map(({ label, type, color }) => (
                <div key={label} className="flex items-center gap-2.5">
                  <span
                    className="shrink-0 rounded-full px-1.5 py-[1px] text-[8px] font-semibold uppercase tracking-[0.06em]"
                    style={{ background: `${color}14`, border: `1px solid ${color}28`, color }}
                  >
                    {type}
                  </span>
                  <span className="text-[10.5px]" style={{ color: TEXT_MID }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
