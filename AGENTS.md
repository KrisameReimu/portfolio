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

The canonical frontend is `apps/web`. Respect these boundaries:

- `apps/web/app/`: App Router routes and route-level composition
- `apps/web/components/`: reusable UI building blocks
- `apps/web/lib/`: content loading, metadata, and shared presentation helpers
- `apps/web/public/`: curated published content and public site assets
- `apps/web/scripts/`: web build generators
- `scripts/`: workspace-level validation and content-authoring tooling

When adding new behavior:

- Prefer page-local composition in the owning `apps/web/app/` route first.
- Put page-owned assemblies beside their route unless genuine reuse warrants a component.
- Extract to `components` only when reuse is real.
- Extract to `services` or `hooks` when logic is shared.
- Do not hide page-specific storytelling logic inside generic shared utilities.

## Design Reference Workflow

Use Refero and other external design references as design principles, not as templates to copy.

For UI, visual identity, typography, layout, image, or page-design work, read design documents in this order when present:

1. `docs/design/DESIGN.md` — site-level design system and visual identity
2. `docs/design/TOKENS.md` — semantic colors, typography, spacing, radius, shadows, and component defaults
3. `docs/design/page-rules/*.md` — page-specific design rules
4. `docs/design/references/*.md` — curated, site-specific reference notes extracted from Refero or similar sources
5. `docs/design/ANTI_PATTERNS.md` — forbidden patterns and known failure modes

Raw vendor/reference `DESIGN.md` files may be stored under `docs/design/raw-references/` for research only. Do not treat them as implementation rules. Executable reference files belong under `docs/design/references/` and should be short extracted notes with `Use For`, `Extract`, `Avoid`, and `Local Application` sections.

Only inspect `docs/design/raw-references/` when the task explicitly requires design research or reference comparison.

Preserve the current warm illustrated personal identity unless the task explicitly asks for a redesign.

## Product / Information Architecture Workflow

For navigation, route, content-model, Writing, Multimedia, Site OS, or WeChat workflow decisions, read relevant product docs under `docs/product/` before editing code.

Expected long-term top-level navigation:

- Home
- Writing
- Multimedia
- Projects
- About
- Contact

Writing owns long-form thinking. It should remain a single editorial archive entry point, while each article keeps a stable detail route such as `/writing/:slug`.

Multimedia owns visual output. It is the umbrella for Photos, Videos, AI Visuals, and Process. Keep legacy direct routes such as `/photos` and `/videos` working during migration.

Projects owns engineering proof. Prefer case-study structure over generic portfolio tiles.

About owns identity, awards, tools, now/current status, and professional context.

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

- Treat `apps/web/public/content/*.json` and article markdown as curated assets.
- Keep schema changes deliberate and documented.
- Prefer additive schema evolution over breaking rewrites.
- If a page depends on a new content shape, update validation or content tooling in the same change when practical.
- Prefer `npm run content:validate` when touching curated content.

## Writing / WeChat Rules

The website should be the canonical long-term archive for Writing.

WeChat Official Account should be treated as a distribution channel, not the canonical content store.

If WeChat automation is implemented later, prefer creating or updating a WeChat draft for manual review. Do not auto-publish WeChat articles without explicit instruction.

Do not fetch WeChat article content dynamically at runtime.

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

## Static Export Policy

The main personal site intentionally uses Next.js static export via
`output: "export"`. Do not remove it or introduce request-time runtime
features unless a concrete product requirement requires Next.js server
capabilities.

If verification cannot run, say exactly why.

## What To Avoid

- Do not create more root-level status reports.
- Do not introduce broad refactors without a page or system boundary rationale.
- Do not homogenize page styling into a design-system-only site.
- Do not move content source-of-truth decisions into scattered component constants.
- Do not treat historical docs as active architecture docs.
- Do not copy external design references directly into app styles.
- Do not let raw design references override local page rules or product architecture.

## Preferred Change Pattern

For substantial work:

1. identify whether the change is page-specific, shared-system, content-model, or product-architecture work
2. read the relevant docs under `docs/design/`, `docs/product/`, or `docs/engineering/`
3. modify the smallest durable boundary that fits
4. keep docs aligned if repo structure or operating rules changed
5. verify the affected workflow

## Decision Heuristic For Agents

Ask these questions before changing structure:

- Is this a permanent repository concern or a temporary delivery artifact?
- Does this belong to one page, many pages, or the whole site?
- Am I improving long-term discoverability, or just adding another layer?
- Does this preserve page individuality?
- Does this follow the current information architecture docs?

If the answer is unclear, prefer the simpler structure.
