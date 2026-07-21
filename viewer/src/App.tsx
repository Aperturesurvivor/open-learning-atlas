import { useEffect, useMemo, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import {
  ArrowLeft,
  Check,
  ChevronDown,
  CircleHelp,
  Copy,
  Database,
  ExternalLink,
  Filter,
  Focus,
  GitFork,
  Info,
  Link2,
  Menu,
  Minus,
  Plus,
  Search,
  Share2,
  X,
} from 'lucide-react'
import {
  buildIndex,
  graphForSelection,
  hashForEdge,
  hashForNode,
  layoutGraph,
  loadAtlas,
  nodeTypeLabel,
  pathToRoot,
  relationLabel,
  routeFromHash,
  searchNodes,
  structuralChildren,
} from './atlas'
import type { AtlasIndex } from './atlas'
import type { AtlasEdge, AtlasNode, AtlasRelease, GraphView, NodeKind, PositionedNode } from './types'

const REPOSITORY = 'https://github.com/Aperturesurvivor/open-learning-atlas'
const DATA_URL = `${import.meta.env.BASE_URL}data/mathematics-v0.2.0-alpha.json`
const nodeKinds: NodeKind[] = ['capability', 'concept', 'knowledge', 'representation', 'practice', 'composite']

const kindColors: Record<NodeKind, string> = {
  capability: '#2367d8',
  concept: '#159e9a',
  knowledge: '#d48916',
  representation: '#8358bf',
  practice: '#e06d58',
  composite: '#657287',
}

const regionColors = ['#155eef', '#159e9a', '#8358bf', '#e06d58', '#d48916', '#3c7b66', '#657287', '#a34f83', '#3879a8', '#a05c35', '#4369a4', '#7b7041', '#52647d']

function NetworkMark({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" className="network-mark">
      <path d="M7 8.5 15 5l9 5.5-1 10L14 27l-8-5.5Z" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="m7 8.5 8 7.5L24 10.5M15 5v11l-1 11m-8-5.5 9-5.5 8 4.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
      {[['7','8.5'], ['15','5'], ['24','10.5'], ['23','20.5'], ['14','27'], ['6','21.5'], ['15','16']].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2.1" fill="currentColor" />
      ))}
    </svg>
  )
}

function KindDot({ kind }: { kind: NodeKind }) {
  return <span className="kind-dot" style={{ '--kind-color': kindColors[kind] } as CSSProperties} aria-hidden="true" />
}

interface SearchBoxProps {
  release: AtlasRelease
  onSelect: (id: string) => void
  onAfterSelect?: () => void
}

function SearchBox({ release, onSelect, onAfterSelect }: SearchBoxProps) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const results = useMemo(() => searchNodes(query, release), [query, release])

  const choose = (id: string) => {
    onSelect(id)
    onAfterSelect?.()
    setQuery('')
    setOpen(false)
  }

  return (
    <div className="search-wrap">
      <Search size={19} aria-hidden="true" />
      <input
        type="search"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value)
          setOpen(true)
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={(event) => {
          if (event.key === 'Escape') setOpen(false)
          if (event.key === 'Enter' && results[0]) choose(results[0].id)
        }}
        placeholder="Search the atlas"
        aria-label="Search the atlas"
        aria-expanded={open && results.length > 0}
      />
      {query && (
        <button type="button" className="clear-search" onClick={() => setQuery('')} aria-label="Clear search">
          <X size={16} />
        </button>
      )}
      {open && query.trim() && (
        <div className="search-results" role="listbox" aria-label="Atlas search results">
          {results.length ? results.map((node) => (
            <button key={node.id} type="button" role="option" aria-selected="false" onClick={() => choose(node.id)}>
              <KindDot kind={node.kind} />
              <span>
                <strong>{node.label}</strong>
                <small>{nodeTypeLabel(node)}</small>
              </span>
            </button>
          )) : <p>No matching atlas records.</p>}
        </div>
      )}
    </div>
  )
}

interface NavigationProps {
  release: AtlasRelease
  index: AtlasIndex
  selectedId: string
  onSelect: (id: string) => void
  mobile?: boolean
  onClose?: () => void
}

