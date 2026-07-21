export type NodeKind = 'capability' | 'composite' | 'concept' | 'knowledge' | 'practice' | 'representation'

export interface AtlasNode {
  id: string
  revision: number
  slug: string
  label: string
  kind: NodeKind
  subtype?: string
  definition: string
  scope?: string
  capability_statement?: string
  assessable: boolean
  evidence_dimensions?: string[]
  domains: string[]
  status: string
  confidence: string
  dependency_review?: string
  source_ids: string[]
  review_notes?: string
}

export interface AtlasEdge {
  id: string
  revision: number
  subject: string
  relation: string
  object: string
  rationale: string
  claim_basis: string[]
  evidence_strength: string
  status: string
  confidence: string
  source_ids: string[]
  review_notes?: string
}

export interface AtlasSource {
  id: string
  revision: number
  title: string
  source_type: string
  citation: string
  url?: string
  accessed_at?: string
  notes?: string
  coverage_for?: string[]
  coverage_scope?: string
  coverage_gaps?: string
}

export interface AtlasRelease {
  format_version: string
  map: {
    id: string
    slug: string
    title: string
    description: string
    domain: string
    version: string
    status: string
    license: string
    language: string
    last_updated: string
  }
  nodes: AtlasNode[]
  edges: AtlasEdge[]
  sources: AtlasSource[]
  requirement_groups: unknown[]
}

export interface PositionedNode {
  node: AtlasNode
  x: number
  y: number
  level: 0 | 1 | 2
}

export interface GraphView {
  nodes: AtlasNode[]
  edges: AtlasEdge[]
  centerId: string
  mode: 'overview' | 'region' | 'neighborhood'
}
