import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { IntegrationsBand } from "@/components/integrations-band"
import { Features } from "@/components/features"
import { CTAFooter } from "@/components/cta-footer"

export default function Home() {
  return (
      <main className="min-h-screen" style={{ backgroundColor: "#060D1C" }}>
      <Header />
      <Hero />
      <IntegrationsBand />
      <Features />
      <CTAFooter />
    </main>
  )
}
