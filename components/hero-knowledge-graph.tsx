"use client"

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  Building2,
  FileText,
  FolderKanban,
  Globe,
  Landmark,
  Mic,
  Tag,
  User,
  type LucideIcon,
} from "lucide-react"
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

export type HeroEntityType =
  | "company"
  | "person"
  | "organization"
  | "document"
  | "interview"
  | "topic"
  | "project"
  | "country"

export const HERO_ENTITY_COLORS: Record<HeroEntityType, string> = {
  company: "#5278D4",
  person: "#8568B8",
  organization: "#B8892E",
  document: "#3D9A72",
  interview: "#4A8FB5",
  topic: "#C04E72",
  project: "#3A94B8",
  country: "#6B8299",
}

const ENTITY_META: Record<
  HeroEntityType,
  { label: string; Icon: LucideIcon }
> = {
  company: { label: "Company", Icon: Building2 },
  person: { label: "Person", Icon: User },
  organization: { label: "Organization", Icon: Landmark },
  document: { label: "Document", Icon: FileText },
  interview: { label: "Meeting", Icon: Mic },
  topic: { label: "Topic", Icon: Tag },
  project: { label: "Project", Icon: FolderKanban },
  country: { label: "Country", Icon: Globe },
}

interface HeroEntityNodeData {
  label: string
  entityType: HeroEntityType
  floatDuration: number
  floatDelay: number
  [key: string]: unknown
}

interface HeroCenterNodeData {
  [key: string]: unknown
}

interface HeroEdgeData {
  label: string
  speed?: number
  [key: string]: unknown
}

const HoveredEdgeContext = createContext<string | null>(null)

const PARTICLE_RADIUS = 2
const PARTICLE_BASE_DURATION = 6.5

/** Card footprint used when converting polar coords → node position. */
const CARD_OFFSET_X = 52
const CARD_OFFSET_Y = 24

