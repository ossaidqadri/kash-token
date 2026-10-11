# kash-token

Rebuild of https://www.kashtoken.com/ (source code lost). Clone workflow: `/clone-website <url>`, see `.agents/skills/clone-website/SKILL.md`.

## Stack
Astro 7 (static by default) + React islands, Tailwind v4, shadcn/ui (Base UI). Bun only.

## Commands
- `bun run typecheck` (tsc, cached) and `bun run check:astro` (astro check)
- `bun run lint` (type-aware strict ESLint, cached, zero warnings)
- `bun run build` only when asked

## Rules
- Our own components go in `src/components/sites/<site>/`, never `src/components/ui/` (shadcn-generated, lint relaxed there, and `shadcn add --overwrite` reverts hand fixes in calendar/input-otp/scroll-area; rerun typecheck after any shadcn update).
- Third-party scripts (analytics, tag managers, chat or ad widgets, pixels) go through Partytown (`@astrojs/partytown`, already enabled in `astro.config.mjs`): add `type="text/partytown"` to the `<script>` so it runs off the main thread. Never load them with a plain script tag or a `client:*` island. If a script needs forwarded globals (e.g. `dataLayer.push`), set `partytown({ config: { forward: [...] } })`.
- Prefer `.astro` components; use a React island (`client:*`) only for real interactivity.
- Assets in `src/assets/<site>/`. Research and reference screenshots live in `docs/` (gitignored, local only).
- No `any`, named exports, match the source 1:1 before customizing.
