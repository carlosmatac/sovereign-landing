"use client"

import { useState, useMemo } from "react"

// ─── Types ────────────────────────────────────────────────────────────────────

type NodeType = "Person" | "Company" | "Government" | "Region" | "Document" | "Initiative"

interface GraphNode {
  id: string
  label: string
  shortLabel?: string
  type: NodeType
  x: number
  y: number
  r: number
  weight: number // mention count
}

interface GraphEdge {
  id: string
  from: string
  to: string
  strength: "strong" | "medium" | "weak"
}

// ─── Color system ─────────────────────────────────────────────────────────────

const NODE_COLOR: Record<NodeType, string> = {
  Person:     "#5B9CF6",
  Company:    "#34D399",
  Government: "#A78BFA",
  Region:     "#FBBF24",
  Document:   "#7DD3FC",
  Initiative: "#F472B6",
}

const TYPE_FILTERS: NodeType[] = ["Person", "Company", "Government", "Region", "Document", "Initiative"]

// ─── Graph data — dense, 22 nodes, 28 edges ───────────────────────────────────
// viewBox: 0 0 760 420

const NODES: GraphNode[] = [
  // Core company — Manila Energy — centre-right
  { id: "manila",       label: "Manila Energy",               type: "Company",    x: 400, y: 200, r: 9,   weight: 22 },
  // People
  { id: "santos",       label: "Adrian Santos",               type: "Person",     x: 260, y: 110, r: 6.5, weight: 14 },
  { id: "vega",         label: "Carlos Vega",                 type: "Person",     x: 160, y: 210, r: 5.5, weight: 9  },
  { id: "diallo",       label: "Amara Diallo",                type: "Person",     x: 210, y: 330, r: 5.5, weight: 11 },
  { id: "okonkwo",      label: "Sarah Okonkwo",               type: "Person",     x: 580, y: 100, r: 5,   weight: 7  },
  { id: "osei",         label: "Emeka Osei",                  type: "Person",     x: 660, y: 190, r: 5,   weight: 6  },
  { id: "lowe",         label: "David Lowe",                  type: "Person",     x: 100, y: 130, r: 5,   weight: 8  },
  // Companies
  { id: "andes",        label: "Andes Power",                 type: "Company",    x: 530, y: 290, r: 6,   weight: 9  },
  { id: "frontier",     label: "Frontier Group",              type: "Company",    x: 640, y: 340, r: 5.5, weight: 7  },
  { id: "meridian",     label: "Meridian Capital",            type: "Company",    x: 100, y: 310, r: 5.5, weight: 8  },
  { id: "nnpc",         label: "NNPC Ltd.",                   type: "Company",    x: 340, y: 360, r: 5.5, weight: 10 },
  // Governments
  { id: "chile-min",    label: "Chile Ministry of Energy",    shortLabel: "Chile Ministry",  type: "Government", x: 560, y: 160, r: 6, weight: 11 },
  { id: "nigeria-gov",  label: "Nigeria Federal Government",  shortLabel: "Nigeria Gov.",    type: "Government", x: 280, y: 390, r: 5.5, weight: 8 },
  { id: "colombia-min", label: "Colombia Min. of Mines",      shortLabel: "Colombia Min.",   type: "Government", x: 460, y: 380, r: 5, weight: 6  },
  // Regions
  { id: "south-am",     label: "South America",               type: "Region",     x: 310, y: 260, r: 6.5, weight: 16 },
  { id: "west-africa",  label: "West Africa",                 type: "Region",     x: 200, y: 270, r: 5.5, weight: 12 },
  { id: "chile-r",      label: "Chile",                       type: "Region",     x: 490, y: 100, r: 5,   weight: 9  },
  { id: "colombia-r",   label: "Colombia",                    type: "Region",     x: 390, y: 310, r: 5,   weight: 7  },
  // Documents
  { id: "lagos-brief",  label: "Lagos Infrastructure Brief",  shortLabel: "Lagos Brief",     type: "Document",   x: 130, y: 390, r: 5, weight: 6  },
  { id: "q3-colombia",  label: "Q3 Colombia Brief",           shortLabel: "Q3 Colombia",     type: "Document",   x: 460, y: 50,  r: 4.5, weight: 5 },
  { id: "strat-plan",   label: "Strategic Expansion Plan",    shortLabel: "Expansion Plan",  type: "Document",   x: 680, y: 280, r: 5, weight: 7  },
  // Initiatives
  { id: "phase2",       label: "Lagos Infra Phase 2",         shortLabel: "Phase 2",         type: "Initiative", x: 100, y: 50,  r: 4.5, weight: 5 },
  { id: "pac-corridor", label: "Pacific Corridor Programme",  shortLabel: "Pacific Corridor",type: "Initiative", x: 620, y: 50,  r: 5,   weight: 6  },
]

