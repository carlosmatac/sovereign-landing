# Patterns

Recurring component and layout conventions used across the landing.  
Follow these exactly to maintain visual consistency. Do not introduce new patterns without updating this file.

---

## Layout

### Page container
```
mx-auto max-w-6xl px-6
```
All sections use this wrapper. Never exceed `max-w-6xl`.

### Section vertical rhythm
```
py-24 md:py-32
```
Standard top/bottom padding for major sections.  
The hero uses `pt-24 pb-20 md:pt-32 md:pb-32`.

### Section horizontal padding
```
px-6
```
Applied on the `<section>` element, not the inner container.

---

## Buttons

### Primary CTA
```
<Button size="lg" className="rounded-full px-8 font-medium">
```
Pill shape (`rounded-full`), `size="lg"`, explicit horizontal padding.

### Secondary / outline CTA
```
<Button size="lg" variant="outline" className="rounded-full px-8 font-medium">
```
Same shape; `variant="outline"` for secondary actions.

### Header CTA (compact)
```
<Button className="rounded-full px-6 font-medium">
```
Slightly smaller padding; used only in the sticky header.

---

## Navigation

### Sticky header
```
sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur
supports-[backdrop-filter]:bg-background/60
```

### Nav item (dropdown trigger)
```
text-sm font-medium text-muted-foreground hover:text-foreground
```

---

## Icon containers

Used in feature pillar headers and similar UI elements:
```
flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-muted/50
```
Icons inside: `h-6 w-6 text-foreground`

---

## Media / demo placeholders

Full placeholder box (features section):
```
relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-border bg-muted/30 shadow-md shadow-black/5
```
Inner label:
```
absolute inset-0 flex items-center justify-center
<span className="text-sm text-muted-foreground">[ ... Placeholder ]</span>
```

Hero video placeholder:
```
relative aspect-video w-full overflow-hidden rounded-xl border border-border bg-muted/30 shadow-lg shadow-black/5
```

**Do not remove or replace placeholder elements.** They are structural narrative assets.  
See `docs/animations.md` for how demo content will be inserted.

---

## Feature layout

Alternating two-column grid (text + media):
```
grid items-center gap-12 lg:grid-cols-2 lg:gap-16
```
Odd-indexed features have text on right: `lg:[&>*:first-child]:order-2`

---

## Logo stamp

Decorative low-opacity logo used as a subtle brand accent:
```
opacity-15   → hero (largest stamp)
opacity-20   → feature section accents
opacity-30   → CTA section
opacity-50   → footer
```
Always use `sovereign_logo.svg` (the mark, not the wordmark) for stamps.

---

## Eyebrow / section label

Used above sections to set context without being a headline:
```
text-sm font-medium uppercase tracking-widest text-muted-foreground
```

---

## Badges (pill labels)

Inline label used near headlines:
```
inline-flex items-center rounded-full border border-border bg-muted/50 px-4 py-1.5 text-sm text-muted-foreground
```

---

## Card / surface backgrounds

| Context | Class |
|---|---|
| Default card | `bg-card` |
| Subtle section bg | `bg-muted/50` |
| Placeholder / empty state | `bg-muted/30` |
| CTA footer background | `bg-muted/50` |

---

## Shadows

| Context | Class |
|---|---|
| Feature media cards | `shadow-md shadow-black/5` |
| Hero video placeholder | `shadow-lg shadow-black/5` |
| Header | none (border only) |

Sovereign uses very soft, nearly invisible shadows. Never use heavy drop shadows.

---

## Typography inside components

| Element | Class |
|---|---|
| Component headline (h3) | `font-serif text-3xl md:text-4xl font-normal tracking-tight` |
| Component description | `text-pretty leading-relaxed text-muted-foreground` |
| Footer legal text | `text-sm text-muted-foreground` |
| Trust banner logos | `text-lg font-medium tracking-tight text-muted-foreground/50` |
