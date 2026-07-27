# Closing Brackets

Company site for **Closing Brackets**. Reset to a clean slate — this is a
minimal Next.js scaffold waiting to be built out.

## Tech stack

- **Next.js 16** (App Router) with `output: "export"` → 100% static HTML in `out/`
- **React 19**
- **Tailwind CSS 4** (CSS-first config — see `src/app/globals.css`; there is no
  `tailwind.config.js` in v4)
- **ESLint 10** with flat config (`eslint.config.mjs`)
- **pnpm** package manager · **Node 22 LTS** (pinned in `.nvmrc`)

## Getting started

```bash
corepack enable          # activates the pnpm version pinned in package.json
pnpm install
pnpm dev                 # http://localhost:3000
```

## Scripts

| Script        | What it does                                              |
| ------------- | --------------------------------------------------------- |
| `pnpm dev`    | Dev server with hot reload                                 |
| `pnpm build`  | Static export → `out/`                                     |
| `pnpm lint`   | ESLint                                                     |
| `pnpm serve`  | Serve the built `out/` directory locally                   |

There is no `start` script: `next start` is not supported with
`output: "export"`. Use `pnpm serve` to preview a production build.

## Deployment

Render Blueprint (`render.yaml`) — a static site at `closingbrackets.com`.

```
corepack enable && pnpm install --frozen-lockfile && pnpm build
```

Render publishes `./out`. `--frozen-lockfile` means **`pnpm-lock.yaml` must be
committed alongside any `package.json` change**, or the deploy fails.

The blueprint also carries the 301 redirects from the site's pre-redesign URLs
and the security/cache headers. Note that the redirect destinations
(`/services/`, `/work/`, `/process/`, `/about/`, `/blog/`) don't exist yet in
this scaffold — they'll resolve once those routes are rebuilt.

### Environment variables

Set in the Render dashboard (`sync: false` in the blueprint), and in a local
`.env` for development. Both are build-time inlined (`NEXT_PUBLIC_*`):

- `NEXT_PUBLIC_CLARITY_ID` — Microsoft Clarity analytics (optional)
- `NEXT_PUBLIC_WEB3FORMS_KEY` — Web3Forms access key for lead forms

Neither is referenced by the current scaffold; they're kept for the rebuild.
