# Echo Chen — Personal Website

This repository contains the source for Echo Chen's personal website.

Live site: https://www.chenchen-echo.com/

## Environment

- Node.js: `20.11.0` via `nvm use`
- Package manager: `npm`
- Clean install: `npm ci`
- Local dev: `npm run dev`
- Before changes land: `npm run verify`

## Content Workflow

- Article index: `public/content/index.json`
- Article body: `public/content/articles/<id>.zh.md` and optional `<id>.en.md`
- Validate all content files:
  - `npm run content:validate`
- Create new article scaffold:
  - `npm run new:article -- --id your-article-id --title-zh "中文标题" --date 2026-02-06 --category reflection --tags "标签1,标签2" --excerpt-zh "摘要"`
- Optional English file:
  - add `--create-en true --title-en "English Title"`

## Multimedia Workflow

- Photos index: `public/content/photos.json`
- Videos index: `public/content/videos.json`
- Projects index: `public/content/projects.json`
- Create new photo:
  - `npm run new:photo -- --id photo-id --title-zh "标题" --date 2026-02-06 --category urban --url "https://img.chenchen-echo.com/path.jpg" --thumbnail "https://img.chenchen-echo.com/path-thumb.jpg"`
- Create new video:
  - `npm run new:video -- --id video-id --title-zh "标题" --date 2026-02-06 --category documentary --thumbnail "https://img.chenchen-echo.com/cover.jpg" --platform youtube --video-id "YOUTUBE_ID"`
- Create new project:
  - `npm run new:project -- --id project-id --title-zh "项目标题" --status in-development --cover "https://img.chenchen-echo.com/project-cover.jpg" --tech "Unity,C#,Node.js"`
- Before push/deploy:
  - `npm run content:validate && npm run build`

## Recommended Hosting

- Images: Cloudflare R2 custom domain (current direction)
- Videos: YouTube (store only metadata and video IDs in `public/content/videos.json`)
- Keep original source files in cloud drive, keep website as curated index/showcase

## Community Backend (D1)

- Setup guide: `docs/CLOUDFLARE_D1_COMMUNITY_SETUP.md`
- Worker template: `cloudflare/community-api/`
