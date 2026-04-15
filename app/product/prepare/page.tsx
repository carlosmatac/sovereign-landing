import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { PrepareSellCopilot } from "@/components/prepare-sell-copilot"
import { PrepareSellGraph } from "@/components/prepare-sell-graph"
import { ArrowRight, ChevronRight, TrendingUp } from "lucide-react"

export const metadata: Metadata = {
  title: "Prepare & Sell — Sovereign",
  description:
    "Enter every meeting with more context. Sovereign surfaces what your team already knows — about accounts, relationships, and prior conversations — so you can prepare with real intelligence.",
}

const GRAIN_BG =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)'/%3E%3C/svg%3E\")"

const DOT_GRID =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Ccircle cx='0.5' cy='0.5' r='0.75' fill='white'/%3E%3C/svg%3E\")"

const ACCENT_BLUE = "#5B9CF6"

const COPILOT_BENEFITS = [
  {
    title: "Account memory that compounds",
    body: "Every conversation, brief, and follow-up thread becomes part of a growing record. Sovereign surfaces what is relevant before you ask.",
  },
  {
    title: "What not to repeat",
    body: "Know what the account has already heard, what landed, and what fell flat — so every approach adds something new.",
  },
  {
    title: "Open loops, surfaced automatically",
    body: "Unanswered requests, unresolved threads, and commitments that were never followed up — Sovereign finds them before the meeting does.",
  },
  {
    title: "Intelligence grounded in prior context",
    body: "Every answer is anchored in what your team has actually recorded — not broad advice, but specific signals from real conversations.",
  },
]

