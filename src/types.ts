export type MemoryStatus = 'draft' | 'pending_review' | 'needs_revision' | 'published' | 'archived';

export type MediaType = 'text' | 'image' | 'audio' | 'video';

export type ContributorType = 'resident' | 'student' | 'volunteer' | 'organisation' | 'curator';

export interface MediaItem {
  id: string;
  type: MediaType;
  url?: string;
  transcript?: string;
  caption?: string;
  altText?: string;
}

export interface ConsentRecord {
  canPublish: boolean;
  canShowContributorName: boolean;
  containsIdentifiablePeople: boolean;
  rightsConfirmed: boolean;
  contactEmail?: string;
}

export interface MemoryRecord {
  id: string;
  title: string;
  description: string;
  locationName: string;
  latitude: number;
  longitude: number;
  address?: string;
  media: MediaItem[];
  tags: string[];
  themes: string[];
  contributorName?: string;
  contributorType: ContributorType;
  period?: string;
  status: MemoryStatus;
  curatorNotes?: string;
  consent: ConsentRecord;
  createdAt: string;
  updatedAt: string;
}

export interface OverlayDefinition {
  id: string;
  name: string;
  description: string;
  type: 'geojson' | 'tile' | 'marker-group' | 'computed';
  enabledByDefault: boolean;
  sourceUrl?: string;
}
