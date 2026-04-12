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
- **Atmospheric treatment:** Each section carries two texture overlays: (1) film grain (`SVG feTurbulence`, 3.5% opacity, tiled at 300px) and (2) a fine dot grid (`SVG circle`, ~2.5% opacity). The dot grid spacing varies slightly per section — 24px in Hero and Features, 28px in TrustBanner, 32px in CTAFooter — creating subtle rhythm. Each section also has a per-section radial gradient glow. All three layers combine to produce depth without visual noise.
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

- **Background:** Always `bg-transparent` with `backdrop-blur-2xl` and `rgba(6,13,28,0.82)` fill.
- **Bottom border:** `border-b border-white/[0.07]` — hairline separator, always visible.
- **Logo:** Always `sovereign_log_apaisado_blanco.svg` (white variant).
- **Nav links:** Always `text-white/75 hover:text-white`. No scroll-state variants.
- **CTA:** "Request Demo" — `<Button asChild>` wrapping `<Link href="/request-demo">`. Pill, `bg-white text-[#070E1F]`.
- **Product dropdown:** Sales Intelligence → `#sales-intelligence`, Strategic Intelligence → `#strategic-intelligence`, Marketing Activation → `#marketing-activation`
- **About dropdown (trimmed):** Our Story → `/about`, Contact → `/contact`. Company, Our Team, and Careers were removed.

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

Dark-themed horizontal strip. Background: `#071121`. Borders: `border-y border-white/[0.06]`.

The fake placeholder client names were removed entirely. The section is now a minimal typographic statement block:

- A 8px hairline rule (centered, `rgba(255,255,255,0.12)`)
- A single serif sentence: *"Built for information-intensive teams operating in complex markets."*
- Font: `font-serif text-xl md:text-2xl font-normal`, opacity `0.62`, `max-w-2xl` centered

This acts as a quiet editorial bridge between the Hero and Features sections. It must not be reverted to a logo strip unless real client logos are available.

### 8.4 Features Section (`components/features.tsx`)

Three pillar blocks. All use an **editorial two-column copy layout** above the demo visual. All dark-themed, with grain + dot grid + per-section atmospheric gradient. Section borders: `border-white/[0.08]`.

**Copy layout (all three pillars):**
- Eyebrow on its own row, left-aligned (`mb-8`)
- Below it: a `grid grid-cols-[3fr_2fr] items-end gap-16` row — headline (left, 60%) + description (right, 40%)
- Container: `max-w-5xl px-6 pt-24 pb-14`
- No centering. No icon boxes. Asymmetric, editorial, Linear-inspired.

**Visual layout:**
- Visual placed below copy, either full-width (`visualFullWidth: true`) or in a `visualWrapperClass`-controlled container (`px-6 pb-24 md:pb-32`)

**`Slide` interface fields:**
- `id`, `eyebrow`, `title`, `description`, `showcaseComponent` — core
- `visualFullWidth?: boolean` — full-width visual with hairline rule separator
- `visualWrapperClass?: string` — Tailwind string for inner container; defaults to `mx-auto max-w-5xl`
- `atmoGradient: string` — per-section radial gradient

**Pillar 01 — Sales Intelligence** (`id="sales-intelligence"`)
- Visual container: `mx-auto max-w-5xl`
- Visual: `SalesIntelligenceComposition` (`components/sales-intelligence-panel.tsx`) — a **layered two-panel composition**:
  - **Background panel** (`InterviewDetailBackground`): fictional Manila Energy interview detail view. Positioned `absolute left-0`, `w-[62%]`, `opacity: 0.72`, **no blur of any kind**. `rounded-[17px]`, `border rgba(147,147,147,0.13)`. Shows chrome, header, audio bar, executive summary, topics, transcript excerpt, entities sidebar. Secondary hierarchy is achieved via lower opacity and positional layering — never with `filter: blur()`, `backdrop-blur`, or gradient veils.
  - **Foreground panel** (`SalesIntelligencePanel`): dark Copilot-style chat, `lg:w-[43%]` right-aligned, **fixed height `h-[480px]`** with `overflow-y-auto` conversation area. Shows prior exchange ("Walk me through our South America accounts" → brief Sovereign response), then interactive Manila Energy query. Click send → 2.6s loading → three insight cards (scroll within fixed panel). Pure front-end.
  - Left gradient fades the background panel's exposed left edge into the section bg.
