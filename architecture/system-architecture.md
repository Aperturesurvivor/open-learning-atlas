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

The current repository uses complete JSON map documents for the v0.1 pressure
test. A later scale-oriented layout may store one record per source file and
generate release snapshots, but the record semantics must remain stable.

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
