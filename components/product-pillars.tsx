"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { MktContainer, MktSectionX } from "@/components/marketing-layout"
import { useT } from "@/lib/i18n/locale-context"

type FeaturePillarKey = "capture" | "prepare" | "activate"

const FEATURE_PILLARS: readonly FeaturePillarKey[] = [
  "capture",
  "prepare",
  "activate",
]

const IMAGE_FIRST_PILLARS: ReadonlySet<FeaturePillarKey> = new Set(["prepare"])

// Image fills 100% of the visual column. The column itself is the large track.
const PILLAR_IMAGE_CLASS = "h-auto w-full max-w-none object-contain"

const PILLAR_IMAGES: Record<
  FeaturePillarKey,
  { src: string; alt: string; width: number; height: number }
> = {
  capture: {
    src: "/capture.png",
    alt:
      "Inputs such as interviews, PDFs, and notes flow into Aksum and emerge as structured people, companies, topics, and summaries.",
    width: 6798,
    height: 6798,
  },
  prepare: {
    src: "/sell.png",
    alt:
      "A meeting brief for Meridian Capital with prior conversations, open opportunities, follow-ups, and upcoming events assembled before the call.",
    width: 6803,
    height: 5324,
  },
  activate: {
    src: "/activate.png",
    alt:
      "Market reports, social posts, executive briefs, and newsletters generated from internal knowledge and ready to publish.",
    width: 7532,
    height: 5964,
  },
}

function PillarBlock({
  pillarKey,
  index,
}: {
  pillarKey: FeaturePillarKey
  index: number
}) {
  const t = useT()
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: "-10% 0px" })
  const pillar = t.homepagePillars.pillars[pillarKey]
  const imageFirst = IMAGE_FIRST_PILLARS.has(pillarKey)
  const image = PILLAR_IMAGES[pillarKey]

  // Text column — min-w-0 ensures the 1fr track can actually shrink
  const textColumn = (
    <div
      className={`order-1 min-w-0 flex flex-col justify-center ${
        imageFirst ? "lg:order-2" : "lg:order-1"
      }`}
    >
      <h3 className="text-balance">
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

      <p
        className="mt-5 max-w-sm text-[16px] leading-relaxed tracking-[-0.01em] md:text-[17px] md:leading-[1.6] lg:max-w-md"
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
  )

  // Visual column — no overflow-hidden so the image is never cropped.
  // The image fills the full 64% visual track.
  const visualColumn = (
    <div
      className={`order-2 min-w-0 flex items-center justify-center py-4 lg:py-0 ${
        imageFirst ? "lg:order-1" : "lg:order-2"
      }`}
    >
      <div className="w-full max-w-none">
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          className={PILLAR_IMAGE_CLASS}
          sizes="(min-width: 1600px) 980px, (min-width: 1280px) 58vw, (min-width: 1024px) 54vw, 92vw"
          priority={index === 0}
        />
      </div>
    </div>
  )

  // Visual always gets the 64% track; text gets the 36% track.
  const gridCols = imageFirst
    ? "lg:grid-cols-[minmax(0,0.64fr)_minmax(0,0.36fr)]"
    : "lg:grid-cols-[minmax(0,0.36fr)_minmax(0,0.64fr)]"

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{
        duration: 0.65,
        ease: [0.22, 0.8, 0.36, 1],
      }}
      className={`py-10 sm:py-12 md:py-14 lg:py-16 ${
        index === FEATURE_PILLARS.length - 1 ? "pb-16 md:pb-20" : ""
      }`}
    >
      <div className={`grid grid-cols-1 gap-10 lg:items-center lg:gap-x-12 xl:gap-x-14 ${gridCols}`}>
        {textColumn}
        {visualColumn}
      </div>
    </motion.article>
  )
}

export function ProductPillars() {
  const t = useT()

  return (
    <section
      id="features"
      className="scroll-mt-24"
      style={{ backgroundColor: "var(--mkt-bg)" }}
    >
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

        <MktContainer className="max-w-[1600px]">
          {FEATURE_PILLARS.map((key, index) => (
            <PillarBlock key={key} pillarKey={key} index={index} />
          ))}
        </MktContainer>
      </MktSectionX>
    </section>
  )
}
