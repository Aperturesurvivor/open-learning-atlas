# Map renderer fidelity ledger

Reference: `map-renderer-concept-forest-copper.png`

Latest implementation captures:

- `../output/playwright/atlas-desktop.png` at 1440 × 900
- `../output/playwright/atlas-mobile.png` at 390 × 844

## Comparison

1. **Dominant horizontal map — match.** The graph remains the main workspace,
   arranged left to right with curved connectors, quiet column guides, a
   minimap, and compact zoom controls.
2. **Forest Copper light theme — match.** The implementation uses forest
   `#367D50`, copper `#A17045`, cool green `#F3F8F5`, and neutral border
   `#D1D1D1` as semantic tokens. Cards remain white and there are no gradients.
3. **Persistent inspector — match.** The right panel retains goal selection,
   capability evidence, prerequisites, related records, review state, and
   provenance. Its content is real Atlas data rather than concept copy.
4. **Compact application chrome — match.** Brand, navigation, global search,
   region selector, goal count, and avatar follow the reference hierarchy.
5. **Active-path emphasis — match.** The selected territory, structure, and
   capability are joined by a stronger forest route; unrelated composition
   edges recede into gray-green.
6. **Prerequisite weave — intentional extension.** Copper, directed loops show
   every explicit `requires` edge whose endpoints are visible. Links touching
   the selected capability become solid; the remaining dependency context is
   dashed. This was added after the concept review so the renderer does not
   reduce the Atlas to a simple taxonomy.
7. **Information architecture — intentional deviation.** The concept's
   “Foundations / Core relationships / Applications” headings were replaced by
   “Territories / Structures / Capabilities & representations.” The canonical
   release's composition graph does not establish a pedagogical sequence, so
   the implementation avoids making that unsupported claim.
8. **Responsive behavior — adapted.** At 390 px, the map remains a pannable
   horizontal canvas and the inspector moves below it. Nonessential header
   controls collapse while search stays available.

## Copy differences

Concept labels and definitions were illustrative. The implementation renders
the bundled Mathematics `0.3.0-alpha` release verbatim, including candidate
status, confidence, source count, capability statements, and stable IDs.

## Verified interactions

- Search across all 1,213 records and navigate into the corresponding branch.
- Select territories, structures, capabilities, and linked inspector records.
- Add or remove a class goal and retain it across browser reloads.
- Follow prerequisite records from the inspector.
- Pan, zoom, zoom out, zoom in, and fit the graph.
