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
  return (
    <header
      className="fixed top-0 left-0 z-50 w-full border-b border-white/[0.07] backdrop-blur-2xl"
      style={{ backgroundColor: "rgba(6, 13, 28, 0.82)" }}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Logo — white variant, always on dark background */}
        <Link href="/" className="flex items-center">
          <Image
            src="/sovereign_log_apaisado_blanco.svg"
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
            <DropdownMenuTrigger className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium tracking-[-0.011em] text-white/75 transition-colors hover:text-white">
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
            <DropdownMenuTrigger className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium tracking-[-0.011em] text-white/75 transition-colors hover:text-white">
              About
              <ChevronDown className="h-3.5 w-3.5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-44">
              <DropdownMenuItem>
                <Link href="/about" className="w-full text-sm tracking-[-0.011em]">
                  Our Story
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/contact" className="w-full text-sm tracking-[-0.011em]">
                  Contact
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* CTA Button — white fill on dark background */}
        <Button asChild className="rounded-full bg-white px-6 font-medium tracking-[-0.011em] text-[#070E1F] hover:bg-white/90">
          <Link href="/request-demo">Request Demo</Link>
        </Button>
      </div>
    </header>
  )
}
