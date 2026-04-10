# Sovereign — Landing Page Handover

> This document is the single source of truth for any agent or collaborator working on the Sovereign landing page.  
> Read it in full before making any change to copy, structure, layout, or visual design.

---

## 1. What the Landing Is Trying to Communicate

The landing page positions Sovereign as a modern intelligence company — one that helps organisations turn their internal information into commercial leverage: sharper sales conversations, better strategic decisions, and targeted outbound communication.

A visitor should leave the page with a clear, immediate impression:

> "Sovereign makes internal knowledge commercially useful."

The landing feels like the front door of a premium B2B startup — not a product demo site, not a technical explainer, not a niche tool for a specific vertical. It is broad enough to resonate across different client profiles while remaining specific enough to convey genuine capability.

The emotional register is confidence, clarity, and restraint. The product is not oversold. The copy is not breathless. The design does the work.

---

## 2. Brand and Positioning

**Sovereign is an intelligence company.**

It is not a transcription service. It is not an interview platform. It is not an AI middleware tool. It is not a product for one specific client.

Sovereign is positioned at the intersection of three ideas:

- **Information as a strategic asset** — most organisations sit on more intelligence than they use
- **AI as a commercial multiplier** — Sovereign unlocks the latent value in that information
- **Speed and precision** — what would take teams weeks to synthesise, Sovereign surfaces in seconds

The framing feels closer to companies like Palantir, Primer, or Diffbot — serious, outcome-oriented, commercially minded — rather than to chatbot builders or AI SaaS tools.

**The brand is not tied to TBY, to emerging markets, or to interview processing as a category.**  
These are valid contexts that shaped the product, but they do not define the ceiling of the positioning. The landing must remain buildable toward any professional organisation with a knowledge management or intelligence challenge.

---

## 3. Core Value Proposition

The central message the landing revolves around:

> **Turn your internal information into revenue, intelligence, and action.**

Variations of this message to inform copy iterations:

- "Convert fragmented knowledge into commercial advantage."
- "Make what you already know work harder."
- "From internal information to external results."

The implicit promise is not that Sovereign is a smarter search engine or a better chatbot. The promise is that information that currently sits unused or underused — inside documents, conversations, reports, and institutional memory — can be activated for business outcomes.

---

## 4. Communication Principles

**How the landing speaks:**

- **Minimal.** Every sentence earns its place. Nothing is padding.
- **Sharp.** Claims are specific. Outcomes are stated directly.
- **Confident, not boastful.** The product is presented as capable and mature without overselling.
- **Outcome-driven.** Benefits before features. Business results before technical mechanisms.
- **Restrained on AI terminology.** The word "AI" can appear, but it should not be the headline act. Words like "embeddings", "vector databases", "GraphRAG", "LLMs", or "pipelines" should not appear in hero copy or feature descriptions.
- **Not corporate-boring.** No "synergy", no "holistic solutions", no "cutting-edge platform".
- **Not generic AI hype.** No "revolutionary", no "game-changing", no "the future of intelligence".

**The standard to hold copy against:** Would a CFO or a strategy director at a media group or consulting firm read this and immediately understand why it matters to them?

---

## 5. Narrative Pillars

The landing organises Sovereign's capabilities across three areas. These are not rigid product SKUs — they are commercial frames that make Sovereign's value legible to different parts of a client organisation.

### 5.1 Sales Intelligence
Helping commercial teams enter conversations with better context, stronger positioning, and a clearer picture of relationships and priorities. The emphasis is on deal readiness and confidence, not on data processing.

*Framing to avoid:* "relationship mapping", "GraphRAG", "cross-project sentiment analysis"  
*Framing to use:* "know who matters before the meeting", "turn prior knowledge into deal advantage", "context that closes"

### 5.2 Strategic Intelligence
Identifying patterns, themes, and signals across internal information that inform decisions: where to focus, what is emerging, which opportunities are underserved. Relevant to editorial, strategy, and leadership audiences.

*Framing to avoid:* "multi-modal ingestion", "trend detection across interviews", "prep doc processing"  
*Framing to use:* "surface the signals your team is too busy to read", "turn information overload into strategic clarity", "decisions grounded in everything you already know"