function Navigation({ release, index, selectedId, onSelect, mobile, onClose }: NavigationProps) {
  const regions = structuralChildren(index.root.id, index)
  const path = pathToRoot(selectedId, index)
  const activeRegion = path.find((node) => node.subtype === 'atlas-region')?.id

  return (
    <aside className={`navigation ${mobile ? 'navigation-mobile' : ''}`} aria-label="Atlas navigation">
      {mobile && (
        <div className="mobile-panel-title">
          <span>Navigate the atlas</span>
          <button type="button" className="icon-button" onClick={onClose} aria-label="Close navigation"><X size={20} /></button>
        </div>
      )}
      <SearchBox release={release} onSelect={onSelect} onAfterSelect={onClose} />
      <div className="navigation-heading">
        <span>Regions</span>
        <span>{regions.length}</span>
      </div>
      <nav className="region-list">
        {regions.map((region, indexValue) => (
          <button
            type="button"
            key={region.id}
            className={activeRegion === region.id ? 'active' : ''}
            onClick={() => {
              onSelect(region.id)
              onClose?.()
            }}
          >
            <span className="region-mark" style={{ '--region-color': regionColors[indexValue % regionColors.length] } as CSSProperties}>
              {indexValue + 1}
            </span>
            <span>
              <strong>{region.label}</strong>
              <small>{structuralChildren(region.id, index).length} territories</small>
            </span>
          </button>
        ))}
      </nav>
      <div className="base-map-note">
        <Info size={17} />
        <p><strong>Canonical base map</strong><br />No curriculum, project route, or learner record is applied.</p>
      </div>
    </aside>
  )
}

function splitLabel(label: string): [string, string?] {
  if (label.length <= 24) return [label]
  const words = label.split(' ')
  let first = ''
  while (words.length && `${first} ${words[0]}`.trim().length <= 24) first = `${first} ${words.shift()}`.trim()
  return [first || label.slice(0, 22), words.join(' ')]
}

function colorForNode(positioned: PositionedNode, view: GraphView) {
  if (view.mode === 'overview' && positioned.level > 0) {
    const index = view.nodes.filter((node) => node.id !== view.centerId).findIndex((node) => node.id === positioned.node.id)
    return regionColors[index % regionColors.length]
  }
  return kindColors[positioned.node.kind]
}

interface AtlasMapProps {
  view: GraphView
  selectedId: string
  onSelect: (id: string) => void
  activeKinds: Set<NodeKind>
  onToggleFilters: () => void
  filterOpen: boolean
  onResetKinds: () => void
  onToggleKind: (kind: NodeKind) => void
  onOverview: () => void
}

