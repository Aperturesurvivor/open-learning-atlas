# Mathematics v1.0 Completion Contract

This document defines “finished” for Open Learning Atlas: Mathematics v1.0.
The atlas remains open to future correction and expansion, but v1.0 may not be
declared merely because the repository, macro topology, or viewer exists.

## 1. Mathematical Coverage

- All 13 macro regions and all 85 current territories are reviewed for scope,
  omissions, misleading aggregation, and multi-region membership.
- Every territory is decomposed into at least five meaningful child records.
- Every territory reaches at least two bounded capability or practice nodes;
  broad topic labels alone do not count as educational resolution.
- Each territory includes concepts, knowledge, and representations when those
  distinctions materially affect performance or dependency.
- Cross-region structures use shared identities rather than duplicated nodes.
- The complete mathematics root reaches every non-deprecated node through
  composition or an explicitly documented semantic connection.

These are minimum floors, not targets to game. A territory remains incomplete
when its decomposition hides distinct prerequisites, representations, failure
modes, or forms of evidence.

## 2. Capability Quality

Every capability and practice record must:

- name a class of situations and an observable action;
- define relevant objects, representations, conditions, and quality standards;
- declare inclusions and exclusions where boundaries are ambiguous;
- list evidence dimensions;
- declare dependency review as unreviewed, partial, or reviewed-complete;
- avoid embedding age, grade, course, project, institution, or provider.

## 3. Relationship Quality

- Every edge has stable identity, direction, rationale, basis, confidence,
  status, provenance, and conditions where material.
- Every `requires` edge connects assessable nodes and states its dependency kind.
- Hard dependencies are acyclic at their declared conditions.
- Alternative sufficient methods use requirement groups rather than false
  universal prerequisites.
- Navigation, pedagogical support, mathematical necessity, and conventional
  ordering are never silently conflated.

## 4. Evidence and Review

- Every record has contributor or source provenance.
- Every territory has at least one coverage note using an authoritative or
  primary source appropriate to that field.
- AI-authored records remain `candidate` unless human review is attributed.
- Contrary evidence and material objections can be represented without deletion.
- Release statistics report status and confidence distributions rather than
  presenting all included claims as settled.

## 5. Identity and Evolution

- All records use opaque `ola:` identifiers.
- Labels, slugs, and regional placement may change without changing identity.
- Splits, merges, replacements, and deprecations preserve redirects and history.
- Format version, record revision, and map-release version are distinct.
- A migration test demonstrates at least one non-destructive lifecycle change.

## 6. Validation and Releases

- JSON Schema and semantic validation pass across every canonical document.
- CI runs validation, tests, link checks, and viewer builds on every pull request.
- v1.0 provides a manifest, checksums, license manifest, changelog, prior-release
  pointer, machine-readable statistics, and stable downloads.
- A clean checkout can reproduce all generated release and viewer artifacts.

## 7. Human Access

- A public mobile-first atlas supports search, progressive zoom, filtering,
  node inspection, relation inspection, and stable deep links.
- The primary graph workflow works at common phone and desktop sizes.
- The interface meets the requirements in `docs/human-agent-access.md`.
- A nontechnical visitor can distinguish the base map from curricula, learner
  progress, and prescribed learning routes.

## 8. Agent and Software Access

- `llms.txt`, schema, semantic documentation, pinned JSON releases, and query
  examples are public and internally consistent.
- Agents can enumerate, resolve, traverse, filter, and cite records without
  scraping the viewer or executing proprietary code.
- Conformance fixtures demonstrate target expansion, curriculum coverage, and
  learner-gap calculation as downstream operations without adding those states
  to the base map.

## 9. Public Project Readiness

- The canonical repository is public on GitHub.
- Software, data, and documentation licenses are explicit.
- Contribution, review, governance, security, attribution, and code-of-conduct
  processes are documented.
- The phone-accessible site is deployed from canonical repository data.
- The project dossier distinguishes current evidence from intended impact and
  identifies AI and third-party contributions honestly.

## Release Gate

Mathematics v1.0 is complete only when every numbered section above has direct,
inspectable evidence. Missing evidence is an incomplete requirement, not an
implicit pass.

During alpha development, `tools/audit-v1` reports the measurable territory
floors without pretending they establish qualitative completeness. The final
v1 gate will run `tools/audit-v1 --require-complete` in addition to human review
evidence for scope, split quality, mathematical correctness, and dependencies.
