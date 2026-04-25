import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { DemoForm } from "./demo-form"
import { getServerT } from "@/lib/i18n/server"
import { getDictionary } from "@/lib/i18n/config"

export const metadata: Metadata = {
  title: getDictionary("en").requestDemo.metaTitle,
  description: getDictionary("en").requestDemo.metaDescription,
}

// Film grain — consistent with the rest of the landing
const GRAIN_BG =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)'/%3E%3C/svg%3E\")"

export default async function RequestDemoPage() {
  const t = await getServerT()
  const r = t.requestDemo

  return (
    <main
      className="flex min-h-screen flex-col lg:flex-row"
      style={{ backgroundColor: "#060D1C" }}
    >
      {/* ── Left column — form ─────────────────────────────────────────────── */}
      <div className="relative flex w-full flex-col lg:w-1/2">
        {/* Film grain overlay */}
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

        <div className="relative z-10 flex flex-1 flex-col px-6 py-10 sm:px-10 md:px-14 lg:px-16 xl:px-20">
          {/* Back to site */}
          <div className="mb-12">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.07em] transition-colors"
              style={{ color: "rgba(255,255,255,0.30)" }}
            >
              <Image
                src="/aksum_white_long.svg"
                alt="Aksum"
                width={110}
                height={28}
                style={{ width: "auto", height: "28px", opacity: 0.55 }}
              />
            </Link>
          </div>

          {/* Heading block */}
          <div className="mb-10">
            <p
              className="mb-3 text-[11px] font-medium uppercase tracking-[0.10em]"
              style={{ color: "rgba(255,255,255,0.30)" }}
            >
              {r.eyebrow}
            </p>
            <h1
              className="mb-4 font-serif text-3xl font-normal leading-tight tracking-[-0.025em] md:text-4xl"
              style={{ color: "rgba(255,255,255,0.92)" }}
            >
              {r.headline}
            </h1>
            <p
              className="max-w-md text-[15px] leading-relaxed tracking-[-0.011em]"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              {r.body}
            </p>
          </div>

          {/* Divider */}
          <div
            aria-hidden="true"
            className="mb-10 h-px w-10"
            style={{ background: "rgba(255,255,255,0.12)" }}
          />

          {/* Form */}
          <div className="flex-1">
            <DemoForm />
          </div>

          {/* Footer note */}
          <p className="mt-12 text-[12px]" style={{ color: "rgba(255,255,255,0.20)" }}>
            {r.questions}{" "}
            <a
              href="mailto:team@svgndata.com"
              className="underline underline-offset-2 transition-colors hover:text-white/50"
            >
              team@svgndata.com
            </a>
          </p>
        </div>
      </div>

      {/* ── Right column — image ───────────────────────────────────────────── */}
      <div className="relative h-[56vw] w-full lg:sticky lg:top-0 lg:h-screen lg:w-1/2">
        <Image
          src="/dessert.png"
          alt={r.sideCallout.imageAlt}
          fill
          className="object-cover object-center"
          sizes="(min-width: 1024px) 50vw, 100vw"
          priority
        />

        {/* Dark gradient scrim — top to bottom, ensures text legibility at bottom */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(4,9,22,0.92) 0%, rgba(4,9,22,0.52) 40%, rgba(4,9,22,0.12) 72%, transparent 100%)",
          }}
        />

        {/* Left edge fade — blends into the form panel on desktop */}
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-0 hidden w-24 lg:block"
          style={{
            background:
              "linear-gradient(to right, rgba(6,13,28,0.72) 0%, transparent 100%)",
          }}
        />

        {/* Editorial statement — bottom-anchored */}
        <div className="absolute bottom-0 left-0 right-0 px-8 pb-10 md:px-12 md:pb-12">
          <div
            aria-hidden="true"
            className="mb-5 h-px w-8"
            style={{ background: "rgba(255,255,255,0.18)" }}
          />
          <h2
            className="mb-3 font-serif text-2xl font-normal leading-snug tracking-[-0.025em] md:text-3xl"
            style={{ color: "rgba(255,255,255,0.92)" }}
          >
            {r.sideCallout.headline}
          </h2>
          <p
            className="max-w-xs text-[13px] leading-relaxed tracking-[-0.011em] md:text-[14px]"
            style={{ color: "rgba(255,255,255,0.48)" }}
          >
            {r.sideCallout.body}
          </p>
        </div>
      </div>
    </main>
  )
}
