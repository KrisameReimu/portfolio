# Cloudflare D1 Community Setup

This guide wires your website community data (users/favorites/comments) to Cloudflare D1.

## 1. Prepare Worker config

1. Copy `cloudflare/community-api/wrangler.toml.example` to `cloudflare/community-api/wrangler.toml`.
2. Replace `database_id` with your D1 database ID.

Example:

```toml
name = "echo-community-api"
main = "src/index.js"
compatibility_date = "2026-02-12"

[[d1_databases]]
binding = "DB"
database_name = "echo-main-db"
database_id = "12cb2541-d8d4-48a2-9a69-db6d1348d554"
```

## 2. Create / Re-run schema

Run from project root:

```bash
npx wrangler d1 execute echo-main-db --file=cloudflare/community-api/schema.sql --config cloudflare/community-api/wrangler.toml
```

For existing databases, always inspect `users` table columns after rerun:

```bash
npx wrangler d1 execute echo-main-db --command "PRAGMA table_info(users);" --config cloudflare/community-api/wrangler.toml
```

If `email` / `role` are missing, run once:

```bash
npx wrangler d1 execute echo-main-db --command "ALTER TABLE users ADD COLUMN email TEXT;" --config cloudflare/community-api/wrangler.toml
npx wrangler d1 execute echo-main-db --command "ALTER TABLE users ADD COLUMN role TEXT NOT NULL DEFAULT 'member';" --config cloudflare/community-api/wrangler.toml
```

## 3. Deploy Worker

```bash
npx wrangler deploy --config cloudflare/community-api/wrangler.toml
```

After deploy, you will get a URL like:

`https://echo-community-api.<subdomain>.workers.dev`

## 4. Frontend integration

The current static Next.js site does not call this Worker, so it has no
frontend environment-variable requirement. If a future client integration is
added, provide its build-time public URL as a `NEXT_PUBLIC_*` variable in the
Next.js app; do not reuse the retired CRA `REACT_APP_*` convention.

## 4.1 (Recommended) Set session signing secret

The Phase-A auth flow uses signed session tokens to harden write APIs.

```bash
npx wrangler secret put SESSION_SIGNING_KEY --config cloudflare/community-api/wrangler.toml
```

Use a long random string as the secret.

## 4.2 Configure admin role mapping by email

Role is now mapped by backend env `ADMIN_EMAILS` (comma-separated).

Example in `cloudflare/community-api/wrangler.toml`:

```toml
[vars]
ADMIN_EMAILS = "you@example.com,backup@example.com"
```

Users in this list receive `role=admin` when creating session tokens.

## 4.3 Configure Google OAuth verification

Set the Google Web Client ID used by GIS:

```toml
[vars]
GOOGLE_CLIENT_ID = "your-google-web-client-id.apps.googleusercontent.com"
```

If a future Next.js client integration needs the Google client ID, expose it
at build time with a narrowly scoped `NEXT_PUBLIC_*` variable instead of the
retired CRA prefix.

## 5. Verify

```bash
curl https://echo-community-api.<subdomain>.workers.dev/health
```

Expected:

```json
{
  "ok": true,
  "service": "community-api",
  "status": "ready",
  "missingConfig": [],
  "missingTables": [],
  "unavailableRequiredCapabilities": [],
  "degradedCapabilities": []
}
```

`/health` returns `503` with `status: "not_ready"` when required
configuration or core interactive tables are missing. If only Site OS content
tables such as `now_snapshots`, `roadmap_items`, or `experiments` are missing,
the endpoint can return `200` with `status: "degraded"` because those read
APIs have built-in default content fallbacks.

## Notes

- Current worker now includes:
  - signed session token endpoint (`POST /auth/session`)
  - Google auth endpoint (`POST /auth/google`) with token verification
  - site OS APIs (`/api/now/latest`, `/api/roadmap`, `/api/experiments`, `/api/dashboard/public`)
  - subscription endpoint (`POST /api/subscribers`)
  - event tracking endpoint (`POST /api/events`)
  - Ask endpoint (`POST /api/ask/query`)
- Google login verification is included; GitHub/QQ/WeChat verification is not included yet.
- This is suitable for MVP persistence and can be hardened later with Turnstile + OAuth verification.