const EDGES: GraphEdge[] = [
  // Manila Energy hub
  { id: "e1",  from: "santos",       to: "manila",       strength: "strong" },
  { id: "e2",  from: "manila",       to: "chile-min",    strength: "strong" },
  { id: "e3",  from: "manila",       to: "andes",        strength: "strong" },
  { id: "e4",  from: "manila",       to: "south-am",     strength: "strong" },
  { id: "e5",  from: "manila",       to: "strat-plan",   strength: "medium" },
  { id: "e6",  from: "manila",       to: "colombia-r",   strength: "medium" },
  // People connections
  { id: "e7",  from: "vega",         to: "andes",        strength: "medium" },
  { id: "e8",  from: "vega",         to: "chile-min",    strength: "medium" },
  { id: "e9",  from: "diallo",       to: "west-africa",  strength: "strong" },
  { id: "e10", from: "diallo",       to: "nnpc",         strength: "medium" },
  { id: "e11", from: "okonkwo",      to: "frontier",     strength: "strong" },
  { id: "e12", from: "osei",         to: "nnpc",         strength: "strong" },
  { id: "e13", from: "lowe",         to: "meridian",     strength: "strong" },
  { id: "e14", from: "lowe",         to: "lagos-brief",  strength: "medium" },
  // Regional connections
  { id: "e15", from: "south-am",     to: "colombia-r",   strength: "medium" },
  { id: "e16", from: "south-am",     to: "chile-r",      strength: "medium" },
  { id: "e17", from: "west-africa",  to: "nigeria-gov",  strength: "strong" },
  { id: "e18", from: "west-africa",  to: "meridian",     strength: "weak"   },
  // Government connections
  { id: "e19", from: "chile-min",    to: "pac-corridor", strength: "medium" },
  { id: "e20", from: "chile-min",    to: "chile-r",      strength: "strong" },
  { id: "e21", from: "nigeria-gov",  to: "nnpc",         strength: "strong" },
  { id: "e22", from: "colombia-min", to: "colombia-r",   strength: "strong" },
  // Documents
  { id: "e23", from: "q3-colombia",  to: "manila",       strength: "medium" },
  { id: "e24", from: "q3-colombia",  to: "colombia-r",   strength: "medium" },
  { id: "e25", from: "strat-plan",   to: "andes",        strength: "medium" },
  { id: "e26", from: "lagos-brief",  to: "west-africa",  strength: "medium" },
  { id: "e27", from: "phase2",       to: "diallo",       strength: "medium" },
  { id: "e28", from: "pac-corridor", to: "andes",        strength: "weak"   },
]

// ─── Edge opacity by strength ─────────────────────────────────────────────────

const EDGE_OPACITY: Record<string, number> = {
  strong: 0.32,
  medium: 0.18,
  weak:   0.09,
}

// ─── Component ────────────────────────────────────────────────────────────────

