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

export default async function RequestDemoPage() {
  const t = await getServerT()
  const r = t.requestDemo

  return (
    <main
      className="flex min-h-screen flex-col lg:flex-row"
      style={{ backgroundColor: "var(--mkt-bg)" }}
    >
      {/* ── Left column — form ─────────────────────────────────────────────── */}
      <div className="relative flex w-full flex-col lg:w-1/2">
        <div className="relative z-10 flex flex-1 flex-col px-6 py-10 sm:px-10 md:px-14 lg:px-16 xl:px-20">
          {/* Back to site */}
          <div className="mb-12">
            <Link href="/" className="inline-flex items-center gap-2">
              <Image
                src="/aksum.svg"
                alt="Aksum"
                width={110}
                height={28}
                style={{
                  width: "auto",
                  height: "28px",
                  filter: "brightness(0) saturate(100%)",
                  opacity: 0.65,
                }}
              />
            </Link>
          </div>

          {/* Heading block */}
          <div className="mb-10">
            <p
              className="mb-3 text-[11px] font-medium uppercase tracking-[0.10em]"
              style={{ color: "var(--mkt-text-muted)" }}
            >
              {r.eyebrow}
            </p>
            <h1
              className="mb-4 font-serif text-3xl font-normal leading-tight tracking-[-0.025em] md:text-4xl"
              style={{ color: "var(--mkt-text)" }}
            >
              {r.headline}
            </h1>
            <p
              className="max-w-md text-[15px] leading-relaxed tracking-[-0.011em]"
              style={{ color: "var(--mkt-text-muted)" }}
            >
              {r.body}
            </p>
          </div>

          {/* Divider */}
          <div
            aria-hidden="true"
            className="mb-10 h-px w-10"
            style={{ background: "var(--mkt-border-strong)" }}
          />

          {/* Form */}
          <div className="flex-1">
            <DemoForm />
          </div>

          {/* Footer note */}
          <p className="mt-12 text-[12px]" style={{ color: "var(--mkt-text-muted)" }}>
            {r.questions}{" "}
            <a
              href="mailto:team@aksum.ai"
              className="underline underline-offset-2 transition-opacity hover:opacity-60"
            >
              team@aksum.ai
            </a>
          </p>
        </div>
      </div>

      {/* ── Right column — image ───────────────────────────────────────────── */}
      <div className="h-[56vw] w-full lg:sticky lg:top-0 lg:h-screen lg:w-1/2">
        <div className="relative h-full w-full">
          <Image
            src="/book.png"
            alt={r.sideCallout.imageAlt}
            fill
            className="object-cover object-center"
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority
          />

          {/* Editorial statement — text remains white, sits over the photo */}
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
      </div>
    </main>
  )
}
