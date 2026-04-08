import Image from "next/image"
import {
  LayoutGrid,
  FolderOpen,
  Activity,
  MessageSquare,
  Network,
  Shield,
  Settings,
  MapPin,
  ChevronLeft,
} from "lucide-react"

// ─── Data ─────────────────────────────────────────────────────────────────────

const platformNav = [
  { icon: LayoutGrid,    label: "Dashboard"        },
  { icon: FolderOpen,    label: "Projects"         },
  { icon: Activity,      label: "Interviews"       },
  { icon: MessageSquare, label: "Copilot"          },
  { icon: Network,       label: "Network Explorer" },
]

const systemNav = [
  { icon: Shield,   label: "Platform Administration" },
  { icon: Settings, label: "Settings"                },
]

const projects = [
  { name: "Nigeria 2026",  region: "West Africa",     location: "Nigeria", updated: "04/04/2026" },
  { name: "Algeria 2026",  region: "North Africa",    location: "Algeria", updated: "07/04/2026" },
  { name: "Namibia 2026",  region: "Southern Africa", location: "Namibia", updated: "04/04/2026" },
  { name: "Angola 2026",   region: "Southern Africa", location: "Angola",  updated: "04/04/2026" },
  { name: "Panama 2026",   region: "Central America", location: "Panama",  updated: "04/04/2026" },
  { name: "Oman 2026",     region: "Middle East",     location: "Oman",    updated: "04/04/2026" },
  { name: "Qatar 2026",    region: "Middle East",     location: "Qatar",   updated: "04/04/2026" },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function NavSection({
  label,
  items,
}: {
  label: string
  items: typeof platformNav
}) {
  return (
    <div className="flex flex-col gap-2">
      {/* Section label — title case, not uppercase, increased visibility */}
      <p className="mb-1 text-[9px] font-medium text-[#8a8a8a]">{label}</p>
      {items.map(({ icon: Icon, label: itemLabel }) => (
        <div
          key={itemLabel}
          className="group flex cursor-pointer items-center gap-2 rounded-[4px] px-1.5 py-[4.5px] transition-colors duration-150 hover:bg-white/[0.06]"
        >
          <Icon
            className="shrink-0 text-white/55 transition-colors duration-150 group-hover:text-white/90"
            style={{ width: "11px", height: "11px" }}
            strokeWidth={1.5}
          />
          <span className="text-[10px] font-medium leading-none text-white/70 transition-colors duration-150 group-hover:text-white/95">
            {itemLabel}
          </span>
        </div>
      ))}
    </div>
  )
}

function ProjectCard({
  name,
  region,
  location,
  updated,
}: {
  name: string
  region: string
  location: string
  updated: string
}) {
  return (
    <div className="group flex cursor-pointer flex-col justify-between rounded-[5px] border border-[rgba(147,147,147,0.18)] px-3.5 py-3 transition-all duration-150 hover:border-[rgba(147,147,147,0.36)] hover:bg-white/[0.03]">
      {/* Title + region pill */}
      <div>
        <div className="mb-2 flex items-start justify-between gap-2">
          <p className="text-[10px] font-semibold leading-tight text-white">
            {name}
          </p>
          <span className="shrink-0 cursor-default rounded-full bg-[rgba(147,147,147,0.18)] px-1.5 py-[2.5px] text-[8px] font-medium leading-none text-white/65 transition-colors duration-150 hover:bg-[rgba(147,147,147,0.30)] whitespace-nowrap">
            {region}
          </span>
        </div>
        {/* Description — increased visibility from #636363 to #888 */}
        <p className="text-[9px] leading-[1.5] text-[#888888]">
          Compilation of relevant business data
        </p>
      </div>

      {/* Location + updated — also increased visibility */}
      <div className="mt-3 flex items-center gap-1">
        <MapPin
          className="shrink-0 text-[#707070]"
          style={{ width: "7.5px", height: "7.5px" }}
        />
        <p className="text-[8.5px] text-[#787878]">
          {location}
          <span className="ml-2.5">Updated {updated}</span>
        </p>
      </div>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export function HeroDashboardPanel() {
  return (
    <div
      className="flex w-full overflow-hidden rounded-[17px] border border-[rgba(147,147,147,0.16)]"
      style={{
        aspectRatio: "880 / 498",
        background: "#070E1F",
        // Depth shadow — separates the panel from the dark background elegantly
        boxShadow: [
          "0 0 0 1px rgba(255,255,255,0.05)",
          "0 32px 80px -12px rgba(0,0,0,0.85)",
          "0 8px 32px -4px rgba(0,0,0,0.55)",
        ].join(", "),
      }}
    >
      {/* ── Left sidebar ──────────────────────────────────────────────── */}
      <div
        className="flex shrink-0 flex-col gap-6 px-5 py-5"
        style={{ width: "22%" }}
      >
        {/* Logo — white variant for dark background, no opacity reduction needed */}
        <div className="flex items-center justify-between">
          <Image
            src="/sovereign_log_apaisado_blanco.svg"
            alt="Sovereign"
            width={79}
            height={20}
            className="opacity-80"
            style={{ maxWidth: "78%", height: "auto" }}
          />
          <ChevronLeft
            className="shrink-0 cursor-pointer text-white/25 transition-colors duration-150 hover:text-white/50"
            style={{ width: "13px", height: "13px" }}
          />
        </div>

        <NavSection label="Platform" items={platformNav} />
        <NavSection label="System" items={systemNav} />
      </div>

      {/* ── Central panel — independent bordered surface ───────────────── */}
      {/*
        Figma node 79:13: 685×475px rectangle with its own border and background.
        Reduced margins (was my-[2.3%] mr-[2%]) to bring the panel surface closer
        to the outer frame edges, matching the compact Figma proportions.
      */}
      <div
        className="my-[1%] mr-[1%] flex flex-1 flex-col overflow-hidden rounded-[6px] border border-[rgba(147,147,147,0.2)]"
        style={{
          // Nearly uniform — barely-there gradient, left-side shimmer reduced to near-zero
          background: "linear-gradient(135deg, rgba(255,255,255,0.012) 0%, #070E1F 28%)",
        }}
      >
        {/* Panel header */}
        <div className="border-b border-[rgba(147,147,147,0.14)] px-4 py-2.5">
          <p className="text-[10px] font-semibold text-white">Projects</p>
        </div>

        {/* Cards grid — grid-rows-3 distributes cards evenly to fill panel height */}
        <div className="grid flex-1 grid-cols-3 grid-rows-3 gap-2.5 overflow-hidden p-3">
          {projects.map((p) => (
            <ProjectCard key={p.name} {...p} />
          ))}
        </div>
      </div>
    </div>
  )
}
