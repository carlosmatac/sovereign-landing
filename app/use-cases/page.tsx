import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { RequestDemoButton } from "@/components/request-demo-button"
import { ArrowRight } from "lucide-react"
import { getServerT } from "@/lib/i18n/server"
import { getDictionary } from "@/lib/i18n/config"

// Metadata is generated server-side at request time. We use the EN dictionary
// for the static export here — Next.js metadata is cached, so dynamic per-locale
// titles would require generateMetadata + reading the cookie there too. Keeping
// EN as the canonical SEO target is the simpler, safer default.
export const metadata: Metadata = {
  title: getDictionary("en").useCases.metaTitle,
  description: getDictionary("en").useCases.metaDescription,
}

// ─── Texture constants ────────────────────────────────────────────────────────

const GRAIN_BG =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)'/%3E%3C/svg%3E\")"

const DOT_GRID =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Ccircle cx='0.5' cy='0.5' r='0.75' fill='white'/%3E%3C/svg%3E\")"

// ─── Tonal palette ────────────────────────────────────────────────────────────
//
// Each audience gets a desaturated, low-saturation tonal identity so the section
// reads as a connected family of panels — never as a colourful logo wall. The
// values are biased away from pure hues toward gray, which is what keeps them
// premium against the dark Aksum base.

type Tone = "steel" | "sage" | "plum" | "stone"

interface TonePreset {
  /** Soft diagonal wash painted on top of the panel base. */
  wash: string
  /** Hairline border colour. Always low-contrast. */
  border: string
  /** Off-axis radial glow that gives the panel internal depth. */
  glow: string
  /** Colour of the fine dot pattern that subtly textures the panel. */
  pattern: string
  /** Saturated-but-restrained accent used in the abstract diagrams. */
  accent: string
  /** Dim version of the accent — used for the eyebrow text on each panel. */
  accentText: string
}

const TONES: Record<Tone, TonePreset> = {
  // Sales — muted steel / dusty blue. Reads as "structure / system".
  steel: {
    wash:
      "linear-gradient(135deg, rgba(118,148,188,0.08) 0%, rgba(118,148,188,0.022) 55%, transparent 100%)",
    border: "rgba(150,178,210,0.13)",
    glow:
      "radial-gradient(ellipse 65% 55% at 82% 28%, rgba(118,148,188,0.13) 0%, transparent 62%)",
    pattern: "rgba(180,205,230,0.055)",
    accent: "rgba(180,205,230,0.55)",
    accentText: "rgba(190,210,230,0.62)",
  },
  // Editorial — faded sage / softened green-gray. Reads as "considered / quiet".
  sage: {
    wash:
      "linear-gradient(135deg, rgba(122,150,132,0.075) 0%, rgba(122,150,132,0.020) 55%, transparent 100%)",
    border: "rgba(150,176,158,0.13)",
    glow:
      "radial-gradient(ellipse 65% 55% at 18% 35%, rgba(122,150,132,0.12) 0%, transparent 62%)",
    pattern: "rgba(190,210,195,0.055)",
    accent: "rgba(190,210,195,0.52)",
    accentText: "rgba(200,218,205,0.60)",
  },
  // Marketing — muted plum / restrained aubergine-gray. Reads as "editorial / authored".
  plum: {
    wash:
      "linear-gradient(135deg, rgba(150,122,160,0.07) 0%, rgba(150,122,160,0.018) 55%, transparent 100%)",
    border: "rgba(174,150,184,0.13)",
    glow:
      "radial-gradient(ellipse 65% 55% at 82% 38%, rgba(150,122,160,0.12) 0%, transparent 62%)",
    pattern: "rgba(210,190,220,0.055)",
    accent: "rgba(210,190,220,0.55)",
    accentText: "rgba(218,200,228,0.62)",
  },
  // Leadership — soft stone / cool sand / neutral taupe. Reads as "ground truth".
  stone: {
    wash:
      "linear-gradient(135deg, rgba(170,158,138,0.07) 0%, rgba(170,158,138,0.018) 55%, transparent 100%)",
    border: "rgba(184,172,152,0.13)",
    glow:
      "radial-gradient(ellipse 70% 50% at 50% 18%, rgba(170,158,138,0.12) 0%, transparent 62%)",
    pattern: "rgba(220,212,196,0.055)",
    accent: "rgba(220,212,196,0.55)",
    accentText: "rgba(224,214,200,0.62)",
  },
}

