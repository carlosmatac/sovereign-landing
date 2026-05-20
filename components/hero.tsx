"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { useT } from "@/lib/i18n/locale-context"

const KNOWLEDGE_NODES = [
  { label: "Interview", type: "Document", angle: -60, distance: 130, color: "#059669" },
  { label: "CEO Brief", type: "Person", angle: -10, distance: 145, color: "#7C3AED" },
  { label: "Expansion", type: "Project", angle: 50, distance: 135, color: "#0891B2" },
  { label: "Fintech", type: "Topic", angle: 110, distance: 125, color: "#E11D48" },
  { label: "Ministry", type: "Organization", angle: 165, distance: 140, color: "#D97706" },
  { label: "Aksum Corp", type: "Company", angle: 220, distance: 130, color: "#3B5BDB" },
]

function KnowledgeIllustration() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[420px]">
      <svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 420 420"
      >
        {KNOWLEDGE_NODES.map((node, i) => {
          const rad = (node.angle * Math.PI) / 180
          const x = 210 + Math.cos(rad) * node.distance
          const y = 210 + Math.sin(rad) * node.distance
          return (
            <line
              key={node.label}
              x1="210"
              y1="210"
              x2={x}
              y2={y}
              stroke="rgba(59,91,219,0.18)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="0"
                to="-16"
                dur="2s"
                repeatCount="indefinite"
                begin={`${i * 0.2}s`}
              />
            </line>
          )
        })}
      </svg>

      <div className="absolute left-1/2 top-1/2 z-10 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-[0_8px_32px_rgba(59,91,219,0.12)]">
        <Image
          src="/ak.svg"
          alt=""
          width={48}
          height={48}
          className="opacity-80"
          style={{ filter: "brightness(0) saturate(100%)" }}
        />
      </div>

      {KNOWLEDGE_NODES.map((node, i) => {
        const rad = (node.angle * Math.PI) / 180
        const x = 50 + (Math.cos(rad) * node.distance) / 4.2
        const y = 50 + (Math.sin(rad) * node.distance) / 4.2
        return (
          <motion.div
            key={node.label}
            className="absolute z-20 -translate-x-1/2 -translate-y-1/2 rounded-lg border bg-white px-3 py-2"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              borderColor: `${node.color}30`,
              boxShadow: "0 4px 16px rgba(26,26,46,0.06)",
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
          >
            <p
              className="text-[9px] font-medium uppercase tracking-[0.1em]"
              style={{ color: node.color }}
            >
              {node.type}
            </p>
            <p
              className="text-[12px] font-medium tracking-[-0.01em]"
              style={{ color: "var(--mkt-text)" }}
            >
              {node.label}
            </p>
          </motion.div>
        )
      })}
    </div>
  )
}

export function Hero() {
  const t = useT()

  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: "var(--mkt-band)" }}
    >
      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-20 pt-28 md:pb-24 md:pt-32 lg:pb-28 lg:pt-36">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <span
              className="inline-flex items-center rounded-full border px-4 py-1.5 text-[13px] tracking-[-0.01em]"
              style={{
                borderColor: "var(--mkt-border-strong)",
                color: "var(--mkt-text-muted)",
                backgroundColor: "rgba(255,255,255,0.6)",
              }}
            >
              {t.hero.badge}
            </span>

            <h1
              className="mt-6 text-balance font-serif text-4xl font-normal tracking-[-0.025em] md:text-5xl lg:text-[56px] lg:leading-[1.08]"
              style={{ color: "var(--mkt-text)" }}
            >
              {t.hero.headline}
            </h1>

            <p
              className="mt-6 max-w-lg text-pretty text-base leading-relaxed tracking-[-0.011em] md:text-lg"
              style={{ color: "var(--mkt-text-muted)" }}
            >
              {t.hero.subheadline}
            </p>

            <div className="mt-8">
              <Button
                asChild
                size="lg"
                className="rounded-full px-8 font-medium tracking-[-0.011em] text-white hover:opacity-90"
                style={{ backgroundColor: "var(--mkt-accent)" }}
              >
                <Link href="/request-demo">{t.hero.primaryCta}</Link>
              </Button>
            </div>
          </div>

          <div className="relative flex items-center justify-center lg:justify-end">
            <KnowledgeIllustration />
          </div>
        </div>
      </div>
    </section>
  )
}
