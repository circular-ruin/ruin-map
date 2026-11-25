import { useId, useMemo, useState } from 'react'
import { KIND_LABEL, nodeColor } from '../scene/palette'
import { graph, useMapStore } from '../state/store'
import styles from './Search.module.css'

const MAX_RESULTS = 8

function fold(text: string): string {
  return text
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
}

/**
 * Combobox search over every node. Arrow keys move through results, Enter
 * selects and flies to the node. The keyboard path to everything in the map.
 */
export function Search() {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const listId = useId()

  const results = useMemo(() => {
    const q = fold(query.trim())
    if (!q) return []
    return graph.nodes
      .map((node) => ({ node, at: fold(node.name).indexOf(q) }))
      .filter((match) => match.at >= 0)
      .sort((a, b) => a.at - b.at || a.node.name.localeCompare(b.node.name))
      .slice(0, MAX_RESULTS)
      .map((match) => match.node)
  }, [query])

  const choose = (id: string) => {
    useMapStore.getState().select(id)
    setQuery('')
    setActive(0)
  }

  return (
    <div className={styles.search}>
      <input
        type="search"
        role="combobox"
        aria-expanded={results.length > 0}
        aria-controls={listId}
        aria-activedescendant={results[active] ? `${listId}-${results[active].id}` : undefined}
        aria-label="Search people, projects, and labels"
        placeholder="Search people, projects, and labels"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value)
          setActive(0)
        }}
        onKeyDown={(event) => {
          if (event.key === 'ArrowDown') {
            event.preventDefault()
            setActive((i) => Math.min(i + 1, results.length - 1))
          } else if (event.key === 'ArrowUp') {
            event.preventDefault()
            setActive((i) => Math.max(i - 1, 0))
          } else if (event.key === 'Enter' && results[active]) {
            choose(results[active].id)
          } else if (event.key === 'Escape') {
            setQuery('')
          }
        }}
      />
      {results.length > 0 && (
        <ul id={listId} role="listbox" className={styles.results}>
          {results.map((node, i) => (
            <li
              key={node.id}
              id={`${listId}-${node.id}`}
              role="option"
              aria-selected={i === active}
              className={i === active ? styles.active : undefined}
              onMouseDown={(event) => {
                event.preventDefault()
                choose(node.id)
              }}
              onMouseEnter={() => setActive(i)}
            >
              <span className={styles.dot} style={{ background: nodeColor(node) }} />
              <span className={styles.name}>{node.name}</span>
              <span className={styles.kind}>{KIND_LABEL[node.kind]}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
