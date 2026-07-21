# Open Learning Atlas Map Constitution

**Status:** v0.1 ratified 2026-07-21

**Scope:** the shared educational base map

**First domain:** mathematics

## Preamble

Open Learning Atlas exists to make knowledge and capability addressable.

The base map describes what concepts, knowledge, representations, practices,
and observable capabilities exist; how they relate; and which dependency
claims have enough support to be useful. It is shared semantic infrastructure,
not a curriculum, course sequence, assessment product, learner record, or
tutoring application.

The governing analogy is OpenStreetMap:

- the base map describes the terrain;
- other systems select destinations and routes;
- a person's location and travel history are separate from the map;
- disagreements and improvements are handled through transparent, versioned
  edits rather than hidden authority.

The initial artifact maps mathematics, but the architecture should admit other
educational domains without forcing every field into mathematics-specific
assumptions.

## Article 1: Mission

The map shall provide stable, inspectable identifiers and relationships for
educational knowledge and capability so that people and systems can refer to
the same underlying terrain.

It should eventually support many downstream uses without being controlled by
any one of them, including conventional curricula, personalized learning,
institutional targets, assessment evidence, AI tutoring, and curriculum audit.

The base map succeeds when independent people can use it to state precisely:

- what a learner may know or be able to do;
- how that capability relates to other knowledge and capabilities;
- what parts of the claim are accepted, proposed, conditional, or contested;
- how the claim changed over time.

## Article 2: Base-Map Boundary

The base map may contain:

- typed nodes for concepts, capabilities, knowledge, representations,
  practices, and composites;
- typed relationships among those nodes;
- definitions, scope boundaries, aliases, and explanatory notes;
- broad evidence expectations for observable capabilities;
- rationales, provenance, confidence, and review state for relationship claims;
- stable identifiers and change history.

The base map shall not contain:

- a particular learner's state, score, history, or inferred ability;
- mandatory ages, grades, courses, or school-year placement;
- a single prescribed learning sequence;
- a particular lesson, worksheet, tutoring script, or product workflow;
- a universal mastery threshold or one mandatory assessment;
- private model judgments or opaque generated relationships;
- project, curriculum, credential, or institutional requirements as if they
  were intrinsic properties of mathematics.

Those belong in overlays or downstream systems that reference stable map IDs.

## Article 3: One Typed Graph

The canonical map is one typed graph, not separate incompatible lists of
topics and skills. Every node has exactly one primary kind in a given version.

The map follows an **open-world assumption**: absence of a node or edge means
"not currently mapped," not "does not exist." Capability records therefore
state whether their dependency review is unreviewed, partial, or reviewed for
completeness at the declared scope.

### Concept

A mathematical or domain object, structure, relation, or idea.

Examples: rational number, function, symmetry, limit.

### Capability

An observable action a learner can perform with defined objects, conditions,
and quality expectations. Capability nodes are the central educational unit.

Examples: compare rational magnitudes; factor a quadratic polynomial; interpret
a derivative as a local rate of change.

### Knowledge

A definition, property, identity, theorem, convention, or other proposition a
learner may need to recognize, recall, explain, or use.

Examples: the definition of a prime number; the distributive property; the
Pythagorean theorem.

### Representation

A form in which mathematical objects or relationships can be expressed and
interpreted.

Examples: number line, fraction notation, table, coordinate graph.

### Practice

A cross-cutting mode of mathematical work that recurs across content regions.

Examples: estimate, model, justify, generalize, inspect error.

### Composite

A navigational or analytic grouping whose meaning is explicitly composed from
smaller nodes. A composite is useful for zooming out; it must not conceal its
components or be treated as an indivisible mastery claim.

Examples: proportional reasoning, symbolic algebra, statistical inference.

Concept, knowledge, representation, and composite nodes describe terrain; they
are not independently assessable. Observable interaction with them is expressed
through capability or practice nodes. Composite membership never implies that
the composite has been mastered.

Node kinds may be extended only through a reviewed schema change. A domain may
add subtypes without changing the shared primary kinds.

## Article 4: Capability Grammar

A capability statement should answer:

> Given **which class of situations**, a learner can perform **what observable
> action**, using **which objects or representations**, under **what
> conditions**, to **what quality or justification standard**.

Avoid unbounded statements such as "understands fractions" or "knows algebra."

A capability node should include:

- a concise label;
- a bounded capability statement;
- inclusions and exclusions when the boundary is not obvious;
- expected evidence dimensions, without prescribing one assessment;
- known aliases and equivalent language;
- domain tags and review state.

## Article 5: Granularity

