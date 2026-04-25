"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"

// ─── Scene dimensions ─────────────────────────────────────────────────────────

const VW = 1440
const VH = 460

// ─── Types ────────────────────────────────────────────────────────────────────

type Depth = 0 | 1 | 2 | 3
type Kind  = "person" | "company" | "region" | "government" | "document" | "theme"

interface Entity {
  id:    string
  label: string
  role:  string
  kind:  Kind
  cx:    number   // card center x
  cy:    number   // card center y
  w:     number   // card width
  depth: Depth
}

interface Link {
  id: string
  a:  string
  b:  string
}

// ─── Visual constants by depth ────────────────────────────────────────────────
//
// Depth 0: full intelligence card — kind label + colored accent + name + role
//          + connection metadata. Reads as a sharp foreground entity.
// Depth 1: secondary card — name + role + small kind dot. Slight defocus.
// Depth 2: ambient context card — name + small kind dot. Stronger defocus.
// Depth 3: ghost text label, no card surface — uses hit rect for hover.

const CARD_H: Record<Depth, number>    = { 0: 60,   1: 46,   2: 32,   3: 0    }
const CARD_BG: Record<Depth, number>   = { 0: 0.97, 1: 0.93, 2: 0.86, 3: 0    }
const CARD_BD: Record<Depth, number>   = { 0: 0.24, 1: 0.14, 2: 0.08, 3: 0    }
const D_OPACITY: Record<Depth, number> = { 0: 1.00, 1: 0.82, 2: 0.58, 3: 0.38 }
const D_NAME: Record<Depth, number>    = { 0: 0.88, 1: 0.72, 2: 0.54, 3: 0.26 }
const D_ROLE: Record<Depth, number>    = { 0: 0.46, 1: 0.34, 2: 0,    3: 0    }
const D_TYPE: Record<Depth, number>    = { 0: 0.32, 1: 0,    2: 0,    3: 0    }
const D_META: Record<Depth, number>    = { 0: 0.30, 1: 0,    2: 0,    3: 0    }
const D_BLUR: Record<Depth, string | undefined> = {
  0: undefined,
  1: "fes-b1",
  2: "fes-b2",
  3: "fes-b3",
}

const PAD_X = 12

const KIND_LABEL: Record<Kind, string> = {
  person:     "PERSON",
  company:    "COMPANY",
  region:     "REGION",
  government: "GOVERNMENT",
  document:   "DOCUMENT",
  theme:      "THEME",
}

// Entity-type colour system — aligned with the dashboard panel palette so
// the floating cards read as part of the same product language. Used as the
// left accent stripe, the type dot, and the on-hover top hairline.
const KIND_COLOR: Record<Kind, string> = {
  person:     "#5B9CF6", // blue
  company:    "#34D399", // green
  government: "#A78BFA", // violet
  document:   "#7DD3FC", // cyan
  region:     "#FBBF24", // amber
  theme:      "#94A3B8", // slate (neutral for abstract themes)
}

// ─── Entity data ──────────────────────────────────────────────────────────────

