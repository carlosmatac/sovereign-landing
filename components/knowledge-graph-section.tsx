"use client"

import { useCallback, useMemo, useState } from "react"
import {
  ReactFlow,
  Handle,
  Position,
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
  type Node,
  type Edge,
  type NodeProps,
  type EdgeProps,
} from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import { useT } from "@/lib/i18n/locale-context"

type EntityType =
  | "company"
  | "person"
  | "organization"
  | "document"
  | "topic"
  | "project"

const ENTITY_COLORS: Record<EntityType, string> = {
  company: "#3B5BDB",
  person: "#7C3AED",
  organization: "#D97706",
  document: "#059669",
  topic: "#E11D48",
  project: "#0891B2",
}

interface EntityNodeData {
  label: string
  entityType: EntityType
  [key: string]: unknown
}

function EntityNode({ data }: NodeProps<Node<EntityNodeData>>) {
  const color = ENTITY_COLORS[data.entityType]
  return (
    <>
      <Handle type="target" position={Position.Top} className="!opacity-0" />
      <div
        className="min-w-[120px] rounded-lg border bg-white px-3 py-2.5"
        style={{
          borderLeftWidth: "3px",
          borderLeftColor: color,
          borderColor: `${color}25`,
          boxShadow: "0 4px 16px rgba(26,26,46,0.06)",
        }}
      >
        <p
          className="text-[9px] font-medium uppercase tracking-[0.1em]"
          style={{ color }}
        >
          {data.entityType}
        </p>
        <p
          className="text-[13px] font-medium tracking-[-0.01em]"
          style={{ color: "var(--mkt-text)" }}
        >
          {data.label}
        </p>
      </div>
      <Handle type="source" position={Position.Bottom} className="!opacity-0" />
    </>
  )
}

interface AnimatedEdgeData {
  label: string
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

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          stroke: hovered ? "rgba(59,91,219,0.55)" : "rgba(59,91,219,0.22)",
          strokeWidth: hovered ? 2 : 1.5,
          transition: "stroke 200ms, stroke-width 200ms",
        }}
        interactionWidth={20}
      />
      <circle r="0" fill="transparent">
        <animateMotion dur="3s" repeatCount="indefinite" path={edgePath} />
      </circle>
      <circle r="3" fill="#3B5BDB" opacity={0.85}>
        <animateMotion dur="3s" repeatCount="indefinite" path={edgePath} />
      </circle>
      <path
        d={edgePath}
        fill="none"
        stroke="transparent"
        strokeWidth={20}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      />
      {data?.label && hovered && (
        <EdgeLabelRenderer>
          <div
            className="pointer-events-none absolute rounded-md border bg-white px-2 py-1 text-[11px] font-medium tracking-[-0.005em]"
            style={{
              transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
              color: "var(--mkt-text-muted)",
              borderColor: "var(--mkt-border-strong)",
              boxShadow: "0 4px 12px rgba(26,26,46,0.08)",
            }}
          >
            {data.label}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  )
}

const nodeTypes = { entity: EntityNode }
const edgeTypes = { animated: AnimatedEdge }

const INITIAL_NODES: Node<EntityNodeData>[] = [
  {
    id: "aksum",
    type: "entity",
    position: { x: 280, y: 180 },
    data: { label: "Aksum", entityType: "company" },
  },
  {
    id: "maria",
    type: "entity",
    position: { x: 80, y: 60 },
    data: { label: "Maria Chen", entityType: "person" },
  },
  {
    id: "fintech",
    type: "entity",
    position: { x: 520, y: 40 },
    data: { label: "Fintech", entityType: "topic" },
  },
  {
    id: "interview",
    type: "entity",
    position: { x: 40, y: 280 },
    data: { label: "CEO Interview", entityType: "document" },
  },
  {
    id: "expansion",
    type: "entity",
    position: { x: 500, y: 300 },
    data: { label: "Expansion 2026", entityType: "project" },
  },
  {
    id: "ministry",
    type: "entity",
    position: { x: 560, y: 170 },
    data: { label: "Ministry of Trade", entityType: "organization" },
  },
  {
    id: "nairobi",
    type: "entity",
    position: { x: 300, y: 20 },
    data: { label: "Nairobi", entityType: "topic" },
  },
]

const INITIAL_EDGES: Edge<AnimatedEdgeData>[] = [
  {
    id: "e1",
    source: "maria",
    target: "aksum",
    type: "animated",
    data: { label: "is_ceo_of" },
  },
  {
    id: "e2",
    source: "aksum",
    target: "fintech",
    type: "animated",
    data: { label: "operates_in_industry" },
  },
  {
    id: "e3",
    source: "interview",
    target: "expansion",
    type: "animated",
    data: { label: "belongs_to" },
  },
  {
    id: "e4",
    source: "maria",
    target: "interview",
    type: "animated",
    data: { label: "authored" },
  },
  {
    id: "e5",
    source: "aksum",
    target: "ministry",
    type: "animated",
    data: { label: "works_with" },
  },
  {
    id: "e6",
    source: "aksum",
    target: "nairobi",
    type: "animated",
    data: { label: "located_in" },
  },
  {
    id: "e7",
    source: "expansion",
    target: "fintech",
    type: "animated",
    data: { label: "focuses_on" },
  },
]

export function KnowledgeGraphSection() {
  const t = useT()
  const nodes = useMemo(() => INITIAL_NODES, [])
  const edges = useMemo(() => INITIAL_EDGES, [])

  const onInit = useCallback((instance: { fitView: (opts?: object) => void }) => {
    setTimeout(() => instance.fitView({ padding: 0.2 }), 50)
  }, [])

  return (
    <section
      id="knowledge-graph"
      className="scroll-mt-24 px-6 py-20 md:py-28"
      style={{ backgroundColor: "var(--mkt-bg)" }}
    >
      <div className="mx-auto max-w-5xl">
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

        <div
          className="relative mt-12 h-[380px] overflow-hidden rounded-2xl border bg-white md:h-[420px]"
          style={{ borderColor: "var(--mkt-border)" }}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            onInit={onInit}
            nodesDraggable={false}
            nodesConnectable={false}
            elementsSelectable={false}
            panOnDrag={false}
            zoomOnScroll={false}
            zoomOnPinch={false}
            zoomOnDoubleClick={false}
            preventScrolling={false}
            proOptions={{ hideAttribution: true }}
            fitView
          />
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-4">
          {(Object.entries(ENTITY_COLORS) as [EntityType, string][]).map(
            ([type, color]) => (
              <div key={type} className="flex items-center gap-2">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <span
                  className="text-[11px] capitalize tracking-[-0.005em]"
                  style={{ color: "var(--mkt-text-muted)" }}
                >
                  {type}
                </span>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  )
}
