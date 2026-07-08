# Closing Brackets — Agency Website

Marketing + portfolio site for **Closing Brackets**, an AI-native web agency
(Custom Software · Digital Marketing & Growth · AI Consulting & Automation).

Built as a **fully static** Next.js site — fast, SEO-friendly, and cheap to host.
The "Void & Signal" design system layers pure-CSS aurora gradients with lazy,
gated 3D scenes, so every page still holds Lighthouse ≥ 95 on mobile.

## Tech stack

- **Next.js 15** (App Router) with `output: "export"` → 100% static HTML in `out/`
- **React 19**
- **Tailwind CSS 3** over semantic CSS variables (dark-only today; a light theme
  is a `[data-theme="light"]` re-declaration away)
- **Cursor-reactive particle swarm** (`SwarmField.js`) on every hero — a
  hand-rolled 2D canvas where motes drift lazily and flock toward the pointer;
  runs on all devices, no WebGL
- **three.js + @react-three/fiber** for the agent-swarm scene, dynamically
  imported behind `VisibilityGate` (desktop + WebGL + in-view + idle +
  motion-safe), so mobile and reduced-motion users never download the 3D chunk
- Scroll reveals are a ~30-line IntersectionObserver component (`Reveal.js`)
- **pnpm** package manager · **Node 22 LTS**
- Optional **Microsoft Clarity** analytics (env-gated)

## Getting started

```bash
corepack enable          # activates pnpm from package.json "packageManager"
pnpm install
pnpm dev                 # http://localhost:3000
```

Other scripts:

```bash
pnpm build         # production build → static export in ./out
pnpm serve         # serve the built ./out locally to preview the static site
pnpm lint          # ESLint (next/core-web-vitals)
pnpm images        # pre-optimize rasters from public/img/src/ → WebP/AVIF
pnpm brand-assets  # regenerate og-image.png + favicons from the bracket mark
```

## Site map

| Route | Purpose |
|---|---|
| `/` | Home — hero, pillars, trust fold, showcases, process, FAQ, CTA |
| `/services/` | Pillar overview + engagement models |
| `/services/custom-software/`, `/services/digital-marketing/`, `/services/ai-automation/` | Per-pillar detail (Service JSON-LD) |
| `/work/` | Capability demos, honestly framed (no fake case studies) |
| `/process/` | Four steps + differentiators + guarantees + comparison |
| `/about/` | Mission, founder note, values, team model |
| `/blog/` + `/blog/<slug>/` | Real essays only (Article JSON-LD) |
| `/contact/` | Conversion page — full lead form + direct contact |

Old template URLs (`/solution`, `/patent`, `/story`, …) 301-redirect via the
`routes:` block in `render.yaml`.

## Project structure

```
src/
├── app/
│   ├── layout.js              # fonts (Space Grotesk + Inter), metadata, JSON-LD, analytics
│   ├── page.js                # home
│   ├── sitemap.js             # → static sitemap.xml
│   ├── robots.js              # → static robots.txt
│   ├── not-found.js           # App-Router 404 → out/404.html
│   ├── <route>/page.js        # one folder per page
│   └── components/
│       ├── BracketMark.js     # THE brand device (logo mark + eyebrow tick)
│       ├── SectionHeading.js  # standard section opener (eyebrow/title/lead)
│       ├── HeroVisual.js      # CSS aurora + grid + lazy ParticleField canvas
│       ├── Reveal.js          # IntersectionObserver scroll reveal (CLS-free)
│       ├── ContactForm.js     # Web3Forms lead form (full + mini variants)
│       ├── CTASection.js      # THE pre-footer conversion band (one per page)
│       ├── JsonLd.js          # Organization, WebSite, Breadcrumb, FAQ, Service, Article
│       └── …                  # Header, Footer, PageHero, FAQSection, cards
└── data/                      # ⭐ single sources of truth — edit content here
    ├── site.js                # business info + service pillars (+ per-pillar SEO)
    ├── process.js             # the four steps
    ├── engagements.js         # the three engagement models
    ├── differentiators.js     # differentiators, guarantees, chips, comparison
    ├── showcases.js           # capability demos (replace with real case studies)
    ├── posts.js               # blog essays (full bodies live here)
    └── faqs.js                # FAQ content (also feeds FAQ rich results)
```

## Editing content

Everything user-facing is data-driven — start in `src/data/`. Copy that used to
repeat across pages (process, engagement models, "senior team / own the code")
now lives in exactly one data file each; edit once, updates everywhere.

Add social profile URLs in `site.js` (`social.*`) — placeholders (`"#"`) render
nothing in the footer and are excluded from JSON-LD until set.

## Branding & assets ("Void & Signal")

- **Device:** the curly brace `{ }` — drawn only by `BracketMark.js` /
  `public/img/logo.svg`; eyebrow labels sit inside a `{ … }` pair (`BracePair`).
- **Colors** (CSS variables in `globals.css`, mapped in `tailwind.config.js`):
  void `#060714`, violet `#8B7CFF` (accents), signal amber `#FFB74A`
  (**CTAs only** — nothing else is warm).
- **Fonts:** Space Grotesk (display) + Inter (body), self-hosted via `next/font`.
- **Social share image:** `public/img/og-image.png` (1200×630). **Favicons:**
  regenerate all of it with `pnpm brand-assets`.

## Forms (Web3Forms)

The contact page and CTA-band mini form POST to Web3Forms from the static page
(free tier: 250 submissions/mo, honeypot spam protection). Set the key —
build-time, since the site is static:

```bash
# .env.local
NEXT_PUBLIC_WEB3FORMS_KEY=xxxxxxxx-xxxx-...   # free at web3forms.com
```

Without a key, forms gracefully fall back to a prefilled `mailto:` so no lead
is lost. On submit errors, the form shows direct email + phone.

## SEO

- Per-page titles/descriptions/canonicals via the Next Metadata API.
- JSON-LD: `ProfessionalService` (with Spokane `PostalAddress`), `WebSite`,
  `BreadcrumbList`, `FAQPage`, `Service` (per service page), `Article` (per post).
- `sitemap.xml`, `robots.txt`, a real `404.html`, and `llms.txt` (AEO) at build.
- 301 redirects from all pre-redesign URLs in `render.yaml`.

## Analytics (optional)

Microsoft Clarity is off unless you provide an ID. Set `NEXT_PUBLIC_CLARITY_ID`
(build-time) — locally in `.env.local`, on Render as an env var.

## Deployment (Render)

`render.yaml` is a Render Blueprint for a **static site**:

- Build: `corepack enable && pnpm install --frozen-lockfile && pnpm build`
- Publish directory: `./out`
- Pinned to **Node 22**, PR previews enabled
- Security + long-cache headers and the 301 redirect map preconfigured
- Env vars (set in the dashboard): `NEXT_PUBLIC_WEB3FORMS_KEY`, optional
  `NEXT_PUBLIC_CLARITY_ID`

Push to your connected repo (or use "New → Blueprint" in Render) and it deploys.
Point the `www.closingbrackets.com` DNS at the Render static site and keep the
same domain as `site.url` in `src/data/site.js`.

## Performance notes

- Verified locally with Lighthouse (mobile, throttled): **99 / 100 / 100 / 100**
  on every audited page, CLS 0.
- No three.js, no animation libraries — first-load JS is ~102–110 kB per page.
- The particle canvas mounts only in-view, on idle, and never under
  `prefers-reduced-motion`. The critical render path stays HTML/CSS-only.
