"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Archive,
  ChevronDown,
  ChevronRight,
  Megaphone,
  Menu,
  Settings2,
  TrendingUp,
  X,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useT } from "@/lib/i18n/locale-context"
import { LanguageSwitcher } from "@/components/language-switcher"

// ─── Scroll-reactive state ────────────────────────────────────────────────────
// The header transitions between two visual states based on scroll position:
//
//   • FITTED  (page near the top)
//       full-width, no top offset, square corners, only a 1px bottom hairline,
//       slightly less opaque background. Reads as part of the page shell.
//
//   • DETACHED (after the user has scrolled past the threshold)
//       inset from the viewport edges, gains a 14px radius, a soft 3-layer
//       panel shadow, a denser background, and a slightly reduced height.
//       Reads as a floating premium bar — but never glass-y.
//
// Hysteresis is intentional: switch to detached above 28px, return to fitted
// below 8px. That avoids flicker when the user lingers around the threshold.

const SCROLL_DOWN_THRESHOLD = 28
const SCROLL_UP_THRESHOLD = 8

function useScrolledState() {
  const [scrolled, setScrolled] = useState(false)
  const ticking = useRef(false)

  useEffect(() => {
    // Initialise from the current scroll position so refresh doesn't flash.
    if (typeof window !== "undefined") {
      setScrolled(window.scrollY > SCROLL_DOWN_THRESHOLD)
    }

    const handler = () => {
      if (ticking.current) return
      ticking.current = true
      requestAnimationFrame(() => {
        const y = window.scrollY
        setScrolled((prev) => {
          if (!prev && y > SCROLL_DOWN_THRESHOLD) return true
          if (prev && y < SCROLL_UP_THRESHOLD) return false
          return prev
        })
        ticking.current = false
      })
    }

    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [])

  return scrolled
}

// Shared easing — matches the landing-page transition curve for a unified feel.
const HEADER_EASE = "cubic-bezier(0.22, 0.8, 0.36, 1)"
const HEADER_DURATION = "520ms"

// ─── Brand logo geometry ──────────────────────────────────────────────────────
// The Aksum logo is split across two assets so we can animate the SUM segment
// being absorbed into the AK mark on scroll. Both source SVGs share the same
// intrinsic height (885.33px), so they sit on a single baseline by default —
// no manual vertical alignment needed.
//
//   AK  → 885.33 × 885.33  (square)
//   SUM → 1346.67 × 885.33 (≈ 1.5212 aspect)
const LOGO_AK_ASPECT = 1
const LOGO_SUM_ASPECT = 1346.6667 / 885.33331 // ≈ 1.5212
// Slight negative value pulls the SUM wrapper into AK's intrinsic right
// whitespace so the two assets read as one cohesive `AKSUM` wordmark in
// the expanded state without becoming visually fused. The SVG files each
// carry their own internal padding around the glyphs; with no overlap
// the wordmark feels "split in half", with too much overlap the K and S
// kiss. -4px keeps a precise but unbroken letter rhythm.
const LOGO_GAP = -4 // px — overlap between AK and SUM in the fitted state

// ─── Product pillars ──────────────────────────────────────────────────────────
// Static metadata only (icon + href + dictionary key). The visible label and
// description are looked up at render time from the active locale dictionary
// via `t.header.productMenu.pillars[key]`.
type PillarKey = "capture" | "prepare" | "activate" | "connect"

const PRODUCT_PILLARS: ReadonlyArray<{
  key: PillarKey
  icon: typeof Archive
  href: string
}> = [
  { key: "capture",  icon: Archive,    href: "/product/capture"  },
  { key: "prepare",  icon: TrendingUp, href: "/product/prepare"  },
  { key: "activate", icon: Megaphone,  href: "/product/activate" },
  { key: "connect",  icon: Settings2,  href: "/product/connect"  },
]


// ─── Mobile accordion section ─────────────────────────────────────────────────

function MobileSection({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-6 py-4"
      >
        <span className="text-[15px] font-medium tracking-[-0.011em] text-white/80">
          {label}
        </span>
        <ChevronDown
          className="h-4 w-4 transition-transform duration-200"
          style={{
            color: "rgba(255,255,255,0.40)",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </button>
      {open && <div className="pb-3">{children}</div>}
    </div>
  )
}

// ─── Header ───────────────────────────────────────────────────────────────────

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const scrolled = useScrolledState()
  const t = useT()

  // While the mobile drawer is open we lock the header in its FITTED state.
  // The drawer is full-screen so the header's framing should stay aligned
  // with the page shell underneath it instead of shrinking visually.
  const detached = scrolled && !mobileOpen

  return (
    <>
      {/*
       *  WRAPPER (fixed, full-width)
       *
       *  Animates `padding` so the inner bar gets gently pushed in from the
       *  viewport edges as the page scrolls. This is what produces the
       *  "detaching" effect — no JS layout, just CSS transitions on padding.
       */}
      <header
        className="fixed inset-x-0 top-0 z-50"
        style={{
          paddingTop: detached ? "10px" : "0px",
          paddingLeft: detached ? "12px" : "0px",
          paddingRight: detached ? "12px" : "0px",
          transition: `padding ${HEADER_DURATION} ${HEADER_EASE}`,
        }}
      >
        {/*
         *  INNER BAR
         *
         *  Holds all the visual properties that shift between the two states:
         *  background opacity, radius, border, shadow and height. Everything
         *  inside is unchanged content — only the framing transitions.
         *
         *  Width strategy:
         *    • FITTED   → spans the full viewport (max-width: 100%) so the
         *                 bar reads as part of the page shell.
         *    • DETACHED → caps at 1480px so the floating bar still holds a
         *                 confident, architectural width on large monitors
         *                 without pushing the logo and CTA infinitely apart
         *                 on ultra-wide displays.
         *
         *  Content distribution lives inside the inner flex row below, where
         *  generous horizontal padding (px-6 → md:px-8 → lg:px-12) anchors
         *  the logo to the far left and the CTA to the far right.
         */}
        <div
          className="relative mx-auto"
          style={{
            maxWidth: detached ? "1480px" : "100%",
            height: detached ? "56px" : "64px",
            borderRadius: detached ? "14px" : "0px",
            // Single border declaration that animates color smoothly between
            // states. In fitted, the side/top edges fade to transparent and
            // only the bottom edge shows — overridden via borderBottomColor.
            border: `1px solid ${
              detached ? "rgba(147,147,147,0.18)" : "rgba(255,255,255,0)"
            }`,
            borderBottomColor: detached
              ? "rgba(147,147,147,0.18)"
              : "rgba(255,255,255,0.07)",
            background: detached
              ? "rgba(7,14,31,0.86)"
              : "rgba(6,13,28,0.78)",
            // 3-layer panel shadow on detached, none on fitted.
            boxShadow: detached
              ? "0 0 0 1px rgba(255,255,255,0.025), 0 18px 44px -14px rgba(0,0,0,0.65), 0 4px 16px -4px rgba(0,0,0,0.45)"
              : "0 0 0 0 rgba(0,0,0,0)",
            // Light, restrained backdrop blur — never glass-y. The bg color
            // does most of the lifting; blur is only there to prevent harsh
            // text-on-content collisions when the page scrolls underneath.
            backdropFilter: "blur(18px) saturate(120%)",
            WebkitBackdropFilter: "blur(18px) saturate(120%)",
            transition: [
              `max-width ${HEADER_DURATION} ${HEADER_EASE}`,
              `height ${HEADER_DURATION} ${HEADER_EASE}`,
              `border-radius ${HEADER_DURATION} ${HEADER_EASE}`,
              `border-color ${HEADER_DURATION} ${HEADER_EASE}`,
              `background-color ${HEADER_DURATION} ${HEADER_EASE}`,
              `box-shadow ${HEADER_DURATION} ${HEADER_EASE}`,
            ].join(", "),
          }}
        >
        {/*
         *  CONTENT ROW
         *
         *  No max-width on this row — it fills the inner bar so the logo can
         *  sit hard against the left padding and the CTA hard against the
         *  right padding. Padding scales with viewport so the anchors keep
         *  breathing room on small screens but really commit to the edges
         *  on large ones.
         *
         *  The desktop nav is absolutely centred with `lg:absolute` so its
         *  position is independent of how wide the logo or CTA cluster grow.
         *  This is what gives the header the architectural left/centre/right
         *  composition you want at >=lg widths.
         */}
        <div className="relative flex h-full items-center justify-between gap-4 px-5 sm:px-6 md:px-8 lg:px-12">
          {/*
           *  Aksum logo — composed from two assets so we can animate the
           *  SUM segment being absorbed into the AK mark on scroll.
           *
           *    fitted   →  [AK][·gap·][SUM]   (full AKSUM wordmark)
           *    detached →  [AK]                (compact mark only)
           *
           *  How the absorption works:
           *
           *    1. AK is rendered at its own width/height. It NEVER moves and
           *       NEVER fades — it's the visual anchor of the brand.
           *
           *    2. SUM lives inside a width-collapsing wrapper with
           *       `overflow: hidden`. As the wrapper width animates to 0,
           *       SUM is clipped from its right edge inward (because the
           *       SUM image is anchored to the wrapper's left edge). Visually
           *       this reads as SUM being pulled into the AK mark.
           *
           *    3. SUM also fades opacity → 0 and translates leftwards so the
           *       motion has weight — pure clipping alone would feel too
           *       mechanical. The translate amount (≈ 35% of SUM width) is
           *       calibrated so SUM disappears at the same moment the
           *       wrapper width finishes collapsing.
           *
           *  Both heights animate together on the same easing curve as the
           *  rest of the header, so the inner-bar height shift, the AK
           *  shrink and the SUM collapse all read as one coordinated motion.
           *
           *  Because the SUM wrapper participates in the parent flex row,
           *  the rest of the header (nav, CTA, language switcher) shifts
           *  with the same easing — no layout jump, no re-flow at the end.
           */}
          {(() => {
            const akH = detached ? 54 : 58
            const sumH = akH
            const akW = akH * LOGO_AK_ASPECT
            const sumW = sumH * LOGO_SUM_ASPECT
            return (
              <Link
                href="/"
                aria-label="Aksum"
                className="flex shrink-0 items-center"
                onClick={() => setMobileOpen(false)}
              >
                {/* AK — fixed brand anchor. Carries the alt text. */}
                <Image
                  src="/aksum_left.svg"
                  alt="Aksum"
                  width={886}
                  height={886}
                  style={{
                    height: `${akH}px`,
                    width: `${akW}px`,
                    transition: [
                      `height ${HEADER_DURATION} ${HEADER_EASE}`,
                      `width ${HEADER_DURATION} ${HEADER_EASE}`,
                    ].join(", "),
                  }}
                  priority
                />

                {/* SUM — width-collapsing wrapper that clips from the right
                    and pulls the inner image leftwards into the AK mark.
                    The wrapper itself carries a negative `marginLeft` so it
                    sits inside AK's right-edge whitespace, which tightens
                    the perceived gap between AK and SUM without clipping
                    SUM's right edge. Both `width` and `marginLeft` animate
                    to 0 when detached, so the bar returns to AK-only with
                    no residual offset and no layout jump. */}
                <div
                  aria-hidden="true"
                  style={{
                    height: `${sumH}px`,
                    width: detached ? "0px" : `${sumW}px`,
                    marginLeft: detached ? "0px" : `${LOGO_GAP}px`,
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    transition: [
                      `width ${HEADER_DURATION} ${HEADER_EASE}`,
                      `margin-left ${HEADER_DURATION} ${HEADER_EASE}`,
                      `height ${HEADER_DURATION} ${HEADER_EASE}`,
                    ].join(", "),
                  }}
                >
                  <Image
                    src="/aksum_right.svg"
                    alt=""
                    width={1347}
                    height={886}
                    style={{
                      height: `${sumH}px`,
                      width: `${sumW}px`,
                      opacity: detached ? 0 : 1,
                      transform: detached
                        ? `translateX(-${Math.round(sumW * 0.35)}px)`
                        : "translateX(0)",
                      transition: [
                        `opacity ${HEADER_DURATION} ${HEADER_EASE}`,
                        `transform ${HEADER_DURATION} ${HEADER_EASE}`,
                        `height ${HEADER_DURATION} ${HEADER_EASE}`,
                        `width ${HEADER_DURATION} ${HEADER_EASE}`,
                      ].join(", "),
                    }}
                  />
                </div>
              </Link>
            )
          })()}

          {/* Desktop navigation — absolutely centred at >=lg so it stays
              optically anchored to the page midline regardless of how wide
              the logo or the right-side cluster grow. At md it sits in the
              normal flex flow, which keeps the bar from feeling empty on
              tablet breakpoints where there's less horizontal room. */}
          <nav className="hidden items-center gap-1 md:flex lg:absolute lg:left-1/2 lg:-translate-x-1/2">

            {/* ── Product ── */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium tracking-[-0.011em] text-white/75 outline-none transition-colors hover:text-white data-[state=open]:text-white">
                {t.header.nav.product}
                <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 [[data-state=open]_&]:rotate-180" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="center"
                sideOffset={12}
                className="w-[560px] rounded-2xl border border-white/[0.09] p-4"
                style={{ backgroundColor: "rgba(6,13,28,0.97)", backdropFilter: "blur(24px)" }}
              >
                <div className="mb-3 px-1">
                  <p className="text-[10px] font-medium uppercase tracking-[0.12em]" style={{ color: "rgba(255,255,255,0.28)" }}>
                    {t.header.productMenu.eyebrow}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  {PRODUCT_PILLARS.map(({ key, icon: Icon, href }) => {
                    const pillar = t.header.productMenu.pillars[key]
                    return (
                      <Link
                        key={key}
                        href={href}
                        className="group flex items-start gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-white/[0.05]"
                      >
                        <div
                          className="mt-[2px] flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
                          style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.09)" }}
                        >
                          <Icon className="h-3.5 w-3.5" style={{ color: "rgba(255,255,255,0.55)" }} />
                        </div>
                        <div>
                          <p className="mb-0.5 text-[13px] font-medium tracking-[-0.011em] text-white/85 transition-colors group-hover:text-white">
                            {pillar.label}
                          </p>
                          <p className="text-[12px] leading-[1.55] tracking-[-0.008em]" style={{ color: "rgba(255,255,255,0.38)" }}>
                            {pillar.description}
                          </p>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* ── Who it's built for ── */}
            <Link
              href="/use-cases"
              className="rounded-md px-3 py-2 text-sm font-medium tracking-[-0.011em] text-white/75 transition-colors hover:text-white"
            >
              {t.header.nav.whoItsBuiltFor}
            </Link>

            {/* ── About ── */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium tracking-[-0.011em] text-white/75 outline-none transition-colors hover:text-white data-[state=open]:text-white">
                {t.header.nav.about}
                <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 [[data-state=open]_&]:rotate-180" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="center"
                sideOffset={12}
                className="w-44 rounded-xl border border-white/[0.09] p-1.5"
                style={{ backgroundColor: "rgba(6,13,28,0.97)", backdropFilter: "blur(24px)" }}
              >
                <Link
                  href="/about"
                  className="flex w-full items-center rounded-lg px-3 py-2 text-[13px] tracking-[-0.011em] text-white/70 transition-colors hover:bg-white/[0.05] hover:text-white"
                >
                  {t.header.aboutMenu.ourStory}
                </Link>
                <Link
                  href="/contact"
                  className="flex w-full items-center rounded-lg px-3 py-2 text-[13px] tracking-[-0.011em] text-white/70 transition-colors hover:bg-white/[0.05] hover:text-white"
                >
                  {t.header.aboutMenu.contact}
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>

          </nav>

          {/* Right side — language switcher + CTA (desktop) + hamburger (mobile) */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Language toggle — sits left of the CTA on desktop, hidden in
                the mobile bar (it lives inside the drawer instead so the
                mobile header keeps the logo + hamburger uncluttered). */}
            <div className="hidden md:flex">
              <LanguageSwitcher size="compact" />
            </div>

            <Button
              asChild
              className="hidden rounded-full bg-white px-6 font-medium tracking-[-0.011em] text-[#070E1F] hover:bg-white/90 md:inline-flex"
            >
              <Link href="/request-demo">{t.header.cta}</Link>
            </Button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:bg-white/[0.07] md:hidden"
              aria-label={mobileOpen ? t.header.mobile.close : t.header.mobile.open}
            >
              {mobileOpen
                ? <X className="h-5 w-5" style={{ color: "rgba(255,255,255,0.75)" }} />
                : <Menu className="h-5 w-5" style={{ color: "rgba(255,255,255,0.75)" }} />
              }
            </button>
          </div>
        </div>
        </div>
      </header>

      {/* ── Mobile drawer ── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col overflow-y-auto md:hidden"
          style={{ backgroundColor: "#060D1C", paddingTop: "64px" }}
        >
          {/* Product */}
          <MobileSection label={t.header.nav.product}>
            <p
              className="mb-2 px-6 text-[10px] font-medium uppercase tracking-[0.12em]"
              style={{ color: "rgba(255,255,255,0.28)" }}
            >
              {t.header.productMenu.eyebrow}
            </p>
            {PRODUCT_PILLARS.map(({ key, icon: Icon, href }) => {
              const pillar = t.header.productMenu.pillars[key]
              return (
                <Link
                  key={key}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-start gap-3 px-6 py-3 transition-colors active:bg-white/[0.04]"
                >
                  <div
                    className="mt-[2px] flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
                    style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.09)" }}
                  >
                    <Icon className="h-3.5 w-3.5" style={{ color: "rgba(255,255,255,0.55)" }} />
                  </div>
                  <div className="flex-1">
                    <p className="mb-0.5 text-[14px] font-medium tracking-[-0.011em] text-white/85">
                      {pillar.label}
                    </p>
                    <p className="text-[12px] leading-[1.55]" style={{ color: "rgba(255,255,255,0.38)" }}>
                      {pillar.description}
                    </p>
                  </div>
                  <ChevronRight className="mt-1 h-3.5 w-3.5 shrink-0" style={{ color: "rgba(255,255,255,0.22)" }} />
                </Link>
              )
            })}
          </MobileSection>

          {/* Who it's built for */}
          <Link
            href="/use-cases"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-between px-6 py-4 text-[15px] font-medium tracking-[-0.011em] text-white/80 transition-colors active:bg-white/[0.04]"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
          >
            {t.header.nav.whoItsBuiltFor}
            <ChevronRight className="h-4 w-4" style={{ color: "rgba(255,255,255,0.30)" }} />
          </Link>

          {/* About */}
          <MobileSection label={t.header.nav.about}>
            {[
              { label: t.header.aboutMenu.ourStory, href: "/about" },
              { label: t.header.aboutMenu.contact, href: "/contact" },
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between px-6 py-3 text-[14px] tracking-[-0.011em] text-white/70 transition-colors active:bg-white/[0.04]"
              >
                {label}
                <ChevronRight className="h-3.5 w-3.5" style={{ color: "rgba(255,255,255,0.22)" }} />
              </Link>
            ))}
          </MobileSection>

          {/* Language toggle — comfortable density inside the drawer so it
              taps cleanly. Sits above the CTA, not buried at the bottom. */}
          <div
            className="flex items-center justify-between px-6 py-4"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
          >
            <span className="text-[15px] font-medium tracking-[-0.011em] text-white/80">
              {t.locale.label}
            </span>
            <LanguageSwitcher size="comfortable" />
          </div>

          {/* CTA */}
          <div className="px-6 py-6">
            <Link
              href="/request-demo"
              onClick={() => setMobileOpen(false)}
              className="flex w-full items-center justify-center rounded-full bg-white py-3.5 text-[15px] font-medium tracking-[-0.011em] text-[#070E1F] transition-opacity active:opacity-85"
            >
              {t.header.cta}
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
