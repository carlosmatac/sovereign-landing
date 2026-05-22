"use client"

import { useCallback } from "react"
import {
  ReactFlow,
  Handle,
  Position,
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
  Background,
  BackgroundVariant,
  useNodesState,
  type Node,
  type Edge,
  type NodeProps,
  type EdgeProps,
} from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import type { LucideIcon } from "lucide-react"
import {
  Building2,
  User,
  Landmark,
  FileText,
  Lightbulb,
  FolderKanban,
  Globe,
  CalendarDays,
  TrendingUp,
  Newspaper,
} from "lucide-react"
import { useState } from "react"
import { MktContainer, MktSectionX } from "@/components/marketing-layout"
import { useT } from "@/lib/i18n/locale-context"

// ─── Entity types ─────────────────────────────────────────────────────────────

type EntityType =
  | "company"
  | "person"
  | "organization"
  | "document"
  | "topic"
  | "project"
  | "country"
  | "event"
  | "opportunity"
  | "source"

const ENTITY_COLORS: Record<EntityType, string> = {
  company:      "#2563EB",
  person:       "#7C3AED",
  organization: "#D97706",
  document:     "#059669",
  topic:        "#E11D48",
  project:      "#0891B2",
  country:      "#16A34A",
  event:        "#9333EA",
  opportunity:  "#EA580C",
  source:       "#6366F1",
}

const ENTITY_ICONS: Record<EntityType, LucideIcon> = {
  company:      Building2,
  person:       User,
  organization: Landmark,
  document:     FileText,
  topic:        Lightbulb,
  project:      FolderKanban,
  country:      Globe,
  event:        CalendarDays,
  opportunity:  TrendingUp,
  source:       Newspaper,
}

// ─── EntityNode ───────────────────────────────────────────────────────────────

interface EntityNodeData {
  label: string
  entityType: EntityType
  meta?: string
  [key: string]: unknown
}

function EntityNode({ data }: NodeProps<Node<EntityNodeData>>) {
  const color = ENTITY_COLORS[data.entityType]
  const Icon = ENTITY_ICONS[data.entityType]

  return (
    <>
      <Handle type="target" position={Position.Top}    style={{ opacity: 0, pointerEvents: "none" }} />
      <Handle type="target" position={Position.Left}   style={{ opacity: 0, pointerEvents: "none" }} />
      <Handle type="source" position={Position.Bottom} style={{ opacity: 0, pointerEvents: "none" }} />
      <Handle type="source" position={Position.Right}  style={{ opacity: 0, pointerEvents: "none" }} />

      <div
        style={{
          width: 180,
          background: "#ffffff",
          borderRadius: 12,
          border: `1px solid ${color}1f`,
          boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.055)",
          padding: "9px 11px",
          display: "flex",
          alignItems: "flex-start",
          gap: 9,
          fontFamily: "'Inter', sans-serif",
          cursor: "grab",
        }}
      >
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: 8,
            background: `${color}1a`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            marginTop: 1,
          }}
        >
          <Icon size={13} strokeWidth={1.8} color={color} />
        </div>

        <div style={{ minWidth: 0, flex: 1 }}>
          <p
            style={{
              margin: 0,
              fontSize: 8.5,
              fontWeight: 600,
              letterSpacing: "0.09em",
              textTransform: "uppercase" as const,
              color,
              lineHeight: 1.2,
            }}
          >
            {data.entityType}
          </p>
          <p
            style={{
              margin: "2px 0 0",
              fontSize: 12.5,
              fontWeight: 600,
              color: "#1a1a2e",
              lineHeight: 1.3,
              letterSpacing: "-0.015em",
            }}
          >
            {data.label}
          </p>
          {data.meta && (
            <p
              style={{
                margin: "2px 0 0",
                fontSize: 10,
                color: "#9ca3af",
                lineHeight: 1.3,
                letterSpacing: "-0.005em",
              }}
            >
              {data.meta}
            </p>
          )}
        </div>
      </div>
    </>
  )
}

// ─── AksumNode ────────────────────────────────────────────────────────────────

