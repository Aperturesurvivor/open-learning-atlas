# Mathematics Macro Atlas

**Status:** candidate v0.1

**Canonical data:**
[`mathematics-macro-v0.1.json`](mathematics-macro-v0.1.json)

This is the first breadth-first map of mathematics under the Open Learning Atlas
constitution. It contains 99 stable-ID nodes and 115 reviewable membership
claims:

- one mathematics root;
- 13 broad navigational regions;
- 85 second-level territories;
- 15 territories deliberately belonging to more than one region.

Every record remains a candidate. The atlas is not a set of grades, courses,
difficulty levels, prerequisites, or recommended learning sequences. At this
resolution, every node is a non-assessable composite. Deeper work will split
selected territories into concepts, knowledge, representations, practices,
and observable capabilities.

## Major Regions

### Mathematical Practice and Reasoning

Representation and translation; pattern and structure; abstraction and
generalization; problem formulation and conjecture; justification and proof;
estimation and bounding; mathematical modeling; error, uncertainty, and
critique; mathematical communication.

### Quantity and Number Systems

Counting, numeration, and cardinality; magnitude, order, and comparison; whole
numbers and integers; rational and proportional structure; real and complex
number systems; arithmetic operations and properties; divisibility and number
theory.

### Algebraic Structure and Symbolic Relations

Equivalence and symbolic transformation; variables and expressions; equations,
inequalities, and systems; polynomial algebra; exponential and logarithmic
structure; groups, rings, fields, and modules; order, lattices, and general
algebra.

### Functions, Variation, and Analysis

Relations, functions, and dependence; sequences, series, and recurrence;
function families and transformations; rates of change and local behavior;
limits and continuity; differentiation and integration; differential equations
and dynamical systems; measure, functional, complex, and harmonic analysis.

### Space, Shape, and Transformation

Euclidean and synthetic geometry; coordinate and analytic geometry; congruence,
similarity, and symmetry; geometric transformations; trigonometry; differential
and algebraic geometry; topology and manifolds; convex, discrete, and
computational geometry.

### Measurement and Dimensional Reasoning

Measurable attributes, units, and scales; length, area, volume, and angle;
derived measurement; dimensional analysis; precision, tolerance, and
measurement uncertainty; error, uncertainty, and critique.

### Data, Statistics, and Inference

Data generation and study design; data representation and visualization;
descriptive statistics; association and regression; statistical modeling;
estimation, hypothesis, and inference; causal, multivariate, and computational
statistics.

### Probability and Stochastic Structure

Sample spaces and events; combinatorics and counting probability; conditional
probability and dependence; random variables and distributions; expectation and
variability; stochastic processes, decision, and risk.

### Discrete Structures

Sets, relations, and finite structures; combinatorics and counting probability;
graphs and networks; sequences, series, and recurrence; coding and information
theory; theoretical computer science and complexity; discrete optimization;
convex, discrete, and computational geometry; computability and decidability.

### Linear and Multilinear Structure

Vectors and vector spaces; matrices and linear systems; linear transformations;
eigen, spectral, and inner-product structure; tensors and multilinear structure;
numerical linear algebra.

### Logic and Foundations

Propositions, predicates, and inference; justification and proof; set-theoretic
foundations; model theory; computability and decidability; type, proof, and
category foundations.

### Computation, Approximation, and Optimization

Exact and symbolic computation; numerical representation and error; numerical
linear algebra; numerical analysis and approximation; theoretical computer
science and complexity; continuous and convex optimization; discrete
optimization; simulation and computational modeling; control and inverse
problems; operations research and decision science; convex, discrete, and
computational geometry; computability and decidability.

### Mathematical Modeling and Application Interfaces

Mathematical modeling; differential equations and dynamical systems; stochastic
processes, decision, and risk; coding and information theory; control and inverse
problems; mechanics, continua, and fluids; mathematical physics; biological and
medical mathematics; economics, finance, and game theory; earth, environmental,
and space sciences; operations research and decision science.

## Why This Is a Graph

The 15 multi-region territories carry the most important structural claim in
this first release. Recurrence is both analytic and discrete. Numerical linear
algebra is both linear mathematics and computation. Mathematical modeling is
both a practice and an application interface. Computability belongs to logic,
discrete structure, and computation.

These are shared nodes with one stable identity, not duplicated topics and not
generic “related to” links. The same approach can later let a capability sit
inside several useful projections without changing what the capability is.

## Resolution Boundary

A territory is intentionally too broad to assess. “Trigonometry,” “statistical
modeling,” and “divisibility and number theory” are map areas, not skills.
Decomposition will be local and evidence-bearing: a territory may contain
concepts, representations, knowledge, practices, and capabilities connected by
typed claims.

No prerequisite edges appear in the macro atlas. Prerequisites become defensible
only after capabilities have bounded performance statements and explicit scope.

## Coverage Audit

The atlas was checked against MSC2020 for omissions across research and applied
mathematics. MSC codes, labels, and hierarchy were not imported. See
[`../../sources/msc2020-coverage-audit.md`](../../sources/msc2020-coverage-audit.md)
for the purpose mismatch, licensing boundary, and resulting design decisions.

## Next Map Work

1. Review the 13-region boundary and the 15 shared-territory decisions.
2. Identify conspicuous missing territories or composites that are too broad.
3. Define a repeatable territory-decomposition protocol.
4. Deep-map a few contrasting territories before treating the macro topology as
   stable.
