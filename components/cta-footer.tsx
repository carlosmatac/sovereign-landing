"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

// Film grain — consistent across all dark sections
const GRAIN_BG =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)'/%3E%3C/svg%3E\")"

// Fine dot grid — 32px spacing, most open in the closing section
const DOT_GRID =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32'%3E%3Ccircle cx='0.5' cy='0.5' r='0.75' fill='white'/%3E%3C/svg%3E\")"

// ─── Interactive wordmark band ────────────────────────────────────────────────
//
// Architecture (bottom to top):
//
//   1. Content   — grid mesh + wordmark at full brightness. Always sharp.
//
//   2. Frosted veil — a semi-transparent tinted overlay with backdrop-filter:blur().
//                     This physically blurs what's beneath it — the content becomes
//                     a soft smeared presence: you sense that something is there,
//                     but you cannot read it. Like frosted glass over a sign.
//
//                     A CSS mask on this veil removes it at the cursor position.
//                     Where the veil is removed → sharp content shows through.
//                     Where the veil remains  → content stays blurred/obscured.
//
// Default state: cursor at (−9999, −9999) → the mask's transparent zone is
// off-screen → the veil covers the entire band → everything is frosted.
//
// Cursor interaction: spring-driven mask follows the cursor. The transparent zone
// locally removes the veil, revealing crisp grid + wordmark beneath.

const BAND_GRID =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Cpath d='M 24 0 L 0 0 0 24' fill='none' stroke='white' stroke-width='0.5' stroke-opacity='0.12'/%3E%3C/svg%3E\")"

const WORD_STYLE: React.CSSProperties = {
  fontFamily: "var(--font-gabarito), var(--font-sans), sans-serif",
  fontSize: "clamp(52px, 9vw, 124px)",
  fontWeight: 700,
  letterSpacing: "-0.03em",
  lineHeight: 1,
  userSelect: "none",
  whiteSpace: "nowrap",
}

function SovereignWordmark() {
  const bandRef = useRef<HTMLDivElement>(null)
  // On touch/stylus devices there is no cursor — skip the frosted veil entirely
  // so the wordmark is always clearly readable on mobile.
  const [isTouch, setIsTouch] = useState(false)

  const rawX = useMotionValue(-9999)
  const rawY = useMotionValue(-9999)

  const springCfg = { stiffness: 48, damping: 20, mass: 1.0 }
  const x = useSpring(rawX, springCfg)
  const y = useSpring(rawY, springCfg)

  // Mask for the frosted veil: transparent at cursor (removes veil → sharp content),
  // black everywhere else (keeps veil → content stays blurred).
  const veilMask = useMotionTemplate`radial-gradient(ellipse 520px 340px at ${x}px ${y}px, transparent 0%, rgba(0,0,0,0.12) 26%, rgba(0,0,0,0.65) 50%, black 72%)`

  useEffect(() => {
    const touch = window.matchMedia("(hover: none)").matches
    setIsTouch(touch)
    if (touch) return

    const handleMove = (e: MouseEvent) => {
      const el = bandRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      rawX.set(e.clientX - rect.left)
      rawY.set(e.clientY - rect.top)
    }
    window.addEventListener("mousemove", handleMove)
    return () => window.removeEventListener("mousemove", handleMove)
  }, [rawX, rawY])

  return (
    <div className="w-full pb-8 pt-2" role="img" aria-label="Sovereign">
      <div
        ref={bandRef}
        className="relative overflow-hidden"
        style={{
          height: "clamp(140px, 18vw, 192px)",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* Content — sharp grid + wordmark at full brightness */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{ backgroundImage: BAND_GRID, backgroundRepeat: "repeat" }}
          />
          <div className="relative flex h-full items-center justify-center">
            <p style={{ ...WORD_STYLE, color: "rgba(255,255,255,0.88)" }}>sovereign</p>
          </div>
        </div>

        {/* Frosted veil — backdrop-blur physically obscures the content beneath.
            The mask removes the veil at the cursor position.
            Skipped on touch devices where no cursor exists. */}
        {!isTouch && (
          <motion.div
            className="pointer-events-none absolute inset-0"
            style={{
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              background: "rgba(6,13,28,0.60)",
              maskImage: veilMask,
              WebkitMaskImage: veilMask,
            }}
          />
        )}
      </div>
    </div>
  )
}

export function CTAFooter() {
  return (
    <section
      className="relative overflow-hidden border-t border-white/[0.07] px-6 pb-0 pt-16 md:pt-20"
      style={{ backgroundColor: "#060D1C" }}
    >
      {/* Film grain */}
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
          backgroundSize: "32px 32px",
          opacity: 0.022,
        }}
      />

      <div className="relative z-10">
        {/* Interactive brand wordmark — breaks out of section px-6 to span full width */}
        <div className="-mx-6">
          <SovereignWordmark />
        </div>

        {/* Bridge image with copy overlaid inside */}
        <motion.div
          className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-2xl"
          style={{
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow:
              "0 0 0 1px rgba(255,255,255,0.025), 0 32px 80px rgba(0,0,0,0.6), 0 8px 24px rgba(0,0,0,0.4)",
          }}
          whileHover={{ scale: 1.013, y: -5 }}
          transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Photo */}
          <Image
            src="/bridge2.png"
            alt="Sovereign — infrastructure at the frontier"
            width={1920}
            height={1080}
            className="w-full object-cover"
            priority={false}
          />

          {/* Strong dark scrim so text is always legible */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(4,9,22,0.72) 0%, rgba(4,9,22,0.38) 45%, rgba(4,9,22,0.55) 100%)",
            }}
          />

          {/* Top edge fade — blends into section bg */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-16"
            style={{
              background:
                "linear-gradient(to bottom, rgba(6,13,28,0.60) 0%, transparent 100%)",
            }}
          />

          {/* Bottom edge fade — dissolves into the footer */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-28"
            style={{
              background:
                "linear-gradient(to top, rgba(6,13,28,0.85) 0%, transparent 100%)",
            }}
          />

          {/* Copy — positioned over the image */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
            <Image
              src="/sovereign_logo.svg"
              alt="Sovereign"
              width={44}
              height={44}
              className="mb-6 opacity-[0.22]"
            />
            <h2
              className="mb-8 text-balance font-serif text-4xl font-normal tracking-[-0.03em] text-white md:text-5xl"
              style={{ textShadow: "0 2px 24px rgba(0,0,0,0.55), 0 1px 4px rgba(0,0,0,0.65)" }}
            >
              Ready to put your intelligence to work?
            </h2>
            <Button
              size="lg"
              className="rounded-full bg-white px-8 font-medium tracking-[-0.011em] text-[#070E1F] hover:bg-white/90"
            >
              Request Demo
            </Button>
          </div>
        </motion.div>

        {/* Footer */}
        <footer className="mx-auto flex max-w-5xl flex-col items-center gap-6 border-t border-white/[0.07] pb-8 pt-7 md:flex-row md:justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/sovereign_logo.svg"
              alt="Sovereign"
              width={24}
              height={24}
              className="opacity-[0.18]"
            />
            <p className="text-sm tracking-[-0.011em] text-white/35">
              © 2026 Sovereign Data
            </p>
          </div>
          <nav className="flex items-center gap-6">
            <Link
              href="#"
              className="text-sm tracking-[-0.011em] text-white/35 transition-colors hover:text-white/65"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-sm tracking-[-0.011em] text-white/35 transition-colors hover:text-white/65"
            >
              Terms of Service
            </Link>
          </nav>
        </footer>
      </div>
    </section>
  )
}
