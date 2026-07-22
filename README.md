# Open Learning Atlas

**An open map of knowledge and capability.**

[Explore the mathematics atlas](https://aperturesurvivor.github.io/open-learning-atlas/)
on desktop or phone.

[Download the checksummed Mathematics 0.3.0-alpha package](https://github.com/Aperturesurvivor/open-learning-atlas/releases/tag/mathematics-v0.3.0-alpha).

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

- one connected mathematics release containing 13 regions, 87 active
  territories, 1,213 records, and 2,955 typed relationships;
- modular canonical authoring data and a deterministic release compiler;
- a typed graph schema and semantic validator;
- a tested, responsive atlas viewer generated from the canonical release;
- a ratified v0.1 map constitution;
- an explicit v1 completion contract.

All AI-authored mathematical records begin as `candidate`. Passing validation
means a record is structurally coherent, not that its mathematical or
educational claims have been independently accepted.

The exact v1 evidence and remaining review work are tracked in
[`docs/v1-status.md`](docs/v1-status.md). Qualified reviewers can choose a
territory from the mobile-readable [`review/QUEUE.md`](review/QUEUE.md).

## For People

Start with the [plain-language mathematics atlas](map/domains/mathematics-topology.md),
the [map constitution](methodology/map-constitution.md), or the responsive viewer
in [`viewer/`](viewer/). The viewer is generated from the same canonical records;
it is never a separate source of truth.

## For AI Agents and Software

Start with [`llms.txt`](llms.txt), then inspect:

- [`map/schema/open-learning-atlas.schema.json`](map/schema/open-learning-atlas.schema.json)
  for the structural contract;
- [`architecture/map-data-model.md`](architecture/map-data-model.md) for record
  semantics and invariants;
- [`releases/latest.json`](releases/latest.json) for the machine-readable current-release pointer;
- [`map/releases/mathematics-v0.3.0-alpha.json`](map/releases/mathematics-v0.3.0-alpha.json)
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

Agent-access and release checks:

```sh
tools/query-atlas --pretty stats
tools/run-conformance
tools/validate-migrations
tools/validate-crosswalks
tools/audit-coverage-evidence
tools/build-release --check
tools/test-release-archive
tools/build-latest-pointer --check
tools/validate-history
tools/build-review-inventory --check
tools/validate-reviews
tools/build-review-queue --check
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
- [`viewer/`](viewer/) — mobile-first human access built from the pinned release.
- [`releases/`](releases/) — self-contained pinned packages and checksums.
- [`conformance/`](conformance/) — downstream-operation fixtures.
- [`review/`](review/) — accountable territory-review queue, evidence, schema,
  and decision ledger.

## Contributing and Licensing

See [`CONTRIBUTING.md`](CONTRIBUTING.md) before proposing records or relationship
claims. Software and tooling are licensed under Apache-2.0. Atlas data and
documentation are licensed under CC BY 4.0; see [`LICENSES.md`](LICENSES.md).

## Origin and Attribution

Open Learning Atlas was initiated by Josiah Wilson in 2026 and has been
developed with substantial AI assistance. AI-generated material is identified
as candidate contributor analysis and is not represented as expert consensus.
