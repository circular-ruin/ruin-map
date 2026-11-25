import { useFrame, useThree } from '@react-three/fiber'
import { useMemo } from 'react'
import { Vector3 } from 'three'
import type { GraphNode } from '../data/graph'
import { graph, neighborsOf, positions, useMapStore } from '../state/store'
import { nodeColor } from './palette'

/** past this many neighbors, labeling all of them is just noise */
const NEIGHBOR_LABEL_LIMIT = 60

/**
 * Label elements, keyed by node id. The DOM layer registers them; the
 * in-canvas projector moves them every frame without React re-rendering.
 * One overlay instead of drei <Html> per label: Html mounts a React root
 * per label, which is costly when the labeled set changes on every hover.
 */
const elements = new Map<string, HTMLDivElement>()

function alwaysLabeled(node: GraphNode): boolean {
  return (
    node.kind === 'studio' ||
    node.kind === 'member' ||
    node.kind === 'kou' ||
    node.kind === 'release' ||
    node.kind === 'ni' ||
    node.kind === 'project' ||
    !!node.founder ||
    (node.kind === 'film' && !!node.selected)
  )
}

/** DOM overlay, rendered outside the Canvas. */
export function LabelLayer() {
  const visible = useMapStore((state) => state.visible)
  const selectedId = useMapStore((state) => state.selectedId)
  const hoveredId = useMapStore((state) => state.hoveredId)
  const showAll = useMapStore((state) => state.showAllLabels)

  const labeled = useMemo(() => {
    const ids = new Set<string>()
    for (const node of graph.nodes) {
      if (showAll || alwaysLabeled(node)) ids.add(node.id)
    }
    for (const id of [selectedId, hoveredId]) {
      if (!id) continue
      ids.add(id)
      const neighbors = neighborsOf(id)
      if (neighbors.size <= NEIGHBOR_LABEL_LIMIT) neighbors.forEach((n) => ids.add(n))
    }
    return graph.nodes.filter((node) => ids.has(node.id) && visible[node.kind])
  }, [visible, selectedId, hoveredId, showAll])

  return (
    <div className="label-layer" aria-hidden="true">
      {labeled.map((node) => {
        const emphasis = node.id === selectedId || node.id === hoveredId
        return (
          <div
            key={node.id}
            ref={(element) => {
              if (element) elements.set(node.id, element)
              else elements.delete(node.id)
            }}
            className={`node-label${emphasis ? ' node-label--focus' : ''}`}
            style={{ color: nodeColor(node), visibility: 'hidden' }}
            data-kind={node.kind}
          >
            {node.name}
          </div>
        )
      })}
    </div>
  )
}

const scratch = new Vector3()

/** Projects registered labels to screen space each frame. */
export function LabelProjector() {
  const camera = useThree((state) => state.camera)
  const size = useThree((state) => state.size)
  useFrame(() => {
    for (const [id, element] of elements) {
      const position = positions.get(id)
      if (!position) continue
      scratch.set(...position).project(camera)
      // behind the camera or far outside the view
      if (scratch.z > 1 || Math.abs(scratch.x) > 1.2 || Math.abs(scratch.y) > 1.2) {
        element.style.visibility = 'hidden'
        continue
      }
      const x = (scratch.x * 0.5 + 0.5) * size.width
      const y = (-scratch.y * 0.5 + 0.5) * size.height
      element.style.visibility = 'visible'
      element.style.transform = `translate(-50%, -100%) translate(${x}px, ${y - 10}px)`
      // nearer labels draw on top
      element.style.zIndex = String(Math.round((1 - scratch.z) * 100000))
    }
  })
  return null
}
