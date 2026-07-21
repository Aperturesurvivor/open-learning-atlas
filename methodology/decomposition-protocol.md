# Territory Decomposition Protocol

**Status:** v0.1 candidate

This protocol turns a broad atlas territory into educationally meaningful
records without importing a textbook chapter order. It is the required method
for whole-atlas expansion toward Mathematics v1.0.

## Resolution Levels

### Region

A broad navigational area such as `Discrete Structures`. It is never assessed.

### Territory

A recognizable mathematical area such as `Graphs and Networks`. A territory is
still too broad to assess and may belong to several regions.

### Capability Family

A non-assessable composite grouping performances with a shared mathematical
purpose, such as `Analyze connectivity and paths in finite graphs`.

### Capability

A bounded class of observable performance with explicit objects, conditions,
and evidence dimensions. Capabilities are the smallest required resolution for
v1, but no node is claimed to be permanently atomic.

## Required Inputs

Before decomposition, collect:

- the territory record and every current parent region;
- adjacent and plausibly overlapping territories;
- at least one authoritative disciplinary overview or primary mathematical
  source suitable for coverage auditing;
- education, learning-science, or assessment evidence when making empirical
  learning claims;
- known terminology variants and scope disputes.

A literature classification may audit breadth but must not be converted into
a prerequisite graph merely because its headings are ordered or nested.

## Step 1: Bound the Territory

Write:

- one-sentence mathematical definition;
- explicit inclusions;
- explicit exclusions;
- interfaces with neighboring territories;
- suspected shared nodes;
- unresolved boundary disputes.

A boundary is useful when two contributors can tell whether a proposed record
belongs, overlaps, or needs a new territory without consulting a course title.

## Step 2: Inventory the Terrain

Inventory candidates separately before writing dependencies:

| Inventory | Prompt |
| --- | --- |
| Concepts | What objects, structures, relations, or ideas organize the territory? |
| Knowledge | Which definitions, properties, identities, theorems, or conventions are used? |
| Representations | In which symbolic, graphical, spatial, verbal, tabular, or computational forms does meaning appear? |
| Practices | Which observable cross-cutting modes of mathematical work are materially exercised? |
| Actions | What can someone distinguish, construct, calculate, transform, prove, model, interpret, or critique? |
| Failure modes | Which performances can succeed or fail independently? |

Do not turn every noun into a node. Create a durable record only when stable
identity, reuse, assessment, relationship, or disagreement benefits from it.

## Step 3: Form Capability Families

Group actions by shared mathematical purpose, not by textbook lesson. A family
should be broad enough to navigate but specific enough that its child
capabilities have a coherent object and evidence boundary.

A useful territory normally has several families involving different actions,
representations, or reasoning modes. The v1 minimum of two assessable nodes is
a floor, not evidence that two generic skills adequately decompose a field.

## Step 4: Write Bounded Capabilities

Use the constitutional grammar:

> Given **which class of situations**, a learner can perform **what observable
> action**, using **which objects or representations**, under **what
> conditions**, to **what quality or justification standard**.

A capability statement must be meaningful without an age, grade, course,
provider, lesson, project, or named assessment.

## Step 5: Apply the Split Tests

Split a proposed capability when materially different parts have:

1. independent success or failure;
2. different necessary dependencies;
3. substantially different representations or reasoning;
4. different diagnostic or instructional responses;
5. distinct evidence requirements.

Do not split only because surface contexts, numbers, notation, or story details
differ. Record variation as scope or evidence when the underlying performance
is the same.

## Step 6: Connect Content and Performance

For each capability, identify the concepts, knowledge, representations, and
practices it materially uses. Use typed edges rather than repeating content in
the capability label.

`composed_of` expresses membership. `uses_*` expresses invoked terrain.
Neither relation implies a learning sequence.

## Step 7: Test Dependency Claims

For every proposed `requires` edge, ask:

1. Can the subject be demonstrated at its declared scope without the object?
2. Does an alternative representation or method remove the dependency?
3. Is this necessity mathematical, semantic, representational, operational,
   empirical, task-conditional, method-conditional, or merely conventional?
4. Would narrowing the subject make the claim more honest?
5. Does the dependency create a cycle, and if so is the intended relation
   actually mutual reinforcement?

If several methods are independently sufficient, use an `any-of` or `at-least`
requirement group. Do not add every useful precursor as a hard requirement.

## Step 8: Reconcile Across Territories

Search the whole atlas by label, aliases, definition, object, and capability
statement before assigning a new ID. Reuse a shared node when the meaning is
the same. Create distinct nodes when scope or performance differs materially,
then connect them with an appropriate typed relation.

Regional membership is many-to-many. A node does not need a duplicate identity
to appear in several human views.

## Step 9: Attach Provenance and Uncertainty

Every record and edge must declare source references, claim basis, confidence,
status, and review notes. Contributor synthesis and AI assistance are valid
provenance categories but not substitutes for external evidence or review.

Record contrary evidence, alternate decompositions, and open questions rather
than averaging disagreements into vague language.

## Step 10: Validate and Review Separately

Run structural and semantic validation, then conduct separate reviews for:

- mathematical correctness;
- scope and duplicate identity;
- capability observability and split quality;
- dependency necessity and alternatives;
- representation and practice coverage;
- plain-language accessibility;
- provenance and redistribution rights.

Validation proves internal form, not correctness. Review status must identify
which dimensions an accountable human actually checked.

## Territory Completion Evidence

A territory reaches the v1 coverage floor only when:

- its boundary and interfaces are documented;
- it has at least five meaningful child records;
- at least two children or descendants are assessable capability/practice nodes;
- material concepts, knowledge, and representations are present;
- shared identities and neighboring overlaps were audited;
- every claim has rationale, confidence, status, and provenance;
- dependency review state is explicit;
- all validators pass;
- a coverage source note exists;
- known gaps and disputes remain visible.

Meeting the numeric floor does not make a shallow or misleading decomposition
complete. The split tests and review dimensions remain binding.