The graph must support several zoom levels without confusing a broad composite
with an atomic capability.

Split a proposed capability when at least one of the following is materially
true:

1. a learner can demonstrate one part while consistently failing another;
2. the parts have different prerequisite structures;
3. the parts require substantially different representations or reasoning;
4. failure in each part calls for different repair or instruction;
5. each part requires distinct evidence.

Do not split solely because examples use different surface details.

Representation, independence, complexity, context novelty, and justification
may be evidence dimensions rather than new nodes. Create a separate node when
the distinction has independent prerequisites, failure modes, or instructional
meaning.

No node is declared permanently atomic. A later version may split or merge
nodes while preserving redirects and change history.

## Article 6: Relationship Semantics

An edge is a first-class, reviewable claim. It has its own stable identifier,
status, rationale, confidence, and provenance.

Every relationship is read as:

> **subject** `relation` **object**

The v0.1 relations are:

### `requires`

The subject cannot reasonably be demonstrated at the stated scope and
independence without the object. This is the strongest dependency claim.

Hard `requires` edges must be acyclic. Mutual development should be represented
with `reinforces`, not a dependency cycle.

### `supports`

The object materially helps development or performance of the subject but is
not claimed to be strictly necessary.

### `composed_of`

The subject is a larger composite whose meaning includes the object as a
component. This is composition, not instructional order.

### `uses_concept`

The capability or knowledge claim operates on or materially invokes the
concept.

### `uses_knowledge`

The capability materially relies on the definition, property, identity,
theorem, convention, or proposition represented by the knowledge node.

### `uses_representation`

The capability uses or interprets the representation at the stated scope.

### `uses_practice`

The capability materially exercises the cross-cutting mathematical practice.

### `represents`

The representation expresses, locates, or makes inspectable the concept,
knowledge claim, or relationship named by the object.

### `generalizes`

The subject extends the object to a broader class while preserving a meaningful
structural relationship.

### `special_case_of`

The subject is a constrained instance of the object.

### `equivalent_to`

The two nodes express the same meaning at the map's current granularity. This
relation is symmetric even when stored once.

### `transfers_to`

Competence in the subject is expected to improve performance in the object
outside a direct dependency claim.

### `reinforces`

Work on either node may strengthen the other. This relation is symmetric and
must not be used to hide a one-way prerequisite.

### `commonly_confused_with`

The nodes are diagnostically useful to compare because learners may conflate
them. This relation is symmetric and does not assert conceptual similarity by
itself.

New relation types require a definition, direction rule, compatible node kinds,
and migration implications.

### Conditional requirement groups

Pairwise `requires` edges cannot express every valid dependency structure. A
capability may admit several methods, any one of which is sufficient under
stated conditions. The map may therefore record first-class `all-of`, `any-of`,
and `at-least` requirement groups.

Each group names a target, two or more assessable member nodes, conditions,
rationale, confidence, provenance, and review status. A group must not be used
to smuggle a preferred method into a universal dependency claim.

## Article 7: Dependencies Are Conditional Claims

The map shall distinguish mathematical necessity from pedagogical convention.

A dependency edge may state conditions such as:

- independent symbolic performance;
- informal conceptual access;
- proof-level justification;
- use of a particular representation;
- exact rather than approximate methods;
- a bounded class of inputs.

"Usually taught before" is not sufficient rationale for `requires`.

When contributors disagree, the map should preserve the disagreement through a
proposed or contested edge, stated scope, and evidence record rather than
forcing premature certainty.

## Article 8: Identity And Addressability

Every node and edge receives an immutable, non-semantic identifier. Human
labels, slugs, domain placement, and descriptions may change without changing
identity.

Identifiers must not encode:

- grade or age;
- a mutable taxonomy path;
- a curriculum vendor;
- a temporary label;
- an assumed difficulty rank.

Machine references use IDs. Human interfaces may use labels and slugs.

Removed records are deprecated, not silently deleted. A deprecated node should
name its replacements or explain why none exists.

Use this identity test when revising a capability:

> If evidence that satisfied the old definition would no longer satisfy the
> revised definition, create a new ID rather than silently changing meaning.

## Article 9: Status, Confidence, And Provenance

Node and edge status is one of:

- `candidate` — drafted but not yet reviewed;
- `reviewed` — inspected against the schema and available evidence;
- `accepted` — part of a released reference map;
- `contested` — an active substantive disagreement is recorded;
- `deprecated` — retained for history and redirects.

Confidence is distinct from status. A well-reviewed claim can still have low or
medium confidence.

Substantive edges should include:

