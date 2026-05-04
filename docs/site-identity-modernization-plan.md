# Site Identity Modernization Plan

This site should not become a generic portfolio template. The durable direction is to keep shared structure underneath while letting each page keep its own editorial personality.

## Current Design Thesis

- Home: identity poster, not a resume landing page.
- Writing: editorial archive and reflective voice.
- Photos: atmospheric visual memory.
- Videos: cinematic story wall.
- Projects: technical case-study dossier with visible workflow evidence.
- Awards: proof archive and credential board.
- About: profile dossier tying career signals into one personal IP.

## Structural Direction

- Keep route and page identity metadata in `src/config/pageIdentity.js`.
- Keep reusable hero plumbing in `src/components/pageHero/PageHero.js`.
- Keep authored page copy page-owned or under `src/config/pages/*` when it is reused by multiple components.
- Keep project case-study content in `public/content/projects/*.json`.
- Keep generated visual asset prompts and usage metadata in `public/content/visuals/index.json`.
- Use `docs/visual-asset-direction.md` as the durable direction for GPT-image-2 and other generated visual assets.
- Use `docs/refero-design-integration.md` when borrowing external Refero style references, tokens, or DESIGN.md files.
- Build shared components only when reuse is real; page-specific storytelling should remain page-owned.

## Visual Upgrade Sequence

1. Upgrade the GenAI project detail page into a flagship case-study page.
2. Rework the Home hero into a more recognizable identity poster.
3. Give Videos a more cinematic media-wall rhythm.
4. Give Writing a stronger editorial magazine system.
5. Refine Awards into an archive/proof-board experience.

## Guardrails

- Do not flatten all pages into the same hero/card/grid pattern.
- Do not hardcode reusable site identity values inside route components.
- Do not hide page-specific storytelling inside generic utilities.
- Prefer content/config sources over scattered constants when the value defines page identity or site strategy.