### 5.3 Marketing Activation
Turning processed intelligence into targeted outbound content — for sales outreach, newsletters, social platforms, or stakeholder communication. The emphasis is on speed and relevance, not automation for its own sake.

*Framing to avoid:* "auto-generated content", "zero manual effort", "from interviews to LinkedIn posts"  
*Framing to use:* "publish with purpose", "targeted content, at scale", "intelligence that speaks directly to the right people"

---

## 6. What the Landing Should Avoid

**In copy and messaging:**
- Do not lead with technology names (GraphRAG, embeddings, LLMs, vector search, etc.)
- Do not frame Sovereign as a tool built for TBY or built around interview content specifically
- Do not use language that positions Sovereign as a narrow vertical product
- Do not over-explain the product — the landing is not a technical whitepaper
- Do not use generic AI marketing language ("powerful", "intelligent", "revolutionary", "seamless")
- Do not let the headline message be about the technology; it must be about the outcome

**In development and implementation:**
- Do not alter the hero panel shell (outer div, sidebar, central panel wrapper) without explicit instruction
- Do not replace the live visual components (dashboard panel, intelligence map, card rotator) with placeholders or static images
- Do not add new sections that alter the positioning or introduce messaging not covered in this document without first checking alignment
- Do not treat this document as a technical specification — it is a positioning, communication, and structural guide

---

## 7. Design System

The landing uses a documented design system. Before making any visual changes, read:

**`docs/sovereign-application.md`** — the Brand & Design System reference.

Key principles in force on the landing:

- **Color palette:** All tokens are anchored to the brand 264° navy hue (OKLCH). Exact token values are in `app/globals.css`. The `dark` class is applied globally on `<html>` — all CSS variable classes resolve to their dark-mode values across the full page.
- **Page background:** `#060D1C` (deep navy, near-black) is the canonical base color, set explicitly on `<main>` via inline style. Every section builds on this surface. Do not use `bg-background` for section backgrounds — use explicit dark hex values or atmospheric overlays.
- **Atmospheric treatment:** Each section (TrustBanner, Features blocks, CTAFooter) carries a film grain overlay (`SVG feTurbulence`, 3.5% opacity) and a per-section radial gradient glow to create depth variation without breaking visual consistency.
- **Typography:** Inter (primary UI) + Playfair Display (serif headlines). Negative letter-spacing on large type (`tracking-[-0.025em]` to `tracking-[-0.03em]`). Eyebrow labels at `text-[11px] uppercase tracking-[0.10em]`. Body at `tracking-[-0.011em]`.
- **Logos:** Use `sovereign_log_apaisado_blanco.svg` on dark backgrounds. Use `sovereign_log_apaisado.svg` on light backgrounds. Never apply color-inversion filters — use the correct variant. The whole page is now dark, so `sovereign_log_apaisado_blanco.svg` is used throughout.
- **Icons:** Lucide React. Outline variants only. `h-3.5 w-3.5` inside buttons/labels, `h-4 w-4` standalone.
- **Spacing rhythm:** Premium, generous. Never compress spacing to fit more content.

---

## 8. Current Landing Structure

The landing is a single page (`app/page.tsx`) composed of five sections rendered in order:

```
Header → Hero → TrustBanner → Features → CTAFooter
```

### 8.1 Header (`components/header.tsx`)

Fixed navigation bar, 64px height. Always transparent — no scroll-triggered background change.

- **Background:** Always `bg-transparent` with `backdrop-blur-2xl` and `rgba(6,13,28,0.82)` fill. This creates a dark glass surface at all scroll positions.
- **Bottom border:** `border-b border-white/[0.07]` — hairline separator, always visible.
- **Logo:** Always `sovereign_log_apaisado_blanco.svg` (white variant). No conditional src — the page is fully dark.
- **Nav links:** Always `text-white/75 hover:text-white`. No scroll-state variants.
- **CTA:** "Request Demo" — always `bg-white text-[#070E1F] hover:bg-white/90` pill button.
- **Product dropdown:** Sales Intelligence → `#sales-intelligence`, Strategic Intelligence → `#strategic-intelligence`, Marketing Activation → `#marketing-activation`
- **About dropdown:** Company, Our Team, Careers, Contact (hash links, placeholder destinations)

