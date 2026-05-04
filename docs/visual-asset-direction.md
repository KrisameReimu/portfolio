# Visual Asset Direction

This document defines how generated visual assets should support Echo Chen's personal website. The goal is not to add generic AI art. The goal is to create authored visual material that makes the site feel like a personal IP system: technical, editorial, cinematic, and human.

## Product Role

Generated assets should do one of five jobs:

- Establish identity on `Home` with a signature poster or visual manuscript.
- Give `Projects` stronger dossier covers for flagship case studies.
- Give `Photos` an atmospheric exhibition entrance without pretending generated concepts are real photographs.
- Give `Writing` editorial cover language for essays and yearly archives.
- Give `Videos` cinematic title-card language for selected story reels.

The first implementation target should be `Home` and `Projects`. `Photos` can use generated concepts only as framing or atmosphere; real photo browsing should stay based on real images.

## Visual Thesis

Echo's site should feel like an authored studio notebook, not a SaaS landing page. The visual system should combine:

- warm editorial paper texture
- film contact-sheet structure
- technical diagrams and interface traces
- handwritten or annotated evidence
- cinematic lighting and shallow spatial depth
- restrained pseudo-3D objects only when they support the story

Avoid generic glassmorphism, random neon blobs, fake screenshots, fake brand logos, and unreadable generated text. Site text should be rendered by the frontend, not baked into image assets.

## Asset Boundary

Generated images are supporting materials, not the content source of truth.

- Store asset metadata in `public/content/visuals/index.json`.
- Store generated image files under `public/content/visuals/assets/` if committed locally.
- Prefer descriptive IDs such as `home-identity-poster` or `project-polyu-genai-sql-cover`.
- For personal brand character assets, store files under `public/content/visuals/assets/brand-character/` and name them by role plus visual thesis, for example `echo-3d-studio-figurine-design-think-create.png`.
- Keep project-specific facts in `public/content/projects/*.json`; generated covers should illustrate the project thesis, not duplicate the full project content.
- Mark generated concepts clearly in metadata. Do not present generated photo concepts as real photography.

## Generated Asset Intake

The first generated personal-IP set is already integrated into the Home hero:

- `echo-3d-studio-figurine-design-think-create`: primary Home character visual.
- `echo-avatar-focus-create-impact`: smaller friendly avatar/badge asset.
- `echo-personal-ip-character-system-sheet`: brand-system reference sheet for future About/Now or design documentation.

Keep original PNG files as source assets, but use optimized JPEG/WebP derivatives in the frontend when the artwork is opaque. The first integrated Home set uses JPEG derivatives to avoid loading multi-megabyte PNGs above the fold.

Use these as brand-character material, not as factual project evidence. The embedded English text can reinforce atmosphere, but the site must render important words as HTML copy for accessibility and localization.

The May 4 page-hero set is integrated as the first full page-specific visual system:

- `home-echo-chen-ai-multimedia-storytelling`: Home hero.
- `writing-essays-reflections-stories-notes`: Writing hero.
- `photos-moments-places-stories-archive`: Photos hero.
- `videos-filmmaking-editing-visual-stories`: Videos hero.
- `projects-system-overview-dossier`: Projects hero.
- `awards-recognition-milestones-achievements`: Awards hero.
- `about-me-profile-dossier-board`: About hero.
- `contact-say-hello-collaborate-connect`: Contact hero.

Use JPEG derivatives in the frontend and keep PNG source files out of the critical loading path. Collages that include real friends, private events, or less clearly consented people should not become public hero assets without an explicit publishing decision.

## Prompt Rules

Use prompts that describe composition, atmosphere, material, and narrative role. Do not depend on generated text inside the image.

- Ask for clear foreground, midground, and background layers.
- Specify the crop and safe zone for responsive layout.
- Keep a quiet area for real HTML typography.
- Prefer tactile materials: paper, acetate, film strip, archival folders, annotations, projection light.
- For project covers, represent systems and workflows abstractly instead of generating fake app screens.
- For `Photos`, generate gallery atmosphere or contact-sheet framing, not fake travel photos.

## Page-by-page Asset Plan

## Page Hero Image Contract

Each major page should have one page-owned hero image direction. The image can be generated, photographed, or composited, but it must support the page's own narrative instead of becoming a shared decorative banner.

