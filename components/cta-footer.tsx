"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

// Film grain — consistent across all dark sections
const GRAIN_BG =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)'/%3E%3C/svg%3E\")"

export function CTAFooter() {
  return (
    <section
      className="relative overflow-hidden border-t border-white/[0.07] px-6 py-24 md:py-32"
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

      {/* Atmospheric depth — center glow, echoes the hero atmosphere to close the loop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 100% 80% at 50% 100%, rgba(6,18,56,0.8) 0%, transparent 65%)",
        }}
      />

      {/* Subtle secondary glow — above center, adds warmth without distraction */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 35%, rgba(8,20,52,0.45) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* CTA Section */}
        <div className="flex flex-col items-center text-center">
          <Image
            src="/sovereign_logo.svg"
            alt="Sovereign"
            width={48}
            height={48}
            className="mb-6 opacity-[0.13]"
          />
          <h2 className="mb-8 text-balance font-serif text-4xl font-normal tracking-[-0.03em] text-white md:text-5xl">
            Ready to put your intelligence to work?
          </h2>
          <Button
            size="lg"
            className="rounded-full bg-white px-8 font-medium tracking-[-0.011em] text-[#070E1F] hover:bg-white/90"
          >
            Request Demo
          </Button>
        </div>

        {/* Footer */}
        <footer className="mt-20 flex flex-col items-center gap-6 border-t border-white/[0.08] pt-8 md:flex-row md:justify-between">
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
