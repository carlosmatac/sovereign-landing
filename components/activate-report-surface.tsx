// Static server component — no "use client" needed
import Image from "next/image"

const DIVIDER = "rgba(147,147,147,0.09)"
const DIVIDER_STRONG = "rgba(147,147,147,0.14)"

// ─── Report content ───────────────────────────────────────────────────────────

const KEY_SIGNALS = [
  {
    n: "01",
    title: "Regulatory consolidation is accelerating in the Lagos corridor",
    body: "Three separate ministry-level conversations conducted between October 2025 and February 2026 confirm that the Federal Government's infrastructure licensing reform (delayed twice since 2022) will be enacted before Q3 2026. The implications for independent power producers are material and not yet reflected in public market pricing.",
    sources: ["Ministry briefing · Oct 2025", "NNPC stakeholder session · Jan 2026", "Policy review · Feb 2026"],
  },
  {
    n: "02",
    title: "The Francophone corridor is attracting a new class of infrastructure investor",
    body: "Intelligence gathered across 14 conversations in Côte d'Ivoire, Senegal, and Cameroon between Q3 and Q4 2025 reveals a pattern of Gulf-based sovereign capital entering through secondary channels, not headline transactions. This is not visible in public deal databases. The entry strategy is consistently structured around logistics and cold-chain assets.",
    sources: ["Abidjan sector brief · Q3 2025", "Dakar infrastructure session · Q4 2025", "Gulf capital mapping · internal"],
  },
  {
    n: "03",
    title: "Execution risk has declined faster than the market believes",
    body: "Across 11 of the 14 markets tracked in this review, the primary risk factor has shifted from regulatory unpredictability to execution capacity. Organisations that have built local operational infrastructure are outperforming those that rely on remote management by a consistent margin. This finding is supported by 28 post-investment reviews conducted during 2025.",
    sources: ["Post-investment review series · 2025", "Operational benchmarking · Q4 2025"],
  },
]

const IMPLICATIONS = [
  "Capital positioned for the 2019–2023 infrastructure thesis is likely misaligned with current opportunity. The risk/return profile of the Lagos corridor has improved materially, but requires operational presence to capture.",
  "The Francophone corridor opportunity is time-sensitive. The window for anchor positioning in the Côte d'Ivoire logistics market closes when the government's approved vendor list is finalised, expected June 2026.",
  "Organisations that have built deep stakeholder relationships in the regulatory layer are structurally advantaged. The intelligence gathered in this review cannot be replicated through desk research or public data sources.",
]

const RECOMMENDED_ACTIONS = [
  {
    priority: "Immediate",
    action: "Commission a dedicated Francophone corridor assessment before the Q2 2026 procurement cycle opens.",
  },
  {
    priority: "Short-term",
    action: "Review all Lagos corridor positions against the updated regulatory timeline. Three positions may benefit from accelerated deployment.",
  },
  {
    priority: "Strategic",
    action: "Build a systematic stakeholder engagement programme in the three Francophone markets identified in this review. The intelligence advantage is currently held by a small number of operators.",
  },
]

// ─── Component ────────────────────────────────────────────────────────────────

