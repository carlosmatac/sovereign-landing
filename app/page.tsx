import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { TrustBanner } from "@/components/trust-banner"
import { Features } from "@/components/features"
import { CTAFooter } from "@/components/cta-footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <TrustBanner />
      <Features />
      <CTAFooter />
    </main>
  )
}
