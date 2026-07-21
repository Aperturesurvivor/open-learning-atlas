# Open Learning Atlas

**An open map of knowledge and capability.**

Open Learning Atlas is public semantic infrastructure for describing what can
be known or done, how those things relate, and which relationship claims are
accepted, proposed, conditional, or contested. Mathematics is the first
domain.

The project is inspired by the role OpenStreetMap plays for physical terrain:
the atlas describes shared educational terrain, while curricula, projects,
assessments, learner models, and AI tutors can select destinations and build
routes without controlling the base map.

## Current State

The project is in public-alpha construction. Current validated artifacts
include:

- one connected 117-node mathematics release containing 13 regions, 85
  territories, and a detailed rational/proportional reasoning slice;
- modular canonical authoring data and a deterministic release compiler;
- a typed graph schema and semantic validator;
- a ratified v0.1 map constitution;
- an explicit v1 completion contract.

All AI-authored mathematical records begin as `candidate`. Passing validation
means a record is structurally coherent, not that its mathematical or
educational claims have been independently accepted.

## For People

Start with the [plain-language mathematics atlas](map/domains/mathematics-topology.md)
and the [map constitution](methodology/map-constitution.md). The planned mobile
viewer will be generated from the same canonical records; it will never become
a separate source of truth.

## For AI Agents and Software

Start with [`llms.txt`](llms.txt), then inspect:

- [`map/schema/open-learning-atlas.schema.json`](map/schema/open-learning-atlas.schema.json)
  for the structural contract;
- [`architecture/map-data-model.md`](architecture/map-data-model.md) for record
  semantics and invariants;
- [`map/releases/mathematics-v0.1.0-alpha.json`](map/releases/mathematics-v0.1.0-alpha.json)
  for the current complete graph snapshot;
- [`tools/validate-map`](tools/validate-map) for executable semantic checks.

Agents should never infer that a missing edge is false, promote their own
candidate records, or interpret navigation membership as learning order.

## Core Boundary

The canonical atlas may contain concepts, knowledge, representations,
practices, observable capabilities, composites, and typed claims among them.
It does not contain:

- mandatory grades, ages, courses, or school-year placement;
- a universal curriculum or learning sequence;
- learner scores, histories, or inferred mastery;
- lesson plans, worksheets, or tutoring scripts;
- one mandatory assessment or mastery threshold.

Those belong in downstream overlays that reference stable `ola:` identifiers.

## Validate the Map

The semantic validator uses only the Python standard library:

```sh
tools/build-atlas --check
tools/validate-map
```

Full JSON Schema validation can be run with:

```sh
uvx --from check-jsonschema check-jsonschema \
  --schemafile map/schema/open-learning-atlas.schema.json \
  map/domains/*.json map/examples/*.json map/releases/*.json
```

## Repository Map

- [`atlas/`](atlas/) — modular canonical authoring records.
- [`map/`](map/) — schemas, generated releases, and historical reference documents.
- [`methodology/`](methodology/) — constitution, vocabulary, and mapping method.
- [`architecture/`](architecture/) — data, release, agent, and projection boundaries.
- [`docs/`](docs/) — public vision, accessibility contract, and v1 definition of done.
- [`sources/`](sources/) — reviewed source and coverage notes.
- [`research/`](research/) — open evidence and methodology questions.
- [`product/`](product/) — publication roadmap and downstream-user context.
- [`tools/`](tools/) — validation and release tooling.

## Contributing and Licensing

See [`CONTRIBUTING.md`](CONTRIBUTING.md) before proposing records or relationship
claims. Software and tooling are licensed under Apache-2.0. Atlas data and
documentation are licensed under CC BY 4.0; see [`LICENSES.md`](LICENSES.md).

## Origin and Attribution

Open Learning Atlas was initiated by Josiah Wilson in 2026 and has been
developed with substantial AI assistance. AI-generated material is identified
as candidate contributor analysis and is not represented as expert consensus.
