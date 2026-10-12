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

## Sitemaps

`npm run build` generates `dist/sitemap-index.xml` and `dist/sitemap-0.xml`.
Submit `https://oxland.in/sitemap-index.xml` in Google Search Console after
deploying the contents of `dist/`. The existing `public/robots.txt` points to it.

`scripts/image-sitemap.mjs` extends Astro's sitemap integration with per-page
image entries. It reads built HTML and follows local component imports to
include images in interactive states, lazy components, and CSS backgrounds.
URLs match each page's canonical link; preview, error, and `noindex` pages are
excluded. Image URLs are deduplicated per page and checked against the build
output. Missing local images are omitted with a build warning. New routes and
referenced images are picked up on the next build. No artificial modification
dates are added. Sitemaps help discovery; Google decides crawling and indexing.

Run the focused sitemap checks with `node --test scripts/image-sitemap.test.mjs`.

## Demo popup and contact delivery

The existing demo popup opens automatically after 10 seconds from the first
arrival in a browser session. Session cookies share the countdown and shown
marker across tabs and page navigation; Web Locks coordinate simultaneous
timers. Manual opening and successful contact submissions also mark it shown.
Automatic opening waits for a visible tab and is suppressed on contact,
preview, and error pages, or when the visitor starts filling a form. Browsers
that restore sessions may retain the marker after restarting. Manual demo
buttons continue to work regardless of the marker.

Both forms post to `/contact-submit.php`, which sends to
`info@oxbowintellect.com` and `manual.control7688@gmail.com`. It uses UTF-8 MIME
headers and a base64 body with CRLF line endings. Deploy `dist/` to a host that
executes PHP and permits email sending with `no-reply@oxbowintellect.com`.
Inbox delivery still requires a real hosted submission test.

Run `node --test scripts/auto-demo.test.mjs` for session/timing checks. With PHP
installed, run `php -n scripts/contact-mail.test.php success` and
`php -n scripts/contact-mail.test.php failure` to check both email-handler paths.
These tests intercept email sending and never deliver messages.

## Notes

- Respects `prefers-reduced-motion` (animations collapse for those users).
- Testimonial names/quotes are placeholders — replace before shipping.
- Lighthouse-friendly: static HTML, GPU transform-only animations, lazy hydration.
