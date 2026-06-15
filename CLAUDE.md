# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # dev server at http://localhost:4321
npm run build      # static output -> dist/
npm run preview    # serve built site
npx shadcn@latest add <name>   # add a shadcn-style ui primitive (writes into src/components/ui)
```
For finding anthing always use codegraph.

There is no test runner, linter, or formatter wired up — don't invent one. After a non-trivial change, run `npm run build` to catch type errors (Astro runs `tsc` as part of the build).

## Architecture

Astro static site that ships **zero JS by default**. React is only loaded for interactive islands via `client:*` directives. Tailwind v3 is configured with `applyBaseStyles: false` — base styles live in `src/styles/globals.css` (shadcn HSL design tokens in `:root`, plus the aurora/grid background and an `orbit` keyframe).

### The island model (important)

| Pattern | When to use |
|---------|-------------|
| Plain `.astro` section | Static markup. Wrap blocks in `<Reveal client:visible>` (a tiny framer-motion island) for fade-up-on-scroll. This is the default. |
| `.tsx` with `client:visible` | The component itself needs JS — charts, marquees, accordions, anything stateful that's below the fold. |
| `.tsx` with `client:load` | Above-the-fold interactivity only (currently just `Navbar` and `Hero`). |

`src/pages/index.astro` is the page composition root — it imports each section in order and is where new sections get inserted.

### Adding a section

1. Create `src/components/sections/<Name>.astro` (or a `.tsx` if it needs JS).
2. Wrap static blocks in `<Reveal client:visible delay={i * 0.1}>` for consistent entrance animation.
3. Import it in `src/pages/index.astro` and place it in the section order.
4. Section data (copy, arrays of items) lives **at the top of the section file** as plain TS arrays. There is no CMS — edit in place.

### Path alias

`@/*` → `src/*` (configured in `tsconfig.json` and `components.json`). Always use `@/components/...`, `@/lib/utils`, etc. — never relative `../../`.

### Brand tokens

Defined in two places that must stay in sync:
- `tailwind.config.mjs` → `brand.*` colors (blue/indigo/purple/lavender/navy/ink), `brand-gradient` bg image, custom shadows (`soft`/`float`/`card`), and keyframes.
- `src/styles/globals.css` → HSL shadcn variables (`--primary`, `--secondary`, etc.) consumed by `ui/` primitives.

Fonts: **Sora** (display, via `font-display`) + **Manrope** (body, default `font-sans`). Loaded from Google Fonts in `Layout.astro`.

### Animation patterns in use

- **Fade-up on scroll**: wrap in `<Reveal>`. Respects `prefers-reduced-motion`.
- **Marquee** (testimonials + logo strip): see `TestimonialsMarquee.tsx`. Uses `animate-marquee-x` / `animate-marquee-x-reverse` keyframes with a `--marquee-duration` CSS var per row. Pattern: duplicate items (`[...items, ...items]`), wrap in `overflow-hidden`, add edge-fade masks (`bg-gradient-to-r from-background`), pause on hover via `group-hover/row:[animation-play-state:paused]`. Reuse this pattern for any horizontally-scrolling strip rather than introducing a new lib.
- **Decorative**: `float`, `dash-flow`, `pulse-soft` keyframes are defined in `tailwind.config.mjs` for the Hero ecosystem and feature visuals.

## Things to know

- Hero/feature mockups are hand-built markup, not real screenshots. The README calls this out — swap for `<img>` when real product shots exist.
- Testimonial names, quotes, and the logo strip are placeholders. Replace before shipping.
- The repo is not a git repo (no `.git`). Don't suggest git operations unless the user initializes one.
