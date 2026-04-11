"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import {
  LayoutGrid,
  FolderOpen,
  Activity,
  MessageSquare,
  Network,
  Shield,
  Settings,
  MapPin,
  ChevronLeft,
  ChevronDown,
  Mic,
  Clock,
  Plus,
  TrendingUp,
  Hash,
  Users,
} from "lucide-react"

// ─── Types ────────────────────────────────────────────────────────────────────

type FilterType = "Person" | "Company" | "Government" | "Organization" | "Event"

interface GNode {
  id: string
  label: string
  shortLabel?: string
  type: FilterType
  x: number
  y: number
  r: number
  detail: {
    mentions: number
    description: string
    connections: Array<{ label: string; rel: string; nodeId: string }>
  }
}

interface GEdge {
  id: string
  from: string
  to: string
}

// ─── Graph data ───────────────────────────────────────────────────────────────

const NODE_COLOR: Record<FilterType, string> = {
  Person:       "#5B9CF6",
  Company:      "#34D399",
  Government:   "#A78BFA",
  Organization: "#7DD3FC",
  Event:        "#FBBF24",
}

const ALL_FILTERS: FilterType[] = ["Person", "Company", "Government", "Organization", "Event"]

// viewBox: 0 0 580 320 — node positions calibrated to leave the bottom-left
// quadrant clear for the detail card (~160 SVG units wide × ~110 units tall).
const NODES: GNode[] = [
  {
    id: "adrian",
    label: "Adrian Santos",
    type: "Person",
    x: 172, y: 78, r: 5.5,
    detail: {
      mentions: 8,
      description: "Senior advisor driving Manila Energy's South American expansion strategy and managing key government relationships across the region.",
      connections: [
        { label: "Manila Energy", rel: "advisor", nodeId: "manila" },
      ],
    },
  },
  {
    id: "manila",
    label: "Manila Energy",
    type: "Company",
    x: 322, y: 148, r: 7.5,
    detail: {
      mentions: 22,
      description: "Primary infrastructure partner in the South America expansion corridor, with active relationships across government and energy sectors.",
      connections: [
        { label: "Adrian Santos",         rel: "advisor",            nodeId: "adrian"       },
        { label: "South America",         rel: "strategic expansion", nodeId: "southamerica" },
        { label: "Chile Ministry",        rel: "government partner",  nodeId: "chile"        },
        { label: "Andes Power",           rel: "joint venture",       nodeId: "andes"        },
      ],
    },
  },
  {
    id: "chile",
    label: "Chile Ministry of Energy",
    shortLabel: "Chile Ministry",
    type: "Government",
    x: 478, y: 68, r: 5.5,
    detail: {
      mentions: 11,
      description: "Key regulatory counterpart overseeing energy sector approvals and licensing for the Pacific corridor expansion programme.",
      connections: [
        { label: "Manila Energy",  rel: "government partner", nodeId: "manila"    },
        { label: "Expansion Plan", rel: "policy alignment",   nodeId: "expansion" },
      ],
    },
  },
  {
    id: "andes",
    label: "Andes Power",
    type: "Company",
    x: 494, y: 200, r: 5.5,
    detail: {
      mentions: 9,
      description: "Regional energy operator and Manila Energy's joint venture partner for transmission infrastructure across the southern cone.",
      connections: [
        { label: "Manila Energy", rel: "joint venture", nodeId: "manila" },
      ],
    },
  },
  {
    id: "southamerica",
    label: "South America",
    type: "Organization",
    x: 196, y: 232, r: 5.5,
    detail: {
      mentions: 16,
      description: "Regional focus area flagged across 16 intelligence documents. Covers regulatory, political, and infrastructure signals across the continent.",
      connections: [
        { label: "Manila Energy", rel: "strategic expansion", nodeId: "manila"   },
        { label: "Colombia",      rel: "sub-region",          nodeId: "colombia" },
      ],
    },
  },
  {
    id: "colombia",
    label: "Colombia",
    type: "Organization",
    x: 295, y: 290, r: 5,
    detail: {
      mentions: 6,
      description: "Emerging priority market within the South America corridor, with active stakeholder coverage in the energy and infrastructure sectors.",
      connections: [
        { label: "South America", rel: "sub-region", nodeId: "southamerica" },
      ],
    },
  },
  {
    id: "expansion",
    label: "Strategic Expansion Plan",
    shortLabel: "Expansion Plan",
    type: "Event",
    x: 430, y: 288, r: 5.5,
    detail: {
      mentions: 7,
      description: "Internal strategic document outlining Manila Energy's phased market entry plan across four South American markets, Q2–Q4 2026.",
      connections: [
        { label: "Manila Energy",  rel: "source document", nodeId: "manila" },
        { label: "Chile Ministry", rel: "policy alignment", nodeId: "chile"  },
      ],
    },
  },
]

const EDGES: GEdge[] = [
  { id: "e1", from: "adrian",       to: "manila"       },
  { id: "e2", from: "manila",       to: "chile"        },
  { id: "e3", from: "manila",       to: "andes"        },
  { id: "e4", from: "manila",       to: "southamerica" },
  { id: "e5", from: "southamerica", to: "colombia"     },
  { id: "e6", from: "expansion",    to: "manila"       },
  { id: "e7", from: "expansion",    to: "chile"        },
]

