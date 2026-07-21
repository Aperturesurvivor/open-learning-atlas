# Base-Map Data Model

**Status:** v0.1 draft

This model implements the boundary established by the
[Map Constitution](../methodology/map-constitution.md). It describes shared
educational terrain and claim metadata. It intentionally contains no learners,
courses, projects, lessons, scores, or mastery algorithms.

## Canonical Artifact

The logical canonical artifact is a versioned graph document:

```text
map release
├── metadata
├── sources
├── typed nodes
├── typed edge claims
└── conditional requirement groups
```

For maintainable review, the editable source of truth is split into category
arrays under [`atlas/mathematics/`](../atlas/mathematics/). The deterministic
compiler at [`tools/build-atlas`](../tools/build-atlas) rejects conflicting IDs
or slugs, sorts records, and generates the complete release document. Generated
files under `map/releases/` must never be edited directly.

The initial interchange format is JSON validated by
[`map/schema/open-learning-atlas.schema.json`](../map/schema/open-learning-atlas.schema.json)
and by the semantic validator at [`tools/validate-map`](../tools/validate-map).

The JSON representation is deliberately plain. JSON-LD, a graph database,
search indexes, visualizations, or an API can be generated later without
becoming the source of truth.

## Identity Layers

| Layer | Purpose | Example |
| --- | --- | --- |
| Stable ID | Permanent identity independent of name or location | `ola:n:<uuid>` |
| Record revision | Immutable revision of one record | `revision: 2` |
| Map release | Pin-able snapshot of all included records | `0.4.0` |
| Format version | Schema and semantic contract | `0.1` |

IDs use a type prefix plus an opaque UUID:

- `ola:m:<uuid>` — map document
- `ola:n:<uuid>` — node
- `ola:e:<uuid>` — edge claim
- `ola:r:<uuid>` — requirement group
- `ola:s:<uuid>` — source

Labels and slugs are mutable. Grade, sequence, domain path, provider, and
difficulty are prohibited from IDs.

## Node Record

Every node records:

```text
id
revision
kind
assessable
slug
label
definition
subtype
aliases
domains
scope
status
confidence
source_ids
review_notes
replaced_by
```

Capability and practice nodes additionally require:

```text
capability_statement
evidence_dimensions
dependency_review
```

`dependency_review` makes the open-world assumption explicit:

- `unreviewed` — no completeness claim;
- `partial` — some dependency claims are mapped;
- `reviewed-complete` — reviewers found the mapped dependencies complete for
  the node's declared scope and current release.

This flag does not freeze the record or rule out later discoveries.

## Assessability

The map distinguishes terrain from observable performance:

| Kind | Independently assessable? | How learner interaction is expressed |
| --- | --- | --- |
| Concept | No | Capability that interprets, uses, classifies, or explains it |
| Knowledge | No | Capability that recalls, explains, derives, or applies it |
| Representation | No | Capability that reads, constructs, or translates it |
| Composite | No | Constituent or integrated capability nodes |
| Capability | Yes | Its bounded performance statement |
| Practice | Yes | Its observable cross-cutting behavior |

Assessment instruments and passing thresholds remain outside the base map.

## Edge Claim

An edge is not an anonymous line. It records:

```text
id
revision
subject
relation
object
scope
conditions
rationale
claim_basis
dependency_kind
evidence_strength
status
confidence
source_ids
review_notes
```

All edges read as `subject relation object`.

`claim_basis` records how the proposal was formed: formal reasoning,
definition, task analysis, empirical evidence, expert judgment, contributor
analysis, or legacy sequence. It is not the same as confidence or editorial
status.

`dependency_kind` is required for `requires` claims and separates mathematical,
semantic, representational, operational, empirical-learning, method-conditional,
task-conditional, and conventional-ordering claims.

## Requirement Group

A requirement group represents dependency logic that pairwise edges would
misstate:

```text
target
mode: all-of | any-of | at-least
members
minimum_satisfied
conditions
rationale
claim_basis
status
confidence
source_ids
```

Example: determining an unknown proportional value may admit either an
equivalent-ratio method or a unit-rate method. Neither method should become a
universal hard prerequisite simply because both are common.

## Source Record

Sources are reusable records rather than duplicated citation strings. They may
represent primary mathematics, research, standards, curricula, expert review,
or contributor analysis.

A source may also act as a machine-readable territory coverage note by naming
territory IDs in `coverage_for`, stating the part of the source used in
`coverage_scope`, and listing known omissions or mismatches in `coverage_gaps`.
Coverage notes audit breadth; they do not import a source's sequence or imply
that every included map claim is endorsed by that source.

A source reference supports provenance; it does not automatically make a claim
correct. Copyrighted sources should be summarized and precisely cited, not
copied into the dataset.

## Semantic Invariants

The validator currently enforces:

- valid opaque IDs and unique slugs;
- resolvable node and source references;
- node-kind and assessability consistency;
- required capability fields;
- relation endpoint compatibility;
- no self-edges or duplicate symmetric claims;
- no cycles in hard `requires` or `composed_of` projections;
- dependency classification for `requires` edges;
- valid conditional requirement groups;
- lifecycle notes for deprecated nodes.

Future validation should add immutable-revision checking across releases,
schema-level migration checks, duplicate-candidate detection, and conditional
cycle analysis. Generated releases already require one atlas root, nonempty
record provenance, and directed reachability from that root.

## Release Shape

A future public release should contain:

```text
release manifest
├── dataset snapshot
├── schema version
├── checksums
├── license manifest
├── prior-release pointer
├── machine-readable diff
├── migration mappings
└── human-readable changelog
```

The current repository is a public-alpha architecture. Its `0.1` format is
experimental until the v1 release contract is satisfied; record status and map
release versions must be inspected rather than inferred from repository inclusion.