export function ActivateReportSurface() {
  return (
    <div
      className="relative w-full overflow-hidden rounded-[17px]"
      style={{
        background: "#070E1F",
        border: "1px solid rgba(147,147,147,0.16)",
        boxShadow:
          "0 0 0 1px rgba(255,255,255,0.025), 0 48px 120px -24px rgba(0,0,0,0.85), 0 8px 24px -6px rgba(0,0,0,0.55)",
      }}
    >
      {/* Window chrome */}
      <div
        className="flex items-center justify-between px-6 py-[11px]"
        style={{
          background: "linear-gradient(to bottom, #0D1B32, #0B1729)",
          borderBottom: `1px solid ${DIVIDER_STRONG}`,
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
            Aksum · Intelligence Report
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[9px] font-medium uppercase tracking-[0.08em]" style={{ color: "rgba(255,255,255,0.18)" }}>
            Confidential
          </span>
          <div
            className="rounded-full px-2 py-[3px] text-[8.5px] font-semibold uppercase tracking-[0.09em]"
            style={{
              background: "rgba(251,191,36,0.07)",
              border: "1px solid rgba(251,191,36,0.18)",
              color: "#FBBF24",
            }}
          >
            Final Draft
          </div>
        </div>
      </div>

      {/* Document body */}
      <div className="px-8 pb-0 pt-10 md:px-14 md:pt-14">

        {/* Aksum seal + document meta */}
        <div className="mb-10 flex items-start justify-between">
          <div>
            <p
              className="mb-1 text-[9.5px] font-semibold uppercase tracking-[0.14em]"
              style={{ color: "rgba(255,255,255,0.22)" }}
            >
              Aksum Intelligence
            </p>
            <p className="text-[9px]" style={{ color: "rgba(255,255,255,0.18)" }}>
              Annual Review · Full Year 2025 · April 2026
            </p>
          </div>
          {/* Aksum branded mark */}
          <Image
            src="/ak.svg"
            alt="Aksum"
            width={36}
            height={36}
            style={{ opacity: 0.30 }}
            draggable={false}
          />
        </div>

        {/* Title */}
        <h2
          className="mb-3 font-serif text-3xl font-normal leading-[1.08] tracking-[-0.028em] text-white md:text-[2.4rem]"
        >
          Emerging Markets Infrastructure
          <br />
          Annual Intelligence Review
        </h2>
        <p
          className="mb-2 text-[13px] font-medium uppercase tracking-[0.08em]"
          style={{ color: "rgba(255,255,255,0.28)" }}
        >
          Full Year 2025
        </p>

        <div className="mb-10 mt-8 h-px" style={{ background: DIVIDER_STRONG }} />

        {/* Executive Summary */}
        <div className="mb-10">
          <p
            className="mb-4 text-[10px] font-semibold uppercase tracking-[0.12em]"
            style={{ color: "rgba(255,255,255,0.28)" }}
          >
            Executive Summary
          </p>
          <p
            className="mb-4 text-[15px] leading-[1.82] tracking-[-0.011em]"
            style={{ color: "rgba(255,255,255,0.62)" }}
          >
            This review synthesises intelligence gathered across 214 stakeholder conversations, 47 regulatory filings, and 28 internal strategy documents produced during 2025. It covers 14 markets across Sub-Saharan Africa, the Francophone corridor, and the Pacific infrastructure zone.
          </p>
          <p
            className="text-[15px] leading-[1.82] tracking-[-0.011em]"
            style={{ color: "rgba(255,255,255,0.62)" }}
          >
            Three themes recurred consistently across geographies and sectors: the shift from access to execution as the primary differentiator; the emergence of a new class of infrastructure investor in the Francophone corridor; and the accelerating regulatory consolidation in the Lagos and Pacific corridors. Each is documented in full below.
          </p>
        </div>

        {/* Coverage stats */}
        <div
          className="mb-10 grid grid-cols-2 gap-px sm:grid-cols-4"
          style={{ background: DIVIDER }}
        >
          {[
            { value: "214", label: "Stakeholder conversations" },
            { value: "47",  label: "Regulatory filings reviewed" },
            { value: "28",  label: "Strategy documents" },
            { value: "14",  label: "Markets covered" },
          ].map(({ value, label }) => (
            <div
              key={label}
              className="px-5 py-4"
              style={{ background: "#070E1F" }}
            >
              <p className="mb-0.5 text-[22px] font-semibold tabular-nums leading-none tracking-[-0.020em] text-white">
                {value}
              </p>
              <p className="text-[10px] leading-snug" style={{ color: "rgba(255,255,255,0.32)" }}>
                {label}
              </p>
            </div>
          ))}
        </div>

        {/* Key Signals */}
        <div className="mb-10">
          <p
            className="mb-6 text-[10px] font-semibold uppercase tracking-[0.12em]"
            style={{ color: "rgba(255,255,255,0.28)" }}
          >
            Key Signals
          </p>
          <div className="space-y-6">
            {KEY_SIGNALS.map(({ n, title, body, sources }) => (
              <div key={n} className="grid grid-cols-[auto_1fr] gap-5">
                <span
                  className="mt-0.5 text-[11px] font-semibold tabular-nums"
                  style={{ color: "rgba(255,255,255,0.18)" }}
                >
                  {n}
                </span>
                <div>
                  <p
                    className="mb-2 text-[15px] font-medium leading-snug tracking-[-0.014em]"
                    style={{ color: "rgba(255,255,255,0.82)" }}
                  >
                    {title}
                  </p>
                  <p
                    className="mb-3 text-[13.5px] leading-[1.80] tracking-[-0.010em]"
                    style={{ color: "rgba(255,255,255,0.48)" }}
                  >
                    {body}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {sources.map((s) => (
                      <span
                        key={s}
                        className="rounded-full px-2 py-[3px] text-[9.5px]"
                        style={{
                          background: "rgba(91,156,246,0.05)",
                          border: "1px solid rgba(91,156,246,0.12)",
                          color: "rgba(91,156,246,0.65)",
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-10 h-px" style={{ background: DIVIDER_STRONG }} />

        {/* Implications */}
        <div className="mb-10">
          <p
            className="mb-6 text-[10px] font-semibold uppercase tracking-[0.12em]"
            style={{ color: "rgba(255,255,255,0.28)" }}
          >
            Implications
          </p>
          <div className="space-y-4">
            {IMPLICATIONS.map((text, i) => (
              <div key={i} className="flex items-start gap-4">
                <div
                  className="mt-[7px] h-[4px] w-[4px] shrink-0 rounded-full"
                  style={{ background: "rgba(255,255,255,0.22)" }}
                />
                <p
                  className="text-[14px] leading-[1.82] tracking-[-0.010em]"
                  style={{ color: "rgba(255,255,255,0.52)" }}
                >
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Actions */}
        <div className="mb-10">
          <p
            className="mb-6 text-[10px] font-semibold uppercase tracking-[0.12em]"
            style={{ color: "rgba(255,255,255,0.28)" }}
          >
            Recommended Actions
          </p>
          <div className="space-y-3">
            {RECOMMENDED_ACTIONS.map(({ priority, action }) => (
              <div
                key={priority}
                className="flex items-start gap-4 rounded-xl px-5 py-4"
                style={{
                  background: "rgba(255,255,255,0.022)",
                  border: "1px solid rgba(147,147,147,0.09)",
                }}
              >
                <span
                  className="mt-[2px] shrink-0 rounded-full px-2 py-[2px] text-[8.5px] font-semibold uppercase tracking-[0.07em]"
                  style={{
                    background:
                      priority === "Immediate"
                        ? "rgba(239,68,68,0.10)"
                        : priority === "Short-term"
                        ? "rgba(251,191,36,0.10)"
                        : "rgba(91,156,246,0.10)",
                    border:
                      priority === "Immediate"
                        ? "1px solid rgba(239,68,68,0.22)"
                        : priority === "Short-term"
                        ? "1px solid rgba(251,191,36,0.22)"
                        : "1px solid rgba(91,156,246,0.22)",
                    color:
                      priority === "Immediate"
                        ? "rgba(239,68,68,0.80)"
                        : priority === "Short-term"
                        ? "rgba(251,191,36,0.80)"
                        : "rgba(91,156,246,0.80)",
                  }}
                >
                  {priority}
                </span>
                <p
                  className="text-[13.5px] leading-[1.72] tracking-[-0.010em]"
                  style={{ color: "rgba(255,255,255,0.58)" }}
                >
                  {action}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Appendix stub */}
        <div
          className="mb-0 rounded-t-xl px-5 py-4"
          style={{
            background: "rgba(255,255,255,0.015)",
            border: "1px solid rgba(147,147,147,0.09)",
            borderBottom: "none",
          }}
        >
          <p
            className="mb-3 text-[9.5px] font-semibold uppercase tracking-[0.12em]"
            style={{ color: "rgba(255,255,255,0.22)" }}
          >
            Appendix: Source References
          </p>
          <div className="space-y-1.5">
            {[
              "Lagos Infrastructure Stakeholder Series · Oct 2025 – Feb 2026 · 38 sessions",
              "Francophone Corridor Intelligence Sweep · Q3–Q4 2025 · 14 conversations",
              "Post-Investment Review Series · Full Year 2025 · 28 reviews",
              "Regulatory Filing Analysis · Nigeria, Ghana, Côte d'Ivoire · 47 documents",
              "Pacific Corridor Programme Documentation · Manila Energy / Andes Power · 22 sources",
            ].map((ref, i) => (
              <div key={i} className="flex items-start gap-3">
                <span
                  className="shrink-0 text-[9px] tabular-nums"
                  style={{ color: "rgba(255,255,255,0.18)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-[10.5px] leading-snug" style={{ color: "rgba(255,255,255,0.30)" }}>
                  {ref}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fade-out gradient — communicates the document continues below */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-48"
        style={{
          background:
            "linear-gradient(to top, #070E1F 0%, rgba(7,14,31,0.92) 35%, transparent 100%)",
        }}
      />

      {/* "Continue reading" hint at the very bottom */}
      <div className="relative flex items-center justify-center pb-6 pt-4">
        <div className="flex items-center gap-2">
          <div
            className="h-px w-8"
            style={{ background: "rgba(255,255,255,0.10)" }}
          />
          <p
            className="text-[9.5px] font-medium uppercase tracking-[0.10em]"
            style={{ color: "rgba(255,255,255,0.22)" }}
          >
            Full report · 34 pages
          </p>
          <div
            className="h-px w-8"
            style={{ background: "rgba(255,255,255,0.10)" }}
          />
        </div>
      </div>
    </div>
  )
}
