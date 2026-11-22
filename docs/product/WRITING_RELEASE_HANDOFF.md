# Import a reviewed writing release from AI-Multimedia

**Status:** v1 local importer in PR; **not** a Google Drive sync, CMS, or automatic deployment. Full production publication remains gated on author approval and a separate portfolio content PR.

The companion production repository is [AI-Multimedia](https://github.com/KrisameReimu/AI-Multimedia), which defines the [full source-safe release protocol](https://github.com/KrisameReimu/AI-Multimedia/blob/main/workflows/editorial/portfolio-handoff.md) and prepares `echo-writing-portfolio-handoff/v1` JSON from an author-reviewed website Markdown snapshot and a private approval manifest.

## Boundaries

- **Editable authoring original:** private Google Docs Master + Writing Index.
- **Publication producer:** private AI-Multimedia; its approval manifest stays private.
- **Published snapshot:** this public Next.js website using `apps/web/public/content/index.json` and `apps/web/public/content/articles/<id>.zh.md`.
- **Website publication:** explicit review of a portfolio content PR; build and deploy only after approval.
- **WeChat draft:** handled by a separate, on-demand Make scenario. A successful draft is **not** a published article and does not trigger this importer.

## First-run procedure

1. Review the handoff JSON *before* importing. Confirm intended title, approved public text, publication date, public cover, attribution/rights, and `slug`. Do not place private Google Doc IDs or `release.json` in the public checkout.
2. Run **read-only preflight** from the portfolio repo root:

   ```bash
   node scripts/import-writing-handoff.js --input /private/portfolio-handoff.json
   ```

3. Only after approval, write to the current *local* checkout (not a Git commit):

   ```bash
   node scripts/import-writing-handoff.js --input /private/portfolio-handoff.json --apply
   npm run content:validate
   npm run verify
   git diff -- apps/web/public/content/index.json apps/web/public/content/articles/
   ```

4. Review the actual content and mobile preview; open a new **portfolio** PR for author review. Never merge based only on a passing JSON validation.
5. Confirm production site URL is live before updating the private Writing Index `portfolio_url` / Published status. Keep WeChat status separate.

## Idempotency and safety

- v1 explicitly **rejects** an existing `entry.id`, an existing public `slug`, an existing article Markdown file, mismatched SHA-256, unknown handoff format, unsupported metadata fields, invalid dates, unsafe cover links, and private Google Drive links in the public payload.
- `--apply` is required for any local changes, and the importer **does not** commit, push, deploy, create PRs, or edit Google Drive. Re-runs of an already imported release are rejected.
- It supports **new articles only**. Existing published work must use a separately approved editorial update workflow; do not overwrite existing published copy automatically.
- The local two-file write is not a transactional deployment; after interruption, inspect git diff and reconcile before retrying.
- Important: `author_approved`, `rights_confirmed` and `publication_date_verified` are author decisions verified by the **private** generator; the public handoff intentionally does not contain internal approval or source IDs.

## Checks

```bash
node --test tests/import-writing-handoff.test.js
npm run content:validate
npm run verify
```

The build validates the existing site. It does **not** validate the truth of dates, source attribution, copyright, whether an article is publicly released, or the visual aesthetics; those need separate author review. The website should never dynamically pull private Google Docs at runtime.
