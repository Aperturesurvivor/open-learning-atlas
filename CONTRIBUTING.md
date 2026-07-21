# Contributing to Open Learning Atlas

Contributions are welcome from mathematicians, educators, learners, software
developers, standards practitioners, and careful generalists. The project
values explicit uncertainty more than artificial agreement.

## Before Contributing

Read:

1. [`methodology/map-constitution.md`](methodology/map-constitution.md);
2. [`architecture/map-data-model.md`](architecture/map-data-model.md);
3. [`governance/REVIEW.md`](governance/REVIEW.md);
4. [`llms.txt`](llms.txt) if an AI agent will assist.

Run `tools/validate-map` before opening a pull request that changes data.

## Useful Contributions

- propose a missing concept, capability, representation, practice, or composite;
- split a node whose parts have distinct prerequisites or failure modes;
- challenge a prerequisite or membership claim with a concrete rationale;
- add contrary evidence or a better primary source;
- improve a definition without changing identity;
- add accessibility, visualization, validation, or release tooling;
- review candidate records within a domain you can assess responsibly.

## Record Checklist

Every proposed node must have:

- one stable opaque ID;
- exactly one primary kind;
- a bounded definition and scope;
- candidate status and honest confidence;
- provenance and review notes;
- no grade, course, provider, or sequence encoded in identity.

Every capability or practice must additionally have an observable capability
statement, evidence dimensions, and dependency-review state.

Every proposed relationship must have its own ID, direction, rationale,
claim basis, confidence, status, and source references. Do not use `requires`
for a familiar teaching order or preferred method.

## AI-Assisted Contributions

AI may draft, compare, search, format, and validate. It may not fabricate
provenance, claim human review, or promote its own records. Disclose material
AI assistance in the pull request and use `contributor-analysis` where
appropriate.

## Review and Status

New records enter as `candidate`. Pull-request acceptance does not automatically
make a mathematical claim `accepted`; repository inclusion and epistemic status
are separate. See [`governance/REVIEW.md`](governance/REVIEW.md).

## Contribution Terms

By submitting a contribution, you represent that you have the right to submit
it and agree that software contributions are licensed under Apache-2.0 while
atlas data and documentation contributions are licensed under CC BY 4.0.
Do not submit copied textbook prose, proprietary assessment items, private
learner information, or material whose redistribution terms are unclear.
