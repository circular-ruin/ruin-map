/**
 * Northern Information: Tyler Etters's umbrella for music, software, and
 * art. Releases come from the public @tyleretters/discography package.
 * Projects and works are transcribed from nor.the-rn.info
 * (src/data/projects.js and subsidiaries.js in northern-information/
 * nor.the-rn.info). Collaborators are read from each release's credits.
 */

export interface NiProject {
  id: string
  name: string
  /** discography `project` values that belong to this project */
  aliases: string[]
  bio: string
  active: boolean
}

export const NI_PROJECTS: NiProject[] = [
  { id: 'ni-stuxnet', name: 'STUXNET', aliases: ['STUXNET'], active: true, bio: 'The figure runs towards the door of the strip mall.' },
  { id: 'ni-dj-stuxnet', name: 'DJ STUXNET', aliases: ['DJ STUXNET'], active: true, bio: 'May we rave atop burning oil derricks... and sink into the sea.' },
  {
    id: 'ni-tbwtb',
    name: 'They Became What They Beheld',
    aliases: ['They Became What They Beheld'],
    active: true,
    bio: 'Dangerous business, these orchestral loops.',
  },
  {
    id: 'ni-music',
    // the band shares the umbrella's name; the suffix keeps them apart
    name: 'Northern Information (Music)',
    aliases: ['Northern Information', 'tyler etters & the northern information movement'],
    active: true,
    bio: 'Loss. Memory. Transformation. Includes tyler etters & the northern information movement.',
  },
  { id: 'ni-sidereal-lobby', name: 'Sidereal Lobby', aliases: ['Sidereal Lobby'], active: false, bio: 'APE SHALL NOT KILL APE.' },
  {
    id: 'ni-connectedness-locus',
    name: 'Connectedness Locus',
    aliases: ['Connectedness Locus'],
    active: false,
    bio: 'The moon sets, the batteries run dry, and a cold, dreamless sleep overcomes.',
  },
  {
    id: 'ni-ecicefis',
    name: 'Everything Comes in Cycles; Everything Fades in Shades',
    aliases: ['Everything Comes in Cycles; Everything Fades in Shades'],
    active: false,
    bio: 'Post-Ix.',
  },
  {
    id: 'ni-synergy-beat',
    name: 'Synergy Beat',
    aliases: ['Synergy Beat'],
    active: false,
    bio: 'Soundtrack to accompany the eponymous cyberpunk anime zine.',
  },
  { id: 'ni-inocula', name: 'Inocula', aliases: ['Inocula'], active: false, bio: 'Melodic death metalcore.' },
  { id: 'ni-lucid-end', name: 'Lucid End', aliases: ['Lucid End'], active: false, bio: "Don't leave me." },
  { id: 'ni-ix', name: 'Ix', aliases: ['Ix'], active: false, bio: 'Precursor to Everything Comes in Cycles; Everything Fades in Shades.' },
]

/** Project members besides Tyler, as the release credits name them. */
export const NI_PROJECT_MEMBERS: Record<string, { name: string; role: string }[]> = {
  'ni-ix': [{ name: 'Paul Petrosyan', role: 'Band member' }],
  'ni-ecicefis': [{ name: 'Paul Petrosyan', role: 'Band member' }],
  'ni-inocula': [
    { name: 'Aaron Krause', role: 'Drums' },
    { name: 'AJ Sugg', role: 'Vocals' },
    { name: 'Browneye', role: 'Guitar' },
    { name: 'Daniel Massey', role: 'Guitar' },
    { name: 'Paul Petrosyan', role: 'Bass' },
  ],
  // credited only as "Laws & Etters, mmxxi"
  'ni-sidereal-lobby': [{ name: 'Laws', role: 'Band member ("Laws & Etters")' }],
}

export interface NiWork {
  id: string
  name: string
  dates: string
  blurb: string
  kind: 'label' | 'software' | 'event' | 'art' | 'publication'
}

