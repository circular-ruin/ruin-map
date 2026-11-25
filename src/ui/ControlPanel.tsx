import { Leva, useControls } from 'leva'
import { useEffect, useSyncExternalStore } from 'react'
import type { NodeKind } from '../data/graph'
import { KIND_LABEL } from '../scene/palette'
import { useMapStore, type CameraMode } from '../state/store'

const TOGGLED_KINDS: NodeKind[] = [
  'film',
  'software',
  'person',
  'company',
  'musician',
  'label',
  'release',
  'artist',
  'player',
  'contributor',
]

/**
 * The leva panel, as in the orrery. Controls write into the zustand store
 * via onChange; the store stays the single source of truth.
 */
const NARROW = '(max-width: 899px)'

function useNarrow(): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const query = window.matchMedia(NARROW)
      query.addEventListener('change', onChange)
      return () => query.removeEventListener('change', onChange)
    },
    () => window.matchMedia(NARROW).matches,
  )
}

export function ControlPanel() {
  // on phones the panel would cover the search, and fly mode needs a
  // keyboard; touch gets orbit, search, and the detail panel
  const narrow = useNarrow()

  const [, setView] = useControls(
    'View',
    () => ({
      autoRotate: {
        label: 'Auto Rotate',
        value: useMapStore.getState().autoRotate,
        onChange: (value: boolean) => useMapStore.getState().setAutoRotate(value),
        transient: false,
      },
      allLabels: {
        label: 'All Labels',
        value: false,
        onChange: (value: boolean) => useMapStore.getState().setShowAllLabels(value),
        transient: false,
      },
    }),
  )

  const [, setCamera] = useControls('Camera', () => ({
    mode: {
      label: 'Mode (C)',
      value: 'orbit' as CameraMode,
      options: { Orbit: 'orbit', Fly: 'fly' },
      onChange: (value: CameraMode) => useMapStore.getState().setCameraMode(value),
      transient: false,
    },
  }))

  // keep the panel in sync when the keyboard or a selection changes state
  useEffect(
    () =>
      useMapStore.subscribe((state, previous) => {
        if (state.cameraMode !== previous.cameraMode) setCamera({ mode: state.cameraMode })
        if (state.autoRotate !== previous.autoRotate) setView({ autoRotate: state.autoRotate })
      }),
    [setCamera, setView],
  )

  useControls(
    'Shells',
    () =>
      Object.fromEntries(
        TOGGLED_KINDS.map((kind) => [
          kind,
          {
            label: KIND_LABEL[kind],
            value: true,
            onChange: (value: boolean) => useMapStore.getState().setVisible(kind, value),
            transient: false,
          },
        ]),
      ),
    { collapsed: true },
  )

  return <Leva hidden={narrow} />
}
