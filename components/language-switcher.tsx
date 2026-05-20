"use client"

import { useLocale } from "@/lib/i18n/locale-context"
import type { Locale } from "@/lib/i18n/config"

const OPTIONS: ReadonlyArray<{ code: Locale; label: string; aria: string }> = [
  { code: "en", label: "EN", aria: "Switch to English" },
  { code: "es", label: "ES", aria: "Cambiar a Español" },
]

interface LanguageSwitcherProps {
  size?: "compact" | "comfortable"
  variant?: "light" | "dark" | "hero"
}

export function LanguageSwitcher({
  size = "compact",
  variant = "light",
}: LanguageSwitcherProps) {
  const { locale, setLocale } = useLocale()

  const railHeight = size === "compact" ? "36px" : "40px"
  const chipPadX = size === "compact" ? "11px" : "16px"
  const fontSize = size === "compact" ? "11px" : "12px"

  const isHero = variant === "hero"
  const isLight = variant === "light"

  const railBg = isHero
    ? "rgba(255,255,255,0.12)"
    : isLight
      ? "rgba(26,26,46,0.04)"
      : "rgba(255,255,255,0.04)"
  const railBorder = isHero
    ? "1px solid rgba(255,255,255,0.28)"
    : isLight
      ? "1px solid rgba(26,26,46,0.10)"
      : "1px solid rgba(255,255,255,0.08)"

  return (
    <div
      role="group"
      aria-label="Language"
      className="relative inline-flex items-center"
      style={{
        height: railHeight,
        padding: "2px",
        borderRadius: "999px",
        background: railBg,
        border: railBorder,
        transition: "background 520ms cubic-bezier(0.22,0.8,0.36,1), border-color 520ms cubic-bezier(0.22,0.8,0.36,1)",
      }}
    >
      {OPTIONS.map((opt) => {
        const active = opt.code === locale
        const activeColor = isHero
          ? "#ffffff"
          : isLight
            ? "var(--mkt-text)"
            : "rgba(255,255,255,0.92)"
        const idleColor = isHero
          ? "rgba(255,255,255,0.58)"
          : isLight
            ? "var(--mkt-text-muted)"
            : "rgba(255,255,255,0.45)"
        const hoverColor = isHero
          ? "rgba(255,255,255,0.88)"
          : isLight
            ? "var(--mkt-text)"
            : "rgba(255,255,255,0.75)"
        const activeBg = isHero
          ? "rgba(255,255,255,0.22)"
          : isLight
            ? "#ffffff"
            : "rgba(255,255,255,0.10)"

        return (
          <button
            key={opt.code}
            type="button"
            onClick={() => setLocale(opt.code)}
            aria-label={opt.aria}
            aria-pressed={active}
            className="relative inline-flex items-center justify-center font-medium tracking-[0.04em] outline-none focus-visible:ring-1"
            style={{
              height: "100%",
              padding: `0 ${chipPadX}`,
              borderRadius: "999px",
              fontSize,
              color: active ? activeColor : idleColor,
              background: active ? activeBg : "transparent",
              boxShadow: active && isLight ? "0 1px 2px rgba(26,26,46,0.06)" : "none",
              transition:
                "color 220ms cubic-bezier(0.22,0.8,0.36,1), background 220ms cubic-bezier(0.22,0.8,0.36,1)",
              cursor: active ? "default" : "pointer",
            }}
            onMouseEnter={(e) => {
              if (active) return
              e.currentTarget.style.color = hoverColor
            }}
            onMouseLeave={(e) => {
              if (active) return
              e.currentTarget.style.color = idleColor
            }}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}
