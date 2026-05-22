"use client"

import { SiteFooterBar } from "@/components/site-footer-bar"
import { RequestDemoButton } from "@/components/request-demo-button"
import { MktContainer, MktSectionX } from "@/components/marketing-layout"
import { useT } from "@/lib/i18n/locale-context"

export function CTAFooter() {
  const t = useT()

  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: "var(--mkt-bg)" }}
    >
      <MktSectionX className="pb-12 pt-2 md:pb-16">
        <MktContainer
          className="flex flex-col items-center justify-center py-16 text-center md:py-20 lg:py-24"
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
        </MktContainer>
      </MktSectionX>

      <SiteFooterBar />
    </section>
  )
}
