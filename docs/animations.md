# Animations

Reference for every animated element on the landing page.  
This file should be updated whenever a new animation is added or a placeholder is filled.

---

## 1. Hero — Three.js Particle Canvas

**Component:** `components/hero-canvas.tsx`  
**Status:** Implemented  
**Library:** `three` (plain Three.js, no React wrapper)

### Behaviour
- ~600 points distributed randomly in a shallow 3D volume
- Each particle drifts on a slow sine-wave path — low amplitude, low frequency
- Achromatic: white/very light gray points at ~25–35% opacity; invisible in isolation, felt as texture
- Mouse parallax: camera shifts ±2° as the cursor moves — subtle depth effect
- Fully responsive via `ResizeObserver`
- Cleans up renderer and animation frame on component unmount

### Placement
- `position: absolute; inset: 0; z-index: 0` inside the hero `<section>` (which is `position: relative; overflow: hidden`)
- All hero text content sits on `z-index: 10`, above the canvas

### Demo content note
The particle canvas is a permanent background effect, not a placeholder. It does not conflict with the hero video placeholder, which remains below the CTAs as a separate element.

---

## 2. Features — Pinned Scroll Stack

**Component:** `components/features.tsx`  
**Status:** Implemented  
**Library:** `framer-motion` (`useScroll`, `useTransform`, `motion`)

### Behaviour
- The Features section is a tall container (`height: 300vh`)
- Each of the three feature slides is `position: sticky; top: 0; height: 100vh`
- Z-index increases per slide (1 → 2 → 3), so each incoming slide naturally covers the previous one
- Framer Motion adds:
  - **Outgoing slide:** slight scale-down + opacity fade as the next slide covers it
  - **Incoming slide:** enters from slightly below, eases to 0 translate on scroll progress

### Layout per slide
- Full-viewport two-column grid: left = pillar content, right = demo placeholder
- Demo placeholders are preserved identically — they are narrative assets, not engineering tasks

---

## 3. Demo Placeholders — Not Implemented

The following sections contain placeholders for demo content that will be inserted manually at a later stage. **Do not replace these with programmatic animations or dummy UI.**

| Location | Component | Placeholder label |
|---|---|---|
| Hero — below CTAs | `components/hero.tsx` | `[ Hero Animation / Video Placeholder ]` |
| Sales Intelligence | `components/features.tsx` (slide 1) | `[ Sales Intelligence Demo Placeholder ]` |
| Strategic Intelligence | `components/features.tsx` (slide 2) | `[ Strategic Intelligence Demo Placeholder ]` |
| Marketing Activation | `components/features.tsx` (slide 3) | `[ Marketing Activation Demo Placeholder ]` |

Demo content will arrive as one of: MP4/WebM video files, Lottie JSON animations, or embedded iframe URLs. When provided, insert the content inside the existing placeholder `<div>` without restructuring the surrounding layout.

---

## 4. CSS Transitions (utility-level)

Minor transitions applied via Tailwind utilities — no library required.

| Element | Transition |
|---|---|
| Nav items | `transition-colors` on hover |
| Header | `backdrop-blur` on scroll (CSS only) |
| Hero play button | `transition-colors` on hover |
| Buttons | Tailwind default transition via `Button` component |

---

## Dependencies

| Package | Version | Purpose |
|---|---|---|
| `three` | latest | Hero particle canvas |
| `@types/three` | latest | TypeScript types for Three.js |
| `framer-motion` | latest | Scroll-pinned feature stack |
