import {
  ALIASES,
  DISPLAY_NOTES,
  EXTRA_LINKS,
  FILMS,
  MEMBER_MUSIC,
  MEMBERS,
  SOFTWARE,
} from './credits'
import roster from './roster.json'

export type NodeKind =
  | 'studio'
  | 'member'
  | 'film'
  | 'software'
  | 'person'
  | 'company'
  | 'musician'
  | 'label'

export type EdgeKind =
  | 'studio'
  | 'crew'
  | 'director'
  | 'writer'
  | 'composer'
  | 'cast'
  | 'company'
  | 'music'
  | 'roster'
  | 'link'

export interface GraphNode {
  id: string
  name: string
  kind: NodeKind
  /** short line under the name in the detail panel */
  subtitle?: string
  note?: string
  year?: number
  /** films only: listed under Selected Works on circularruin.com */
  selected?: boolean
  /** on the circularruin.com client list */
  client?: boolean
}

export interface GraphEdge {
  source: string
  target: string
  kind: EdgeKind
  /** human-readable role, read from source's point of view */
  role: string
}

export interface Graph {
  nodes: GraphNode[]
  edges: GraphEdge[]
}

const STUDIO_ID = 'circular-ruin'

export function slug(name: string): string {
  return name
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function canonicalName(name: string): string {
  return ALIASES[name] ?? name
}

/**
 * Builds the graph from the studio roster and hand-authored credits. One
 * node per real-world entity: a name that appears as a director, a cast
 * member, and a client becomes one node with several edges.
 */
export function buildGraph(): Graph {
  const nodes = new Map<string, GraphNode>()
  const edges: GraphEdge[] = []
  const edgeKeys = new Set<string>()

  const upsert = (name: string, kind: NodeKind, extra: Partial<GraphNode> = {}): string => {
    const canonical = canonicalName(name)
    const id = slug(canonical)
    const existing = nodes.get(id)
    if (existing) {
      // a person beats a roster placement: they have a concrete credit
      if (KIND_PRIORITY[kind] < KIND_PRIORITY[existing.kind]) existing.kind = kind
      Object.assign(existing, { ...extra, client: existing.client || extra.client })
      return id
    }
    nodes.set(id, { id, name: canonical, kind, note: DISPLAY_NOTES[canonical], ...extra })
    return id
  }

  const link = (source: string, target: string, kind: EdgeKind, role: string) => {
    const key = `${source}|${target}|${role}`
    if (edgeKeys.has(key) || source === target) return
    edgeKeys.add(key)
    edges.push({ source, target, kind, role })
  }

  nodes.set(STUDIO_ID, {
    id: STUDIO_ID,
    name: 'Circular Ruin',
    kind: 'studio',
    subtitle: 'Studio, collective, and software company',
    note: 'Composers, record producers, and music editors in Brooklyn, NY. Also makers of professional audio plugins.',
  })

  for (const member of MEMBERS) {
    nodes.set(member.id, {
      id: member.id,
      name: member.name,
      kind: 'member',
      subtitle: member.role,
      note: member.blurb,
    })
    link(member.id, STUDIO_ID, 'studio', 'Member')
  }

  for (const software of SOFTWARE) {
    nodes.set(software.id, {
      id: software.id,
      name: software.title,
      kind: 'software',
      subtitle: 'Audio plugin',
      note: software.blurb,
    })
    link(software.id, STUDIO_ID, 'studio', 'Made by')
  }

  for (const film of FILMS) {
    const kindLabel = { film: 'Film', series: 'Series', episode: 'Episode', documentary: 'Documentary' }[
      film.kind ?? 'film'
    ]
    nodes.set(film.id, {
      id: film.id,
      name: film.title,
      kind: 'film',
      year: film.year,
      selected: film.selected,
      subtitle: `${kindLabel}, ${film.year}`,
      note: [film.studioCredit && `Circular Ruin: ${film.studioCredit}.`, film.note]
        .filter(Boolean)
        .join(' '),
    })
    if (film.selected) link(film.id, STUDIO_ID, 'studio', 'Selected work')
    for (const [memberId, roles] of Object.entries(film.crew)) {
      link(memberId, film.id, 'crew', roles.join(', '))
    }
    for (const name of film.directors ?? []) link(upsert(name, 'person'), film.id, 'director', 'Director')
    for (const name of film.writers ?? []) link(upsert(name, 'person'), film.id, 'writer', 'Writer')
    for (const name of film.composers ?? []) link(upsert(name, 'person'), film.id, 'composer', 'Composer')
    for (const name of film.cast ?? []) link(upsert(name, 'person'), film.id, 'cast', 'Cast')
    for (const name of film.companies ?? []) link(upsert(name, 'company'), film.id, 'company', 'Production or distribution')
  }

  for (const [memberId, ties] of Object.entries(MEMBER_MUSIC)) {
    for (const tie of ties) link(memberId, upsert(tie.name, 'musician'), 'music', tie.role)
  }

  const rosterGroups: [keyof typeof roster, NodeKind, string][] = [
    ['Filmmakers', 'person', 'Client: filmmaker'],
    ['Production Companies', 'company', 'Client: production company'],
    ['Music', 'musician', 'Client: music'],
    ['Record Labels', 'label', 'Client: record label'],
  ]
  for (const [group, kind, role] of rosterGroups) {
    for (const name of roster[group]) {
      // members appear in the music roster; they already orbit the studio
      if (MEMBERS.some((member) => member.name === name)) continue
      link(upsert(name, kind, { client: true }), STUDIO_ID, 'roster', role)
    }
  }

  for (const extra of EXTRA_LINKS) {
    link(upsert(extra.a, 'person'), upsert(extra.b, 'musician'), 'link', extra.role)
  }

  return { nodes: [...nodes.values()], edges }
}

/** lower wins when one entity shows up under several kinds */
const KIND_PRIORITY: Record<NodeKind, number> = {
  studio: 0,
  member: 1,
  film: 2,
  software: 3,
  person: 4,
  company: 5,
  musician: 6,
  label: 7,
}

export const STUDIO = STUDIO_ID
