"use client"

import { useEffect, useId, useRef, useState } from "react"
import { AK_LINECUT_MASK_DATA_URI } from "./ak-linecut-mask-data-uri"

// ─── AK Line-Cut ─────────────────────────────────────────────────────────────
//
// Interactive scan-line monogram. Shape masking uses an inlined PNG data URI
// (from `public/ak-linecut-mask.png`, derived from the bitmap in `public/ak.svg`).
// SVG `<clipPath><image href="/file.png"/>` often fails across browsers; a
// luminance `<mask>` + data URL is reliable. The SVG `<path>` in ak.svg is not
// a single fillable outline.
//
// Container-less: no card or panel; SVG sits flush on the section background.
//
// Interactivity: rAF drift on horizontal lines, window-level pointermove, cursor
// spotlight on the bright line layer. `prefers-reduced-motion` skips animation.

// Same user-space square as `ak.svg` — the mask PNG is 1080², stretched here.
const CANVAS = 1440

// Tight frame around non-empty mask (1440 space), matches generated asset.
const VB = { x: 285, y: 420, w: 867, h: 569 } as const
const VB_RIGHT = VB.x + VB.w
const VB_BOTTOM = VB.y + VB.h

const LINE_COUNT = 64
const LINE_GAP = VB.h / LINE_COUNT
const LINE_WEIGHT = 2.2

const SPOTLIGHT_RADIUS = 200

interface AKLineCutProps {
  className?: string
}

