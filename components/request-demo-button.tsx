"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const REQUEST_DEMO_BUTTON_CLASS =
  "h-11 rounded-md px-7 text-[14px] font-medium tracking-[-0.011em] text-white hover:opacity-90"

interface RequestDemoButtonProps {
  children: React.ReactNode
  className?: string
  fullWidth?: boolean
  onClick?: () => void
}

export function RequestDemoButton({
  children,
  className,
  fullWidth,
  onClick,
}: RequestDemoButtonProps) {
  return (
    <Button
      asChild
      className={cn(
        REQUEST_DEMO_BUTTON_CLASS,
        fullWidth && "flex w-full items-center justify-center",
        className,
      )}
      style={{ backgroundColor: "var(--mkt-text)" }}
    >
      <Link href="/request-demo" onClick={onClick}>
        {children}
      </Link>
    </Button>
  )
}
