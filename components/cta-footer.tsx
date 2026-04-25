"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { useT } from "@/lib/i18n/locale-context"

// Film grain — consistent across all dark sections
const GRAIN_BG =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)'/%3E%3C/svg%3E\")"

// Fine dot grid — 32px spacing, most open in the closing section
const DOT_GRID =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32'%3E%3Ccircle cx='0.5' cy='0.5' r='0.75' fill='white'/%3E%3C/svg%3E\")"

// ─── Cropped brand strip ──────────────────────────────────────────────────────
//
// A horizontal editorial strip with a strict height that acts as a clipping
// mask. The AKSUM wordmark inside is rendered intentionally far taller than
// the strip — the strip's `overflow: hidden` cuts off the top and bottom of
// the letterforms so only a strong horizontal slice is visible. A faint dot
// grid behind the wordmark integrates the strip tonally with the surrounding
// section so the band itself has no visible edges.
//
// We deliberately use a plain <img> here (not next/image): the asset is a
// base64-PNG packaged inside an SVG, and next/image's width/height props
// fight CSS height overrides for that case, which prevents the crop. A bare
// <img> with an explicit CSS height that exceeds the parent is the only
// reliable way to force the visible cropping behaviour.

// Precise dot field — 20px grid, 0.9px radius dots, architectural / technical substrate
const BAND_GRID =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Ccircle cx='0.5' cy='0.5' r='0.9' fill='white' fill-opacity='0.18'/%3E%3C/svg%3E\")"

function AksumWordmark() {
  return (
    <div className="w-full" role="img" aria-label="Aksum">
      <div
        className="relative w-full overflow-hidden"
        style={{
          // Fixed clipping band — strict, no overflow allowed.
          height: "clamp(120px, 15vw, 190px)",
        }}
      >
        {/* Faint dot grid behind the wordmark — tonally integrates the band
            with the rest of the section so it doesn't read as a pasted
            rectangle. */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundImage: BAND_GRID,
            backgroundRepeat: "repeat",
            backgroundSize: "20px 20px",
            opacity: 0.55,
          }}
        />

        {/*
          Oversized wordmark — driven by an explicit CSS height that is
          always significantly larger than the parent band (roughly 2.5–3×).
          Width follows the SVG's natural aspect ratio (≈ 2.47:1).

          Sizing budget across breakpoints:
            • mobile (~375 px wide):   band ≈ 120 px / logo ≈ 320 px tall  → 200 px cropped
            • tablet (~768 px):        band ≈ 120 px / logo ≈ 340 px tall  → 220 px cropped
            • laptop (~1024 px):       band ≈ 154 px / logo ≈ 410 px tall  → 256 px cropped
            • desktop (~1440 px):      band ≈ 190 px / logo ≈ 540 px tall  → 350 px cropped

          The wordmark is centred via absolute positioning + translate so the
          visible slice is always the strong middle of the letters (not the
          top, not the bottom).
        */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/aksum_lines.svg"
          alt=""
          aria-hidden="true"
          draggable={false}
          className="pointer-events-none absolute left-1/2 top-1/2 block max-w-none -translate-x-1/2 -translate-y-1/2 select-none"
          style={{
            height: "clamp(320px, 38vw, 540px)",
            width: "auto",
            opacity: 0.6,
          }}
        />
      </div>
    </div>
  )
}

export function CTAFooter() {
  const t = useT()
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
          <AksumWordmark />
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
            alt="Aksum — infrastructure at the frontier"
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
              src="/aksum_white.svg"
              alt="Aksum"
              width={44}
              height={44}
              className="mb-6 opacity-[0.22]"
            />
            <h2
              className="mb-8 text-balance font-serif text-4xl font-normal tracking-[-0.03em] text-white md:text-5xl"
              style={{ textShadow: "0 2px 24px rgba(0,0,0,0.55), 0 1px 4px rgba(0,0,0,0.65)" }}
            >
              {t.ctaFooter.headline}
            </h2>
            <Button
              asChild
              size="lg"
              className="rounded-full bg-white px-8 font-medium tracking-[-0.011em] text-[#070E1F] hover:bg-white/90"
            >
              <Link href="/request-demo">{t.ctaFooter.cta}</Link>
            </Button>
          </div>
        </motion.div>

        {/* Footer */}
        <footer className="mx-auto flex max-w-5xl flex-col items-center gap-6 border-t border-white/[0.07] pb-8 pt-7 md:flex-row md:justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/aksum_white.svg"
              alt="Aksum"
              width={24}
              height={24}
              className="opacity-[0.18]"
            />
            <p className="text-sm tracking-[-0.011em] text-white/35">
              {t.ctaFooter.copyright}
            </p>
          </div>
          <nav className="flex items-center gap-6">
            <Link
              href="/contact"
              className="text-sm tracking-[-0.011em] text-white/35 transition-colors hover:text-white/65"
            >
              {t.ctaFooter.nav.contact}
            </Link>
            <Link
              href="#"
              className="text-sm tracking-[-0.011em] text-white/35 transition-colors hover:text-white/65"
            >
              {t.ctaFooter.nav.privacy}
            </Link>
            <Link
              href="#"
              className="text-sm tracking-[-0.011em] text-white/35 transition-colors hover:text-white/65"
            >
              {t.ctaFooter.nav.terms}
            </Link>
          </nav>
        </footer>
      </div>
    </section>
  )
}
