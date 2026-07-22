# System Architecture

## Current Architectural Center

Open Learning Atlas's current system is a version-controlled base-map repository, not a
learner application.

```text
authoring and review
|
|-- constitution and ontology
|-- machine-readable map records
|-- source and provenance records
|-- schema validation
|-- semantic validation
|-- version history
|
reference releases
|
|-- generated documentation
|-- generated graph/tree views
|-- search and APIs
|-- downstream overlays
`-- downstream learner or curriculum systems
```

## Source Of Truth

The source of truth is plain, reviewable, version-controlled map data conforming
to the constitution and schema. A future graph database, website, editor, or API
is a projection and may be rebuilt from a pinned release.

The editable source is split into focused arrays under `atlas/mathematics/`.
`tools/build-atlas` deterministically compiles the connected JSON snapshot.
`tools/build-release` then produces a self-contained checksummed package,
including migration history in package format 0.2. `tools/validate-history`
checks stable identity and revision invariants across the public release chain,
while `releases/latest.json` provides a digest-bearing current-release pointer.
The viewer and query tools consume the same snapshot rather than maintaining
their own meanings.

## Validation Boundary

Two layers of validation are required:

1. structural validation against the JSON Schema;
2. semantic validation for references, endpoint kinds, cycles, duplicate
   claims, deprecation, and requirement groups.

Passing validation means the records are internally well formed. It does not
mean their mathematical or educational claims have been accepted.

## Downstream Boundary

The earlier iPad app architecture—problem generation, answer checking, learner
state, mastery updates, review scheduling, student UI, and parent UI—is retained
as a downstream historical proof of concept. None of those records belongs in
the base-map schema.