function HeroCenterNode() {
  return (
    <div className="relative flex h-[80px] w-[80px] items-center justify-center">
      <motion.div
        aria-hidden="true"
        className="absolute inset-[-14px] rounded-full border border-white/25"
        animate={{ scale: [1, 1.12, 1], opacity: [0.35, 0.08, 0.35] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute inset-[-6px] rounded-full border border-white/35"
        animate={{ scale: [1, 1.06, 1], opacity: [0.5, 0.2, 0.5] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
      />
      <motion.div
        className="relative z-10 flex h-[64px] w-[64px] items-center justify-center rounded-full bg-white shadow-[0_2px_10px_rgba(26,26,46,0.06)]"
        animate={{ scale: [1, 1.025, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src="/icon_ak.svg"
          alt=""
          width={38}
          height={38}
          className="h-[38px] w-[38px] object-contain"
          priority
        />
      </motion.div>
      <Handle type="target" position={Position.Top} className="!opacity-0 !min-h-0 !min-w-0 !h-0 !w-0 !border-0" />
      <Handle type="target" position={Position.Right} className="!opacity-0 !min-h-0 !min-w-0 !h-0 !w-0 !border-0" />
      <Handle type="target" position={Position.Bottom} className="!opacity-0 !min-h-0 !min-w-0 !h-0 !w-0 !border-0" />
      <Handle type="target" position={Position.Left} className="!opacity-0 !min-h-0 !min-w-0 !h-0 !w-0 !border-0" />
    </div>
  )
}

function HeroEntityNode({ data }: NodeProps<Node<HeroEntityNodeData>>) {
  const color = HERO_ENTITY_COLORS[data.entityType]
  const { label: typeLabel, Icon } = ENTITY_META[data.entityType]

  return (
    <motion.div
      animate={{ y: [0, -3, 0] }}
      transition={{
        duration: data.floatDuration,
        repeat: Infinity,
        ease: "easeInOut",
        delay: data.floatDelay,
      }}
    >
      <Handle type="source" position={Position.Top} className="!opacity-0 !min-h-0 !min-w-0 !h-0 !w-0 !border-0" />
      <Handle type="source" position={Position.Right} className="!opacity-0 !min-h-0 !min-w-0 !h-0 !w-0 !border-0" />
      <Handle type="source" position={Position.Bottom} className="!opacity-0 !min-h-0 !min-w-0 !h-0 !w-0 !border-0" />
      <Handle type="source" position={Position.Left} className="!opacity-0 !min-h-0 !min-w-0 !h-0 !w-0 !border-0" />
      <Handle type="target" position={Position.Top} className="!opacity-0 !min-h-0 !min-w-0 !h-0 !w-0 !border-0" />
      <Handle type="target" position={Position.Right} className="!opacity-0 !min-h-0 !min-w-0 !h-0 !w-0 !border-0" />
      <Handle type="target" position={Position.Bottom} className="!opacity-0 !min-h-0 !min-w-0 !h-0 !w-0 !border-0" />
      <Handle type="target" position={Position.Left} className="!opacity-0 !min-h-0 !min-w-0 !h-0 !w-0 !border-0" />

      <div
        className="w-[104px] rounded-lg border bg-white px-2 py-1.5"
        style={{
          borderColor: `${color}40`,
          borderLeftWidth: "3px",
          borderLeftColor: color,
          boxShadow: "0 2px 8px rgba(26,26,46,0.05)",
        }}
      >
        <div className="flex items-center gap-1.5">
          <div
            className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md"
            style={{ backgroundColor: `${color}18` }}
          >
            <Icon className="h-2.5 w-2.5" style={{ color }} strokeWidth={2.25} />
          </div>
          <p
            className="text-[7px] font-semibold uppercase tracking-[0.1em]"
            style={{ color }}
          >
            {typeLabel}
          </p>
        </div>
        <p
          className="mt-1 text-[10px] font-semibold leading-tight tracking-[-0.01em]"
          style={{ color: "#1a1a2e" }}
        >
          {data.label}
        </p>
      </div>
    </motion.div>
  )
}

function HeroFlowEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
}: EdgeProps<Edge<HeroEdgeData>>) {
  const hoveredEdgeId = useContext(HoveredEdgeContext)
  const hovered = hoveredEdgeId === id
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  })
  const speed = data?.speed ?? 0
  const particleDur = `${PARTICLE_BASE_DURATION + speed}s`

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        interactionWidth={22}
        style={{
          stroke: hovered ? "rgba(255,255,255,0.52)" : "rgba(255,255,255,0.30)",
          strokeWidth: hovered ? 2 : 1.5,
          transition: "stroke 200ms, stroke-width 200ms",
        }}
      />
      <circle r={PARTICLE_RADIUS} fill="rgba(255,255,255,0.90)" pointerEvents="none">
        <animateMotion
          dur={particleDur}
          repeatCount="indefinite"
          path={edgePath}
          begin={`${speed * 0.6}s`}
        />
      </circle>
      {data?.label && hovered && (
        <EdgeLabelRenderer>
          <div
            className="nodrag nopan pointer-events-none absolute rounded-md border bg-white px-2 py-0.5 text-[9px] font-medium tracking-[-0.005em] shadow-md"
            style={{
              transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
              color: "rgba(26,26,46,0.78)",
              borderColor: "rgba(26,26,46,0.12)",
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
              zIndex: 1000,
            }}
          >
            {data.label}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  )
}

const nodeTypes = { heroCenter: HeroCenterNode, heroEntity: HeroEntityNode }
const edgeTypes = { heroFlow: HeroFlowEdge }

const HUB = { x: 280, y: 252 }

interface SatelliteSpec {
  id: string
  label: string
  entityType: HeroEntityType
  angle: number
  radius: number
  floatDuration: number
  floatDelay: number
}

/** Even 45° spacing; slightly larger radius to prevent overlap. */
const SATELLITES: SatelliteSpec[] = [
  {
    id: "atlantic",
    label: "Atlantic Grid Expansion",
    entityType: "project",
    angle: -90,
    radius: 208,
    floatDuration: 5.0,
    floatDelay: 0.3,
  },
  {
    id: "energy",
    label: "Energy Transition",
    entityType: "topic",
    angle: -45,
    radius: 212,
    floatDuration: 5.4,
    floatDelay: 0.8,
  },
  {
    id: "angola",
    label: "Angola",
    entityType: "country",
    angle: 0,
    radius: 208,
    floatDuration: 4.7,
    floatDelay: 0.1,
  },
  {
    id: "meridian",
    label: "Meridian Capital",
    entityType: "company",
    angle: 45,
    radius: 212,
    floatDuration: 5.2,
    floatDelay: 1.0,
  },
  {
    id: "board",
    label: "Board Brief Q3",
    entityType: "document",
    angle: 90,
    radius: 208,
    floatDuration: 4.9,
    floatDelay: 0.5,
  },
  {
    id: "ministry",
    label: "Ministry of Energy",
    entityType: "organization",
    angle: 135,
    radius: 212,
    floatDuration: 5.6,
    floatDelay: 1.3,
  },
  {
    id: "meeting",
    label: "Meeting Elena Varga",
    entityType: "interview",
    angle: 180,
    radius: 208,
    floatDuration: 4.6,
    floatDelay: 0.2,
  },
  {
    id: "elena",
    label: "Elena Varga",
    entityType: "person",
    angle: 225,
    radius: 212,
    floatDuration: 5.1,
    floatDelay: 0.7,
  },
]

function polarToXY(angleDeg: number, radius: number) {
  const rad = (angleDeg * Math.PI) / 180
  return {
    x: HUB.x + Math.cos(rad) * radius - CARD_OFFSET_X,
    y: HUB.y + Math.sin(rad) * radius - CARD_OFFSET_Y,
  }
}

function buildNodes(): Node[] {
  const hubNode: Node<HeroCenterNodeData> = {
    id: "hub",
    type: "heroCenter",
    position: { x: HUB.x - 40, y: HUB.y - 40 },
    data: {},
    draggable: false,
  }

  const entityNodes: Node<HeroEntityNodeData>[] = SATELLITES.map((sat) => {
    const { x, y } = polarToXY(sat.angle, sat.radius)
    return {
      id: sat.id,
      type: "heroEntity",
      position: { x, y },
      data: {
        label: sat.label,
        entityType: sat.entityType,
        floatDuration: sat.floatDuration,
        floatDelay: sat.floatDelay,
      },
      draggable: false,
    }
  })

  return [hubNode, ...entityNodes]
}

function buildEdges(): Edge<HeroEdgeData>[] {
  return [
    {
      id: "elena-meridian",
      source: "elena",
      target: "meridian",
      type: "heroFlow",
      data: { label: "is_ceo_of", speed: 0 },
    },
    {
      id: "meridian-atlantic",
      source: "meridian",
      target: "atlantic",
      type: "heroFlow",
      data: { label: "invested_in", speed: 0.6 },
    },
    {
      id: "ministry-atlantic",
      source: "ministry",
      target: "atlantic",
      type: "heroFlow",
      data: { label: "leads", speed: 1.2 },
    },
    {
      id: "atlantic-angola",
      source: "atlantic",
      target: "angola",
      type: "heroFlow",
      data: { label: "located_in", speed: 1.8 },
    },
    {
      id: "board-atlantic",
      source: "board",
      target: "atlantic",
      type: "heroFlow",
      data: { label: "references", speed: 2.4 },
    },
    {
      id: "meeting-elena",
      source: "meeting",
      target: "elena",
      type: "heroFlow",
      data: { label: "features", speed: 3.0 },
    },
    {
      id: "atlantic-energy",
      source: "atlantic",
      target: "energy",
      type: "heroFlow",
      data: { label: "operates_in_industry", speed: 3.6 },
    },
    {
      id: "meridian-angola",
      source: "meridian",
      target: "angola",
      type: "heroFlow",
      data: { label: "has_presence_in", speed: 4.2 },
    },
  ]
}

export function HeroKnowledgeGraph() {
  const [hoveredEdgeId, setHoveredEdgeId] = useState<string | null>(null)
  const nodes = useMemo(() => buildNodes(), [])
  const edges = useMemo(() => buildEdges(), [])

  const onInit = useCallback(
    (instance: { fitView: (opts?: object) => void }) => {
      setTimeout(() => instance.fitView({ padding: 0.12 }), 80)
    },
    [],
  )

  return (
    <HoveredEdgeContext.Provider value={hoveredEdgeId}>
      <div className="hero-knowledge-graph relative mx-auto w-full max-w-[680px] origin-center scale-[1.05] sm:scale-110 lg:mx-0 lg:w-full lg:max-w-[760px] lg:scale-[1.15] xl:max-w-[820px] xl:scale-[1.2]">
        <div className="relative h-[440px] sm:h-[480px] md:h-[520px] lg:h-[580px] xl:h-[620px]">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            onInit={onInit}
            onEdgeMouseEnter={(_, edge) => setHoveredEdgeId(edge.id)}
            onEdgeMouseLeave={() => setHoveredEdgeId(null)}
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
            minZoom={0.75}
            maxZoom={1.1}
          />
        </div>
      </div>
    </HoveredEdgeContext.Provider>
  )
}
