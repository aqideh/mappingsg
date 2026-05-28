# MappingSG

MappingSG is a community archival tool for curated memories of Singapore. It maps text, image, and audio memories to specific locations, supports tags and filters, and includes togglable map overlays for contextual exploration.

## Product direction

This repository is intended for a controlled-curation workflow rather than an open social posting model.

Core principles:

- Memories are submitted for review before publication.
- Contributors can choose attribution and consent settings.
- Curators can verify locations, tags, transcripts, and media before publishing.
- The public map prioritises respectful discovery, context, and accessibility.

## MVP scope

- Singapore map explorer
- Curated memory markers
- Text, image, and audio memory support
- Tag, theme, status, and media filters
- Toggable contextual overlays
- Submission model for pending review
- Admin curation queue prototype
- Supabase-ready schema direction

## Suggested stack

- React + TypeScript
- Vite
- Leaflet / React Leaflet
- Supabase for database, auth, and media storage
- PostGIS for location queries
- Vercel for deployment

## Development

```bash
npm install
npm run dev
```

## Curation model

Submitted memories should default to `pending_review`. Only approved records should become visible on the public map.

Recommended statuses:

- `draft`
- `pending_review`
- `needs_revision`
- `published`
- `archived`

## Repository status

This is an initial scaffold for the archival mapping product. Replace demo data with Supabase-backed records after the map, filtering, and curation workflows are validated.