function AksumNode() {
  return (
    <>
      <Handle type="target" position={Position.Top}    style={{ opacity: 0, pointerEvents: "none" }} />
      <Handle type="target" position={Position.Left}   style={{ opacity: 0, pointerEvents: "none" }} />
      <Handle type="source" position={Position.Bottom} style={{ opacity: 0, pointerEvents: "none" }} />
      <Handle type="source" position={Position.Right}  style={{ opacity: 0, pointerEvents: "none" }} />

      <div
        style={{
          width: 204,
          background: "#ffffff",
          borderRadius: 14,
          border: "1.5px solid rgba(37,99,235,0.22)",
          boxShadow: "0 2px 4px rgba(0,0,0,0.04), 0 6px 24px rgba(37,99,235,0.1)",
          padding: "11px 13px",
          display: "flex",
          alignItems: "center",
          gap: 11,
          fontFamily: "'Inter', sans-serif",
          cursor: "grab",
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            background: "rgba(37,99,235,0.07)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            overflow: "hidden",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/icon_ak.svg"
            alt="Aksum"
            style={{ width: 32, height: 32, objectFit: "contain" }}
          />
        </div>

        <div>
          <p
            style={{
              margin: 0,
              fontSize: 8.5,
              fontWeight: 600,
              letterSpacing: "0.09em",
              textTransform: "uppercase" as const,
              color: "#2563EB",
              lineHeight: 1.2,
            }}
          >
            Platform
          </p>
          <p
            style={{
              margin: "2px 0 0",
              fontSize: 15,
              fontWeight: 700,
              color: "#1a1a2e",
              lineHeight: 1.25,
              letterSpacing: "-0.022em",
            }}
          >
            Aksum
          </p>
          <p
            style={{
              margin: "2px 0 0",
              fontSize: 10,
              color: "#9ca3af",
              lineHeight: 1.3,
            }}
          >
            Knowledge Hub
          </p>
        </div>
      </div>
    </>
  )
}

// ─── AnimatedEdge ─────────────────────────────────────────────────────────────

interface AnimatedEdgeData {
  label: string
  color?: string
  [key: string]: unknown
}

function AnimatedEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  markerEnd,
}: EdgeProps<Edge<AnimatedEdgeData>>) {
  const [hovered, setHovered] = useState(false)
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  })

  const color = data?.color ?? "#9ca3af"

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          stroke: hovered ? `${color}70` : `${color}2e`,
          strokeWidth: hovered ? 2 : 1.5,
          transition: "stroke 180ms, stroke-width 180ms",
        }}
        interactionWidth={18}
      />

      <path
        d={edgePath}
        fill="none"
        stroke="transparent"
        strokeWidth={18}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      />

      {data?.label && hovered && (
        <EdgeLabelRenderer>
          <div
            style={{
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              fontFamily: "'Inter', sans-serif",
              fontSize: 9.5,
              fontWeight: 500,
              letterSpacing: "-0.005em",
              color: "#6b7280",
              background: "#ffffff",
              border: "1px solid rgba(26,26,46,0.09)",
              borderRadius: 5,
              padding: "2px 6px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
              pointerEvents: "none",
              position: "absolute",
              whiteSpace: "nowrap",
            }}
          >
            {data.label}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  )
}

// ─── Node / edge registries ───────────────────────────────────────────────────

const nodeTypes = { entity: EntityNode, aksum: AksumNode }
const edgeTypes = { animated: AnimatedEdge }

// ─── Collision relaxation ─────────────────────────────────────────────────────

// Estimated node bounding box (canvas coords, including a generous soft gap)
const NODE_W = 214  // 180 + 34 buffer
const NODE_H = 96   // ~70 + 26 buffer
const AKSUM_W = 238 // 204 + 34 buffer

function relaxCollisions(nodes: Node[]): Node[] {
  const pts = nodes.map((n) => ({ ...n, position: { ...n.position } }))

  for (let iter = 0; iter < 8; iter++) {
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const a = pts[i]
        const b = pts[j]
        const aw = a.type === "aksum" ? AKSUM_W : NODE_W
        const bw = b.type === "aksum" ? AKSUM_W : NODE_W

        const dx = b.position.x - a.position.x
        const dy = b.position.y - a.position.y
        const minDx = (aw + bw) / 2
        const minDy = NODE_H

        const overlapX = minDx - Math.abs(dx)
        const overlapY = minDy - Math.abs(dy)

        if (overlapX > 0 && overlapY > 0) {
          // Push apart along the axis with less overlap
          if (overlapX <= overlapY) {
            const push = overlapX * 0.5 + 1
            if (dx >= 0) { b.position.x += push; a.position.x -= push }
            else         { b.position.x -= push; a.position.x += push }
          } else {
            const push = overlapY * 0.5 + 1
            if (dy >= 0) { b.position.y += push; a.position.y -= push }
            else         { b.position.y -= push; a.position.y += push }
          }
        }
      }
    }
  }

  return pts
}

