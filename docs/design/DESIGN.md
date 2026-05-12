# Echo Chen Personal Website — Design System

## Purpose

This document is the design constitution for Echo Chen's personal website.

It defines the site's long-term visual direction, page identity rules, and how external design references such as Refero should be used.

## Site Identity

The site represents Echo Chen as:

- AI/software engineer
- multimedia storyteller
- street photography creator
- gamer
- long-form writer
- Hong Kong-based creative technologist

The site should feel like:

- warm personal archive
- editorial notebook
- AI engineering portfolio
- Hong Kong visual diary
- creative technical workspace

The site should not feel like:

- generic SaaS landing page
- corporate résumé template
- dark-only developer dashboard
- overdecorated AI art gallery
- unrelated visual styles stitched together

## Current Visual Baseline

The current site already uses a warm illustrated scrapbook identity with wide page hero artwork, paper-like backgrounds, serif-led headings, and small technical metadata.

Future changes should refine and mature this identity rather than replace it.

The main implementation goal is not to redesign the whole site, but to:

- clarify information architecture
- reduce visual noise below hero sections
- make gallery pages quieter
- make Projects more case-study oriented
- make Writing more publication-like

## Hero and Body Balance

Illustrated page heroes are the primary expressive layer.

Below the hero:

- reduce decorative density
- prefer structured editorial layouts
- use fewer large illustrations
- let content hierarchy carry the page
- avoid repeating scrapbook motifs too often

Hero sections may be visually rich. Body sections should be calmer.

## Core Direction

Primary visual direction:

- warm editorial scrapbook
- paper-like background
- illustrated personal identity
- serif-led headings
- small technical metadata
- restrained decorative details

Secondary visual systems:

- gallery minimalism for Photos and Videos
- software-studio case-study layout for Projects
- component discipline for badges, cards, tabs, metrics, and technical metadata

## Reference Priority

Use design references by page role, not by copying a brand aesthetic.

1. Warm editorial archive: Home, Writing, About, Awards
2. Gallery minimalism: Photos, Videos, visual archive
3. Software studio: Projects and technical case studies
4. Component discipline: badges, metrics, timeline, tabs, buttons
5. Digital console: Lab and isolated experimental tools only

## Reference Policy

`docs/design/raw-references/` contains copied source material from Refero or other design systems for research only.

`docs/design/references/` contains curated, site-specific design rules extracted from those sources.

When implementing UI changes:

1. Follow this file first.
2. Follow `docs/design/TOKENS.md` for shared visual primitives.
3. Follow the relevant file in `docs/design/page-rules/`.
4. Use `docs/design/references/` for specific reference guidance.
5. Use `docs/design/raw-references/` only to inspect original details, not as implementation instructions.

Do not copy external layouts, brand assets, product names, proprietary compositions, or vendor-specific tokens directly.

## Global Visual Rules

### Background

Use warm ivory / paper-white backgrounds for the main editorial site.

Use stricter white or near-white canvases for gallery pages where images should dominate.

Use dark console aesthetics only for isolated Lab or experimental tool pages.

### Typography

Use serif display typography for major page titles and editorial sections.

Use clean sans-serif for navigation, UI labels, body interface text, and dense information areas.

Use mono typography for metadata, tags, dates, build labels, technical annotations, and code-adjacent content.

### Color

Keep the color system restrained:

- deep charcoal for primary text
- warm gray for secondary text
- muted brown, ink blue, or dark violet for accents
- thin warm gray for borders

Avoid random neon colors, strong gradients, and high-saturation UI accents.

### Cards

Cards should feel like paper objects or clean software panels:

- thin border
- low shadow
- moderate radius
- clear internal spacing
- limited decorative elements

### Motion

Use subtle motion only:

- hover lift
- opacity transition
- slight image zoom
- no heavy parallax
- no excessive animated gradients

## Page Direction

### Home

Keep the illustrated hero as the main brand anchor.

Lower sections should become quieter and more structured.

Home should communicate:

- who Echo is
- selected writing
- selected projects
- photography / multimedia
- awards / credentials
- contact path

### Writing

Use editorial archive style.

Prioritize:

- readability
- chronology
- category / mood
- clean article metadata
- strong Chinese long-form reading experience

Do not over-cardify article lists.

### Multimedia

Use Multimedia as the umbrella for visual output.

It should connect:

- Photos
- Videos
- AI Visuals
- Process / behind-the-scenes

Use a quieter gallery-first structure.

The page should explain the archive logic first, then route users into each medium.

Do not merge every medium into one undifferentiated feed.

### Photos

Use gallery-first layout.

Prioritize:

- large images
- consistent ratios
- location / date / device metadata
- minimal captions
- quiet UI chrome

Avoid heavy scrapbook decoration here.

### Videos

Use cinematic visual cards.

Prioritize:

- strong preview frame
- title
- date
- location
- tool / device
- short description

### Projects

Use software-studio / case-study layout.

Each project should show:

- role
- problem
- what was built
- tech stack
- outcome / metric
- link / demo / repo if available

Projects should prove technical credibility, not just look decorative.

### Awards

Use credential archive style.

Show:

- award name
- date
- institution
- context
- evidence if available

### About

Connect the human identity and technical identity.

Keep it concise, specific, and authored.

### Lab

Use experimental styling only where the interaction model justifies it.

Lab may use darker, console-like aesthetics, but it must not leak into Writing, Photos, About, or the main Home system.