// ─── Abstract diagrams ────────────────────────────────────────────────────────
//
// Each panel carries a low-contrast structural element instead of a photo. The
// diagrams are SVG-only, scale with the panel, and stay deliberately quiet so
// the typography keeps the centre of gravity. They suggest the *meaning* of
// each audience — relationships, threads, publications, oversight — without
// being literal product UI screenshots.

function RailDiagram({ accent }: { accent: string }) {
  // Sales: a horizontal "memory rail" — nodes connected along a hairline, with
  // an occasional cross-link suggesting prior context surfaced before a meeting.
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 600 200"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <line x1="40" y1="120" x2="560" y2="120" stroke={accent} strokeWidth="0.6" opacity="0.55" />
      {[80, 170, 260, 350, 440, 530].map((cx, i) => {
        const r = i === 2 ? 5 : i === 4 ? 4.5 : 3
        return (
          <g key={cx} opacity={i === 2 || i === 4 ? 0.95 : 0.65}>
            <circle cx={cx} cy="120" r={r + 6} fill={accent} opacity="0.06" />
            <circle cx={cx} cy="120" r={r} fill={accent} opacity="0.85" />
          </g>
        )
      })}
      {/* Cross-links — the "what connects before it is obvious" idea */}
      <path d="M170 120 C 200 70, 320 70, 350 120" stroke={accent} strokeWidth="0.5" opacity="0.35" fill="none" />
      <path d="M260 120 C 310 175, 410 175, 440 120" stroke={accent} strokeWidth="0.5" opacity="0.30" fill="none" />
      {/* Faint upper "memory cards" suggesting prior conversations */}
      {[80, 260, 440].map((cx) => (
        <g key={`card-${cx}`} opacity="0.30">
          <rect x={cx - 26} y="58" width="52" height="22" rx="3" fill="none" stroke={accent} strokeWidth="0.4" />
          <line x1={cx - 18} y1="66" x2={cx + 12} y2="66" stroke={accent} strokeWidth="0.4" opacity="0.7" />
          <line x1={cx - 18} y1="72" x2={cx + 6} y2="72" stroke={accent} strokeWidth="0.4" opacity="0.5" />
        </g>
      ))}
    </svg>
  )
}

function ThreadsDiagram({ accent }: { accent: string }) {
  // Editorial: a horizontal multi-track timeline. Three story tracks running
  // left-to-right, with markers (interviews, notes, sources) along each, and a
  // single thematic thread connecting markers across tracks — the recurring
  // pattern editorial teams want to preserve across projects and time.
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 720 220"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Three horizontal tracks */}
      {[
        { y: 70, op: 0.55 },
        { y: 120, op: 0.85 },
        { y: 170, op: 0.55 },
      ].map(({ y, op }) => (
        <line
          key={y}
          x1="60"
          y1={y}
          x2="660"
          y2={y}
          stroke={accent}
          strokeWidth="0.5"
          opacity={op}
        />
      ))}

      {/* Markers along each track — varied densities for an editorial feel */}
      {[
        { y: 70, xs: [110, 200, 320, 460, 560] },
        { y: 120, xs: [90, 180, 270, 380, 470, 580, 640] },
        { y: 170, xs: [140, 260, 380, 520, 600] },
      ].map(({ y, xs }) =>
        xs.map((x) => {
          const featured = (x + y) % 7 === 0
          return (
            <g key={`${x}-${y}`} opacity={featured ? 0.95 : 0.45}>
              {featured && <circle cx={x} cy={y} r="6" fill={accent} opacity="0.10" />}
              <circle cx={x} cy={y} r={featured ? 3 : 1.8} fill={accent} opacity={featured ? 0.85 : 0.55} />
            </g>
          )
        })
      )}

      {/* The recurring thematic thread — passes through three markers across
          the three tracks. Single curve, no chrome. */}
      <path
        d="M 200 70 C 240 70, 240 120, 270 120 C 320 120, 340 170, 380 170"
        stroke={accent}
        strokeWidth="0.7"
        fill="none"
        opacity="0.55"
      />
      {/* Echo of the same theme — same curve shape, later in time */}
      <path
        d="M 460 70 C 500 70, 500 120, 580 120"
        stroke={accent}
        strokeWidth="0.6"
        fill="none"
        opacity="0.40"
        strokeDasharray="2 3"
      />

      {/* Track labels — tiny tick marks at the start so the tracks read as ordered */}
      {[70, 120, 170].map((y) => (
        <line key={`tick-${y}`} x1="50" y1={y} x2="60" y2={y} stroke={accent} strokeWidth="0.5" opacity="0.6" />
      ))}
    </svg>
  )
}

