import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { ConnectCommsPanel } from "@/components/connect-comms-panel"
import { ConnectProjectDashboard } from "@/components/connect-project-dashboard"
import { ArrowRight, ChevronRight, Settings2 } from "lucide-react"

export const metadata: Metadata = {
  title: "Connect Your Workflow — Sovereign",
  description:
    "Bring commercial context, communication threads, and project intelligence into one shared operating environment. Sovereign connects the signals teams already work with — so intelligence is not isolated from execution.",
}

const GRAIN_BG =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)'/%3E%3C/svg%3E\")"

const DOT_GRID =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Ccircle cx='0.5' cy='0.5' r='0.75' fill='white'/%3E%3C/svg%3E\")"

const ACCENT_BLUE = "#5B9CF6"

const COMMS_BENEFITS = [
  {
    title: "Continuity across every conversation",
    body: "Email threads, follow-up commitments, and account decisions are part of the same working context as your intelligence — not a separate inbox that no one checks before a meeting.",
  },
  {
    title: "Shared context, not personal memory",
    body: "When a team member picks up a thread, they see what has already been discussed, what was promised, and what the account has said — without asking someone else to brief them.",
  },
  {
    title: "Follow-ups that do not fall through",
    body: "Open commitments, unanswered questions, and pending requests are visible in the account context — not buried in someone's sent folder.",
  },
  {
    title: "Communication connected to what matters",
    body: "Every thread is linked to the account, the project, and the intelligence your team has gathered. Context does not have to be reconstructed before every call.",
  },
]

