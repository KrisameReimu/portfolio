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

The operational site is the static-first Next.js app in `apps/web`. It is the
only public frontend source of truth and intentionally uses Next.js static
export for a content-heavy, portable site.

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
- `apps/web/app/`: route entries and page orchestration
- `apps/web/components/`: reusable UI units
- `apps/web/lib/`: content loading, metadata, and shared presentation helpers
- `apps/web/public/`: canonical published content payloads and static assets
- `apps/web/scripts/`: build-time RSS and LLM-context generators
- `scripts/`: workspace-level content validation and authoring tooling

## Structural Review

### What is already strong

- Route-level pages already exist and give a good base for page-specific identity.
- Content is externalized into `apps/web/public/content/`, which is the canonical published source.
- Distinct media domains already exist: writing, photos, videos, awards, lab, now, roadmap.

### What is currently messy

- The root accumulated too many one-off markdown reports.
- Documentation mixed active operating docs with historical implementation summaries.
- The deployable application, published content, and public assets now share one explicit app boundary.
- Navigation exposure does not fully reflect the number of route-level experiences now present.

### What should happen next structurally

1. Keep root documentation minimal and stable.
2. Treat `docs/` as the only home for non-root documentation.
3. Keep route ownership explicit in `apps/web/app/`.
4. Keep page-owned assemblies local unless reuse is real.
5. Keep content and static assets inside the canonical app boundary.

## Target Documentation Model

### Stable docs

- `README.md`: setup and workflows
- `PROJECT.md`: architecture and product intent
- `AGENTS.md`: AI execution rules

### Active operational docs

- `docs/CLOUDFLARE_D1_COMMUNITY_SETUP.md`
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

- route entry in `apps/web/app/...`
- page-specific composition next to its route
- reusable primitives in `apps/web/components/...`
- data loading in `apps/web/lib/...`

If a component only exists to serve one page identity, it should not be forced into a pseudo-generic shared abstraction.

### 2. Standardize content boundaries

Long-term, this site should have a clearer split between:

- authored content
- presentation metadata
- shared taxonomy
- runtime integrations

That means:

- `apps/web/public/content/` for authored payloads
- `apps/web/contentSchema.json` for shared validation taxonomy
- `apps/web/lib/content/` for build-time loading and normalization

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

1. Audit which routes are intentionally public-facing versus hidden/internal.
2. Keep content schemas and validators aligned as new publishing types are added.
3. Add a lightweight docs convention and keep it enforced.
4. When updating pages, preserve distinct visual systems instead of normalizing them.

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