- Atmospheric glow: centered top radial

**Pillar 02 — Strategic Intelligence** (`id="strategic-intelligence"`)
- Visual container: full-width (`visualFullWidth: true`), hairline rule separator above
- Visual: `FloatingEntityScene` — full-width static SVG with 30 entity nodes at 4 depth levels. Hover interactions. No animation.
- Atmospheric glow: centered top radial

**Pillar 03 — Marketing Activation** (`id="marketing-activation"`)
- Visual container: `mx-auto max-w-5xl` (no fixed height — the composition controls its own height)
- Visual: `MarketingActivationComposition` (`components/marketing-activation-showcase.tsx`) — a **two-column composition**:
  - **Left (57%)**: `MarketingActivationShowcase` — dark Sovereign panel with traffic lights, "Sovereign · Output" label, tab strip (LinkedIn / Newsletter / Outreach / Brief), auto-rotating output cards every 4.5s, pauses on hover. Height: `h-[440px]` on mobile, `lg:h-full` on desktop.
  - **Right (flex-1)**: `/public/mountain.png` displayed full-bleed (`object-cover`) with a cinematic scrim (`linear-gradient to top`) and an editorial text block anchored at the bottom: headline *"Deploy authority where others only see uncertainty."* (serif, `text-[18px]`) + supporting paragraph. Height: `h-[300px]` on mobile, `lg:h-auto` on desktop.
- On desktop the two columns share a `lg:h-[520px]` parent. On mobile they stack vertically.
- Atmospheric glow: centered top radial

### 8.5 CTA Footer (`components/cta-footer.tsx`)

Dark-themed closing section. Background: `#060D1C` with grain overlay, dot grid, and double radial gradient.

**Structure (top to bottom):**
1. **`SovereignWordmark` band** — a full-width interactive horizontal band above the bridge image.
   - Contains a subtle aligned mesh grid (`SVG path`, `stroke-opacity: 0.12`) tiled at 24px.
   - The lowercase word **"sovereign"** in Gabarito Bold, `clamp(52px, 9vw, 124px)`, centered.
   - **Desktop (pointer device):** A `motion.div` "frosted veil" sits on top using `backdropFilter: blur(16px)` + `background: rgba(6,13,28,0.60)`. A spring-driven `mask-image` (radial gradient centered on cursor) locally removes the veil where the cursor is, revealing the sharp content beneath — "hidden signal behind glass" effect.
   - **Mobile / touch (`hover: none`):** The veil is skipped entirely; the wordmark is fully visible at `rgba(255,255,255,0.88)`.
   - The band breaks out of section `px-6` via `-mx-6` wrapper.

2. **Bridge hero image** (`/bridge2.png`, `mx-auto max-w-6xl`) — main visual anchor. `rounded-2xl`, multi-layer box shadow. Subtle `whileHover` lift. Overlaid: logomark stamp (22% opacity), headline *"Ready to put your intelligence to work?"*, **"Request Demo" `<Button asChild>` → `<Link href="/request-demo">`**.

3. **`<footer>` bar** (`max-w-5xl mx-auto`): © 2026 Sovereign Data · **Contact → `/contact`** · Privacy Policy · Terms of Service

Top and bottom linear gradient fades blend the bridge image into the dark section bg.

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

### 9.6 ~~Hero panel mobile scaling~~ — RESOLVED
`HeroDashboardPanelMobile` (`components/hero-dashboard-panel.tsx`) is shown on `< lg` breakpoints, hidden on `lg+`. It renders the Interviews view at readable 12–13px font sizes with no aspect ratio constraint — full-width, auto height. The full `HeroDashboardPanel` remains on desktop only.

---

## 11. Mobile Responsiveness

