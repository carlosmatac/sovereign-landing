"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { SiteFooterBar } from "@/components/site-footer-bar"
import { useT } from "@/lib/i18n/locale-context"

export function CTAFooter() {
  const t = useT()

  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: "var(--mkt-bg)" }}
    >
      <div
        className="border-t px-6 py-20 md:py-24"
        style={{ borderColor: "var(--mkt-border)" }}
      >
        <div className="mx-auto max-w-2xl text-center">
          <h2
            className="font-serif text-[28px] font-normal tracking-[-0.022em] md:text-[36px] md:leading-[1.15]"
            style={{ color: "var(--mkt-text)" }}
          >
            {t.ctaFooter.headline}
          </h2>
          <div className="mt-8">
            <Button
              asChild
              size="lg"
              className="rounded-full px-9 py-6 text-[15px] font-medium tracking-[-0.011em] text-white hover:opacity-90"
              style={{ backgroundColor: "var(--mkt-accent)" }}
            >
              <Link href="/request-demo">{t.ctaFooter.cta}</Link>
            </Button>
          </div>
        </div>
      </div>

      <SiteFooterBar />
    </section>
  )
}
