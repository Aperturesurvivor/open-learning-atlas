# Mathematics 0.3.0-alpha AI pre-validation audit

**Status: validation required**<br>
**Audit date:** 2026-07-22<br>
**Decision effect:** none — this document approves no territory and changes no review-ledger decision

## Bottom line

Mathematics 0.3.0-alpha is a substantial, machine-valid breadth scaffold. It is
not yet a trustworthy general mathematical skill/dependency map.

The audit found four release-blocking territory problems with concrete internal
or source-grounded evidence, 28 additional territories that should receive
early specialist attention, and graph-wide patterns that affect all 87
territories. Most importantly, the current release says very little about
mathematical necessity: only 4 of 2,947 active relationships are `requires`
claims, 511 of 519 assessable records have unreviewed dependencies, and none has
a complete dependency review. A consumer cannot yet safely interpret this
release as a prerequisite graph.

This is an AI-generated adversarial review, not expert consensus. It is useful
for finding likely problems and ordering human work. It cannot supply the
accountable mathematical, educational, or domain-specialist validation required
by the map constitution.

## Release pin

| Field | Value |
| --- | --- |
| Release | `mathematics-v0.3.0-alpha` |
| Tagged commit | `95a821b681e85b02286fac160426795fa6618476` |
| Release JSON | `map/releases/mathematics-v0.3.0-alpha.json` |
| SHA-256 | `91c7b194f5552d83f7ad0ec526cddbbaeddeca9aa7b83d223dbf790fe81deda3` |
| Active records | 1,212 nodes; 2,947 edges; 87 territories |
| Review ledger at audit | 0 approved; 87 pending |

## What was checked

The audit inspected every territory's definition, descendants, assessable
capabilities, structural inventory, dependency state, and coverage records. It
also examined graph-wide schema usage and compared the strongest omission
findings with the project's cited primary course/text sources.

The deterministic portion is reproducible:

```sh
tools/audit-validation-risk --pretty
```

The tool reports review signals, not failures or approvals. Label punctuation,
missing optional fields, and repeated templates are heuristics; each affected
record still needs contextual judgment.

## P0 — correct before treating the release as broadly complete

### 1. Complex Analysis is materially under-decomposed

The territory definition includes differentiation, integration, series,
singularities, analytic continuation, and conformal structure. Its entire
assessable decomposition is:

- `Analyze complex differentiability`
- `Evaluate a bounded contour integral`

The project's cited [MIT 18.04 calendar](https://ocw.mit.edu/courses/18-04-complex-variables-with-applications-spring-2018/pages/calendar/)
separately covers Cauchy theory, harmonic functions, Taylor and Laurent series,
residues, conformal transformations, the argument principle, transforms, and
analytic continuation. Those are not represented as capabilities in the
territory. The record passes the automated floor only because the floor requires
two assessable descendants.

