# ruin-map

An interactive 3D map of Circular Ruin's projects and the people connected to
them: the team, films and series, directors, cast, composers, production
companies, musicians, and record labels.

https://circular-ruin.github.io/ruin-map/

Navigation follows `northern-information/epicycle-orrery-demo`: nested shells
around a fixed center, orbit and fly camera modes, a leva panel, and a
dismissable introduction.

## Running

```
npm install
npm run dev     # open the printed localhost URL
npm run test    # graph and layout tests (vitest)
```

Pushes to `main` deploy to GitHub Pages via
`.github/workflows/deploy-pages.yml`.

## Controls

- **Orbit mode**: drag to orbit, scroll to zoom, right-drag to pan
- **Fly mode**: WASD to move, R/F for up and down, drag to look
- **C**: toggle orbit and fly
- **Click** a node to fly to it and list its connections; click a connection
  to walk the graph. **Escape** clears the selection.
- **Search** (top) finds any node by name, with arrow keys and Enter.

## Data

- `src/data/roster.json`: the client lists from circularruin.com
  (filmmakers, production companies, music, record labels), extracted from
  `theme/templates/index.json` in the shopify repo.
- `src/data/credits.ts`: team bios and per-person credits from the team page,
  plus directors, writers, cast, composers, and companies checked against
  public film databases in November 2026. Unconfirmed fields are left out.

Where the site and public sources disagree, the map follows the public
sources:

- The Curse is a Showtime and A24 series directed by Nathan Fielder and Benny
  Safdie (the team page lists HBO and Panos Cosmatos).
- Brian McOmber and Sierra Pettengill are the correct spellings.
- Problemista's composer records as OHYUNG.
