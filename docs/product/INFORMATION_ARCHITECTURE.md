# Information Architecture

## Top-Level Navigation

The site should use a compact top-level navigation:

- Home
- Writing
- Multimedia
- Projects
- About
- Contact

## Core Site Axes

### Writing

Writing owns long-form thinking.

It includes essays, reflections, technical notes, city observations, AI-era commentary, and creative process writing.

Writing should remain a single top-level page. It does not need category sub-routes.

Each article should still have a stable detail route:

- `/writing/:slug`

Categories, moods, and topics should be handled through metadata and filters, not separate navigation pages.

### Multimedia

Multimedia owns visual output.

It is the umbrella for:

- Photos
- Videos
- AI Visuals
- Process / behind-the-scenes

Photos and Videos may remain as direct legacy routes during transition, but the long-term structure should treat them as sub-areas of Multimedia.

Recommended routes:

- `/multimedia`
- `/multimedia/photos`
- `/multimedia/videos`
- `/multimedia/ai-visuals`
- `/multimedia/process`

Legacy-compatible routes may remain:

- `/photos`
- `/videos`

### Projects

Projects owns engineering proof.

It should use case-study structure rather than generic portfolio tiles.

Each project should clearly show:

- role
- problem
- what was built
- tech stack
- outcome / metric
- link / demo / repo if available

### About

About owns identity, credentials, current status, awards, tools, and professional context.

Awards should not need to stay as a permanent top-level navigation item unless the site is being used for academic or job-application emphasis.

Recommended About sub-areas:

- Profile
- Awards
- Now
- Tools / Setup
- Current focus

### Contact

Contact should stay minimal and low-friction.

## Recommended Navigation Evolution

Current:

- Home
- Writing
- Photos
- Videos
- Projects
- Awards
- About
- Contact

Target:

- Home
- Writing
- Multimedia
- Projects
- About
- Contact

## Page Responsibility

| Page | Responsibility |
|---|---|
| Home | Selected identity and entry points |
| Writing | Thought archive and long-form expression |
| Multimedia | Visual work and AI visual experiments |
| Projects | Technical credibility and case studies |
| About | Profile, awards, tools, current status |
| Contact | Contact and professional links |

## Route Policy

Keep stable legacy routes during migration.

Do not delete:

- `/photos`
- `/videos`
- `/awards`

These routes can remain as direct entries or redirect later if needed.

## Anti-Patterns

Do not merge Writing into Multimedia.

Do not merge Projects into a generic portfolio feed.

Do not remove stable article slug routes.

Do not delete `/photos` and `/videos` immediately if they already exist publicly.

Do not make top-level navigation too abstract.
