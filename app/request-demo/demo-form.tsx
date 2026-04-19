"use client"

import { useActionState, useState, useRef, useEffect } from "react"
import { sendDemoRequest, type FormState } from "@/app/actions/send-demo-request"
import { CheckCircle, ChevronDown, Search } from "lucide-react"
import { useT } from "@/lib/i18n/locale-context"

const INITIAL: FormState = { status: "idle" }

// ─── Country data ──────────────────────────────────────────────────────────────

interface Country {
  code: string  // ISO 3166-1 alpha-2
  name: string
  dial: string  // e.g. "+1"
}

// Convert ISO code → regional indicator emoji flag
function toFlag(code: string) {
  return code
    .toUpperCase()
    .split("")
    .map((c) => String.fromCodePoint(0x1f1e6 + c.charCodeAt(0) - 65))
    .join("")
}

// Sorted: most common first, then alphabetical
const COUNTRIES: Country[] = [
  { code: "US", name: "United States",          dial: "+1"    },
  { code: "GB", name: "United Kingdom",         dial: "+44"   },
  { code: "ES", name: "Spain",                  dial: "+34"   },
  { code: "FR", name: "France",                 dial: "+33"   },
  { code: "DE", name: "Germany",                dial: "+49"   },
  { code: "IT", name: "Italy",                  dial: "+39"   },
  { code: "PT", name: "Portugal",               dial: "+351"  },
  { code: "NL", name: "Netherlands",            dial: "+31"   },
  { code: "BE", name: "Belgium",                dial: "+32"   },
  { code: "CH", name: "Switzerland",            dial: "+41"   },
  { code: "SE", name: "Sweden",                 dial: "+46"   },
  { code: "NO", name: "Norway",                 dial: "+47"   },
  { code: "DK", name: "Denmark",                dial: "+45"   },
  { code: "FI", name: "Finland",                dial: "+358"  },
  { code: "PL", name: "Poland",                 dial: "+48"   },
  { code: "AT", name: "Austria",                dial: "+43"   },
  { code: "IE", name: "Ireland",                dial: "+353"  },
  { code: "CA", name: "Canada",                 dial: "+1"    },
  { code: "AU", name: "Australia",              dial: "+61"   },
  { code: "NZ", name: "New Zealand",            dial: "+64"   },
  { code: "SG", name: "Singapore",              dial: "+65"   },
  { code: "JP", name: "Japan",                  dial: "+81"   },
  { code: "KR", name: "South Korea",            dial: "+82"   },
  { code: "CN", name: "China",                  dial: "+86"   },
  { code: "IN", name: "India",                  dial: "+91"   },
  { code: "AE", name: "United Arab Emirates",   dial: "+971"  },
  { code: "SA", name: "Saudi Arabia",           dial: "+966"  },
  { code: "QA", name: "Qatar",                  dial: "+974"  },
  { code: "KW", name: "Kuwait",                 dial: "+965"  },
  { code: "BH", name: "Bahrain",                dial: "+973"  },
  { code: "OM", name: "Oman",                   dial: "+968"  },
  { code: "TR", name: "Turkey",                 dial: "+90"   },
  { code: "IL", name: "Israel",                 dial: "+972"  },
  { code: "ZA", name: "South Africa",           dial: "+27"   },
  { code: "NG", name: "Nigeria",                dial: "+234"  },
  { code: "GH", name: "Ghana",                  dial: "+233"  },
  { code: "KE", name: "Kenya",                  dial: "+254"  },
  { code: "ET", name: "Ethiopia",               dial: "+251"  },
  { code: "TZ", name: "Tanzania",               dial: "+255"  },
  { code: "UG", name: "Uganda",                 dial: "+256"  },
  { code: "RW", name: "Rwanda",                 dial: "+250"  },
  { code: "SN", name: "Senegal",                dial: "+221"  },
  { code: "CI", name: "Côte d'Ivoire",          dial: "+225"  },
  { code: "CM", name: "Cameroon",               dial: "+237"  },
  { code: "AO", name: "Angola",                 dial: "+244"  },
  { code: "MZ", name: "Mozambique",             dial: "+258"  },
  { code: "ZM", name: "Zambia",                 dial: "+260"  },
  { code: "EG", name: "Egypt",                  dial: "+20"   },
  { code: "MA", name: "Morocco",                dial: "+212"  },
  { code: "DZ", name: "Algeria",                dial: "+213"  },
  { code: "TN", name: "Tunisia",                dial: "+216"  },
  { code: "LY", name: "Libya",                  dial: "+218"  },
  { code: "BR", name: "Brazil",                 dial: "+55"   },
  { code: "MX", name: "Mexico",                 dial: "+52"   },
  { code: "AR", name: "Argentina",              dial: "+54"   },
  { code: "CO", name: "Colombia",               dial: "+57"   },
  { code: "CL", name: "Chile",                  dial: "+56"   },
  { code: "PE", name: "Peru",                   dial: "+51"   },
  { code: "EC", name: "Ecuador",                dial: "+593"  },
  { code: "VE", name: "Venezuela",              dial: "+58"   },
  { code: "BO", name: "Bolivia",                dial: "+591"  },
  { code: "PY", name: "Paraguay",               dial: "+595"  },
  { code: "UY", name: "Uruguay",                dial: "+598"  },
  { code: "PA", name: "Panama",                 dial: "+507"  },
  { code: "CR", name: "Costa Rica",             dial: "+506"  },
  { code: "GT", name: "Guatemala",              dial: "+502"  },
  { code: "HN", name: "Honduras",               dial: "+504"  },
  { code: "DO", name: "Dominican Republic",     dial: "+1"    },
  { code: "RU", name: "Russia",                 dial: "+7"    },
  { code: "UA", name: "Ukraine",                dial: "+380"  },
  { code: "PH", name: "Philippines",            dial: "+63"   },
  { code: "ID", name: "Indonesia",              dial: "+62"   },
  { code: "MY", name: "Malaysia",               dial: "+60"   },
  { code: "TH", name: "Thailand",               dial: "+66"   },
  { code: "VN", name: "Vietnam",                dial: "+84"   },
  { code: "BD", name: "Bangladesh",             dial: "+880"  },
  { code: "PK", name: "Pakistan",               dial: "+92"   },
  { code: "NG", name: "Nigeria",                dial: "+234"  },
  { code: "NA", name: "Namibia",                dial: "+264"  },
  { code: "BW", name: "Botswana",               dial: "+267"  },
  { code: "ZW", name: "Zimbabwe",               dial: "+263"  },
]

