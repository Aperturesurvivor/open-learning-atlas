# Pinned release packages

Each directory under `mathematics/` is a self-contained, deterministic package generated from a release definition by `tools/build-release`.

Package contents include the atlas snapshot, schema, statistics, manifest, SHA-256 checksums, license manifest and legal text, migration pointer, changelog, and usage notes. Generated package files must not be edited directly.

```sh
tools/build-release
tools/build-release --check
```

Repository inclusion does not promote candidate records. Inspect the map release `status`, record-level statuses, confidence distributions, changelog, and known limitations before reuse.

To create the deterministic archive used for a GitHub release:

```sh
tools/archive-release 0.1.0-alpha
```