export function AKLineCut({ className }: AKLineCutProps) {
  const reactId = useId().replace(/:/g, "")
  const shapeMaskId = `ak-${reactId}-shape`
  const spotlightMaskId = `ak-${reactId}-spot`

  const wrapRef = useRef<HTMLDivElement | null>(null)
  const dimLineRefs = useRef<(SVGLineElement | null)[]>([])
  const brightLineRefs = useRef<(SVGLineElement | null)[]>([])
  const spotCenterRef = useRef<SVGCircleElement | null>(null)
  const spotEdgeRef = useRef<SVGCircleElement | null>(null)

  const target = useRef({ x: 0.5, y: 0.5, active: 0 })
  const current = useRef({ x: 0.5, y: 0.5, active: 0 })

  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setReducedMotion(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return
    let raf = 0
    let mounted = true
    let lastT = performance.now()

    const paint = (t: number) => {
      const dt = Math.min(64, t - lastT) / 1000
      lastT = t

      const k = reducedMotion ? 0 : 1 - Math.exp(-16 * dt)
      current.current.x += (target.current.x - current.current.x) * k
      current.current.y += (target.current.y - current.current.y) * k
      current.current.active +=
        (target.current.active - current.current.active) * k

      const idleT = reducedMotion ? 0 : t / 1000
      const cx = current.current.x
      const cy = current.current.y
      const active = current.current.active

      const dim = dimLineRefs.current
      const bright = brightLineRefs.current
      for (let i = 0; i < LINE_COUNT; i++) {
        const u = i / (LINE_COUNT - 1)

        const phase = i * 0.37
        const drift =
          Math.sin(idleT * 0.55 + phase) * 1.6 +
          Math.sin(idleT * 1.1 + i * 0.18) * 0.7

        const dy = u - cy
        const yFalloff = Math.exp(-(dy * dy) / 0.18)
        const wave =
          Math.sin(cx * Math.PI * 2 + phase * 0.9) * 8 * yFalloff * active

        const transform = `translate(${(drift + wave).toFixed(2)} 0)`
        const dEl = dim[i]
        const bEl = bright[i]
        if (dEl) dEl.setAttribute("transform", transform)
        if (bEl) bEl.setAttribute("transform", transform)
      }

      const spotX = VB.x + cx * VB.w
      const spotY = VB.y + cy * VB.h
      const spotR = SPOTLIGHT_RADIUS
      const centerR = spotR * 0.55

      const a = active.toFixed(3)
      const sc = spotCenterRef.current
      const se = spotEdgeRef.current
      if (sc) {
        sc.setAttribute("cx", spotX.toFixed(2))
        sc.setAttribute("cy", spotY.toFixed(2))
        sc.setAttribute("r", centerR.toFixed(2))
        sc.setAttribute("opacity", a)
      }
      if (se) {
        se.setAttribute("cx", spotX.toFixed(2))
        se.setAttribute("cy", spotY.toFixed(2))
        se.setAttribute("r", spotR.toFixed(2))
        se.setAttribute("opacity", a)
      }

      if (mounted && !reducedMotion) {
        raf = requestAnimationFrame(paint)
      }
    }

    raf = requestAnimationFrame(paint)
    return () => {
      mounted = false
      cancelAnimationFrame(raf)
    }
  }, [reducedMotion])

  useEffect(() => {
    if (typeof window === "undefined") return
    const el = wrapRef.current
    if (!el) return

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      if (r.width === 0 || r.height === 0) return
      target.current.x = (e.clientX - r.left) / r.width
      target.current.y = (e.clientY - r.top) / r.height
      target.current.active = 1
    }

    window.addEventListener("pointermove", onMove, { passive: true })
    return () => {
      window.removeEventListener("pointermove", onMove)
    }
  }, [])

  const lineY = (i: number) => VB.y + i * LINE_GAP + LINE_GAP / 2
  const lineSlope = (i: number) => (i % 2 === 0 ? 1 : -1) * 1.0

  const dimLines = Array.from({ length: LINE_COUNT }, (_, i) => {
    const y = lineY(i)
    const s = lineSlope(i)
    return (
      <line
        key={`d-${i}`}
        ref={(node) => {
          dimLineRefs.current[i] = node
        }}
        x1={VB.x - 40}
        y1={y - s}
        x2={VB_RIGHT + 40}
        y2={y + s}
        stroke="#9DB3D6"
        strokeWidth={LINE_WEIGHT}
        strokeLinecap="butt"
        opacity={0.32}
      />
    )
  })

  const brightLines = Array.from({ length: LINE_COUNT }, (_, i) => {
    const y = lineY(i)
    const s = lineSlope(i)
    return (
      <line
        key={`b-${i}`}
        ref={(node) => {
          brightLineRefs.current[i] = node
        }}
        x1={VB.x - 40}
        y1={y - s}
        x2={VB_RIGHT + 40}
        y2={y + s}
        stroke="#FFFFFF"
        strokeWidth={LINE_WEIGHT + 0.4}
        strokeLinecap="butt"
        opacity={1}
      />
    )
  })

  return (
    <div
      ref={wrapRef}
      className={className}
      style={{
        position: "relative",
        display: "block",
        userSelect: "none",
      }}
      aria-label="Aksum"
      role="img"
    >
      <svg
        viewBox={`${VB.x} ${VB.y} ${VB.w} ${VB.h}`}
        width="100%"
        height="100%"
        style={{ display: "block", pointerEvents: "none", overflow: "visible" }}
        aria-hidden="true"
      >
        <defs>
          <mask
            id={shapeMaskId}
            maskUnits="userSpaceOnUse"
            maskContentUnits="userSpaceOnUse"
            x={VB.x}
            y={VB.y}
            width={VB.w}
            height={VB.h}
          >
            <rect
              x={VB.x}
              y={VB.y}
              width={VB.w}
              height={VB.h}
              fill="black"
            />
            <image
              href={AK_LINECUT_MASK_DATA_URI}
              x={0}
              y={0}
              width={CANVAS}
              height={CANVAS}
              preserveAspectRatio="none"
            />
          </mask>

          <mask
            id={spotlightMaskId}
            maskUnits="userSpaceOnUse"
            x={VB.x - 60}
            y={VB.y - 60}
            width={VB.w + 120}
            height={VB.h + 120}
          >
            <rect
              x={VB.x - 60}
              y={VB.y - 60}
              width={VB.w + 120}
              height={VB.h + 120}
              fill="black"
            />
            <circle
              ref={spotEdgeRef}
              cx={VB.x + VB.w / 2}
              cy={VB.y + VB.h / 2}
              r={SPOTLIGHT_RADIUS}
              fill="white"
              fillOpacity={0.55}
              opacity={0}
              style={{ filter: "blur(50px)" }}
            />
            <circle
              ref={spotCenterRef}
              cx={VB.x + VB.w / 2}
              cy={VB.y + VB.h / 2}
              r={SPOTLIGHT_RADIUS * 0.55}
              fill="white"
              opacity={0}
              style={{ filter: "blur(20px)" }}
            />
          </mask>
        </defs>

        <g mask={`url(#${shapeMaskId})`}>
          <rect
            x={0}
            y={0}
            width={CANVAS}
            height={CANVAS}
            fill="#0E182E"
            opacity={0.62}
          />

          <g>{dimLines}</g>

          <g mask={`url(#${spotlightMaskId})`}>{brightLines}</g>

          <g opacity={0.22}>
          <line
            x1={VB.x + VB.w * 0.34}
            y1={VB.y}
            x2={VB.x + VB.w * 0.34}
            y2={VB_BOTTOM}
            stroke="#E6ECF5"
            strokeWidth={1}
          />
          <line
            x1={VB.x + VB.w * 0.66}
            y1={VB.y}
            x2={VB.x + VB.w * 0.66}
            y2={VB_BOTTOM}
            stroke="#E6ECF5"
            strokeWidth={1}
          />
          </g>
        </g>
      </svg>
    </div>
  )
}