const DASHBOARD_BENEFITS = [
  {
    title: "Targets and signals in the same place",
    body: "Revenue goals, deal progress, and the intelligence feeding the project sit in one view — not across a CRM, a spreadsheet, and a folder of documents that no one keeps in sync.",
  },
  {
    title: "Project visibility beyond static fields",
    body: "A Sovereign project view shows not just what has been agreed, but what has been gathered — meetings, emails, interviews, and notes — so the team works from a complete picture.",
  },
  {
    title: "One shared view of project reality",
    body: "Every team member sees the same context: the deals, the activity, the sources, and the people. Operational knowledge does not live in one person's head.",
  },
  {
    title: "Intelligence connected to execution",
    body: "The information your team captures feeds directly into the project view — so the distance between what you know and what you act on is as short as possible.",
  },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ConnectWorkflowPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#060D1C" }}>
      <Header />

      {/* Textures */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage: GRAIN_BG,
          backgroundRepeat: "repeat",
          backgroundSize: "300px 300px",
          opacity: 0.035,
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage: DOT_GRID,
          backgroundRepeat: "repeat",
          backgroundSize: "24px 24px",
          opacity: 0.022,
        }}
      />

      <main className="relative z-10 overflow-x-hidden">

        {/* ── HERO ──────────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 120% 55% at 50% -5%, rgba(10,24,56,0.90) 0%, transparent 60%)",
            }}
          />

          <div className="relative mx-auto max-w-5xl px-6 pb-20 pt-32 md:pb-24 md:pt-40">
            {/* Breadcrumb */}
            <div className="mb-8 flex items-center gap-2">
              <Link
                href="/"
                className="text-[11px] font-medium uppercase tracking-[0.10em] transition-opacity hover:opacity-70"
                style={{ color: "rgba(255,255,255,0.28)" }}
              >
                Platform
              </Link>
              <ChevronRight className="h-3 w-3" style={{ color: "rgba(255,255,255,0.18)" }} strokeWidth={1.5} />
              <p
                className="text-[11px] font-medium uppercase tracking-[0.10em]"
                style={{ color: "rgba(255,255,255,0.50)" }}
              >
                Connect Your Workflow
              </p>
            </div>

            {/* Eyebrow */}
            <div className="mb-5 flex items-center gap-2.5">
              <div
                className="flex h-7 w-7 items-center justify-center rounded-lg"
                style={{
                  background: "rgba(91,156,246,0.10)",
                  border: "1px solid rgba(91,156,246,0.22)",
                }}
              >
                <Settings2 className="h-3.5 w-3.5" style={{ color: ACCENT_BLUE }} strokeWidth={1.5} />
              </div>
              <p
                className="text-[11px] font-medium uppercase tracking-[0.12em]"
                style={{ color: "rgba(255,255,255,0.28)" }}
              >
                Connect Your Workflow
              </p>
            </div>

            {/* Headline + lead */}
            <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-[3fr_2fr] lg:gap-20">
              <h1 className="font-serif text-4xl font-normal leading-[1.06] tracking-[-0.030em] text-white md:text-5xl lg:text-[3.2rem]">
                Intelligence connected
                <br />
                to how you work.
              </h1>
              <p
                className="text-pretty text-[15px] leading-[1.80] tracking-[-0.011em] lg:pb-1"
                style={{ color: "rgba(255,255,255,0.50)" }}
              >
                Sovereign brings together the conversations, targets, and context that commercial teams already rely on — so intelligence is not isolated from the decisions and execution it is supposed to support.
              </p>
            </div>

            <div
              aria-hidden="true"
              className="mt-14 h-px"
              style={{ background: "rgba(255,255,255,0.07)" }}
            />
          </div>
        </section>

        {/* ── COMMUNICATIONS SHOWCASE ───────────────────────────────────────── */}
        <section
          className="relative border-t border-white/[0.06]"
          style={{ background: "#060D1C" }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(6,18,52,0.80) 0%, transparent 65%)",
            }}
          />
          {/* Local dot field */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: DOT_GRID,
              backgroundRepeat: "repeat",
              backgroundSize: "20px 20px",
              opacity: 0.055,
            }}
          />

          <div className="relative mx-auto max-w-5xl px-6 pt-20 md:pt-28">
            <div className="mb-14 grid grid-cols-1 gap-8 lg:grid-cols-[3fr_2fr] lg:gap-20">
              <div>
                <p
                  className="mb-4 text-[11px] font-medium uppercase tracking-[0.12em]"
                  style={{ color: "rgba(255,255,255,0.28)" }}
                >
                  01 — Communications
                </p>
                <h2 className="font-serif text-3xl font-normal leading-[1.10] tracking-[-0.025em] text-white md:text-4xl">
                  Every conversation,
                  <br />
                  connected to its context.
                </h2>
              </div>
              <p
                className="text-[15px] leading-[1.80] tracking-[-0.011em] lg:pt-10"
                style={{ color: "rgba(255,255,255,0.48)" }}
              >
                Account threads, follow-up commitments, and decisions made over email are part of the same working context as your intelligence — visible to the whole team, linked to the account, and ready before the next conversation.
              </p>
            </div>
          </div>

          <div className="relative mx-auto max-w-5xl px-6 pb-16">
            <ConnectCommsPanel />
          </div>

          <div className="relative mx-auto max-w-5xl px-6 pb-24">
            <div
              className="grid grid-cols-1 gap-px sm:grid-cols-2"
              style={{ background: "rgba(255,255,255,0.06)" }}
            >
              {COMMS_BENEFITS.map(({ title, body }) => (
                <div key={title} className="p-8" style={{ background: "#060D1C" }}>
                  <h3 className="mb-3 font-serif text-[17px] font-normal leading-[1.22] tracking-[-0.018em] text-white">
                    {title}
                  </h3>
                  <p
                    className="text-[14px] leading-[1.80] tracking-[-0.010em]"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                  >
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROJECT DASHBOARD SHOWCASE ────────────────────────────────────── */}
        <section
          className="relative border-t border-white/[0.06]"
          style={{ background: "#060D1C" }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(6,14,46,0.75) 0%, transparent 65%)",
            }}
          />
          {/* Local dot field */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: DOT_GRID,
              backgroundRepeat: "repeat",
              backgroundSize: "20px 20px",
              opacity: 0.075,
            }}
          />

          <div className="relative mx-auto max-w-5xl px-6 pt-20 md:pt-28">
            <div className="mb-14 grid grid-cols-1 gap-8 lg:grid-cols-[3fr_2fr] lg:gap-20">
              <div>
                <p
                  className="mb-4 text-[11px] font-medium uppercase tracking-[0.12em]"
                  style={{ color: "rgba(255,255,255,0.28)" }}
                >
                  02 — Project context
                </p>
                <h2 className="font-serif text-3xl font-normal leading-[1.10] tracking-[-0.025em] text-white md:text-4xl">
                  Targets, signals, and
                  <br />
                  sources in one view.
                </h2>
              </div>
              <p
                className="text-[15px] leading-[1.80] tracking-[-0.011em] lg:pt-10"
                style={{ color: "rgba(255,255,255,0.48)" }}
              >
                A Sovereign project view shows not just what has been agreed, but what has been gathered — revenue targets, deal progress, team context, and the full range of sources feeding the project. One shared view of operational reality.
              </p>
            </div>
          </div>

          <div className="relative mx-auto max-w-5xl px-6 pb-16">
            <ConnectProjectDashboard />
          </div>

          {/* Explanatory strip */}
          <div className="relative mx-auto max-w-5xl px-6 pb-16">
            <div
              className="rounded-2xl px-8 py-8 md:px-12 md:py-10"
              style={{
                background: "rgba(255,255,255,0.018)",
                border: "1px solid rgba(147,147,147,0.10)",
              }}
            >
              <p
                className="mb-2 text-[11px] font-medium uppercase tracking-[0.12em]"
                style={{ color: "rgba(255,255,255,0.22)" }}
              >
                What you are looking at
              </p>
              <p
                className="max-w-3xl text-[15px] leading-[1.80] tracking-[-0.011em]"
                style={{ color: "rgba(255,255,255,0.52)" }}
              >
                This is a working project view — not a reporting dashboard. The revenue figures, deal stages, team members, and source counts are all live context from the Angola 2025 project. The Sources tab shows every interview, email, meeting note, and report that feeds the project intelligence. Nothing is static or decorative.
              </p>
            </div>
          </div>

          <div className="relative mx-auto max-w-5xl px-6 pb-24">
            <div
              className="grid grid-cols-1 gap-px sm:grid-cols-2"
              style={{ background: "rgba(255,255,255,0.06)" }}
            >
              {DASHBOARD_BENEFITS.map(({ title, body }) => (
                <div key={title} className="p-8" style={{ background: "#060D1C" }}>
                  <h3 className="mb-3 font-serif text-[17px] font-normal leading-[1.22] tracking-[-0.018em] text-white">
                    {title}
                  </h3>
                  <p
                    className="text-[14px] leading-[1.80] tracking-[-0.010em]"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                  >
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CLOSING STATEMENT ─────────────────────────────────────────────── */}
        <section
          className="relative border-t border-white/[0.06]"
          style={{ background: "#060D1C" }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(6,14,44,0.60) 0%, transparent 65%)",
            }}
          />

          <div className="relative mx-auto max-w-5xl px-6 py-20 md:py-28">
            <p
              className="mb-12 text-[11px] font-medium uppercase tracking-[0.12em]"
              style={{ color: "rgba(255,255,255,0.28)" }}
            >
              What changes
            </p>

            <div
              className="grid grid-cols-1 gap-px sm:grid-cols-3"
              style={{ background: "rgba(255,255,255,0.06)" }}
            >
              {[
                {
                  stat: "One context",
                  label: "not five separate tools",
                  body: "Conversations, targets, intelligence, and team context sit in the same environment. The operational picture is complete without switching between systems.",
                },
                {
                  stat: "Less fragmentation",
                  label: "across teams and sources",
                  body: "When everyone works from the same project view, decisions are grounded in shared context — not in whoever happened to be on the last call.",
                },
                {
                  stat: "Closer to execution",
                  label: "from signal to action",
                  body: "The distance between what your team knows and what it acts on shrinks when intelligence, communication, and commercial targets are connected.",
                },
              ].map(({ stat, label, body }) => (
                <div key={stat} className="p-8" style={{ background: "#060D1C" }}>
                  <p className="mb-1 font-serif text-[22px] font-normal leading-tight tracking-[-0.020em] text-white">
                    {stat}
                  </p>
                  <p
                    className="mb-4 text-[12px] font-medium uppercase tracking-[0.08em]"
                    style={{ color: "rgba(255,255,255,0.28)" }}
                  >
                    {label}
                  </p>
                  <p
                    className="text-[14px] leading-[1.78] tracking-[-0.010em]"
                    style={{ color: "rgba(255,255,255,0.42)" }}
                  >
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA STRIP ─────────────────────────────────────────────────────── */}
        <section
          className="relative border-t border-white/[0.06]"
          style={{ background: "#060D1C" }}
        >
          <div className="relative mx-auto max-w-5xl px-6 py-20 md:py-24">
            <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-serif text-2xl font-normal leading-[1.14] tracking-[-0.022em] text-white md:text-3xl">
                  Ready to connect your operating context?
                </h2>
                <p
                  className="mt-2 text-[14px] leading-[1.70] tracking-[-0.010em]"
                  style={{ color: "rgba(255,255,255,0.42)" }}
                >
                  See how Sovereign brings intelligence and execution into one shared environment.
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                <Link
                  href="/request-demo"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium tracking-[-0.011em] text-[#070E1F] transition-opacity hover:opacity-90"
                >
                  Request a demo
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
                </Link>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-[-0.011em] transition-colors hover:bg-white/[0.06]"
                  style={{ border: "1px solid rgba(255,255,255,0.14)", color: "rgba(255,255,255,0.60)" }}
                >
                  Explore the platform
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── FOOTER NAV ────────────────────────────────────────────────────── */}
        <footer
          className="relative mx-auto flex max-w-5xl items-center justify-between px-6 py-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
        >
          <Link
            href="/"
            className="text-[12px] tracking-[-0.011em] transition-opacity hover:opacity-60"
            style={{ color: "rgba(255,255,255,0.28)" }}
          >
            ← Back to Sovereign
          </Link>
          <Link
            href="/request-demo"
            className="text-[12px] font-medium tracking-[-0.011em] transition-opacity hover:opacity-80"
            style={{ color: "rgba(255,255,255,0.50)" }}
          >
            Request a demo →
          </Link>
        </footer>
      </main>
    </div>
  )
}
