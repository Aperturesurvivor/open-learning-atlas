# Agent Instructions

Open Learning Atlas is a public, open-data map of educational knowledge and
capability, beginning with mathematics.

## Boot Path

1. Read `llms.txt`.
2. Read `methodology/map-constitution.md` before changing map semantics.
3. Read `architecture/map-data-model.md` before creating records.
4. Open the relevant index and source notes only.
5. Edit canonical fragments under `atlas/mathematics/`, never generated releases.
6. Run `tools/build-atlas`, `tools/build-atlas --check`, and
   `tools/validate-map` after changing machine-readable map data.

## Map Rules

- Treat the canonical artifact as one typed claim graph, not a tree or course
  sequence.
- Keep grades, courses, projects, institutions, learner state, mastery
  thresholds, lesson content, and application workflows outside the base map.
- Use opaque `ola:` IDs. Never encode a label, path, grade, provider, or
  difficulty into identity.
- Treat every relationship as a reviewable claim with rationale, status,
  confidence, and provenance.
- Missing claims mean “not currently mapped,” not “does not exist.”
- AI-authored records begin as `candidate` and cannot self-promote.
- Do not manufacture sources, consensus, review, or empirical support.
- Preserve stable IDs; deprecate with redirects instead of silently deleting.

## Public-Safety Rules

- Do not commit credentials, private notes, learner records, or personally
  identifying educational data.
- Keep raw copyrighted source material out of the repository. Summarize and
  cite only what is needed to support a map claim.
- Record AI assistance and upstream sources honestly.
- The human documentation and machine-readable records must agree; neither may
  contain hidden canonical meaning unavailable to the other.

## Contribution Standard

Follow `CONTRIBUTING.md`. A passing validator is necessary but not sufficient:
mathematical and educational claims remain candidates until accountable review.
