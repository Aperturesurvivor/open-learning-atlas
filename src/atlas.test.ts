import { describe, expect, it } from 'vitest'
import { branchFor, buildIndex, pathToRoot, prerequisites, searchNodes } from './atlas'
import type { AtlasRelease } from './types'

const release: AtlasRelease = {
  format_version: '0.1',
  map: { id: 'map', slug: 'math', title: 'Math', description: '', domain: 'mathematics', version: 'test', status: 'candidate', license: 'CC-BY-4.0', language: 'en', last_updated: '2026-01-01' },
  sources: [],
  requirement_groups: [],
  nodes: [
    { id: 'root', revision: 1, slug: 'math', label: 'Mathematics', kind: 'composite', subtype: 'atlas-root', definition: '', assessable: false, domains: ['mathematics'], status: 'candidate', confidence: 'medium', source_ids: [] },
    { id: 'region', revision: 1, slug: 'region', label: 'Region', kind: 'composite', subtype: 'atlas-region', definition: '', assessable: false, domains: ['mathematics'], status: 'candidate', confidence: 'medium', source_ids: [] },
    { id: 'territory', revision: 1, slug: 'territory', label: 'Territory', kind: 'composite', subtype: 'atlas-territory', definition: '', assessable: false, domains: ['mathematics'], status: 'candidate', confidence: 'medium', source_ids: [] },
    { id: 'structure', revision: 1, slug: 'structure', label: 'Structure', kind: 'composite', subtype: 'map-region', definition: '', assessable: false, domains: ['mathematics'], status: 'candidate', confidence: 'medium', source_ids: [] },
    { id: 'prereq', revision: 1, slug: 'prerequisite', label: 'Interpret a ratio', kind: 'capability', definition: 'Read a ratio.', capability_statement: 'Interpret a ratio.', assessable: true, domains: ['mathematics'], status: 'candidate', confidence: 'medium', source_ids: [] },
    { id: 'leaf', revision: 1, slug: 'unit-rate', label: 'Determine a unit rate', kind: 'capability', definition: 'Determine unit rates.', capability_statement: 'Determine a unit rate.', assessable: true, domains: ['mathematics'], status: 'candidate', confidence: 'medium', source_ids: [] },
  ],
  edges: [
    ['e1', 'root', 'region'], ['e2', 'region', 'territory'], ['e3', 'territory', 'structure'], ['e4', 'structure', 'leaf'],
  ].map(([id, subject, object]) => ({ id, revision: 1, subject, relation: 'composed_of', object, rationale: '', claim_basis: [], evidence_strength: 'reasoned', status: 'candidate', confidence: 'medium', source_ids: [] })).concat([
    { id: 'e5', revision: 1, subject: 'leaf', relation: 'requires', object: 'prereq', rationale: '', claim_basis: [], evidence_strength: 'reasoned', status: 'candidate', confidence: 'medium', source_ids: [] },
  ]),
}

describe('atlas model', () => {
  const index = buildIndex(release)

  it('builds a three-level teacher branch', () => {
    const branch = branchFor(index, 'region', 'territory', 'structure')
    expect(branch.activeTerritory.id).toBe('territory')
    expect(branch.activeStructure.id).toBe('structure')
    expect(branch.leaves.map((node) => node.id)).toEqual(['leaf'])
  })

  it('resolves a path from the map root', () => {
    expect(pathToRoot('leaf', index).map((node) => node.id)).toEqual(['root', 'region', 'territory', 'structure', 'leaf'])
  })

  it('distinguishes dependency claims from structural composition', () => {
    expect(prerequisites('leaf', index).map((node) => node.id)).toEqual(['prereq'])
  })

  it('searches labels and definitions', () => {
    expect(searchNodes('unit rate', release)[0]?.id).toBe('leaf')
  })
})

