import { FlyControls, OrbitControls } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { MathUtils, Vector3 } from 'three'
import type { FlyControls as FlyControlsImpl, OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import { centerOf } from '../layout/layout'
import { nodeById, positions, useMapStore } from '../state/store'

const FLIGHT_SECONDS = 0.9
const FOCUS_DISTANCE = 64
/** frames all three systems on load: roughly their centroid */
const INITIAL_TARGET = new Vector3(120, 0, 80)

/**
 * Exactly one control scheme is mounted at a time, as in the orrery.
 * Orbit circles the map; fly (WASD + R/F, drag to look) moves through it,
 * with speed scaled to distance from the studio. Press C to switch.
 * Selecting a node flies the camera to it in either mode.
 */
export function CameraRig() {
  const mode = useMapStore((state) => state.cameraMode)
  const autoRotate = useMapStore((state) => state.autoRotate)
  const focusVersion = useMapStore((state) => state.focusVersion)
  const camera = useThree((state) => state.camera)
  const flyRef = useRef<FlyControlsImpl>(null)
  // survives remounts of OrbitControls when switching camera modes
  const orbitTarget = useRef(INITIAL_TARGET.clone())
  const orbitRef = useRef<OrbitControlsImpl>(null)
  const flight = useRef<{
    t: number
    fromPos: Vector3
    toPos: Vector3
    fromTarget: Vector3
    toTarget: Vector3
  } | null>(null)

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) return
      const state = useMapStore.getState()
      if (event.key.toLowerCase() === 'c') {
        state.setCameraMode(state.cameraMode === 'orbit' ? 'fly' : 'orbit')
      } else if (event.key === 'Escape' && state.selectedId) {
        state.select(null)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    const orbit = orbitRef.current
    if (!orbit) return
    orbit.target.copy(orbitTarget.current)
    orbit.update()
  }, [mode])

  useEffect(() => {
    const { selectedId } = useMapStore.getState()
    if (!selectedId) return
    const node = positions.get(selectedId)
    if (!node) return
    const toTarget = new Vector3(...node)
    const currentTarget = orbitRef.current?.target.clone() ?? new Vector3()
    // approach from outside the node's shell, tilted up a little, so its
    // system's center and inner shells sit behind it
    const outward = toTarget.clone().sub(new Vector3(...centerOf(nodeById.get(selectedId)!)))
    const radius = outward.length()
    const direction =
      radius > 1
        ? outward.normalize().add(new Vector3(0, 0.35, 0)).normalize()
        : camera.position.clone().sub(currentTarget).normalize()
    const distance = radius < 1 ? FOCUS_DISTANCE * 2.5 : FOCUS_DISTANCE + radius * 0.4
    flight.current = {
      t: 0,
      fromPos: camera.position.clone(),
      toPos: toTarget.clone().add(direction.multiplyScalar(distance)),
      fromTarget: currentTarget,
      toTarget,
    }
  }, [focusVersion, camera])

  useFrame((_, delta) => {
    const fly = flyRef.current
    if (fly) fly.movementSpeed = MathUtils.clamp(camera.position.length() * 0.5, 4, 120)

    if (orbitRef.current) orbitTarget.current.copy(orbitRef.current.target)

    const f = flight.current
    if (!f) return
    f.t = Math.min(1, f.t + delta / FLIGHT_SECONDS)
    const eased = 1 - Math.pow(1 - f.t, 3)
    camera.position.lerpVectors(f.fromPos, f.toPos, eased)
    const target = new Vector3().lerpVectors(f.fromTarget, f.toTarget, eased)
    const orbit = orbitRef.current
    if (orbit) {
      orbit.target.copy(target)
      orbit.update()
    } else {
      camera.lookAt(target)
    }
    if (f.t >= 1) flight.current = null
  })

  if (mode === 'fly') {
    return <FlyControls ref={flyRef} makeDefault dragToLook rollSpeed={0.4} />
  }
  return (
    <OrbitControls
      ref={orbitRef}
      makeDefault
      enableDamping
      autoRotate={autoRotate}
      autoRotateSpeed={0.35}
      minDistance={4}
      maxDistance={1100}
      onStart={() => {
        // grabbing the camera cancels a flight in progress
        flight.current = null
      }}
    />
  )
}
