import { nodeById, useMapStore } from '../state/store'

/** Bottom-left overlay: camera mode and what the pointer is over. */
export function Hud() {
  const mode = useMapStore((state) => state.cameraMode)
  const hoveredId = useMapStore((state) => state.hoveredId)
  const hovered = hoveredId ? nodeById.get(hoveredId) : undefined
  return (
    <div className="hud" aria-hidden="true">
      <div>{mode === 'orbit' ? 'Orbit · Press C to Fly' : 'Fly · WASD, R/F · Press C to Orbit'}</div>
      <div className="hud__hover">{hovered ? hovered.name : ' '}</div>
    </div>
  )
}
