"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Network, TrendingUp, Send } from "lucide-react"
import Image from "next/image"

interface Slide {
  id: string
  icon: React.ReactNode
  eyebrow: string
  title: string
  description: string
  placeholder: string
  showLogo?: boolean
}

const slides: Slide[] = [
  {
    id: "sales-intelligence",
    icon: <Network className="h-6 w-6 text-foreground" />,
    eyebrow: "01 — Sales Intelligence",
    title: "Know who matters before the meeting.",
    description:
      "Sovereign surfaces relationship context, prior signals, and strategic priorities so your team enters every conversation with an edge — not a blank slate.",
    placeholder: "[ Sales Intelligence Demo Placeholder ]",
    showLogo: true,
  },
  {
    id: "strategic-intelligence",
    icon: <TrendingUp className="h-6 w-6 text-foreground" />,
    eyebrow: "02 — Strategic Intelligence",
    title: "Surface the signals your team is too busy to read.",
    description:
      "Sovereign identifies patterns, emerging themes, and underserved opportunities across your internal information — turning information overload into strategic clarity.",
    placeholder: "[ Strategic Intelligence Demo Placeholder ]",
  },
  {
    id: "marketing-activation",
    icon: <Send className="h-6 w-6 text-foreground" />,
    eyebrow: "03 — Marketing Activation",
    title: "Publish with purpose.",
    description:
      "Sovereign turns processed intelligence into targeted outbound content for the right people, at the right moment — across sales outreach, newsletters, and stakeholder communication.",
    placeholder: "[ Marketing Activation Demo Placeholder ]",
    showLogo: true,
  },
]

function FeatureSlide({
  slide,
  index,
  scrollYProgress,
}: {
  slide: Slide
  index: number
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"]
}) {
  const total = slides.length
  // Each slide occupies 1/total of the scroll range
  const start = index / total
  const end = (index + 1) / total
  // The previous slide starts fading out when the next enters
  const exitStart = start + (end - start) * 0.5
  const exitEnd = end

  const scale = useTransform(
    scrollYProgress,
    [exitStart, exitEnd],
    index < total - 1 ? [1, 0.96] : [1, 1]
  )
  const opacity = useTransform(
    scrollYProgress,
    [exitStart, exitEnd],
    index < total - 1 ? [1, 0] : [1, 1]
  )

  return (
    <motion.div
      className="sticky top-0 flex h-screen w-full items-center bg-background"
      style={{
        zIndex: index + 1,
        scale,
        opacity,
      }}
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Text side */}
          <div className="flex flex-col">
            {/* Icon */}
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-muted/50">
              {slide.icon}
            </div>

            {/* Eyebrow */}
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-muted-foreground">
              {slide.eyebrow}
            </p>

            {/* Headline */}
            <h3 className="mb-4 font-serif text-3xl font-normal tracking-tight text-foreground md:text-4xl">
              {slide.title}
            </h3>

            {/* Description */}
            <p className="text-pretty leading-relaxed text-muted-foreground">
              {slide.description}
            </p>

            {/* Logo stamp */}
            {slide.showLogo && (
              <div className="mt-8">
                <Image
                  src="/sovereign_logo.svg"
                  alt="Sovereign"
                  width={36}
                  height={36}
                  className="opacity-20"
                />
              </div>
            )}
          </div>

          {/* Media side */}
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-border bg-muted/30 shadow-md shadow-black/5">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm text-muted-foreground">{slide.placeholder}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function Features() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  return (
    <section ref={containerRef} style={{ height: `${slides.length * 100}vh` }}>
      {/* Bridge label — pinned at the top edge, fades out quickly */}
      <div className="sticky top-0 z-0 flex h-0 items-start justify-center overflow-visible pt-6 pointer-events-none">
        <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground opacity-0">
          Three ways Sovereign creates value from what you already know
        </p>
      </div>

      {slides.map((slide, index) => (
        <FeatureSlide
          key={slide.id}
          slide={slide}
          index={index}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </section>
  )
}
