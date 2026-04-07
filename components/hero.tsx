import { Button } from "@/components/ui/button"
import Image from "next/image"
import { HeroDashboardPanel } from "@/components/hero-dashboard-panel"

export function Hero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(to bottom, #040A18 0%, #071325 18%, #0C1D3C 34%, #142D59 50%, #1E4070 62%, #3A6896 73%, #7AAAC6 83%, #C4DCF0 92%, #DCEAF5 100%)",
      }}
    >
      {/* Centered copy block */}
      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-6 pb-16 pt-40 text-center">
        {/* Logo Stamp */}
        <div className="mb-7">
          <Image
            src="/sovereign_logo.svg"
            alt="Sovereign"
            width={40}
            height={40}
            loading="eager"
            className="opacity-20"
          />
        </div>

        {/* Badge */}
        <div className="mb-7 inline-flex items-center rounded-full border border-white/15 bg-white/[0.07] px-4 py-1.5 text-[13px] tracking-[-0.01em] text-white/50">
          Intelligence for the organisations that move markets
        </div>

        {/* Headline */}
        <h1 className="text-balance font-serif text-4xl font-normal tracking-[-0.03em] text-white md:text-5xl lg:text-6xl">
          What your organisation knows, finally put to work.
        </h1>

        {/* Subheadline */}
        <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed tracking-[-0.011em] text-white/55">
          Sovereign transforms internal knowledge into sales advantage, strategic clarity, and targeted communication — at the speed decisions actually need.
        </p>

        {/* Buttons */}
        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button
            size="lg"
            className="rounded-full bg-white px-8 font-medium tracking-[-0.011em] text-[#070E1F] hover:bg-white/92"
          >
            Request Demo
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-full border-white/20 bg-transparent px-8 font-medium tracking-[-0.011em] text-white/80 hover:bg-white/[0.08] hover:text-white"
          >
            Explore the Platform
          </Button>
        </div>
      </div>

      {/* Dashboard panel */}
      <div className="relative z-10 mx-auto max-w-[1100px] px-6 pb-28">
        <HeroDashboardPanel />
      </div>
    </section>
  )
}
