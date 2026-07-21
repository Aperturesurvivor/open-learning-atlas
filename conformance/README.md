# Downstream conformance fixtures

These fixtures prove that consumers can perform useful operations while keeping curriculum and learner state outside the canonical atlas.

- `target-expansion.json` expands a stable composite ID into assessable descendant records.
- `curriculum-coverage.json` applies a synthetic curriculum overlay to a target and reports the uncovered canonical capabilities.
- `learner-gap.json` applies a synthetic, non-personal mastery overlay to direct and alternative requirement claims.

The overlay fields in these fixtures are examples only. They are not atlas records, do not assert a recommended curriculum or mastery model, and contain no real learner data.

Run all fixtures against the pinned release:

```sh
tools/run-conformance
```

The expected identities intentionally make semantic changes observable in CI. When an accepted map change alters a fixture result, update the fixture and explain the change in the release changelog rather than weakening the check.
