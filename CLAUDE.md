# ruin-map

Interactive 3D map of Circular Ruin's projects and people. Vite + React 19 +
TypeScript, react-three-fiber 9, drei 10, leva, zustand, vitest. Modeled on
`~/2026/epicycle-orrery-demo`.

## Layout

- `src/data/` — `roster.json` (site client lists), `credits.ts`
  (hand-authored credits), `kou.ts` (Kou Records releases), `ni.ts`
  (Northern Information), `graph.ts` (builds one node per real entity,
  folding aliases)
- `src/layout/layout.ts` — pure TS, deterministic shell-constrained force
  layout. Never import React or Three here.
- `src/state/store.ts` — graph, positions, and the zustand UI store
- `src/scene/` — R3F components; `src/ui/` — panels, search, leva

## Key patterns

- Three systems: nodes orbit the studio, Kou Records, or Northern
  Information (`systemOf`, `SYSTEM_CENTER`). NI releases come from the
  `@tyleretters/discography` package; a new `project` value there must map to
  an entry in `NI_PROJECTS` or the build throws. A Kou release artist moves into Kou's orbit even if the
  studio knows them from film work; players and crew stay put
  (`KIND_PRIORITY` in `graph.ts`). Cross-system springs are weak on purpose.
- Labels are one DOM overlay (`LabelLayer`) moved per frame by
  `LabelProjector`. Do not switch to drei `<Html>` per label: it mounts a
  React root each, which floods React warnings when hover changes the set.
- Never guess credits. Add a field only when a source confirms it.
- Dev console handle: `window.ruinMap = { camera, positions, store }`.
