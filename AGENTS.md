# AGENTS.md

This file is the operating contract for AI agents working in this repository.

## Mission

Build and maintain a long-lived personal portfolio and personal IP system for Echo Chen.

This is not a generic developer portfolio. The site should feel curated, authored, and distinct across pages:

- `Home` should establish voice and identity.
- `Writing` should feel editorial and reflective.
- `Photos` should feel visual and atmospheric.
- `Videos` should feel cinematic and story-driven.
- `Projects` / `Game Dev` should feel experimental and process-aware.
- `Lab` / `Now` / `Roadmap` should feel alive and actively evolving.

Agents must preserve that differentiation while keeping the codebase maintainable.

## Priority Order

When tradeoffs appear, use this order:

1. Preserve personal voice and page identity.
2. Keep information architecture understandable.
3. Prefer durable structure over fast one-off patches.
4. Reduce coupling between content, page composition, and shared systems.
5. Keep UI polish, but do not chase polish at the cost of maintainability.

## Stable Repo Entry Points

Top-level files have strict roles:

- `README.md`: quick start, setup, content workflow, and where to look next.
- `PROJECT.md`: product intent, architecture map, page strategy, and maintenance direction.
- `AGENTS.md`: instructions for AI collaborators.

Do not add new top-level `.md` files unless they are clearly permanent and repository-wide.
Put all other docs under `docs/`.

## Documentation Policy

Use these locations consistently:

- `docs/`: active operational docs
- `docs/archive/`: historical reports, implementation summaries, and one-off handoff notes
- `docs/archive/root-history/`: legacy root markdown files moved out of the repo root

If an implementation needs a temporary write-up, place it under `docs/archive/` directly instead of the root.

## Architecture Rules

Current structure is in transition. Respect these boundaries:

- `src/app/`: app shell, providers, route composition
- `src/pages/`: route-level page composition
- `src/sections/`: page-owned sections and large route-specific assemblies
- `src/components/`: reusable UI building blocks
- `src/services/`: API and data-fetching integration
- `src/config/`: shared content/system configuration
- `src/contexts/`: app-wide state concerns
- `public/content/`: curated content source of truth

When adding new behavior:

- Prefer page-local composition in `src/pages/` first.
- Put page-owned assemblies in `src/sections/`.
- Extract to `components` only when reuse is real.
- Extract to `services` or `hooks` when logic is shared.
- Do not hide page-specific storytelling logic inside generic shared utilities.

## Page Identity Rules

Each major page should own a distinct editorial and visual system.

Good changes:

- strengthen a page's narrative logic
- create page-specific layouts or hero behavior
- move shared primitives into reusable layers without flattening visual identity

Bad changes:

- making all pages use the same hero, same section rhythm, or same card language
- centralizing page-specific copy or styling too early
- replacing authored content with generic portfolio filler

Shared systems should support difference, not erase it.

## Content Model Rules

Content is part of the product architecture, not just seed data.

- Treat `public/content/*.json` and article markdown as curated assets.
- Keep schema changes deliberate and documented.
- Prefer additive schema evolution over breaking rewrites.
- If a page depends on a new content shape, update validation or content tooling in the same change when practical.

## Language Workflow

The site is expected to become bilingual, but development should stay single-language first to avoid churn.

- During active development, draft copy in one working language only.
- Do not spend time maintaining parallel bilingual copy while UI, structure, and content are still moving.
- Add the second language only after the page, content model, and wording are mostly stable.
- When in doubt, optimize for iteration speed first and translation completeness later.

## Maintenance Standards

Before finishing meaningful work:

- run `nvm use`
- use `npm` for repo tasks
- prefer `npm run content:validate` when touching curated content
- prefer `npm run verify` before final handoff when changes are broad enough

If verification cannot run, say exactly why.

## What To Avoid

- Do not create more root-level status reports.
- Do not introduce broad refactors without a page or system boundary rationale.
- Do not homogenize page styling into a design-system-only site.
- Do not move content source-of-truth decisions into scattered component constants.
- Do not treat historical docs as active architecture docs.

## Preferred Change Pattern

For substantial work:

1. identify whether the change is page-specific, shared-system, or content-model
2. modify the smallest durable boundary that fits
3. keep docs aligned if repo structure or operating rules changed
4. verify the affected workflow

## Decision Heuristic For Agents

Ask these questions before changing structure:

- Is this a permanent repository concern or a temporary delivery artifact?
- Does this belong to one page, many pages, or the whole site?
- Am I improving long-term discoverability, or just adding another layer?
- Does this preserve page individuality?

If the answer is unclear, prefer the simpler structure.
