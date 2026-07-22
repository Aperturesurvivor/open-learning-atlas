# Agent and software query guide

The visual atlas is optional. Complete read access is available through pinned JSON, checksummed release packages, and standard-library command-line tools.

## Choose a version first

Do not silently read a moving branch when reproducibility matters. Use a tagged package or record both the map version and commit SHA. The current alpha package lives at:

```text
releases/mathematics/0.3.0-alpha/
```

Stable tagged downloads are published at the
[Mathematics 0.3.0-alpha GitHub release](https://github.com/Aperturesurvivor/open-learning-atlas/releases/tag/mathematics-v0.3.0-alpha).
For raw-file access pinned to that tag, replace `main` with
`mathematics-v0.3.0-alpha` in GitHub URLs.

Consumers that deliberately follow the current release can resolve
[`releases/latest.json`](../releases/latest.json), verify its dataset and
manifest digests, and then pin the returned version or tag. Reproducible work
should not continue following the pointer silently after resolution.

Verify it from inside that directory:

```sh
sha256sum --check checksums.sha256
```

Inspect `manifest.json`, `statistics.json`, and `CHANGELOG.md` before consuming `atlas.json`. Package inclusion does not convert a `candidate` record into an accepted claim.

## Query without dependencies

`tools/query-atlas` writes JSON to standard output and accepts a different pinned release through `--release`.

```sh
tools/query-atlas --pretty stats
tools/query-atlas --pretty resolve graphs-networks
tools/query-atlas --pretty search "graph connectivity" --limit 5
tools/query-atlas --pretty path graphs-networks
tools/query-atlas --pretty neighbors graphs-networks --direction outgoing
tools/query-atlas --pretty expand rational-proportional-structure --assessable-only
tools/query-atlas --pretty requirements determine-missing-proportional-value
```

Resolution is exact for stable IDs and slugs. Search is discovery, not identity; cache and cite the returned `ola:` ID plus record revision.

## Plain JSON traversal

Equivalent `jq` examples against a downloaded `atlas.json`:

```sh
# Resolve a stable ID.
jq --arg id 'ola:n:6554260b-2e0c-41ac-b9b9-cdaa7109cffa' \
  '.nodes[] | select(.id == $id)' atlas.json

# List outgoing claims with their object records.
jq --arg id 'ola:n:6554260b-2e0c-41ac-b9b9-cdaa7109cffa' '
  . as $atlas
  | .edges[] as $edge
  | select($edge.subject == $id)
  | $edge + {object_record: ($atlas.nodes[] | select(.id == $edge.object))}
' atlas.json

# Count statuses explicitly.
jq '[.nodes[].status] | group_by(.) | map({status: .[0], count: length})' atlas.json
```

## Open-world and direction rules

- Every edge reads `subject relation object`.
- A missing edge means “not mapped in this release,” not “false.”
- `composed_of` is coverage/navigation, not prerequisite order.
- `requires` is scoped necessity and may be qualified by conditions.
- Alternative sufficient methods appear in requirement groups; do not turn every group member into a universal prerequisite.
- Filter `status` and `confidence` according to the consumer’s policy. Never infer acceptance from presence.

## Downstream overlays

Run `tools/run-conformance` to see target expansion, synthetic curriculum coverage, and synthetic learner-gap operations. Those examples reference stable map IDs while keeping curricula and learner state outside the canonical dataset.

## Citation

A machine-resolvable citation should include at least:

```json
{
  "project": "Open Learning Atlas: Mathematics",
  "map_version": "0.3.0-alpha",
  "record_id": "ola:n:6554260b-2e0c-41ac-b9b9-cdaa7109cffa",
  "record_revision": 1,
  "status": "candidate"
}
```

Retain source IDs when reproducing a definition or relationship rationale.