function ColumnsDiagram({ accent }: { accent: string }) {
  // Marketing: three overlapping authored outputs — a Newsletter, a Board
  // Brief, and an Investor Memo. Each "publication" carries a masthead bar, a
  // serif title block and a couple of body lines, plus a signature dash. They
  // overlap slightly so the system reads as multiple finished artefacts coming
  // from the same internal source — not as blank stationery.
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 720 360"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* ── Card 3 (back / right) — Investor Memo ─────────────────────────── */}
      <g opacity="0.65" transform="translate(420 70) rotate(2.5)">
        <rect width="200" height="240" rx="3" fill={accent} fillOpacity="0.05" stroke={accent} strokeOpacity="0.42" strokeWidth="0.5" />
        {/* Masthead band */}
        <rect x="0" y="0" width="200" height="14" fill={accent} fillOpacity="0.18" />
        <line x1="14" y1="7" x2="48" y2="7" stroke={accent} strokeWidth="0.6" opacity="0.85" />
        {/* Title — three short lines, decreasing length */}
        <line x1="16" y1="42" x2="170" y2="42" stroke={accent} strokeWidth="1.6" opacity="0.55" />
        <line x1="16" y1="56" x2="140" y2="56" stroke={accent} strokeWidth="1.6" opacity="0.45" />
        {/* Body */}
        {Array.from({ length: 8 }).map((_, i) => (
          <line
            key={i}
            x1="16"
            y1={92 + i * 14}
            x2={i % 4 === 3 ? 110 : 168}
            y2={92 + i * 14}
            stroke={accent}
            strokeWidth="0.5"
            opacity="0.30"
          />
        ))}
        {/* Signature mark */}
        <line x1="16" y1="220" x2="60" y2="220" stroke={accent} strokeWidth="0.7" opacity="0.55" />
      </g>

      {/* ── Card 2 (middle) — Board Brief ─────────────────────────────────── */}
      <g opacity="0.85" transform="translate(240 50) rotate(-1.5)">
        <rect width="200" height="270" rx="3" fill={accent} fillOpacity="0.06" stroke={accent} strokeOpacity="0.50" strokeWidth="0.5" />
        <rect x="0" y="0" width="200" height="14" fill={accent} fillOpacity="0.22" />
        <line x1="14" y1="7" x2="56" y2="7" stroke={accent} strokeWidth="0.6" opacity="0.95" />
        {/* Title block — featured */}
        <line x1="16" y1="42" x2="184" y2="42" stroke={accent} strokeWidth="2.0" opacity="0.75" />
        <line x1="16" y1="58" x2="148" y2="58" stroke={accent} strokeWidth="2.0" opacity="0.65" />
        <line x1="16" y1="74" x2="100" y2="74" stroke={accent} strokeWidth="2.0" opacity="0.55" />
        {/* Body */}
        {Array.from({ length: 9 }).map((_, i) => (
          <line
            key={i}
            x1="16"
            y1={108 + i * 14}
            x2={i % 4 === 2 ? 120 : 180}
            y2={108 + i * 14}
            stroke={accent}
            strokeWidth="0.5"
            opacity="0.40"
          />
        ))}
        <line x1="16" y1="248" x2="68" y2="248" stroke={accent} strokeWidth="0.7" opacity="0.65" />
      </g>

      {/* ── Card 1 (front / left) — Newsletter ────────────────────────────── */}
      <g opacity="0.95" transform="translate(80 80) rotate(-3.5)">
        <rect width="200" height="230" rx="3" fill={accent} fillOpacity="0.05" stroke={accent} strokeOpacity="0.45" strokeWidth="0.5" />
        <rect x="0" y="0" width="200" height="14" fill={accent} fillOpacity="0.18" />
        <line x1="14" y1="7" x2="42" y2="7" stroke={accent} strokeWidth="0.6" opacity="0.85" />
        {/* Title */}
        <line x1="16" y1="42" x2="160" y2="42" stroke={accent} strokeWidth="1.6" opacity="0.55" />
        <line x1="16" y1="56" x2="120" y2="56" stroke={accent} strokeWidth="1.6" opacity="0.45" />
        {/* Body */}
        {Array.from({ length: 8 }).map((_, i) => (
          <line
            key={i}
            x1="16"
            y1={88 + i * 14}
            x2={i % 4 === 1 ? 100 : 172}
            y2={88 + i * 14}
            stroke={accent}
            strokeWidth="0.5"
            opacity="0.32"
          />
        ))}
        <line x1="16" y1="208" x2="58" y2="208" stroke={accent} strokeWidth="0.7" opacity="0.55" />
      </g>
    </svg>
  )
}

