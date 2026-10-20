# Open Learning Atlas Teacher Workspace

This repository is the downstream teacher-workspace experiment for the Open
Learning Atlas. Its current slice follows one fictional student through a
worksheet-to-evidence learning loop.

The base Atlas remains a capability map, not a curriculum or prescribed
learning sequence. The prototype uses that map only as background curriculum
context; the primary interface is the student's work, evidence, and change over
time.

## Current slice

- Work with one fictional student rather than a class roster.
- Configure and preview a personalized mathematics worksheet.
- Print the worksheet or save it as a PDF through the browser.
- Simulate scanning completed work and review each extracted response before it
  affects the student record.
- Inspect progress against an individual goal, intervention changes, recent
  evidence, and specific skill patterns.
- Move between focused Today, Progress, and Skills views on desktop or mobile.

The OCR/image-recognition step is deliberately simulated. No student work is
sent to a model or remote service, and no generated insight is treated as
confirmed until the teacher accepts it.

## Run

The project uses the existing pinned Deno/Vite dependency workflow. Do not use
`npm`, `npx`, `yarn`, or `pnpm`.

```sh
deno task dev
deno task test
deno task build
```

Refresh the pinned data copy from the canonical local Atlas with:

```sh
deno task sync-atlas
```

## Source and status boundary

The repository still bundles Open Learning Atlas Mathematics `0.3.0-alpha` for
future curriculum-context work. Its records and relationships are AI-assisted
candidates and have not received accountable mathematical or educational
review. The student name, evidence, trends, interpretations, and worksheet in
this prototype are all synthetic demonstration data.
