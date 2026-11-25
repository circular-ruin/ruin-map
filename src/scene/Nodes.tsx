import type { ThreeEvent } from '@react-three/fiber'
import { useMemo } from 'react'
import * as THREE from 'three'
import type { GraphNode } from '../data/graph'
import { edgesByNode, graph, neighborsOf, positions, useMapStore } from '../state/store'
import { NODE_SIZE, nodeColor } from './palette'

const sphere = new THREE.SphereGeometry(1, 24, 16)

/** size grows gently with connection count so hubs read as hubs */
function nodeScale(node: GraphNode): number {
  const degree = edgesByNode.get(node.id)?.length ?? 0
  return NODE_SIZE[node.kind] * (1 + Math.min(Math.log2(1 + degree) * 0.12, 0.8))
}

export function Nodes() {
  const visible = useMapStore((state) => state.visible)
  const selectedId = useMapStore((state) => state.selectedId)
  const hoveredId = useMapStore((state) => state.hoveredId)
  const focus = hoveredId ?? selectedId
  const lit = useMemo(() => {
    if (!focus) return null
    const set = neighborsOf(focus)
    set.add(focus)
    return set
  }, [focus])

  return (
    <group>
      {graph.nodes.map((node) =>
        visible[node.kind] ? (
          <Node
            key={node.id}
            node={node}
            dim={lit !== null && !lit.has(node.id)}
            active={node.id === selectedId || node.id === hoveredId}
          />
        ) : null,
      )}
    </group>
  )
}

function Node({ node, dim, active }: { node: GraphNode; dim: boolean; active: boolean }) {
  const position = positions.get(node.id)!
  const scale = nodeScale(node) * (active ? 1.35 : 1)

  const onOver = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation()
    useMapStore.getState().setHovered(node.id)
    document.body.style.cursor = 'pointer'
  }
  const onOut = () => {
    if (useMapStore.getState().hoveredId === node.id) useMapStore.getState().setHovered(null)
    document.body.style.cursor = ''
  }
  const onClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation()
    useMapStore.getState().select(node.id)
  }

  return (
    <group position={position}>
      <mesh
        geometry={sphere}
        scale={scale}
        onPointerOver={onOver}
        onPointerOut={onOut}
        onClick={onClick}
      >
        <meshBasicMaterial
          color={nodeColor(node)}
          transparent
          opacity={dim ? 0.12 : 1}
          toneMapped={false}
        />
      </mesh>
      {/* soft halo so the brighter kinds glow against the dark */}
      {!dim && (node.kind === 'studio' || node.kind === 'kou' || node.kind === 'ni' || node.kind === 'member' || active) && (
        <mesh geometry={sphere} scale={scale * 1.8} raycast={() => null}>
          <meshBasicMaterial
            color={nodeColor(node)}
            transparent
            opacity={0.06}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      )}
    </group>
  )
}
