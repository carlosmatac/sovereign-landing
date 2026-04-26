"use client"

import { useEffect, useRef, useState } from "react"

// ─── AK Line-Cut ─────────────────────────────────────────────────────────────
//
// A code-generated, interactive AK monogram. The shape is a `<clipPath>` built
// from the AK silhouette (taken directly from `public/aksum_white.svg`) and
// the visual content inside that clip is a stack of thin horizontal lines.
//
// The component is intentionally container-less:
//   • no card, no border, no rounded panel, no background fill
//   • the SVG sits flush on the page background, so the AK reads as if it
//     were etched directly into the section
//
// Interactivity:
//   • a `requestAnimationFrame` loop maintains a smoothed "time" value that
//     gives the line stack a slow vertical drift / shimmer
//   • a window-level pointermove listener feeds normalised cursor coordinates
//     to the loop, so the AK reacts to mouse movement anywhere on the page
//     (not just on hover).
//   • a radial "spotlight" mask reveals a brighter copy of the line stack
//     only near the cursor, so illumination is *local* — lines outside the
//     spotlight stay dim, lines inside burn-in to high contrast.
//   • smoothing is done with exponential damping so movement never snaps
//
// Reduced motion:
//   • if `prefers-reduced-motion: reduce` is set, the rAF loop is skipped
//     and the component renders a static, still-refined line-cut

// AK silhouette path, lifted from public/aksum_white.svg (original viewBox
// was 0 0 1440 1440). The path's bounding box is tight to roughly:
//   x ∈ [237, 1238]   y ∈ [442, 997]
// We use a viewBox cropped to that bbox (with a small breathing margin) so
// the rendered SVG box is filled by the AK glyphs themselves — no big top
// padding pushing the monogram below the section title.
const AK_PATH =
  "m 237.45872,995.48442 c -1.21639,-1.46567 3.34013,-9.96427 21.98217,-41 12.93415,-21.5331 25.76099,-43.05109 28.5041,-47.81775 2.7431,-4.76667 20.88652,-35.06667 40.31872,-67.33334 19.4322,-32.26666 36.33012,-60.46666 37.55095,-62.66666 1.22083,-2.2 4.61196,-7.81025 7.53585,-12.46721 2.92388,-4.65696 5.31616,-8.74886 5.31616,-9.0931 0,-0.34424 1.69898,-3.134 3.77552,-6.19946 2.07654,-3.06546 4.19124,-6.47357 4.69933,-7.57357 0.50809,-1.1 3.7591,-6.6365 7.22447,-12.30335 5.7234,-9.35934 14.20638,-23.54075 32.96734,-55.11309 C 431,667.74635 440.07146,652.64074 447.49214,640.34886 454.91281,628.05699 483.34568,580.5 510.67629,534.66667 538.0069,488.83333 561.81597,449.38333 563.58534,447 l 3.21704,-4.33333 H 681.40119 796 V 563.33333 C 796,629.7 796.49345,684 797.09656,684 c 0.60311,0 4.40033,-3.75 8.43827,-8.33333 8.92511,-10.13061 38.93409,-44.92718 44.45579,-51.54821 2.19484,-2.63182 10.50373,-12.28513 18.4642,-21.45179 7.96047,-9.16667 17.86469,-20.61463 22.00938,-25.43991 18.47254,-21.50587 29.91993,-34.76603 44.20247,-51.20222 C 943.1,516.31954 962.6,493.62655 978,475.59565 l 28,-32.78344 89.0994,-0.0728 89.0994,-0.0728 -8.4328,9.7662 c -4.6379,5.37141 -15.6209,18.12141 -24.4066,28.33333 -8.7857,10.21192 -24.6048,28.46713 -35.1536,40.56713 -10.5488,12.1 -24.3605,27.95522 -30.6927,35.23381 -6.3322,7.2786 -12.4131,14.21588 -13.5131,15.41618 -5.7314,6.25395 -26.6497,30.41854 -61.7648,71.35001 -8.8078,10.26667 -16.37531,18.96667 -16.81672,19.33334 -0.44141,0.36666 -7.46861,8.46666 -15.61601,18 -8.1474,9.53333 -16.08599,18.47632 -17.6413,19.87331 -1.55531,1.39699 -2.82784,3.13533 -2.82784,3.86298 0,1.32084 6.95993,9.7369 35.96132,43.48504 8.45465,9.83839 19.94305,23.33839 25.52985,30 12.0769,14.40026 103.7646,121.87421 117.8255,138.112 53.9965,62.35618 66.9842,78.10193 65.7119,79.66667 -1.0599,1.30357 -21.0197,1.66666 -91.62,1.66666 h -90.2649 l -14.5718,-16.92606 c -8.01454,-9.30933 -17.897,-20.85933 -21.96105,-25.66667 -4.06405,-4.80733 -11.26405,-13.31143 -16,-18.89799 -4.73595,-5.58656 -18.1979,-21.48656 -29.91545,-35.33333 C 915.16755,873.49399 876.99483,828.61141 859.34937,808 853.3852,801.03333 836.8417,781.62106 822.58604,764.86161 L 796.66667,734.38988 796.32683,865.86161 795.987,997.33333 H 723.32683 650.66667 V 946 894.66667 H 552.15426 453.64184 L 435.6095,927 c -9.91779,17.78333 -22.26726,39.74791 -27.44328,48.81017 -5.17602,9.06226 -9.77131,17.61226 -10.21177,19 -0.77378,2.43797 -3.47102,2.52316 -79.88104,2.52316 -65.79491,0 -79.33801,-0.31061 -80.61469,-1.84891 z M 650.66667,731.33333 c 0,-36.96689 -0.36502,-47.3378 -1.66667,-47.35375 -1.31284,-0.0161 -1.30741,-0.24843 0.0255,-1.09448 1.33456,-0.84705 1.6583,-15.3743 1.5317,-68.7335 -0.0883,-37.21269 -0.31714,-67.47017 -0.50856,-67.23885 -0.19143,0.23132 -13.13501,23.22058 -28.76353,51.08725 -15.62851,27.86667 -30.61106,54.56667 -33.29455,59.33333 C 585.30712,662.1 581.4355,669 579.387,672.66667 c -2.04849,3.66666 -5.70011,9.96666 -8.11472,14 -2.41462,4.03333 -4.80372,8.98333 -5.30912,11 -0.5054,2.01666 -1.41344,3.66666 -2.01785,3.66666 -0.60442,0 -1.50902,1.35 -2.01021,3 -0.5012,1.65 -2.34164,4.90997 -4.08985,7.24437 -1.74822,2.33441 -3.17858,4.54141 -3.17858,4.90444 0,0.36304 -2.02987,4.15307 -4.51082,8.4223 -12.80169,22.02915 -28.82252,51.13622 -28.82252,52.3655 0,0.95422 20.48766,1.39673 64.66667,1.39673 h 64.66667 z"

