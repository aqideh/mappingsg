# MappingSG implementation plan

## Purpose

MappingSG is a controlled-curation community archive. The public experience is a map of Singapore containing approved memories. The internal experience is a curation workflow for checking submissions, consent, media, transcripts, tags, and location quality before publication.

## Primary users

1. Public visitors exploring memories by place, theme, and media type.
2. Contributors submitting text, image, or audio memories.
3. Curators reviewing, editing, approving, or archiving submissions.
4. Administrators managing overlays, tag vocabularies, and publication rules.

## MVP modules

### Map explorer

- Singapore-centred map.
- Published memory markers.
- Selected-memory side panel.
- Tag filters.
- Theme filters.
- Media-type filters.
- Overlay toggles.
- Search by keyword, location name, or tag.

### Memory submission

- Title.
- Story text.
- Location name.
- Latitude and longitude from map click or search.
- Optional image upload.
- Optional audio upload.
- Consent and attribution settings.
- Tags and themes.
- Submission status defaults to pending_review.

### Curation queue

- Pending submissions list.
- Detail review screen.
- Edit title, description, location, tags, and transcript.
- Check consent.
- Publish, request revision, archive, or reject.

### Overlays

- Planning areas.
- Heritage sites.
- Community spaces.
- MRT lines or transport context.
- Memory density heatmap later.

## Recommended stack

- React and TypeScript for frontend.
- Vite for local development.
- Leaflet for the MVP map.
- Supabase for database, storage, auth, and role-based access.
- PostGIS for geospatial queries.
- Vercel for frontend deployment.

## Build sequence

1. Static prototype with demo memories.
2. Map explorer and filters.
3. Curation queue using demo pending data.
4. Supabase schema and row-level security.
5. Media upload and storage.
6. Admin authentication and roles.
7. GeoJSON overlays.
8. Accessibility, consent, and archival metadata hardening.

## Publication rule

Only records with status published should be visible in the public map. Draft, pending_review, needs_revision, and archived records should be hidden from public views.
