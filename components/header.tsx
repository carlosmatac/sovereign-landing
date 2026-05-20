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

const SCROLL_TRANSITION = [
  `height 520ms cubic-bezier(0.22, 0.8, 0.36, 1)`,
  `border-radius 520ms cubic-bezier(0.22, 0.8, 0.36, 1)`,
  `border-color 520ms cubic-bezier(0.22, 0.8, 0.36, 1)`,
  `background 520ms cubic-bezier(0.22, 0.8, 0.36, 1)`,
  `box-shadow 520ms cubic-bezier(0.22, 0.8, 0.36, 1)`,
].join(", ")

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

/** True while the hero band is still behind the fixed header. */
function useOverHero() {
  const [overHero, setOverHero] = useState(true)

  useEffect(() => {
    const measure = () => {
      const hero = document.getElementById("hero")
      if (!hero) {
        setOverHero(false)
        return
      }
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

const HEADER_EASE = "cubic-bezier(0.22, 0.8, 0.36, 1)"
const HEADER_DURATION = "520ms"

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
        className="flex w-full items-center justify-between px-6 py-4"
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

  const navMuted = integratedHero
    ? "rgba(255,255,255,0.78)"
    : "var(--mkt-text-muted)"
  const navHoverClass = integratedHero
    ? "hover:text-white"
    : "hover:text-[var(--mkt-text)]"
  const iconColor = integratedHero ? "rgba(255,255,255,0.88)" : "var(--mkt-text)"
  const logoFilter = integratedHero ? "none" : "brightness(0) saturate(100%)"
  const menuHoverBg = integratedHero
    ? "rgba(255,255,255,0.12)"
    : "var(--mkt-band)"

  const barBackground = integratedHero
    ? "var(--mkt-hero-band)"
    : detached
      ? "rgba(255,255,255,0.94)"
      : "rgba(255,255,255,0.90)"

  const barBorder = integratedHero
    ? "transparent"
    : detached
      ? "var(--mkt-border-strong)"
      : "var(--mkt-border)"

  const barShadow = integratedHero
    ? "none"
    : detached
      ? "0 4px 24px -4px rgba(26,26,46,0.08), 0 1px 3px rgba(26,26,46,0.04)"
      : "none"

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50${detached ? " px-3 pt-2.5 sm:px-4 lg:px-5 xl:px-6" : ""}`}
        style={{
          transition: `padding ${HEADER_DURATION} ${HEADER_EASE}`,
        }}
      >
        <div
          className="relative w-full"
          style={{
            height: detached ? "56px" : "64px",
            borderRadius: detached ? "14px" : "0px",
            border: integratedHero ? "none" : `1px solid ${barBorder}`,
            background: barBackground,
            boxShadow: barShadow,
            transition: SCROLL_TRANSITION,
          }}
        >
          <div className="relative flex h-full items-center justify-between gap-4 px-5 sm:px-6 md:px-8 lg:px-12">
            {(() => {
              const akH = detached ? 54 : 58
              const sumH = akH
              const akW = akH * LOGO_AK_ASPECT
              const sumW = sumH * LOGO_SUM_ASPECT
              const collapseWordmark = detached || !integratedHero
              return (
                <Link
                  href="/"
                  aria-label="Aksum"
                  className="flex shrink-0 items-center"
                  onClick={() => setMobileOpen(false)}
                  style={{
                    filter: logoFilter,
                    transition: `filter ${HEADER_DURATION} ${HEADER_EASE}`,
                  }}
                >
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
                  <div
                    aria-hidden="true"
                    style={{
                      height: `${sumH}px`,
                      width: collapseWordmark ? "0px" : `${sumW}px`,
                      marginLeft: collapseWordmark ? "0px" : `${LOGO_GAP}px`,
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
                        opacity: collapseWordmark ? 0 : 1,
                        transform: collapseWordmark
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

            <nav className="hidden items-center gap-0.5 md:flex lg:absolute lg:left-1/2 lg:-translate-x-1/2">
              {NAV_LINKS.map(({ key, href }) => (
                <Link
                  key={key}
                  href={href}
                  className={`rounded-md px-3 py-2 text-sm font-medium tracking-[-0.011em] transition-colors ${navHoverClass}`}
                  style={{ color: navMuted, transition: `color ${HEADER_DURATION} ${HEADER_EASE}` }}
                >
                  {t.header.nav[key]}
                </Link>
              ))}

              <DropdownMenu>
                <DropdownMenuTrigger
                  className={`flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium tracking-[-0.011em] outline-none transition-colors ${navHoverClass} ${integratedHero ? "data-[state=open]:text-white" : "data-[state=open]:text-[var(--mkt-text)]"}`}
                  style={{
                    color: navMuted,
                    transition: `color ${HEADER_DURATION} ${HEADER_EASE}`,
                  }}
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

            <div className="flex items-center gap-2 md:gap-3">
              <div className="hidden md:flex">
                <LanguageSwitcher
                  size="compact"
                  variant={integratedHero ? "hero" : "light"}
                />
              </div>

              <RequestDemoButton className="hidden md:inline-flex">
                {t.header.cta}
              </RequestDemoButton>

              <button
                onClick={() => setMobileOpen((v) => !v)}
                className="flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:hidden"
                style={{
                  color: iconColor,
                  transition: `background-color 220ms, color ${HEADER_DURATION} ${HEADER_EASE}`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = menuHoverBg
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent"
                }}
                aria-label={mobileOpen ? t.header.mobile.close : t.header.mobile.open}
              >
                {mobileOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
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
              className="flex items-center justify-between px-6 py-4 text-[15px] font-medium tracking-[-0.011em] transition-colors active:bg-[var(--mkt-band)]"
              style={{
                color: "var(--mkt-text)",
                borderBottom: "1px solid var(--mkt-border)",
              }}
            >
              {t.header.nav[key]}
              <ChevronRight
                className="h-4 w-4"
                style={{ color: "var(--mkt-text-muted)" }}
              />
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
                className="flex items-center justify-between px-6 py-3 text-[14px] tracking-[-0.011em] transition-colors active:bg-[var(--mkt-band)]"
                style={{ color: "var(--mkt-text-muted)" }}
              >
                {label}
                <ChevronRight
                  className="h-3.5 w-3.5"
                  style={{ color: "var(--mkt-text-muted)" }}
                />
              </Link>
            ))}
          </MobileSection>

          <div
            className="flex items-center justify-between px-6 py-4"
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

          <div className="px-6 py-6">
            <RequestDemoButton
              fullWidth
              onClick={() => setMobileOpen(false)}
            >
              {t.header.cta}
            </RequestDemoButton>
          </div>
        </div>
      )}
    </>
  )
}
