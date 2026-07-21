import type { AtlasEdge, AtlasNode, AtlasRelease, GraphView, PositionedNode } from './types'

export const releaseDataPath = 'data/mathematics-v0.2.0-alpha.json'

export async function loadAtlas(): Promise<AtlasRelease> {
  const response = await fetch(`${import.meta.env.BASE_URL}${releaseDataPath}`)
  if (!response.ok) throw new Error(`Could not load atlas release (${response.status})`)
  return response.json() as Promise<AtlasRelease>
}

export function buildIndex(release: AtlasRelease) {
  const nodes = new Map(release.nodes.map((node) => [node.id, node]))
  const edges = new Map(release.edges.map((edge) => [edge.id, edge]))
  const sources = new Map(release.sources.map((source) => [source.id, source]))
  const outgoing = new Map<string, AtlasEdge[]>()
  const incoming = new Map<string, AtlasEdge[]>()

  for (const edge of release.edges) {
    outgoing.set(edge.subject, [...(outgoing.get(edge.subject) ?? []), edge])
    incoming.set(edge.object, [...(incoming.get(edge.object) ?? []), edge])
  }

  const root = release.nodes.find((node) => node.subtype === 'atlas-root')
  if (!root) throw new Error('Atlas release has no root node')

  return { nodes, edges, sources, outgoing, incoming, root }
}

export type AtlasIndex = ReturnType<typeof buildIndex>

export function structuralChildren(id: string, index: AtlasIndex): AtlasNode[] {
  return (index.outgoing.get(id) ?? [])
    .filter((edge) => edge.relation === 'composed_of' && edge.status !== 'deprecated')
    .map((edge) => index.nodes.get(edge.object))
    .filter((node): node is AtlasNode => node !== undefined && node.status !== 'deprecated')
    .sort((a, b) => a.label.localeCompare(b.label))
}

export function structuralParents(id: string, index: AtlasIndex): AtlasNode[] {
  return (index.incoming.get(id) ?? [])
    .filter((edge) => edge.relation === 'composed_of' && edge.status !== 'deprecated')
    .map((edge) => index.nodes.get(edge.subject))
    .filter((node): node is AtlasNode => node !== undefined && node.status !== 'deprecated')
    .sort((a, b) => a.label.localeCompare(b.label))
}

export function pathToRoot(id: string, index: AtlasIndex): AtlasNode[] {
  const path: AtlasNode[] = []
  const seen = new Set<string>()
  let cursor = index.nodes.get(id)

  while (cursor && !seen.has(cursor.id)) {
    path.unshift(cursor)
    seen.add(cursor.id)
    cursor = structuralParents(cursor.id, index)[0]
  }

  if (path[0]?.id !== index.root.id) path.unshift(index.root)
  return path
}

const relationPriority = (relation: string) => {
  const priorities: Record<string, number> = {
    composed_of: 0,
    requires: 1,
    supports: 2,
    uses_concept: 3,
    uses_knowledge: 4,
    uses_representation: 5,
    uses_practice: 6,
    represents: 7,
  }
  return priorities[relation] ?? 8
}

export function graphForSelection(selectedId: string, index: AtlasIndex): GraphView {
  const selected = index.nodes.get(selectedId) ?? index.root
  const children = structuralChildren(selected.id, index)
  const parents = structuralParents(selected.id, index)
  let nodeIds: string[]
  let mode: GraphView['mode']

  if (selected.subtype === 'atlas-root') {
    mode = 'overview'
    nodeIds = [selected.id, ...children.map((node) => node.id)]
  } else if (selected.subtype === 'atlas-region') {
    mode = 'region'
    nodeIds = [selected.id, ...children.map((node) => node.id)]
  } else {
    mode = 'neighborhood'
    const incident = [...(index.incoming.get(selected.id) ?? []), ...(index.outgoing.get(selected.id) ?? [])]
      .sort((a, b) => relationPriority(a.relation) - relationPriority(b.relation) || a.id.localeCompare(b.id))
      .slice(0, 26)
    nodeIds = [
      selected.id,
      ...parents.map((node) => node.id),
      ...children.map((node) => node.id),
      ...incident.flatMap((edge) => [edge.subject, edge.object]),
    ]
  }

  const uniqueIds = [...new Set(nodeIds)].slice(0, 32)
  const visible = new Set(uniqueIds)
  const nodes = uniqueIds.map((id) => index.nodes.get(id)).filter((node): node is AtlasNode => Boolean(node))
  const edges = [...new Set(uniqueIds.flatMap((id) => [...(index.outgoing.get(id) ?? []), ...(index.incoming.get(id) ?? [])]))]
    .filter((edge) => visible.has(edge.subject) && visible.has(edge.object))

  return { nodes, edges, centerId: selected.id, mode }
}