- `Home`: use `echo-personal-ip-character-system-sheet` as the primary personal-IP system image; supporting assets can show the 3D figurine and focus avatar.
- `Writing`: use `writing-pretext-paper-system`; the fancy layer is Pretext-style line reveal, margin notes, and paper texture.
- `Photos`: use `photos-gallery-concept-cover` only as an exhibition entrance until real photo sets are published; the long-term hero should prioritize real curated photos.
- `Videos`: use `videos-cinematic-title-wall`; the fancy layer is projector light, reel hover, and storyboard sequencing.
- `Projects`: use `projects-dossier-surface` plus per-project covers; the fancy layer is interactive dossier rows, not a card grid.
- `Awards`: use `awards-evidence-board`; the fancy layer is proof clusters and archive-board reveal.
- `About`: use `about-profile-dossier`; the fancy layer is identity-map lines connecting systems, research, media, and education.
- `Now`: use `now-studio-status-board`; the fancy layer is small status pulses and current-work markers.

The code-level pointer lives in `src/config/pageIdentity.js` under each page's `heroVisual`. The prompt and storage metadata live in `public/content/visuals/index.json`.

### Home

Goal: make the first screen feel like Echo's authored identity system, not a normal portfolio hero.

Generate:

- `home-identity-poster`: one wide hero visual with negative space for real HTML typography.
- `home-contact-sheet-strip`: a horizontal strip of abstract film/contact-sheet frames that can move subtly on hover or scroll.
- `home-evidence-objects`: small transparent PNG/WebP cutouts such as paper notes, diagram fragments, film edges, or acetate sheets for layered parallax.

Fancy UI direction:

- manuscript reveal: title and proof lines appear like layered notes being uncovered.
- contact-sheet hover: hovering each frame reveals the matching page route.
- restrained pseudo-3D: paper layers tilt slightly with pointer movement; no physics gimmick.

Prompt:

> Create a wide editorial website hero asset for Echo Chen's personal website. The scene is a warm studio notebook table with layered paper, translucent acetate, abstract system diagrams, film contact sheets, and soft projection light. It should feel authored, technical, cinematic, and human. Keep a calm negative-space area for real HTML typography. Use paper grain, graphite lines, amber highlights, muted teal accents, and subtle pseudo-3D depth. No readable text, no logos, no fake UI screenshots, no mascot, no fan, no cloth simulation.

### Writing

Goal: make Writing feel like an editorial desk/archive. Pretext should support reading, not become decoration.

Generate:

- `writing-pretext-paper-system`: background texture set for pretext blocks, margin notes, annotations, page folds.
- `writing-year-editorial-cover`: one cover per writing year or major writing mood.
- `writing-essay-vignette`: optional small illustrations for selected essays, only when the essay theme benefits from it.

Fancy UI direction:

- Pretext use: use faint oversized keywords, annotation fragments, dates, or paragraph ghosts behind article cards.
- reading rail: timeline/ruler on the side that reacts to scroll.
- margin note reveal: selected article metadata appears as editorial annotations.

Prompt:

> Create an editorial paper texture system for a reflective writing archive. The visual should look like layered cream paper, faint margin notes, pencil annotations, soft page shadows, and subtle printed paragraph ghosts. It must support real website text layered above it, so keep contrast low and avoid readable generated words. Mood: literary, reflective, warm, slightly melancholic, magazine archive. Palette: cream, graphite, faded ink, muted amber. No logos, no fake article titles, no readable text.

### Photos

Goal: make Photos the most immersive page, while keeping real photos as the truth.

Generate:

- `photos-gallery-concept-cover`: atmospheric gallery entrance, not fake photography.
- `photos-archive-frame-system`: film edges, light leaks, contact-sheet masks, exhibition wall fragments.
- `photos-360-room-concept`: optional panorama-like gallery room background for future 360/focus mode.

Fancy UI direction:

- gallery focus mode: click a real photo to enter a quieter viewing state.
- 360-like room: use CSS perspective or a panorama viewer later; only if you have real panoramic photos or generated background clearly labeled as concept.
- image sequence hover: small contact-sheet frames scrub through related images.
- reduced navigation noise: make the archive feel like an exhibition rather than a list page.

