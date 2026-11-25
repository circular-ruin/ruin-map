import { create } from 'zustand'
import { buildGraph, type Graph, type GraphEdge, type GraphNode, type NodeKind } from '../data/graph'
import { layoutGraph, type Vec3 } from '../layout/layout'

export type CameraMode = 'orbit' | 'fly'

/** Built once at module load; the graph never changes at runtime. */
export const graph: Graph = buildGraph()
export const positions: Map<string, Vec3> = layoutGraph(graph)
export const nodeById = new Map<string, GraphNode>(graph.nodes.map((node) => [node.id, node]))

export const edgesByNode = new Map<string, GraphEdge[]>()
for (const edge of graph.edges) {
  for (const id of [edge.source, edge.target]) {
    const list = edgesByNode.get(id) ?? []
    list.push(edge)
    edgesByNode.set(id, list)
  }
}

export function neighborsOf(id: string): Set<string> {
  const result = new Set<string>()
  for (const edge of edgesByNode.get(id) ?? []) {
    result.add(edge.source === id ? edge.target : edge.source)
  }
  return result
}

export type KindVisibility = Record<NodeKind, boolean>

interface MapState {
  cameraMode: CameraMode
  hoveredId: string | null
  selectedId: string | null
  /** bumped on every selection so the camera re-flies to the same node */
  focusVersion: number
  visible: KindVisibility
  autoRotate: boolean
  showAllLabels: boolean
  setCameraMode: (cameraMode: CameraMode) => void
  setHovered: (id: string | null) => void
  select: (id: string | null) => void
  setVisible: (kind: NodeKind, value: boolean) => void
  setAutoRotate: (value: boolean) => void
  setShowAllLabels: (value: boolean) => void
}

export const useMapStore = create<MapState>()((set) => ({
  cameraMode: 'orbit',
  hoveredId: null,
  selectedId: null,
  focusVersion: 0,
  visible: {
    studio: true,
    member: true,
    film: true,
    software: true,
    person: true,
    company: true,
    musician: true,
    label: true,
  },
  autoRotate: true,
  showAllLabels: false,
  setCameraMode: (cameraMode) => set({ cameraMode }),
  setHovered: (hoveredId) => set({ hoveredId }),
  select: (selectedId) =>
    set((state) => ({ selectedId, focusVersion: state.focusVersion + 1, autoRotate: false })),
  setVisible: (kind, value) => set((state) => ({ visible: { ...state.visible, [kind]: value } })),
  setAutoRotate: (autoRotate) => set({ autoRotate }),
  setShowAllLabels: (showAllLabels) => set({ showAllLabels }),
}))