// ─── Sidebar nav data ─────────────────────────────────────────────────────────

const platformNav = [
  { icon: LayoutGrid,    label: "Dashboard"        },
  { icon: FolderOpen,    label: "Projects"         },
  { icon: Activity,      label: "Interviews"       },
  { icon: MessageSquare, label: "Copilot"          },
  { icon: Network,       label: "Network Explorer" },
]

const systemNav = [
  { icon: Shield,   label: "Platform Administration" },
  { icon: Settings, label: "Settings"                },
]

// ─── NavSection ───────────────────────────────────────────────────────────────

function NavSection({
  label,
  items,
  activeItem,
  onItemClick,
}: {
  label: string
  items: typeof platformNav
  activeItem: string
  onItemClick: (label: string) => void
}) {
  return (
    <div className="flex flex-col gap-2">
      <p className="mb-1 text-[9px] font-medium text-[#8a8a8a]">{label}</p>
      {items.map(({ icon: Icon, label: itemLabel }) => {
        const isActive = itemLabel === activeItem
        return (
          <div
            key={itemLabel}
            onClick={() => onItemClick(itemLabel)}
            className={`group flex cursor-pointer items-center gap-2 rounded-[4px] px-1.5 py-[4.5px] transition-colors duration-150 ${
              isActive ? "bg-white/[0.08]" : "hover:bg-white/[0.06]"
            }`}
          >
            <Icon
              className={`shrink-0 transition-colors duration-150 ${
                isActive ? "text-white/90" : "text-white/55 group-hover:text-white/90"
              }`}
              style={{ width: "11px", height: "11px" }}
              strokeWidth={1.5}
            />
            <span
              className={`text-[10px] font-medium leading-none transition-colors duration-150 ${
                isActive ? "text-white" : "text-white/70 group-hover:text-white/95"
              }`}
            >
              {itemLabel}
            </span>
          </div>
        )
      })}
    </div>
  )
}

// ─── ProjectsPanel ────────────────────────────────────────────────────────────

const projects = [
  { name: "Nigeria 2026",  region: "West Africa",     location: "Nigeria", updated: "04/04/2026" },
  { name: "Algeria 2026",  region: "North Africa",    location: "Algeria", updated: "07/04/2026" },
  { name: "Namibia 2026",  region: "Southern Africa", location: "Namibia", updated: "04/04/2026" },
  { name: "Angola 2026",   region: "Southern Africa", location: "Angola",  updated: "04/04/2026" },
  { name: "Panama 2026",   region: "Central America", location: "Panama",  updated: "04/04/2026" },
  { name: "Oman 2026",     region: "Middle East",     location: "Oman",    updated: "04/04/2026" },
  { name: "Qatar 2026",    region: "Middle East",     location: "Qatar",   updated: "04/04/2026" },
]

function ProjectCard({
  name,
  region,
  location,
  updated,
}: {
  name: string
  region: string
  location: string
  updated: string
}) {
  return (
    <div className="group flex cursor-pointer flex-col justify-between rounded-[5px] border border-[rgba(147,147,147,0.18)] px-3.5 py-3 transition-all duration-150 hover:border-[rgba(147,147,147,0.36)] hover:bg-white/[0.03]">
      <div>
        <div className="mb-2 flex items-start justify-between gap-2">
          <p className="text-[10px] font-semibold leading-tight text-white">{name}</p>
          <span className="shrink-0 cursor-default whitespace-nowrap rounded-full bg-[rgba(147,147,147,0.18)] px-1.5 py-[2.5px] text-[8px] font-medium leading-none text-white/65 transition-colors duration-150 hover:bg-[rgba(147,147,147,0.30)]">
            {region}
          </span>
        </div>
        <p className="text-[9px] leading-[1.5] text-[#888888]">
          Compilation of relevant business data
        </p>
      </div>
      <div className="mt-3 flex items-center gap-1">
        <MapPin className="shrink-0 text-[#707070]" style={{ width: "7.5px", height: "7.5px" }} />
        <p className="text-[8.5px] text-[#787878]">
          {location}
          <span className="ml-2.5">Updated {updated}</span>
        </p>
      </div>
    </div>
  )
}

function ProjectsPanel() {
  return (
    <>
      <div className="border-b border-[rgba(147,147,147,0.14)] px-4 py-2.5">
        <p className="text-[10px] font-semibold text-white">Projects</p>
      </div>
      <div className="grid flex-1 grid-cols-3 grid-rows-3 gap-2.5 overflow-hidden p-3">
        {projects.map((p) => (
          <ProjectCard key={p.name} {...p} />
        ))}
      </div>
    </>
  )
}

// ─── InterviewsPanel ──────────────────────────────────────────────────────────

const interviews = [
  { id: "i1", person: "Adrian Santos",    title: "Manila Energy Expansion Strategy",        project: "Philippines 2026", duration: "22:14" },
  { id: "i2", person: "María Gutierrez",  title: "Chile Energy Regulation Outlook",          project: "Chile 2026",       duration: "31:48" },
  { id: "i3", person: "Luis Ortega",      title: "Cross-Border Infrastructure Partnerships", project: "Colombia 2026",    duration: "18:55" },
  { id: "i4", person: "Daniel Okafor",    title: "Industrial Growth in West Africa",         project: "Nigeria 2026",     duration: "27:33" },
  { id: "i5", person: "Sofia Benavides",  title: "Andean Power Market Entry",                project: "Peru 2026",        duration: "19:41" },
  { id: "i6", person: "Karim Haddad",     title: "Regional Investment Signals in Energy",    project: "UAE 2026",         duration: "24:07" },
]

