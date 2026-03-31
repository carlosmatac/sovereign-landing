"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"

// ─── Types ────────────────────────────────────────────────────────────────────

type EntityType = "company" | "person" | "country" | "fund"

interface Entity {
  id: string
  label: string
  sublabel: string
  x: number
  y: number
  type: EntityType
}

interface Relationship {
  id: string
  from: string
  to: string
  label: string
}

// ─── Map dimensions — must match world-dots.svg viewBox ───────────────────────

const W = 963
const H = 583

// ─── Demo data ────────────────────────────────────────────────────────────────
// Positions approximated visually on the 963×583 Robinson-projected world map.

const entities: Entity[] = [
  // — Southeast Asia cluster —
  { id: "manila",    label: "Manila Energy",        sublabel: "Portfolio Company",    x: 786, y: 248, type: "company" },
  { id: "santos",    label: "Adrian Santos",         sublabel: "CEO",                  x: 820, y: 272, type: "person"  },
  { id: "singapore", label: "Singapore",             sublabel: "Active Market",        x: 768, y: 284, type: "country" },
  { id: "jakarta",   label: "Jakarta Grid",          sublabel: "Portfolio Company",    x: 742, y: 306, type: "company" },

  // — Africa cluster —
  { id: "nigeria",   label: "Nigeria",               sublabel: "Emerging Market",      x: 500, y: 264, type: "country" },
  { id: "lagos",     label: "Lagos Grid",            sublabel: "Portfolio Company",    x: 475, y: 286, type: "company" },
  { id: "nairobi",   label: "Nairobi Hub",           sublabel: "Regional Partner",     x: 560, y: 294, type: "company" },

  // — Middle East node —
  { id: "gulf",      label: "Gulf Capital",          sublabel: "Strategic Investor",   x: 617, y: 238, type: "fund"    },

  // — South America cluster —
  { id: "colombia",  label: "Colombia",              sublabel: "Target Market",        x: 256, y: 264, type: "country" },
  { id: "andean",    label: "Andean Infra. Fund",    sublabel: "Investment Vehicle",   x: 232, y: 298, type: "fund"    },
]

const relationships: Relationship[] = [
  // Existing
  { id: "r1",  from: "santos",    to: "manila",     label: "CEO of"                       },
  { id: "r2",  from: "manila",    to: "lagos",      label: "mentioned with"               },
  { id: "r3",  from: "lagos",     to: "nigeria",    label: "operating in"                 },
  { id: "r4",  from: "andean",    to: "colombia",   label: "operating in"                 },
  { id: "r5",  from: "santos",    to: "andean",     label: "expansion interest"           },
  // New
  { id: "r6",  from: "manila",    to: "singapore",  label: "expansion interest"           },
  { id: "r7",  from: "jakarta",   to: "singapore",  label: "operating in"                 },
  { id: "r8",  from: "gulf",      to: "nigeria",    label: "strategic interest"           },
  { id: "r9",  from: "gulf",      to: "santos",     label: "strategic partner"            },
  { id: "r10", from: "nairobi",   to: "nigeria",    label: "mentioned with"               },
]

// ─── Lookups (module-level — entities never change) ───────────────────────────

const entityMap = Object.fromEntries(entities.map(e => [e.id, e]))

// ─── Visual config ────────────────────────────────────────────────────────────

const NODE_R: Record<EntityType, number> = {
  country: 9,
  company: 7,
  person:  6,
  fund:    7,
}

const NODE_FILL: Record<EntityType, string> = {
  country: "transparent",
  company: "oklch(0.12 0 0)",
  person:  "oklch(0.32 0 0)",
  fund:    "oklch(0.12 0 0)",
}

