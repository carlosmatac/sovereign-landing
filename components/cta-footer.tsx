"use client"

import { SiteFooterBar } from "@/components/site-footer-bar"
import { RequestDemoButton } from "@/components/request-demo-button"
import { useT } from "@/lib/i18n/locale-context"

export function CTAFooter() {
  const t = useT()

  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: "var(--mkt-bg)" }}
    >
      <div className="px-3 pb-16 pt-4 sm:px-4 md:px-5 md:pb-20 lg:px-6">
        <div
          className="mx-auto flex w-full max-w-[1480px] flex-col items-center justify-center px-6 py-20 text-center sm:px-10 md:py-28 md:px-16 lg:py-32"
          style={{ backgroundColor: "var(--mkt-cta-band)" }}
        >
          <h2
            className="max-w-3xl text-balance font-serif text-[32px] font-normal leading-[1.12] tracking-[-0.022em] sm:text-[40px] md:text-[48px] md:leading-[1.08] lg:text-[52px]"
            style={{ color: "var(--mkt-text)" }}
          >
            {t.ctaFooter.headline}
          </h2>
          <div className="mt-10 md:mt-12">
            <RequestDemoButton>{t.ctaFooter.cta}</RequestDemoButton>
          </div>
        </div>
      </div>

      <SiteFooterBar />
    </section>
  )
}
