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
- Prefer `.astro` components; use a React island (`client:*`) only for real interactivity.
- Assets in `public/sites/<site>/`, research in `docs/research/<site>/`.
- No `any`, named exports, match the source 1:1 before customizing.
