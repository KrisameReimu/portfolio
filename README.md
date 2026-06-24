# Echo Chen Personal Website

Source for [chenchen-echo.com](https://www.chenchen-echo.com/).

This repository is a long-term portfolio, publishing system, and personal IP surface. It is intentionally multi-modal: writing, photography, video, projects, and evolving experimental pages live in one codebase, but each page should keep its own identity.

## Start Here

- Repo intent and structural direction: [`PROJECT.md`](./PROJECT.md)
- AI collaboration rules: [`AGENTS.md`](./AGENTS.md)
- Active operational docs: [`docs/`](./docs)
- Archived historical reports: [`docs/archive/`](./docs/archive)

## Environment

- Node.js: `22.x`
- Version manager: `nvm use`
- Package manager: `npm`
- Clean install: `npm ci`
- Local dev: `npm run dev`
- Full verification: `npm run verify`

## Core Workflows

### Content

- Article index: `public/content/index.json`
- Article body: `public/content/articles/<id>.zh.md`
- Optional English article: `public/content/articles/<id>.en.md`
- Validate content: `npm run content:validate`
- Create article scaffold:

```bash
npm run new:article -- --id your-article-id --title-zh "中文标题" --date 2026-02-06 --category reflection --tags "标签1,标签2" --excerpt-zh "摘要"
```

- Optional English scaffold flags:

```bash
--create-en true --title-en "English Title"
```

### Multimedia

- Photos index: `public/content/photos.json`
- Videos index: `public/content/videos.json`
- Legacy game-project index: `public/content/projects.json`
- Project dossier index: `public/content/projects/index.json`
- Project dossier detail: `public/content/projects/<slug>.json`

- Create photo:

```bash
npm run new:photo -- --id photo-id --title-zh "标题" --date 2026-02-06 --category urban --url "https://img.chenchen-echo.com/path.jpg" --thumbnail "https://img.chenchen-echo.com/path-thumb.jpg"
```

- Create video:

```bash
npm run new:video -- --id video-id --title-zh "标题" --date 2026-02-06 --category documentary --thumbnail "https://img.chenchen-echo.com/cover.jpg" --platform youtube --video-id "YOUTUBE_ID"
```

- Create project:

```bash
npm run new:project -- --id project-id --title-zh "项目标题" --status in-development --cover "https://img.chenchen-echo.com/project-cover.jpg" --tech "Unity,C#,Node.js"
```

## Documentation Policy

- Keep the repository root minimal.
- Only stable, repo-wide entry documents belong at the top level.
- Put active guides under `docs/`.
- Put historical reports and one-off implementation summaries under `docs/archive/`.

## Source Structure

- `src/app/`: application shell, providers, routing composition
- `src/pages/`: route-level pages
- `src/sections/`: page-owned sections and large route-specific assemblies
- `src/components/`: reusable UI building blocks
- `src/services/`: content and external integrations
- `src/config/`: shared schemas, route config, taxonomy, assets
- `src/data/`: only for legacy fallback data that has not yet moved to canonical content sources

## Localization Workflow

- Final target: bilingual site experience
- Development default: single-language copy while the page is still evolving
- Add the second language after content, layout, and structure have mostly stabilized

## Hosting Direction

- Images: Cloudflare R2 custom domain
- Videos: YouTube metadata only in `public/content/videos.json`
- Original media: keep in cloud storage, not in the app repo

## Community Backend

- Setup guide: `docs/CLOUDFLARE_D1_COMMUNITY_SETUP.md`
- Worker template: `cloudflare/community-api/`
