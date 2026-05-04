# Refero Design Integration

This note translates Refero style references into Echo Chen's site language. Use it when borrowing from `https://styles.refero.design/`, especially DESIGN.md, CSS variables, Tailwind v4 snippets, or design-token exports.

The goal is taste transfer, not brand imitation. Refero sources can improve typography, spacing, surface discipline, and interaction hierarchy, but each page must keep its own authored role.

## Source Takeaways

### Apple / Gallery White

Use for: `Home`, selective hero moments, product-like project reveals.

- Large negative space and calm white/off-white surfaces.
- Very high typographic confidence: short display lines, restrained body copy.
- Color appears as the subject or active state, not as decoration.
- Lightweight surfaces, fine borders, and soft page depth.
- Avoid copying Apple product-page structure, product naming, or blue CTA dominance.

### Plain / Digital Workbench

Use for: `Projects`, `Now`, admin-like project evidence, technical workflow views.

- Crisp contained layouts, functional accent color, light borders.
- Typography feels precise and workmanlike rather than promotional.
- Cards should look like useful surfaces, not decoration.
- Accent color marks action, status, and selection only.

### Limitless / Architectural Blueprint

Use for: project case studies, roadmap/lab planning, structured evidence sections.

- Muted achromatic palette with one precise accent.
- Thin separators, deliberate grid alignment, and technical calm.
- Strong for diagrams, timelines, and comparison sections.
- Avoid overusing violet/purple; it should not flatten the site's page identities.

### Mercury / Command Center

Use for: `Videos`, high-signal status moments, cinematic project dashboards.

- Deep atmospheric canvas paired with exact text hierarchy.
- One vivid action accent reserved for primary interaction.
- Spacious hero-to-detail transition, with mood coming from imagery and contrast.
- Use sparingly so the site does not become a dark SaaS dashboard.

### Leo Natsume / Gallery Wall Precision

Use for: `Photos`, selected visual archives, portfolio proof walls.

- Near-monochrome foundation, strong whitespace, single sharp accent.
- Minimal framing around visuals, letting the artifact carry the page.
- Lightweight outlined components and careful curation.
- Do not turn every image into a card grid.

## Echo Site Translation

| Page | Primary Refero Archetype | What To Borrow | What To Avoid |
|------|--------------------------|----------------|---------------|
| Home | Apple / Gallery White | identity-poster negative space, short confident headline rhythm, product-level polish | generic Apple clone, oversized SaaS CTA stack |
| Writing | Editorial Paper + Plain | narrow reading rhythm, quiet rules, warm paper surfaces, precise labels | cold enterprise dashboard styling |
| Photos | Leo Natsume / Gallery Wall | high whitespace, image-led hierarchy, single active accent | stock-photo mood boards, heavy card chrome |
| Videos | Mercury / Command Center | cinematic contrast, sequence rhythm, restrained action color | dark gradients everywhere |
| Projects | Plain + Limitless | evidence-first workbench, diagrams, clean technical cards | decorative purple SaaS hero language |
| Awards | Gallery Wall + Blueprint | proof-board hierarchy, strict metadata, thin separators | trophy-wall clutter |
| About | Apple + Blueprint | calm profile dossier, strong typography, selective portrait/asset use | resume-template sections |
| Now | Plain / Digital Workbench | live status surfaces, compact progress signals, clear update cadence | over-polished marketing blocks |

## Token Policy

When importing a Refero DESIGN.md or token export:

1. Rename tokens into Echo-owned names before use.
2. Keep one functional accent per page surface.
3. Prefer `PageSurface` CSS variables for shared page shell values.
4. Keep page-specific composition in page files or `src/sections/`.
5. Do not add Tailwind just because a reference provides Tailwind v4 output; this repo currently uses SCSS and React 16.

Recommended Echo-owned token vocabulary:

```css
--page-foreground
--page-muted
--page-soft
--page-panel
--page-panel-strong
--page-border
--page-border-strong
--page-accent
--page-accent-border
--taste-section-gap
--taste-content-width
--taste-reading-width
--taste-card-radius
--taste-control-radius
--taste-hairline
```

## Implementation Pattern

Use this sequence for future visual work:

1. Pick one page and one Refero archetype.
2. Copy the external DESIGN.md into working notes only if needed; do not commit raw external brand language as active site copy.
3. Translate the useful parts into Echo tokens, page identity metadata, or page-local SCSS.
4. Verify the page still expresses its own role from `AGENTS.md`.
5. Archive one-off comparisons under `docs/archive/` if they are no longer active.

## Current Integration Boundary

The current code-level entry point is `src/config/pageIdentity.js`. Each page can carry a `designReference` field that names the Refero-inspired archetype and the exact borrowing rule. `PageSurface` exposes this as a data attribute for future CSS or browser checks.

This keeps external design taste visible to agents while preventing all pages from collapsing into one shared template.