/** The "subsidiaries" on nor.the-rn.info, plus labels from the discography. */
export const NI_WORKS: NiWork[] = [
  { id: 'ni-intertext', name: 'Intertext', dates: '2018–present', kind: 'label', blurb: 'A hermitic, one-man non-label where Tyler releases his music.' },
  { id: 'ni-efs', name: 'Endless Field Studios', dates: '2005–2017', kind: 'label', blurb: 'Label founded with Pasha Petrosyan; over 50 releases in a 12-year run.' },
  { id: 'ni-map-corps', name: 'Map Corps', dates: '2021', kind: 'label', blurb: 'Released the Sidereal Lobby triple LP.' },
  { id: 'ni-karma', name: 'Karma Productions', dates: '2008', kind: 'label', blurb: 'Released the Inocula LP.' },
  { id: 'ni-photography', name: 'Photography', dates: '2005–present', kind: 'art', blurb: 'Film, darkroom, cross-processing, and multiple exposures.' },
  { id: 'ni-epicycle-orrery', name: 'Epicycle Orrery', dates: '2026', kind: 'software', blurb: "An interactive 3D Ptolemaic cosmos on the Almagest's numbers. This map borrows its controls." },
  { id: 'ni-norns-community', name: 'norns community', dates: '2021–2025', kind: 'software', blurb: 'A script wiki for the monome norns sound computer.' },
  { id: 'ni-klang', name: 'Klang Magazine', dates: '2023–2024', kind: 'publication', blurb: 'A bilingual, independent sound publication.' },
  { id: 'ni-flash-crash', name: 'FLASH CRASH', dates: '2021–2022', kind: 'event', blurb: 'A recursive livecoding online event.' },
  { id: 'ni-goldeneye', name: 'goldeneye', dates: '2021', kind: 'software', blurb: 'The last sequencer before the EMPs hit.' },
  { id: 'ni-yggdrasil', name: 'Yggdrasil', dates: '2020', kind: 'software', blurb: 'A norns cyberdeck tracker, from the Applied Sciences and Phantasms Working Division.' },
  { id: 'ni-arcologies', name: 'arcologies', dates: '2020', kind: 'software', blurb: 'An interactive environment for designing 2D sound arcologies.' },
  { id: 'ni-dronecaster', name: 'dronecaster', dates: '2020', kind: 'software', blurb: 'A community SuperCollider drone project for norns.' },
  { id: 'ni-cascades', name: 'Cascades', dates: '2020', kind: 'software', blurb: 'A grid and arc application for Max for Live.' },
  { id: 'ni-conway', name: 'Conway Music', dates: '2020', kind: 'software', blurb: "Game of Life melodies on the grid, for Max for Live." },
  { id: 'ni-markov', name: 'Markov Music', dates: '2020', kind: 'software', blurb: 'A three-node Markov chain sequencer for Max.' },
  { id: 'ni-utc', name: 'Coordinated Universal Time', dates: '2019', kind: 'publication', blurb: 'A podcast for now: five episodes of found sound, theory, and dub techno.' },
  { id: 'ni-cascade', name: 'Cascade', dates: '2019', kind: 'software', blurb: 'A Max for Live sequencer holding every eighth-note combination in a bar.' },
  { id: 'ni-second-chance', name: 'Second Chance', dates: '2015', kind: 'art', blurb: 'An explorable Unity world, begun at gli.tc/h 2112.' },
  { id: 'ni-epicycle-typeface', name: 'Epicycle (Typeface)', dates: '2010', kind: 'art', blurb: 'A typeface mixing post-structuralism with wild style graffiti.' },
  { id: 'ni-third-coast', name: 'The Third Coast', dates: '2009', kind: 'art', blurb: "Photographs along northeastern Illinois's coastline." },
  { id: 'ni-hollow-moon', name: 'Hollow Moon Studios', dates: '2004–2007', kind: 'art', blurb: 'Early filmmaking.' },
]

/** discography `label` value → work id */
export const NI_LABELS: Record<string, string> = {
  Intertext: 'ni-intertext',
  'Endless Field Studios': 'ni-efs',
  'Map Corps': 'ni-map-corps',
  'Karma Productions': 'ni-karma',
  'Synergy Beat': 'ni-synergy-beat',
}

