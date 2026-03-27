# Colors

All colors are defined as CSS custom properties in `app/globals.css` using the `oklch` color space.  
Tailwind consumes them via `@theme inline` mappings.

## Light mode (default)

| Token | OKLCH | Description | Tailwind utility |
|---|---|---|---|
| `--background` | `oklch(1 0 0)` | Pure white | `bg-background` |
| `--foreground` | `oklch(0.12 0 0)` | Near-black — primary text | `text-foreground` |
| `--muted` | `oklch(0.97 0 0)` | Very light gray — section backgrounds | `bg-muted` |
| `--muted-foreground` | `oklch(0.45 0 0)` | Medium gray — secondary text, captions | `text-muted-foreground` |
| `--border` | `oklch(0.94 0 0)` | Light gray — borders, dividers | `border-border` |
| `--primary` | `oklch(0.12 0 0)` | Near-black — CTA buttons, active elements | `bg-primary` |
| `--primary-foreground` | `oklch(1 0 0)` | White — text on primary buttons | `text-primary-foreground` |
| `--secondary` | `oklch(0.98 0 0)` | Off-white — secondary backgrounds | `bg-secondary` |
| `--accent` | `oklch(0.97 0 0)` | Light gray — hover states, accents | `bg-accent` |
| `--card` | `oklch(1 0 0)` | White — card surfaces | `bg-card` |
| `--input` | `oklch(0.94 0 0)` | Light gray — form input backgrounds | — |
| `--ring` | `oklch(0.12 0 0)` | Near-black — focus rings | — |
| `--destructive` | `oklch(0.577 0.245 27.325)` | Red — errors, destructive actions | `text-destructive` |

## Dark mode

| Token | OKLCH | Description |
|---|---|---|
| `--background` | `oklch(0.145 0 0)` | Very dark near-black |
| `--foreground` | `oklch(0.985 0 0)` | Off-white primary text |
| `--muted` | `oklch(0.269 0 0)` | Dark gray — muted surfaces |
| `--muted-foreground` | `oklch(0.708 0 0)` | Light gray — secondary text |
| `--border` | `oklch(0.269 0 0)` | Dark gray — borders |
| `--primary` | `oklch(0.985 0 0)` | Off-white — CTA buttons |

## Color philosophy

- The palette is **achromatic** — no hues in the core system. Black, white, and grays only.
- This is intentional. The brand conveys premium through restraint, not color.
- Do not introduce brand accent colors without explicit approval.
- Transparency modifiers (e.g. `bg-muted/50`, `opacity-15`) are used extensively to create layering and depth.

## Common transparency patterns in use

| Usage | Class |
|---|---|
| Section background tint | `bg-muted/50` |
| Icon container background | `bg-muted/50` |
| Logo stamp in hero | `opacity-15` |
| Logo stamp in features | `opacity-20` |
| Logo stamp in footer | `opacity-30`, `opacity-50` |
| Media placeholder background | `bg-muted/30` |
| Header background | `bg-background/95` with backdrop blur |
