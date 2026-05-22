"use client"

import { ReactLenis } from "lenis/react"
import type { ReactNode } from "react"

// Exponential ease-out — feels natural without being heavy.
// Reaches ~99% at t=0.7, fully settles by t=1.
const ease = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))

interface SmoothScrollProps {
  children: ReactNode
}

/**
 * Wraps the page in Lenis root-scroll with subtle mouse-wheel inertia.
 *
 * - `smoothWheel: true`  — intercepts wheel events and smooths them.
 * - `smoothTouch: false` — touch/trackpad keep their native OS inertia.
 * - `duration: 1.1`      — controlled, premium feel without feeling sluggish.
 * - Uses native window scroll so `position: sticky`, `getBoundingClientRect`,
 *   and all scroll measurements continue to work correctly in every browser.
 */
export function SmoothScroll({ children }: SmoothScrollProps) {
  return (
    <ReactLenis
      root
      options={{
        duration: 1.1,
        easing: ease,
        smoothWheel: true,
        // touchMultiplier: 0 keeps native OS momentum for touch/trackpad
        touchMultiplier: 0,
      }}
    >
      {children}
    </ReactLenis>
  )
}
