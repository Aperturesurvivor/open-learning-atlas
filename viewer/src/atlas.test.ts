import { describe, expect, it } from 'vitest'
import { buildIndex, graphForSelection, hashForEdge, hashForNode, nodeIdFromHash, pathToRoot, reviewIssueUrl, routeFromHash, searchNodes, structuralChildren, structuralParents } from './atlas'
import type { AtlasRelease } from './types'

const release: AtlasRelease = {
  format_version: '0.1',
  map: { id: 'map', slug: 'mathematics', title: 'Mathematics', description: '', domain: 'mathematics', version: 'test', status: 'candidate', license: 'CC-BY-4.0', language: 'en', last_updated: '2026-07-21' },
  requirement_groups: [],
  sources: [],
  nodes: [
    { id: 'ola:n:root', revision: 1, slug: 'mathematics', label: 'Mathematics', kind: 'composite', subtype: 'atlas-root', definition: 'Root', assessable: false, domains: ['mathematics'], status: 'candidate', confidence: 'high', source_ids: [] },
    { id: 'ola:n:region', revision: 1, slug: 'algebra', label: 'Algebra', kind: 'composite', subtype: 'atlas-region', definition: 'Structure and relation', assessable: false, domains: ['mathematics'], status: 'candidate', confidence: 'medium', source_ids: [] },
    { id: 'ola:n:territory', revision: 1, slug: 'linear-equations', label: 'Linear Equations', kind: 'composite', subtype: 'atlas-territory', definition: 'Equations of first degree', assessable: false, domains: ['mathematics'], status: 'candidate', confidence: 'medium', source_ids: [] },
    { id: 'ola:n:historical', revision: 2, slug: 'combined-algebra', label: 'Combined Algebra', kind: 'composite', subtype: 'atlas-territory', definition: 'Historical combined territory', assessable: false, domains: ['mathematics'], status: 'deprecated', confidence: 'medium', source_ids: [] },
  ],
  edges: [
    { id: 'ola:e:one', revision: 1, subject: 'ola:n:root', relation: 'composed_of', object: 'ola:n:region', rationale: '', claim_basis: [], evidence_strength: 'reasoned', status: 'candidate', confidence: 'medium', source_ids: [] },
    { id: 'ola:e:two', revision: 1, subject: 'ola:n:region', relation: 'composed_of', object: 'ola:n:territory', rationale: '', claim_basis: [], evidence_strength: 'reasoned', status: 'candidate', confidence: 'medium', source_ids: [] },
    { id: 'ola:e:historical', revision: 2, subject: 'ola:n:region', relation: 'composed_of', object: 'ola:n:historical', rationale: '', claim_basis: [], evidence_strength: 'reasoned', status: 'deprecated', confidence: 'medium', source_ids: [] },
  ],
}

describe('atlas navigation', () => {
  const index = buildIndex(release)

  it('builds an overview from the atlas root', () => {
    const view = graphForSelection(index.root.id, index)
    expect(view.mode).toBe('overview')
    expect(view.nodes.map((node) => node.id)).toEqual(['ola:n:root', 'ola:n:region'])
  })

  it('finds a deterministic structural path', () => {
    expect(pathToRoot('ola:n:territory', index).map((node) => node.slug)).toEqual(['mathematics', 'algebra', 'linear-equations'])
  })

  it('keeps deprecated identities inspectable but outside active structural traversal', () => {
    expect(index.nodes.get('ola:n:historical')?.status).toBe('deprecated')
    expect(index.edges.get('ola:e:historical')?.status).toBe('deprecated')
    expect(structuralChildren('ola:n:region', index).map((node) => node.id)).toEqual(['ola:n:territory'])
    expect(structuralParents('ola:n:historical', index)).toEqual([])
  })

  it('ranks exact and semantic search matches', () => {
    expect(searchNodes('algebra', release)[0].slug).toBe('algebra')
    expect(searchNodes('first degree', release)[0].slug).toBe('linear-equations')
  })

  it('round-trips stable identities through deep links', () => {
    const nodeId = 'ola:n:root'
    const edgeId = 'ola:e:one'
    expect(nodeIdFromHash(hashForNode(nodeId))).toBe(nodeId)
    expect(routeFromHash(hashForEdge(edgeId))).toEqual({ kind: 'edge', id: edgeId })
    expect(routeFromHash('#/edge/%E0%A4%A')).toBeUndefined()
  })

  it('creates a release-pinned attributed-review link for a territory', () => {
    const url = new URL(reviewIssueUrl(release.nodes[2], '0.3.0-alpha'))
    expect(url.pathname).toBe('/Aperturesurvivor/open-learning-atlas/issues/new')
    expect(url.searchParams.get('template')).toBe('review-territory.yml')
    expect(url.searchParams.get('territory')).toContain('ola:n:territory')
    expect(url.searchParams.get('release')).toBe('0.3.0-alpha')
  })
})