Prompt:

> Create a panoramic atmospheric gallery room concept for a personal photography archive. The space should feel like a quiet exhibition entrance with blank frames, contact-sheet strips, film edges, warm wall light, and soft shadows. It should be usable as a background frame for real photographs, not a replacement for real photos. Wide panorama composition, gentle perspective, warm off-white walls, graphite film edges, amber light leaks, paper texture. No fake travel photos, no fake portraits, no readable text, no logos.

### Projects

Goal: make Projects feel like a dossier/case-study console, not a card grid.

Generate:

- `project-*-cover`: one dossier cover per flagship project.
- `projects-dossier-surface`: abstract folder/table surface for the Projects landing page.
- `projects-process-tokens`: small transparent cutouts such as route lines, file tokens, database cards, feedback marks, video timeline fragments.

Fancy UI direction:

- interactive dossier rows: hover opens a preview layer with problem/role/result.
- case-study switcher: rows feel like files sliding into focus.
- process evidence rail: small assets animate along a route line to show workflow.
- no fake screenshots: real diagrams and project facts remain from content JSON.

Prompt:

> Create an abstract interactive dossier surface for a technical project portfolio. Show layered archival folders, route lines, system diagram fragments, database grid cards, feedback annotation marks, and soft interface silhouettes. The image should support a website case-study list with real HTML text on top. It should feel like a serious technical evidence desk, not a SaaS dashboard. Warm paper, graphite, muted teal, small amber highlights, subtle pseudo-3D depth. No readable text, no logos, no fake app screenshots.

### Videos

Goal: make Videos cinematic and story-driven rather than another media grid.

Generate:

- `videos-cinematic-title-wall`: title-card style background for the Videos landing page.
- `videos-storyboard-strip`: storyboard/contact-sheet strip for selected video work.
- `videos-projector-light`: soft transparent overlay for cinematic atmosphere.

Fancy UI direction:

- cinematic reel hover: hover a video card to reveal frame-like metadata and motion line.
- projector transition: section changes use light sweep or film gate reveal.
- storyboard mode: selected works appear as sequences rather than isolated thumbnails.

Prompt:

> Create a cinematic title-wall background for a personal video portfolio. The scene should suggest storyboards, film strips, editing timeline traces, projector light, and warm theatrical shadows. It should leave clean areas for real website titles and video metadata. Mood: cinematic, crafted, narrative, intimate. Palette: deep charcoal, cream paper, amber projector light, muted red accents. No readable text, no logos, no fake video platform UI.

### About

Goal: make About feel like a personal dossier that connects developer, researcher, and visual storyteller.

Generate:

- `about-profile-dossier`: authored profile board background.
- `about-signal-map`: abstract map connecting systems, research, photos, writing, and video.

Fancy UI direction:

- identity map: sections connect with thin animated lines.
- proof clusters: credentials and roles appear as pinned evidence, not generic badges.
- subtle portrait treatment: if using real portrait, keep generated layers around it, not replacing identity.

Prompt:

> Create an authored profile dossier background for a personal website About page. It should combine warm paper, pinned notes, abstract route lines, research traces, small film/contact-sheet fragments, and technical diagram marks. The composition should frame a real portrait or profile text without replacing it. Mood: intelligent, warm, personal, curated, not corporate. No readable text, no logos, no fake certificates.

### Now / Lab / Roadmap

Goal: make the living pages feel active and evolving without becoming visually noisy.

Generate:

- `now-studio-status-board`: current-work board with sticky notes and calendar-like marks.
- `lab-experiment-shelf`: lightweight experiment shelf background.
- `roadmap-thread-map`: future-direction map with route lines and staged markers.

Fancy UI direction:

- status pulse: small date/update markers animate lightly.
- experiment cards: each lab item gets a tiny visual token.
- roadmap threads: future items connect through animated lines, not card piles.

Prompt:

> Create a warm studio status-board background for a living personal website Now page. Show abstract pinned notes, calendar marks, experiment labels as unreadable marks, small route lines, and soft desk lighting. It should feel current, active, and personal, but still quiet enough for real HTML text. Palette: cream paper, graphite, amber, muted green. No readable text, no logos, no fake dashboard UI.

## Interaction Priority

