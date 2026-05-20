"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
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

const SCROLL_DOWN_THRESHOLD = 28
const SCROLL_UP_THRESHOLD = 8

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
  const t = useT()
  const detached = scrolled && !mobileOpen

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50"
        style={{
          paddingTop: detached ? "10px" : "0px",
          paddingLeft: detached ? "12px" : "0px",
          paddingRight: detached ? "12px" : "0px",
          transition: `padding ${HEADER_DURATION} ${HEADER_EASE}`,
        }}
      >
        <div
          className="relative mx-auto"
          style={{
            maxWidth: detached ? "1480px" : "100%",
            height: detached ? "56px" : "64px",
            borderRadius: detached ? "14px" : "0px",
            border: `1px solid ${detached ? "var(--mkt-border-strong)" : "transparent"}`,
            borderBottomColor: detached
              ? "var(--mkt-border-strong)"
              : "var(--mkt-border)",
            background: detached
              ? "rgba(255,255,255,0.92)"
              : "rgba(255,255,255,0.88)",
            boxShadow: detached
              ? "0 4px 24px -4px rgba(26,26,46,0.08), 0 1px 3px rgba(26,26,46,0.04)"
              : "none",
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
          <div className="relative flex h-full items-center justify-between gap-4 px-5 sm:px-6 md:px-8 lg:px-12">
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
                  style={{ filter: "brightness(0) saturate(100%)" }}
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
                <DropdownMenuTrigger className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium tracking-[-0.011em] outline-none transition-colors hover:text-[var(--mkt-text)] data-[state=open]:text-[var(--mkt-text)]"
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

            <div className="flex items-center gap-2 md:gap-3">
              <div className="hidden md:flex">
                <LanguageSwitcher size="compact" variant="light" />
              </div>

              <Button
                asChild
                className="hidden rounded-full px-6 font-medium tracking-[-0.011em] text-white hover:opacity-90 md:inline-flex"
                style={{ backgroundColor: "var(--mkt-accent)" }}
              >
                <Link href="/request-demo">{t.header.cta}</Link>
              </Button>

              <button
                onClick={() => setMobileOpen((v) => !v)}
                className="flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:bg-[var(--mkt-band)] md:hidden"
                aria-label={mobileOpen ? t.header.mobile.close : t.header.mobile.open}
              >
                {mobileOpen ? (
                  <X className="h-5 w-5" style={{ color: "var(--mkt-text)" }} />
                ) : (
                  <Menu className="h-5 w-5" style={{ color: "var(--mkt-text)" }} />
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
            <Link
              href="/request-demo"
              onClick={() => setMobileOpen(false)}
              className="flex w-full items-center justify-center rounded-full py-3.5 text-[15px] font-medium tracking-[-0.011em] text-white transition-opacity active:opacity-85"
              style={{ backgroundColor: "var(--mkt-accent)" }}
            >
              {t.header.cta}
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