Territory: [`ola:n:2789e8ed-9858-47b9-83d8-59c15a0180cc`](https://aperturesurvivor.github.io/open-learning-atlas/#/node/ola%3An%3A2789e8ed-9858-47b9-83d8-59c15a0180cc)

### 2. Measure and Functional Analysis is materially under-decomposed

The definition names measure, integration, normed and function spaces, linear
functionals, bounded operators, and infinite-dimensional convergence. Its only
assessable descendants are:

- `Analyze function-space convergence`
- `Compute a measure or Lebesgue integral in scope`

The cited [MIT 18.102 calendar](https://ocw.mit.edu/courses/18-102-introduction-to-functional-analysis-spring-2021/pages/calendar/)
distinguishes Banach-space theory, bounded operators, quotient spaces, major
functional-analysis theorems, duality, measure and integration, Lp and Hilbert
spaces, compact operators, spectra, and the spectral theorem. The current
territory cannot represent mastery or failure across those independent areas.

Territory: [`ola:n:552eff8f-c77c-405c-bc1a-322ce217dc7b`](https://aperturesurvivor.github.io/open-learning-atlas/#/node/ola%3An%3A552eff8f-c77c-405c-bc1a-322ce217dc7b)

### 3. Harmonic and Operator Analysis is materially under-decomposed

The definition names frequency and basis decompositions, transforms,
convolution, operators, spectra, and representation structures. Its only
assessable descendants are:

- `Analyze a Fourier representation`
- `Apply and analyze a bounded linear operator`

The cited [MIT 18.103 readings](https://ocw.mit.edu/courses/18-103-fourier-analysis-fall-2013/pages/readings/)
already distinguish measure, Lp and Hilbert structure, Fourier-series
convergence, Fourier integrals, and transforms of measures. The project's own
coverage note additionally says abstract harmonic analysis, noncommutative
analysis, wavelets, distributions, and full operator theory require specialist
sources. The present two-capability decomposition is therefore neither a
complete broad territory nor an explicitly narrow one.

Territory: [`ola:n:dd589d45-354d-4075-9de1-5b9b95dbb644`](https://aperturesurvivor.github.io/open-learning-atlas/#/node/ola%3An%3Add589d45-354d-4075-9de1-5b9b95dbb644)

### 4. Counting, Numeration, and Cardinality contradicts its own boundary

The territory definition explicitly includes “the size of finite or infinite
collections.” Every assessable descendant is about finite counting,
correspondence, or place value. There is no capability or content decomposition
for countability, uncountability, infinite cardinal comparison, or cardinal
arithmetic. Either the territory boundary must be narrowed to finite
cardinality or the infinite branch must be mapped.

Territory: [`ola:n:0cab0be3-5531-474d-bc2b-d3dd90c78fa3`](https://aperturesurvivor.github.io/open-learning-atlas/#/node/ola%3An%3A0cab0be3-5531-474d-bc2b-d3dd90c78fa3)

## Graph-wide validation blockers

### Dependency topology is almost entirely unvalidated

- 511 assessable records are `unreviewed`; 8 are `partial`; 0 are complete.
- The release contains 4 `requires` claims and one requirement group.
- The other active relationships are predominantly composition and use claims.

This is honest alpha metadata, but it means the atlas cannot yet answer the
central “what must be mastered first?” question reliably. Every proposed
`requires` edge needs a scoped necessity argument; plausible influences should
remain `supports` or another non-necessity relation.

### Scope and conditions are usually implicit

- 1,207 of 1,212 active nodes have no explicit `scope` value.
- 2,946 of 2,947 active edges have no explicit `scope` value.
- 2,937 of 2,947 active edges have no `conditions` value.
- 75 capability statements use words such as `bounded`, `in scope`, or
  `appropriate` without resolving that boundary in the node's scope field.

Not every record needs conditions, and absence is not automatically an error.
At this scale, however, implicit scope makes claims hard for people or agents to
compare, test, or safely reuse.

### The decomposition is mechanically uniform

- 486 of 519 assessable records use their capability statement verbatim as
  their definition.
- The same 486 records use exactly the same six evidence dimensions:
  `accuracy`, `representation`, `explanation`, `justification`, `variation`,
  and `error-analysis`.
- Most territories contain one knowledge record and one bundled representation
  record regardless of the field's internal structure.

Uniformity is not itself wrong, but here it is strong evidence that schema
completion outran domain-specific evidence design. A specialist should decide
what distinct evidence would actually establish each capability.

### Many records bundle independently learnable objects

A punctuation/conjunction heuristic flags 97 of 180 concept labels, 69 of 87
knowledge labels, and 73 of 91 representation labels. Examples include:

- `Agent, preference, strategy, and equilibrium`
- `Curry–Howard, universal property, and coherence`
- `Gradient, KKT, and strong duality conditions`
- `Map, grid, time series, orbit, and field representation`
- `Game tree, payoff matrix, market flow, and price path`
- `Proof term, type derivation, and commutative diagram`

These items often have different prerequisites, failure modes, repair paths,
and mastery evidence. The map constitution's split tests should be applied to
each flagged bundle.

### Cross-cutting practices are disconnected from content

The map has 56 practice records but only one active `uses_practice` claim.
Justification, modeling, estimation, communication, representation, and error
critique mostly exist as parallel composition territories rather than practices
used by mathematical capabilities. This prevents consumers from seeing which
content skills actually exercise which mathematical practices.

### Evidence breadth is too thin to function as validation

After excluding contributor analysis and the whole-field MSC2020 breadth
checklist, the release has 22 qualifying field sources. Seventy-three of 87
territories have exactly one such source, and only one source is typed
`primary-mathematics`; most are curricula, standards, or broad guides. Several
coverage records explicitly say that specialist sources remain necessary.

Curricula are useful discovery and coverage evidence. They are not independent
proof that the atlas chose correct identities, boundaries, splits, or
dependencies. Each high-level field needs disciplinary reference works and an
accountable specialist review.

For example, the cited [Graph Theory contents](https://diestel-graph-theory.com/Contents.pdf)
separately treats matching, higher connectivity, planarity, coloring, flows,
extremal and infinite graph theory, Ramsey theory, random graphs, and graph
minors. The `Graphs and Networks` coverage record itself acknowledges that the
current corridor has not decomposed most of these.

### Interoperability metadata is unfinished

All 1,212 active nodes have an empty or absent `aliases` field. Stable IDs are
the correct identity mechanism, but aliases and terminology crosswalks are
needed for search, source alignment, duplicate detection, and agent matching
across mathematical communities.

## P1 — early specialist review queue

These 28 territories have unusually broad titles, combined mature fields,
source/decomposition mismatches, or elementary decompositions under broad
boundaries. P1 is a triage label, not a finding that every listed record is
wrong.

| Territory | Primary validation question |
| --- | --- |
| Biological and Medical Mathematics | Is this a downstream application overlay, and are biostatistics, epidemiology, imaging, physiology, and biological dynamics represented rather than collapsed? |
| Causal, Multivariate, and Computational Statistics | Should three mature statistical areas be split, and do introductory statistics sources support the claimed boundary? |
| Coding and Information Theory | Are coding theory and information theory separately represented and supported by specialist sources? |
| Combinatorics and Counting Probability | Does the elementary enumeration decomposition justify the broad combinatorics label? |
| Control and Inverse Problems | Do control, observability/controllability, inverse problems, ill-posedness, and regularization require separate structures? |
| Convex, Discrete, and Computational Geometry | Should three geometrical fields with different objects and methods be split? |
| Differential and Algebraic Geometry | The cited source is differential-geometric and its gap note admits algebraic geometry needs more coverage; should the territory split? |
| Differential Equations and Dynamical Systems | Are ODEs, PDEs, qualitative dynamics, stability, bifurcation, and numerical behavior materially represented? |
| Divisibility and Number Theory | Is the intended scope elementary number theory, or are prime distribution, algebraic/analytic number theory, and deeper arithmetic structure omitted? |
| Earth, Environmental, and Space Sciences | Is this an application interface rather than canonical mathematical terrain, and are its domain models sourced independently? |
| Economics, Finance, and Game Theory | Should three application fields and their different mathematical objects be separated? |
| Exact and Symbolic Computation | The numerical-analysis source disclaims exact symbolic/formal coverage; add computer-algebra and formal-methods evidence. |
| Graphs and Networks | Reconcile the corridor with the cited text's matching, planarity, coloring, flow, extremal, random, infinite, Ramsey, and minor branches. |
| Groups, Rings, Fields, and Modules | Separate or explicitly connect the structures; current generic axioms/homomorphism capabilities do not represent field extensions, ideals, or module theory. |
| Mathematical Physics | Define whether this is a mathematical field, an application interface, or several theory-specific overlays. |
| Mechanics, Continua, and Fluids | Validate the aggregation of particle mechanics, continuum mechanics, elasticity, and fluid dynamics. |
| Model Theory | Add model-theory-specific disciplinary sources and validate syntax/semantics, structures, compactness, completeness, categoricity, and definability coverage. |
| Numerical Linear Algebra | Add specialist evidence for conditioning, factorizations, iterative methods, eigenproblems, sparsity, and stability. |
| Operations Research and Decision Science | Validate whether optimization, queues, inventory, networks, simulation, and decision analysis need separate territory identities. |
| Order, Lattices, and General Algebra | Current decomposition is dominated by posets/lattices; determine what “General Algebra” adds and map it or narrow the label. |
| Polynomial Algebra | The definition promises ideals and structural extensions while capabilities are primarily elementary polynomial manipulation; narrow or expand. |
| Real and Complex Number Systems | Validate completeness, constructions/extensions, topology/order, and algebraic behavior beyond computation and representation. |
| Set-Theoretic Foundations | Add specialist sources and validate axioms, ordinals, cardinals, choice, models/independence, and the boundary with elementary sets. |
| Stochastic Processes, Decision, and Risk | Decide whether stochastic processes, sequential decision, and risk theory are one territory or connected territories. |
| Tensors and Multilinear Structure | The linear-algebra source gap calls for specialist tensor coverage; validate tensor products, multilinear maps, coordinates, contractions, and geometric uses. |
| Theoretical Computer Science and Complexity | The decomposition emphasizes complexity; validate algorithms, automata, logic, semantics, randomized/approximation, and field boundary. |
| Topology and Manifolds | Validate general/algebraic/differential topology and manifold structure rather than treating them as one shallow unit. |
| Type, Proof, and Category Foundations | Type theory, proof theory/Curry–Howard, and category theory have different objects and dependencies; likely split or explicitly scope. |

## P2 — no territory is cleared by this audit

The following 55 territories did not produce a comparably specific P0/P1
exception during this pass. They still inherit every graph-wide blocker above
and still require all eight human review decisions. P2 means “normal validation
queue,” not “correct.”

- Abstraction and Generalization
- Arithmetic Operations and Properties
- Association and Regression
- Computability and Decidability
- Conditional Probability and Dependence
- Congruence, Similarity, and Symmetry
- Continuous and Convex Optimization
- Coordinate and Analytic Geometry
- Data Generation and Study Design
- Data Representation and Visualization
- Derived Measurement
- Descriptive Statistics
- Differentiation and Integration
- Dimensional Analysis
- Discrete Optimization
- Eigen, Spectral, and Inner-Product Structure
- Equations, Inequalities, and Systems
- Equivalence and Symbolic Transformation
- Error, Uncertainty, and Critique
- Estimation and Bounding
- Estimation, Hypothesis, and Inference
- Euclidean and Synthetic Geometry
- Expectation and Variability
- Exponential and Logarithmic Structure
- Function Families and Transformations
- Geometric Transformations
- Justification and Proof
- Length, Area, Volume, and Angle
- Limits and Continuity
- Linear Transformations
- Magnitude, Order, and Comparison
- Mathematical Communication
- Mathematical Modeling
- Matrices and Linear Systems
- Measurable Attributes, Units, and Scales
- Numerical Analysis and Approximation
- Numerical Representation and Error
- Pattern and Structure
- Precision, Tolerance, and Measurement Uncertainty
- Problem Formulation and Conjecture
- Propositions, Predicates, and Inference
- Random Variables and Distributions
- Rates of Change and Local Behavior
- Rational and Proportional Structure
- Relations, Functions, and Dependence
- Representation and Translation
- Sample Spaces and Events
- Sequences, Series, and Recurrence
- Sets, Relations, and Finite Structures
- Simulation and Computational Modeling
- Statistical Modeling
- Trigonometry
- Variables and Expressions
- Vectors and Vector Spaces
- Whole Numbers and Integers

## Recommended validation sequence

1. Correct the four P0 territories or explicitly narrow their boundaries.
2. Recruit field specialists for the P1 queue and record attributed decisions
   across all eight review dimensions.
3. Run a granularity pass over every flagged concept, knowledge, and
   representation bundle using the constitution's independent-failure,
   dependency, representation, repair, and evidence tests.
4. Define explicit scope where words such as `bounded`, `appropriate`, or `in
   scope` carry semantic weight.
5. Design domain-specific evidence dimensions and observable mastery criteria;
   do not accept a generic six-item list as sufficient by default.
6. Build and review dependency corridors. Reserve `requires` for scoped
   necessity and represent alternatives with requirement groups.
7. Connect cross-cutting practices to the content capabilities that use them.
8. Add disciplinary reference works, terminology aliases/crosswalks, and
   reviewer attribution before claiming v1 completeness.

## Exit conditions for this audit issue

The GitHub validation issue associated with this document can close when:

- every P0 finding is resolved or rejected with a cited, accountable rationale;
- every P1 territory has an attributed specialist disposition;
- all 87 territories have complete review-ledger decisions;
- dependency-review state is honest and sufficiently complete for advertised
  prerequisite use cases;
- the final v1 release gate passes without treating this AI audit as human
  review evidence.

## Limitations

This pass did not prove every theorem, independently reconstruct all of
mathematics, empirically test learner performance, or establish a unique ideal
ontology. It used the release's own boundaries and sources to look for internal
contradictions, material omissions, aggregation risks, weak evidence patterns,
and unsupported dependency claims. Absence from P0/P1 is not evidence of
correctness. Model benchmark performance, however strong, would not remove the
need for attributed domain review of an open public standard.