// ─── Graph data ───────────────────────────────────────────────────────────────

const C = ENTITY_COLORS

const INITIAL_NODES: Node[] = [
  // ── Central hub ──────────────────────────────────────────── col 4 of 7
  { id: "aksum",          type: "aksum",  position: { x: 848, y: 258 }, data: {} },

  // ── Col 1 — far-left: people & sources (x ≈ 35) ──────────────────────
  { id: "sofia",          type: "entity", position: { x:  35, y:  50 }, data: { label: "Sofia Mendes",              entityType: "person",       meta: "Finance Director"    } },
  { id: "elena",          type: "entity", position: { x:  35, y: 175 }, data: { label: "Elena Varga",               entityType: "person",       meta: "Investment Director"  } },
  { id: "investor_brief", type: "entity", position: { x:  35, y: 298 }, data: { label: "Investor Briefing",         entityType: "source",       meta: "Q2 2025"             } },
  { id: "ceo_interview",  type: "entity", position: { x:  35, y: 418 }, data: { label: "CEO Interview",             entityType: "source",       meta: "Jun 2025"            } },
  { id: "board_brief",    type: "entity", position: { x:  35, y: 530 }, data: { label: "Board Brief Q3",            entityType: "document",     meta: "Confidential"        } },

  // ── Col 2 — organizations & event (x ≈ 272) ──────────────────────────
  { id: "ministry_fin",   type: "entity", position: { x: 272, y:  30 }, data: { label: "Ministry of Finance",       entityType: "organization", meta: "Angola"              } },
  { id: "ministry",       type: "entity", position: { x: 272, y: 158 }, data: { label: "Ministry of Energy",        entityType: "organization", meta: "Angola"              } },
  { id: "nat_energy",     type: "entity", position: { x: 272, y: 286 }, data: { label: "National Energy Agency",    entityType: "organization"                              } },
  { id: "follow_up",      type: "entity", position: { x: 272, y: 418 }, data: { label: "Follow-up Memo",            entityType: "document",     meta: "Internal"            } },
  { id: "luanda_forum",   type: "entity", position: { x: 258, y: 530 }, data: { label: "Luanda Energy Forum",       entityType: "event",        meta: "Oct 2025"            } },

  // ── Col 3 — center-left: opportunities & geography (x ≈ 518) ─────────
  { id: "govt_partner",   type: "entity", position: { x: 518, y:  30 }, data: { label: "Gov. Partnership",          entityType: "opportunity"                               } },
  { id: "angola",         type: "entity", position: { x: 508, y: 320 }, data: { label: "Angola",                    entityType: "country",      meta: "Sub-Saharan Africa"  } },
  { id: "angola_outlook", type: "entity", position: { x: 508, y: 445 }, data: { label: "Angola Investment Outlook", entityType: "document",     meta: "Report 2025"         } },
  { id: "southern_africa",type: "entity", position: { x: 495, y: 558 }, data: { label: "Southern Africa",           entityType: "country"                                   } },

  // ── Col 5 — center-right: projects & documents (x ≈ 1078) ────────────
  { id: "market_entry",   type: "entity", position: { x: 1078, y:  30 }, data: { label: "Market Entry",             entityType: "opportunity"                               } },
  { id: "atlantic_grid",  type: "entity", position: { x: 1078, y: 320 }, data: { label: "Atlantic Grid Expansion",  entityType: "project",      meta: "Active"              } },
  { id: "strategic_plan", type: "entity", position: { x: 1068, y: 445 }, data: { label: "Strategic Expansion Plan", entityType: "document",     meta: "2025–2027"           } },
  { id: "port_luanda",    type: "entity", position: { x: 1062, y: 558 }, data: { label: "Port of Luanda",           entityType: "project",      meta: "Infrastructure"      } },

  // ── Col 6 — mid-right: companies (x ≈ 1320) ──────────────────────────
  { id: "kwanza",         type: "entity", position: { x: 1320, y:  55 }, data: { label: "Kwanza Infrastructure Fund",entityType: "company",     meta: "Private Equity"      } },
  { id: "meridian",       type: "entity", position: { x: 1320, y: 183 }, data: { label: "Meridian Capital",          entityType: "company",     meta: "Private Equity"      } },

  // ── Col 7 — far-right: topics (x ≈ 1548) ─────────────────────────────
  { id: "energy_trans",   type: "entity", position: { x: 1548, y:  50 }, data: { label: "Energy Transition",        entityType: "topic"                                     } },
  { id: "reg_reform",     type: "entity", position: { x: 1548, y: 178 }, data: { label: "Regulatory Reform",        entityType: "topic"                                     } },
  { id: "infra_finance",  type: "entity", position: { x: 1548, y: 308 }, data: { label: "Infrastructure Finance",   entityType: "topic"                                     } },
  { id: "digital_pay",    type: "entity", position: { x: 1548, y: 430 }, data: { label: "Digital Payments",         entityType: "topic"                                     } },
  { id: "infra_risk",     type: "entity", position: { x: 1548, y: 548 }, data: { label: "Infrastructure Risk",      entityType: "topic"                                     } },
]

