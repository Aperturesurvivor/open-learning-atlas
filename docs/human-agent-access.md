# Human and Agent Access Contract

Open Learning Atlas must be independently understandable to people and AI
agents. Accessibility is an architectural requirement, not a documentation
polish step.

## One Canonical Meaning

Human pages, machine releases, APIs, and visualizations are generated from or
link back to the same canonical records. No canonical definition, status,
condition, source, or relationship may exist only in a visual interface,
private prompt, embedding, or undocumented database field.

## Human Requirements

The public experience must provide:

- a plain-language explanation of the atlas and its limits;
- mobile-first search and progressive zoom from region to node;
- readable definitions before internal identifiers;
- visible relation direction, rationale, conditions, claim basis, confidence,
  provenance, review state, and stable identity;
- permanent shareable links for node and relationship records;
- keyboard, screen-reader, reduced-motion, and high-contrast support;
- alternatives to color as the only carrier of meaning;
- explanations when a claim is candidate or contested.

## Agent Requirements

The repository and releases must provide:

- `llms.txt` as a concise semantic entry point;
- stable, versioned JSON documents and release manifests;
- a published JSON Schema and executable semantic validator;
- resolvable stable IDs and machine-readable redirects;
- explicit status, confidence, conditions, provenance, and revisions;
- deterministic release artifacts with checksums;
- query and traversal examples that do not require scraping the visual site;
- pinned-version access in addition to a latest-release pointer.

An API or MCP server may improve convenience later, but static versioned data
must remain sufficient for complete read access.

## Parity Tests

A release fails this contract if:

- the visual site shows a relationship absent from released data;
- an agent must infer record status from prose;
- a person cannot discover the meaning or provenance of a visible edge;
- a node or relationship deep link cannot independently resolve from its stable
  identity;
- stable links change when a label or hierarchy changes;
- the latest release cannot be reconstructed from repository artifacts;
- core use requires an account, proprietary client, or private API key.
