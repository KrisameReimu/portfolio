# PROJECT.md

# Echo Chen Personal Website

## Product Goal

This repository powers Echo Chen's long-term portfolio, creative archive, and personal IP system.

It is not only a resume site. It should work as:

- a portfolio of selected work
- an evolving creative archive
- a narrative identity surface
- a lightweight publishing system
- a foundation for future interactive experiments and community features

The long-term goal is durability: the site should stay understandable as more writing, photos, videos, experiments, and page-specific experiences are added.

## Product Principles

### 1. Personal IP over template aesthetics

The site should feel authored. Avoid generic SaaS, startup, or default portfolio conventions unless they clearly support the story.

### 2. Each page has its own personality

Pages should share infrastructure, but not collapse into one visual pattern.

- `Home`: signature entry and positioning
- `Writing`: editorial, thoughtful, archive-aware
- `Photos`: visual, immersive, category-led
- `Videos`: cinematic, story and awards aware
- `Projects` / `Game Dev`: process, iteration, experimentation
- `About`: interpretation layer, not just biography
- `Now` / `Roadmap` / `Lab`: living system, current direction, unfinished thinking

### 3. Shared systems should enable uniqueness

Common primitives are useful. Over-centralization is not.

The correct architecture is usually:

- shared layout or UI primitives where repeated
- page-level composition for identity
- content-level schema for durable publishing

### 4. Content is first-class architecture

This repo is partly an application and partly a curated content system.

Content storage, taxonomy, validation, and page rendering should evolve together.

### 5. Localization should follow stabilization

The target product is bilingual, but the workflow should not be bilingual from day one.

- During development, use one draft language as the working source.
- Do not maintain two fully synchronized language versions while layout, IA, and copy are still changing.
- Once a page is structurally stable, add the second language pass.

This keeps translation from becoming accidental rework.

## Current Repo Shape

The operational site is now the static-first Next.js app in `apps/web`.
The older CRA-era `src/` application is no longer the intended public runtime path and should be treated as migration residue unless a specific cleanup task says otherwise.

### Root

The root should stay intentionally small:

- `README.md`
- `PROJECT.md`
- `AGENTS.md`
- app/runtime config files
- source directories

Historical implementation reports belong under `docs/archive/`, not here.

### Source Layout

- `apps/web/`: canonical public site, Next.js App Router, static-first build
- `src/app/`: app shell and global route composition
- `src/pages/`: route-level entries and page orchestration
- `src/sections/`: page-owned sections and large route-specific assemblies
- `src/components/`: reusable UI units
- `src/services/`: content/community/site APIs
- `src/config/`: app-wide config and taxonomy
- `src/contexts/`: global state providers
- `src/data/`: legacy/static data helpers that should stay curated and limited
- `public/content/`: canonical published content payloads

## Structural Review

### What is already strong

- Route-level pages already exist and give a good base for page-specific identity.
- Content is mostly externalized into `public/content/`, which is the right long-term direction.
- Distinct media domains already exist: writing, photos, videos, awards, lab, now, roadmap.

### What is currently messy

- The root accumulated too many one-off markdown reports.
- Documentation mixed active operating docs with historical implementation summaries.
- The codebase still has some legacy/static data overlap, but the old `containers` routing-era structure has been removed from the active app surface.
- Navigation exposure does not fully reflect the number of route-level experiences now present.

### What should happen next structurally

1. Keep root documentation minimal and stable.
2. Treat `docs/` as the only home for non-root documentation.
3. Continue moving route ownership into `src/pages/`.
4. Use `sections` for page-owned assemblies and keep deleting legacy structure instead of introducing replacement clutter.
5. Gradually reduce legacy/static duplication between `src/data/`, `src/portfolio.js`, and `public/content/` where overlap exists.

## Target Documentation Model

### Stable docs

- `README.md`: setup and workflows
- `PROJECT.md`: architecture and product intent
- `AGENTS.md`: AI execution rules

### Active operational docs

- `docs/CLOUDFLARE_D1_COMMUNITY_SETUP.md`
- `docs/CONTENT_MANAGEMENT_GUIDE.md`
- deployment or integration docs that are still actively used

### Archived docs

- implementation summaries
- completion reports
- redesign proposals
- handover notes
- one-off optimization plans

Those belong in `docs/archive/`.

## Recommended Codebase Direction

### 1. Organize around page ownership

When possible, think in this pattern:

- route entry in `src/pages/...`
- page-specific sections in `src/sections/...`
- reusable primitives in `src/components/...`
- data loading in `src/services/...`

If a component only exists to serve one page identity, it should not be forced into a pseudo-generic shared abstraction.

### 2. Standardize content boundaries

Long-term, this site should have a clearer split between:

- authored content
- presentation metadata
- shared taxonomy
- runtime integrations

That means:

- `public/content/` for authored payloads
- `src/config/contentTaxonomy.js` for shared classification metadata
- `src/services/contentAPI.js` for loading and normalization

### 3. Reduce legacy ambiguity gradually

This repo does not need a big-bang rewrite. It needs controlled cleanup.

Good cleanup targets:

- page-by-page ownership clarification
- removing dead or duplicate docs
- documenting schema expectations
- aligning navigation and discoverability with actual routes

## Review Rules For Future Changes

When reviewing a change, ask:

- Does it make the repo easier to navigate?
- Does it preserve page identity?
- Does it strengthen the publishing/content model?
- Does it reduce long-term coupling?
- Is it an active doc or just a historical artifact?

If a change fails most of those checks, it is probably structure debt.

## Near-Term Refactor Priorities

1. Audit page ownership versus `containers` usage.
2. Audit which routes are intentionally public-facing versus hidden/internal.
3. Clarify canonical content sources where `src/data/` and `public/content/` overlap.
4. Add a lightweight docs convention and keep it enforced.
5. When updating pages, preserve distinct visual systems instead of normalizing them.

## Operating Environment

- Node: `22.x`
- Package manager: `npm`
- Local dev: `npm run dev`
- Export preview: `npm run preview`
- Validation: `npm run content:validate`
- Full verification: `npm run verify`

Root commands should proxy into `apps/web` so the repository feels like one app operationally even while migration cleanup continues.

## Definition Of A Good Structural Change

A good structural change should do at least two of these:

- simplify discovery for humans and agents
- reduce permanent ambiguity
- move temporary artifacts out of stable surfaces
- make page ownership more obvious
- strengthen long-term content maintainability