const INITIAL_EDGES: Edge<AnimatedEdgeData>[] = [
  // ── Hub connections ────────────────────────────────────────────────────
  { id: "e-elena-aksum",    source: "elena",          target: "aksum",         type: "animated", data: { label: "advises",        color: C.person       } },
  { id: "e-sofia-aksum",    source: "sofia",          target: "aksum",         type: "animated", data: { label: "advises",        color: C.person       } },
  { id: "e-aksum-ministry", source: "aksum",          target: "ministry",      type: "animated", data: { label: "partners_with",  color: C.company      } },
  { id: "e-aksum-meridian", source: "aksum",          target: "meridian",      type: "animated", data: { label: "backed_by",      color: C.company      } },
  { id: "e-aksum-angola",   source: "aksum",          target: "angola",        type: "animated", data: { label: "operates_in",    color: C.company      } },
  { id: "e-aksum-atlantic", source: "aksum",          target: "atlantic_grid", type: "animated", data: { label: "leads",          color: C.company      } },
  { id: "e-govt-aksum",     source: "govt_partner",   target: "aksum",         type: "animated", data: { label: "involves",       color: C.opportunity  } },
  { id: "e-board-aksum",    source: "board_brief",    target: "aksum",         type: "animated", data: { label: "about",          color: C.document     } },
  { id: "e-minfin-aksum",   source: "ministry_fin",   target: "aksum",         type: "animated", data: { label: "co-operates",    color: C.organization } },
  { id: "e-strategic-aksum",source: "strategic_plan", target: "aksum",         type: "animated", data: { label: "guides",         color: C.document     } },

  // ── Person cluster ─────────────────────────────────────────────────────
  { id: "e-elena-interview",source: "elena",          target: "ceo_interview", type: "animated", data: { label: "featured_in",    color: C.person       } },
  { id: "e-sofia-brief",    source: "sofia",          target: "investor_brief",type: "animated", data: { label: "in_source",      color: C.person       } },
  { id: "e-follow-elena",   source: "follow_up",      target: "elena",         type: "animated", data: { label: "regarding",      color: C.document     } },

  // ── Organization cluster ───────────────────────────────────────────────
  { id: "e-nat-atlantic",   source: "nat_energy",     target: "atlantic_grid", type: "animated", data: { label: "monitors",       color: C.organization } },
  { id: "e-min-atlantic",   source: "ministry",       target: "atlantic_grid", type: "animated", data: { label: "oversees",       color: C.organization } },
  { id: "e-reg-nat",        source: "reg_reform",     target: "nat_energy",    type: "animated", data: { label: "mandated_by",    color: C.topic        } },

  // ── Company cluster ────────────────────────────────────────────────────
  { id: "e-kwanza-atlantic",source: "kwanza",         target: "atlantic_grid", type: "animated", data: { label: "co_invests",     color: C.company      } },
  { id: "e-kwanza-market",  source: "kwanza",         target: "market_entry",  type: "animated", data: { label: "leads",          color: C.company      } },
  { id: "e-meridian-atlantic",source:"meridian",      target: "atlantic_grid", type: "animated", data: { label: "finances",       color: C.company      } },

  // ── Project / geography cluster ────────────────────────────────────────
  { id: "e-atlantic-angola",source: "atlantic_grid",  target: "angola",        type: "animated", data: { label: "based_in",       color: C.project      } },
  { id: "e-atlantic-energy",source: "atlantic_grid",  target: "energy_trans",  type: "animated", data: { label: "drives",         color: C.project      } },
  { id: "e-atlantic-infra", source: "atlantic_grid",  target: "infra_finance", type: "animated", data: { label: "requires",       color: C.project      } },
  { id: "e-port-atlantic",  source: "port_luanda",    target: "atlantic_grid", type: "animated", data: { label: "enables",        color: C.project      } },
  { id: "e-luanda-atlantic",source: "luanda_forum",   target: "atlantic_grid", type: "animated", data: { label: "showcases",      color: C.event        } },
  { id: "e-southern-angola",source: "southern_africa",target: "angola",        type: "animated", data: { label: "contains",       color: C.country      } },

  // ── Document / report cluster ──────────────────────────────────────────
  { id: "e-outlook-angola", source: "angola_outlook", target: "angola",        type: "animated", data: { label: "covers",         color: C.document     } },
  { id: "e-digital-market", source: "digital_pay",    target: "market_entry",  type: "animated", data: { label: "supports",       color: C.topic        } },
  { id: "e-risk-atlantic",  source: "infra_risk",     target: "atlantic_grid", type: "animated", data: { label: "affects",        color: C.topic        } },
]

