"use client"

import { Button } from "@/components/ui/button"
import { HeroCanvas } from "@/components/hero-canvas"
import Image from "next/image"
import Lottie from "lottie-react"
import mainShowcase from "@/public/main_showcase.json"

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <HeroCanvas />

      <div
        className="relative grid min-h-screen w-full grid-cols-1 lg:grid-cols-[2fr_3fr]"
        style={{ zIndex: 10 }}
      >
        {/* Left — Text content */}
        <div className="flex flex-col justify-center px-8 pb-12 pt-28 md:px-12 lg:px-16 lg:py-0">
          {/* Logo Stamp */}
          <div className="mb-6">
            <Image
              src="/sovereign_logo.svg"
              alt="Sovereign"
              width={44}
              height={44}
              loading="eager"
              className="opacity-15"
            />
          </div>

          {/* Badge */}
          <div className="mb-6 inline-flex w-fit items-center rounded-full border border-border bg-muted/50 px-4 py-1.5 text-sm text-muted-foreground">
            Intelligence for the organisations that move markets
          </div>

          {/* Headline */}
          <h1 className="text-balance font-serif text-4xl font-normal tracking-tight text-foreground md:text-5xl lg:text-6xl">
            What your organisation knows, finally put to work.
          </h1>

          {/* Subheadline */}
          <p className="mt-5 max-w-md text-pretty text-lg leading-relaxed text-muted-foreground">
            Sovereign transforms internal knowledge into sales advantage, strategic clarity, and targeted communication — at the speed decisions actually need.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" className="rounded-full px-8 font-medium">
              Request Demo
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-8 font-medium"
            >
              Explore the Platform
            </Button>
          </div>
        </div>

        {/* Right — Lottie, fills its column at every breakpoint */}
        <div className="flex items-center">
          <Lottie
            animationData={mainShowcase}
            loop
            autoplay
            className="w-full"
          />
        </div>
      </div>
    </section>
  )
}
