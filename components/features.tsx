import { Network, TrendingUp, Send } from "lucide-react"
import Image from "next/image"

interface FeatureProps {
  icon: React.ReactNode
  title: string
  description: string
  placeholder: string
  reversed?: boolean
  showLogo?: boolean
}

function Feature({ icon, title, description, placeholder, reversed, showLogo }: FeatureProps) {
  return (
    <div
      className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-16 ${
        reversed ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      {/* Text Side */}
      <div className="flex flex-col">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-muted/50">
          {icon}
        </div>
        <h3 className="mb-3 font-serif text-3xl font-normal tracking-tight text-foreground md:text-4xl">
          {title}
        </h3>
        <p className="text-pretty leading-relaxed text-muted-foreground">
          {description}
        </p>
        {showLogo && (
          <div className="mt-6">
            <Image
              src="/sovereign_logo.svg"
              alt="Sovereign"
              width={40}
              height={40}
              className="opacity-20"
            />
          </div>
        )}
      </div>

      {/* Media Side */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-border bg-muted/30 shadow-md shadow-black/5">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm text-muted-foreground">{placeholder}</span>
        </div>
      </div>
    </div>
  )
}

export function Features() {
  const features: Omit<FeatureProps, "reversed" | "showLogo">[] = [
    {
      icon: <Network className="h-6 w-6 text-foreground" />,
      title: "Sales Intelligence",
      description:
        "Powered by GraphRAG. Cross-project relationship mapping to see who is connected to whom, and with what sentiment. Directly increases deal closure rates.",
      placeholder: "[ GraphRAG Animation Placeholder ]",
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-foreground" />,
      title: "Editorial Strategy",
      description:
        "Data-driven trend detection across all interviews to inform market entry decisions. Multi-modal ingestion ready (PDFs, prep docs).",
      placeholder: "[ Trend Detection Video Placeholder ]",
    },
    {
      icon: <Send className="h-6 w-6 text-foreground" />,
      title: "Push Marketing",
      description:
        "Auto-generated, highly targeted content for LinkedIn, Twitter, and Newsletters from processed interviews. Zero manual effort.",
      placeholder: "[ Auto-generation Animation Placeholder ]",
    },
  ]

  return (
    <section className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-24 md:gap-32">
          {features.map((feature, index) => (
            <Feature 
              key={feature.title} 
              {...feature} 
              reversed={index % 2 !== 0} 
              showLogo={index === 0 || index === 2}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
