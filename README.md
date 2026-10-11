# kash-token

Rebuild of https://www.kashtoken.com/, the site for KASH, a BEP-20 utility token on Binance Smart Chain. The original source was lost, so this is rebuilt from the live site.

Everything lives in `astro-app/`. The repo root holds only this README.

## Stack

Astro 7 (static output) with React islands, Tailwind CSS v4, shadcn/ui (Base UI), MDX content collection, TanStack Query and zod for the live price widgets, Recharts via the shadcn chart. Bun only, never npm, pnpm or yarn.

## Content

- 22 pages are MDX files in `astro-app/src/content/pages/`.
- `src/pages/index.astro` serves the home page, `src/pages/home/[...slug].astro` the rest. The nav is built from the collection.
- Reusable pieces live in `astro-app/src/components/sites/kashtoken/`.
- `src/components/ui/` is shadcn generated. Don't put our own components there.

## Commands (run from `astro-app/`)

```
bun install
bun run dev
bun run typecheck
bun run check:astro
bun run lint
bun test src/lib
bun run build
bun run deploy
```

TypeScript uses the strictest Astro preset. ESLint is type-aware and strict, zero warnings. Typecheck and lint are cached.

## Deploy

Cloudflare Workers static assets, no adapter. Config is `astro-app/wrangler.jsonc` (assets from `./dist`, 404 page). Manual deploy: `bun run build`, then `bunx wrangler deploy`.

Cloudflare Workers Builds settings:

- Root directory: `astro-app`
- Build command: `bun run build`
- Deploy command: `bunx wrangler deploy`
- Build variable `BUN_VERSION` = `1.4.0` (the lockfile needs bun 1.4+)

## SEO

Sitemap at /sitemap-index.xml, robots.txt, per-page descriptions in MDX frontmatter, JSON-LD in the layout.
