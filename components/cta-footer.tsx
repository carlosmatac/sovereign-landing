"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export function CTAFooter() {
  return (
    <section className="bg-muted/50 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        {/* CTA Section */}
        <div className="flex flex-col items-center text-center">
          <Image
            src="/sovereign_logo.svg"
            alt="Sovereign"
            width={48}
            height={48}
            className="mb-6 opacity-25"
          />
          <h2 className="mb-8 text-balance font-serif text-4xl font-normal tracking-[-0.03em] text-foreground md:text-5xl">
            Ready to put your intelligence to work?
          </h2>
          <Button size="lg" className="rounded-full px-8 font-medium tracking-[-0.011em]">
            Request Demo
          </Button>
        </div>

        {/* Footer */}
        <footer className="mt-20 flex flex-col items-center gap-6 border-t border-border pt-8 md:flex-row md:justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/sovereign_logo.svg"
              alt="Sovereign"
              width={24}
              height={24}
              className="opacity-40"
            />
            <p className="text-sm tracking-[-0.011em] text-muted-foreground">
              © 2026 Sovereign Data
            </p>
          </div>
          <nav className="flex items-center gap-6">
            <Link
              href="#"
              className="text-sm tracking-[-0.011em] text-muted-foreground transition-colors hover:text-foreground"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-sm tracking-[-0.011em] text-muted-foreground transition-colors hover:text-foreground"
            >
              Terms of Service
            </Link>
          </nav>
        </footer>
      </div>
    </section>
  )
}
