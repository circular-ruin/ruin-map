import { Canvas } from '@react-three/fiber'
import { positions, useMapStore } from '../state/store'
import { Backdrop } from './Backdrop'
import { CameraRig } from './CameraRig'
import { Edges } from './Edges'
import { LabelProjector } from './Labels'
import { Nodes } from './Nodes'

export function Scene() {
  return (
    <Canvas
      camera={{ position: [125, 230, 480], fov: 45, near: 0.1, far: 2000 }}
      // dev console handle, as in the orrery
      onCreated={({ camera }) => {
        Object.assign(window, { ruinMap: { camera, positions, store: useMapStore } })
      }}
      // a click on empty space clears the selection
      onPointerMissed={(event) => {
        if (event.button === 0) useMapStore.getState().select(null)
      }}
    >
      <color attach="background" args={['#050508']} />
      <Backdrop />
      <Edges />
      <Nodes />
      <LabelProjector />
      <CameraRig />
    </Canvas>
  )
}