const GRAPH_BENEFITS = [
  {
    title: "See what connects before it is obvious",
    body: "Relationships between people, companies, and institutions are rarely visible in a single document. The graph makes the structure legible.",
  },
  {
    title: "The bridge that changes the conversation",
    body: "A shared contact, a prior relationship, a connected institution — the graph surfaces the path that makes the approach stronger.",
  },
  {
    title: "Context across the whole account",
    body: "Every entity in your workspace is connected to everything else it touches. The graph is the map of what your organisation actually knows.",
  },
  {
    title: "Structural memory behind every answer",
    body: "When the Copilot surfaces an insight, the graph shows you why it matters — and who else is connected to it.",
  },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PrepareSellPage() {
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
                Prepare &amp; Sell
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
                <TrendingUp className="h-3.5 w-3.5" style={{ color: ACCENT_BLUE }} strokeWidth={1.5} />
              </div>
              <p
                className="text-[11px] font-medium uppercase tracking-[0.12em]"
                style={{ color: "rgba(255,255,255,0.28)" }}
              >
                Prepare &amp; Sell
              </p>
            </div>

            {/* Headline + lead */}
            <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-[3fr_2fr] lg:gap-20">
              <h1 className="font-serif text-4xl font-normal leading-[1.06] tracking-[-0.030em] text-white md:text-5xl lg:text-[3.2rem]">
                Better preparation
                <br />
                leads to better
                <br />
                conversations.
              </h1>
              <p
                className="text-pretty text-[15px] leading-[1.80] tracking-[-0.011em] lg:pb-1"
                style={{ color: "rgba(255,255,255,0.50)" }}
              >
                The most important work happens before the meeting. Sovereign gives commercial teams the context, account memory, and relationship visibility they need to enter every conversation with a stronger position.
              </p>
            </div>

            <div
              aria-hidden="true"
              className="mt-14 h-px"
              style={{ background: "rgba(255,255,255,0.07)" }}
            />
          </div>
        </section>

        {/* ── COPILOT SHOWCASE ──────────────────────────────────────────────── */}
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

          <div className="relative mx-auto max-w-5xl px-6 pt-20 md:pt-28">
            {/* Copy row */}
            <div className="mb-14 grid grid-cols-1 gap-8 lg:grid-cols-[3fr_2fr] lg:gap-20">
              <div>
                <p
                  className="mb-4 text-[11px] font-medium uppercase tracking-[0.12em]"
                  style={{ color: "rgba(255,255,255,0.28)" }}
                >
                  01 — Sovereign Copilot
                </p>
                <h2 className="font-serif text-3xl font-normal leading-[1.10] tracking-[-0.025em] text-white md:text-4xl">
                  Account memory, on demand.
                </h2>
              </div>
              <p
                className="text-[15px] leading-[1.80] tracking-[-0.011em] lg:pt-10"
                style={{ color: "rgba(255,255,255,0.48)" }}
              >
                The Copilot reasons over everything your team has captured — meetings, briefs, follow-up threads, recorded conversations — and surfaces what is relevant to the account, the relationship, or the moment.
              </p>
            </div>
          </div>

          {/* Copilot panel — full width within max container */}
          <div className="relative mx-auto max-w-5xl px-6 pb-16">
            <PrepareSellCopilot />
          </div>

          {/* Benefits grid */}
          <div className="relative mx-auto max-w-5xl px-6 pb-24">
            <div
              className="grid grid-cols-1 gap-px sm:grid-cols-2"
              style={{ background: "rgba(255,255,255,0.06)" }}
            >
              {COPILOT_BENEFITS.map(({ title, body }) => (
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

        {/* ── NETWORK EXPLORER SHOWCASE ─────────────────────────────────────── */}
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
          {/* Local dot field — denser presence in this section */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: DOT_GRID,
              backgroundRepeat: "repeat",
              backgroundSize: "20px 20px",
              opacity: 0.07,
            }}
          />

          <div className="relative mx-auto max-w-5xl px-6 pt-20 md:pt-28">
            {/* Copy row */}
            <div className="mb-14 grid grid-cols-1 gap-8 lg:grid-cols-[3fr_2fr] lg:gap-20">
              <div>
                <p
                  className="mb-4 text-[11px] font-medium uppercase tracking-[0.12em]"
                  style={{ color: "rgba(255,255,255,0.28)" }}
                >
                  02 — Network Explorer
                </p>
                <h2 className="font-serif text-3xl font-normal leading-[1.10] tracking-[-0.025em] text-white md:text-4xl">
                  The structure behind
                  <br />
                  every relationship.
                </h2>
              </div>
              <p
                className="text-[15px] leading-[1.80] tracking-[-0.011em] lg:pt-10"
                style={{ color: "rgba(255,255,255,0.48)" }}
              >
                The Network Explorer maps every entity your team has encountered — people, companies, governments, regions, and internal documents — and shows how they connect. The graph is the structural backbone behind the Copilot&apos;s answers.
              </p>
            </div>
          </div>

          {/* Graph panel */}
          <div className="relative mx-auto max-w-5xl px-6 pb-16">
            <PrepareSellGraph />
          </div>

          {/* Explanatory copy strip */}
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
                Every node in this graph corresponds to a real entity that appears in internal sources — interviews, briefs, meeting notes, and follow-up threads. The connections are not inferred from public data. They are drawn from what your team has actually recorded. Click any node to see what it connects to.
              </p>
            </div>
          </div>

          {/* Benefits grid */}
          <div className="relative mx-auto max-w-5xl px-6 pb-24">
            <div
              className="grid grid-cols-1 gap-px sm:grid-cols-2"
              style={{ background: "rgba(255,255,255,0.06)" }}
            >
              {GRAPH_BENEFITS.map(({ title, body }) => (
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

            <div className="grid grid-cols-1 gap-px sm:grid-cols-3" style={{ background: "rgba(255,255,255,0.06)" }}>
              {[
                {
                  stat: "Every meeting",
                  label: "entered with full account context",
                  body: "Not a summary from the last call. The full picture — across every conversation, document, and relationship your team has ever recorded.",
                },
                {
                  stat: "Less guesswork",
                  label: "before high-value conversations",
                  body: "Know what the account cares about, what they have already heard, and where the real opportunity sits — before the conversation starts.",
                },
                {
                  stat: "Scattered memory",
                  label: "turned into commercial readiness",
                  body: "Information that lives in inboxes, personal notes, and forgotten briefs becomes a shared, searchable, and commercially useful asset.",
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
                  Ready to enter every meeting prepared?
                </h2>
                <p
                  className="mt-2 text-[14px] leading-[1.70] tracking-[-0.010em]"
                  style={{ color: "rgba(255,255,255,0.42)" }}
                >
                  See how Sovereign surfaces what your team already knows.
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
