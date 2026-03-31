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

## 2. Features — Scroll-reveal entrance

**Component:** `components/features.tsx`  
**Status:** Implemented  
**Library:** `framer-motion` (`whileInView`, `motion`)

### Behaviour
- Each feature block fades and slides up into view as it enters the viewport (`whileInView`)
- `once: true` — animation fires once per page load, not on every scroll pass
- Standard block layout: no sticky, no height hack, normal document flow

---

## 3. Demo Placeholders — Not Implemented

The following sections contain placeholders for demo content that will be inserted manually at a later stage. **Do not replace these with programmatic animations or dummy UI.**

| Location | Component | Status | Asset |
|---|---|---|---|
| Hero — below CTAs | `components/hero.tsx` | **Filled** | `/public/main_showcase.json` — Lottie, autoplay, loop |
| Sales Intelligence | `components/features.tsx` (slide 1) | **Filled** | `/public/scene1.json` — Lottie, 1146×1071 (≈ square), autoplay, loop |
| Strategic Intelligence | `components/features.tsx` (slide 2) | **Filled** | `WorldIntelligenceMap` — interactive SVG node graph, full-bleed left column |
| Marketing Activation | `components/features.tsx` (slide 3) | Placeholder | `[ Marketing Activation Demo Placeholder ]` |

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
| `framer-motion` | latest | Feature block scroll-reveal + map hover animations |