### 8.2 Hero Section (`components/hero.tsx` + `components/hero-dashboard-panel.tsx`)

A centered, cinematic dark composition. Everything is centered vertically.

**Background:**
- Base color: `#060D1C` (deep navy, near-black)
- Subtle radial depth gradient — barely perceptible lighter zone at top-center
- Film grain texture overlay at 3.5% opacity (SVG feTurbulence, tiled at 300px)

**Copy block (centered, `max-w-3xl`):**
- Sovereign logomark stamp (`sovereign_logo.svg`, 20% opacity)
- Badge pill: *"Intelligence for the organisations that move markets"*
- Headline: *"What your organisation knows, finally put to work."* (Playfair Display, 4xl–6xl)
- Subheadline: *"Sovereign transforms internal knowledge into sales advantage, strategic clarity, and targeted communication — at the speed decisions actually need."*
- Two CTAs: **"Request Demo"** (primary — white fill on dark bg) and **"Explore the Platform"** (ghost/outline)

**Dashboard panel (`HeroDashboardPanel`, `max-w-[1100px]`):**

A high-fidelity product UI panel that is the main visual anchor of the hero. It is a multi-view interactive system — see Section 8.2.1 for the full specification.

---

### 8.2.1 Hero Panel System — Full Specification

The hero panel (`components/hero-dashboard-panel.tsx`) is a `"use client"` component. It renders a fixed shell with a left sidebar and a central content area. The central content area swaps between views based on `activeNav` state.

**Panel shell (never modify without explicit instruction):**
- Outer container: `aspectRatio: "880/498"`, `background: "#070E1F"`, `rounded-[17px]`, `border border-[rgba(147,147,147,0.16)]`, multi-layer `boxShadow`
- Left sidebar: `width: "22%"`, `px-5 py-5`, white landscape logo (`sovereign_log_apaisado_blanco.svg`, `opacity-80`), `NavSection` ×2 (Platform + System)
- Central panel: `my-[1%] mr-[1%] flex flex-1 flex-col overflow-hidden rounded-[6px] border border-[rgba(147,147,147,0.2)]`, subtle linear-gradient background

**Active nav state:**
- Managed by `useState("Network Explorer")` in `HeroDashboardPanel`
- `handleNavClick` whitelists routable views — you must add a view's label string here to make it clickable
- Conditional render chain (order matters — default falls through to `NetworkExplorerPanel`):
  ```
  Dashboard → Projects → Interviews → NetworkExplorer (default)
  ```

**Currently implemented views:**

| View | Default | Component | Nav label |
|------|---------|-----------|-----------|
| Network Explorer | ✓ | `NetworkExplorerPanel` | `"Network Explorer"` |
| Dashboard | — | `DashboardPanel` | `"Dashboard"` |
| Projects | — | `ProjectsPanel` | `"Projects"` |
| Interviews | — | `InterviewsPanel` | `"Interviews"` |

Copilot and Platform Administration are listed in the sidebar but are not yet routed (clicking them is inert).

**The four views in detail:**

**Network Explorer (default)**
- Interactive SVG graph (viewBox `0 0 580 320`), 7 nodes, 7 edges
- Controls row: project selector dropdown + 5 entity-type filter pills (Person, Company, Government, Organization, Event) + "Hide isolated" utility
- Node colors by type: Person `#5B9CF6`, Company `#34D399`, Government `#A78BFA`, Organization `#7DD3FC`, Event `#FBBF24`
- Click a node to select it: connected nodes/edges at full opacity, unconnected fade to `0.11` / `0.05`
- Detail card: absolutely positioned `bottom-3 left-3`, shows entity type, name, mention count, description, connections list
- Default selected node: `"manila"` (Manila Energy) — panel feels alive on first load
- Filter pills are interactive: toggling a type hides those nodes/edges; deselects selected node if its type is toggled off

