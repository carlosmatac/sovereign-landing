export function TrustBanner() {
  const logos = [
    "Meridian",
    "Frontier Group",
    "Atlas Consulting",
    "Equinox Media",
    "Horizon Partners",
  ]

  return (
    <section className="border-y border-border bg-background px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <p className="mb-8 text-center text-[13px] tracking-[-0.011em] text-muted-foreground">
          Trusted by information-intensive organisations operating at the frontier of their industries.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {logos.map((logo) => (
            <span
              key={logo}
              className="text-lg font-semibold tracking-[-0.02em] text-muted-foreground/40"
            >
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