// ─── Section ──────────────────────────────────────────────────────────────────

export function KnowledgeGraphSection() {
  const t = useT()

  const [nodes, setNodes, onNodesChange] = useNodesState(INITIAL_NODES)

  const onNodeDragStop = useCallback(() => {
    setNodes((nds) => relaxCollisions(nds))
  }, [setNodes])

  const onInit = useCallback(
    (instance: { fitView: (opts?: object) => void }) => {
      setTimeout(() => instance.fitView({ padding: 0.04 }), 50)
    },
    [],
  )

  return (
    <section
      id="knowledge-graph"
      className="scroll-mt-24 py-14 md:py-20"
      style={{ backgroundColor: "var(--mkt-bg)" }}
    >
      {/* Header text */}
      <MktSectionX>
        <MktContainer>
          <p
            className="text-center text-[10px] font-medium uppercase tracking-[0.18em]"
            style={{ color: "var(--mkt-text-muted)" }}
          >
            {t.knowledgeGraph.eyebrow}
          </p>
          <h2
            className="mt-4 text-balance text-center font-serif text-[28px] font-normal tracking-[-0.022em] md:text-[38px] md:leading-[1.15]"
            style={{ color: "var(--mkt-text)" }}
          >
            {t.knowledgeGraph.headline}
          </h2>
          <p
            className="mx-auto mt-5 max-w-2xl text-balance text-center text-[15px] leading-relaxed tracking-[-0.008em]"
            style={{ color: "var(--mkt-text-muted)" }}
          >
            {t.knowledgeGraph.description}
          </p>
        </MktContainer>
      </MktSectionX>

      {/* Graph — full-width, no enclosing border */}
      <div className="relative mt-8 h-[480px] w-full md:h-[540px]">
        <ReactFlow
          nodes={nodes}
          edges={INITIAL_EDGES}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onNodesChange={onNodesChange}
          onNodeDragStop={onNodeDragStop}
          onInit={onInit}
          nodesDraggable
          nodesConnectable={false}
          elementsSelectable={false}
          panOnDrag={false}
          zoomOnScroll={false}
          zoomOnPinch={false}
          zoomOnDoubleClick={false}
          preventScrolling={false}
          proOptions={{ hideAttribution: true }}
          fitView
        >
          <Background
            variant={BackgroundVariant.Dots}
            gap={22}
            size={1.2}
            color="rgba(0,0,0,0.09)"
          />
        </ReactFlow>
      </div>
    </section>
  )
}
