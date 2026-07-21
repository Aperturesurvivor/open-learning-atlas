# Mathematics v1.0 status

This page maps the completion contract to inspectable evidence. It is deliberately stricter than a feature roadmap: a green machine check cannot substitute for missing human review.

| Contract section | Current evidence | Status |
| --- | --- | --- |
| 1. Mathematical coverage | One root reaches 1,210 records; `tools/audit-v1 --require-complete` reports 85/85 territories above the measurable floor; generated review inventory reports no floor failures. | Machine-complete; 85 qualitative territory reviews pending |
| 2. Capability quality | 463 capability and 56 practice records are assessable, carry observable statements and evidence dimensions, and declare dependency review; the quality audit finds no duplicate labels, definitions, or capability statements. | Structurally complete; qualitative review pending |
| 3. Relationship quality | 2,937 stable claims carry direction, rationale, basis, status, confidence, and provenance; cycles and endpoint semantics validate; one requirement group demonstrates alternatives. | Alpha-complete; dependency graph remains deliberately sparse and mostly unreviewed |
| 4. Evidence and review | 22 reusable source records; every territory has coverage-source evidence; all AI-assisted records remain candidate. | Provenance complete; accountable review pending |
| 5. Identity and evolution | Opaque identities, revisions, lifecycle fields, migration schema, redirects, and a non-destructive rename/split example validate. | Complete for alpha |
| 6. Validation and releases | Schema, semantics, reproducible compiler, checksummed package, statistics, license manifest, changelog, and CI are present. | Alpha package complete; v1 package/tag pending |
| 7. Human access | Public responsive atlas supports search, progressive views, filters, keyboard use, and base-map explanation. Node and relationship IDs resolve as independent deep links; edge inspection exposes direction, rationale, conditions, basis, confidence, status, revision, provenance, and candidate-review explanation. | Complete for alpha |
| 8. Agent and software access | `llms.txt`, pinned JSON/package, query CLI, traversal examples, migration data, and three downstream conformance fixtures are present. | Complete for alpha |
| 9. Public project readiness | Public GitHub repository, deployed phone site, licensing, governance, contribution, security, attribution, and dossier are present. | Complete for alpha; v1 announcement pending |

## Current quantitative review state

- Territory reviews approved: **0/85**
- Territory reviews pending: **85/85**
- Assessable records with `dependency_review: partial`: **8**
- Assessable records with `dependency_review: unreviewed`: **511**
- Accepted mathematical records: **0**
- Candidate mathematical records: **1,210**

These numbers are not defects hidden behind an “alpha” label. They are explicit claims about what has and has not been reviewed.

## Final gate

`tools/v1-release-gate` runs every local machine check and requires all territory decisions to be approved by attributed human reviewers. It is expected to fail at the review step until that evidence exists. Mathematics v1.0 must not be tagged while it fails.
