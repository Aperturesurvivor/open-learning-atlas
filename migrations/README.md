# Identity migrations

Migration documents describe meaning-preserving and lifecycle changes between pinned releases. They make label changes, deprecations, splits, merges, and replacements explicit without reusing or silently deleting stable identities.

The document format is defined by [`map/schema/open-learning-atlas-migration.schema.json`](../map/schema/open-learning-atlas-migration.schema.json). `tools/validate-migrations` enforces revision progression, operation semantics, and complete redirects.

Files under `examples/` are deliberately synthetic. Canonical release-to-release migrations live under `mathematics/` and are referenced from release packages.

Rules:

- A rename preserves the same `ola:n:` identity and increments its record revision.
- A deprecated or split record remains resolvable and names every replacement.
- A redirect maps the old identity to one or more new identities; consumers must not guess from labels.
- A release migration lists only changes between the stated pinned releases.
