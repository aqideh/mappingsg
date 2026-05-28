create extension if not exists postgis;

create type memory_status as enum ('draft', 'pending_review', 'needs_revision', 'published', 'archived');
create type media_type as enum ('text', 'image', 'audio', 'video');
create type contributor_type as enum ('resident', 'student', 'volunteer', 'organisation', 'curator');

create table memories (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  location_name text not null,
  latitude double precision not null,
  longitude double precision not null,
  geom geography(point, 4326) generated always as (st_setsrid(st_makepoint(longitude, latitude), 4326)::geography) stored,
  address text,
  contributor_name text,
  contributor_type contributor_type not null default 'resident',
  period text,
  status memory_status not null default 'pending_review',
  curator_notes text,
  can_publish boolean not null default false,
  can_show_contributor_name boolean not null default false,
  contains_identifiable_people boolean not null default false,
  rights_confirmed boolean not null default false,
  contact_email text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table memory_media (
  id uuid primary key default gen_random_uuid(),
  memory_id uuid not null references memories(id) on delete cascade,
  type media_type not null,
  url text,
  transcript text,
  caption text,
  alt_text text,
  created_at timestamptz not null default now()
);

create table tags (
  id uuid primary key default gen_random_uuid(),
  label text not null unique,
  category text not null default 'theme'
);

create table memory_tags (
  memory_id uuid not null references memories(id) on delete cascade,
  tag_id uuid not null references tags(id) on delete cascade,
  primary key (memory_id, tag_id)
);

create table overlays (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  type text not null,
  source_url text,
  enabled_by_default boolean not null default false,
  created_at timestamptz not null default now()
);

create index memories_geom_idx on memories using gist (geom);
create index memories_status_idx on memories (status);
create index tags_label_idx on tags (label);

alter table memories enable row level security;
alter table memory_media enable row level security;
alter table tags enable row level security;
alter table memory_tags enable row level security;
alter table overlays enable row level security;

create policy public_can_read_published_memories on memories for select using (status = 'published' and can_publish = true and rights_confirmed = true);
create policy public_can_read_media_for_published_memories on memory_media for select using (exists (select 1 from memories where memories.id = memory_media.memory_id and memories.status = 'published' and memories.can_publish = true and memories.rights_confirmed = true));
create policy public_can_read_tags on tags for select using (true);
create policy public_can_read_memory_tags_for_published on memory_tags for select using (exists (select 1 from memories where memories.id = memory_tags.memory_id and memories.status = 'published' and memories.can_publish = true and memories.rights_confirmed = true));
create policy public_can_read_overlays on overlays for select using (true);
