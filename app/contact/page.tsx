import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Contact — Sovereign",
  description: "Get in touch with the Sovereign team.",
}

const GRAIN_BG =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)'/%3E%3C/svg%3E\")"

const DOT_GRID =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Ccircle cx='0.5' cy='0.5' r='0.75' fill='white'/%3E%3C/svg%3E\")"

export default function ContactPage() {
  return (
    <main
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-20"
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
          backgroundSize: "24px 24px",
          opacity: 0.022,
        }}
      />

      {/* Atmospheric radial */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(6,16,52,0.70) 0%, transparent 65%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-lg text-center">
        {/* Logo */}
        <Link href="/" className="mb-14 inline-flex items-center justify-center">
          <Image
            src="/sovereign_log_apaisado_blanco.svg"
            alt="Sovereign"
            width={120}
            height={30}
            style={{ width: "auto", height: "30px", opacity: 0.45 }}
          />
        </Link>

        {/* Eyebrow */}
        <p
          className="mb-4 text-[11px] font-medium uppercase tracking-[0.10em]"
          style={{ color: "rgba(255,255,255,0.28)" }}
        >
          Contact
        </p>

        {/* Heading */}
        <h1
          className="mb-6 font-serif text-4xl font-normal leading-tight tracking-[-0.028em] md:text-5xl"
          style={{ color: "rgba(255,255,255,0.90)" }}
        >
          Get in touch.
        </h1>

        {/* Divider */}
        <div
          aria-hidden="true"
          className="mx-auto mb-7 h-px w-8"
          style={{ background: "rgba(255,255,255,0.12)" }}
        />

        {/* Supporting copy */}
        <p
          className="mb-10 text-pretty text-[15px] leading-relaxed tracking-[-0.011em]"
          style={{ color: "rgba(255,255,255,0.45)" }}
        >
          For demos, partnerships, press enquiries, or general questions, reach us directly.
          We typically respond within one business day.
        </p>

        {/* Email — primary action */}
        <a
          href="mailto:team@svgndata.com"
          className="group inline-flex items-center gap-2 font-serif text-xl tracking-[-0.018em] transition-opacity hover:opacity-70 md:text-2xl"
          style={{ color: "rgba(255,255,255,0.88)" }}
        >
          team@svgndata.com
        </a>

        {/* Secondary action */}
        <div className="mt-12">
          <Link
            href="/request-demo"
            className="inline-flex items-center rounded-full px-6 py-3 text-sm font-medium tracking-[-0.011em] transition-colors hover:bg-white/[0.1]"
            style={{
              border: "1px solid rgba(255,255,255,0.16)",
              color: "rgba(255,255,255,0.65)",
            }}
          >
            Request a demo
          </Link>
        </div>

        {/* Back link */}
        <div className="mt-16">
          <Link
            href="/"
            className="text-[12px] tracking-[-0.011em] transition-colors hover:text-white/50"
            style={{ color: "rgba(255,255,255,0.22)" }}
          >
            ← Back to Sovereign
          </Link>
        </div>
      </div>
    </main>
  )
}
