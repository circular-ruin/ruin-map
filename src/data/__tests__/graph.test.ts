import { describe, expect, it } from 'vitest'
import { buildGraph, slug } from '../graph'
import { layoutGraph, targetRadius } from '../../layout/layout'

const graph = buildGraph()
const ids = new Set(graph.nodes.map((node) => node.id))

describe('buildGraph', () => {
  it('has unique node ids', () => {
    expect(ids.size).toBe(graph.nodes.length)
  })

  it('has no dangling edges', () => {
    for (const edge of graph.edges) {
      expect(ids.has(edge.source), edge.source).toBe(true)
      expect(ids.has(edge.target), edge.target).toBe(true)
    }
  })

  it('folds roster spellings into one entity', () => {
    expect(ids.has(slug('Brian McComber'))).toBe(false)
    expect(ids.has(slug('Oneohtrix Point Never'))).toBe(false)
    const lopatin = graph.nodes.find((node) => node.id === slug('Daniel Lopatin'))
    expect(lopatin?.kind).toBe('person')
    expect(lopatin?.client).toBe(true)
  })

  it('keeps team members out of the music roster', () => {
    expect(graph.nodes.filter((node) => node.name === 'Arjan Miranda')).toHaveLength(1)
  })

  it('connects every node to the rest of the map', () => {
    const linked = new Set(graph.edges.flatMap((edge) => [edge.source, edge.target]))
    for (const node of graph.nodes) expect(linked.has(node.id), node.name).toBe(true)
  })
})

describe('layoutGraph', () => {
  const positions = layoutGraph(graph, 40)

  it('places every node on its shell', () => {
    for (const node of graph.nodes) {
      const [x, y, z] = positions.get(node.id)!
      const r = targetRadius(node)
      // the shells are ellipsoids flattened to 0.75 vertically
      expect(Math.hypot(x, y / 0.75, z)).toBeCloseTo(r, 3)
    }
  })

  it('is deterministic', () => {
    expect(layoutGraph(graph, 40)).toEqual(positions)
  })
})
