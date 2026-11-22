# Writing Content Workflow

## Direction

Writing should be a single editorial archive page.

It does not need category sub-routes.

Each article should still have a stable slug route:

- `/writing/:slug`

## Role

Writing owns:

- essays
- reflections
- technical notes
- city observations
- AI-era commentary
- creative process notes
- long-form personal writing

Writing should feel like a curated editorial archive, not a generic blog card grid.

## Source of Truth: original vs public snapshot

The **sole editable original** is the Master Google Doc in Google Drive's Echo Writing Archive. Its private Writing Index holds the Master Doc ID and per-channel lifecycle metadata. The **portfolio website is the canonical public reading archive**, with stable public URLs; its `apps/web/public/content/articles/<id>.zh.md` and `index.json` are approved static publishing snapshots, *not* a parallel editable Master.

The private production/orchestration repository is [AI-Multimedia](https://github.com/KrisameReimu/AI-Multimedia); see its [cross-repository integration plan](https://github.com/KrisameReimu/AI-Multimedia/blob/main/docs/portfolio-integration-plan.md). Website presentation schema and validator take precedence for public payloads. Any future converter must target the existing public content schema and open a separate portfolio PR; do not fetch private Drive at runtime or directly publish on approval of a WeChat draft.

## Actual current website publishing contract

- Public index: `apps/web/public/content/index.json`, using `id`, optional `slug`, `publishedDate`, localized `title`/`excerpt`, `tags`, `cover`, optional `source.wechat`.
- Public article body: `apps/web/public/content/articles/<id>.zh.md`. Public route: `/writing/<slug>` (the slug may differ from `id`), handled by `apps/web/lib/content/writing.ts`.
- Older site metadata may contain unverified historical `publishedDate`; do not confuse it with writing, import or document creation date. Audit each candidate work before changing published dates or archive groupings.
- Use the existing `npm run content:validate` and `npm run verify` gates. New fields require coordinated schema, parser and validator updates; avoid embedding private Drive IDs or unreviewed drafts in public JSON.

## Publication workflow (incremental, not yet automated end to end)

1. Develop the work in conversation and Google Docs Master. The author approves the source text, media rights, date, title and intended public release.
2. Prepare a channel-specific Distribution version; confirm its Google Docs revision, stable intended portfolio `slug`, cover and assets. Keep all private Drive identifiers in the private handoff record, not public website JSON by default.
3. To publish on the portfolio, generate/review Markdown, public metadata and permitted R2/local cover assets. Stage them as a **portfolio content PR**; confirm preview, mobile reading quality, dates and source integrity. Deploy only after explicit author approval and CI.
4. The website publication URL is recorded back to the private Writing Index **after it is actually live**. Keep website and WeChat statuses separate, and never mark a channel Published merely because a draft exists.
5. Independently, the AI-Multimedia/Make workflow can prepare a WeChat draft for author review. WeChat draft creation/readback and Google Docs reading were separately tested on 2026-11-22; HTML rendering/new cover upload/full same-scenario handoff are not yet verified. Do not auto-publish or auto-broadcast.
6. For candidate first-publication literary submissions, verify first-publication/exclusivity and rights **before either public route**, and keep those works out of any automated publication queue.

Do not dynamically fetch WeChat articles or Google Drive Master content at website runtime. Do not rely on WeChat image URLs as permanent website assets. Reuse the existing site instead of creating another blog/CMS.

## Recommended Metadata

Each article should support:

- id
- slug
- title
- date
- summary
- type
- category
- mood
- topics
- cover
- source
- featured

Example:

```json
{
  "id": "city-did-not-stop",
  "slug": "city-did-not-stop",
  "title": "他倒下去的时候，城市没有停",
  "date": "2026-05-05",
  "type": "essay",
  "category": "reflection",
  "mood": ["urban", "melancholic", "modernity"],
  "topics": ["city", "technology", "loneliness"],
  "source": {
    "platform": "website",
    "wechatUrl": null,
    "syncMode": "wechat-draft-export"
  },
  "cover": "/content/writing/city-did-not-stop/cover.webp",
  "featured": true
}
```

## Validation

Writing content should pass:

```bash
npm run content:validate
```

Use optional English article files only when translation is ready. Missing English Markdown can remain a warning while the site is still single-language-first.