**Dashboard**
- 3 KPI cards: Projects (6), Interviews (6 completed), Entities (34 mapped)
- Bar chart: "Interviews by Project" — horizontal CSS bars, 6 projects, max value 3
- Donut chart: "Topic Distribution" — SVG arcs, 8 topics (energy, infrastructure, industrialization, logistics, gas, policy, risk, banking)
- Pipeline Status card: Completed/Processing/Failed counts
- Hover interactions: KPI cards lift on hover; bar rows brighten label+value+bar; donut slices sync with legend row hover (non-hovered slices dim to `0.18` opacity)

**Projects**
- 3×3 card grid (7 cards, last row has 1 card)
- Cards: project name, region pill, description, location+updated footer
- Projects: Nigeria, Algeria, Namibia, Angola, Panama, Oman, Qatar (all 2026)

**Interviews**
- Vertical list of 6 rows, `flex-1` distribution (equal height rows)
- Each row: indigo-tinted mic icon container, person name (bold), interview title · project (muted), duration with clock icon, "Ready" status (`#4ADE80`)
- Action buttons in header: "View Projects" (ghost) + "Upload Interview" (elevated)
- Interviews: Adrian Santos / María Gutierrez / Luis Ortega / Daniel Okafor / Sofia Benavides / Karim Haddad

---

### 8.2.2 How to Add a New Hero Panel View

Follow this exact pattern. Do not deviate from the token system.

**Step 1 — Define data constants** (outside the component, at module level):
```ts
const myViewData = [ ... ]
```

**Step 2 — Write the view component** (returns a fragment, never a wrapper div):
```tsx
function MyViewPanel() {
  return (
    <>
      {/* Panel header — always this exact structure */}
      <div className="border-b border-[rgba(147,147,147,0.14)] px-4 py-2.5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[10px] font-semibold text-white">View Title</p>
            <p className="mt-[2px] text-[8px] leading-snug text-[#777]">
              One-line description of this view.
            </p>
          </div>
          {/* Optional: action buttons — see InterviewsPanel for pattern */}
        </div>
      </div>

      {/* Content area — must contain at least one flex-1 child to fill height */}
      <div className="flex flex-1 flex-col overflow-hidden ...">
        ...
      </div>
    </>
  )
}
```

**Step 3 — Register in `handleNavClick`:**
```ts
if (label === "My View" || label === "Dashboard" || ...) {
  setActiveNav(label)
}
```

**Step 4 — Add to conditional render chain:**
```tsx
{activeNav === "My View"    ? <MyViewPanel />
  : activeNav === "Dashboard" ? <DashboardPanel />
  : ...
  : <NetworkExplorerPanel />}
```

**Panel-internal design tokens — always use these, never invent new ones:**

| Element | Value |
|---------|-------|
| Panel header border | `border-[rgba(147,147,147,0.14)]` |
| Section dividers | `border-[rgba(147,147,147,0.10)]` |
| Card/surface borders | `border-[rgba(147,147,147,0.15)]` — `border-[rgba(147,147,147,0.22)]` |
| Hover border | `border-[rgba(147,147,147,0.30)]` — `border-[rgba(147,147,147,0.38)]` |
| Hover surface | `bg-white/[0.03]` — `bg-white/[0.06]` |
| Primary text | `text-white` / `text-white/75` |
| Secondary text | `text-[#777]` — `text-[#8a8a8a]` |
| Muted text | `text-[#555]` — `text-[#666]` |
| Very muted / metadata | `text-[#4a5060]` — `text-[#5e6878]` |
| Heading (section title) | `text-[10px] font-semibold text-white` |
| Body (content) | `text-[8px]` — `text-[9.5px]` (never above `10px` in content areas) |
| KPI numbers | `text-[18px] font-bold text-white` |
| Graph canvas bg | `#050C1A` |
| Floating card bg | `#080F1E` — `#0A1428` |
| Icons | Lucide, `strokeWidth={1.5}`, 7–11px |
| Transitions | `duration-150` for color/border, `duration-200` for opacity |
| Active nav item | `bg-white/[0.08]` on the nav item div |

---

### 8.3 Trust Banner (`components/trust-banner.tsx`)

