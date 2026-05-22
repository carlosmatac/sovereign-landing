"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { MktContainer, MktSectionX } from "@/components/marketing-layout"
import { useT } from "@/lib/i18n/locale-context"

export function FaqSection() {
  const t = useT()

  return (
    <section
      id="faq"
      className="scroll-mt-24 py-14 md:py-20"
      style={{ backgroundColor: "var(--mkt-bg)" }}
    >
      <MktSectionX>
        <MktContainer>
        <p
          className="text-center text-[10px] font-medium uppercase tracking-[0.18em]"
          style={{ color: "var(--mkt-text-muted)" }}
        >
          {t.faq.eyebrow}
        </p>
        <h2
          className="mt-4 text-balance text-center font-serif text-[32px] font-normal tracking-[-0.022em] md:text-[44px] md:leading-[1.12]"
          style={{ color: "var(--mkt-text)" }}
        >
          {t.faq.headline}
        </h2>

        <div className="mkt-container-prose mt-10">
        <Accordion
          type="single"
          collapsible
          className="w-full"
        >
          {t.faq.items.map((item, i) => (
            <AccordionItem
              key={item.question}
              value={`item-${i}`}
              className="border-b"
              style={{ borderColor: "var(--mkt-border-strong)" }}
            >
              <AccordionTrigger
                className="py-6 text-left font-serif text-lg font-normal tracking-[-0.015em] hover:no-underline md:text-xl [&>svg]:text-[var(--mkt-text-muted)]"
                style={{ color: "var(--mkt-text)" }}
              >
                {item.question}
              </AccordionTrigger>
              <AccordionContent
                className="pb-6 text-[15px] leading-relaxed tracking-[-0.008em] md:text-base"
                style={{ color: "var(--mkt-text-muted)" }}
              >
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        </div>
        </MktContainer>
      </MktSectionX>
    </section>
  )
}
