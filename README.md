# Closing Brackets — closingbrackets.com

The company site for **Closing Brackets** (custom software · growth · AI automation,
Spokane WA). The homepage is a **scroll-scrubbed camera flight**: as the visitor
scrolls, a pre-rendered camera dives into a neon night-city district, pulls up over
the skyline, and flies to the next one — six districts, one continuous shot, no cuts.
Scroll position drives `video.currentTime`; the motion itself is AI-rendered ahead of
time (Higgsfield), so the page ships as 100 % static files.

## Tech stack

- **Next.js 16** (App Router) with `output: "export"` → fully static HTML in `out/`
- **React 19** · **Tailwind CSS 4** (CSS-first config in `src/app/globals.css`)
- **scroll-world scrub engine** — vanilla-JS, zero-dependency (`src/app/components/scrub-engine.js`)
- **pnpm** · **Node 22 LTS** (`.nvmrc`) · ESLint 9 flat config
- Asset generation: **Higgsfield CLI** (`gpt_image_2` stills, `seedance_2_0` video) + ffmpeg

## Repository map

```
src/data/world.js                 SINGLE SOURCE OF TRUTH for the scroll world:
                                  brand, per-section copy, asset paths, pacing,
                                  connector lists. The engine config AND the
                                  crawlable SEO block both render from this file,
                                  so visible copy and indexed copy cannot drift.
src/app/page.js                   Homepage. Server-renders the [data-sw-seo] mirror
                                  (h1 + one h2/p per district + real CTA link) —
                                  the ONLY crawlable text; the engine hides it on
                                  mount. Do not remove it.
src/app/components/ScrollWorld.js 'use client' bridge: mounts the engine once into
                                  a container React never re-renders (StrictMode-
                                  guarded). All engine config lives here.
src/app/components/scrub-engine.js The scroll-world plugin engine + our patch
                                  (scrub inertia — see below). Self-contained:
                                  builds its own DOM, injects its own CSS.
src/app/contact/page.js           /contact/ — the site's one CTA target. Web3Forms
                                  client-side POST (works statically), honeypot,
                                  aria-live status.
src/app/globals.css               Ink & Neon design tokens + engine theme hookup
                                  (unlayered --sw-* vars beat the engine's
                                  @layer sw defaults by design).
public/assets/                    Generated artwork: stills, posters (+ -m mobile),
                                  public/assets/vid/ 11 desktop + 11 mobile clips.
                                  ~260 MB, committed on purpose (static host).
scripts/scroll-world/             The full asset pipeline: pipeline.sh + prompts/.
                                  Everything needed to regenerate any scene.
render.yaml                       Render static-site blueprint: domain, headers,
                                  caching, 301 redirects from the pre-2026 site.
```

## The scroll world

**Brand: "Ink & Neon"** — comic-noir night city, one dominant cyan light source.

| token | hex | role |
|---|---|---|
| ink | `#060910` | night sky · page bg · scene bg (must match the stills) |
| panel | `#101827` | building mass |
| rain | `#1B2942` | wet street · borders |
| cyan | `#2EF2DC` | primary neon |
| coral | `#FF4E64` | accent · CTA |
| bone | `#F4F7FF` | primary text |
| slate | `#7C89A6` | secondary text |

