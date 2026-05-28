import { useMemo, useState } from 'react';
import { Layers, MapPin, Search, ShieldCheck, SlidersHorizontal } from 'lucide-react';
import type { MediaType, MemoryRecord, MemoryStatus } from './types';
import { demoMemories, overlays } from './demoData';
import './styles.css';

const singaporeCenter = { lat: 1.3521, lng: 103.8198 };

function unique(values: string[]) {
  return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b));
}

function statusLabel(status: MemoryStatus) {
  return status.replace('_', ' ');
}

function mediaTypesFor(memory: MemoryRecord) {
  return unique(memory.media.map((item) => item.type));
}

function MemoryCard({ memory, selected, onSelect }: { memory: MemoryRecord; selected: boolean; onSelect: () => void }) {
  return (
    <button className={`memory-card ${selected ? 'selected' : ''}`} onClick={onSelect}>
      <div className="memory-card-header">
        <span className={`status-pill ${memory.status}`}>{statusLabel(memory.status)}</span>
        <span className="period">{memory.period ?? 'Period unknown'}</span>
      </div>
      <h3>{memory.title}</h3>
      <p>{memory.description}</p>
      <div className="meta-line"><MapPin size={14} /> {memory.locationName}</div>
      <div className="tag-row">
        {memory.tags.slice(0, 4).map((tag) => <span key={tag}>{tag}</span>)}
      </div>
    </button>
  );
}

function DetailPanel({ memory }: { memory: MemoryRecord }) {
  return (
    <aside className="detail-panel">
      <div className="detail-heading">
        <span className={`status-pill ${memory.status}`}>{statusLabel(memory.status)}</span>
        <span>{memory.contributorType}</span>
      </div>
      <h2>{memory.title}</h2>
      <p className="location"><MapPin size={16} /> {memory.locationName}</p>
      <p>{memory.description}</p>

      <section>
        <h4>Media</h4>
        {memory.media.map((item) => (
          <div className="media-box" key={item.id}>
            <strong>{item.type}</strong>
            {item.caption && <p>{item.caption}</p>}
            {item.transcript && <p>{item.transcript}</p>}
            {item.url && <p className="muted">Asset path: {item.url}</p>}
          </div>
        ))}
      </section>

      <section>
        <h4>Tags and themes</h4>
        <div className="tag-row wrap">
          {[...memory.themes, ...memory.tags].map((tag) => <span key={tag}>{tag}</span>)}
        </div>
      </section>

      <section className="consent-box">
        <h4><ShieldCheck size={16} /> Curation checks</h4>
        <ul>
          <li>Publish consent: {memory.consent.canPublish ? 'yes' : 'no'}</li>
          <li>Rights confirmed: {memory.consent.rightsConfirmed ? 'yes' : 'no'}</li>
          <li>Identifiable people: {memory.consent.containsIdentifiablePeople ? 'yes' : 'no'}</li>
        </ul>
        {memory.curatorNotes && <p className="curator-note">Curator note: {memory.curatorNotes}</p>}
      </section>
    </aside>
  );
}

export default function App() {
  const [query, setQuery] = useState('');
  const [activeTag, setActiveTag] = useState('all');
  const [activeMedia, setActiveMedia] = useState<MediaType | 'all'>('all');
  const [showCuration, setShowCuration] = useState(false);
  const [enabledOverlays, setEnabledOverlays] = useState(() => new Set(overlays.filter((overlay) => overlay.enabledByDefault).map((overlay) => overlay.id)));
  const [selectedId, setSelectedId] = useState(demoMemories[0]?.id ?? '');

  const tags = useMemo(() => unique(demoMemories.flatMap((memory) => [...memory.tags, ...memory.themes])), []);

  const filteredMemories = useMemo(() => {
    const lowerQuery = query.trim().toLowerCase();
    return demoMemories.filter((memory) => {
      const isVisibleStatus = showCuration ? true : memory.status === 'published';
      const matchesQuery = !lowerQuery || [memory.title, memory.description, memory.locationName, ...memory.tags, ...memory.themes].join(' ').toLowerCase().includes(lowerQuery);
      const matchesTag = activeTag === 'all' || memory.tags.includes(activeTag) || memory.themes.includes(activeTag);
      const matchesMedia = activeMedia === 'all' || memory.media.some((item) => item.type === activeMedia);
      return isVisibleStatus && matchesQuery && matchesTag && matchesMedia;
    });
  }, [activeMedia, activeTag, query, showCuration]);

  const selectedMemory = filteredMemories.find((memory) => memory.id === selectedId) ?? filteredMemories[0] ?? demoMemories[0];

  function toggleOverlay(id: string) {
    setEnabledOverlays((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <main className="app-shell">
      <section className="sidebar">
        <header>
          <p className="eyebrow">Controlled community archive</p>
          <h1>MappingSG</h1>
          <p>Curate and explore Singapore memories by place, theme, media type, and archival readiness.</p>
        </header>

        <div className="search-box">
          <Search size={16} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search memories, places, tags" />
        </div>

        <div className="filter-group">
          <label><SlidersHorizontal size={16} /> Tag or theme</label>
          <select value={activeTag} onChange={(event) => setActiveTag(event.target.value)}>
            <option value="all">All tags and themes</option>
            {tags.map((tag) => <option value={tag} key={tag}>{tag}</option>)}
          </select>
        </div>

        <div className="filter-group">
          <label>Media type</label>
          <select value={activeMedia} onChange={(event) => setActiveMedia(event.target.value as MediaType | 'all')}>
            <option value="all">All media</option>
            <option value="text">Text</option>
            <option value="image">Image</option>
            <option value="audio">Audio</option>
            <option value="video">Video</option>
          </select>
        </div>

        <label className="curation-toggle">
          <input type="checkbox" checked={showCuration} onChange={(event) => setShowCuration(event.target.checked)} />
          Show curation queue records
        </label>

        <section className="overlay-panel">
          <h2><Layers size={16} /> Map overlays</h2>
          {overlays.map((overlay) => (
            <label key={overlay.id}>
              <input type="checkbox" checked={enabledOverlays.has(overlay.id)} onChange={() => toggleOverlay(overlay.id)} />
              <span><strong>{overlay.name}</strong>{overlay.description}</span>
            </label>
          ))}
        </section>

        <section className="memory-list">
          <h2>{filteredMemories.length} visible memories</h2>
          {filteredMemories.map((memory) => (
            <MemoryCard key={memory.id} memory={memory} selected={selectedMemory?.id === memory.id} onSelect={() => setSelectedId(memory.id)} />
          ))}
        </section>
      </section>

      <section className="map-area">
        <div className="map-placeholder" aria-label="Prototype map of Singapore">
          <div className="map-grid" />
          <div className="map-label">Singapore archival map prototype</div>
          {filteredMemories.map((memory) => {
            const x = 50 + (memory.longitude - singaporeCenter.lng) * 180;
            const y = 50 - (memory.latitude - singaporeCenter.lat) * 260;
            return (
              <button
                key={memory.id}
                className={`map-marker ${selectedMemory?.id === memory.id ? 'active' : ''}`}
                style={{ left: `${Math.max(8, Math.min(92, x))}%`, top: `${Math.max(8, Math.min(92, y))}%` }}
                onClick={() => setSelectedId(memory.id)}
                title={memory.title}
              >
                <MapPin size={20} />
              </button>
            );
          })}
          <div className="active-overlays">Active overlays: {Array.from(enabledOverlays).join(', ') || 'none'}</div>
        </div>
        {selectedMemory && <DetailPanel memory={selectedMemory} />}
      </section>
    </main>
  );
}
