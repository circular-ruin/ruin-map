import { useEffect, useMemo } from 'react'
import * as THREE from 'three'
import type { GraphEdge } from '../data/graph'
import { graph, nodeById, positions, useMapStore } from '../state/store'
import { EDGE_COLOR } from './palette'

/**
 * All edges in one LineSegments draw, plus a second, brighter draw for the
 * edges touching the hovered or selected node. Geometry is rebuilt only
 * when visibility or focus changes, never per frame.
 */
export function Edges() {
  const visible = useMapStore((state) => state.visible)
  const selectedId = useMapStore((state) => state.selectedId)
  const hoveredId = useMapStore((state) => state.hoveredId)
  const focus = hoveredId ?? selectedId

  const shown = useMemo(
    () =>
      graph.edges.filter(
        (edge) => visible[nodeById.get(edge.source)!.kind] && visible[nodeById.get(edge.target)!.kind],
      ),
    [visible],
  )
  const highlighted = useMemo(
    () => (focus ? shown.filter((edge) => edge.source === focus || edge.target === focus) : []),
    [shown, focus],
  )

  return (
    <>
      <EdgeLines edges={shown} opacity={focus ? 0.05 : 0.22} />
      <EdgeLines edges={highlighted} opacity={0.95} />
    </>
  )
}

function EdgeLines({ edges, opacity }: { edges: GraphEdge[]; opacity: number }) {
  const geometry = useMemo(() => {
    const vertices = new Float32Array(edges.length * 6)
    const colors = new Float32Array(edges.length * 6)
    const color = new THREE.Color()
    edges.forEach((edge, i) => {
      const a = positions.get(edge.source)!
      const b = positions.get(edge.target)!
      vertices.set(a, i * 6)
      vertices.set(b, i * 6 + 3)
      color.set(EDGE_COLOR[edge.kind])
      colors.set([color.r, color.g, color.b, color.r, color.g, color.b], i * 6)
    })
    const result = new THREE.BufferGeometry()
    result.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
    result.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    return result
  }, [edges])
  useEffect(() => () => geometry.dispose(), [geometry])

  return (
    <lineSegments geometry={geometry} raycast={() => null}>
      <lineBasicMaterial vertexColors transparent opacity={opacity} depthWrite={false} toneMapped={false} />
    </lineSegments>
  )
}
