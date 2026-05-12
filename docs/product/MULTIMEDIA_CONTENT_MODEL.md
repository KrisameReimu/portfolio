# Multimedia Content Model

## Direction

Multimedia is the umbrella for visual output.

It includes:

- Photos
- Videos
- AI Visuals
- Process / behind-the-scenes

Photos and Videos should remain distinct content types, but they can share one Multimedia overview.

## Recommended Routes

- `/multimedia`
- `/multimedia/photos`
- `/multimedia/videos`
- `/multimedia/ai-visuals`
- `/multimedia/process`

Legacy direct routes may remain:

- `/photos`
- `/videos`

## Content Types

### Photos

Real-world still photography.

Suitable for:

- street photography
- travel photography
- drone stills
- device-shot visual records
- photo series

### Videos

Real-world or edited motion work.

Suitable for:

- video edits
- drone clips
- cinematic reels
- short visual stories
- YouTube / Instagram video embeds

### AI Visuals

Generated or AI-assisted visual work.

Suitable for:

- AI images
- AI videos
- poster experiments
- cover concepts
- visual identity experiments

### Process

Behind-the-scenes and production notes.

Suitable for:

- tools
- prompt notes
- editing workflow
- device setup
- before / after comparisons

## Recommended Fields

Each media item should support:

- id
- title
- medium
- source
- date
- location
- series
- tags
- cover
- description
- device
- tools
- featured

## Medium Values

Recommended values:

- `photo`
- `video`
- `ai-image`
- `ai-video`
- `mixed-media`
- `process`

## Source Values

Recommended values:

- `camera`
- `drone`
- `insta360`
- `ai-generated`
- `ai-assisted`
- `edited`
- `composite`

## Recommended Content Transition

Current content can remain:

- `public/content/photos.json`
- `public/content/videos.json`

New umbrella content can be added later:

- `public/content/multimedia/index.json`
- `public/content/multimedia/ai-visuals.json`
- `public/content/multimedia/process.json`

Do not migrate all legacy content at once.

## Design Direction

Multimedia overview should be visual-first.

Photos should use gallery minimalism.

Videos should use cinematic cards.

AI Visuals may use more experimental framing, but should not break the overall site identity.

## Anti-Patterns

Do not mix all media types into an undifferentiated feed.

Do not let AI visuals visually dominate real photography.

Do not delete `/photos` and `/videos` immediately if they are already public.

Do not make Multimedia look like Projects.
