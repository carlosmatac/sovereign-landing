"use client"

import { useEffect, useRef, useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useT } from "@/lib/i18n/locale-context"
import { LanguageSwitcher } from "@/components/language-switcher"
import { RequestDemoButton } from "@/components/request-demo-button"

const SCROLL_DOWN_THRESHOLD = 28
const SCROLL_UP_THRESHOLD = 8
const HEADER_HEIGHT = 64

const EASE = "cubic-bezier(0.22, 0.8, 0.36, 1)"
const DUR = "480ms"

function useScrolledState() {
  const [scrolled, setScrolled] = useState(false)
  const ticking = useRef(false)

  useEffect(() => {
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

function useOverHero() {
  const [overHero, setOverHero] = useState(true)

  useEffect(() => {
    const measure = () => {
      const hero = document.getElementById("hero")
      if (!hero) { setOverHero(false); return }
      setOverHero(hero.getBoundingClientRect().bottom > HEADER_HEIGHT + 4)
    }
    measure()
    window.addEventListener("scroll", measure, { passive: true })
    window.addEventListener("resize", measure)
    return () => {
      window.removeEventListener("scroll", measure)
      window.removeEventListener("resize", measure)
    }
  }, [])

  return overHero
}

const LOGO_AK_ASPECT = 1
const LOGO_SUM_ASPECT = 1346.6667 / 885.33331
const LOGO_GAP = -4

const NAV_LINKS = [
  { key: "features" as const, href: "#features" },
  { key: "connect" as const, href: "#connect" },
  { key: "knowledgeGraph" as const, href: "#knowledge-graph" },
  { key: "faq" as const, href: "#faq" },
]

function MobileSection({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: "1px solid var(--mkt-border)" }}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="mkt-section-x flex w-full items-center justify-between py-4"
      >
        <span
          className="text-[15px] font-medium tracking-[-0.011em]"
          style={{ color: "var(--mkt-text)" }}
        >
          {label}
        </span>
        <ChevronDown
          className="h-4 w-4 transition-transform duration-200"
          style={{
            color: "var(--mkt-text-muted)",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </button>
      {open && <div className="pb-3">{children}</div>}
    </div>
  )
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const scrolled = useScrolledState()
  const overHero = useOverHero()
  const t = useT()

  const integratedHero = overHero && !mobileOpen
  const detached = scrolled && !mobileOpen && !overHero

  const logoFilter = "brightness(0) saturate(100%)"
  const menuHoverBg = "var(--mkt-band)"

  const barShadow = detached
    ? "0 4px 24px -4px rgba(26,26,46,0.08), 0 1px 3px rgba(26,26,46,0.04)"
    : "none"

  const barBorder = detached
    ? "1px solid var(--mkt-border-strong)"
    : integratedHero
      ? "none"
      : "1px solid var(--mkt-border)"

  return (
    <>
      {/*
        Outer padding (the floating inset) transitions via inline style — CSS
        can only animate inline style values, not class additions.
        Inner content padding is constant (px-5 md:px-8 lg:px-10) so the
        logo and CTA never shift horizontally between states.
      */}
      <header
        className="fixed inset-x-0 top-0 z-50"
        style={{
          paddingLeft:  detached ? "12px" : "0px",
          paddingRight: detached ? "12px" : "0px",
          paddingTop:   detached ? "8px"  : "0px",
          transition: `padding-left ${DUR} ${EASE}, padding-right ${DUR} ${EASE}, padding-top ${DUR} ${EASE}`,
        }}
      >
        <div
          className="relative w-full"
          style={{
            height:       detached ? "56px" : "64px",
            borderRadius: detached ? "14px" : "0px",
            border:       barBorder,
            background:   "#ffffff",
            boxShadow:    barShadow,
            overflow:     "hidden",
            transition: [
              `height       ${DUR} ${EASE}`,
              `border-radius ${DUR} ${EASE}`,
              `border-color  ${DUR} ${EASE}`,
              `box-shadow    ${DUR} ${EASE}`,
            ].join(", "),
          }}
        >
          {/* Fixed horizontal padding — identical in all states → no jump */}
          <div className="relative flex h-full items-center justify-between gap-4 px-5 md:px-8 lg:px-10">

            {/* Logo */}
            {(() => {
              const akH = 54
              const akW = akH * LOGO_AK_ASPECT
              const sumH = akH
              const sumW = sumH * LOGO_SUM_ASPECT
              const collapseWordmark = !integratedHero
              return (
                <Link
                  href="/"
                  aria-label="Aksum"
                  className="flex shrink-0 items-center"
                  onClick={() => setMobileOpen(false)}
                  style={{ filter: logoFilter }}
                >
                  <Image
                    src="/aksum_left.svg"
                    alt="Aksum"
                    width={886}
                    height={886}
                    style={{
                      height: `${akH}px`,
                      width:  `${akW}px`,
                    }}
                    priority
                  />
                  <div
                    aria-hidden="true"
                    style={{
                      height:     `${sumH}px`,
                      width:      collapseWordmark ? "0px" : `${sumW}px`,
                      marginLeft: collapseWordmark ? "0px" : `${LOGO_GAP}px`,
                      overflow:   "hidden",
                      display:    "flex",
                      alignItems: "center",
                      transition: [
                        `width       ${DUR} ${EASE}`,
                        `margin-left ${DUR} ${EASE}`,
                      ].join(", "),
                    }}
                  >
                    <Image
                      src="/aksum_right.svg"
                      alt=""
                      width={1347}
                      height={886}
                      style={{
                        height:    `${sumH}px`,
                        width:     `${sumW}px`,
                        opacity:   collapseWordmark ? 0 : 1,
                        transform: collapseWordmark
                          ? `translateX(-${Math.round(sumW * 0.35)}px)`
                          : "translateX(0)",
                        transition: [
                          `opacity   ${DUR} ${EASE}`,
                          `transform ${DUR} ${EASE}`,
                        ].join(", "),
                      }}
                    />
                  </div>
                </Link>
              )
            })()}

            {/* Nav — centred absolutely so it never displaces logo or CTA */}
            <nav className="hidden items-center gap-0.5 md:flex lg:absolute lg:left-1/2 lg:-translate-x-1/2">
              {NAV_LINKS.map(({ key, href }) => (
                <Link
                  key={key}
                  href={href}
                  className="rounded-md px-3 py-2 text-sm font-medium tracking-[-0.011em] transition-colors hover:text-[var(--mkt-text)]"
                  style={{ color: "var(--mkt-text-muted)" }}
                >
                  {t.header.nav[key]}
                </Link>
              ))}

              <DropdownMenu>
                <DropdownMenuTrigger
                  className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium tracking-[-0.011em] outline-none transition-colors hover:text-[var(--mkt-text)] data-[state=open]:text-[var(--mkt-text)]"
                  style={{ color: "var(--mkt-text-muted)" }}
                >
                  {t.header.nav.about}
                  <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 [[data-state=open]_&]:rotate-180" />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="center"
                  sideOffset={12}
                  className="w-44 rounded-xl border p-1.5"
                  style={{
                    backgroundColor: "#ffffff",
                    borderColor: "var(--mkt-border-strong)",
                  }}
                >
                  <Link
                    href="/about"
                    className="flex w-full items-center rounded-lg px-3 py-2 text-[13px] tracking-[-0.011em] transition-colors hover:bg-[var(--mkt-band)]"
                    style={{ color: "var(--mkt-text-muted)" }}
                  >
                    {t.header.aboutMenu.ourStory}
                  </Link>
                  <Link
                    href="/contact"
                    className="flex w-full items-center rounded-lg px-3 py-2 text-[13px] tracking-[-0.011em] transition-colors hover:bg-[var(--mkt-band)]"
                    style={{ color: "var(--mkt-text-muted)" }}
                  >
                    {t.header.aboutMenu.contact}
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>

            {/* Right side: language + CTA + hamburger */}
            <div className="flex items-center gap-2 md:gap-3">
              <div className="hidden md:flex">
                <LanguageSwitcher size="compact" variant="light" />
              </div>

              <RequestDemoButton className="hidden px-5 md:inline-flex">
                {t.header.cta}
              </RequestDemoButton>

              <button
                onClick={() => setMobileOpen((v) => !v)}
                className="flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:hidden"
                style={{ color: "var(--mkt-text)" }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = menuHoverBg }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent" }}
                aria-label={mobileOpen ? t.header.mobile.close : t.header.mobile.open}
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col overflow-y-auto md:hidden"
          style={{ backgroundColor: "var(--mkt-bg)", paddingTop: "64px" }}
        >
          {NAV_LINKS.map(({ key, href }) => (
            <Link
              key={key}
              href={href}
              onClick={() => setMobileOpen(false)}
              className="mkt-section-x flex items-center justify-between py-4 text-[15px] font-medium tracking-[-0.011em] transition-colors active:bg-[var(--mkt-band)]"
              style={{
                color: "var(--mkt-text)",
                borderBottom: "1px solid var(--mkt-border)",
              }}
            >
              {t.header.nav[key]}
              <ChevronRight className="h-4 w-4" style={{ color: "var(--mkt-text-muted)" }} />
            </Link>
          ))}

          <MobileSection label={t.header.nav.about}>
            {[
              { label: t.header.aboutMenu.ourStory, href: "/about" },
              { label: t.header.aboutMenu.contact, href: "/contact" },
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="mkt-section-x flex items-center justify-between py-3 text-[14px] tracking-[-0.011em] transition-colors active:bg-[var(--mkt-band)]"
                style={{ color: "var(--mkt-text-muted)" }}
              >
                {label}
                <ChevronRight className="h-3.5 w-3.5" style={{ color: "var(--mkt-text-muted)" }} />
              </Link>
            ))}
          </MobileSection>

          <div
            className="mkt-section-x flex items-center justify-between py-4"
            style={{ borderBottom: "1px solid var(--mkt-border)" }}
          >
            <span
              className="text-[15px] font-medium tracking-[-0.011em]"
              style={{ color: "var(--mkt-text)" }}
            >
              {t.locale.label}
            </span>
            <LanguageSwitcher size="comfortable" variant="light" />
          </div>

          <div className="mkt-section-x py-6">
            <RequestDemoButton fullWidth onClick={() => setMobileOpen(false)}>
              {t.header.cta}
            </RequestDemoButton>
          </div>
        </div>
      )}
    </>
  )
}
