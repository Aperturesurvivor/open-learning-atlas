# MSC2020 Coverage Audit

**Reviewed:** 2026-07-21

**Source:** [Mathematics Subject Classification 2020](https://msc2020.org/),
jointly maintained by Mathematical Reviews and zbMATH. The
[AMS classification browser](https://mathscinet.ams.org/mathscinet/msc/msc2020.html)
was used to inspect the two-digit subject coverage.

## Why It Was Consulted

MSC2020 is a mature, community-reviewed classification spanning pure and
applied mathematical literature. Its breadth makes it useful as a checklist
for whole-field omissions while drafting the mathematics macro atlas.

It is not an educational map. It classifies publications for researchers,
publishers, reviewing services, and other literature users. It does not state
what a learner can do, what knowledge a performance uses, or which capabilities
are prerequisites for another capability.

## Influence on the Atlas

The audit helped confirm that the candidate atlas visibly covers:

- logic and foundations;
- number theory and algebraic structures;
- analysis, differential equations, and dynamical systems;
- geometry and topology;
- probability and statistics;
- discrete mathematics and theoretical computer science;
- numerical analysis, optimization, information, and control;
- mathematical interfaces with physical, biological, environmental, and social
  systems.

It also prompted the explicit `Mathematical Modeling and Application
Interfaces` region rather than leaving applied mathematics invisible inside
method-only regions.

## Machine-readable disposition audit

The companion
[`crosswalks/msc2020-top-level-v0.3.json`](crosswalks/msc2020-top-level-v0.3.json)
accounts for every one of the 63 two-digit class codes. Each code is marked as
covered, represented through a downstream mathematical application interface,
or excluded as nonterrain, with explicit active OLA territory IDs and an
original rationale. `tools/validate-crosswalks` checks completeness, release
pinning, target identity, active status, and exclusion policy.

This is a breadth audit, not an equivalence claim: one literature class may
cross several educational territories, and one territory may answer several
classes.

MSC2020 alone is not accepted as field-appropriate evidence for an individual
territory. `tools/audit-coverage-evidence` requires every active territory to
have an additional URL-resolvable curriculum, standard, primary-mathematics, or
other focused coverage source with an explicit scope and gaps. This prevents a
whole-field classification from creating a false appearance of local evidence.

## What Was Not Imported

No MSC codes, classification text, hierarchy, or record set was copied into
Open Learning Atlas. The macro atlas uses original labels, definitions, aggregation,
and stable IDs under the Open Learning Atlas constitution.

This boundary is both methodological and legal. MSC2020 is published under a
[CC BY-NC-SA license](https://msc2020.org/). Any future decision to transform or
distribute MSC data must undergo a separate license review.

## Deliberate Differences

- History, biography, publication categories, and mathematics education are not
  mathematical capability terrain, so they are not macro regions in this map.
- Measurement is elevated because it is structurally important to mathematical
  learning and cross-domain reasoning even though research classifications
  organize the terrain differently.
- Mathematical practice is explicit and cross-cutting rather than implicit in
  subject headings.
- Applied research subjects are aggregated as application interfaces. Their
  domain knowledge belongs in other future base maps, while the mathematical
  structures they use can be shared here.
- No classification order was interpreted as dependency or instructional order.

## Open Questions

- Does the application-interface region preserve enough mathematical identity,
  or should some applied fields become overlays instead?
- Which advanced areas remain hidden by broad territories such as type, proof,
  and category foundations? The 0.2.0 alpha already split the formerly combined
  advanced-analysis territory into three reviewable successors.
- What other independent classifications should be used for adversarial coverage
  review without importing their curriculum or publication assumptions?
