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

// ─── Product pillars ──────────────────────────────────────────────────────────
const PRODUCT_PILLARS = [
  {
    icon: Archive,
    label: "Capture & Organise",
    description:
      "Turn meetings, reports, and conversations into connected institutional knowledge — with a strong review layer that keeps everything accurate.",
    href: "/product/capture",
  },
  {
    icon: TrendingUp,
    label: "Prepare & Sell",
    description:
      "Enter every deal with sharper context. Account history, relationship visibility, and commercial intelligence — ready before the meeting starts.",
    href: "/product/prepare",
  },
  {
    icon: Megaphone,
    label: "Activate & Publish",
    description:
      "Turn internal intelligence into outbound content — reports, newsletters, stakeholder briefings, and targeted communication assets.",
    href: "/product/activate",
  },
  {
    icon: Settings2,
    label: "Connect Your Workflow",
    description:
      "Bring CRM, email, operational context, and commercial targets into one working environment. Sovereign fits the tools your team already uses.",
    href: "/product/connect",
  },
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
         *  The inner content (logo + nav + CTA) is constrained to max-w-6xl
         *  exactly like before; the inset effect is achieved at the outer
         *  wrapper level instead of by shrinking the inner content rail.
         */}
        <div
          className="relative mx-auto"
          style={{
            maxWidth: detached ? "1200px" : "100%",
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
        <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center" onClick={() => setMobileOpen(false)}>
            <Image
              src="/sovereign_log_apaisado_blanco.svg"
              alt="Sovereign"
              width={200}
              height={52}
              style={{
                width: "auto",
                // Logo subtly tightens with the bar — 4px shrink, not aggressive.
                height: detached ? "48px" : "52px",
                maxWidth: "100%",
                transition: `height ${HEADER_DURATION} ${HEADER_EASE}`,
              }}
              priority
            />
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-1 md:flex">

            {/* ── Product ── */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium tracking-[-0.011em] text-white/75 outline-none transition-colors hover:text-white data-[state=open]:text-white">
                Product
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
                    Platform capabilities
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  {PRODUCT_PILLARS.map(({ icon: Icon, label, description, href }) => (
                    <Link
                      key={label}
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
                          {label}
                        </p>
                        <p className="text-[12px] leading-[1.55] tracking-[-0.008em]" style={{ color: "rgba(255,255,255,0.38)" }}>
                          {description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* ── Who it's built for ── */}
            <Link
              href="/use-cases"
              className="rounded-md px-3 py-2 text-sm font-medium tracking-[-0.011em] text-white/75 transition-colors hover:text-white"
            >
              Who it&apos;s built for
            </Link>

            {/* ── About ── */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium tracking-[-0.011em] text-white/75 outline-none transition-colors hover:text-white data-[state=open]:text-white">
                About
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
                  Our Story
                </Link>
                <Link
                  href="/contact"
                  className="flex w-full items-center rounded-lg px-3 py-2 text-[13px] tracking-[-0.011em] text-white/70 transition-colors hover:bg-white/[0.05] hover:text-white"
                >
                  Contact
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>

          </nav>

          {/* Right side — CTA (desktop) + hamburger (mobile) */}
          <div className="flex items-center gap-3">
            <Button
              asChild
              className="hidden rounded-full bg-white px-6 font-medium tracking-[-0.011em] text-[#070E1F] hover:bg-white/90 md:inline-flex"
            >
              <Link href="/request-demo">Request Demo</Link>
            </Button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:bg-white/[0.07] md:hidden"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
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
          <MobileSection label="Product">
            <p
              className="mb-2 px-6 text-[10px] font-medium uppercase tracking-[0.12em]"
              style={{ color: "rgba(255,255,255,0.28)" }}
            >
              Platform capabilities
            </p>
            {PRODUCT_PILLARS.map(({ icon: Icon, label, description, href }) => (
              <Link
                key={label}
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
                    {label}
                  </p>
                  <p className="text-[12px] leading-[1.55]" style={{ color: "rgba(255,255,255,0.38)" }}>
                    {description}
                  </p>
                </div>
                <ChevronRight className="mt-1 h-3.5 w-3.5 shrink-0" style={{ color: "rgba(255,255,255,0.22)" }} />
              </Link>
            ))}
          </MobileSection>

          {/* Who it's built for */}
          <Link
            href="/use-cases"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-between px-6 py-4 text-[15px] font-medium tracking-[-0.011em] text-white/80 transition-colors active:bg-white/[0.04]"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
          >
            Who it&apos;s built for
            <ChevronRight className="h-4 w-4" style={{ color: "rgba(255,255,255,0.30)" }} />
          </Link>

          {/* About */}
          <MobileSection label="About">
            {[
              { label: "Our Story", href: "/about" },
              { label: "Contact", href: "/contact" },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between px-6 py-3 text-[14px] tracking-[-0.011em] text-white/70 transition-colors active:bg-white/[0.04]"
              >
                {label}
                <ChevronRight className="h-3.5 w-3.5" style={{ color: "rgba(255,255,255,0.22)" }} />
              </Link>
            ))}
          </MobileSection>

          {/* CTA */}
          <div className="px-6 py-6">
            <Link
              href="/request-demo"
              onClick={() => setMobileOpen(false)}
              className="flex w-full items-center justify-center rounded-full bg-white py-3.5 text-[15px] font-medium tracking-[-0.011em] text-[#070E1F] transition-opacity active:opacity-85"
            >
              Request Demo
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
