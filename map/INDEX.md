# Map Index

This directory contains the base-map artifacts. These records describe shared
educational terrain; they do not prescribe curricula, projects, grade bands, or
learner paths.

## Schema

- [`schema/open-learning-atlas.schema.json`](schema/open-learning-atlas.schema.json) — v0.1
  JSON Schema for a complete map document.
- [`../architecture/map-data-model.md`](../architecture/map-data-model.md) —
  human-readable data-model guide and invariants.

## Mathematics

- [`domains/mathematics-macro-v0.1.json`](domains/mathematics-macro-v0.1.json)
  — validated 99-node breadth-first atlas with 13 major regions, 85
  second-level territories, and 15 explicitly shared territories.
- [`domains/mathematics-topology.md`](domains/mathematics-topology.md) —
  human-readable guide to the macro atlas, its graph structure, and current
  resolution boundary.

## Examples

- [`examples/rational-proportional-v0.1.json`](examples/rational-proportional-v0.1.json)
  — validated 18-node seed demonstrating concepts, representations, knowledge,
  capabilities, a practice, a composite, typed claims, and an alternative-method
  requirement group.

## Validation

Run:

```sh
tools/validate-map
```

All example and domain JSON documents must pass before commit.
