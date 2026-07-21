# Viewer fidelity ledger

Compared on 2026-07-21 using the accepted generated references and live-browser screenshots at 1536×1024 and 390×844.

| Design point | Reference intent | Working implementation | Result |
| --- | --- | --- | --- |
| Desktop shell | Navigation, dominant atlas canvas, and inspector form one uninterrupted working surface. | 272px navigation, flexible SVG canvas, and 360px data inspector fill the viewport. | Match |
| Mobile shell | Search and map stay primary; inspection becomes a bottom sheet. | Navigation is a drawer, the map remains visible, and the inspector has collapsed and expanded states. | Match |
| Editorial-cartographic tone | Pale cool ground, fine lines, restrained serif headings, muted categorical color. | The same visual hierarchy and token family are used without marketing sections, gradients-as-decoration, or dark mode. | Match |
| Progressive graph | A selected node anchors a legible local constellation rather than a hairball. | Root, region, and neighborhood views are deterministically laid out with structural and semantic line styles. | Match; exact topology is canonical |
| Inspector | Title, type/review state, overview, relationships, provenance, open data, and share action. | All are present; the implementation additionally exposes stable identity, confidence, assessability, scope, and review notes. | Match plus trust detail |
| Search and filtering | Persistent search and kind controls are obvious on both sizes. | Full-record search supports label, slug, definition, and ID; kind filters are keyboard and touch accessible. | Match |
| Status strip | Desktop summarizes graph scale, openness, date, and license. | Counts are computed from the release: 1,210 records and 2,937 relationships, plus update and license. | Match with canonical values |
| Mobile touch scale | Nodes and controls remain usable at phone width. | The phone graph uses a compact 720×600 coordinate system, larger nodes, 34–44px controls, and an expandable inspector. | Match within the shorter 390×844 viewport |
| Base-map boundary | The interface must not imply grade, course, curriculum, progress, or prescribed order. | A persistent notice names the canonical base map; no learner state or route controls exist. | Match |
| Icon language | One quiet outline family supports controls. | Lucide outline icons plus a project-specific network mark are used consistently. | Match |

## Above-the-fold copy comparison

Desktop reference: “Open Learning Atlas”, “Mathematics alpha”, “Search the atlas”, “Graphs and Networks”, “Overview”, “Relationships”, “Candidate”, “Open data”, and “Copy deep link”.

Desktop implementation: preserves every product/action term. Its default deep-link-free state selects “Mathematics” and says “Atlas overview”; navigating to the demonstrated record changes the title to “Graphs and Networks” and the mode to “Local neighborhood”. Counts and relationship names come from the release instead of illustrative mockup copy.

Mobile reference: the same product/search/selection language with a map-first bottom sheet. The implementation preserves it and adds a compact breadcrumb so a deep-linked record remains geographically understandable.

## Intentional deviations

- No bookmarks, recent-history, or persistent bottom navigation: those imply state outside the canonical map and are not v1 requirements.
- No illustrated minimap: the deterministic overview, breadcrumbs, fit control, and navigation drawer already provide recovery paths.
- No invented relationship categories, node counts, or review totals from the generated images.
- No notes tab: review notes and provenance appear in Overview, while canonical incoming/outgoing claims occupy Relationships.