function InterviewsPanel() {
  return (
    <>
      {/* Panel header ───────────────────────────────────────────────────────── */}
      <div className="border-b border-[rgba(147,147,147,0.14)] px-4 py-2.5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[10px] font-semibold text-white">All Interviews</p>
            <p className="mt-[2px] text-[8px] leading-snug text-[#777]">
              Cross-project interview index. Start in Projects to manage interviews in context.
            </p>
          </div>
          {/* Action buttons */}
          <div className="flex shrink-0 items-center gap-[6px]">
            <button className="flex items-center gap-[5px] rounded-[4px] border border-[rgba(147,147,147,0.22)] px-2 py-[3.5px] transition-colors hover:border-[rgba(147,147,147,0.38)] hover:bg-white/[0.03]">
              <FolderOpen
                className="text-white/40"
                style={{ width: "8px", height: "8px" }}
              />
              <span className="text-[8px] font-medium text-white/50">View Projects</span>
            </button>
            <button className="flex items-center gap-[5px] rounded-[4px] border border-[rgba(147,147,147,0.32)] bg-white/[0.05] px-2 py-[3.5px] transition-colors hover:bg-white/[0.09]">
              <Plus
                className="text-white/65"
                style={{ width: "8px", height: "8px" }}
              />
              <span className="text-[8px] font-medium text-white/70">Upload Interview</span>
            </button>
          </div>
        </div>
      </div>

      {/* Interview list ─────────────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col gap-[6px] overflow-hidden p-3">
        {interviews.map((iv) => (
          <div
            key={iv.id}
            className="group flex flex-1 cursor-pointer items-center gap-2.5 rounded-[5px] border border-[rgba(147,147,147,0.15)] px-3 transition-all duration-150 hover:border-[rgba(147,147,147,0.30)] hover:bg-white/[0.025]"
          >
            {/* Mic icon */}
            <div
              className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full border"
              style={{
                background: "rgba(78,92,210,0.13)",
                borderColor: "rgba(78,92,210,0.28)",
              }}
            >
              <Mic
                className="text-[#7c8fd4]"
                style={{ width: "9px", height: "9px" }}
                strokeWidth={1.5}
              />
            </div>

            {/* Name + topic */}
            <div className="min-w-0 flex-1">
              <p className="truncate text-[9.5px] font-semibold leading-none text-white">
                {iv.person}
              </p>
              <p className="mt-[3px] truncate text-[8px] leading-none text-[#686868]">
                {iv.title}
                <span className="mx-[5px] opacity-40">·</span>
                {iv.project}
              </p>
            </div>

            {/* Duration + status */}
            <div className="flex shrink-0 items-center gap-[10px]">
              <div className="flex items-center gap-[4px]">
                <Clock
                  className="text-[#4a4a4a]"
                  style={{ width: "7px", height: "7px" }}
                />
                <span className="text-[8px] text-[#5e5e5e]">{iv.duration}</span>
              </div>
              <span className="text-[8px] font-medium text-[#4ADE80]">Ready</span>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

// ─── NetworkExplorerPanel ─────────────────────────────────────────────────────

function NetworkExplorerPanel() {
  const [selectedId, setSelectedId] = useState<string | null>("manila")
  const [activeFilters, setActiveFilters] = useState<FilterType[]>([...ALL_FILTERS])

  const visibleNodeIds = useMemo(
    () => new Set(NODES.filter((n) => activeFilters.includes(n.type)).map((n) => n.id)),
    [activeFilters],
  )

  const visibleEdges = useMemo(
    () => EDGES.filter((e) => visibleNodeIds.has(e.from) && visibleNodeIds.has(e.to)),
    [visibleNodeIds],
  )

  const connectedNodeIds = useMemo(() => {
    if (!selectedId) return new Set<string>()
    const s = new Set<string>([selectedId])
    visibleEdges.forEach((e) => {
      if (e.from === selectedId || e.to === selectedId) {
        s.add(e.from)
        s.add(e.to)
      }
    })
    return s
  }, [selectedId, visibleEdges])

  const connectedEdgeIds = useMemo(
    () =>
      new Set(
        visibleEdges
          .filter((e) => e.from === selectedId || e.to === selectedId)
          .map((e) => e.id),
      ),
    [selectedId, visibleEdges],
  )

  const selectedNode = NODES.find((n) => n.id === selectedId) ?? null

  const toggleFilter = (f: FilterType) => {
    setActiveFilters((prev) => {
      const turningOff = prev.includes(f)
      if (turningOff && selectedId) {
        const selNode = NODES.find((n) => n.id === selectedId)
        if (selNode?.type === f) setSelectedId(null)
      }
      return turningOff ? prev.filter((x) => x !== f) : [...prev, f]
    })
  }

  const nodeOpacity = (node: GNode): number => {
    if (!visibleNodeIds.has(node.id)) return 0
    if (!selectedId) return 0.85
    return connectedNodeIds.has(node.id) ? 1 : 0.11
  }

  const edgeOpacity = (edge: GEdge): number => {
    if (!visibleNodeIds.has(edge.from) || !visibleNodeIds.has(edge.to)) return 0
    if (!selectedId) return 0.28
    return connectedEdgeIds.has(edge.id) ? 0.7 : 0.05
  }

  return (
    <>
      {/* Panel header ───────────────────────────────────────────────────────── */}
      <div className="border-b border-[rgba(147,147,147,0.14)] px-4 py-2.5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[10px] font-semibold text-white">Network Explorer</p>
            <p className="mt-[2px] text-[8px] leading-snug text-[#777]">
              Reveals entity relationships across your internal intelligence
            </p>
          </div>
          <p className="mt-0.5 text-[7.5px] text-[#555]">
            {NODES.length} entities · {EDGES.length} relationships
          </p>
        </div>
      </div>

      {/* Controls row ───────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-2 border-b border-[rgba(147,147,147,0.10)] px-3 py-[6px]">
        {/* Project selector */}
        <div className="flex cursor-pointer items-center gap-1 rounded-[4px] border border-[rgba(147,147,147,0.22)] px-2 py-[3.5px] transition-colors hover:border-[rgba(147,147,147,0.38)]">
          <span className="text-[8.5px] font-medium text-white/65">Nigeria 2026</span>
          <ChevronDown
            className="text-white/35"
            style={{ width: "8px", height: "8px" }}
          />
        </div>

        {/* Entity-type filter pills */}
        <div className="flex items-center gap-[5px]">
          {ALL_FILTERS.map((f) => {
            const isOn  = activeFilters.includes(f)
            const color = NODE_COLOR[f]
            return (
              <button
                key={f}
                onClick={() => toggleFilter(f)}
                className="flex items-center gap-[4px] rounded-full px-[7px] py-[3.5px] transition-all duration-150"
                style={{
                  background: isOn ? `${color}18` : "rgba(255,255,255,0.03)",
                  border: `1px solid ${isOn ? `${color}50` : "rgba(147,147,147,0.18)"}`,
                }}
              >
                <span
                  className="h-[5px] w-[5px] shrink-0 rounded-full"
                  style={{ background: isOn ? color : "rgba(147,147,147,0.40)" }}
                />
                <span
                  className="text-[7.5px] font-medium"
                  style={{ color: isOn ? `${color}CC` : "rgba(147,147,147,0.50)" }}
                >
                  {f}
                </span>
              </button>
            )
          })}
        </div>

        {/* Utility */}
        <div className="ml-auto">
          <button className="rounded-[4px] border border-[rgba(147,147,147,0.20)] px-2 py-[3.5px] text-[8px] font-medium text-white/35 transition-colors hover:border-[rgba(147,147,147,0.36)] hover:text-white/60">
            Hide isolated
          </button>
        </div>
      </div>

      {/* Graph canvas ───────────────────────────────────────────────────────── */}
      <div className="relative flex-1 overflow-hidden" style={{ background: "#050C1A" }}>
        <svg
          viewBox="0 0 580 320"
          className="h-full w-full"
          style={{ display: "block" }}
          aria-hidden="true"
        >
          {/* Edges */}
          <g>
            {EDGES.map((edge) => {
              const from = NODES.find((n) => n.id === edge.from)!
              const to   = NODES.find((n) => n.id === edge.to)!
              return (
                <line
                  key={edge.id}
                  x1={from.x} y1={from.y}
                  x2={to.x}   y2={to.y}
                  stroke="rgba(148,163,210,1)"
                  strokeWidth={0.75}
                  opacity={edgeOpacity(edge)}
                  style={{ transition: "opacity 0.2s ease" }}
                />
              )
            })}
          </g>

          {/* Nodes */}
          <g>
            {NODES.map((node) => {
              const color      = NODE_COLOR[node.type]
              const op         = nodeOpacity(node)
              const isSelected = node.id === selectedId

              return (
                <g
                  key={node.id}
                  className="cursor-pointer"
                  opacity={op}
                  style={{ transition: "opacity 0.2s ease" }}
                  onClick={() =>
                    setSelectedId(node.id === selectedId ? null : node.id)
                  }
                >
                  {/* Outer glow ring */}
                  {isSelected && (
                    <circle
                      cx={node.x} cy={node.y}
                      r={node.r + 9}
                      fill="none"
                      stroke={color}
                      strokeWidth={0.6}
                      opacity={0.18}
                    />
                  )}
                  {/* Selection ring */}
                  {isSelected && (
                    <circle
                      cx={node.x} cy={node.y}
                      r={node.r + 4}
                      fill="none"
                      stroke={color}
                      strokeWidth={1}
                      opacity={0.45}
                    />
                  )}
                  {/* Node body */}
                  <circle
                    cx={node.x} cy={node.y}
                    r={node.r}
                    fill={color}
                    opacity={isSelected ? 0.9 : 0.72}
                  />
                  {/* Label */}
                  <text
                    x={node.x}
                    y={node.y + node.r + 9}
                    textAnchor="middle"
                    fontSize="7"
                    fill="rgba(255,255,255,0.60)"
                    fontFamily="Inter, system-ui, sans-serif"
                    fontWeight="500"
                  >
                    {node.shortLabel ?? node.label}
                  </text>
                </g>
              )
            })}
          </g>
        </svg>

        {/* Detail card ── bottom-left, floating over the canvas ─────────────── */}
        {selectedNode && (
          <div
            className="absolute bottom-3 left-3 w-[172px] overflow-hidden rounded-[6px] border border-[rgba(147,147,147,0.22)]"
            style={{ background: "#080F1E" }}
          >
            {/* Type header */}
            <div className="flex items-center gap-1.5 border-b border-[rgba(147,147,147,0.14)] px-3 py-[7px]">
              <span
                className="h-[6px] w-[6px] shrink-0 rounded-full"
                style={{ background: NODE_COLOR[selectedNode.type] }}
              />
              <span className="text-[7.5px] font-semibold uppercase tracking-[0.07em] text-white/30">
                {selectedNode.type}
              </span>
              <button
                onClick={() => setSelectedId(null)}
                className="ml-auto text-[8px] leading-none text-white/20 transition-colors hover:text-white/50"
              >
                ✕
              </button>
            </div>

            <div className="px-3 py-2.5">
              {/* Name + stats */}
              <p className="text-[10px] font-semibold leading-snug text-white">
                {selectedNode.label}
              </p>
              <p className="mt-[3px] text-[7.5px] text-[#666]">
                {selectedNode.detail.mentions} mentions · {selectedNode.detail.connections.length} connections
              </p>

              {/* Description */}
              <p className="mt-[7px] text-[8px] leading-[1.65] text-[#5e6a7a]">
                {selectedNode.detail.description}
              </p>

              {/* Connections list */}
              <div className="mt-2.5 border-t border-[rgba(147,147,147,0.12)] pt-2">
                <p className="mb-[6px] text-[7px] font-semibold uppercase tracking-[0.07em] text-[#555]">
                  Connections ({selectedNode.detail.connections.length})
                </p>
                <div className="flex flex-col gap-[5px]">
                  {selectedNode.detail.connections.map((conn) => {
                    const connNode  = NODES.find((n) => n.id === conn.nodeId)
                    const connColor = connNode ? NODE_COLOR[connNode.type] : "#888"
                    return (
                      <div key={conn.nodeId} className="flex items-center gap-1.5">
                        <span
                          className="h-[5px] w-[5px] shrink-0 rounded-full"
                          style={{ background: connColor }}
                        />
                        <span className="min-w-0 flex-1 truncate text-[7.5px] text-white/55">
                          {conn.label}
                        </span>
                        <span className="shrink-0 text-[7px] text-[#505a66]">
                          {conn.rel}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

// ─── DashboardPanel ───────────────────────────────────────────────────────────

const kpiCards = [
  { label: "PROJECTS",   value: "6",  sub: "Active intelligence projects", icon: FolderOpen, color: "#5B9CF6" },
  { label: "INTERVIEWS", value: "6",  sub: "6 completed · 0 processing",   icon: Mic,        color: "#A78BFA" },
  { label: "ENTITIES",   value: "34", sub: "34 relationships mapped",       icon: Users,      color: "#FB923C" },
]

const barData = [
  { shortLabel: "Philippines", value: 3 },
  { shortLabel: "Chile",       value: 2 },
  { shortLabel: "Colombia",    value: 2 },
  { shortLabel: "Nigeria",     value: 2 },
  { shortLabel: "Peru",        value: 1 },
  { shortLabel: "UAE",         value: 1 },
]

const BAR_MAX = 3

const topicData = [
  { label: "energy",           value: 4, color: "#38BDF8" },
  { label: "infrastructure",   value: 4, color: "#34D399" },
  { label: "industrialization", value: 2, color: "#818CF8" },
  { label: "logistics",        value: 2, color: "#FBBF24" },
  { label: "gas",              value: 2, color: "#60A5FA" },
  { label: "policy",           value: 1, color: "#A78BFA" },
  { label: "risk",             value: 1, color: "#FB7185" },
  { label: "banking",          value: 1, color: "#94A3B8" },
]

const DONUT_TOTAL = topicData.reduce((s, d) => s + d.value, 0)

const pipelineRows = [
  { label: "Completed",  value: 6, color: "#4ADE80" },
  { label: "Processing", value: 0, color: "#60A5FA" },
  { label: "Failed",     value: 0, color: "#FB7185" },
]

// Compute SVG path for a donut slice (angles in degrees, clockwise from top)
function donutSlicePath(
  cx: number, cy: number,
  outerR: number, innerR: number,
  startDeg: number, endDeg: number,
): string {
  const rad  = (d: number) => (d * Math.PI) / 180
  const large = endDeg - startDeg > 180 ? 1 : 0
  const f = (n: number) => n.toFixed(3)

  const ox1 = cx + outerR * Math.cos(rad(startDeg))
  const oy1 = cy + outerR * Math.sin(rad(startDeg))
  const ox2 = cx + outerR * Math.cos(rad(endDeg))
  const oy2 = cy + outerR * Math.sin(rad(endDeg))
  const ix1 = cx + innerR * Math.cos(rad(startDeg))
  const iy1 = cy + innerR * Math.sin(rad(startDeg))
  const ix2 = cx + innerR * Math.cos(rad(endDeg))
  const iy2 = cy + innerR * Math.sin(rad(endDeg))

  return [
    `M ${f(ox1)} ${f(oy1)}`,
    `A ${outerR} ${outerR} 0 ${large} 1 ${f(ox2)} ${f(oy2)}`,
    `L ${f(ix2)} ${f(iy2)}`,
    `A ${innerR} ${innerR} 0 ${large} 0 ${f(ix1)} ${f(iy1)}`,
    `Z`,
  ].join(" ")
}

function DashboardPanel() {
  const [hoveredTopic, setHoveredTopic] = useState<string | null>(null)

  // Donut slice opacity — dims non-hovered slices when any topic is active
  const sliceOpacity = (label: string) => {
    if (hoveredTopic === null) return 0.82
    return hoveredTopic === label ? 1 : 0.18
  }

  return (
    <>
      {/* Panel header ───────────────────────────────────────────────────────── */}
      <div className="border-b border-[rgba(147,147,147,0.14)] px-4 py-2.5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[10px] font-semibold text-white">Dashboard</p>
            <p className="mt-[2px] text-[8px] leading-snug text-[#777]">
              High-level intelligence overview across all active projects
            </p>
          </div>
          <button className="flex items-center gap-[5px] rounded-[4px] border border-[rgba(147,147,147,0.32)] bg-white/[0.05] px-2 py-[3.5px] transition-colors hover:bg-white/[0.09]">
            <Plus
              className="text-white/65"
              style={{ width: "8px", height: "8px" }}
            />
            <span className="text-[8px] font-medium text-white/70">Upload Interview</span>
          </button>
        </div>
      </div>

      {/* KPI cards ──────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-3 gap-[6px] px-3 pb-0 pt-2.5">
        {kpiCards.map((card) => {
          const Icon = card.icon
          return (
            <div
              key={card.label}
              className="cursor-pointer rounded-[5px] border border-[rgba(147,147,147,0.15)] px-3 py-2.5 transition-all duration-150 hover:border-[rgba(147,147,147,0.32)] hover:bg-white/[0.03]"
            >
              <div className="mb-[7px] flex items-center justify-between">
                <span className="text-[7.5px] font-semibold uppercase tracking-[0.07em] text-[#555]">
                  {card.label}
                </span>
                <div
                  className="flex h-[18px] w-[18px] items-center justify-center rounded-[3px] transition-all duration-150"
                  style={{ background: `${card.color}22` }}
                >
                  <Icon
                    className="shrink-0"
                    style={{ width: "9px", height: "9px", color: card.color }}
                    strokeWidth={1.5}
                  />
                </div>
              </div>
              <p className="text-[18px] font-bold leading-none text-white">{card.value}</p>
              <p className="mt-[5px] text-[7.5px] text-[#5a5a5a]">{card.sub}</p>
            </div>
          )
        })}
      </div>

      {/* Charts area ────────────────────────────────────────────────────────── */}
      <div className="flex flex-1 gap-[6px] overflow-hidden px-3 pb-3 pt-[7px]">

        {/* Left — Interviews by Project (horizontal bar chart) ──────────────── */}
        <div className="flex flex-1 flex-col overflow-hidden rounded-[5px] border border-[rgba(147,147,147,0.15)]">
          {/* Chart header */}
          <div className="flex items-start gap-1.5 border-b border-[rgba(147,147,147,0.10)] px-3 py-[7px]">
            <TrendingUp
              className="mt-px shrink-0 text-[#555]"
              style={{ width: "8px", height: "8px" }}
              strokeWidth={1.5}
            />
            <div>
              <p className="text-[8.5px] font-semibold text-white/75">Interviews by Project</p>
              <p className="mt-[1px] text-[7px] text-[#555]">Completed interviews per project</p>
            </div>
          </div>

          {/* Bars */}
          <div className="flex flex-1 flex-col justify-center gap-[9px] px-3 py-3">
            {barData.map((bar) => (
              <div
                key={bar.shortLabel}
                className="group flex cursor-pointer items-center gap-2"
              >
                {/* Label — brightens on row hover */}
                <span className="w-[52px] shrink-0 truncate text-right text-[7.5px] text-[#5a5a5a] transition-colors duration-150 group-hover:text-white/65">
                  {bar.shortLabel}
                </span>
                {/* Track — brightens slightly on row hover */}
                <div
                  className="relative flex-1 overflow-hidden rounded-full transition-all duration-150 group-hover:opacity-90"
                  style={{ height: "6px", background: "rgba(255,255,255,0.05)" }}
                >
                  <div
                    className="absolute left-0 top-0 h-full rounded-full"
                    style={{
                      width: `${(bar.value / BAR_MAX) * 100}%`,
                      background: "linear-gradient(90deg, #3A5BA0 0%, #4E78CF 100%)",
                    }}
                  />
                  {/* Highlight overlay on hover */}
                  <div className="absolute inset-0 rounded-full bg-white opacity-0 transition-opacity duration-150 group-hover:opacity-[0.06]" />
                </div>
                {/* Value — brightens on row hover */}
                <span className="w-[8px] shrink-0 text-left text-[7.5px] text-[#5a5a5a] transition-colors duration-150 group-hover:text-white/65">
                  {bar.value}
                </span>
              </div>
            ))}

            {/* X-axis tick labels */}
            <div className="flex items-center gap-2">
              <span className="w-[52px] shrink-0" />
              <div className="flex flex-1 justify-between">
                {[0, 1, 2, 3].map((n) => (
                  <span key={n} className="text-[6.5px] text-[#444]">{n}</span>
                ))}
              </div>
              <span className="w-[8px] shrink-0" />
            </div>
          </div>
        </div>

        {/* Right column ──────────────────────────────────────────────────────── */}
        <div className="flex w-[37%] flex-col gap-[6px] overflow-hidden">

          {/* Topic Distribution (donut) ─────────────────────────────────────── */}
          <div className="flex flex-1 flex-col overflow-hidden rounded-[5px] border border-[rgba(147,147,147,0.15)]">
            <div className="flex items-start gap-1.5 border-b border-[rgba(147,147,147,0.10)] px-3 py-[7px]">
              <Hash
                className="mt-px shrink-0 text-[#555]"
                style={{ width: "8px", height: "8px" }}
                strokeWidth={1.5}
              />
              <div>
                <p className="text-[8.5px] font-semibold text-white/75">Topic Distribution</p>
                <p className="mt-[1px] text-[7px] text-[#555]">Top 8 themes across all interviews</p>
              </div>
            </div>

            {/* Donut SVG + legend */}
            <div className="flex flex-1 items-center gap-3 overflow-hidden px-3 py-2">
              {/* SVG donut — slices respond to hoveredTopic */}
              <svg
                viewBox="0 0 76 76"
                className="h-[72px] w-[72px] shrink-0"
                aria-hidden="true"
              >
                {(() => {
                  let angle = -90
                  const gap = 1.2
                  return topicData.map((item) => {
                    const span  = (item.value / DONUT_TOTAL) * 360
                    const start = angle + gap / 2
                    const end   = angle + span - gap / 2
                    angle += span
                    return (
                      <path
                        key={item.label}
                        d={donutSlicePath(38, 38, 32, 20, start, end)}
                        fill={item.color}
                        opacity={sliceOpacity(item.label)}
                        style={{ transition: "opacity 0.18s ease", cursor: "pointer" }}
                        onMouseEnter={() => setHoveredTopic(item.label)}
                        onMouseLeave={() => setHoveredTopic(null)}
                      />
                    )
                  })
                })()}
              </svg>

              {/* Legend — hovering a row syncs with the donut slice */}
              <div className="flex min-w-0 flex-1 flex-col gap-[5px]">
                {topicData.map((item) => {
                  const isHov = hoveredTopic === item.label
                  const isDim = hoveredTopic !== null && !isHov
                  return (
                    <div
                      key={item.label}
                      className="flex cursor-pointer items-center gap-1.5"
                      style={{ transition: "opacity 0.18s ease", opacity: isDim ? 0.35 : 1 }}
                      onMouseEnter={() => setHoveredTopic(item.label)}
                      onMouseLeave={() => setHoveredTopic(null)}
                    >
                      <span
                        className="h-[5px] w-[5px] shrink-0 rounded-full"
                        style={{ background: item.color }}
                      />
                      <span
                        className="min-w-0 flex-1 truncate text-[7px] transition-colors duration-150"
                        style={{ color: isHov ? "rgba(255,255,255,0.75)" : "#5e6878" }}
                      >
                        {item.label}
                      </span>
                      <span
                        className="shrink-0 text-[7px] transition-colors duration-150"
                        style={{ color: isHov ? "rgba(255,255,255,0.60)" : "#4a5060" }}
                      >
                        {item.value}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Pipeline Status ─────────────────────────────────────────────────── */}
          <div className="rounded-[5px] border border-[rgba(147,147,147,0.15)] px-3 py-2.5">
            <p className="text-[8.5px] font-semibold text-white/75">Pipeline Status</p>
            <p className="mb-[8px] mt-[2px] text-[7px] text-[#555]">Interview processing</p>
            <div className="flex flex-col gap-[6px]">
              {pipelineRows.map((row) => (
                <div
                  key={row.label}
                  className="group flex cursor-default items-center gap-2"
                >
                  <span
                    className="h-[6px] w-[6px] shrink-0 rounded-full transition-opacity duration-150"
                    style={{ background: row.color, opacity: row.value === 0 ? 0.28 : 0.88 }}
                  />
                  <span className="flex-1 text-[7.5px] text-[#5e6878] transition-colors duration-150 group-hover:text-white/60">
                    {row.label}
                  </span>
                  <span className="text-[7.5px] text-[#4a5060] transition-colors duration-150 group-hover:text-white/55">
                    {row.value}
                  </span>
                </div>
              ))}
              {/* Total row */}
              <div className="mt-[2px] flex items-center gap-2 border-t border-[rgba(147,147,147,0.10)] pt-[5px]">
                <Mic
                  className="shrink-0 text-[#555]"
                  style={{ width: "7px", height: "7px" }}
                  strokeWidth={1.5}
                />
                <span className="flex-1 text-[7.5px] font-medium text-[#5e6878]">Total</span>
                <span className="text-[7.5px] font-semibold text-white/65">6</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

// ─── Mobile-optimised hero panel ─────────────────────────────────────────────
// The full HeroDashboardPanel uses 7–10 px internal type and a fixed aspect
// ratio — both unreadable below lg breakpoint. This component renders a clean,
// single-view Interviews panel at readable mobile scale, using the same design
// tokens as the desktop panel.

export function HeroDashboardPanelMobile() {
  return (
    <div
      className="w-full overflow-hidden rounded-[14px]"
      style={{
        background: "#070E1F",
        border: "1px solid rgba(147,147,147,0.16)",
        boxShadow:
          "0 0 0 1px rgba(255,255,255,0.025), 0 24px 60px -12px rgba(0,0,0,0.75), 0 6px 20px -4px rgba(0,0,0,0.5)",
      }}
    >
      {/* Chrome */}
      <div
        className="flex items-center justify-between px-4 py-3"
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
            className="text-[11px] font-medium uppercase tracking-[0.07em]"
            style={{ color: "rgba(255,255,255,0.28)" }}
          >
            Sovereign · Interviews
          </span>
        </div>
        <div
          className="flex items-center gap-1.5 rounded-full px-2 py-[3px]"
          style={{
            background: "rgba(74,222,128,0.07)",
            border: "1px solid rgba(74,222,128,0.17)",
          }}
        >
          <div className="h-[5px] w-[5px] rounded-full bg-[#4ADE80]" />
          <span className="text-[9px] font-semibold uppercase tracking-[0.09em] text-[#4ADE80]">
            Ready
          </span>
        </div>
      </div>

      {/* Panel header */}
      <div
        className="px-4 pb-3 pt-3.5"
        style={{ borderBottom: "1px solid rgba(147,147,147,0.08)" }}
      >
        <p className="text-[12px] font-semibold text-white">All Interviews</p>
        <p className="mt-0.5 text-[10.5px] text-[#5e6878]">
          6 interviews across active projects · 6 ready
        </p>
      </div>

      {/* Interview rows */}
      <div>
        {interviews.map((iv, idx) => (
          <div
            key={iv.id}
            className="flex items-center gap-3 px-4 py-3.5"
            style={{
              borderBottom:
                idx < interviews.length - 1 ? "1px solid rgba(147,147,147,0.07)" : undefined,
            }}
          >
            {/* Mic icon */}
            <div
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border"
              style={{
                background: "rgba(78,92,210,0.13)",
                borderColor: "rgba(78,92,210,0.28)",
              }}
            >
              <Mic className="h-3.5 w-3.5 text-[#7c8fd4]" strokeWidth={1.5} />
            </div>

            {/* Name + title */}
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-semibold leading-none text-white">{iv.person}</p>
              <p className="mt-1 truncate text-[11px] leading-none text-[#5e6878]">
                {iv.title}
                <span className="mx-[5px] opacity-40">·</span>
                {iv.project}
              </p>
            </div>

            {/* Duration + status */}
            <div className="flex shrink-0 flex-col items-end gap-1">
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3 text-[#4a4a4a]" />
                <span className="text-[11px] tabular-nums text-[#5e5e5e]">{iv.duration}</span>
              </div>
              <span className="text-[11px] font-medium text-[#4ADE80]">Ready</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function HeroDashboardPanel() {
  const [activeNav, setActiveNav] = useState("Network Explorer")

  const handleNavClick = (label: string) => {
    if (
      label === "Dashboard"        ||
      label === "Projects"         ||
      label === "Interviews"       ||
      label === "Network Explorer"
    ) {
      setActiveNav(label)
    }
  }

  return (
    <div
      className="flex w-full overflow-hidden rounded-[17px] border border-[rgba(147,147,147,0.16)]"
      style={{
        aspectRatio: "880 / 498",
        background: "#070E1F",
        boxShadow: [
          "0 0 0 1px rgba(255,255,255,0.05)",
          "0 32px 80px -12px rgba(0,0,0,0.85)",
          "0 8px 32px -4px rgba(0,0,0,0.55)",
        ].join(", "),
      }}
    >
      {/* ── Left sidebar ──────────────────────────────────────────────── */}
      <div
        className="flex shrink-0 flex-col gap-6 px-5 py-5"
        style={{ width: "22%" }}
      >
        <div className="flex items-center justify-between">
          <Image
            src="/sovereign_log_apaisado_blanco.svg"
            alt="Sovereign"
            width={79}
            height={20}
            className="opacity-80"
            style={{ maxWidth: "78%", height: "auto" }}
          />
          <ChevronLeft
            className="shrink-0 cursor-pointer text-white/25 transition-colors duration-150 hover:text-white/50"
            style={{ width: "13px", height: "13px" }}
          />
        </div>

        <NavSection
          label="Platform"
          items={platformNav}
          activeItem={activeNav}
          onItemClick={handleNavClick}
        />
        <NavSection
          label="System"
          items={systemNav}
          activeItem={activeNav}
          onItemClick={handleNavClick}
        />
      </div>

      {/* ── Central panel ─────────────────────────────────────────────── */}
      <div
        className="my-[1%] mr-[1%] flex flex-1 flex-col overflow-hidden rounded-[6px] border border-[rgba(147,147,147,0.2)]"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.012) 0%, #070E1F 28%)",
        }}
      >
        {activeNav === "Dashboard"   ? <DashboardPanel />
          : activeNav === "Projects"   ? <ProjectsPanel />
          : activeNav === "Interviews" ? <InterviewsPanel />
          : <NetworkExplorerPanel />}
      </div>
    </div>
  )
}
