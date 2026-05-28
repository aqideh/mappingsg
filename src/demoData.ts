import type { MemoryRecord, OverlayDefinition } from './types';

export const demoMemories: MemoryRecord[] = [
  {
    id: 'memory-geylang-serai-market',
    title: 'Saturday mornings at Geylang Serai Market',
    description: 'A recollection of following grandparents through the wet market, learning the names of spices, fabrics, and familiar stallholders.',
    locationName: 'Geylang Serai Market',
    latitude: 1.3167,
    longitude: 103.8986,
    media: [
      {
        id: 'media-geylang-text',
        type: 'text',
        transcript: 'The market was where language, food, and family routines met every weekend.'
      }
    ],
    tags: ['market', 'food', 'family', 'intergenerational'],
    themes: ['Everyday life', 'Malay heritage'],
    contributorName: 'Community contributor',
    contributorType: 'resident',
    period: '1990s',
    status: 'published',
    consent: {
      canPublish: true,
      canShowContributorName: false,
      containsIdentifiablePeople: false,
      rightsConfirmed: true
    },
    createdAt: '2026-05-01T09:00:00.000Z',
    updatedAt: '2026-05-01T09:00:00.000Z'
  },
  {
    id: 'memory-queenstown-library',
    title: 'After-school hours at Queenstown Library',
    description: 'A memory about using the public library as a quiet study space and meeting friends before heading home.',
    locationName: 'Queenstown Public Library',
    latitude: 1.2989,
    longitude: 103.8057,
    media: [
      {
        id: 'media-queenstown-audio',
        type: 'audio',
        url: '/demo-media/queenstown-library.mp3',
        transcript: 'We went there because it felt calm. It was not just about books; it was a place to grow up safely.'
      }
    ],
    tags: ['library', 'school', 'youth', 'friendship'],
    themes: ['Learning', 'Public spaces'],
    contributorType: 'student',
    period: '2000s',
    status: 'published',
    consent: {
      canPublish: true,
      canShowContributorName: false,
      containsIdentifiablePeople: false,
      rightsConfirmed: true
    },
    createdAt: '2026-05-02T09:00:00.000Z',
    updatedAt: '2026-05-02T09:00:00.000Z'
  },
  {
    id: 'memory-kampong-glam-pending',
    title: 'Hari Raya visits near Kampong Glam',
    description: 'A submitted memory requiring curator review for family names and image permissions before publication.',
    locationName: 'Kampong Glam',
    latitude: 1.3028,
    longitude: 103.8599,
    media: [
      {
        id: 'media-kampong-image',
        type: 'image',
        url: '/demo-media/kampong-glam-family-photo.jpg',
        caption: 'Family visit photo pending rights confirmation.',
        altText: 'Archival family photo pending review'
      }
    ],
    tags: ['hari raya', 'family', 'faith', 'heritage'],
    themes: ['Festivals', 'Family history'],
    contributorType: 'resident',
    period: '1980s',
    status: 'pending_review',
    curatorNotes: 'Confirm image rights and whether named relatives should be anonymised.',
    consent: {
      canPublish: true,
      canShowContributorName: false,
      containsIdentifiablePeople: true,
      rightsConfirmed: false,
      contactEmail: 'contributor@example.com'
    },
    createdAt: '2026-05-03T09:00:00.000Z',
    updatedAt: '2026-05-03T09:00:00.000Z'
  }
];

export const overlays: OverlayDefinition[] = [
  {
    id: 'planning-areas',
    name: 'Planning areas',
    description: 'Contextual boundary layer for Singapore planning areas.',
    type: 'geojson',
    enabledByDefault: true,
    sourceUrl: '/overlays/planning-areas.geojson'
  },
  {
    id: 'heritage-context',
    name: 'Heritage context',
    description: 'Curated layer for heritage districts, trails, and culturally significant places.',
    type: 'geojson',
    enabledByDefault: false,
    sourceUrl: '/overlays/heritage-context.geojson'
  },
  {
    id: 'memory-density',
    name: 'Memory density',
    description: 'Computed layer showing areas with concentrated published memories.',
    type: 'computed',
    enabledByDefault: false
  }
];