const ENTITIES: Entity[] = [
  // ── Depth 0 — three primary intelligence nodes ───────────────────────────
  { id: "santos",    label: "Adrian Santos",            role: "Chief Executive Officer", kind: "person",     cx: 352,  cy: 232, w: 164, depth: 0 },
  { id: "manila",    label: "Manila Energy",            role: "Portfolio Company",       kind: "company",    cx: 648,  cy: 152, w: 152, depth: 0 },
  { id: "strategy",  label: "Strategic Expansion Plan", role: "Internal Document",       kind: "document",   cx: 940,  cy: 216, w: 200, depth: 0 },

  // ── Depth 1 — seven secondary nodes ─────────────────────────────────────
  { id: "mperez",    label: "Maria Perez",              role: "Chief Operating Officer", kind: "person",     cx: 178,  cy: 196, w: 134, depth: 1 },
  { id: "chile_m",   label: "Chile Ministry of Energy", role: "Regulatory Authority",   kind: "government", cx: 806,  cy: 312, w: 200, depth: 1 },
  { id: "andes",     label: "Andes Power",              role: "Energy Partner",          kind: "company",    cx: 554,  cy: 308, w: 138, depth: 1 },
  { id: "q3memo",    label: "Q3 Board Memo",            role: "Internal Document",       kind: "document",   cx: 1152, cy: 130, w: 152, depth: 1 },
  { id: "meridian",  label: "Meridian Capital",         role: "Strategic Investor",      kind: "company",    cx: 1292, cy: 228, w: 158, depth: 1 },
  { id: "colombia",  label: "Colombia",                 role: "Target Market",           kind: "region",     cx: 272,  cy: 392, w: 122, depth: 1 },
  { id: "southam",   label: "South America",            role: "Expansion Region",        kind: "region",     cx: 444,  cy: 404, w: 150, depth: 1 },

  // ── Depth 2 — nine background context nodes ──────────────────────────────
  { id: "evasquez",  label: "Elena Vasquez",            role: "Country Director",        kind: "person",     cx: 80,   cy: 300, w: 136, depth: 2 },
  { id: "gulf",      label: "Gulf Capital Partners",    role: "Regional Investor",       kind: "company",    cx: 1088, cy: 80,  w: 174, depth: 2 },
  { id: "pacific",   label: "Pacific Grid Corp",        role: "Regional Operator",       kind: "company",    cx: 948,  cy: 356, w: 152, depth: 2 },
  { id: "creg",      label: "Colombia CREG",            role: "Energy Regulator",        kind: "government", cx: 686,  cy: 382, w: 140, depth: 2 },
  { id: "panama",    label: "Panama",                   role: "Gateway Market",          kind: "region",     cx: 312,  cy: 162, w: 104, depth: 2 },
  { id: "jbradford", label: "James Bradford",           role: "Board Advisor",           kind: "person",     cx: 182,  cy: 342, w: 148, depth: 2 },
  { id: "peru",      label: "Peru",                     role: "Adjacent Market",         kind: "region",     cx: 84,   cy: 430, w: 90,  depth: 2 },
  { id: "latam",     label: "Latam Infrastructure",     role: "Strategic Partner",       kind: "company",    cx: 852,  cy: 418, w: 170, depth: 2 },
  { id: "chile_r",   label: "Chile",                    role: "Target Market",           kind: "region",     cx: 664,  cy: 428, w: 90,  depth: 2 },

  // ── Depth 3 — eleven ghost signal nodes (text labels, no card box) ───────
  { id: "cmatos",    label: "Carlos Matos",             role: "", kind: "person",     cx: 402,  cy: 453, w: 128, depth: 3 },
  { id: "brazil",    label: "Brazil",                   role: "", kind: "region",     cx: 86,   cy: 148, w: 82,  depth: 3 },
  { id: "etr",       label: "Energy Transition",        role: "", kind: "theme",      cx: 450,  cy: 76,  w: 152, depth: 3 },
  { id: "ppa",       label: "Panama Port Authority",    role: "", kind: "government", cx: 300,  cy: 92,  w: 172, depth: 3 },
  { id: "horizon",   label: "Horizon Infrastructure",   role: "", kind: "company",    cx: 748,  cy: 70,  w: 168, depth: 3 },
  { id: "perumin",   label: "Peru Ministry of Mines",   role: "", kind: "government", cx: 52,   cy: 218, w: 156, depth: 3 },
  { id: "braneel",   label: "Brazil ANEEL",             role: "", kind: "government", cx: 218,  cy: 456, w: 114, depth: 3 },
  { id: "mef",       label: "Market Entry Framework",   role: "", kind: "document",   cx: 1180, cy: 372, w: 180, depth: 3 },
  { id: "singapore", label: "Singapore",                role: "", kind: "region",     cx: 1378, cy: 162, w: 102, depth: 3 },
  { id: "regcred",   label: "Regional Credibility",     role: "", kind: "theme",      cx: 1330, cy: 348, w: 164, depth: 3 },
  { id: "soco",      label: "Southern Cross Energy",    role: "", kind: "company",    cx: 1082, cy: 440, w: 180, depth: 3 },
]

