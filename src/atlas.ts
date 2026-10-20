import type { AtlasBranch, AtlasEdge, AtlasNode, AtlasRelease } from './types'

export const DATA_PATH = 'data/mathematics-v0.3.0-alpha.json'

export async function loadAtlas(): Promise<AtlasRelease> {
  const response = await fetch(`${import.meta.env.BASE_URL}${DATA_PATH}`)
  if (!response.ok) throw new Error(`Could not load the mathematics release (${response.status})`)
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
  if (!root) throw new Error('The release does not contain an atlas root')
  return { release, nodes, edges, sources, outgoing, incoming, root }
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
  const queue: Array<{ id: string; path: AtlasNode[] }> = [{ id, path: [] }]
  const seen = new Set<string>()
  while (queue.length) {
    const item = queue.shift()!
    if (seen.has(item.id)) continue
    seen.add(item.id)
    const node = index.nodes.get(item.id)
    if (!node) continue
    const path = [node, ...item.path]
    if (node.id === index.root.id) return path
    for (const parent of structuralParents(node.id, index)) queue.push({ id: parent.id, path })
  }
  const node = index.nodes.get(id)
  return node ? [index.root, node] : [index.root]
}

export function findBySlug(slug: string, index: AtlasIndex): AtlasNode | undefined {
  return index.release.nodes.find((node) => node.slug === slug)
}

function preferredStructure(structures: AtlasNode[]) {
  return structures.find((node) => node.subtype === 'map-region')
    ?? structures.find((node) => node.subtype === 'capability-family')
    ?? structures[0]
}

export function branchFor(
  index: AtlasIndex,
  regionId: string,
  territoryId?: string,
  structureId?: string,
): AtlasBranch {
  const territories = structuralChildren(regionId, index)
  const activeTerritory = territories.find((node) => node.id === territoryId)
    ?? territories.find((node) => node.slug === 'rational-proportional-structure')
    ?? territories[0]
  if (!activeTerritory) throw new Error('The selected region has no territories')

  const structures = structuralChildren(activeTerritory.id, index)
  const activeStructure = structures.find((node) => node.id === structureId)
    ?? preferredStructure(structures)
  if (!activeStructure) throw new Error('The selected territory has no mapped structures')

  const directLeaves = structuralChildren(activeStructure.id, index)
  const leaves = (directLeaves.length ? directLeaves : structures)
    .filter((node) => node.id !== activeStructure.id)
    .sort((a, b) => {
      const kindOrder = { capability: 0, practice: 1, representation: 2, knowledge: 3, concept: 4, composite: 5 }
      return kindOrder[a.kind] - kindOrder[b.kind] || a.label.localeCompare(b.label)
    })

  return { territories, structures, leaves, activeTerritory, activeStructure }
}

export function regions(index: AtlasIndex): AtlasNode[] {
  return structuralChildren(index.root.id, index)
}

export function searchNodes(query: string, release: AtlasRelease, limit = 10): AtlasNode[] {
  const needle = query.trim().toLocaleLowerCase()
  if (!needle) return []
  const score = (node: AtlasNode) => {
    const label = node.label.toLocaleLowerCase()
    const slug = node.slug.toLocaleLowerCase()
    const definition = node.definition.toLocaleLowerCase()
    if (label === needle || slug === needle) return 0
    if (label.startsWith(needle)) return 1
    if (label.includes(needle)) return 2
    if (slug.includes(needle)) return 3
    if (definition.includes(needle)) return 4
    return Number.POSITIVE_INFINITY
  }
  return release.nodes
    .map((node) => ({ node, rank: score(node) }))
    .filter((entry) => Number.isFinite(entry.rank) && entry.node.status !== 'deprecated')
    .sort((a, b) => a.rank - b.rank || a.node.label.localeCompare(b.node.label))
    .slice(0, limit)
    .map((entry) => entry.node)
}

export function prerequisites(id: string, index: AtlasIndex): AtlasNode[] {
  return (index.outgoing.get(id) ?? [])
    .filter((edge) => edge.relation === 'requires' && edge.status !== 'deprecated')
    .map((edge) => index.nodes.get(edge.object))
    .filter((node): node is AtlasNode => Boolean(node))
}

export function representations(id: string, index: AtlasIndex): AtlasNode[] {
  const connected = [
    ...(index.outgoing.get(id) ?? [])
      .filter((edge) => edge.relation === 'uses_representation' || edge.relation === 'represents')
      .map((edge) => index.nodes.get(edge.object)),
    ...(index.incoming.get(id) ?? [])
      .filter((edge) => edge.relation === 'represents')
      .map((edge) => index.nodes.get(edge.subject)),
  ]
  return [...new Map(connected.filter((node): node is AtlasNode => Boolean(node)).map((node) => [node.id, node])).values()]
}

export function relatedNodes(id: string, index: AtlasIndex, limit = 7): AtlasNode[] {
  const connected = [
    ...(index.outgoing.get(id) ?? []).map((edge) => index.nodes.get(edge.object)),
    ...(index.incoming.get(id) ?? []).map((edge) => index.nodes.get(edge.subject)),
  ]
  return [...new Map(connected.filter((node): node is AtlasNode => node !== undefined && node.id !== id).map((node) => [node.id, node])).values()]
    .slice(0, limit)
}

export function labelForKind(node: AtlasNode) {
  if (node.subtype === 'atlas-region') return 'Region'
  if (node.subtype === 'atlas-territory') return 'Territory'
  if (node.subtype === 'capability-family') return 'Capability family'
  if (node.subtype === 'map-region') return 'Structure'
  return node.kind[0].toUpperCase() + node.kind.slice(1)
}
