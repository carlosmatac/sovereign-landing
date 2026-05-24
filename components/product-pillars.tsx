"use client"

import Image from "next/image"
import { MktContainer, MktSectionX } from "@/components/marketing-layout"
import { ShowcaseLottieSection } from "@/components/showcase-lottie-section"
import { useT } from "@/lib/i18n/locale-context"

type FeaturePillarKey = "capture" | "prepare" | "activate"

const FEATURE_PILLARS: readonly FeaturePillarKey[] = [
  "capture",
  "prepare",
  "activate",
]

// "prepare" shows the visual on the left, text on the right
const IMAGE_FIRST_PILLARS: ReadonlySet<FeaturePillarKey> = new Set(["prepare"])

const PILLAR_IMAGES: Record<
  FeaturePillarKey,
  { src: string; alt: string; width: number; height: number }
> = {
  capture: {
    src: "/capture.webp",
    alt: "Inputs such as interviews, PDFs, and notes flow into Aksum and emerge as structured people, companies, topics, and summaries.",
    width: 6798,
    height: 6798,
  },
  prepare: {
    src: "/sell.webp",
    alt: "A meeting brief for Meridian Capital with prior conversations, open opportunities, follow-ups, and upcoming events assembled before the call.",
    width: 6803,
    height: 5324,
  },
  activate: {
    src: "/activate.webp",
    alt: "Market reports, social posts, executive briefs, and newsletters generated from internal knowledge and ready to publish.",
    width: 7532,
    height: 5964,
  },
}

// ─── PillarBlock ──────────────────────────────────────────────────────────────

function PillarBlock({
  pillarKey,
  index,
}: {
  pillarKey: FeaturePillarKey
  index: number
}) {
  const t = useT()
  const pillar = t.homepagePillars.pillars[pillarKey]
  const imageFirst = IMAGE_FIRST_PILLARS.has(pillarKey)
  const image = PILLAR_IMAGES[pillarKey]

  // Visual always gets the wide 65% track; text takes 35%.
  // For imageFirst rows the visual column comes first in the DOM order.
  const gridCols = imageFirst
    ? "lg:grid-cols-[minmax(0,0.65fr)_minmax(0,0.35fr)]"
    : "lg:grid-cols-[minmax(0,0.35fr)_minmax(0,0.65fr)]"

  return (
    // Plain <article> — no Framer Motion opacity gate so text renders immediately.
    // The content must never be hidden behind an IntersectionObserver trigger.
    <article
      className={`py-10 sm:py-12 md:py-14 lg:py-16 ${
        index === FEATURE_PILLARS.length - 1 ? "pb-16 md:pb-20" : ""
      }`}
    >
      {/* items-stretch lets the text column grow to the same height as the image */}
      <div
        className={`grid grid-cols-1 gap-10 lg:items-stretch lg:gap-x-12 xl:gap-x-16 ${gridCols}`}
      >
        {/* ── Text column ──
            Desktop: h-full matches the image row. Top/bottom spacers use h-[10%]
            (percent of column HEIGHT, not width — unlike py-[10%] padding).
            flex-1 between title and body anchors the body in the lower third
            without pinning it to the bottom edge.
            Mobile: normal stacked flow, spacers hidden. */}
        <div
          className={`order-1 flex min-h-0 min-w-0 flex-col lg:h-full ${
            imageFirst ? "lg:order-2" : "lg:order-1"
          }`}
        >
          <div className="hidden shrink-0 lg:block lg:h-[10%]" aria-hidden />

          <h3 className="shrink-0 text-balance">
            <span
              className="block font-serif text-[34px] font-normal leading-[1.08] tracking-[-0.025em] sm:text-[38px] md:text-[42px] lg:text-[44px] xl:text-[48px] xl:leading-[1.06]"
              style={{ color: "var(--mkt-text)" }}
            >
              {pillar.title}
            </span>
            <span
              className="mt-2 block font-serif text-[26px] font-normal italic leading-[1.12] tracking-[-0.02em] sm:text-[28px] md:text-[30px] lg:text-[32px]"
              style={{ color: "var(--mkt-hero-band)" }}
            >
              {pillar.accentLine}
            </span>
          </h3>

          <div className="hidden min-h-0 flex-1 lg:block" aria-hidden />

          <div className="mt-8 shrink-0 lg:mt-0">
            <p
              className="max-w-sm text-[16px] leading-relaxed tracking-[-0.01em] md:text-[17px] md:leading-[1.6] lg:max-w-md"
              style={{ color: "var(--mkt-text-muted)" }}
            >
              {pillar.description}
            </p>

            <ul
              className="mt-7 max-w-sm border-t pt-6 lg:max-w-md"
              style={{ borderColor: "rgba(26,26,46,0.08)" }}
            >
              {pillar.bullets.map((bullet, bulletIndex) => (
                <li key={bullet}>
                  {bulletIndex > 0 && (
                    <div
                      className="my-3 h-px w-full max-w-xs"
                      style={{ backgroundColor: "rgba(26,26,46,0.1)" }}
                      aria-hidden="true"
                    />
                  )}
                  <p
                    className="text-[14px] leading-snug tracking-[-0.006em] md:text-[15px] md:leading-relaxed"
                    style={{ color: "var(--mkt-text-muted)" }}
                  >
                    {bullet}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden shrink-0 lg:block lg:h-[10%]" aria-hidden />
        </div>

        {/* ── Visual column ── fills its 65% track entirely */}
        <div
          className={`order-2 min-w-0 ${
            imageFirst ? "lg:order-1" : "lg:order-2"
          }`}
        >
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            className="block h-auto w-full object-contain"
            // sizes reflect the new 1700px max-width container + 65% visual column
            sizes="(min-width: 1700px) 1060px, (min-width: 1280px) 62vw, (min-width: 1024px) 64vw, 95vw"
            priority={index === 0}
          />
        </div>
      </div>
    </article>
  )
}

// ─── Section export ───────────────────────────────────────────────────────────

export function ProductPillars() {
  const t = useT()

  return (
    <section
      id="features"
      className="scroll-mt-24"
      style={{ backgroundColor: "var(--mkt-bg)" }}
    >
      {/* Section header — keep the normal page-gutter container for the title text */}
      <MktSectionX>
        <MktContainer className="pb-2 pt-12 text-center md:pb-4 md:pt-16">
          <p
            className="text-[10px] font-medium uppercase tracking-[0.18em]"
            style={{ color: "var(--mkt-text-muted)" }}
          >
            {t.homepagePillars.eyebrow}
          </p>
          <h2
            className="mt-4 text-balance font-serif text-[28px] font-normal tracking-[-0.022em] md:text-[38px] md:leading-[1.15] lg:text-[42px]"
            style={{ color: "var(--mkt-text)" }}
          >
            {t.homepagePillars.headline}
          </h2>
        </MktContainer>
      </MktSectionX>

      <ShowcaseLottieSection />

      {/* Pillar rows — wide independent container.
          Intentionally bypasses MktSectionX so the large page-gutter padding
          doesn't constrain the visual columns. Images need room to breathe. */}
      <div className="mx-auto w-full max-w-[1700px] px-6 lg:px-8 xl:px-10">
        {FEATURE_PILLARS.map((key, index) => (
          <PillarBlock key={key} pillarKey={key} index={index} />
        ))}
      </div>
    </section>
  )
}
