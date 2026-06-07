# Oxland — Landing Page

A premium, enterprise-grade marketing site for the Oxland Land Management & Acquisition platform.

**Stack:** Astro · Tailwind CSS (v3) · shadcn-style UI · Framer Motion · React islands · TypeScript

## Getting started

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static output -> dist/
npm run preview    # serve the built site
```

## Architecture

Astro ships zero JS by default; interactivity is opt-in via React **islands**:

| Component | Hydration | Why |
|-----------|-----------|-----|
| `Navbar.tsx` | `client:load` | scroll-aware blur + mobile menu |
| `Hero.tsx` | `client:load` | orbital ecosystem, data-flow lines, floating cards |
| `Analytics.tsx` | `client:visible` | charts animate on scroll-in |
| `Faq.tsx` | `client:visible` | accordion |
| `Reveal.tsx` | `client:visible` | reusable fade-up on scroll, wraps static sections |

Everything else is static `.astro` (no JS shipped).

```
src/
  layouts/Layout.astro        global shell, fonts, aurora + grid background
  pages/index.astro           assembles the page
  styles/globals.css          Tailwind layers, design tokens, orbit keyframe
  lib/utils.ts                cn() helper
  components/
    ui/                       button, card, badge (shadcn-style, you own the code)
    Navbar / Hero / Analytics / Faq / Reveal / Icon
    sections/                 Trust, Workflow, FeatureShowcase, MapIntelligence,
                              AnalyticsSection, Industries, Testimonials,
                              FaqSection, FinalCta, Footer
```

## Brand tokens

Defined in `tailwind.config.mjs` (`brand.*`) and `globals.css` (HSL shadcn vars):
Deep Blue `#2F5BFF` · Indigo `#4F46E5` · Purple `#7C3AED` · Lavender `#A78BFA`.
Fonts: **Sora** (display) + **Manrope** (body) via Google Fonts.

## Customizing

- **Copy / data** lives at the top of each section file as plain arrays — edit there.
- **Colors** → `tailwind.config.mjs` and the `:root` block in `globals.css`.
- **Add a shadcn component** → `npx shadcn@latest add <name>` (config is in `components.json`).
- **Real screenshots** → swap the mock markup in `Hero.tsx` / `FeatureShowcase.astro` for `<img>` of your actual dashboard.

## Notes

- Respects `prefers-reduced-motion` (animations collapse for those users).
- Testimonial names/quotes are placeholders — replace before shipping.
- Lighthouse-friendly: static HTML, GPU transform-only animations, lazy hydration.
