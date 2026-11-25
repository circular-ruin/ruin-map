import { useId, useMemo } from 'react'
import type { GraphEdge, GraphNode } from '../data/graph'
import { KIND_LABEL, NODE_COLOR } from '../scene/palette'
import { edgesByNode, nodeById, useMapStore } from '../state/store'
import styles from './Panel.module.css'

interface Connection {
  node: GraphNode
  role: string
}

/** group headings, in display order */
const GROUPS: [string, (edge: GraphEdge, other: GraphNode) => boolean][] = [
  ['Circular Ruin', (edge) => edge.kind === 'crew' || edge.kind === 'studio'],
  ['Directed & Written By', (edge) => edge.kind === 'director' || edge.kind === 'writer'],
  ['Music', (edge) => edge.kind === 'composer' || edge.kind === 'music'],
  ['Cast', (edge) => edge.kind === 'cast'],
  ['Companies', (edge) => edge.kind === 'company'],
  ['Other Links', (edge) => edge.kind === 'link'],
  ['Client List', (edge) => edge.kind === 'roster'],
]

function groupConnections(id: string): [string, Connection[]][] {
  const groups = new Map<string, Connection[]>()
  for (const edge of edgesByNode.get(id) ?? []) {
    const other = nodeById.get(edge.source === id ? edge.target : edge.source)!
    const heading = GROUPS.find(([, test]) => test(edge, other))?.[0] ?? 'Other Links'
    const list = groups.get(heading) ?? []
    list.push({ node: other, role: edge.role })
    groups.set(heading, list)
  }
  return GROUPS.map(([heading]) => heading)
    .filter((heading) => groups.has(heading))
    .map((heading) => {
      const list = groups.get(heading)!
      list.sort((a, b) => (b.node.year ?? 0) - (a.node.year ?? 0) || a.node.name.localeCompare(b.node.name))
      return [heading, list]
    })
}

/** Right-side panel for the selected node and its connections. */
export function DetailPanel() {
  const selectedId = useMapStore((state) => state.selectedId)
  const titleId = useId()
  const node = selectedId ? nodeById.get(selectedId) : undefined
  const groups = useMemo(() => (selectedId ? groupConnections(selectedId) : []), [selectedId])

  if (!node) return null
  const select = useMapStore.getState().select

  return (
    <section aria-labelledby={titleId} className={`${styles.panel} ${styles.right}`} aria-live="polite">
      <header className={styles.header}>
        <div>
          <div className={styles.kind} style={{ color: NODE_COLOR[node.kind] }}>
            {KIND_LABEL[node.kind]}
          </div>
          <h2 id={titleId} className={styles.title}>
            {node.name}
          </h2>
          {node.subtitle && <div className={styles.subtitle}>{node.subtitle}</div>}
        </div>
        <button
          type="button"
          className={styles.close}
          onClick={() => select(null)}
          aria-label="Clear the selection"
        >
          ×
        </button>
      </header>
      <div className={styles.body}>
        {node.note && <p className={styles.lede}>{node.note}</p>}
        {groups.map(([heading, connections]) => (
          <div key={heading}>
            <h3 className={styles.heading}>
              {heading} <span className={styles.count}>{connections.length}</span>
            </h3>
            <ul className={styles.connections}>
              {connections.map(({ node: other, role }) => (
                <li key={`${other.id}-${role}`}>
                  <button type="button" onClick={() => select(other.id)}>
                    <span className={styles.dot} style={{ background: NODE_COLOR[other.kind] }} />
                    <span className={styles.name}>
                      {other.name}
                      {other.year ? ` (${other.year})` : ''}
                    </span>
                    <span className={styles.role}>{role}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
