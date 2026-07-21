# Open Learning Atlas viewer

This React/Vite viewer is a generated access surface for the canonical mathematics release. It is not a second source of truth and stores no curriculum, learner state, or prescribed route.

```sh
npm ci
npm run dev
```

`predev` and `build` copy `../map/releases/mathematics-v0.1.0-alpha.json` into the local public directory. `npm run check-data` verifies that the copy matches the canonical release byte for byte.

Checks:

```sh
npm test
npm run build
npm audit --audit-level=moderate
```

The production build uses `/open-learning-atlas/` as its base path for GitHub Pages. See `design/design-spec.md` and `design/fidelity-ledger.md` for the concept-to-implementation record.