Dark-themed horizontal strip with grain and atmospheric gradient. Background: `#071121`.

- Caption: *"Trusted by information-intensive organisations operating at the frontier of their industries."*
- Placeholder client names: Meridian, Frontier Group, Atlas Consulting, Equinox Media, Horizon Partners
- **These are placeholders.** Replace with real client logos when available.
- Borders: `border-y border-white/[0.06]`. Text: `text-white/35` (caption), `text-white/[0.14]` (names).

### 8.4 Features Section (`components/features.tsx`)

Three pillar blocks. All three use the same **editorial top-copy / bottom-demo layout** — centered copy block at the top, product visual below as the primary focal element. All dark-themed. Each `FeatureBlock` has its own per-section atmospheric gradient and a shared grain overlay on the section wrapper. Section borders: `border-white/[0.08]`.

**Layout system:**
- Copy block: centered, `max-w-[660px]`, `text-center`, generous top padding (`pt-24`). Structure: eyebrow → serif headline → description paragraph.
- Visual: placed below the copy, either full-width (`visualFullWidth: true`) or contained in a `visualWrapperClass`-controlled wrapper (`px-6 pb-24 md:pb-32`).
- No left/right split. No icon boxes in section headers. No 2-column grids.

The `Slide` interface fields:
- `id`, `eyebrow`, `title`, `description`, `showcaseComponent` — core fields
- `visualFullWidth?: boolean` — when true, visual spans full section width with a hairline separator rule above it
- `visualWrapperClass?: string` — Tailwind class string for the inner visual container (controls max-width and height); defaults to `mx-auto max-w-5xl`
- `atmoGradient: string` — per-section radial gradient string

**Pillar 01 — Sales Intelligence** (`id="sales-intelligence"`)
- Layout: centered copy top, visual below in `max-w-3xl` centered container
- Eyebrow: "01 — Sales Intelligence"
- Title: *"Know what's already known."*
- Visual: `SalesIntelligencePanel` (`components/sales-intelligence-panel.tsx`) — dark Copilot-style chat panel. Pre-filled question: *"What do we already know about Manila Energy?"* Click send → 2.6s loading state ("Searching internal context…") → three staggered intelligence insight cards. Pure front-end, no backend.
- Atmospheric glow: centered top radial

**Pillar 02 — Strategic Intelligence** (`id="strategic-intelligence"`)
- Layout: centered copy top, entity field full-width below (`visualFullWidth: true`), separated by a hairline rule
- Eyebrow: "02 — Strategic Intelligence"
- Title: *"Surface the signals your team is too busy to read."*
- Visual: `FloatingEntityScene` (`components/floating-entity-scene.tsx`) — full-width static SVG (`viewBox="0 0 1440 460"`) with 30 entity nodes at 4 depth levels and 25 connection lines. Depth 0 = full card with kind badge; Depth 1 = medium card; Depth 2 = compact card; Depth 3 = ghost text labels (no box). Hover on any entity: connected entities highlight, unrelated entities fade to 10% opacity, active lines brighten. Hovering a depth 2–3 entity removes its blur filter (snaps to crisp). No animation — fully static. Left/right/top/bottom edge fades blend the network seamlessly into the page background.
- Atmospheric glow: centered top-of-section radial

**Pillar 03 — Marketing Activation** (`id="marketing-activation"`)
- Layout: centered copy top, visual below in `max-w-2xl h-[520px]` centered container
- Eyebrow: "03 — Marketing Activation"
- Title: *"Publish with purpose."*
- Visual: `MarketingActivationShowcase` — 4-card rotator (LinkedIn Post, Newsletter Snippet, Sales Outreach, Stakeholder Brief). Auto-rotates every 4 seconds; pauses on hover; manual tabs. The cards use white backgrounds intentionally — they represent output documents rendered against the dark section. The `h-[520px]` on the wrapper provides the explicit height `h-full` inside the showcase requires.
- Atmospheric glow: centered top radial

### 8.5 CTA Footer (`components/cta-footer.tsx`)

Dark-themed closing section. Background: `#060D1C` with grain overlay and double radial gradient (bottom center + soft center warmth).