export function PrepareSellGraph() {
  const [selectedId, setSelectedId] = useState<string | null>("manila")
  const [activeFilters, setActiveFilters] = useState<Set<NodeType>>(new Set(TYPE_FILTERS))
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const visibleNodes = useMemo(
    () => NODES.filter((n) => activeFilters.has(n.type)),
    [activeFilters],
  )

  const visibleNodeIds = useMemo(() => new Set(visibleNodes.map((n) => n.id)), [visibleNodes])

  const visibleEdges = useMemo(
    () => EDGES.filter((e) => visibleNodeIds.has(e.from) && visibleNodeIds.has(e.to)),
    [visibleNodeIds],
  )

  const connectedIds = useMemo(() => {
    const focus = selectedId ?? hoveredId
    if (!focus) return null
    const ids = new Set<string>([focus])
    visibleEdges.forEach((e) => {
      if (e.from === focus) ids.add(e.to)
      if (e.to === focus) ids.add(e.from)
    })
    return ids
  }, [selectedId, hoveredId, visibleEdges])

  const selectedNode = selectedId ? NODES.find((n) => n.id === selectedId) : null

  const toggleFilter = (type: NodeType) => {
    setActiveFilters((prev) => {
      const next = new Set(prev)
      if (next.has(type)) {
        if (next.size === 1) return prev
        next.delete(type)
        if (selectedId) {
          const sel = NODES.find((n) => n.id === selectedId)
          if (sel?.type === type) setSelectedId(null)
        }
      } else {
        next.add(type)
      }
      return next
    })
  }

  const nodeOpacity = (id: string) => {
    if (!connectedIds) return 1
    return connectedIds.has(id) ? 1 : 0.1
  }

  const edgeOpacity = (edge: GraphEdge) => {
    const base = EDGE_OPACITY[edge.strength]
    if (!connectedIds) return base
    const focus = selectedId ?? hoveredId
    if (!focus) return base
    if (edge.from === focus || edge.to === focus) return base * 2.2
    return 0.04
  }

  return (
    <div
      className="w-full overflow-hidden rounded-[17px]"
      style={{
        background: "#050C1A",
        border: "1px solid rgba(147,147,147,0.14)",
        boxShadow: "0 0 0 1px rgba(255,255,255,0.02), 0 40px 100px -20px rgba(0,0,0,0.80)",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-3"
        style={{
          background: "linear-gradient(to bottom, #0D1B32, #0A1525)",
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
            Aksum · Network Explorer
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.20)" }}>
            {visibleNodes.length} entities · {visibleEdges.length} connections
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

      {/* Filter pills */}
      <div
        className="flex items-center gap-2 overflow-x-auto px-5 py-2.5 scrollbar-none"
        style={{ borderBottom: "1px solid rgba(147,147,147,0.07)" }}
      >
        {TYPE_FILTERS.map((type) => {
          const active = activeFilters.has(type)
          return (
            <button
              key={type}
              onClick={() => toggleFilter(type)}
              className="shrink-0 rounded-full px-2.5 py-[4px] text-[10px] font-medium transition-all duration-150"
              style={{
                background: active ? `${NODE_COLOR[type]}18` : "rgba(255,255,255,0.03)",
                border: `1px solid ${active ? `${NODE_COLOR[type]}40` : "rgba(147,147,147,0.12)"}`,
                color: active ? NODE_COLOR[type] : "rgba(255,255,255,0.28)",
              }}
            >
              {type}
            </button>
          )
        })}
      </div>

      {/* Graph canvas */}
      <div className="relative">
        <svg
          viewBox="0 0 760 420"
          className="w-full"
          style={{ display: "block" }}
        >
          {/* Subtle grid */}
          <defs>
            <pattern id="ps-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.025)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="760" height="420" fill="url(#ps-grid)" />

          {/* Edges */}
          {visibleEdges.map((edge) => {
            const from = NODES.find((n) => n.id === edge.from)
            const to = NODES.find((n) => n.id === edge.to)
            if (!from || !to) return null
            return (
              <line
                key={edge.id}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke="rgba(147,147,147,1)"
                strokeOpacity={edgeOpacity(edge)}
                strokeWidth={edge.strength === "strong" ? 1.2 : edge.strength === "medium" ? 0.8 : 0.5}
                style={{ transition: "stroke-opacity 200ms" }}
              />
            )
          })}

          {/* Nodes */}
          {visibleNodes.map((node) => {
            const color = NODE_COLOR[node.type]
            const isSelected = selectedId === node.id
            const opacity = nodeOpacity(node.id)
            const displayLabel = node.shortLabel ?? node.label

            return (
              <g
                key={node.id}
                style={{ cursor: "pointer", transition: "opacity 200ms", opacity }}
                onClick={() => setSelectedId(isSelected ? null : node.id)}
                onMouseEnter={() => setHoveredId(node.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Glow ring when selected */}
                {isSelected && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={node.r + 5}
                    fill="none"
                    stroke={color}
                    strokeOpacity={0.22}
                    strokeWidth={2.5}
                  />
                )}
                {/* Node body */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={node.r}
                  fill={`${color}22`}
                  stroke={color}
                  strokeOpacity={isSelected ? 0.90 : 0.55}
                  strokeWidth={isSelected ? 1.8 : 1.2}
                />
                {/* Inner dot */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={node.r * 0.35}
                  fill={color}
                  fillOpacity={isSelected ? 0.85 : 0.55}
                />
                {/* Label */}
                <text
                  x={node.x}
                  y={node.y + node.r + 9}
                  textAnchor="middle"
                  fontSize={node.r >= 6 ? 8 : 7}
                  fill="rgba(255,255,255,0.55)"
                  style={{ pointerEvents: "none", userSelect: "none" }}
                >
                  {displayLabel.length > 18 ? displayLabel.slice(0, 16) + "…" : displayLabel}
                </text>
              </g>
            )
          })}
        </svg>

        {/* Detail card */}
        {selectedNode && (
          <div
            className="absolute bottom-3 left-3 w-[200px] rounded-[10px] p-3"
            style={{
              background: "#080F1E",
              border: "1px solid rgba(147,147,147,0.18)",
              boxShadow: "0 8px 32px -8px rgba(0,0,0,0.70)",
            }}
          >
            <div className="mb-2 flex items-center gap-2">
              <div
                className="h-[6px] w-[6px] shrink-0 rounded-full"
                style={{ background: NODE_COLOR[selectedNode.type] }}
              />
              <span
                className="text-[8.5px] font-semibold uppercase tracking-[0.08em]"
                style={{ color: NODE_COLOR[selectedNode.type] }}
              >
                {selectedNode.type}
              </span>
            </div>
            <p className="mb-1 text-[11px] font-semibold leading-tight text-white">
              {selectedNode.label}
            </p>
            <p className="mb-2 text-[9px] tabular-nums" style={{ color: "rgba(255,255,255,0.30)" }}>
              {selectedNode.weight} mentions across internal sources
            </p>
            <div
              className="pt-2"
              style={{ borderTop: "1px solid rgba(147,147,147,0.10)" }}
            >
              <p className="mb-1.5 text-[8.5px] font-semibold uppercase tracking-[0.07em]" style={{ color: "rgba(255,255,255,0.22)" }}>
                Connected to
              </p>
              <div className="flex flex-col gap-1">
                {EDGES.filter(
                  (e) =>
                    (e.from === selectedNode.id || e.to === selectedNode.id) &&
                    visibleNodeIds.has(e.from) &&
                    visibleNodeIds.has(e.to),
                )
                  .slice(0, 4)
                  .map((e) => {
                    const otherId = e.from === selectedNode.id ? e.to : e.from
                    const other = NODES.find((n) => n.id === otherId)
                    if (!other) return null
                    return (
                      <div key={e.id} className="flex items-center gap-1.5">
                        <div
                          className="h-[4px] w-[4px] shrink-0 rounded-full"
                          style={{ background: NODE_COLOR[other.type] }}
                        />
                        <span className="text-[9px] leading-tight" style={{ color: "rgba(255,255,255,0.42)" }}>
                          {other.shortLabel ?? other.label}
                        </span>
                      </div>
                    )
                  })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div
        className="flex flex-wrap items-center gap-x-4 gap-y-1.5 px-5 py-3"
        style={{ borderTop: "1px solid rgba(147,147,147,0.07)" }}
      >
        {TYPE_FILTERS.map((type) => (
          <div key={type} className="flex items-center gap-1.5">
            <div className="h-[5px] w-[5px] rounded-full" style={{ background: NODE_COLOR[type] }} />
            <span className="text-[9px]" style={{ color: "rgba(255,255,255,0.30)" }}>
              {type}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
