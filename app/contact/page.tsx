import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { RequestDemoButton } from "@/components/request-demo-button"
import { getServerT } from "@/lib/i18n/server"
import { getDictionary } from "@/lib/i18n/config"

export const metadata: Metadata = {
  title: getDictionary("en").contact.metaTitle,
  description: getDictionary("en").contact.metaDescription,
}

export default async function ContactPage() {
  const t = await getServerT()
  const c = t.contact

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--mkt-bg)" }}>
      <Header />

      <div className="relative flex min-h-screen flex-col items-center justify-center px-6 pb-20 pt-28">
        <div className="w-full max-w-lg text-center">
          {/* Logo */}
          <Link href="/" className="mb-14 inline-flex items-center justify-center">
            <Image
              src="/aksum.svg"
              alt="Aksum"
              width={120}
              height={30}
              style={{
                width: "auto",
                height: "30px",
                filter: "brightness(0) saturate(100%)",
                opacity: 0.65,
              }}
            />
          </Link>

          {/* Eyebrow */}
          <p
            className="mb-4 text-[11px] font-medium uppercase tracking-[0.10em]"
            style={{ color: "var(--mkt-text-muted)" }}
          >
            {c.eyebrow}
          </p>

          {/* Heading */}
          <h1
            className="mb-6 font-serif text-4xl font-normal leading-tight tracking-[-0.028em] md:text-5xl"
            style={{ color: "var(--mkt-text)" }}
          >
            {c.headline}
          </h1>

          {/* Divider */}
          <div
            aria-hidden="true"
            className="mx-auto mb-7 h-px w-8"
            style={{ background: "var(--mkt-border-strong)" }}
          />

          {/* Supporting copy */}
          <p
            className="mb-10 text-pretty text-[15px] leading-relaxed tracking-[-0.011em]"
            style={{ color: "var(--mkt-text-muted)" }}
          >
            {c.body}
          </p>

          {/* Email — primary action */}
          <a
            href="mailto:team@aksum.ai"
            className="group inline-flex items-center gap-2 font-serif text-xl tracking-[-0.018em] transition-opacity hover:opacity-60 md:text-2xl"
            style={{ color: "var(--mkt-text)" }}
          >
            team@aksum.ai
          </a>

          {/* Secondary action */}
          <div className="mt-12">
            <RequestDemoButton>{c.requestDemo}</RequestDemoButton>
          </div>

          {/* Back link */}
          <div className="mt-16">
            <Link
              href="/"
              className="text-[12px] tracking-[-0.011em] transition-opacity hover:opacity-60"
              style={{ color: "var(--mkt-text-muted)" }}
            >
              {c.back}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
