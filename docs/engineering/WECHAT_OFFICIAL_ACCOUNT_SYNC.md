# WeChat Official Account Draft Sync

## Goal

Allow website-authored Writing articles to be exported into WeChat Official Account drafts.

The website remains the canonical archive.

WeChat is a distribution channel.

## Recommended Workflow

1. Write or edit article in the website content system.
2. Validate writing metadata.
3. Render website article.
4. Render WeChat-compatible HTML.
5. Upload cover image and inline images if API permissions allow.
6. Create or update a WeChat draft.
7. Review manually in WeChat backend.
8. Publish manually.

## Non-Goals

Do not auto-publish WeChat articles.

Do not fetch WeChat content at runtime.

Do not rely on WeChat-hosted images as permanent website assets.

Do not make WeChat the canonical content store.

## Proposed Commands

Future commands may include:

```bash
npm run wechat:render -- <slug>
npm run wechat:sync-draft -- <slug>
npm run wechat:sync-draft -- <slug> --dry-run
```

## Guardrails

Any WeChat integration should:

- use dry-run behavior while the content model is still evolving
- keep website Markdown or structured content as source of truth
- avoid auto-publishing
- keep API credentials outside the frontend bundle
- produce a draft that can be manually reviewed before publication
