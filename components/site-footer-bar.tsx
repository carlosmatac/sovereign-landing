"use client"

import Image from "next/image"
import Link from "next/link"
import { useT } from "@/lib/i18n/locale-context"

/** Copyright + legal links — same row as the home CTAFooter, without the cinematic CTA band. */
export function SiteFooterBar() {
  const t = useT()
  return (
    <div className="relative px-6">
      <footer className="mx-auto flex max-w-5xl flex-col items-center gap-6 border-t border-white/[0.07] pb-8 pt-7 md:flex-row md:justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/ak.svg"
            alt="Aksum"
            width={24}
            height={24}
            className="opacity-[0.18]"
          />
          <p className="text-sm tracking-[-0.011em] text-white/35">{t.ctaFooter.copyright}</p>
        </div>
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 md:justify-end">
          <Link
            href="/contact"
            className="text-sm tracking-[-0.011em] text-white/35 transition-colors hover:text-white/65"
          >
            {t.ctaFooter.nav.contact}
          </Link>
          <Link
            href="/privacy-policy"
            className="text-sm tracking-[-0.011em] text-white/35 transition-colors hover:text-white/65"
          >
            {t.ctaFooter.nav.privacy}
          </Link>
          <Link
            href="/cookies"
            className="text-sm tracking-[-0.011em] text-white/35 transition-colors hover:text-white/65"
          >
            {t.ctaFooter.nav.cookies}
          </Link>
          <Link
            href="/terms-of-use"
            className="text-sm tracking-[-0.011em] text-white/35 transition-colors hover:text-white/65"
          >
            {t.ctaFooter.nav.terms}
          </Link>
        </nav>
      </footer>
    </div>
  )
}