function AtlasMap({ view, selectedId, onSelect, activeKinds, onToggleFilters, filterOpen, onResetKinds, onToggleKind, onOverview }: AtlasMapProps) {
  const [scale, setScale] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [compact, setCompact] = useState(() => window.matchMedia('(max-width: 620px)').matches)
  const drag = useRef<{ pointerId: number; x: number; y: number; originX: number; originY: number } | undefined>(undefined)
  const graphWidth = compact ? 720 : 1000
  const graphHeight = compact ? 600 : 720
  const positions = useMemo(() => layoutGraph(view, graphWidth, graphHeight), [view, graphWidth, graphHeight])
  const visiblePositions = positions.filter((position) => position.node.id === selectedId || activeKinds.size === 0 || activeKinds.has(position.node.kind))
  const positionById = new Map(visiblePositions.map((position) => [position.node.id, position]))
  const edges = view.edges.filter((edge) => positionById.has(edge.subject) && positionById.has(edge.object))
  const resetViewport = () => {
    setScale(1)
    setPan({ x: 0, y: 0 })
  }

  useEffect(resetViewport, [view.centerId])
  useEffect(() => {
    const media = window.matchMedia('(max-width: 620px)')
    const sync = () => setCompact(media.matches)
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])

  return (
    <section className="map-panel" aria-label="Interactive atlas map">
      <div className="map-toolbar">
        <div className="mode-label">
          <span>{view.mode === 'overview' ? 'Atlas overview' : view.mode === 'region' ? 'Region view' : 'Local neighborhood'}</span>
          <small>{visiblePositions.length} records · {edges.length} visible relationships</small>
        </div>
        <div className="toolbar-actions">
          {view.mode !== 'overview' && <button type="button" onClick={onOverview}><ArrowLeft size={16} /> Overview</button>}
          <div className="filter-anchor">
            <button type="button" onClick={onToggleFilters} aria-expanded={filterOpen} className={activeKinds.size ? 'filter-active' : ''}>
              <Filter size={16} /> Filter {activeKinds.size ? `(${activeKinds.size})` : ''}<ChevronDown size={14} />
            </button>
            {filterOpen && (
              <div className="filter-popover">
                <div><strong>Record kinds</strong><button type="button" onClick={onResetKinds}>Reset</button></div>
                {nodeKinds.map((kind) => (
                  <label key={kind}>
                    <input type="checkbox" checked={activeKinds.has(kind)} onChange={() => onToggleKind(kind)} />
                    <KindDot kind={kind} /><span>{kind}</span>{activeKinds.has(kind) && <Check size={14} />}
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="map-canvas">
        <svg
          viewBox={`0 0 ${graphWidth} ${graphHeight}`}
          role="group"
          aria-label={`${view.mode} containing ${visiblePositions.length} atlas records`}
          onWheel={(event) => {
            event.preventDefault()
            setScale((value) => Math.min(2.15, Math.max(0.65, value - event.deltaY * 0.001)))
          }}
          onPointerDown={(event) => {
            if ((event.target as Element).closest('.map-node')) return
            event.currentTarget.setPointerCapture(event.pointerId)
            drag.current = { pointerId: event.pointerId, x: event.clientX, y: event.clientY, originX: pan.x, originY: pan.y }
          }}
          onPointerMove={(event) => {
            if (!drag.current || drag.current.pointerId !== event.pointerId) return
            setPan({ x: drag.current.originX + event.clientX - drag.current.x, y: drag.current.originY + event.clientY - drag.current.y })
          }}
          onPointerUp={() => { drag.current = undefined }}
        >
          <g transform={`translate(${pan.x} ${pan.y}) translate(${graphWidth / 2 * (1 - scale)} ${graphHeight / 2 * (1 - scale)}) scale(${scale})`}>
            <g className="map-edges">
              {edges.map((edge) => {
                const subject = positionById.get(edge.subject)!
                const object = positionById.get(edge.object)!
                return (
                  <line
                    key={edge.id}
                    x1={subject.x}
                    y1={subject.y}
                    x2={object.x}
                    y2={object.y}
                    className={edge.relation === 'composed_of' ? 'structural-edge' : 'semantic-edge'}
                  >
                    <title>{`${subject.node.label} — ${relationLabel(edge.relation)} → ${object.node.label}`}</title>
                  </line>
                )
              })}
            </g>
            <g className="map-nodes">
              {visiblePositions.map((position) => {
                const selected = position.node.id === selectedId
                const center = position.level === 0
                const radius = center ? (compact ? 43 : 39) : (compact ? 23 : 18)
                const [lineOne, lineTwo] = splitLabel(position.node.label)
                const color = colorForNode(position, view)
                return (
                  <g
                    key={position.node.id}
                    className={`map-node ${selected ? 'selected' : ''}`}
                    transform={`translate(${position.x} ${position.y})`}
                    role="button"
                    tabIndex={0}
                    aria-label={`${position.node.label}, ${nodeTypeLabel(position.node)}, ${position.node.status}`}
                    onClick={() => onSelect(position.node.id)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault()
                        onSelect(position.node.id)
                      }
                    }}
                  >
                    {selected && <circle r={radius + 8} fill="none" stroke={color} strokeWidth="2" opacity=".35" />}
                    <circle r={radius} fill={center ? color : '#fff'} stroke={color} strokeWidth={selected ? 3 : 2} />
                    <circle r={center ? 9 : 5.5} fill={center ? '#fff' : color} />
                    {center && <circle r="2.5" cx="-12" cy="7" fill="#fff" opacity=".9" />}
                    {center && <circle r="2.5" cx="13" cy="-8" fill="#fff" opacity=".9" />}
                    <text y={radius + 22} textAnchor="middle" className={center ? 'center-label' : ''}>
                      <tspan x="0">{lineOne}</tspan>
                      {lineTwo && <tspan x="0" dy="16">{lineTwo}</tspan>}
                    </text>
                  </g>
                )
              })}
            </g>
          </g>
        </svg>
        <div className="zoom-controls" aria-label="Map zoom controls">
          <button type="button" onClick={() => setScale((value) => Math.min(2.15, value + 0.18))} aria-label="Zoom in"><Plus size={18} /></button>
          <button type="button" onClick={() => setScale((value) => Math.max(0.65, value - 0.18))} aria-label="Zoom out"><Minus size={18} /></button>
          <button type="button" onClick={resetViewport} aria-label="Fit map"><Focus size={18} /></button>
        </div>
        <div className="map-legend" aria-label="Relationship legend">
          <span><i className="solid-line" /> composition</span>
          <span><i className="dashed-line" /> semantic use</span>
        </div>
      </div>
    </section>
  )
}

interface InspectorProps {
  node: AtlasNode
  index: AtlasIndex
  onSelect: (id: string) => void
  selectedEdgeId?: string
  onSelectEdge: (id: string) => void
  onCloseEdge: () => void
  tab: 'overview' | 'relationships'
  onTab: (tab: 'overview' | 'relationships') => void
  mobile?: boolean
  expanded?: boolean
  onToggleExpanded?: () => void
}

interface RelationRowProps {
  edge: AtlasEdge
  direction: 'incoming' | 'outgoing'
  index: AtlasIndex
  expanded: boolean
  onSelect: (id: string) => void
  onSelectEdge: (id: string) => void
  onCloseEdge: () => void
}

function RelationRow({ edge, direction, index, expanded, onSelect, onSelectEdge, onCloseEdge }: RelationRowProps) {
  const otherId = direction === 'incoming' ? edge.subject : edge.object
  const other = index.nodes.get(otherId)
  const subject = index.nodes.get(edge.subject)
  const object = index.nodes.get(edge.object)
  const sources = edge.source_ids.map((id) => index.sources.get(id)).filter(Boolean)
  if (!other || !subject || !object) return null

  const copyLink = async () => {
    const url = new URL(window.location.href)
    url.hash = hashForEdge(edge.id)
    await navigator.clipboard.writeText(url.toString())
  }

  return (
    <article className={`relation-claim ${expanded ? 'expanded' : ''}`}>
      <button
        type="button"
        className="relation-row"
        aria-expanded={expanded}
        onClick={() => expanded ? onCloseEdge() : onSelectEdge(edge.id)}
      >
        <span className="relation-direction">{direction === 'incoming' ? '←' : '→'}</span>
        <span><small>{relationLabel(edge.relation)}</small><strong>{other.label}</strong></span>
        <ChevronDown size={14} aria-hidden="true" />
      </button>
      {expanded && (
        <div className="relation-detail">
          <p className="claim-sentence">
            <strong>{subject.label}</strong>
            <span>{relationLabel(edge.relation)} →</span>
            <strong>{object.label}</strong>
          </p>
          <section>
            <h3>Rationale</h3>
            <p>{edge.rationale}</p>
          </section>
          <section>
            <h3>Conditions</h3>
            {edge.conditions?.length
              ? <ul>{edge.conditions.map((condition) => <li key={condition}>{condition}</li>)}</ul>
              : <p>No additional conditions are stated for this claim.</p>}
          </section>
          {edge.scope && <section><h3>Scope</h3><p>{edge.scope}</p></section>}
          <dl className="edge-details">
            <div><dt>Status</dt><dd>{edge.status}</dd></div>
            <div><dt>Confidence</dt><dd>{edge.confidence}</dd></div>
            <div><dt>Evidence</dt><dd>{edge.evidence_strength}</dd></div>
            {edge.dependency_kind && <div><dt>Dependency kind</dt><dd>{relationLabel(edge.dependency_kind)}</dd></div>}
            <div><dt>Claim basis</dt><dd>{edge.claim_basis.map(relationLabel).join(', ') || 'Not stated'}</dd></div>
            <div><dt>Revision</dt><dd>{edge.revision}</dd></div>
            <div><dt>Stable identity</dt><dd><code>{edge.id}</code></dd></div>
          </dl>
          {edge.status === 'candidate' && <p className="candidate-explanation">Candidate relationship: this claim is provisional and awaits final human review.</p>}
          {edge.review_notes && <section className="edge-review-note"><h3>Review note</h3><p>{edge.review_notes}</p></section>}
          <section>
            <h3>Provenance</h3>
            <div className="edge-sources">
              {sources.length ? sources.map((source) => source && (
                <div key={source.id}>
                  {source.url ? <a href={source.url} target="_blank" rel="noreferrer">{source.title}<ExternalLink size={12} /></a> : <strong>{source.title}</strong>}
                  <p>{source.citation}</p>
                  <code>{source.id}</code>
                </div>
              )) : <p>No source records are attached to this claim.</p>}
            </div>
          </section>
          <div className="edge-actions">
            <button type="button" onClick={() => onSelect(other.id)}>Open linked record</button>
            <button type="button" onClick={copyLink}><Copy size={14} /> Copy relationship link</button>
          </div>
        </div>
      )}
    </article>
  )
}

function Inspector({ node, index, onSelect, selectedEdgeId, onSelectEdge, onCloseEdge, tab, onTab, mobile, expanded, onToggleExpanded }: InspectorProps) {
  const outgoing = index.outgoing.get(node.id) ?? []
  const incoming = index.incoming.get(node.id) ?? []
  const sources = node.source_ids.map((id) => index.sources.get(id)).filter(Boolean)
  const copyLink = async () => {
    const url = new URL(window.location.href)
    url.hash = selectedEdgeId ? hashForEdge(selectedEdgeId) : hashForNode(node.id)
    await navigator.clipboard.writeText(url.toString())
  }

  return (
    <aside className={`inspector ${mobile ? 'inspector-mobile' : ''} ${expanded ? 'expanded' : ''}`} aria-label={`Inspector for ${node.label}`}>
      {mobile && (
        <button type="button" className="sheet-handle" onClick={onToggleExpanded} aria-label={expanded ? 'Collapse inspector' : 'Expand inspector'}>
          <span />
        </button>
      )}
      <div className="inspector-scroll">
        <div className="inspector-heading">
          <div className="selected-mark" style={{ '--selected-color': kindColors[node.kind] } as CSSProperties}>
            <KindDot kind={node.kind} />
          </div>
          <div>
            <h1>{node.label}</h1>
            <div className="chips">
              <span>{nodeTypeLabel(node)}</span>
              <span className="candidate-chip">{node.status}</span>
            </div>
            {node.status === 'candidate' && <p className="candidate-explanation">Provisional record; awaits final human review.</p>}
          </div>
        </div>
        <div className="inspector-tabs" role="tablist">
          <button type="button" role="tab" aria-selected={tab === 'overview'} onClick={() => onTab('overview')}>Overview</button>
          <button type="button" role="tab" aria-selected={tab === 'relationships'} onClick={() => onTab('relationships')}>Relationships <span>{incoming.length + outgoing.length}</span></button>
        </div>
        {tab === 'overview' ? (
          <div className="inspector-content">
            <p className="definition">{node.definition}</p>
            {node.capability_statement && (
              <section>
                <h2>Observable capability</h2>
                <p>{node.capability_statement}</p>
              </section>
            )}
            {node.scope && (
              <section>
                <h2>Scope</h2>
                <p>{node.scope}</p>
              </section>
            )}
            <dl className="record-details">
              <div><dt>Kind</dt><dd><KindDot kind={node.kind} /> {node.kind}</dd></div>
              <div><dt>Confidence</dt><dd>{node.confidence}</dd></div>
              <div><dt>Assessable</dt><dd>{node.assessable ? 'Yes' : 'No'}</dd></div>
              {node.dependency_review && <div><dt>Dependency review</dt><dd>{node.dependency_review}</dd></div>}
              <div><dt>Stable identity</dt><dd><code>{node.id}</code></dd></div>
            </dl>
            {node.review_notes && (
              <section className="review-note">
                <h2><CircleHelp size={16} /> Review note</h2>
                <p>{node.review_notes}</p>
              </section>
            )}
            <section>
              <h2>Provenance</h2>
              <div className="source-list">
                {sources.map((source) => source && (
                  source.url ? <a key={source.id} href={source.url} target="_blank" rel="noreferrer">{source.title}<ExternalLink size={13} /></a>
                    : <span key={source.id}>{source.title}</span>
                ))}
              </div>
            </section>
          </div>
        ) : (
          <div className="inspector-content">
            <p className="relationship-help">Arrows show whether the selected record is the subject or object of the canonical claim. Expand a claim to inspect its rationale, conditions, evidence, and provenance.</p>
            <section>
              <h2>Outgoing <span>{outgoing.length}</span></h2>
              <div className="relations-list">{outgoing.map((edge) => <RelationRow key={edge.id} edge={edge} direction="outgoing" index={index} expanded={selectedEdgeId === edge.id} onSelect={onSelect} onSelectEdge={onSelectEdge} onCloseEdge={onCloseEdge} />)}</div>
            </section>
            <section>
              <h2>Incoming <span>{incoming.length}</span></h2>
              <div className="relations-list">{incoming.map((edge) => <RelationRow key={edge.id} edge={edge} direction="incoming" index={index} expanded={selectedEdgeId === edge.id} onSelect={onSelect} onSelectEdge={onSelectEdge} onCloseEdge={onCloseEdge} />)}</div>
            </section>
          </div>
        )}
      </div>
      <div className="inspector-actions">
        <button type="button" onClick={copyLink}><Copy size={16} /> {selectedEdgeId ? 'Copy relationship link' : 'Copy deep link'}</button>
        <a href={DATA_URL} target="_blank" rel="noreferrer"><Database size={16} /> Open data <ExternalLink size={13} /></a>
      </div>
    </aside>
  )
}

function Header({ onMenu, onShare }: { onMenu: () => void; onShare: () => void }) {
  return (
    <header className="app-header">
      <button type="button" className="mobile-menu icon-button" onClick={onMenu} aria-label="Open navigation"><Menu size={22} /></button>
      <a className="brand" href={import.meta.env.BASE_URL}>
        <NetworkMark size={34} />
        <span><strong>Open Learning Atlas</strong><small>Mathematics alpha</small></span>
      </a>
      <div className="header-context"><span>Mathematics</span><b>alpha</b></div>
      <nav className="header-actions" aria-label="Project links">
        <a href={`${REPOSITORY}/blob/main/methodology/map-constitution.md`} target="_blank" rel="noreferrer"><CircleHelp size={18} /><span>Method</span></a>
        <a href={REPOSITORY} target="_blank" rel="noreferrer"><GitFork size={18} /><span>GitHub</span></a>
        <button type="button" onClick={onShare}><Share2 size={18} /><span>Share</span></button>
      </nav>
    </header>
  )
}

function StatusBar({ release }: { release: AtlasRelease }) {
  const kinds = release.nodes.reduce<Record<string, number>>((counts, node) => ({ ...counts, [node.kind]: (counts[node.kind] ?? 0) + 1 }), {})
  return (
    <footer className="status-bar">
      <span><NetworkMark size={22} /><b>{release.nodes.length.toLocaleString()}</b> records</span>
      <span><Link2 size={16} /><b>{release.edges.length.toLocaleString()}</b> relationships</span>
      <span><KindDot kind="capability" /> {kinds.capability} capabilities</span>
      <span><KindDot kind="concept" /> {kinds.concept} concepts</span>
      <span className="status-spacer" />
      <span><i className="open-dot" /> Open data</span>
      <span>Updated {release.map.last_updated}</span>
      <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noreferrer">CC BY 4.0 <ExternalLink size={12} /></a>
    </footer>
  )
}

export default function App() {
  const [release, setRelease] = useState<AtlasRelease>()
  const [error, setError] = useState<string>()
  const [selectedId, setSelectedId] = useState<string>()
  const [selectedEdgeId, setSelectedEdgeId] = useState<string>()
  const [mobileNav, setMobileNav] = useState(false)
  const [filterOpen, setFilterOpen] = useState(false)
  const [activeKinds, setActiveKinds] = useState<Set<NodeKind>>(new Set())
  const [inspectorTab, setInspectorTab] = useState<'overview' | 'relationships'>('overview')
  const [inspectorExpanded, setInspectorExpanded] = useState(false)

  useEffect(() => {
    loadAtlas().then((data) => {
      setRelease(data)
      const index = buildIndex(data)
      const route = routeFromHash(window.location.hash)
      if (route?.kind === 'node' && index.nodes.has(route.id)) {
        setSelectedId(route.id)
      } else if (route?.kind === 'edge' && index.edges.has(route.id)) {
        const edge = index.edges.get(route.id)!
        setSelectedId(edge.subject)
        setSelectedEdgeId(edge.id)
        setInspectorTab('relationships')
        setInspectorExpanded(true)
      } else {
        setSelectedId(index.root.id)
      }
    }).catch((reason: unknown) => setError(reason instanceof Error ? reason.message : String(reason)))
  }, [])

  useEffect(() => {
    if (!release) return
    const index = buildIndex(release)
    const syncHash = () => {
      const route = routeFromHash(window.location.hash)
      if (route?.kind === 'node' && index.nodes.has(route.id)) {
        setSelectedId(route.id)
        setSelectedEdgeId(undefined)
      } else if (route?.kind === 'edge' && index.edges.has(route.id)) {
        const edge = index.edges.get(route.id)!
        setSelectedId((current) => current && (edge.subject === current || edge.object === current) ? current : edge.subject)
        setSelectedEdgeId(edge.id)
        setInspectorTab('relationships')
        setInspectorExpanded(true)
      }
    }
    window.addEventListener('hashchange', syncHash)
    return () => window.removeEventListener('hashchange', syncHash)
  }, [release])

  const index = useMemo(() => release ? buildIndex(release) : undefined, [release])
  const navigate = (id: string) => {
    setSelectedId(id)
    setSelectedEdgeId(undefined)
    setInspectorTab('overview')
    window.location.hash = hashForNode(id)
  }
  const selectEdge = (id: string) => {
    if (!index?.edges.has(id)) return
    setSelectedEdgeId(id)
    setInspectorTab('relationships')
    setInspectorExpanded(true)
    window.location.hash = hashForEdge(id)
  }
  const closeEdge = () => {
    setSelectedEdgeId(undefined)
    if (selectedId) window.location.hash = hashForNode(selectedId)
  }

  if (error) return <main className="load-state"><NetworkMark size={44} /><h1>The atlas could not be loaded.</h1><p>{error}</p><a href={DATA_URL}>Open the canonical data directly</a></main>
  if (!release || !index || !selectedId) return <main className="load-state"><NetworkMark size={44} /><h1>Opening the atlas…</h1><p>Loading the canonical mathematics release.</p></main>

  const selected = index.nodes.get(selectedId) ?? index.root
  const view = graphForSelection(selected.id, index)
  const share = async () => {
    const selectedEdge = selectedEdgeId ? index.edges.get(selectedEdgeId) : undefined
    const url = new URL(window.location.href)
    url.hash = selectedEdge ? hashForEdge(selectedEdge.id) : hashForNode(selected.id)
    const title = selectedEdge
      ? `${index.nodes.get(selectedEdge.subject)?.label ?? selectedEdge.subject} ${relationLabel(selectedEdge.relation)} ${index.nodes.get(selectedEdge.object)?.label ?? selectedEdge.object} — Open Learning Atlas`
      : `${selected.label} — Open Learning Atlas`
    if (navigator.share) await navigator.share({ title, url: url.toString() })
    else await navigator.clipboard.writeText(url.toString())
  }

  return (
    <div className="app-shell">
      <Header onMenu={() => setMobileNav(true)} onShare={share} />
      <div className="workspace">
        <Navigation release={release} index={index} selectedId={selected.id} onSelect={navigate} />
        <main className="atlas-main">
          <div className="mobile-search"><SearchBox release={release} onSelect={navigate} /></div>
          <div className="breadcrumbs" aria-label="Selected node path">
            {pathToRoot(selected.id, index).map((node, pathIndex, path) => (
              <span key={node.id}>
                <button type="button" onClick={() => navigate(node.id)}>{node.label}</button>
                {pathIndex < path.length - 1 && <i>/</i>}
              </span>
            ))}
          </div>
          <AtlasMap
            view={view}
            selectedId={selected.id}
            onSelect={navigate}
            activeKinds={activeKinds}
            filterOpen={filterOpen}
            onToggleFilters={() => setFilterOpen((value) => !value)}
            onResetKinds={() => setActiveKinds(new Set())}
            onToggleKind={(kind) => setActiveKinds((current) => {
              const next = new Set(current)
              if (next.has(kind)) next.delete(kind)
              else next.add(kind)
              return next
            })}
            onOverview={() => navigate(index.root.id)}
          />
        </main>
        <Inspector node={selected} index={index} onSelect={navigate} selectedEdgeId={selectedEdgeId} onSelectEdge={selectEdge} onCloseEdge={closeEdge} tab={inspectorTab} onTab={setInspectorTab} />
        <Inspector node={selected} index={index} onSelect={navigate} selectedEdgeId={selectedEdgeId} onSelectEdge={selectEdge} onCloseEdge={closeEdge} tab={inspectorTab} onTab={setInspectorTab} mobile expanded={inspectorExpanded} onToggleExpanded={() => setInspectorExpanded((value) => !value)} />
      </div>
      <StatusBar release={release} />
      {mobileNav && (
        <div className="drawer-layer" role="dialog" aria-modal="true" aria-label="Atlas navigation drawer">
          <button type="button" className="drawer-backdrop" onClick={() => setMobileNav(false)} aria-label="Close navigation" />
          <Navigation release={release} index={index} selectedId={selected.id} onSelect={navigate} mobile onClose={() => setMobileNav(false)} />
        </div>
      )}
    </div>
  )
}
