import type { Graph, GraphNode, NodeKind } from '../data/graph'

export type Vec3 = [number, number, number]

/**
 * Each kind lives on its own spherical shell, like the nested spheres of
 * an orrery: the studio at the center, the team on the first shell, the
 * work beyond them, and the wider community at the edge.
 */
export const SHELL_RADIUS: Record<NodeKind, number> = {
  studio: 0,
  member: 16,
  software: 22,
  film: 40,
  person: 64,
  company: 82,
  musician: 104,
  label: 128,
}

/** unselected films sit a little outside the selected works */
export function targetRadius(node: GraphNode): number {
  if (node.kind === 'film' && !node.selected) return SHELL_RADIUS.film + 7
  return SHELL_RADIUS[node.kind]
}

/** mulberry32: a tiny seeded PRNG so the layout is the same on every load */
function random(seed: number) {
  let state = seed >>> 0
  return () => {
    state = (state + 0x6d2b79f5) >>> 0
    let t = state
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/**
 * Shell-constrained force layout. Linked nodes pull toward each other,
 * every pair pushes apart, and a stiff radial spring holds each node to
 * its shell, so related work clusters by angle without leaving its sphere.
 * Edges to the studio are skipped: they would only drag everything toward
 * the center. Deterministic for a given graph.
 */
export function layoutGraph(graph: Graph, iterations = 260): Map<string, Vec3> {
  const rand = random(0xc12c1e)
  const n = graph.nodes.length
  const index = new Map(graph.nodes.map((node, i) => [node.id, i]))
  const radii = graph.nodes.map(targetRadius)
  const pos = new Float64Array(n * 3)

  graph.nodes.forEach((_, i) => {
    // random direction, scaled to the shell
    const z = rand() * 2 - 1
    const azimuth = rand() * Math.PI * 2
    const planar = Math.sqrt(1 - z * z)
    const r = radii[i]
    pos[i * 3] = r * planar * Math.cos(azimuth)
    pos[i * 3 + 1] = r * z * 0.75
    pos[i * 3 + 2] = r * planar * Math.sin(azimuth)
  })

  const springs = graph.edges
    .filter((edge) => edge.kind !== 'studio' && edge.kind !== 'roster')
    .map((edge) => [index.get(edge.source)!, index.get(edge.target)!] as const)

  const force = new Float64Array(n * 3)
  for (let step = 0; step < iterations; step++) {
    const cooling = 1 - step / iterations
    force.fill(0)

    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        const dx = pos[i * 3] - pos[j * 3]
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1]
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2]
        const d2 = dx * dx + dy * dy + dz * dz + 0.01
        if (d2 > 900) continue
        const push = 40 / d2
        force[i * 3] += dx * push
        force[i * 3 + 1] += dy * push
        force[i * 3 + 2] += dz * push
        force[j * 3] -= dx * push
        force[j * 3 + 1] -= dy * push
        force[j * 3 + 2] -= dz * push
      }
    }

    for (const [a, b] of springs) {
      const dx = pos[b * 3] - pos[a * 3]
      const dy = pos[b * 3 + 1] - pos[a * 3 + 1]
      const dz = pos[b * 3 + 2] - pos[a * 3 + 2]
      const pull = 0.02
      force[a * 3] += dx * pull
      force[a * 3 + 1] += dy * pull
      force[a * 3 + 2] += dz * pull
      force[b * 3] -= dx * pull
      force[b * 3 + 1] -= dy * pull
      force[b * 3 + 2] -= dz * pull
    }

    for (let i = 0; i < n; i++) {
      const r = radii[i]
      if (r === 0) {
        pos[i * 3] = pos[i * 3 + 1] = pos[i * 3 + 2] = 0
        continue
      }
      const limit = 3 * cooling + 0.1
      for (let k = 0; k < 3; k++) {
        pos[i * 3 + k] += Math.max(-limit, Math.min(limit, force[i * 3 + k]))
      }
      // project back onto the shell; flatten the poles a little so the
      // map reads as a wide disc from the default camera angle
      const x = pos[i * 3]
      const y = pos[i * 3 + 1]
      const z = pos[i * 3 + 2]
      const length = Math.hypot(x, y / 0.75, z) || 1
      pos[i * 3] = (x / length) * r
      pos[i * 3 + 1] = (y / length) * r
      pos[i * 3 + 2] = (z / length) * r
    }
  }

  const result = new Map<string, Vec3>()
  graph.nodes.forEach((node, i) => {
    result.set(node.id, [pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2]])
  })
  return result
}
