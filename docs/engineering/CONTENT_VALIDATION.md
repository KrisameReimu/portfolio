# Content Validation

## Existing Command

Use:

```bash
npm run content:validate
```

## Scope

The validation command checks curated JSON and Markdown content before build.

Current checks include:

- article metadata and Markdown presence
- photo, video, and project content records
- project detail index files
- visual asset index records and available asset paths

## When To Run

Run this command when changing:

- `apps/web/public/content/*.json`
- `apps/web/public/content/articles/*`
- `apps/web/public/content/projects/*`
- `apps/web/public/content/visuals/index.json`
- content validation rules in `scripts/validate-content.js`

For broad site changes, use:

```bash
npm run verify
```
