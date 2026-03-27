"use client"

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
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/sovereign_log_apaisado.svg"
            alt="Sovereign"
            width={200}
            height={52}
            style={{ width: 'auto', height: '52px', maxWidth: '100%' }}
            priority
          />
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Product
              <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-56">
              <DropdownMenuItem>
                <Link href="#sales-intelligence" className="w-full">
                  Sales Intelligence
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="#strategic-intelligence" className="w-full">
                  Strategic Intelligence
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="#marketing-activation" className="w-full">
                  Marketing Activation
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              About
              <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-56">
              <DropdownMenuItem>
                <Link href="#company" className="w-full">
                  Company
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="#team" className="w-full">
                  Our Team
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="#careers" className="w-full">
                  Careers
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="#contact" className="w-full">
                  Contact
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* CTA Button */}
        <Button className="rounded-full px-6 font-medium">
          Request Demo
        </Button>
      </div>
    </header>
  )
}
