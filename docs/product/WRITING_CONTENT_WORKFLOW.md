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

## Source of Truth

The website should be the canonical long-term archive.

Recommended source model:

- Markdown / MDX article files
- structured metadata
- stable slug
- local or R2-hosted cover assets

WeChat should be treated as a distribution channel, not the canonical archive.

## WeChat Workflow

Preferred flow:

1. Write article in the website content system.
2. Render it for the website.
3. Render a WeChat-compatible HTML version.
4. Create or update a WeChat Official Account draft through API if permissions allow.
5. Review manually in WeChat backend.
6. Publish manually.

Do not auto-publish WeChat articles without review.

## WeChat Import

If an article is first published on WeChat, use import as an assisted workflow only.

Do not dynamically fetch WeChat article content at runtime.

Do not rely on WeChat image URLs as permanent website assets.

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
