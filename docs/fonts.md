# Fonts

## Typefaces in use

| Variable | Family | Source | Classification |
|---|---|---|---|
| `--font-sans` | **Inter** | Google Fonts | Geometric sans-serif |
| `--font-serif` | **Playfair Display** | Google Fonts | High-contrast editorial serif |
| `--font-mono` | **Geist Mono** | Local / system | Monospaced |

## Where each is used

### Inter (`font-sans`)
- Default body font — all UI text, labels, captions, nav items
- Applied globally via `font-sans antialiased` on `<body>`
- Weights in use: 400 (regular), 500 (medium)

### Playfair Display (`font-serif`)
- All primary headlines (`<h1>`, `<h2>`, `<h3>`)
- Applied with `font-serif` Tailwind utility
- Weights loaded: 400 (normal), 700, 900
- Tracking: `tracking-tight` — always use tight tracking with this face

### Geist Mono (`font-mono`)
- Reserved for code snippets, technical labels, or keyboard shortcut callouts
- Not currently used in the landing; available for future technical panels or demo UI

## Tailwind utilities to use

```
font-sans        → Inter
font-serif       → Playfair Display
font-mono        → Geist Mono

tracking-tight   → always pair with Playfair Display headlines
text-balance     → use on headlines to prevent orphaned words
text-pretty      → use on body copy paragraphs
antialiased      → applied globally, do not remove
```

## Scale reference (headlines)

| Context | Class |
|---|---|
| Hero h1 | `text-5xl md:text-6xl lg:text-7xl font-serif font-normal tracking-tight` |
| Section h2 | `text-4xl md:text-5xl font-serif font-normal tracking-tight` |
| Feature h3 | `text-3xl md:text-4xl font-serif font-normal tracking-tight` |
| Body large | `text-lg md:text-xl leading-relaxed` |
| Body default | `leading-relaxed` |
| Caption / label | `text-sm text-muted-foreground` |
| Eyebrow | `text-sm font-medium uppercase tracking-widest text-muted-foreground` |