- Sovereign logomark stamp (`sovereign_logo.svg`, ~13% opacity)
- Headline: *"Ready to put your intelligence to work?"*
- CTA: "Request Demo" — `bg-white text-[#070E1F]` pill button
- Footer bar: `border-white/[0.08]` separator · `text-white/35` · © 2026 Sovereign Data · Privacy Policy · Terms of Service

---

## 9. Open Items and Next Steps

These are confirmed pending tasks — not speculative suggestions.

### 9.1 ~~Header logo on dark hero~~ — RESOLVED
The header now always uses `sovereign_log_apaisado_blanco.svg` and is never in a light state. No CSS filter needed.

### 9.2 Hero panel — Copilot view
The Copilot nav item is listed in the sidebar but clicking it is inert. A future pass should implement a Copilot view (likely a chat/Q&A interface or a document synthesis preview).

### 9.3 Trust banner real client logos
The five client names (Meridian, Frontier Group, etc.) are placeholders. When real client logos are confirmed, replace the text spans with `<Image>` elements and adjust the layout accordingly.

### 9.4 ~~Feature section media for Sales Intelligence~~ — RESOLVED
The Lottie animation (`scene1.json`) has been replaced with `SalesIntelligencePanel` — a fully interactive Copilot-style mini panel. See §8.4 Pillar 01 for the full specification.

### 9.5 ~~Hash-link scroll targets~~ — RESOLVED
`id={slide.id}` is now set on the outer `motion.div` in `features.tsx` for all feature blocks. The anchor links (`#sales-intelligence`, `#strategic-intelligence`, `#marketing-activation`) scroll correctly.

### 9.6 Hero panel mobile scaling
The panel uses a fixed `aspectRatio: "880/498"` and `max-w-[1100px]`. At small screen widths, the panel may be too compressed for the internal typography (7–10px font sizes) to remain readable. A future pass should evaluate whether the panel should be hidden or replaced with a static screenshot below a certain breakpoint.

---

## 10. Guidance for Future Agents

If you are a coding or content agent working on this landing page, follow this protocol:

1. **Read this entire document before making any change.** Every section exists for a reason.

2. **Read `docs/sovereign-application.md` before making any visual change.** It governs colour, typography, spacing, icons, and component conventions. Changes that conflict with it will be rejected.

3. **Preserve positioning consistency.** Every copy change must align with the positioning in Sections 2, 3, and 4.

4. **Keep copy concise and premium.** When in doubt, make it shorter. One sharp sentence outperforms three adequate ones.

5. **Do not introduce technical language in primary copy.** No GraphRAG, embeddings, pipelines, or model references in headlines, subheadlines, or feature descriptions.

6. **The hero panel shell is fixed.** Do not touch the outer container, sidebar, or central panel wrapper. New views go inside the central panel only, following the exact pattern in Section 8.2.2. When adding a new panel view, always: (a) define data outside the component, (b) write a fragment-returning function component, (c) register the label in `handleNavClick`, (d) add a ternary branch before the default `<NetworkExplorerPanel />`.

7. **The page is globally dark.** The `dark` class is on `<html>`. Do not add light-background sections. Do not use `bg-background` for section backgrounds — use explicit hex values with grain and gradient overlays to match the established atmospheric style.

8. **Do not remove or rewrite sections wholesale** without explicit instruction. Refine and improve; do not reinvent.

9. **Do not tie the copy back to TBY, interviews, or emerging markets** unless a specific task explicitly calls for it.

10. **Use the correct logo variant.** Dark backgrounds → `sovereign_log_apaisado_blanco.svg`. Light backgrounds → `sovereign_log_apaisado.svg`. Never both in the same context. Never filter the wrong one. The full page is currently dark — use the white variant everywhere.

11. **When improving copy,** always ask: does this read as something a serious B2B buyer would believe and respect? If it sounds like startup marketing filler, it is wrong.

12. **If something is unclear,** flag it rather than guess. Positioning drift is harder to reverse than a missed deadline.

---

*Last updated: April 2026 — §8.4 updated to reflect SalesIntelligencePanel and FloatingEntityScene; §9.4 resolved*