// ─── Connection data ──────────────────────────────────────────────────────────

const LINKS: Link[] = [
  // Core triangle (depth 0–0)
  { id: "l1",  a: "santos",    b: "manila"    },
  { id: "l2",  a: "santos",    b: "strategy"  },
  { id: "l3",  a: "manila",    b: "strategy"  },

  // Primary spokes (depth 0–1)
  { id: "l4",  a: "santos",    b: "mperez"    },
  { id: "l5",  a: "manila",    b: "chile_m"   },
  { id: "l6",  a: "manila",    b: "andes"     },
  { id: "l7",  a: "strategy",  b: "q3memo"    },
  { id: "l8",  a: "strategy",  b: "chile_m"   },
  { id: "l9",  a: "santos",    b: "colombia"  },
  { id: "l10", a: "andes",     b: "southam"   },

  // Secondary links (depth 1–1 and 1–2)
  { id: "l11", a: "mperez",    b: "evasquez"  },
  { id: "l12", a: "mperez",    b: "jbradford" },
  { id: "l13", a: "andes",     b: "pacific"   },
  { id: "l14", a: "chile_m",   b: "creg"      },
  { id: "l15", a: "colombia",  b: "southam"   },
  { id: "l16", a: "southam",   b: "peru"      },
  { id: "l17", a: "southam",   b: "latam"     },
  { id: "l18", a: "q3memo",    b: "gulf"      },
  { id: "l19", a: "meridian",  b: "gulf"      },
  { id: "l20", a: "santos",    b: "panama"    },

  // Background threads (depth 2–2 and 2–3)
  { id: "l21", a: "pacific",   b: "chile_r"   },
  { id: "l22", a: "peru",      b: "perumin"   },
  { id: "l23", a: "jbradford", b: "cmatos"    },
  { id: "l24", a: "strategy",  b: "mef"       },
  { id: "l25", a: "manila",    b: "gulf"      },
]

const EL = Object.fromEntries(ENTITIES.map(e => [e.id, e]))

// Precomputed connection count per entity — drives the metadata footer on
// foreground intelligence cards so the figure is real (not decorative).
const LINK_COUNT: Record<string, number> = ENTITIES.reduce((acc, e) => {
  acc[e.id] = LINKS.filter(l => l.a === e.id || l.b === e.id).length
  return acc
}, {} as Record<string, number>)

// ─── Helpers ──────────────────────────────────────────────────────────────────

function arcPath(ax: number, ay: number, bx: number, by: number): string {
  const mx  = (ax + bx) / 2
  const my  = (ay + by) / 2
  const dx  = bx - ax
  const dy  = by - ay
  const len = Math.sqrt(dx * dx + dy * dy)
  if (len < 1) return `M${ax},${ay}L${bx},${by}`
  // Very slight curve — keeps lines clean and legible
  const off = Math.min(len * 0.06, 20)
  const cpx = mx - (dy / len) * off
  const cpy = my + (dx / len) * off
  return `M${ax},${ay}Q${cpx},${cpy}${bx},${by}`
}

