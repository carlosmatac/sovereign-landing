"use client"

import { useLocale } from "@/lib/i18n/locale-context"
import type { Locale } from "@/lib/i18n/config"

// ─── Language switcher ────────────────────────────────────────────────────────
// A compact two-segment pill (EN | ES) sitting next to the header CTA.
// Visually it mirrors the panel-system tone:
//
//   • outer rail   — 1px hairline border on a faint white surface
//   • active chip  — slightly raised, more saturated text, soft inner highlight
//   • idle chip    — low-contrast text that lifts on hover
//
// No dropdown, no flags, no glassmorphism. Two languages → segmented control
// reads instantly, takes one click, and stays out of the way of the CTA.

const OPTIONS: ReadonlyArray<{ code: Locale; label: string; aria: string }> = [
  { code: "en", label: "EN", aria: "Switch to English" },
  { code: "es", label: "ES", aria: "Cambiar a Español" },
]

interface LanguageSwitcherProps {
  /**
   * `compact` → header-bar density (default, sits next to the CTA).
   * `comfortable` → mobile drawer density (fills the row, easier to tap).
   */
  size?: "compact" | "comfortable"
}

export function LanguageSwitcher({ size = "compact" }: LanguageSwitcherProps) {
  const { locale, setLocale } = useLocale()

  // Heights are deliberate: the compact variant sits 36px tall, matching the
  // header's primary CTA button (`h-9` = 36px) for a perfectly aligned right
  // edge of the bar. The comfortable variant is 40px for thumb-friendly
  // tapping inside the mobile drawer.
  const railHeight = size === "compact" ? "36px" : "40px"
  const chipPadX = size === "compact" ? "11px" : "16px"
  const fontSize = size === "compact" ? "11px" : "12px"

  return (
    <div
      role="group"
      aria-label="Language"
      className="relative inline-flex items-center"
      style={{
        height: railHeight,
        padding: "2px",
        borderRadius: "999px",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.015)",
      }}
    >
      {OPTIONS.map((opt) => {
        const active = opt.code === locale
        return (
          <button
            key={opt.code}
            type="button"
            onClick={() => setLocale(opt.code)}
            aria-label={opt.aria}
            aria-pressed={active}
            className="relative inline-flex items-center justify-center font-medium tracking-[0.04em] outline-none focus-visible:ring-1 focus-visible:ring-white/30"
            style={{
              height: "100%",
              padding: `0 ${chipPadX}`,
              borderRadius: "999px",
              fontSize,
              color: active ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.45)",
              background: active
                ? "rgba(255,255,255,0.10)"
                : "transparent",
              boxShadow: active
                ? "inset 0 0 0 1px rgba(255,255,255,0.07), 0 1px 0 rgba(255,255,255,0.04)"
                : "none",
              transition:
                "color 220ms cubic-bezier(0.22,0.8,0.36,1), background 220ms cubic-bezier(0.22,0.8,0.36,1), box-shadow 220ms cubic-bezier(0.22,0.8,0.36,1)",
              cursor: active ? "default" : "pointer",
            }}
            // Subtle hover lift for the inactive chip, achieved with inline
            // handlers so we don't pull a CSS module just for two pseudo states.
            onMouseEnter={(e) => {
              if (active) return
              e.currentTarget.style.color = "rgba(255,255,255,0.75)"
            }}
            onMouseLeave={(e) => {
              if (active) return
              e.currentTarget.style.color = "rgba(255,255,255,0.45)"
            }}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}
