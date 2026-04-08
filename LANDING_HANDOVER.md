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
- Do not alter the hero panel layout or its internal structure without explicit instruction — it was implemented from a Figma source and reflects deliberate product design decisions
- Do not replace the live visual components (dashboard panel, intelligence map, card rotator) with placeholders or static images
- Do not add new sections that alter the positioning or introduce messaging not covered in this document without first checking alignment
- Do not treat this document as a technical specification — it is a positioning, communication, and structural guide

---

## 7. Design System

The landing uses a documented design system. Before making any visual changes, read:

**`docs/sovereign-application.md`** — the Brand & Design System reference.

Key principles in force on the landing:

- **Color palette:** All tokens are anchored to the brand 264° navy hue (OKLCH). The foreground, muted surfaces, borders, and primary CTA all carry the characteristic blue-navy tint. Exact token values are in `app/globals.css`.
- **Typography:** Inter (primary UI) + Playfair Display (serif headlines). Negative letter-spacing on large type (`tracking-[-0.025em]` to `tracking-[-0.03em]`). Eyebrow labels at `text-[11px] uppercase tracking-[0.10em]`. Body at `tracking-[-0.011em]`.
- **Logos:** Use `sovereign_log_apaisado_blanco.svg` on dark backgrounds. Use `sovereign_log_apaisado.svg` on light backgrounds. Never apply color-inversion filters — use the correct variant.
- **Icons:** Lucide React. Outline variants only. `h-3.5 w-3.5` inside buttons/labels, `h-4 w-4` standalone.
- **Spacing rhythm:** Premium, generous. Never compress spacing to fit more content.

---

## 8. Current Landing Structure

The landing is a single page (`app/page.tsx`) composed of five sections rendered in order:

```
Header → Hero → TrustBanner → Features → CTAFooter
```

### 8.1 Header (`components/header.tsx`)
Sticky navigation bar, 64px height, transparent over the dark hero and transitions to a blurred light background on scroll.

- **Logo:** `sovereign_log_apaisado.svg` (standard colour variant — note: this may need to be the white variant when overlaid on the dark hero; a future refinement pass should address this)
- **Product dropdown:** Sales Intelligence → `#sales-intelligence`, Strategic Intelligence → `#strategic-intelligence`, Marketing Activation → `#marketing-activation`
- **About dropdown:** Company, Our Team, Careers, Contact (all hash links, placeholder destinations)
- **CTA:** "Request Demo" pill button — white fill on dark hero, primary fill when scrolled

### 8.2 Hero Section (`components/hero.tsx` + `components/hero-dashboard-panel.tsx`)
A centered, cinematic dark composition. No left/right split — everything is centered vertically.

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
A high-fidelity product UI panel implemented from a Figma design (file `jwbGmmoCxxPxlRPLZv16Jd`, node `82:194`). It is the main visual anchor of the hero.

- **Background:** Solid `#070E1F`, nearly uniform — no strong gradient
- **Depth shadow:** Multi-layer `box-shadow` creating a floating panel effect against the dark hero background
- **Left sidebar (22%):** White Sovereign landscape logo (`sovereign_log_apaisado_blanco.svg`), Platform nav section (Dashboard, Projects, Interviews, Copilot, Network Explorer), System nav section (Platform Administration, Settings). Hover states on all nav items.
- **Central panel (78%):** Independent bordered surface (`border border-[rgba(147,147,147,0.2)] rounded-[6px]`). Header: "Projects". Grid: 7 project cards (Nigeria, Algeria, Namibia, Angola, Panama, Oman, Qatar) in 3 equal columns filling the panel height. Cards have title, description, region pill, and location/updated footer. Hover states on all cards and region pills.

### 8.3 Trust Banner (`components/trust-banner.tsx`)
A light-background horizontal strip creating a clear visual break from the dark hero.

- Caption: *"Trusted by information-intensive organisations operating at the frontier of their industries."*
- Placeholder client names: Meridian, Frontier Group, Atlas Consulting, Equinox Media, Horizon Partners
- **These are placeholders.** Replace with real client logos when available.

### 8.4 Features Section (`components/features.tsx`)
Three pillar blocks, each with alternating or full-bleed layouts. Each uses scroll-triggered entrance animations (Framer Motion `whileInView`).

**Pillar 01 — Sales Intelligence** (`id="sales-intelligence"`)
- Layout: text left, media right (standard 2-column)
- Eyebrow: "01 — Sales Intelligence"
- Title: *"Know what's already known."*
- Visual: Lottie animation (`scene1.json`) on the right

