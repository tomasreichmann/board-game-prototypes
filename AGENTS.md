# Repository Guidelines

## Project Structure & Module Organization
- `src/main.tsx` boots the Vite app and mounts the router defined in `src/routes.tsx`; individual route elements live under `src/routes`.
- Shared UI primitives sit in `src/components`; experience-specific boards and flows reside in `src/prototypes` with helpers in `src/utils` and `src/hooks`.
- Validation schemas live in `src/schemas`; data-access and service wrappers are in `src/services`.
- Tailwind entry styles are defined in `src/index.css`; global config lives in `tailwind.config.cjs`, `postcss.config.cjs`, and `tsconfig.json`.
- Static assets, icons, and fonts belong in `public`; production bundles compile to `dist/` (leave untracked).

## Build, Test, and Development Commands
- `npm install` syncs dependencies defined in `package.json`.
- `npm run dev` launches the Vite dev server on http://localhost:5173 with hot reload.
- `npm run typecheck` runs the strict TypeScript project check; resolve all warnings before pushing.
- `npm run build` followed by `npm run preview` produces and serves the optimized bundle for local smoke tests.
- `npm run netlify:deploy` builds and deploys via the Netlify CLI (requires active login).

## Coding Style & Naming Conventions
- Write React components in TypeScript using functional components and hooks; share stateful logic with utilities from `src/hooks`.
- Indent with 4 spaces, keep component files PascalCase (e.g., `GameBoard.tsx`) and helpers camelCase (e.g., `calculateMove.ts`).
- Favor Tailwind utility classes and DaisyUI; scope custom CSS to the relevant module when necessary.
- Import via the `@` alias (e.g., `import Button from '@/components/Button'`) instead of deep relative paths; default-export single-component files.

## Testing Guidelines
- No bundled unit harness yet; rely on `npm run typecheck` plus manual QA through `npm run dev`.
- When adding deterministic logic in `src/utils` or `src/services`, add Vitest specs under `src/__tests__` and commit the supporting config.
- Exercise navigation flows end-to-end, including Clerk auth states, before requesting review.

## Commit & Pull Request Guidelines
- Use concise, prefixed commit subjects (e.g., `feat: add move validation`); write in present tense and keep each commit focused.
- PR descriptions must cover scope, testing steps, configuration changes, and include screenshots or clips for UI-facing updates.
- Link PRs to issues or Notion tasks and call out any follow-up work or deployment considerations.

## Security & Configuration Notes
- Store secrets such as Clerk keys and Firebase config only in `.env`; never commit environment files.
- Coordinate updates to `netlify.toml` and routing headers; rebuild locally before deployment but do not commit the `dist/` artifacts.
