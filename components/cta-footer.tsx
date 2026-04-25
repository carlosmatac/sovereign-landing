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
// A horizontal editorial strip with a strict height. The AKSUM wordmark is
// rendered intentionally taller than the strip itself, so the strip's
// `overflow: hidden` crops the top and bottom of the letters cleanly — the
// reader sees a controlled horizontal slice of the brand mark, not a giant
// image dropped onto the page. A faint dot grid integrates the strip
// tonally with the surrounding section so the band has no visible edges.

// Precise dot field — 20px grid, 0.9px radius dots, architectural / technical substrate
const BAND_GRID =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Ccircle cx='0.5' cy='0.5' r='0.9' fill='white' fill-opacity='0.18'/%3E%3C/svg%3E\")"

function AksumWordmark() {
  return (
    <div className="w-full" role="img" aria-label="Aksum">
      <div
        className="relative w-full overflow-hidden"
        style={{
          // Fixed editorial strip height — the strict clipping container.
          // Tighter on mobile so the cropped slice always feels controlled.
          height: "clamp(150px, 19vw, 240px)",
        }}
      >
        {/* Faint dot grid — gives the strip a subtle technical substrate that
            blends with the rest of the dark section, removing the "pasted
            rectangle" feel without introducing any visible border edge. */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundImage: BAND_GRID,
            backgroundRepeat: "repeat",
            backgroundSize: "20px 20px",
            opacity: 0.6,
          }}
        />

        {/* Oversized wordmark.
            Scaled significantly larger than the strip height (~2× on desktop),
            so the strip's overflow crops the top and bottom of the letters
            and only a strong horizontal slice is visible.
            Wordmark aspect ratio is 2186.67 : 885.33 ≈ 2.47, so we drive size
            from height (the visually meaningful axis here) and let width
            follow naturally. The image is allowed to be wider than the
            viewport — the band's overflow:hidden clips that excess
            horizontally without any page scroll. */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <Image
            src="/aksum_white_long.svg"
            alt="Aksum"
            width={2186}
            height={885}
            draggable={false}
            priority={false}
            className="block max-w-none select-none"
            style={{
              // Logo height grows faster than band height, guaranteeing a
              // crop slice at every breakpoint.
              height: "clamp(260px, 38vw, 480px)",
              width: "auto",
              opacity: 0.55,
            }}
          />
        </div>
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
