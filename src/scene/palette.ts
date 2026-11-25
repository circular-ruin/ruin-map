import type { EdgeKind, NodeKind } from '../data/graph'

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
}
