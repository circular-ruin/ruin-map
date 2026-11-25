import { useEffect, useId, useRef, useState } from 'react'
import { graph, useMapStore } from '../state/store'
import styles from './Panel.module.css'

const DISMISSED_KEY = 'ruin-map:intro-dismissed'

function readDismissed(): boolean {
  try {
    return window.localStorage.getItem(DISMISSED_KEY) === '1'
  } catch {
    return false
  }
}

function writeDismissed(dismissed: boolean) {
  try {
    if (dismissed) window.localStorage.setItem(DISMISSED_KEY, '1')
    else window.localStorage.removeItem(DISMISSED_KEY)
  } catch {
    // Storage can be unavailable; the panel just reopens on the next visit.
  }
}

const count = (kind: string) => graph.nodes.filter((node) => node.kind === kind).length

/**
 * Left-side introduction, after the orrery: non-modal so the map stays
 * interactive, and dismissal is remembered per browser.
 */
export function Introduction() {
  const [open, setOpen] = useState(() => !readDismissed())
  const titleId = useId()
  const closeRef = useRef<HTMLButtonElement>(null)
  const openRef = useRef<HTMLButtonElement>(null)
  const hasToggled = useRef(false)

  useEffect(() => {
    if (!hasToggled.current) return
    if (open) closeRef.current?.focus()
    else openRef.current?.focus()
  }, [open])

  // on narrow screens the detail panel needs the room: step aside for a
  // selection without remembering it as a dismissal
  useEffect(
    () =>
      useMapStore.subscribe((state, previous) => {
        if (state.selectedId && state.selectedId !== previous.selectedId) {
          if (window.matchMedia('(max-width: 899px)').matches) setOpen(false)
        }
      }),
    [],
  )

  const toggle = (next: boolean) => {
    hasToggled.current = true
    writeDismissed(!next)
    setOpen(next)
  }

  if (!open) {
    return (
      <button ref={openRef} type="button" className={styles.reopen} onClick={() => toggle(true)}>
        About This Map
      </button>
    )
  }

  return (
    <section
      role="dialog"
      aria-modal="false"
      aria-labelledby={titleId}
      className={`${styles.panel} ${styles.left}`}
      onKeyDown={(event) => {
        if (event.key === 'Escape') toggle(false)
      }}
    >
      <header className={styles.header}>
        <h1 id={titleId} className={styles.title}>
          The Ruin Orrery
        </h1>
        <button
          ref={closeRef}
          type="button"
          className={styles.close}
          onClick={() => toggle(false)}
          aria-label="Close the introduction"
        >
          ×
        </button>
      </header>

      <div className={styles.body}>
        <p className={styles.lede}>
          Every project Circular Ruin has touched, and everyone it connects, arranged as nested
          spheres around the studio. Two more bodies share its orbit: Kou Records, the label
          Charmaine Lee runs with Randall Dunn, and Northern Information, Tyler Etters's umbrella
          and the studio's parent.
        </p>

        <h2 className={styles.heading}>The Shells</h2>
        <ul className={styles.legend}>
          <li data-kind="member">The team: Randall Dunn, Ben Greenberg, and Arjan Miranda</li>
          <li data-kind="film">
            {count('film')} films and series. Selected works sit on the inner shell
          </li>
          <li data-kind="person">{count('person')} directors, writers, cast, and composers</li>
          <li data-kind="company">{count('company')} production companies and distributors</li>
          <li data-kind="musician">{count('musician')} musicians and bands</li>
          <li data-kind="label">{count('label')} record labels</li>
        </ul>

        <h2 className={styles.heading}>Kou Records</h2>
        <p>
          The second sphere. Its {count('release')} releases sit on growth rings, one per cohort,
          colored like the cohort's vinyl: Kou Orange, Mint Blue, and Gunmetal Grey. Beyond them
          are the label's artists, the players on each record, and the artwork and engineering
          crew. Nearly every record was produced by Randall Dunn and mastered by Ben Greenberg,
          so the two systems are stitched together through the team.
        </p>
        <ul className={styles.legend}>
          <li data-kind="kou">Kou Records and founder Charmaine Lee at the center</li>
          <li data-kind="artist">{count('artist')} Kou artists</li>
          <li data-kind="player">{count('player')} players on Kou records</li>
          <li data-kind="contributor">{count('contributor')} artwork, design, and engineering credits</li>
        </ul>
        <p>
          Lines are credits. Orange lines are the team's own work on a project; pink lines are
          composers; blue are directors and cast. The faint lines out to the edge are the
          studio's client list.
        </p>

        <h2 className={styles.heading}>Northern Information</h2>
        <p>
          The third sphere, and Circular Ruin's parent. Tyler Etters sits at its heart. Around him
          are his {count('project')} music projects, then {count('work')} works and labels: the
          Intertext non-label, norns community, arcologies, the Epicycle Orrery, and more. Further
          out are all {count('record')} releases from the discography, and the people credited on
          them. Tyler built Torus and Tiny Torus, which ties this sphere back to the studio.
        </p>
        <ul className={styles.legend}>
          <li data-kind="project">Music projects, from STUXNET to Ix</li>
          <li data-kind="work">Works, software, and labels</li>
          <li data-kind="record">{count('record')} releases</li>
          <li data-kind="collaborator">{count('collaborator')} collaborators</li>
        </ul>

        <h2 className={styles.heading}>Getting Around</h2>
        <p>
          Drag to orbit, scroll to zoom, right-drag to pan. Click anything to fly to it and see its
          connections; click a connection to keep walking. Press C to switch to fly mode (WASD to
          move, R and F for up and down, drag to look). Escape clears the selection.
        </p>

        <p className={styles.hint}>
          Built from circularruin.com and the team's credits, with directors, cast, and composers
          checked against public film databases. Kou credits come from each release's Bandcamp
          page, and Northern Information from nor.the-rn.info and the published discography.
          Missing credits are left out, not guessed.
        </p>
      </div>
    </section>
  )
}