A dedicated mobile pass was completed. Key changes:

- **Hero:** Top padding reduced on mobile (`pt-24 md:pt-36 lg:pt-40`). Dashboard panel conditional: `HeroDashboardPanelMobile` on `< lg`, full panel on `lg+`.
- **Features section padding:** `pt-14 md:pt-20 lg:pt-24` (was flat `pt-24`). Visual bottom padding: `pb-16 md:pb-24 lg:pb-32`.
- **MarketingActivationComposition:** Stacks vertically on mobile (`flex-col lg:flex-row`). Showcase `h-[440px]` mobile / `lg:h-full` desktop. Image panel `h-[300px]` mobile / `lg:h-auto` desktop.
- **CTA Wordmark:** Frosted veil skipped on touch devices (`hover: none` media query). Wordmark visible at full opacity on mobile.
- **Trust Banner, Sales Intelligence, Strategic Intelligence:** Already mobile-safe. No changes required.

---

## 12. Multi-Page Structure

The site now has four routes:

| Route | File | Description |
|-------|------|-------------|
| `/` | `app/page.tsx` | Main landing page |
| `/about` | `app/about/page.tsx` | Our Story editorial page |
| `/request-demo` | `app/request-demo/page.tsx` | Demo request form (two-column) |
| `/contact` | `app/contact/page.tsx` | Minimal contact page |

### 12.1 `/about` — Our Story

Premium editorial page. Uses `<Header />`. Structure:
- **Hero:** `max-w-5xl` two-column layout — large serif headline left, lead paragraph right.
- **Story body:** `max-w-5xl` two-column grid (`lg:grid-cols-2`). Left: 3 narrative paragraphs. Right: crystallisation paragraph (elevated opacity) + mission paragraph.
- **Founders section:** Team intro text above image, `draw-founders.png` with atmospheric CSS mask dissolve, names caption below.
- **Image treatment:** `filter: saturate(0.78) contrast(1.05) brightness(0.91)` + `mask-image` radial gradient (ellipse 90%×76% centered at 50% 36%) fading edges into the dark background.
- No separate footer — just a slim two-link nav row (Back to Sovereign / Request a demo).

### 12.2 `/request-demo` — Demo Request

Full-page two-column form. No `<Header />` (focused conversion page).
- **Left:** Form with `DemoForm` client component. Fields: First/Last name, Work email, Phone (country code selector + number), Company, Role, Problem (textarea), Message (textarea optional). Submit via Next.js Server Action → Resend.
- **Right:** `dessert.png` full-bleed with scrim + editorial statement (*"Ready to shape the future?"*).
- **Country code selector:** Custom dropdown, 80 countries, flag emoji + dial code, search input, click-outside close. State held in `DemoForm` via `useState<Country>`.
- **Server action:** `app/actions/send-demo-request.ts`. Lazy-initialises `Resend` (requires `RESEND_API_KEY` env var). Sends to `team@svgndata.com`, `reply-to` = submitter email. Validates required fields server-side. Returns `FormState { status, message }`.
- **Mobile:** Image stacks below the form at `h-[56vw]`.

### 12.3 `/contact`

Minimal centered page. Sovereign logo, "Get in touch." serif headline, supporting copy, `team@svgndata.com` as a large serif mailto link, secondary "Request a demo" outline button, back link.

### 12.4 Fonts

`app/layout.tsx` loads three Google fonts via `next/font/google`:
- `Inter` → `--font-sans` (body)
- `Playfair_Display` weights 400/700/900 → `--font-serif` (headings)
- `Gabarito` weights 400/700 → `--font-gabarito` (CTA wordmark only)

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

*Last updated: April 2026 — §8.1 header nav trimmed (About: Our Story + Contact only); §8.3 trust banner replaced with editorial statement; §8.4 MarketingActivationComposition added (mountain image + editorial text); §8.5 SovereignWordmark band added + footer Contact link; §9.6 mobile hero panel resolved; §11 mobile responsiveness pass documented; §12 multi-page structure added (/about, /request-demo, /contact, Resend integration, Gabarito font)*
