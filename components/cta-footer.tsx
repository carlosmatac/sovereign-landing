"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { useT } from "@/lib/i18n/locale-context"

// Film grain — consistent across all dark sections
const GRAIN_BG =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)'/%3E%3C/svg%3E\")"

// ─── Final CTA ────────────────────────────────────────────────────────────────
//
// Cinematic full-bleed close-out section. The previous implementation wrapped
// a hero image inside a rounded card with a headline + small logo; we now
// give the image the entire section width (edge-to-edge), drop the headline
// and internal mark, and let the demo button float as the only foreground
// element. The footer row underneath is preserved.
//
// Implementation notes:
//   • The image is rendered with `fill` inside an absolutely-positioned layer
//     so it spans the section regardless of viewport width, with no card
//     border or rounded-corner treatment.
//   • A soft vertical scrim sits above the image purely to keep the white
//     pill button readable on lighter portions of the photograph; we never
//     overpower the image.
//   • The button is intentionally placed below the vertical centre using a
//     `pt-[60%] pb-[18%]` pattern on a `min-h` section: the top padding is
//     larger than the bottom, so the foreground content reads as anchored
//     toward the lower third of the cinematic frame.
//   • The copyright/footer row keeps its existing nav links so the legal
//     surface area is unchanged.

export function CTAFooter() {
  const t = useT()
  return (
    <section
      className="relative overflow-hidden border-t border-white/[0.07]"
      style={{ backgroundColor: "#060D1C" }}
    >
      {/* Full-bleed cinematic image + button --------------------------------- */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          // Cinematic aspect: wide, never too tall on mobile, generous on
          // desktop. clamp keeps the section from collapsing on phones or
          // ballooning on ultrawide displays.
          aspectRatio: "16 / 7",
          minHeight: "clamp(420px, 60vw, 720px)",
        }}
      >
        {/* The CTA artwork. `fill` + `object-cover` guarantees edge-to-edge
            coverage at every breakpoint without the previous rounded card. */}
        <Image
          src="/cta(1).png"
          alt=""
          aria-hidden="true"
          fill
          priority={false}
          sizes="100vw"
          className="object-cover"
        />

        {/* Subtle scrim — only there to ensure button legibility on the
            warmer edges of the artwork. Strongest at the bottom where the
            button sits, softest across the upper half so the image breathes. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(6,13,28,0.18) 0%, rgba(6,13,28,0.10) 45%, rgba(6,13,28,0.42) 100%)",
          }}
        />

        {/* Light film grain — keeps the photographic surface cohesive with
            the rest of the dark landing sections. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: GRAIN_BG,
            backgroundRepeat: "repeat",
            backgroundSize: "300px 300px",
            opacity: 0.04,
          }}
        />

        {/* Top edge fade — blends the section into the prior surface so the
            image never reads as a pasted rectangle. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-20"
          style={{
            background:
              "linear-gradient(to bottom, rgba(6,13,28,0.85) 0%, transparent 100%)",
          }}
        />

        {/* Bottom edge fade — dissolves into the footer band underneath. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
          style={{
            background:
              "linear-gradient(to top, rgba(6,13,28,0.95) 0%, transparent 100%)",
          }}
        />

        {/* Foreground — only the demo button, anchored slightly below
            vertical centre so it reads as a lower-third action point.
            We use absolute positioning + `top: 62%` to keep the placement
            consistent across breakpoints regardless of section height. */}
        <div className="absolute inset-x-0 top-[62%] flex justify-center px-6">
          <Button
            asChild
            size="lg"
            className="rounded-full bg-white px-9 py-6 text-[15px] font-medium tracking-[-0.011em] text-[#070E1F] shadow-[0_18px_48px_rgba(0,0,0,0.45)] transition-transform duration-300 hover:bg-white/95 hover:scale-[1.02]"
          >
            <Link href="/request-demo">{t.ctaFooter.cta}</Link>
          </Button>
        </div>
      </div>

      {/* Footer row — copyright + nav. Preserved as-is. ---------------------- */}
      <div className="relative px-6">
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
