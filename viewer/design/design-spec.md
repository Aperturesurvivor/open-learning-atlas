# Atlas viewer design specification

This specification translates the generated desktop and mobile concepts into an implementable interface. The concept images are visual references, not claims about the canonical dataset; every count, label, relationship, and review state in the working viewer must come from the current release JSON.

## Reference assets

- `desktop-concept.png` — three-column desktop atlas with navigation, map, and inspector.
- `mobile-concept.png` — map-first phone layout with compact navigation and a bottom-sheet inspector.

The concepts were generated for this project on 2026-07-21 with OpenAI image generation. The prompts called for a restrained, editorial-cartographic scientific interface, a pale background, muted categorical colors, and no grade, course, learner-progress, or curriculum UI.

## Product copy

- Product: **Open Learning Atlas**
- Release context: **Mathematics alpha**
- Primary action: **Search the atlas**
- Map modes: **Overview** and **Neighborhood**
- Inspector tabs: **Overview** and **Relationships**
- Trust language: **Candidate**, **Open data**, and the node's actual confidence level
- Share action: **Copy deep link**

Do not add grade bands, courses, learning progress, completion percentages, project recommendations, or learner state. Those are downstream overlays, not canonical terrain.

## Information architecture

Desktop uses a fixed header, 272px navigation rail, flexible map canvas, 360px inspector, and a compact status bar. Below 900px, navigation becomes an overlay drawer and the inspector becomes a bottom sheet. Below 620px, the header becomes two rows, the map fills the remaining viewport, and the inspector rests at approximately 38% height with an expanded state.

The central canvas is always the dominant surface. It renders a progressive local graph rather than placing all 1,210 records in the DOM at once:

1. Atlas overview: root plus thirteen regions.
2. Region view: region, its territories, and immediate cross-links.
3. Local neighborhood: selected node, structural parents/children, and semantic relationships.

Search can navigate directly to any stable node identity. Breadcrumbs and a recenter control make every deep link recoverable.

## Visual system

- Canvas: `#f7f8fa`
- Surface: `#ffffff`
- Primary ink: `#122033`
- Secondary ink: `#5e6b7d`
- Hairline: `#dbe1e9`
- Focus/selection: `#155eef`
- Concept: `#159e9a`
- Capability: `#2367d8`
- Representation: `#8358bf`
- Knowledge: `#d48916`
- Practice: `#e06d58`
- Composite: `#657287`
- Candidate state: `#b87508`

Typography uses a legible system sans stack for controls and data, with a restrained serif display stack for product and inspector titles. There are no gradients, glass effects, ornamental shadows, or oversized marketing text.

## Controls and states

- Search supports label, slug, definition, stable ID, and aliases where available.
- Kind and relationship filters have visible labels and removable active states.
- Map nodes are reachable with Tab, selectable with Enter/Space, and include an accessible label.
- Zoom, fit, back-to-overview, navigation drawer, inspector tabs, and copy-link controls must work with keyboard and touch.
- Selection is shown through color, ring, increased node size, breadcrumb, and inspector title; never color alone.
- Relationship lines use solid styling for structural composition and patterned styling for usage/prerequisite semantics, with a textual legend.
- The inspector exposes the stable ID, kind/subtype, definition, observable statement when present, provenance sources, status, confidence, and incoming/outgoing relationships.
- The UI explicitly states that it displays the canonical base map, not a curriculum or learner record.

## Icons

Use one consistent outline icon family for search, filters, menu, close, zoom, fit, link, GitHub, database, and information. Node-kind marks are simple CSS/SVG glyphs and remain secondary to text labels.

## Allowed deviations from concepts

- Exact node positions and all counts come from canonical data.
- The bottom navigation shown in the generated phone concept is omitted: bookmarks and recent history are not v1 requirements and would imply unimplemented persistence.
- The illustrated minimap is omitted until it materially improves navigation.
- The working map uses deterministic layouts so deep links are visually stable and testable.
- Generated concepts contain illustrative relationship categories that do not exactly match the ontology; the implementation uses only schema-valid relations.
