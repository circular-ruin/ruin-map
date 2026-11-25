# ruin-map

Interactive 3D map of Circular Ruin's projects and people. Vite + React 19 +
TypeScript, react-three-fiber 9, drei 10, leva, zustand, vitest. Modeled on
`~/2026/epicycle-orrery-demo`.

## Layout

- `src/data/` — `roster.json` (site client lists), `credits.ts`
  (hand-authored credits), `graph.ts` (builds one node per real entity,
  folding aliases)
- `src/layout/layout.ts` — pure TS, deterministic shell-constrained force
  layout. Never import React or Three here.
- `src/state/store.ts` — graph, positions, and the zustand UI store
- `src/scene/` — R3F components; `src/ui/` — panels, search, leva

## Key patterns

- Labels are one DOM overlay (`LabelLayer`) moved per frame by
  `LabelProjector`. Do not switch to drei `<Html>` per label: it mounts a
  React root each, which floods React warnings when hover changes the set.
- Never guess credits. Add a field only when a source confirms it.
- Dev console handle: `window.ruinMap = { camera, positions, store }`.
