// Film grain — same SVG feTurbulence as hero, kept in sync
const GRAIN_BG =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)'/%3E%3C/svg%3E\")"

// Fine dot grid — 28px spacing, slightly looser than hero
const DOT_GRID =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='28'%3E%3Ccircle cx='0.5' cy='0.5' r='0.75' fill='white'/%3E%3C/svg%3E\")"

export function TrustBanner() {
  const logos = [
    "Meridian",
    "Frontier Group",
    "Atlas Consulting",
    "Equinox Media",
    "Horizon Partners",
  ]

  return (
    <section
      className="relative overflow-hidden border-y border-white/[0.06] px-6 py-12"
      style={{ backgroundColor: "#071121" }}
    >
      {/* Film grain */}
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

      {/* Dot grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: DOT_GRID,
          backgroundRepeat: "repeat",
          backgroundSize: "28px 28px",
          opacity: 0.022,
        }}
      />

      {/* Atmospheric depth — soft upward glow from bottom, creates separation from hero above */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 120% at 50% 130%, rgba(6,16,50,0.85) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <p className="mb-8 text-center text-[13px] tracking-[-0.011em] text-white/35">
          Trusted by information-intensive organisations operating at the frontier of their industries.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {logos.map((logo) => (
            <span
              key={logo}
              className="text-lg font-semibold tracking-[-0.02em] text-white/[0.14]"
            >
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
