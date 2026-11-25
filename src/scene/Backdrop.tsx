import { useEffect, useMemo } from 'react'
import * as THREE from 'three'
import type { NodeKind } from '../data/graph'
import { SHELL_RADIUS } from '../layout/layout'
import { useMapStore } from '../state/store'
import { NODE_COLOR } from './palette'

const STAR_COUNT = 2500
const STAR_RADIUS = 520

/**
 * Stars on a far sphere, plus one engraved brass ring per shell in the
 * equatorial plane so the nesting of the map reads at a glance.
 */
export function Backdrop() {
  const visible = useMapStore((state) => state.visible)

  const stars = useMemo(() => {
    const positions = new Float32Array(STAR_COUNT * 3)
    for (let i = 0; i < STAR_COUNT; i++) {
      const z = ((i * 0.754877666) % 1) * 2 - 1
      const azimuth = ((i * 0.569840296) % 1) * Math.PI * 2
      const planar = Math.sqrt(1 - z * z)
      positions[i * 3] = STAR_RADIUS * planar * Math.cos(azimuth)
      positions[i * 3 + 1] = STAR_RADIUS * z
      positions[i * 3 + 2] = STAR_RADIUS * planar * Math.sin(azimuth)
    }
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return geometry
  }, [])
  useEffect(() => () => stars.dispose(), [stars])

  const shells = (Object.entries(SHELL_RADIUS) as [NodeKind, number][]).filter(
    ([kind, radius]) => radius > 0 && visible[kind],
  )

  return (
    <>
      <points geometry={stars}>
        <pointsMaterial color="#d8ccb0" size={1.4} sizeAttenuation transparent opacity={0.55} depthWrite={false} />
      </points>
      {shells.map(([kind, radius]) => (
        <ShellRing key={kind} radius={radius} color={NODE_COLOR[kind]} />
      ))}
    </>
  )
}

function ShellRing({ radius, color }: { radius: number; color: string }) {
  const geometry = useMemo(() => {
    const points: THREE.Vector3[] = []
    const segments = 256
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2
      points.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius))
    }
    return new THREE.BufferGeometry().setFromPoints(points)
  }, [radius])
  useEffect(() => () => geometry.dispose(), [geometry])
  return (
    <line>
      <primitive object={geometry} attach="geometry" />
      <lineBasicMaterial color={color} transparent opacity={0.14} depthWrite={false} />
    </line>
  )
}
