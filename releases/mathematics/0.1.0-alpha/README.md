# Open Learning Atlas: Mathematics 0.1.0-alpha

This is a self-contained, pinned open-data release package. All included mathematical records and claims retain their explicit record-level status; package inclusion is not expert acceptance.

## Files

- `atlas.json` — complete typed claim graph.
- `schema.json` — JSON Schema for the release format.
- `manifest.json` — package identity and per-artifact digests.
- `statistics.json` — status, confidence, kind, and relation distributions.
- `checksums.sha256` — SHA-256 verification for every other package file.
- `migrations.json` — prior-release and migration pointers.
- `diff.json` — added, removed, and revision/field changes from the prior release.
- `license-manifest.json`, `LICENSE-data.txt`, and `NOTICE.txt` — reuse terms and attribution.
- `CHANGELOG.md` — scope, changes, and known limitations.

## Verify

```sh
sha256sum --check checksums.sha256
```

Agents should resolve and cite stable `ola:` IDs, preserve record revisions, filter status explicitly, and treat missing claims as unmapped rather than false.
