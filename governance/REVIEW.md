# Record Review and Lifecycle

Repository inclusion and epistemic status are independent. A merged candidate
is visible for testing and criticism; it is not thereby endorsed.

## Status Rules

### `candidate`

A coherent proposal with declared provenance and confidence. All AI-authored
records start here.

### `reviewed`

At least one named, accountable human has reviewed the record for explicitly
listed dimensions. Review notes must state what was and was not checked.

### `accepted`

The record has:

- at least one mathematical-content review;
- at least one map-method or educational-granularity review;
- no unresolved blocking correctness objection;
- passing structural and semantic validation;
- adequate provenance for its declared scope.

The two review dimensions should normally be supplied by independent people.
Maintainers may keep a well-supported claim at `reviewed` when independence or
coverage is insufficient for `accepted`.

### `contested`

A material disagreement affects meaning, dependency, scope, evidence, or
placement. The objection and competing proposal remain visible.

### `deprecated`

The record is retained for stable resolution but should not be used in new
work. It must explain why and identify replacements when available.

## Review Dimensions

Reviews may cover:

- mathematical correctness;
- capability observability and granularity;
- dependency necessity and conditions;
- representation coverage;
- accessibility and plain language;
- source quality and licensing;
- schema, identity, and graph integrity.

No review should silently claim dimensions it did not examine.

## Territory review evidence

The Mathematics v1 territory-wide review queue is stored in
[`review/territory-reviews.json`](../review/territory-reviews.json) and governed
by [`review/README.md`](../review/README.md). Automated inventory facts are kept
separate from attributed decisions. A completed decision requires a human name,
date, scope dimension, and substantive note; AI assistance must be disclosed
and cannot serve as the accountable reviewer.