function GridDiagram({ accent }: { accent: string }) {
  // Leadership: a coordinate grid — restrained dot field with a few highlighted
  // nodes and a single crosshair, suggesting visibility and decisions made from
  // a position above the noise.
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 600 200"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Background dot field */}
      {Array.from({ length: 10 }).map((_, row) =>
        Array.from({ length: 30 }).map((__, col) => {
          const cx = 20 + col * 20
          const cy = 12 + row * 20
          return <circle key={`${row}-${col}`} cx={cx} cy={cy} r="0.9" fill={accent} opacity="0.32" />
        })
      )}
      {/* Highlighted nodes */}
      {[
        { x: 160, y: 72 },
        { x: 300, y: 112 },
        { x: 440, y: 52 },
        { x: 380, y: 152 },
      ].map(({ x, y }) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r="6" fill={accent} opacity="0.10" />
          <circle cx={x} cy={y} r="2" fill={accent} opacity="0.85" />
        </g>
      ))}
      {/* Connecting hairlines between highlighted nodes — the "pattern" leadership sees */}
      <path
        d="M160 72 L 300 112 L 440 52 M 300 112 L 380 152"
        stroke={accent}
        strokeWidth="0.6"
        fill="none"
        opacity="0.40"
      />
      {/* Crosshair anchored on the central node */}
      <g opacity="0.55">
        <line x1="300" y1="92" x2="300" y2="132" stroke={accent} strokeWidth="0.5" />
        <line x1="280" y1="112" x2="320" y2="112" stroke={accent} strokeWidth="0.5" />
      </g>
    </svg>
  )
}

// ─── AudiencePanel ────────────────────────────────────────────────────────────
//
// Replacement for the previous photo cards. Renders as a self-contained tinted
// panel: tonal wash + dot grid + diagonal glow + abstract diagram + typography.
// Composition (where the text lives, where the diagram sits) is controlled by
// the `composition` prop so each audience can carry a slightly different rhythm
// without breaking the family resemblance.

type Composition = "wide" | "cinematic" | "portrait" | "square" | "band"

