"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Archive,
  BarChart2,
  BookOpen,
  ChevronDown,
  ChevronRight,
  GitMerge,
  Megaphone,
  Menu,
  Settings2,
  TrendingUp,
  Users,
  X,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

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

// ─── Use cases ────────────────────────────────────────────────────────────────
const USE_CASES = [
  {
    icon: BarChart2,
    label: "Sales Teams",
    description: "Walk into every conversation knowing more than the room.",
    href: "#sales-intelligence",
  },
  {
    icon: BookOpen,
    label: "Editorial Teams",
    description: "Surface patterns and signals across everything you've produced.",
    href: "#strategic-intelligence",
  },
  {
    icon: GitMerge,
    label: "Marketing Teams",
    description: "Publish with purpose — targeted content, drawn from real intelligence.",
    href: "#marketing-activation",
  },
  {
    icon: Users,
    label: "Leadership & Strategy",
    description: "Make decisions grounded in everything your organisation already knows.",
    href: "#strategic-intelligence",
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

  return (
    <>
      <header
        className="fixed left-0 top-0 z-50 w-full border-b border-white/[0.07] backdrop-blur-2xl"
        style={{ backgroundColor: "rgba(6, 13, 28, 0.82)" }}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center" onClick={() => setMobileOpen(false)}>
            <Image
              src="/sovereign_log_apaisado_blanco.svg"
              alt="Sovereign"
              width={200}
              height={52}
              style={{ width: "auto", height: "52px", maxWidth: "100%" }}
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

            {/* ── Use Cases ── */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium tracking-[-0.011em] text-white/75 outline-none transition-colors hover:text-white data-[state=open]:text-white">
                Use Cases
                <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 [[data-state=open]_&]:rotate-180" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="center"
                sideOffset={12}
                className="w-[480px] rounded-2xl border border-white/[0.09] p-4"
                style={{ backgroundColor: "rgba(6,13,28,0.97)", backdropFilter: "blur(24px)" }}
              >
                <div className="mb-3 px-1">
                  <p className="text-[10px] font-medium uppercase tracking-[0.12em]" style={{ color: "rgba(255,255,255,0.28)" }}>
                    Who it&apos;s built for
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  {USE_CASES.map(({ icon: Icon, label, description, href }) => (
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

          {/* Use Cases */}
          <MobileSection label="Use Cases">
            <p
              className="mb-2 px-6 text-[10px] font-medium uppercase tracking-[0.12em]"
              style={{ color: "rgba(255,255,255,0.28)" }}
            >
              Who it&apos;s built for
            </p>
            {USE_CASES.map(({ icon: Icon, label, description, href }) => (
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