- a plain-language rationale;
- relevant scope or conditions;
- confidence;
- source or contributor provenance when available;
- review notes for uncertainty or disagreement.

AI-generated nodes and edges begin as `candidate`. AI may propose, compare, and
check records; it may not promote its own claims to accepted status.

An AI-assisted contribution should disclose the model's role and name a human
accountable for submitting or approving the claim before public release.

## Article 10: Evolution

The project distinguishes four kinds of version:

- permanent record identity;
- immutable record revision;
- immutable dataset release;
- schema and API version.

The map uses semantic releases for compatible dataset and schema evolution.

- Patch: wording, citations, or metadata that does not change meaning.
- Minor: compatible additions of nodes, edges, optional fields, or aliases.
- Major: incompatible schema or semantic changes.

Each record keeps its stable ID across compatible revisions.

When meaning changes materially:

- create a new node;
- deprecate or narrow the old node;
- record `replaced_by`, `split_into`, or `merged_into` links in change history;
- preserve enough information for downstream references to migrate.

Accepted releases should be reproducible from version-controlled source data.
Consumers should be able to pin an immutable release rather than silently
following the latest graph.

## Article 11: Neutrality And Pluralism

The base map should describe educational terrain without silently selecting one
curriculum, instructional philosophy, national standard, or product model.

The map may contain alternative decompositions and contested relationships when
the disagreement is explicit and useful. Neutrality does not mean every claim
is equally strong; confidence, evidence, and review status remain visible.

Grade bands, standards, courses, projects, credentials, and institutional
targets are overlays that reference the base map. They may influence proposals
but may not define node identity.

## Article 12: Contribution And Review

Each material contribution should answer:

1. What is being added, changed, split, merged, or deprecated?
2. Why does the record belong in the base map rather than an overlay?
3. Does the capability satisfy the grammar and granularity tests?
4. What existing IDs are related or potentially duplicated?
5. What rationale and evidence support each relationship claim?
6. What downstream references could the change affect?

Review should separately consider:

- mathematical correctness;
- educational observability;
- node boundary and granularity;
- relationship semantics;
- provenance and uncertainty;
- schema validity;
- backwards compatibility.

No contributor, institution, or model receives unreviewed authority over the
reference map.

Before public contribution begins, governance should name contributor,
reviewer, domain-steward, maintainer, and appeal responsibilities. Material
dependency claims, meaning changes, splits, and merges should receive review
independent of their proposer. Bulk imports, schema changes, license changes,
and constitutional changes require a documented proposal and elevated review.

## Article 13: Domain Extensions

The shared graph core should remain domain-agnostic. Mathematics may define
domain-specific subtypes, evidence dimensions, and relation guidance in its own
profile.

Future fields should reuse the common identity, status, provenance, and change
model while documenting where their knowledge structures differ. They should
not be forced into deterministic checking or strictly acyclic learning paths.

## Article 14: Views Are Derived

The canonical artifact is the typed, versioned claim graph. Trees, domain
hierarchies, learning progressions, and visual maps are generated views.

A view may filter by relation, confidence, review status, domain, or declared
conditions, but it must not silently change record meaning. No learner-facing
tree or institutional taxonomy becomes canonical merely because it is easier to
display.

## Article 15: Publication And Licensing

The canonical repository, dataset releases, methodology, and generated viewer
shall be publicly inspectable and reusable.

- Graph data and authored documentation are licensed under CC BY 4.0.
- Schemas, validators, build tooling, and viewer software are licensed under
  Apache-2.0.
- Third-party sources retain their own rights and are cited rather than silently
  incorporated.
- Contribution terms and review governance are documented in the repository.
- A public release must identify its licenses, provenance boundary, status
  distribution, and known limitations.

Open licensing does not make the project name or marks available as trademarks,
and reuse must not imply endorsement by maintainers or reviewers.

## Article 16: Human And Agent Parity

The canonical meaning of a record must be independently available to people and
AI agents. Human-readable pages, visualizations, machine-readable releases, and
programmatic interfaces are projections of the same records.

No canonical definition, condition, source, status, or relationship may exist
only in a private prompt, opaque embedding, visual layout, or undocumented
database field. Static, versioned map data must remain sufficient for complete
read access even if APIs or agent protocols are later provided.

## v0.1 Ratification Record

The v0.1 constitution was ratified on 2026-07-21 after:

- the machine-readable schema implements its required concepts;
- at least one mathematics example validates against the schema;
- a small map slice demonstrates each central node and edge distinction;
- unresolved questions are recorded rather than hidden;
- Josiah Wilson reviewed and accepted the architectural boundary and functional
  end goal.
