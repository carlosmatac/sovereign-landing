"use client"

import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"
import Image from "next/image"

export function Hero() {
  return (
    <section className="px-6 pb-20 pt-24 md:pb-32 md:pt-32">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center">
          {/* Logo Stamp */}
          <div className="mb-6">
            <Image
              src="/sovereign_logo.svg"
              alt="Sovereign"
              width={56}
              height={56}
              loading="eager"
              className="opacity-15"
            />
          </div>

          {/* Badge */}
          <div className="mb-8 inline-flex items-center rounded-full border border-border bg-muted/50 px-4 py-1.5 text-sm text-muted-foreground">
            Powered by GraphRAG & AI
          </div>

          {/* Headline */}
          <h1 className="max-w-4xl text-balance font-serif text-5xl font-normal tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Frontier Markets Intelligence, Decoded.
          </h1>

          {/* Subheadline */}
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
            Transforming exclusive 60-90 minute interviews with Ministers, CEOs, and Diplomats into a searchable, AI-powered business intelligence database for the Global South.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <Button size="lg" className="rounded-full px-8 font-medium">
              Request Exclusive Access
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-8 font-medium"
            >
              Explore the Platform
            </Button>
          </div>

          {/* Video Placeholder */}
          <div className="mt-16 w-full md:mt-20">
            <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border bg-muted/30 shadow-lg shadow-black/5">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-foreground/5 backdrop-blur-sm transition-colors hover:bg-foreground/10">
                  <Play className="h-6 w-6 text-foreground" />
                </div>
                <span className="text-sm text-muted-foreground">
                  [ Hero Animation / Video Placeholder ]
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