// Deduplicate by code (in case of repeats) while preserving order
const UNIQUE_COUNTRIES = COUNTRIES.filter(
  (c, i, arr) => arr.findIndex((x) => x.code === c.code) === i,
)

// ─── Country code selector ─────────────────────────────────────────────────────

function CountryCodeSelect({
  value,
  onChange,
}: {
  value: Country
  onChange: (c: Country) => void
}) {
  const t = useT()
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")
  const containerRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
        setSearch("")
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  // Focus search when dropdown opens
  useEffect(() => {
    if (open) searchRef.current?.focus()
  }, [open])

  const filtered = UNIQUE_COUNTRIES.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.dial.includes(search),
  )

  return (
    <div ref={containerRef} className="relative">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex h-full items-center gap-1.5 rounded-l-[8px] border-y border-l px-3 text-sm transition-colors"
        style={{
          background: "rgba(255,255,255,0.04)",
          borderColor: "rgba(147,147,147,0.18)",
          color: "rgba(255,255,255,0.80)",
          minWidth: 88,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(255,255,255,0.065)"
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(255,255,255,0.04)"
        }}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="text-base leading-none">{toFlag(value.code)}</span>
        <span className="tabular-nums">{value.dial}</span>
        <ChevronDown
          className="shrink-0 transition-transform"
          style={{
            width: 12,
            height: 12,
            opacity: 0.45,
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="absolute left-0 top-full z-50 mt-1 w-72 overflow-hidden rounded-[10px]"
          style={{
            background: "#0C1628",
            border: "1px solid rgba(147,147,147,0.22)",
            boxShadow: "0 16px 48px -8px rgba(0,0,0,0.7), 0 4px 16px -2px rgba(0,0,0,0.5)",
          }}
          role="listbox"
        >
          {/* Search */}
          <div
            className="flex items-center gap-2 px-3 py-2.5"
            style={{ borderBottom: "1px solid rgba(147,147,147,0.12)" }}
          >
            <Search style={{ width: 13, height: 13, color: "rgba(255,255,255,0.25)", flexShrink: 0 }} />
            <input
              ref={searchRef}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t.requestDemo.form.countrySearch}
              className="flex-1 bg-transparent text-[12px] text-white outline-none placeholder-white/25"
            />
          </div>

          {/* List */}
          <div className="max-h-52 overflow-y-auto">
            {filtered.length === 0 ? (
              <p className="px-4 py-3 text-[12px]" style={{ color: "rgba(255,255,255,0.30)" }}>
                {t.requestDemo.form.noResults}
              </p>
            ) : (
              filtered.map((country) => {
                const active = country.code === value.code
                return (
                  <button
                    key={country.code}
                    type="button"
                    role="option"
                    aria-selected={active}
                    onClick={() => {
                      onChange(country)
                      setOpen(false)
                      setSearch("")
                    }}
                    className="flex w-full items-center gap-2.5 px-3 py-2 text-left transition-colors"
                    style={{
                      background: active ? "rgba(255,255,255,0.06)" : undefined,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.05)"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = active
                        ? "rgba(255,255,255,0.06)"
                        : ""
                    }}
                  >
                    <span className="text-base leading-none">{toFlag(country.code)}</span>
                    <span
                      className="flex-1 truncate text-[13px]"
                      style={{ color: "rgba(255,255,255,0.75)" }}
                    >
                      {country.name}
                    </span>
                    <span
                      className="shrink-0 tabular-nums text-[12px]"
                      style={{ color: "rgba(255,255,255,0.35)" }}
                    >
                      {country.dial}
                    </span>
                  </button>
                )
              })
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Shared input / label primitives ──────────────────────────────────────────

function Label({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.08em]"
      style={{ color: "rgba(255,255,255,0.38)" }}
    >
      {children}
    </label>
  )
}

const inputBase =
  "w-full rounded-[8px] px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-colors focus:ring-0"
const inputStyle = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(147,147,147,0.18)",
}
const inputFocus = {
  background: "rgba(255,255,255,0.065)",
  border: "1px solid rgba(147,147,147,0.36)",
}

function Input({
  id, name, type = "text", placeholder, required, autoComplete,
}: {
  id: string; name: string; type?: string; placeholder?: string
  required?: boolean; autoComplete?: string
}) {
  return (
    <input
      id={id} name={name} type={type} placeholder={placeholder}
      required={required} autoComplete={autoComplete}
      className={inputBase}
      style={inputStyle}
      onFocus={(e) => Object.assign(e.currentTarget.style, inputFocus)}
      onBlur={(e)  => Object.assign(e.currentTarget.style, inputStyle)}
    />
  )
}

function Textarea({
  id, name, placeholder, required, rows = 4,
}: {
  id: string; name: string; placeholder?: string; required?: boolean; rows?: number
}) {
  return (
    <textarea
      id={id} name={name} placeholder={placeholder} required={required} rows={rows}
      className={`${inputBase} resize-none`}
      style={inputStyle}
      onFocus={(e) => Object.assign(e.currentTarget.style, inputFocus)}
      onBlur={(e)  => Object.assign(e.currentTarget.style, inputStyle)}
    />
  )
}

// ─── Main form ─────────────────────────────────────────────────────────────────

export function DemoForm() {
  const t = useT()
  const f = t.requestDemo.form
  const [state, formAction, isPending] = useActionState(sendDemoRequest, INITIAL)
  const [dialCountry, setDialCountry] = useState<Country>(UNIQUE_COUNTRIES[0])

  if (state.status === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <CheckCircle
          className="mb-6"
          style={{ width: 40, height: 40, color: "#4ADE80", opacity: 0.9 }}
          strokeWidth={1.5}
        />
        <h2
          className="mb-3 font-serif text-2xl font-normal tracking-[-0.025em]"
          style={{ color: "rgba(255,255,255,0.90)" }}
        >
          {t.requestDemo.success.title}
        </h2>
        <p className="max-w-sm text-[14px] leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
          {t.requestDemo.success.body}
        </p>
      </div>
    )
  }

  return (
    <form action={formAction} noValidate className="space-y-5">
      {/* Name row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="firstName">{f.firstName}</Label>
          <Input id="firstName" name="firstName" autoComplete="given-name" required />
        </div>
        <div>
          <Label htmlFor="lastName">{f.lastName}</Label>
          <Input id="lastName" name="lastName" autoComplete="family-name" required />
        </div>
      </div>

      {/* Work email */}
      <div>
        <Label htmlFor="email">{f.email}</Label>
        <Input
          id="email" name="email" type="email"
          placeholder={f.emailPlaceholder} autoComplete="email" required
        />
      </div>

      {/* Phone number with country code */}
      <div>
        <Label htmlFor="phone">{f.phone}</Label>
        {/* Pass selected dial code as a hidden field so the server action can read it */}
        <input type="hidden" name="dialCode" value={dialCountry.dial} />
        <input type="hidden" name="dialCountry" value={dialCountry.name} />
        <div className="flex">
          <CountryCodeSelect value={dialCountry} onChange={setDialCountry} />
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder={f.phonePlaceholder}
            className="flex-1 rounded-r-[8px] border-y border-r px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-colors focus:ring-0"
            style={{
              background: "rgba(255,255,255,0.04)",
              borderColor: "rgba(147,147,147,0.18)",
            }}
            onFocus={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.065)"
              e.currentTarget.style.borderColor = "rgba(147,147,147,0.36)"
            }}
            onBlur={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.04)"
              e.currentTarget.style.borderColor = "rgba(147,147,147,0.18)"
            }}
          />
        </div>
      </div>

      {/* Company + Role row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="company">{f.company}</Label>
          <Input id="company" name="company" autoComplete="organization" required />
        </div>
        <div>
          <Label htmlFor="role">{f.role}</Label>
          <Input id="role" name="role" autoComplete="organization-title" required />
        </div>
      </div>

      {/* What are you looking to solve */}
      <div>
        <Label htmlFor="problem">{f.problem}</Label>
        <Textarea
          id="problem" name="problem" required rows={4}
          placeholder={f.problemPlaceholder}
        />
      </div>

      {/* Optional message */}
      <div>
        <Label htmlFor="message">{f.message}</Label>
        <Textarea
          id="message" name="message" rows={3}
          placeholder={f.messagePlaceholder}
        />
      </div>

      {/* Error */}
      {state.status === "error" && (
        <p
          className="rounded-[7px] px-4 py-3 text-sm"
          style={{
            background: "rgba(251,113,133,0.08)",
            border: "1px solid rgba(251,113,133,0.22)",
            color: "rgba(251,113,133,0.90)",
          }}
        >
          {state.message}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-full py-3.5 text-sm font-medium tracking-[-0.011em] transition-opacity disabled:opacity-60"
        style={{ background: "#ffffff", color: "#070E1F" }}
      >
        {isPending ? f.sending : f.submit}
      </button>

      <p className="text-center text-[11px]" style={{ color: "rgba(255,255,255,0.22)" }}>
        {f.footnote}
      </p>
    </form>
  )
}
