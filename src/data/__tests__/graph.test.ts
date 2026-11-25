import { describe, expect, it } from 'vitest'
import discography from '@tyleretters/discography'
import { buildGraph, slug } from '../graph'
import { centerOf, layoutGraph, targetRadius } from '../../layout/layout'

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

  it('pulls Kou release artists into the label orbit', () => {
    const lowe = graph.nodes.find((node) => node.id === slug('Robert Aiki Aubrey Lowe'))
    expect(lowe?.kind).toBe('artist')
    // still linked to his film score
    expect(graph.edges.some((edge) => edge.source === lowe?.id && edge.target === 'candyman')).toBe(true)
    expect(graph.nodes.find((node) => node.id === 'randall')?.kind).toBe('member')
  })

  it('places every discography release in the Northern Information system', () => {
    const records = graph.nodes.filter((node) => node.kind === 'record')
    expect(records).toHaveLength(discography.length)
  })

  it('ties the three systems together', () => {
    const has = (source: string, target: string) =>
      graph.edges.some((edge) => edge.source === source && edge.target === target)
    expect(has('northern-information', 'circular-ruin')).toBe(true)
    expect(has('kou-records', 'circular-ruin')).toBe(true)
    expect(has(slug('Tyler Etters'), 'torus')).toBe(true)
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
      const [cx, cy, cz] = centerOf(node)
      const r = targetRadius(node)
      // the shells are ellipsoids flattened to 0.75 vertically
      expect(Math.hypot(x - cx, (y - cy) / 0.75, z - cz)).toBeCloseTo(r, 3)
    }
  })

  it('is deterministic', () => {
    expect(layoutGraph(graph, 40)).toEqual(positions)
  })
})
