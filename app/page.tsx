import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { ProductPillars } from "@/components/product-pillars"
import { IntegrationsBand } from "@/components/integrations-band"
import { KnowledgeGraphSection } from "@/components/knowledge-graph-section"
import { SloganFlow } from "@/components/slogan-flow"
import { FaqSection } from "@/components/faq-section"
import { CTAFooter } from "@/components/cta-footer"

export default function Home() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: "var(--mkt-bg)" }}>
      <Header />
      <Hero />
      <ProductPillars />
      <IntegrationsBand />
      <KnowledgeGraphSection />
      <SloganFlow />
      <FaqSection />
      <CTAFooter />
    </main>
  )
}