/**
 * Collaborators by release title, read from the release credits. Names are
 * as credited; Pasha and Paul Petrosyan stay separate because the credits
 * never say they are one person.
 */
export const NI_CREDITS: Record<string, { name: string; role: string }[]> = {
  'A report on our findings': [
    ...['Kyle Church', 'McNUG', 'helen_g', 'Dani Derks', 'Jano.987', 'DJ John Lovetron', 'postsolarpunk', 'license', 'Tony MF', 'Alex Mathiesen'].map(
      (name) => ({ name, role: 'Music' }),
    ),
    { name: 'RGB', role: 'Title' },
    { name: 'DJ Meisner', role: 'Art' },
    { name: 'Cory Salveson', role: 'Words' },
  ],
  'CONTINUUM HACK OST': [{ name: 'Wilson B. Stiner', role: 'Words' }],
  'IN DARKNESS RADIANT': [
    { name: 'Cory Salveson', role: 'Précis' },
    { name: 'zbs', role: 'Mix consultation' },
  ],
  'FADE SCATTER REPLICATE': [
    { name: 'Cory Salveson', role: 'Précis' },
    { name: 'John von Seggern', role: 'Album art prompt' },
  ],
  'HUMAN INTERFERENCE TASK FORCE': [{ name: 'license', role: 'Critical ear (thanks)' }],
  'LONG LIVE THE LOST ONES': [
    { name: 'Cory Salveson', role: 'Album title' },
    { name: 'Matthew Marx', role: 'Encryption key' },
    { name: 'Dan Derks', role: 'Distress signals' },
  ],
  'The Arecibo Lamentations': [
    ...['Dan Derks', 'Brian Crabtree', 'Ryan Laws', 'Zack Scholl', 'Cory Salveson', 'Sage Etters', 'Pasha Petrosyan'].map((name) => ({
      name,
      role: 'Thanks',
    })),
  ],
  reverence: [
    { name: 'David Kvistad', role: 'Guitar on "the snail shell graveyard"' },
    { name: 'Sage Etters', role: 'Field recordings on "unnamed seasons"' },
    { name: 'Lynda Wallis', role: 'Cover painting' },
  ],
  'dispatches from the prime meridian': [
    { name: 'Pasha Petrosyan', role: 'Featured on three tracks' },
    { name: 'Cory Salveson', role: 'Samples, videos, storyline, album title, cover polaroid' },
  ],
  'the legacy of our lost cause': [
    { name: 'Adam J. Moore', role: 'Featured on four tracks' },
    { name: 'Arthur Zdrinc', role: 'Featured on "holy mountain hymn"' },
    { name: 'Cory Salveson', role: 'Videos, images, and storyline' },
  ],
  'and though the soft apocalypse may yet overtake': [{ name: 'Adam J. Moore', role: 'Featured on two tracks' }],
  zulu: [{ name: 'Adam J. Moore', role: 'Co-writer, cover artwork' }],
  'the phantoms of our lost cause': [
    { name: 'Adam J. Moore', role: 'Featured on "samsara"' },
    { name: 'Paul Petrosyan', role: 'Cover artwork' },
  ],
  senescence: [
    { name: 'Kevin Clark', role: 'Co-writer, "tears of the space cowboy"' },
    { name: 'Dorian Zdrinc', role: 'Co-writer, "tears of the space cowboy"' },
    { name: 'Arthur Zdrinc', role: 'Co-writer, "tears of the space cowboy"' },
  ],
  'blue, the most celestial color': [{ name: 'Arthur Zdrinc', role: 'Featured on "rainbow table"' }],
  'When the Paint Peels': [
    { name: 'Isaac Pierce', role: 'Producer and engineer' },
    { name: 'Arthur Zdrinc', role: 'Mastering' },
  ],
}

/** Works and people the site ties together outside the release credits. */
export const NI_LINKS: { a: string; b: string; role: string }[] = [
  { a: 'Pasha Petrosyan', b: 'ni-efs', role: 'Co-founder' },
]