**Pillar 02 — Strategic Intelligence** (`id="strategic-intelligence"`)
- Layout: full-bleed — interactive world map fills the left column edge-to-edge; text panel on the right with border-l separator
- Eyebrow: "02 — Strategic Intelligence"
- Title: *"Surface the signals your team is too busy to read."*
- Visual: `WorldIntelligenceMap` component — an interactive SVG map with entity nodes (companies, people, countries, funds) and animated relationship lines. Hover a node to highlight its connections and show a tooltip card.

**Pillar 03 — Marketing Activation** (`id="marketing-activation"`)
- Layout: text left, media right (standard 2-column)
- Eyebrow: "03 — Marketing Activation"
- Title: *"Publish with purpose."*
- Visual: `MarketingActivationShowcase` — a 4-card rotator showing output types: LinkedIn Post, Newsletter Snippet, Sales Outreach, Stakeholder Brief. Auto-rotates every 4 seconds; pauses on hover; manual tabs below. Smooth fade + upward motion transitions.

### 8.5 CTA Footer (`components/cta-footer.tsx`)
Light-background section closing the page.

- Sovereign logomark stamp (25% opacity)
- Headline: *"Ready to put your intelligence to work?"*
- CTA: "Request Demo" pill button
- Minimal footer bar: © 2026 Sovereign Data · Privacy Policy · Terms of Service

---

## 9. Open Items and Next Steps

These are confirmed pending tasks — not speculative suggestions.

### 9.1 Header logo on dark hero
The header currently uses `sovereign_log_apaisado.svg` (the standard colour/dark-text variant). When the header is transparent over the dark hero, this logo may not render correctly depending on SVG fill colours. Evaluate whether `sovereign_log_apaisado_blanco.svg` should be used in the non-scrolled state, or whether a CSS `filter` or conditional `src` is needed.

### 9.2 Hero panel interactivity
The `HeroDashboardPanel` has hover states prepared on nav items, project cards, and region pills, but no click behaviour. Future work should wire up navigation between views (e.g., clicking a project card to reveal a detail panel or project context view).

### 9.3 Trust banner real client logos
The five client names (Meridian, Frontier Group, etc.) are placeholders. When real client logos are confirmed, replace the text spans with `<Image>` elements and adjust the layout accordingly. The caption may also need adjustment.

### 9.4 Feature section media for Sales Intelligence
The Sales Intelligence pillar uses `scene1.json` (a Lottie animation). Confirm whether this is the intended final animation or a placeholder pending a more specific product demo animation.

### 9.5 Hash-link scroll targets
The header Product dropdown links (`#sales-intelligence`, `#strategic-intelligence`, `#marketing-activation`) require `id` attributes on their respective section wrappers. Currently the `FeatureBlock` does not set `id={slide.id}` on its motion wrapper — this means the anchor links may not scroll correctly. Add `id={slide.id}` to the outer `motion.div` in `features.tsx`.

---

## 10. Guidance for Future Agents

If you are a coding or content agent working on this landing page, follow this protocol:

1. **Read this entire document before making any change.** Every section exists for a reason.

2. **Read `docs/sovereign-application.md` before making any visual change.** It governs colour, typography, spacing, icons, and component conventions. Changes that conflict with it will be rejected.

3. **Preserve positioning consistency.** Every copy change must align with the positioning in Sections 2, 3, and 4.

4. **Keep copy concise and premium.** When in doubt, make it shorter. One sharp sentence outperforms three adequate ones.

5. **Do not introduce technical language in primary copy.** No GraphRAG, embeddings, pipelines, or model references in headlines, subheadlines, or feature descriptions.

6. **Do not modify the hero dashboard panel layout, sidebar structure, or card grid** without explicit instruction. It was implemented from a Figma design and any changes must be reconciled with the source.

7. **Do not remove or rewrite sections wholesale** without explicit instruction. Refine and improve; do not reinvent.

8. **Do not tie the copy back to TBY, interviews, or emerging markets** unless a specific task explicitly calls for it.

9. **Use the correct logo variant.** Dark backgrounds → `sovereign_log_apaisado_blanco.svg`. Light backgrounds → `sovereign_log_apaisado.svg`. Never both in the same context. Never filter the wrong one.

10. **When improving copy,** always ask: does this read as something a serious B2B buyer would believe and respect? If it sounds like startup marketing filler, it is wrong.

11. **If something is unclear,** flag it rather than guess. Positioning drift is harder to reverse than a missed deadline.

---

*Last updated: March 2026*
