"use client"

import Image from "next/image"
import Link from "next/link"
import { useT } from "@/lib/i18n/locale-context"

export function SiteFooterBar() {
  const t = useT()

  return (
    <div className="relative px-6">
      <footer
        className="mx-auto flex max-w-5xl flex-col items-center gap-6 border-t pb-8 pt-7 md:flex-row md:justify-between"
        style={{ borderColor: "var(--mkt-border)" }}
      >
        <div className="flex items-center gap-3">
          <Image
            src="/ak.svg"
            alt="Aksum"
            width={24}
            height={24}
            className="opacity-30"
            style={{ filter: "brightness(0) saturate(100%)" }}
          />
          <p
            className="text-sm tracking-[-0.011em]"
            style={{ color: "var(--mkt-text-muted)" }}
          >
            {t.ctaFooter.copyright}
          </p>
        </div>
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 md:justify-end">
          {(
            [
              { href: "/contact", label: t.ctaFooter.nav.contact },
              { href: "/privacy-policy", label: t.ctaFooter.nav.privacy },
              { href: "/cookies", label: t.ctaFooter.nav.cookies },
              { href: "/terms-of-use", label: t.ctaFooter.nav.terms },
            ] as const
          ).map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm tracking-[-0.011em] transition-colors hover:text-[var(--mkt-text)]"
              style={{ color: "var(--mkt-text-muted)" }}
            >
              {label}
            </Link>
          ))}
        </nav>
      </footer>
    </div>
  )
}
