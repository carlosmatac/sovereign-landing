"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { SiteFooterBar } from "@/components/site-footer-bar"
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
      {/* Full-bleed cinematic image + button ---------------------------------
          The section's aspect ratio is locked to the artwork's *natural*
          ratio (1024×683 → 3:2 ≈ 1.5). Matching ratios means `object-cover`
          never has to crop, so the AKSUM wordmark + headline baked into the
          image stay exactly on the section's centre axis — which is the
          same axis the centred Request Demo button uses. No misalignment
          between in-image typography and foreground button at any width.
          A small `minHeight` floor only kicks in on extremely narrow
          phones to keep the band from collapsing visually. */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          aspectRatio: "1024 / 683",
          minHeight: "320px",
        }}
      >
        <Image
          src="/cta 2.png"
          alt=""
          aria-hidden="true"
          fill
          priority={false}
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Subtle scrim — only there to ensure button legibility on the
            warmer edges of the artwork. Strongest at the bottom where the
            button sits, softest across the upper half so the image breathes. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(6,13,28,0.10) 0%, rgba(6,13,28,0.04) 50%, rgba(6,13,28,0.30) 100%)",
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

        {/* Top edge dissolve — long, page-coloured, multi-stop gradient.
            Tall enough (≈ 28% of the band on desktop, ≈ 22% on mobile) and
            tinted with the exact section background (#060D1C) so the
            transition reads as a true dissolve into the page rather than a
            visible seam between dark navy and the lighter artwork. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[22%] md:h-[28%]"
          style={{
            background:
              "linear-gradient(to bottom, #060D1C 0%, rgba(6,13,28,0.92) 18%, rgba(6,13,28,0.70) 38%, rgba(6,13,28,0.38) 62%, rgba(6,13,28,0.14) 82%, transparent 100%)",
          }}
        />

        {/* Bottom edge dissolve — mirrors the top, slightly stronger so the
            section dies cleanly into the footer band underneath without a
            visible boundary line. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[24%] md:h-[30%]"
          style={{
            background:
              "linear-gradient(to top, #060D1C 0%, rgba(6,13,28,0.95) 18%, rgba(6,13,28,0.74) 38%, rgba(6,13,28,0.42) 62%, rgba(6,13,28,0.16) 82%, transparent 100%)",
          }}
        />

        {/* Foreground — only the demo button. Anchored at ~76% from the top
            of the band, which sits directly under the "intelligence to
            work?" subtitle baked into the artwork. Because the section
            aspect ratio matches the image, this percentage maps to the
            same image coordinate at every viewport width. */}
        <div className="absolute inset-x-0 top-[76%] flex justify-center px-6">
          <Button
            asChild
            size="lg"
            className="rounded-full bg-white px-9 py-6 text-[15px] font-medium tracking-[-0.011em] text-[#070E1F] shadow-[0_18px_48px_rgba(0,0,0,0.45)] transition-transform duration-300 hover:bg-white/95 hover:scale-[1.02]"
          >
            <Link href="/request-demo">{t.ctaFooter.cta}</Link>
          </Button>
        </div>
      </div>

      <SiteFooterBar />
    </section>
  )
}
