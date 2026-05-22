"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { useLenis } from "lenis/react"
import type Lenis from "lenis"

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // Keep a ref to the latest Lenis instance so the scroll-to-hash callback
  // always uses the current value without needing it in the effect deps array.
  const lenis = useLenis()
  const lenisRef = useRef<Lenis | undefined>(lenis)
  useEffect(() => { lenisRef.current = lenis }, [lenis])

  useEffect(() => {
    if (!window.location.hash) return

    // Give React and Lenis a moment to settle after cross-page navigation
    // before attempting to scroll. 150 ms is enough for Lenis to initialize
    // without being perceptible to the user.
    const t = window.setTimeout(() => {
      const id = window.location.hash.replace(/^#/, "")
      if (!id) return
      const el = document.getElementById(id)
      if (!el) return

      const current = lenisRef.current
      if (current) {
        // sections use scroll-mt-24 (96 px) for the fixed header clearance
        current.scrollTo(el, { offset: -96, duration: 1.2 })
      } else {
        el.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }, 150)

    return () => window.clearTimeout(t)
  }, [pathname])

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.28,
          ease: "easeOut",
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