export function searchNodes(query: string, release: AtlasRelease, limit = 12): AtlasNode[] {
  const normalized = query.trim().toLocaleLowerCase()
  if (!normalized) return []

  const score = (node: AtlasNode) => {
    const label = node.label.toLocaleLowerCase()
    const slug = node.slug.toLocaleLowerCase()
    const id = node.id.toLocaleLowerCase()
    const definition = node.definition.toLocaleLowerCase()
    if (label === normalized || slug === normalized || id === normalized) return 0
    if (label.startsWith(normalized)) return 1
    if (label.includes(normalized)) return 2
    if (slug.includes(normalized)) return 3
    if (id.includes(normalized)) return 4
    if (definition.includes(normalized)) return 5
    return Number.POSITIVE_INFINITY
  }

  return release.nodes
    .map((node) => ({ node, score: score(node) }))
    .filter((result) => Number.isFinite(result.score))
    .sort((a, b) => a.score - b.score || a.node.label.localeCompare(b.node.label))
    .slice(0, limit)
    .map((result) => result.node)
}

export function layoutGraph(view: GraphView, width = 1000, height = 720): PositionedNode[] {
  const center = view.nodes.find((node) => node.id === view.centerId) ?? view.nodes[0]
  const others = view.nodes.filter((node) => node.id !== center.id)
  const cx = width / 2
  const cy = height / 2
  const radiusX = Math.min(width * 0.38, 390)
  const radiusY = Math.min(height * 0.36, 250)

  return [
    { node: center, x: cx, y: cy, level: 0 as const },
    ...others.map((node, index) => {
      const angle = -Math.PI / 2 + (Math.PI * 2 * index) / Math.max(others.length, 1)
      const ring = others.length > 16 && index % 2 ? 0.72 : 1
      return {
        node,
        x: cx + Math.cos(angle) * radiusX * ring,
        y: cy + Math.sin(angle) * radiusY * ring,
        level: 1 as const,
      }
    }),
  ]
}

export function relationLabel(relation: string) {
  return relation.replaceAll('_', ' ').replaceAll('-', ' ')
}

export function nodeTypeLabel(node: AtlasNode) {
  if (node.subtype === 'atlas-root') return 'Atlas root'
  if (node.subtype === 'atlas-region') return 'Region'
  if (node.subtype === 'atlas-territory') return 'Territory'
  if (node.subtype === 'capability-family') return 'Capability family'
  return node.subtype ? node.subtype.replaceAll('-', ' ') : node.kind
}

export function hashForNode(id: string) {
  return `#/node/${encodeURIComponent(id)}`
}

export function hashForEdge(id: string) {
  return `#/edge/${encodeURIComponent(id)}`
}

export type AtlasRoute = { kind: 'node' | 'edge'; id: string }

export function routeFromHash(hash: string): AtlasRoute | undefined {
  const match = hash.match(/^#\/(node|edge)\/(.+)$/)
  if (!match) return undefined
  try {
    return { kind: match[1] as AtlasRoute['kind'], id: decodeURIComponent(match[2]) }
  } catch {
    return undefined
  }
}

export function nodeIdFromHash(hash: string) {
  const route = routeFromHash(hash)
  return route?.kind === 'node' ? route.id : undefined
}
