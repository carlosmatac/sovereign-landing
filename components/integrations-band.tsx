"use client"

import Image from "next/image"
import { useCallback, useRef, useState } from "react"

// ─── Atmosphere (kept in sync with the rest of the landing) ───────────────────

const GRAIN_BG =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)'/%3E%3C/svg%3E\")"

const DOT_GRID =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='28'%3E%3Ccircle cx='0.5' cy='0.5' r='0.75' fill='white'/%3E%3C/svg%3E\")"

// ─── Logo set ─────────────────────────────────────────────────────────────────
// Source PNGs are all 1080×1080 with the brand mark composed inside. Even
// though the canvas is identical, the mark inside each canvas occupies
// different proportions. The `optical` value below is a per-brand multiplier
// applied to the *logo content* (not the cell), so the marquee rhythm stays
// perfectly even while visual weight gets normalized.

interface IntegrationLogo {
  name: string
  src: string
  optical: number
}

const LOGOS: IntegrationLogo[] = [
  { name: "HubSpot",          src: "/integrations/hubspot.png",    optical: 0.95 },
  { name: "Google Workspace", src: "/integrations/google.png",     optical: 0.95 },
  { name: "Salesforce",       src: "/integrations/salesforce.png", optical: 1.10 },
  { name: "Microsoft 365",    src: "/integrations/microsoft.png",  optical: 0.95 },
  { name: "Slack",            src: "/integrations/slack.png",      optical: 1.00 },
]

// Repeat the logo set ENOUGH times that even at the end of one animation cycle
// the visible viewport is fully populated.
//
//   TRACK_WIDTH      ≈ 5 logos × 8 copies × ~155px =  ~6200px
//   per-cycle shift  ≈ TRACK_WIDTH × 50%           =  ~3100px
//
// 6200 − 3100 = ~3100px of content always remains to the right of viewport 0.
// That covers every display up to ~3000px wide without ever showing a gap.
const REPEAT_COUNT = 8
const TRACK = Array.from({ length: REPEAT_COUNT }, () => LOGOS).flat()

// ─── Hover / tooltip state ────────────────────────────────────────────────────

interface HoveredState {
  name: string
  /** X position (px) inside the band container. */
  x: number
}

// ─── Logo cell ────────────────────────────────────────────────────────────────

function LogoCell({
  logo,
  onEnter,
  onLeave,
}: {
  logo: IntegrationLogo
  onEnter: (name: string, el: HTMLDivElement) => void
  onLeave: () => void
}) {
  // Cell uses a fixed bounding box so all logos take the same horizontal
  // space — that keeps the marquee perfectly even regardless of the
  // per-brand optical multiplier applied to the inner content.
  const innerHeight = 56 * logo.optical
  const innerWidth = innerHeight * 1.7

  return (
    <div
      className="group relative flex shrink-0 items-center justify-center px-7 md:px-9"
      onMouseEnter={(e) => onEnter(logo.name, e.currentTarget)}
      onMouseLeave={onLeave}
    >
      <div
        className="relative flex items-center justify-center"
        style={{ height: `${innerHeight}px`, width: `${innerWidth}px` }}
      >
        <Image
          src={logo.src}
          alt={logo.name}
          fill
          sizes="160px"
          className="object-contain transition-all duration-300 ease-out group-hover:opacity-100"
          style={{
            opacity: 0.55,
            filter: "saturate(0.85)",
          }}
          draggable={false}
        />
      </div>
    </div>
  )
}

// ─── Main section ─────────────────────────────────────────────────────────────