function AudiencePanel({
  tone,
  index,
  label,
  headline,
  composition,
  diagram,
}: {
  tone: Tone
  index: string
  label: string
  headline: string
  composition: Composition
  diagram: "rail" | "threads" | "columns" | "grid"
}) {
  const c = TONES[tone]

  const aspectClass =
    composition === "wide"
      ? "aspect-[21/9]"
      : composition === "cinematic"
      ? "aspect-[16/7]"
      : composition === "portrait"
      ? "aspect-[3/4]"
      : composition === "square"
      ? "aspect-square"
      : "aspect-[3/1]"

  // Anchor the typographic block in different corners per composition. This is
  // what creates rhythm across the four panels without changing the underlying
  // panel logic.
  const textAnchor =
    composition === "wide"
      ? "items-end justify-start text-left max-w-[58%]"
      : composition === "cinematic"
      ? "items-end justify-start text-left max-w-[62%]"
      : composition === "portrait"
      ? "items-start justify-end text-left max-w-[80%]"
      : composition === "square"
      ? "items-start justify-end text-left max-w-[78%]"
      : "items-center justify-start text-left max-w-[55%]"

  return (
    <div
      className={`relative w-full overflow-hidden rounded-2xl ${aspectClass}`}
      style={{
        // Slightly lighter than the page base so the panel reads as a real
        // surface lifted above the section, not as a flat colour swatch.
        background: `${c.wash}, linear-gradient(180deg, #0A1224 0%, #08101F 100%)`,
        border: `1px solid ${c.border}`,
        boxShadow:
          "0 32px 90px -28px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.018) inset",
      }}
    >
      {/* Tonal off-axis glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: c.glow }} />

      {/* Fine dot grid — the same atomic texture used elsewhere in the panel system */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, ${c.pattern} 1px, transparent 1px)`,
          backgroundSize: "22px 22px",
        }}
      />

      {/* Hairline framing — a faint inner border shaved 8px in. Adds depth. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-2 rounded-xl"
        style={{ border: "1px solid rgba(255,255,255,0.025)" }}
      />

      {/* Abstract diagram — sits under the text with low contrast */}
      <div className="absolute inset-0 opacity-[0.85]">
        {diagram === "rail" && <RailDiagram accent={c.accent} />}
        {diagram === "threads" && <ThreadsDiagram accent={c.accent} />}
        {diagram === "columns" && <ColumnsDiagram accent={c.accent} />}
        {diagram === "grid" && <GridDiagram accent={c.accent} />}
      </div>

      {/* Index numeral — engraved-feeling, top-right */}
      <p
        className="absolute top-5 right-6 font-serif text-[42px] font-normal leading-none tracking-[-0.04em] md:text-[52px]"
        style={{ color: "rgba(255,255,255,0.07)" }}
      >
        {index}
      </p>

      {/* Soft shading at the bottom so the headline sits on a quieter surface */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(6,13,28,0.55) 0%, rgba(6,13,28,0.20) 30%, transparent 60%)",
        }}
      />

      {/* Typography block */}
      <div className={`relative z-10 flex h-full flex-col p-7 md:p-10 ${textAnchor}`}>
        <p
          className="mb-3 text-[10.5px] font-semibold uppercase tracking-[0.16em]"
          style={{ color: c.accentText }}
        >
          {label}
        </p>
        <p
          className="font-serif text-[1.35rem] font-normal leading-[1.14] tracking-[-0.022em] text-white sm:text-[1.55rem] md:text-[1.85rem] lg:text-[2.1rem]"
        >
          {headline}
        </p>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function UseCasesPage() {
  const t = await getServerT()
  const u = t.useCases

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#060D1C" }}>
      <Header />

      {/* Textures */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{ backgroundImage: GRAIN_BG, backgroundRepeat: "repeat", backgroundSize: "300px 300px", opacity: 0.035 }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{ backgroundImage: DOT_GRID, backgroundRepeat: "repeat", backgroundSize: "24px 24px", opacity: 0.022 }}
      />

      <main className="relative z-10 overflow-x-hidden">

        {/* ── HERO ──────────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 100% 60% at 50% -10%, rgba(10,22,52,0.92) 0%, transparent 60%)",
            }}
          />
          <div className="relative mx-auto max-w-5xl px-6 pb-20 pt-32 md:pb-24 md:pt-44">
            <p
              className="mb-5 text-[11px] font-medium uppercase tracking-[0.14em]"
              style={{ color: "rgba(255,255,255,0.28)" }}
            >
              {u.eyebrow}
            </p>
            <h1 className="mb-7 max-w-2xl font-serif text-5xl font-normal leading-[1.05] tracking-[-0.032em] text-white md:text-6xl lg:text-[4rem]">
              {u.headline}
            </h1>
            <p
              className="max-w-xl text-[16px] leading-[1.82] tracking-[-0.011em]"
              style={{ color: "rgba(255,255,255,0.48)" }}
            >
              {u.intro}
            </p>

            <div
              aria-hidden="true"
              className="mt-16 h-px"
              style={{ background: "rgba(255,255,255,0.07)" }}
            />
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            01 — Sales Teams · steel · wide rail panel above, copy below
        ════════════════════════════════════════════════════════════════════ */}
        <section
          id="sales"
          className="relative border-t border-white/[0.06]"
          style={{ background: "#060D1C" }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(10,22,48,0.55) 0%, transparent 60%)",
            }}
          />

          <div className="relative mx-auto max-w-5xl px-6 pt-20 md:pt-28">
            <AudiencePanel
              tone="steel"
              index="01"
              label={u.sales.label}
              headline={u.sales.headline}
              composition="wide"
              diagram="rail"
            />

            <div className="mx-auto mt-10 max-w-2xl pb-24 text-center">
              <p
                className="text-[15px] leading-[1.82] tracking-[-0.011em]"
                style={{ color: "rgba(255,255,255,0.50)" }}
              >
                {u.sales.body}
              </p>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            02 — Editorial Teams · sage · wide band panel above,
            body left + bullets right (text-leading rhythm)
        ════════════════════════════════════════════════════════════════════ */}
        <section
          id="editorial"
          className="relative border-t border-white/[0.06]"
          style={{ background: "#060D1C" }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 55% at 18% 40%, rgba(16,32,24,0.55) 0%, transparent 65%)",
            }}
          />

          <div className="relative mx-auto max-w-5xl px-6 pt-20 md:pt-28">
            <AudiencePanel
              tone="sage"
              index="02"
              label={u.editorial.label}
              headline={u.editorial.headline}
              composition="cinematic"
              diagram="threads"
            />

            <div className="mt-10 grid grid-cols-1 gap-10 pb-24 lg:grid-cols-[3fr_2fr] lg:gap-20">
              <p
                className="text-[15px] leading-[1.82] tracking-[-0.011em]"
                style={{ color: "rgba(255,255,255,0.50)" }}
              >
                {u.editorial.body}
              </p>
              <div className="space-y-3 lg:pt-1">
                {u.editorial.points.map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <div
                      className="mt-[7px] h-[4px] w-[4px] shrink-0 rounded-full"
                      style={{ background: TONES.sage.accent }}
                    />
                    <p
                      className="text-[13.5px] leading-[1.70] tracking-[-0.010em]"
                      style={{ color: "rgba(255,255,255,0.50)" }}
                    >
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            03 — Marketing Teams · plum · wide band panel above,
            bullets left + body right (mirrored rhythm vs editorial)
        ════════════════════════════════════════════════════════════════════ */}
        <section
          id="marketing"
          className="relative border-t border-white/[0.06]"
          style={{ background: "#060D1C" }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 55% at 82% 40%, rgba(28,18,40,0.55) 0%, transparent 65%)",
            }}
          />

          <div className="relative mx-auto max-w-5xl px-6 pt-20 md:pt-28">
            <AudiencePanel
              tone="plum"
              index="03"
              label={u.marketing.label}
              headline={u.marketing.headline}
              composition="cinematic"
              diagram="columns"
            />

            <div className="mt-10 grid grid-cols-1 gap-10 pb-24 lg:grid-cols-[2fr_3fr] lg:gap-20">
              <div className="space-y-3 lg:pt-1">
                {u.marketing.points.map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <div
                      className="mt-[7px] h-[4px] w-[4px] shrink-0 rounded-full"
                      style={{ background: TONES.plum.accent }}
                    />
                    <p
                      className="text-[13.5px] leading-[1.70] tracking-[-0.010em]"
                      style={{ color: "rgba(255,255,255,0.50)" }}
                    >
                      {point}
                    </p>
                  </div>
                ))}
              </div>
              <p
                className="text-[15px] leading-[1.82] tracking-[-0.011em]"
                style={{ color: "rgba(255,255,255,0.50)" }}
              >
                {u.marketing.body}
              </p>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            04 — Leadership & Strategy · stone · horizontal band + cards below
        ════════════════════════════════════════════════════════════════════ */}
        <section
          id="leadership"
          className="relative border-t border-white/[0.06]"
          style={{ background: "#060D1C" }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 45% at 50% 20%, rgba(28,24,18,0.55) 0%, transparent 60%)",
            }}
          />

          <div className="relative mx-auto max-w-5xl px-6 pt-20 md:pt-28">
            <AudiencePanel
              tone="stone"
              index="04"
              label={u.leadership.label}
              headline={u.leadership.headline}
              composition="band"
              diagram="grid"
            />

            <div className="mt-10 grid grid-cols-1 gap-10 pb-24 lg:grid-cols-[3fr_2fr] lg:gap-20">
              <div>
                <p
                  className="text-[15px] leading-[1.82] tracking-[-0.011em]"
                  style={{ color: "rgba(255,255,255,0.50)" }}
                >
                  {u.leadership.body}
                </p>
              </div>
              <div className="flex flex-col justify-end gap-3">
                {u.leadership.cards.map(({ label, body }) => (
                  <div
                    key={label}
                    className="rounded-xl px-5 py-4"
                    style={{
                      background: "rgba(255,255,255,0.022)",
                      border: `1px solid ${TONES.stone.border}`,
                    }}
                  >
                    <p
                      className="mb-1 text-[12px] font-semibold tracking-[-0.010em]"
                      style={{ color: TONES.stone.accentText }}
                    >
                      {label}
                    </p>
                    <p
                      className="text-[12px] leading-[1.68] tracking-[-0.008em]"
                      style={{ color: "rgba(255,255,255,0.42)" }}
                    >
                      {body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CLOSING — audience summary strip ──────────────────────────────── */}
        <section
          className="relative border-t border-white/[0.06]"
          style={{ background: "#060D1C" }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(6,14,44,0.65) 0%, transparent 65%)",
            }}
          />
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

          <div className="relative mx-auto max-w-5xl px-6 py-20 md:py-24">
            <div
              className="grid grid-cols-2 gap-px md:grid-cols-4"
              style={{ background: "rgba(255,255,255,0.06)" }}
            >
              {u.summary.map(({ audience, short }, i) => {
                const tone: Tone = (["steel", "sage", "plum", "stone"] as const)[i] ?? "steel"
                return (
                  <div
                    key={audience}
                    className="flex flex-col gap-2 p-6 md:p-8"
                    style={{ background: "#060D1C" }}
                  >
                    <p
                      className="text-[10px] font-semibold uppercase tracking-[0.11em]"
                      style={{ color: TONES[tone].accentText }}
                    >
                      {audience}
                    </p>
                    <p
                      className="font-serif text-[16px] font-normal leading-[1.25] tracking-[-0.016em] text-white md:text-[17px]"
                    >
                      {short}
                    </p>
                  </div>
                )
              })}
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
                  {u.cta.headline}
                </h2>
                <p
                  className="mt-2 text-[14px] leading-[1.70] tracking-[-0.010em]"
                  style={{ color: "rgba(255,255,255,0.42)" }}
                >
                  {u.cta.body}
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                <RequestDemoButton>{t.shared.ctaStrip.requestDemo}</RequestDemoButton>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-[-0.011em] transition-colors hover:bg-white/[0.06]"
                  style={{ border: "1px solid rgba(255,255,255,0.14)", color: "rgba(255,255,255,0.60)" }}
                >
                  {t.shared.ctaStrip.explorePlatform}
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
            {t.shared.footerNav.back}
          </Link>
          <Link
            href="/request-demo"
            className="text-[12px] font-medium tracking-[-0.011em] transition-opacity hover:opacity-80"
            style={{ color: "rgba(255,255,255,0.50)" }}
          >
            {t.shared.footerNav.requestDemo}
          </Link>
        </footer>
      </main>
    </div>
  )
}