// Line appearance derived from max depth of the two connected entities
function lineProps(ea: Entity, eb: Entity, isActive: boolean, hasHovered: boolean) {
  const md = Math.max(ea.depth, eb.depth) as Depth
  const baseOpacity = md === 0 ? 0.26 : md === 1 ? 0.17 : md === 2 ? 0.10 : 0.06
  const baseWidth   = md === 0 ? 0.85 : md === 1 ? 0.65 : md === 2 ? 0.50 : 0.38
  return {
    opacity:     hasHovered ? (isActive ? 0.58 : 0.024) : baseOpacity,
    strokeWidth: isActive && hasHovered ? 1.1 : baseWidth,
    stroke:      isActive && hasHovered
      ? "rgba(148,180,244,1)"
      : "rgba(112,140,205,1)",
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

export function FloatingEntityScene({ className = "" }: { className?: string }) {
  const [hovered, setHovered] = useState<string | null>(null)

  const connectedIds = useMemo(() => {
    if (!hovered) return new Set<string>()
    const s = new Set<string>([hovered])
    for (const l of LINKS) {
      if (l.a === hovered) s.add(l.b)
      if (l.b === hovered) s.add(l.a)
    }
    return s
  }, [hovered])

  const activeLinkIds = useMemo(() => {
    if (!hovered) return new Set<string>()
    return new Set(
      LINKS.filter(l => l.a === hovered || l.b === hovered).map(l => l.id)
    )
  }, [hovered])

  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      {/* Left edge fade — blends network into section margins */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20"
        style={{ background: "linear-gradient(to right, #060D1C, transparent)" }}
      />
      {/* Right edge fade */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20"
        style={{ background: "linear-gradient(to left, #060D1C, transparent)" }}
      />
      {/* Bottom fade — scene dissolves into the next section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-28"
        style={{ background: "linear-gradient(to top, #060D1C 10%, transparent)" }}
      />
      {/* Top fade — softens entry into entity field from copy above */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16"
        style={{ background: "linear-gradient(to bottom, #060D1C 20%, transparent)" }}
      />

      <svg
        viewBox={`0 0 ${VW} ${VH}`}
        className="relative z-0 w-full"
        style={{ display: "block" }}
        aria-hidden
      >
        <defs>
          {/* Depth blur filters — progressive defocus for spatial depth */}
          <filter id="fes-b1" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="0.5" />
          </filter>
          <filter id="fes-b2" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.1" />
          </filter>
          <filter id="fes-b3" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.8" />
          </filter>
        </defs>

        {/* ── Connection lines ── */}
        {LINKS.map((link, i) => {
          const ea = EL[link.a]
          const eb = EL[link.b]
          if (!ea || !eb) return null
          const isActive = activeLinkIds.has(link.id)
          const lp = lineProps(ea, eb, isActive, !!hovered)
          return (
            <motion.path
              key={link.id}
              d={arcPath(ea.cx, ea.cy, eb.cx, eb.cy)}
              fill="none"
              strokeLinecap="round"
              initial={{ opacity: 0, pathLength: 0 }}
              animate={{
                opacity:     lp.opacity,
                pathLength:  1,
                stroke:      lp.stroke,
                strokeWidth: lp.strokeWidth,
              }}
              transition={{
                pathLength:  { duration: 1.1, delay: 0.5 + i * 0.055, ease: "easeInOut" },
                opacity:     { duration: 0.28 },
                strokeWidth: { duration: 0.20 },
                stroke:      { duration: 0.20 },
              }}
            />
          )
        })}

        {/* ── Entity cards ── */}
        {ENTITIES.map((entity, idx) => {
          const isHov  = entity.id === hovered
          const isConn = connectedIds.has(entity.id)
          const baseO  = D_OPACITY[entity.depth]
          const tgtO   = hovered
            ? (isHov || isConn ? Math.max(baseO, 0.92) : 0.10)
            : baseO

          const H = CARD_H[entity.depth]
          const x = entity.cx - entity.w / 2
          const y = entity.cy - H / 2

          // Hover on a deep entity snaps it into sharp focus
          const blurId  = D_BLUR[entity.depth]
          const applyBlur = blurId && !(isHov && entity.depth > 0)

          return (
            <g
              key={entity.id}
              style={{
                filter: applyBlur ? `url(#${blurId})` : undefined,
                transition: "filter 0.18s ease",
              }}
              onMouseEnter={() => setHovered(entity.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: tgtO }}
                transition={{
                  opacity: {
                    duration: 0.32,
                    // Staggered mount fade-in; hover transitions are immediate
                    delay: hovered ? 0 : 0.25 + idx * 0.035,
                  },
                }}
              >
                {/* ── Depth 3: ghost label — text only, invisible hit rect ── */}
                {entity.depth === 3 ? (
                  <>
                    <rect
                      x={x}
                      y={entity.cy - 12}
                      width={entity.w}
                      height={24}
                      fill="rgba(0,0,0,0)"
                      style={{ cursor: "default" }}
                    />
                    <text
                      x={entity.cx}
                      y={entity.cy + 4}
                      textAnchor="middle"
                      fontSize={9.5}
                      fontFamily="Inter, system-ui, sans-serif"
                      fontWeight={isHov ? "500" : "400"}
                      letterSpacing="0.01em"
                      fill={`rgba(255,255,255,${isHov ? 0.70 : D_NAME[3]})`}
                      style={{ pointerEvents: "none", transition: "fill 0.16s" }}
                    >
                      {entity.label}
                    </text>
                  </>
                ) : (
                  /* ── Depth 0–2: structured intelligence cards ── */
                  <>
                    {/* Card surface */}
                    <rect
                      x={x} y={y}
                      width={entity.w} height={H}
                      rx={6}
                      fill={`rgba(9,17,36,${CARD_BG[entity.depth]})`}
                      stroke={`rgba(168,180,210,${isHov ? 0.34 : CARD_BD[entity.depth]})`}
                      strokeWidth={1}
                      style={{ cursor: "default" }}
                    />

                    {/* Inner top specular — 1px white sliver gives the card
                        a subtle panel-like edge highlight. Skipped on the
                        deepest cards to keep them visually receded. */}
                    {entity.depth <= 1 && (
                      <rect
                        x={x + 4} y={y + 1}
                        width={entity.w - 8} height={1}
                        fill="rgba(255,255,255,0.05)"
                      />
                    )}

                    {/* Left colored accent stripe — entity-type indicator.
                        Width and opacity scale down with depth so foreground
                        cards carry the strongest type signal. */}
                    <rect
                      x={x + 1}
                      y={y + 2}
                      width={entity.depth === 0 ? 2 : entity.depth === 1 ? 1.5 : 1}
                      height={H - 4}
                      rx={1}
                      fill={KIND_COLOR[entity.kind]}
                      opacity={
                        entity.depth === 0 ? (isHov ? 0.92 : 0.62)
                        : entity.depth === 1 ? (isHov ? 0.78 : 0.42)
                        : (isHov ? 0.55 : 0.24)
                      }
                    />

                    {/* On-hover top hairline — kind-tinted, signals selection */}
                    <motion.rect
                      x={x + 10} y={y}
                      width={entity.w - 20} height={1.2}
                      fill={KIND_COLOR[entity.kind]}
                      animate={{ opacity: isHov ? 0.75 : 0 }}
                      transition={{ duration: 0.16 }}
                    />

                    {/* ── Depth 0: full intelligence card ── */}
                    {entity.depth === 0 && (
                      <>
                        {/* Kind label (top-left) */}
                        <text
                          x={x + PAD_X}
                          y={y + 14}
                          fontSize={6.5}
                          fontFamily="Inter, system-ui, sans-serif"
                          fontWeight="600"
                          letterSpacing="0.10em"
                          fill={`rgba(255,255,255,${isHov ? 0.46 : D_TYPE[0]})`}
                          style={{ pointerEvents: "none" }}
                        >
                          {KIND_LABEL[entity.kind]}
                        </text>

                        {/* Type dot (top-right) */}
                        <circle
                          cx={x + entity.w - PAD_X - 1}
                          cy={y + 11}
                          r={2.5}
                          fill={KIND_COLOR[entity.kind]}
                          opacity={isHov ? 0.95 : 0.70}
                        />

                        {/* Entity name */}
                        <text
                          x={x + PAD_X}
                          y={y + 32}
                          fontSize={12}
                          fontFamily="Inter, system-ui, sans-serif"
                          fontWeight="500"
                          letterSpacing="-0.011em"
                          fill={`rgba(255,255,255,${isHov ? 0.94 : D_NAME[0]})`}
                          style={{ pointerEvents: "none" }}
                        >
                          {entity.label}
                        </text>

                        {/* Hairline divider above the metadata row */}
                        <line
                          x1={x + PAD_X} y1={y + 41}
                          x2={x + entity.w - PAD_X} y2={y + 41}
                          stroke="rgba(255,255,255,0.06)"
                          strokeWidth={1}
                        />

                        {/* Role (bottom-left) */}
                        <text
                          x={x + PAD_X}
                          y={y + H - 8}
                          fontSize={8.5}
                          fontFamily="Inter, system-ui, sans-serif"
                          fontWeight="400"
                          letterSpacing="-0.006em"
                          fill={`rgba(255,255,255,${isHov ? 0.52 : D_ROLE[0]})`}
                          style={{ pointerEvents: "none" }}
                        >
                          {entity.role}
                        </text>

                        {/* Connection count (bottom-right) — real metadata
                            derived from the LINKS graph above. */}
                        <text
                          x={x + entity.w - PAD_X}
                          y={y + H - 8}
                          fontSize={7.5}
                          fontFamily="Inter, system-ui, sans-serif"
                          fontWeight="500"
                          letterSpacing="0.02em"
                          textAnchor="end"
                          fill={`rgba(255,255,255,${isHov ? 0.48 : D_META[0]})`}
                          style={{ pointerEvents: "none" }}
                        >
                          {LINK_COUNT[entity.id]} links
                        </text>
                      </>
                    )}

                    {/* ── Depth 1: secondary card ── */}
                    {entity.depth === 1 && (
                      <>
                        {/* Type dot (top-right) */}
                        <circle
                          cx={x + entity.w - PAD_X}
                          cy={y + 13}
                          r={2}
                          fill={KIND_COLOR[entity.kind]}
                          opacity={isHov ? 0.88 : 0.50}
                        />

                        {/* Entity name */}
                        <text
                          x={x + PAD_X}
                          y={y + 19}
                          fontSize={11}
                          fontFamily="Inter, system-ui, sans-serif"
                          fontWeight="500"
                          letterSpacing="-0.011em"
                          fill={`rgba(255,255,255,${isHov ? 0.90 : D_NAME[1]})`}
                          style={{ pointerEvents: "none" }}
                        >
                          {entity.label}
                        </text>

                        {/* Role */}
                        <text
                          x={x + PAD_X}
                          y={y + 35}
                          fontSize={8}
                          fontFamily="Inter, system-ui, sans-serif"
                          fontWeight="400"
                          letterSpacing="-0.006em"
                          fill={`rgba(255,255,255,${isHov ? 0.42 : D_ROLE[1]})`}
                          style={{ pointerEvents: "none" }}
                        >
                          {entity.role}
                        </text>
                      </>
                    )}

                    {/* ── Depth 2: ambient context card ── */}
                    {entity.depth === 2 && (
                      <>
                        {/* Tiny type dot (left, vertically centred) */}
                        <circle
                          cx={x + 11}
                          cy={y + H / 2}
                          r={2}
                          fill={KIND_COLOR[entity.kind]}
                          opacity={isHov ? 0.78 : 0.36}
                        />

                        {/* Entity name — shifted right to clear the dot */}
                        <text
                          x={x + 22}
                          y={y + 21}
                          fontSize={10}
                          fontFamily="Inter, system-ui, sans-serif"
                          fontWeight="500"
                          letterSpacing="-0.011em"
                          fill={`rgba(255,255,255,${isHov ? 0.78 : D_NAME[2]})`}
                          style={{ pointerEvents: "none" }}
                        >
                          {entity.label}
                        </text>
                      </>
                    )}
                  </>
                )}
              </motion.g>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
