# Open Learning Atlas viewer

This React/Vite viewer is a generated access surface for the canonical mathematics release. It is not a second source of truth and stores no curriculum, learner state, or prescribed route.

The project uses Deno for dependency installation, lockfile integrity, task
execution, and security auditing. Package lifecycle scripts are not enabled.

```sh
deno install
deno task dev
```

`dev` and `build` copy `../map/releases/mathematics-v0.3.0-alpha.json` into the local public directory. `deno task check-data` verifies that the copy matches the canonical release byte for byte.

Checks:

```sh
deno task test
deno task build
deno audit --level=moderate
```

The production build uses `/open-learning-atlas/` as its base path for GitHub Pages. See `design/design-spec.md` and `design/fidelity-ledger.md` for the concept-to-implementation record.