const NODE_STROKE: Record<EntityType, string> = {
  country: "oklch(0.20 0 0)",
  company: "oklch(0.12 0 0)",
  person:  "oklch(0.32 0 0)",
  fund:    "oklch(0.12 0 0)",
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function curvePath(a: Entity, b: Entity): string {
  const dx = b.x - a.x
  const dy = b.y - a.y
  const len = Math.sqrt(dx * dx + dy * dy)
  const mx = (a.x + b.x) / 2
  const my = (a.y + b.y) / 2
  const offset = Math.min(len * 0.18, 45)
  const cpx = mx - (dy / len) * offset
  const cpy = my + (dx / len) * offset
  return `M ${a.x} ${a.y} Q ${cpx} ${cpy} ${b.x} ${b.y}`
}

// ─── Component ────────────────────────────────────────────────────────────────

export function WorldIntelligenceMap({ className = "" }: { className?: string }) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const connectedIds = useMemo<Set<string>>(() => {
    if (!hoveredId) return new Set()
    const ids = new Set<string>([hoveredId])
    for (const r of relationships) {
      if (r.from === hoveredId) ids.add(r.to)
      if (r.to === hoveredId)   ids.add(r.from)
    }
    return ids
  }, [hoveredId])

  const activeRelIds = useMemo<Set<string>>(() => {
    if (!hoveredId) return new Set()
    return new Set(
      relationships
        .filter(r => r.from === hoveredId || r.to === hoveredId)
        .map(r => r.id)
    )
  }, [hoveredId])

  const tooltipConnections = useMemo(() => {
    if (!hoveredId) return []
    return relationships
      .filter(r => r.from === hoveredId || r.to === hoveredId)
      .map(r => ({
        rel: r,
        other: entityMap[r.from === hoveredId ? r.to : r.from],
      }))
  }, [hoveredId])

  const hoveredEntity = hoveredId ? entityMap[hoveredId] : null

  // Tooltip: position as % of container so it follows SVG scale
  const tooltipPos = useMemo(() => {
    if (!hoveredEntity) return {}
    const xPct = (hoveredEntity.x / W) * 100
    const yPct = (hoveredEntity.y / H) * 100
    const flipX = hoveredEntity.x > W * 0.55
    const flipY = hoveredEntity.y > H * 0.60
    return {
      left:      `${xPct}%`,
      top:       `${yPct}%`,
      transform: `translate(${flipX ? "calc(-100% - 10px)" : "10px"}, ${flipY ? "-100%" : "-50%"})`,
    }
  }, [hoveredEntity])

  const nodeOpacity  = (id: string) => hoveredId ? (connectedIds.has(id)  ? 1    : 0.08) : 0.9
  const labelOpacity = (id: string) => hoveredId ? (connectedIds.has(id)  ? 1    : 0.06) : 0.6
  const lineOpacity  = (id: string) => hoveredId ? (activeRelIds.has(id)  ? 0.80 : 0.04) : 0.28

  return (
    <div className={`relative w-full select-none overflow-hidden rounded-xl border border-border bg-background ${className}`}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        style={{ display: "block" }}
        aria-hidden="true"
      >
        {/* ── World map base ── */}
        <image
          href="/world-dots.svg"
          x={0}
          y={0}
          width={W}
          height={H}
          preserveAspectRatio="xMidYMid meet"
          style={{ filter: "grayscale(1)", opacity: 0.18 }}
        />

        {/* ── Relationship lines ── */}
        <g>
          {relationships.map((rel, i) => {
            const a = entityMap[rel.from]
            const b = entityMap[rel.to]
            if (!a || !b) return null
            const active = activeRelIds.has(rel.id) && !!hoveredId
            return (
              <motion.path
                key={rel.id}
                d={curvePath(a, b)}
                fill="none"
                stroke="oklch(0.18 0 0)"
                strokeDasharray="2.5 5"
                strokeLinecap="round"
                initial={{ opacity: 0, pathLength: 0 }}
                animate={{
                  opacity:     lineOpacity(rel.id),
                  pathLength:  1,
                  strokeWidth: active ? 1.4 : 0.9,
                }}
                transition={{
                  pathLength: { duration: 1.0, delay: 0.5 + i * 0.12, ease: "easeInOut" },
                  opacity:    { duration: 0.25 },
                  strokeWidth:{ duration: 0.2 },
                }}
              />
            )
          })}
        </g>

        {/* ── Nodes ── */}
        <g>
          {entities.map((entity, i) => {
            const r       = NODE_R[entity.type]
            const isHov   = entity.id === hoveredId
            const isConn  = connectedIds.has(entity.id)
            const delay   = 0.4 + i * 0.08

            return (
              <g
                key={entity.id}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredId(entity.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Expanding halo on hover */}
                <AnimatePresence>
                  {isHov && (
                    <motion.circle
                      cx={entity.x} cy={entity.y}
                      fill="none"
                      stroke="oklch(0.12 0 0)"
                      strokeWidth={0.8}
                      initial={{ r: r + 3,  opacity: 0.35 }}
                      animate={{ r: r + 14, opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.55, ease: "easeOut" }}
                    />
                  )}
                </AnimatePresence>

                {/* Static focus ring */}
                {isHov && (
                  <circle
                    cx={entity.x} cy={entity.y}
                    r={r + 6}
                    fill="none"
                    stroke="oklch(0.12 0 0)"
                    strokeWidth={0.8}
                    opacity={0.15}
                  />
                )}

                {/* Node body */}
                <motion.circle
                  cx={entity.x}
                  cy={entity.y}
                  fill={NODE_FILL[entity.type]}
                  stroke={NODE_STROKE[entity.type]}
                  strokeWidth={entity.type === "country" ? 1.2 : (isHov ? 1.8 : 1)}
                  strokeDasharray={entity.type === "country" ? "3 2" : undefined}
                  initial={{ r: 0, opacity: 0 }}
                  animate={{
                    r:       isHov ? r * 1.28 : r,
                    opacity: nodeOpacity(entity.id),
                  }}
                  transition={{
                    r:       { type: "spring", stiffness: 400, damping: 22 },
                    opacity: { duration: 0.22 },
                    default: { delay },
                  }}
                />

                {/* Inner dot for people */}
                {entity.type === "person" && (
                  <motion.circle
                    cx={entity.x} cy={entity.y}
                    r={2}
                    fill="oklch(0.92 0 0)"
                    animate={{ opacity: nodeOpacity(entity.id) }}
                    transition={{ duration: 0.22 }}
                  />
                )}

                {/* Inner diamond marker for funds */}
                {entity.type === "fund" && (
                  <motion.rect
                    x={entity.x - 2.5}
                    y={entity.y - 2.5}
                    width={5}
                    height={5}
                    fill="oklch(0.92 0 0)"
                    transform={`rotate(45 ${entity.x} ${entity.y})`}
                    animate={{ opacity: nodeOpacity(entity.id) }}
                    transition={{ duration: 0.22 }}
                  />
                )}

                {/* Label */}
                <motion.text
                  x={entity.x}
                  y={entity.y + r + 12}
                  textAnchor="middle"
                  fontSize={8.5}
                  fontFamily="Inter, system-ui, sans-serif"
                  fontWeight="500"
                  letterSpacing="0.025em"
                  fill="oklch(0.12 0 0)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: labelOpacity(entity.id) }}
                  transition={{ duration: 0.22, delay: delay + 0.1 }}
                  style={{ pointerEvents: "none" }}
                >
                  {entity.label}
                </motion.text>

                {/* Sublabel — only when connected / hovered */}
                <AnimatePresence>
                  {(isHov || (hoveredId && isConn)) && (
                    <motion.text
                      x={entity.x}
                      y={entity.y + r + 22}
                      textAnchor="middle"
                      fontSize={7}
                      fontFamily="Inter, system-ui, sans-serif"
                      fontWeight="400"
                      fill="oklch(0.45 0 0)"
                      initial={{ opacity: 0, y: entity.y + r + 19 }}
                      animate={{ opacity: 1,  y: entity.y + r + 22 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.18 }}
                      style={{ pointerEvents: "none" }}
                    >
                      {entity.sublabel}
                    </motion.text>
                  )}
                </AnimatePresence>
              </g>
            )
          })}
        </g>
      </svg>

      {/* ── Tooltip card ── */}
      <AnimatePresence>
        {hoveredEntity && (
          <motion.div
            key={hoveredEntity.id}
            className="pointer-events-none absolute z-20 w-52 rounded-xl border border-border bg-background/96 px-4 py-3.5 shadow-xl shadow-black/6 backdrop-blur-sm"
            style={tooltipPos}
            initial={{ opacity: 0, scale: 0.96, y: 6 }}
            animate={{ opacity: 1, scale: 1,    y: 0 }}
            exit={{    opacity: 0, scale: 0.96, y: 6 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-xs font-semibold leading-tight text-foreground">
                  {hoveredEntity.label}
                </p>
                <p className="mt-0.5 text-[10px] uppercase tracking-widest text-muted-foreground">
                  {hoveredEntity.sublabel}
                </p>
              </div>
              {/* Type badge */}
              <span className="mt-px shrink-0 rounded-full border border-border px-2 py-0.5 text-[9px] font-medium uppercase tracking-widest text-muted-foreground">
                {hoveredEntity.type}
              </span>
            </div>

            {/* Connections */}
            {tooltipConnections.length > 0 && (
              <div className="mt-3 space-y-2 border-t border-border pt-3">
                {tooltipConnections.map(({ rel, other }) => (
                  <div key={rel.id} className="flex items-center gap-2">
                    <div className="h-1 w-1 shrink-0 rounded-full bg-muted-foreground/40" />
                    <p className="text-[10px] leading-snug text-muted-foreground">
                      <span className="font-medium text-foreground">{other.label}</span>
                      <span className="mx-1 opacity-50">·</span>
                      {rel.label}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