**The six districts** (order = flight path): `signal` (hero, h1 owns "custom
software") → `blueprint` (fixed scope) → `forge` (build floor) → `swarm` (AI agents)
→ `engine` (growth) → `launch` (finale + CTA → `/contact/`).

**How the flight works** — architecture B of the scroll-world skill: each district
has an 8 s *dive* clip (camera descends from a high wide shot into the interior) and
consecutive districts are joined by 5 s *connectors* (pull up, fly across the night,
descend toward the next block). Seams are frame-matched: each connector is generated
with `--start-image` = the previous dive's actual last rendered frame and
`--end-image` = the next dive's actual first frame, and the engine dissolves across
the boundary.

**Scrub inertia (our engine patch).** Stock scroll-scrubbing shows a visible jump at
seams under fast scrolling: the crossfade band flies past in ~2 frames and the video
lags mid-seek. The engine here drives *everything* (clip time, seam dissolves, copy,
rail) from a smoothed scroll value that chases the real one — a hard flick becomes a
fast-but-continuous flight through every frame and every crossfade in order. The
chase is time-based (frame-rate independent: heavy 1080p seeking can drop rAF to
~20 fps), settles ~600 ms after input stops, and is bypassed for
`prefers-reduced-motion`. Knobs in `ScrollWorld.js`: `scrubSmooth` (0.12; lower =
floatier) and `crossfade` (0.18; seam dissolve width in viewport-heights).

**Built-in fallbacks** (engine, no config): posters until clips paint, stills-only
mode for reduced-motion / data-saver / iOS Low Power Mode, blob loading (no
byte-range dependency), phone seek-coalescing, `-m.mp4` mobile encodes on
phone-class screens (tablets get the master).

## Regenerating artwork

Everything needed is in `scripts/scroll-world/` — see the header of `pipeline.sh`
for the command sequence and the hard-won rules (model constraints, NSFW-filter
behavior, why numeric SSIM can't gate this art style). The short version:

```bash
WORK=~/scroll-world-work bash scripts/scroll-world/pipeline.sh stills   # anchor-gated
# … approve the anchor, re-run stills, then:
bash … dives && bash … frames && bash … conns && bash … encode && bash … seams
```

Regenerating **one scene** (e.g. after replacing its still): delete that scene's
files in `$WORK` (`dive_<scene>.mp4`, both adjacent `conn_*.mp4`), re-run `dives`,
`frames`, `conns`, `encode` — idempotency skips everything else. **Any dive re-roll
invalidates BOTH adjacent connectors** (their endpoint frames changed): always
regenerate them and re-eyeball the seam sheets.

Prompt discipline: `prompts/preamble.txt` must stay byte-identical across all six
stills (it is the world's cohesion); per-scene content lives in `subj_*.txt`;
`still_*.txt` files are derived (`preamble + subj`) by the script.

## Development

```bash
corepack enable && pnpm install
pnpm dev            # http://localhost:3000
pnpm build          # static export → out/
pnpm serve          # preview the production build
pnpm lint
```

There is no `start` script — `next start` doesn't exist under `output: "export"`.

### Environment variables

Build-time inlined (`NEXT_PUBLIC_*`); set in `.env` locally and in the Render
dashboard (`sync: false` in the blueprint):

- `NEXT_PUBLIC_WEB3FORMS_KEY` — Web3Forms access key for the `/contact/` form
  (public-by-design; it only routes submissions to the inbox)
- `NEXT_PUBLIC_CLARITY_ID` — Microsoft Clarity. Worth keeping on: scroll heatmaps
  are unusually informative on a scroll-driven page.

## Deployment

Render Blueprint (`render.yaml`) — static site on `closingbrackets.com`, publishes
`./out`. `--frozen-lockfile` means `pnpm-lock.yaml` must be committed with any
`package.json` change or the deploy fails.

- `/assets/**` is cached 30 days and deliberately **not** `immutable`: clip
  filenames carry no content hash, and any scene can be re-rendered. If these ever
  need `immutable`, move them under a versioned path instead.
- Repo carries ~260 MB of committed video — intentional (static host, no asset CDN
  pipeline). Clone with `--depth 1` if it bothers you.

### Known gap (follow-up)

`render.yaml` still 301-redirects ~36 legacy URLs to routes that don't exist yet
(`/services/`, `/work/`, `/process/`, `/about/`, `/blog/`). `/contact/` is live;
the rest currently resolve 301 → 404. Either stub those routes or prune the rules.

## Planned work

- **Regenerate "The Growth Engine" district** (scene `engine`) — same Ink & Neon
  comic style, but recompose the block as a city that *resembles an actual engine*
  (piston towers, central turbine rotunda, crankshaft rail spine, gear platforms,
  coral exhaust stacks). Then regenerate `conn4` (swarm→engine) and `conn5`
  (engine→launch; keep the corrected "stay high and far" ending — see pipeline.sh
  header on end-image camera position). All on `seedance_2_0`. Re-encode, re-check
  both seams, confirm fast-scroll smoothness in browser QA.
