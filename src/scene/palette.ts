import type { EdgeKind, GraphNode, NodeKind } from '../data/graph'
import { COHORTS } from '../data/kou'

/** Brass and ember on near-black, after the orrery. */
export const NODE_COLOR: Record<NodeKind, string> = {
  studio: '#f6e7b8',
  member: '#ffb35c',
  software: '#ff7a5c',
  film: '#e9d9a6',
  person: '#86bde0',
  company: '#c79be0',
  musician: '#8fd18b',
  label: '#6f9c86',
  kou: '#ff5c8a',
  release: '#ff9a3c',
  artist: '#ffa3c4',
  player: '#d98fb6',
  contributor: '#a67c93',
  ni: '#4fd8ff',
  project: '#7fe7ff',
  work: '#b8eefc',
  record: '#3f9cc0',
  collaborator: '#dfe6ee',
}

export const NODE_SIZE: Record<NodeKind, number> = {
  studio: 2.4,
  member: 1.4,
  software: 1.1,
  film: 1.25,
  person: 0.7,
  company: 0.75,
  musician: 0.6,
  label: 0.45,
  kou: 3,
  release: 1.6,
  artist: 1.15,
  player: 0.8,
  contributor: 0.6,
  ni: 3,
  project: 1.5,
  work: 1.05,
  record: 0.75,
  collaborator: 0.65,
}

export const KIND_LABEL: Record<NodeKind, string> = {
  studio: 'Studio',
  member: 'Team',
  software: 'Software',
  film: 'Films & TV',
  person: 'Filmmakers, Cast & Composers',
  company: 'Production Companies',
  musician: 'Musicians',
  label: 'Record Labels',
  kou: 'Kou Records',
  release: 'Kou Releases',
  artist: 'Kou Artists',
  player: 'Kou Players',
  contributor: 'Kou Artwork & Engineering',
  ni: 'Northern Information',
  project: 'NI Music Projects',
  work: 'NI Works & Labels',
  record: 'NI Releases',
  collaborator: 'NI Collaborators',
}

export const EDGE_COLOR: Record<EdgeKind, string> = {
  studio: '#c8b98a',
  crew: '#ffb35c',
  director: '#86bde0',
  writer: '#86bde0',
  composer: '#f08fb0',
  cast: '#6f8fae',
  company: '#c79be0',
  music: '#8fd18b',
  roster: '#4b5a52',
  link: '#d0d0d0',
  kou: '#ff5c8a',
  release: '#ffa3c4',
  performer: '#d98fb6',
  production: '#ffb35c',
  artwork: '#7d5a6c',
  ni: '#4fd8ff',
  record: '#3f9cc0',
  imprint: '#2f6a80',
  collab: '#dfe6ee',
}

/** releases take their cohort's vinyl color */
export function nodeColor(node: GraphNode): string {
  if (node.kind === 'release' && node.cohort) {
    return COHORTS.find((cohort) => cohort.id === node.cohort)?.color ?? NODE_COLOR.release
  }
  return NODE_COLOR[node.kind]
}
