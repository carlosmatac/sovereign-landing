"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/sovereign_log_apaisado.svg"
            alt="Sovereign"
            width={200}
            height={52}
            style={{ width: "auto", height: "52px", maxWidth: "100%" }}
            priority
          />
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          <DropdownMenu>
            <DropdownMenuTrigger
              className={`flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium tracking-[-0.011em] transition-colors ${
                scrolled
                  ? "text-muted-foreground hover:text-foreground"
                  : "text-white/80 hover:text-white"
              }`}
            >
              Product
              <ChevronDown className="h-3.5 w-3.5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-56">
              <DropdownMenuItem>
                <Link href="#sales-intelligence" className="w-full text-sm tracking-[-0.011em]">
                  Sales Intelligence
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="#strategic-intelligence" className="w-full text-sm tracking-[-0.011em]">
                  Strategic Intelligence
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="#marketing-activation" className="w-full text-sm tracking-[-0.011em]">
                  Marketing Activation
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger
              className={`flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium tracking-[-0.011em] transition-colors ${
                scrolled
                  ? "text-muted-foreground hover:text-foreground"
                  : "text-white/80 hover:text-white"
              }`}
            >
              About
              <ChevronDown className="h-3.5 w-3.5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-56">
              <DropdownMenuItem>
                <Link href="#company" className="w-full text-sm tracking-[-0.011em]">
                  Company
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="#team" className="w-full text-sm tracking-[-0.011em]">
                  Our Team
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="#careers" className="w-full text-sm tracking-[-0.011em]">
                  Careers
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="#contact" className="w-full text-sm tracking-[-0.011em]">
                  Contact
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* CTA Button */}
        <Button
          className={`rounded-full px-6 font-medium tracking-[-0.011em] transition-colors ${
            scrolled
              ? ""
              : "bg-white text-foreground hover:bg-white/90"
          }`}
        >
          Request Demo
        </Button>
      </div>
    </header>
  )
}