// Tight viewBox cropped to the AK glyph bbox + small breathing room.
const VB = { x: 220, y: 425, w: 1035, h: 590 } as const
const VB_RIGHT = VB.x + VB.w
const VB_BOTTOM = VB.y + VB.h

// Number of horizontal scan lines that fill the AK silhouette. Spaced over
// the tight box height for an even cadence regardless of zoom.
const LINE_COUNT = 56
const LINE_GAP = VB.h / LINE_COUNT
const LINE_WEIGHT = 2.2

// Spotlight radius in user-space units. With VB.w ≈ 1035, ~210 gives a
// pool that lights ~20% of the AK at any one time — enough to feel
// generous, tight enough that distant lines remain dim.
const SPOTLIGHT_RADIUS = 240

// Stable id so multiple instances on the same page don't collide.
function useStableId(prefix: string) {
  const ref = useRef<string | null>(null)
  if (ref.current === null) {
    ref.current = `${prefix}-${Math.random().toString(36).slice(2, 9)}`
  }
  return ref.current
}

interface AKLineCutProps {
  className?: string
}

export function AKLineCut({ className }: AKLineCutProps) {
  const wrapRef = useRef<HTMLDivElement | null>(null)
  const dimLineRefs = useRef<(SVGLineElement | null)[]>([])
  const brightLineRefs = useRef<(SVGLineElement | null)[]>([])
  const spotCenterRef = useRef<SVGCircleElement | null>(null)
  const spotEdgeRef = useRef<SVGCircleElement | null>(null)

  const id = useStableId("ak")
  const clipId = `${id}-clip`
  const maskId = `${id}-mask`

  // Smoothed pointer position. `target` is what the listener writes; `current`
  // is what's currently rendered. We damp `current` toward `target` each frame.
  // Coordinates are normalised 0..1 against the wrapper rect; *not* clamped,
  // so cursors above/below/beside the box ramp off naturally.
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

      // Exponential damping: ~16 toward target per second feels smooth and
      // responsive without lag. dt-corrected for frame-rate independence.
      const k = reducedMotion ? 0 : 1 - Math.exp(-16 * dt)
      current.current.x += (target.current.x - current.current.x) * k
      current.current.y += (target.current.y - current.current.y) * k
      current.current.active +=
        (target.current.active - current.current.active) * k

      const idleT = reducedMotion ? 0 : t / 1000
      const cx = current.current.x
      const cy = current.current.y
      const active = current.current.active

      // ── Per-line drift + tiny cursor-driven horizontal nudge ─────────
      const dim = dimLineRefs.current
      const bright = brightLineRefs.current
      for (let i = 0; i < LINE_COUNT; i++) {
        const u = i / (LINE_COUNT - 1)

        const phase = i * 0.37
        const drift =
          Math.sin(idleT * 0.55 + phase) * 1.6 +
          Math.sin(idleT * 1.1 + i * 0.18) * 0.7

        // A very small per-line wave around the cursor's y. Kept small —
        // illumination, not motion, is what sells the cursor effect now.
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

      // ── Spotlight ─────────────────────────────────────────────────────
      // Map the smoothed cursor (wrapper-normalised 0..1) into viewBox
      // user-space. Coordinates outside [0..1] map outside the viewBox so
      // the spotlight gracefully leaves the AK when the cursor exits.
      const spotX = VB.x + cx * VB.w
      const spotY = VB.y + cy * VB.h
      const spotR = SPOTLIGHT_RADIUS
      const centerR = spotR * 0.55

      // The mask uses two circles: an inner solid white core (= full
      // illumination) and a soft outer falloff. Both are repositioned each
      // frame. Their opacity is multiplied by `active` so the spotlight
      // fades in on first cursor movement and out if the user idles.
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

  // Window-level pointer tracking. Coordinates are normalised against the
  // AK's bounding rect *without* clamping, so the spotlight follows the
  // cursor across the whole page (and exits the AK when the cursor moves
  // away).
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

  // Pre-compute the line geometry. Two parallel sets share identical
  // positions: the dim base set is always visible, the bright set is masked
  // to only show inside the cursor spotlight.
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
        opacity={0.22}
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
          <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
            <path d={AK_PATH} />
          </clipPath>

          {/*
            Spotlight mask. Inside a `<mask>`, white = visible, black =
            hidden, with linear interpolation between. We paint the whole
            box black, then add a soft white core (the "spotlight") that
            tracks the cursor. The bright line layer below uses this mask,
            so only the lines inside the spotlight glow at full strength.
          */}
          <mask
            id={maskId}
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
            {/* Soft outer falloff — wider, low-opacity ramp */}
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
            {/* Hot core — small, fully white, gives lines inside the
                cursor pool full intensity */}
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

        {/* Faint silhouette behind the lines — gives the AK edge definition
            when individual lines drift; without it the shape would feel
            hollow at the corners. */}
        <path d={AK_PATH} fill="#0E182E" fillOpacity={0.55} />

        {/* Hairline outline ties the AK to the rest of the panel system. */}
        <path
          d={AK_PATH}
          fill="none"
          stroke="#E6ECF5"
          strokeOpacity={0.10}
          strokeWidth={1.25}
        />

        {/* Dim base line stack — always visible, low contrast. */}
        <g clipPath={`url(#${clipId})`}>{dimLines}</g>

        {/* Bright line stack — same positions, higher contrast, revealed
            only inside the cursor spotlight via the mask. */}
        <g clipPath={`url(#${clipId})`} mask={`url(#${maskId})`}>
          {brightLines}
        </g>

        {/* Two faint vertical hairlines add an etched weave. */}
        <g clipPath={`url(#${clipId})`} opacity={0.20}>
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
      </svg>
    </div>
  )
}
