# Pinned release packages

Each directory under `mathematics/` is a self-contained, deterministic package generated from a release definition by `tools/build-release`.

Package contents include the atlas snapshot, schemas, statistics, manifest,
SHA-256 checksums, license manifest and legal text, migration information,
changelog, and usage notes. Package format 0.2 also bundles applicable and
historical identity-migration documents so an archive does not depend on an
unresolved repository-relative pointer. Generated package files must not be
edited directly.

[`latest.json`](latest.json) is the deterministic machine-readable current
release pointer. Resolve it once, verify its digests, and pin the named release
for reproducible use.

```sh
tools/build-release
tools/build-release --check
```

Repository inclusion does not promote candidate records. Inspect the map release `status`, record-level statuses, confidence distributions, changelog, and known limitations before reuse.

To create the deterministic archive used for a GitHub release:

```sh
tools/archive-release 0.3.0-alpha
```
