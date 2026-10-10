# AGENTS.md

- **Tech Stack:** Svelte 5 (runes `$state`, `$derived`, etc.), SvelteKit, Vite, TypeScript, Tailwind CSS v4, Supabase (`@supabase/supabase-js`, `@supabase/ssr`).
- **Package Manager:** Bun (`bun.lock`).

## Commands
- **Dev Server:** `bun run dev`
- **Build:** `bun run build`
- **Typecheck:** `bun run check` (`svelte-kit sync && svelte-check`)
- **Lint:** `bun run lint` (Prettier + ESLint)
- **Format:** `bun run format`

## Conventions & Gotchas
- Use Svelte 5 runes (`$state`, `$derived`, `$effect`, etc.) for reactivity.
- `$lib` alias maps to `src/lib`.
- Always verify changes with `bun run check` and `bun run lint`.
