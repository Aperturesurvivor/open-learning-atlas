# Canonical Atlas Authoring Data

`atlas/` is the editable source of truth. The files are intentionally divided
into small JSON arrays so that people and agents can review focused changes
without editing one enormous document.

The compiler discovers every `*.json` file in the category directories,
deduplicates identical stable IDs, rejects conflicting IDs or slugs, sorts
records deterministically, and writes the connected release document:

```sh
tools/build-atlas
tools/build-atlas --check
tools/validate-map map/releases/mathematics-v0.1.0-alpha.json
```

Do not edit a generated file in `map/releases/` directly. A record may be
referenced from any authoring fragment, but its `ola:` identity is global.
