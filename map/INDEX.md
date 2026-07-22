# Map Index

This directory contains the base-map artifacts. These records describe shared
educational terrain; they do not prescribe curricula, projects, grade bands, or
learner paths.

## Schema

- [`schema/open-learning-atlas.schema.json`](schema/open-learning-atlas.schema.json) — v0.1
  JSON Schema for a complete map document.
- [`schema/open-learning-atlas-migration.schema.json`](schema/open-learning-atlas-migration.schema.json)
  — lifecycle change and redirect documents.
- [`../architecture/map-data-model.md`](../architecture/map-data-model.md) —
  human-readable data-model guide and invariants.

## Mathematics

- [`releases/mathematics-v0.3.0-alpha.json`](releases/mathematics-v0.3.0-alpha.json)
  — current generated, connected mathematics snapshot. Its editable source is
  [`../atlas/mathematics/`](../atlas/mathematics/).
- [`releases/mathematics-v0.2.0-alpha.json`](releases/mathematics-v0.2.0-alpha.json)
  — preserved advanced-analysis coverage correction.
- [`releases/mathematics-v0.1.0-alpha.json`](releases/mathematics-v0.1.0-alpha.json)
  — preserved first public-alpha snapshot.
- [`domains/mathematics-macro-v0.1.json`](domains/mathematics-macro-v0.1.json)
  — preserved initial 99-node breadth-first input with 13 major regions, 85
  second-level territories, and 15 explicitly shared territories.
- [`domains/mathematics-topology.md`](domains/mathematics-topology.md) —
  human-readable guide to the macro atlas, its graph structure, and current
  resolution boundary.

## Examples

- [`examples/rational-proportional-v0.1.json`](examples/rational-proportional-v0.1.json)
  — preserved 18-node seed that first demonstrated concepts, representations,
  knowledge, capabilities, a practice, typed claims, and an alternative-method
  requirement group.

## Validation

Run:

```sh
tools/validate-map
```

All example, domain, and generated release JSON documents must pass before
commit. `tools/build-atlas --check` must also confirm that a release is exactly
reproducible from canonical authoring data. Pinned self-contained packages are
published under [`../releases/`](../releases/) and verified by
`tools/build-release --check`.