export function IntegrationsBand() {
  const bandRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState<HoveredState | null>(null)

  const handleEnter = useCallback((name: string, cell: HTMLDivElement) => {
    const band = bandRef.current
    if (!band) return
    // Pause-on-hover stops the marquee at this same frame, so getBoundingClientRect
    // gives a stable position. The tooltip is rendered OUTSIDE the masked viewport
    // (as a sibling at the band-container level) and pinned to this X.
    const cellRect = cell.getBoundingClientRect()
    const bandRect = band.getBoundingClientRect()
    setHovered({
      name,
      x: cellRect.left - bandRect.left + cellRect.width / 2,
    })
  }, [])

  const handleLeave = useCallback(() => setHovered(null), [])

  return (
    <section
      className="relative overflow-hidden border-y border-white/[0.06] px-6 py-20 md:py-24"
      style={{ backgroundColor: "#071121" }}
    >
      {/* Film grain — kept in sync with the hero band */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: GRAIN_BG,
          backgroundRepeat: "repeat",
          backgroundSize: "300px 300px",
          opacity: 0.035,
        }}
      />

      {/* Dot grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: DOT_GRID,
          backgroundRepeat: "repeat",
          backgroundSize: "28px 28px",
          opacity: 0.022,
        }}
      />

      {/* Atmospheric depth — same radial cast as the original band */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 120% at 50% 130%, rgba(6,16,50,0.85) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-3xl">
        {/* Eyebrow */}
        <div className="mb-6 flex items-center justify-center gap-3">
          <div
            aria-hidden="true"
            className="h-px w-6"
            style={{ background: "rgba(255,255,255,0.14)" }}
          />
          <p
            className="text-[10px] font-medium uppercase"
            style={{
              color: "rgba(255,255,255,0.32)",
              letterSpacing: "0.18em",
            }}
          >
            Platform compatibility
          </p>
          <div
            aria-hidden="true"
            className="h-px w-6"
            style={{ background: "rgba(255,255,255,0.14)" }}
          />
        </div>

        {/* Headline */}
        <h2
          className="text-balance text-center font-serif text-[28px] font-normal leading-[1.18] tracking-[-0.022em] md:text-[34px]"
          style={{ color: "rgba(255,255,255,0.92)" }}
        >
          Connect with the tools your team already uses
        </h2>

        {/* Supporting copy */}
        <p
          className="mx-auto mt-5 max-w-xl text-balance text-center text-[14px] leading-[1.65] tracking-[-0.005em] md:text-[15px]"
          style={{ color: "rgba(255,255,255,0.55)" }}
        >
          Designed to fit the commercial and operational stack your team already
          runs on — CRM, email, calendar, documents, and collaboration —
          brought into one intelligence layer.
        </p>
      </div>

      {/* ── Moving logo band ────────────────────────────────────────────────── */}
      {/*
       *  Structural notes (this block IS the fix):
       *
       *  1. The MASKED VIEWPORT only contains the moving track. Mask-image fades
       *     the LOGOS at the edges — the section's grain / dot / radial layers
       *     remain visible underneath, so the strip blends into the section
       *     instead of sitting on opaque dark rectangles.
       *
       *  2. The TOOLTIP is rendered as a sibling of the viewport, NOT inside it.
       *     That keeps it out of the mask and out of any overflow clipping, so
       *     it always renders cleanly above the strip.
       *
       *  3. The track contains 8 copies of the logo set. Animating -50%
       *     translates by 4 copies (~3100px), which guarantees the visible
       *     viewport stays full at every frame of the cycle. No reload feel.
       */}
      <div
        ref={bandRef}
        className="relative z-10 mt-14 md:mt-16"
      >
        {/* Masked viewport — overflow:clip lets us hide the wide track
            without breaking the section's vertical flow. */}
        <div
          className="group/track"
          style={{
            overflow: "clip",
            // mask-image fades the track to 0 alpha at the section edges so
            // the logos appear and disappear softly, while the section's
            // atmosphere stays fully visible behind them. Both prefixes for
            // safety on older WebKit.
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)",
            maskImage:
              "linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)",
          }}
        >
          <div
            className="flex w-max items-center py-6 will-change-transform group-hover/track:[animation-play-state:paused]"
            style={{
              animation: "sv-marquee 110s linear infinite",
            }}
          >
            {TRACK.map((logo, i) => (
              <LogoCell
                key={`${logo.name}-${i}`}
                logo={logo}
                onEnter={handleEnter}
                onLeave={handleLeave}
              />
            ))}
          </div>
        </div>

        {/* Floating tooltip — sibling of the viewport, so neither the mask
            nor the viewport's overflow clips it. Pinned to the hovered cell
            via React state captured on mouse enter. */}
        <div
          aria-hidden={!hovered}
          className="pointer-events-none absolute top-0 z-30"
          style={{
            left: hovered ? `${hovered.x}px` : "50%",
            transform: "translate(-50%, calc(-100% - 6px))",
            opacity: hovered ? 1 : 0,
            transition:
              "opacity 200ms cubic-bezier(0.22, 0.8, 0.36, 1), left 240ms cubic-bezier(0.22, 0.8, 0.36, 1)",
          }}
        >
          <div
            className="relative whitespace-nowrap rounded-[6px] px-3 py-[6px]"
            style={{
              background: "#080F1E",
              border: "1px solid rgba(147,147,147,0.18)",
              boxShadow:
                "0 8px 24px -6px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.025)",
            }}
          >
            <span
              className="text-[10.5px] font-medium tracking-[-0.005em]"
              style={{ color: "rgba(255,255,255,0.82)" }}
            >
              {hovered?.name ?? ""}
            </span>
            {/* Pointer notch */}
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/2 rotate-45"
              style={{
                width: "6px",
                height: "6px",
                background: "#080F1E",
                borderRight: "1px solid rgba(147,147,147,0.18)",
                borderBottom: "1px solid rgba(147,147,147,0.18)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