1. Home: connect `home-identity-poster` to a manuscript/contact-sheet landing interaction.
2. Projects: connect three project covers to interactive dossier rows.
3. Photos: add focus mode first; only add 360 if there is suitable panorama material or clearly labeled generated gallery atmosphere.
4. Writing: add Pretext paper/annotation system after the article list structure is stable.
5. Videos: add cinematic reel/storyboard motion after thumbnail data is stable.

## Asset Generation Order

Generate in this order to avoid wasting time on decorative assets before the page structure can use them:

1. `home-identity-poster`
2. `project-polyu-genai-sql-cover`
3. `project-capstone-student-flow-cover`
4. `project-multimedia-awards-cover`
5. `writing-pretext-paper-system`
6. `photos-gallery-concept-cover`
7. `photos-360-room-concept`
8. `videos-cinematic-title-wall`
9. `about-profile-dossier`
10. `now-studio-status-board`

## Initial Prompt Suite

### `home-identity-poster`

Use as the Home signature visual. It should establish Echo as someone who builds systems, works with research/education, and expresses herself through media.

Prompt:

> Create an editorial identity poster for a personal website. Subject: a young technical creator who builds AI-assisted education systems, curates research workflows, and also works with photography and video. Composition: warm studio desk seen from an elevated angle, layered with translucent acetate sheets, a film contact sheet, a few annotated system diagrams, and soft projected light. No readable text, no logos, no fake UI screenshots. Mood: authored, intelligent, cinematic, tactile, warm. Leave a calm negative-space region on the left for real website typography. High-detail editorial design, subtle pseudo-3D depth, paper grain, amber and graphite palette.

### `project-polyu-genai-sql-cover`

Use as the flagship cover for the PolyU GenAI SQL Learning Platform project.

Prompt:

> Create an abstract dossier cover for an AI-supported SQL learning platform. Show a learning loop made of layered paper cards, query fragments as abstract marks, database grid forms, feedback annotations, and analytics traces. The image should suggest assessment, feedback, revision, and teaching insight without showing a fake app screenshot. Warm editorial palette with graphite, muted teal, cream paper, and small amber highlights. Cinematic top light, archival folder composition, clean negative space for website text. No readable text, no logos.

### `project-capstone-student-flow-cover`

Use as the flagship cover for the Capstone Success student workflow project.

Prompt:

> Create an abstract case-study cover for a student workflow product. Represent a continuous journey from login to assignment submission, history, result review, and viva follow-up using connected cards, route lines, file upload tokens, and soft interface silhouettes. It should feel like a product architecture dossier, not a marketing dashboard. Warm paper, translucent panels, graphite lines, muted blue-green accents, subtle depth, no readable text, no logos, no fake UI screenshot.

### `project-multimedia-awards-cover`

Use as the flagship cover for the multimedia and awards project.

Prompt:

> Create a cinematic editorial cover for multimedia storytelling and award work. Show a desk-like composition with film frames, poster fragments, a soft spotlight, award ribbon shapes, and editing timeline traces. The visual should communicate video, public presentation, competition output, and narrative craft. Warm theatrical lighting, deep charcoal shadows, cream paper, muted red and gold accents. No readable text, no logos, no fake certificates.

### `photos-gallery-concept-cover`

Use only as a gallery entrance concept or atmospheric frame for the Photos page. It must not replace real photos.

Prompt:

> Create an atmospheric gallery entrance image for a personal photography archive. Show an exhibition wall with empty frames, contact sheets, light leaks, and soft shadows, suggesting memory and curation rather than a specific place. The image should feel like a quiet archive opening, with room for real photographs to appear later. Warm off-white wall, dark film edges, amber light, subtle paper texture. No fake travel photos, no readable text, no logos.

## Implementation Sequence

1. Generate `home-identity-poster` and test it behind the Home manifesto hero.
2. Generate the three project covers and wire them into `Projects` as optional visual metadata.
3. Generate `photos-gallery-concept-cover` only if the Photos page needs an atmospheric entrance before real curated photo sets are ready.
4. Add responsive image handling and reduced-motion-safe reveal animations when assets are connected to pages.
5. Keep all prompts and output metadata in `public/content/visuals/index.json` so generated images remain traceable.
