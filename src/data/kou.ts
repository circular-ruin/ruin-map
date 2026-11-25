/**
 * Kou Records: the New York label Charmaine Lee runs with Randall Dunn,
 * releasing records in cohorts. Credits are transcribed from each
 * release's Bandcamp page (read November 2026). Release artists' own
 * performance credits live on the artist link, not in `credits`.
 */

export type CohortId = 'pre' | 'cohort-1' | 'spring-26' | 'fall-26'

export interface Cohort {
  id: CohortId
  name: string
  /** the cohort's vinyl color, where the label named one */
  vinyl?: string
  color: string
}

export const COHORTS: Cohort[] = [
  { id: 'pre', name: 'Before the Cohorts', color: '#d9c7a0' },
  { id: 'cohort-1', name: 'Cohort 1', vinyl: 'Kou Orange', color: '#ff9a3c' },
  { id: 'spring-26', name: "Spring '26 Cohort", vinyl: 'Mint Blue', color: '#8fe3d6' },
  { id: 'fall-26', name: "Fall '26 Cohort", vinyl: 'Gunmetal Grey', color: '#9aa6b4' },
]

export type CreditType = 'performer' | 'production' | 'artwork'

export interface KouCredit {
  name: string
  role: string
  type: CreditType
}

export interface KouRelease {
  id: string
  artists: { name: string; role: string }[]
  title: string
  released: string
  cohort: CohortId
  catalog?: string
  credits: KouCredit[]
}

const p = (name: string, role: string): KouCredit => ({ name, role, type: 'performer' })
const e = (name: string, role: string): KouCredit => ({ name, role, type: 'production' })
const a = (name: string, role: string): KouCredit => ({ name, role, type: 'artwork' })

/** shared by most 2026 releases */
const CUT = e('Paul Gold', 'Lacquer cut (Salt Mastering)')
const DESIGN = [a('Jordan Rundle', 'Layout and design'), a('Úna Blue', 'Layout and design')]
const EXEC = e('Charmaine Lee', 'Executive producer')

export const KOU_RELEASES: KouRelease[] = [
  {
    id: 'kou-beyond-shaabi',
    artists: [{ name: 'Rizan Said', role: 'Artist: keyboards, music' }],
    title: 'Ma Waraa Al-Shaabi – Beyond Shaabi',
    released: '2026-11-06',
    cohort: 'fall-26',
    credits: [
      e('Randall Dunn', 'Producer, mixer, recording; Minimoog bass'),
      e('Mark Gergis', 'Co-producer'),
      e('Úlfur Hansson', 'Additional production, recording'),
      e('Ben Greenberg', 'Mastering, Dolby Atmos mixes'),
      CUT,
      EXEC,
      a('Rebeka Arce', 'Front cover artwork'),
      a('Randy Ortiz', 'Back cover portrait'),
      ...DESIGN,
    ],
  },
  {
    id: 'kou-manifold',
    artists: [{ name: 'Randall Dunn', role: 'Artist: composer, arranger, producer, mixer, synthesizers' }],
    title: 'Manifold of Partially Actualized Realities',
    released: '2026-11-06',
    cohort: 'fall-26',
    credits: [
      p('Theo Espy', 'Violin'),
      p('Henry Fraser', 'Bass'),
      p('Izaak Mills', 'Alto and bass flute'),
      p('Ben Greenberg', 'Moog guitar, guitar; recording, mastering, Dolby Atmos mixes'),
      p('Jim Jarmusch', 'Spoken word (text by Philip K. Dick)'),
      p('Laima Leyton', 'Spoken word (text by Robert Graves)'),
      p('Cyro Baptista', 'Percussion, berimbau'),
      p('Briggan Krauss', 'Alto saxophone'),
      p('Charmaine Lee', 'Vocals; executive producer'),
      p('Robert Aiki Aubrey Lowe', 'Vocals'),
      CUT,
      a('Steve Rude', 'Front cover artwork, back cover portrait'),
      ...DESIGN,
    ],
  },
  {
    id: 'kou-long-ear',
    artists: [{ name: 'Noh Age', role: 'Artist' }],
    title: 'The Long Ear',
    released: '2026-11-06',
    cohort: 'fall-26',
    credits: [
      p('Charmaine Lee', 'Parabolic microphone, feedback, voice, celesta; executive producer'),
      p('John McCowen', 'Contrabass clarinet, B♭ clarinet, recorder'),
      p('Li-Chin Li', 'Sheng'),
      e('Randall Dunn', 'Producer, mixer; composed "Cold Lake"; synths and sound design'),
      e('Ben Greenberg', 'Recording, mastering, Dolby Atmos mixes'),
      CUT,
      a('Shintaro Kago', 'Front cover artwork, back cover portrait'),
      ...DESIGN,
    ],
  },
  {
    id: 'kou-altarpiece',
    artists: [{ name: 'Eric Wubbels', role: 'Artist: composer' }],
    title: 'Altarpiece H. af K.',
    released: '2026-10-23',
    cohort: 'fall-26',
    credits: [
      p('Dana Jessen', 'Bassoon'),
      p('Ben Roidl-Ward', 'Bassoon'),
      p('Katherine Young', 'Bassoon'),
      e('Randall Dunn', 'Producer, mixer, recording (Power Station)'),
      e('Ben Greenberg', 'Mastering, Dolby Atmos mixes'),
      CUT,
      EXEC,
      a('Thomas Hooper', 'Front cover artwork'),
      a('Julie Bell', 'Back cover portrait'),
      ...DESIGN,
    ],
  },
  {
    id: 'kou-prophetic',
    artists: [{ name: 'Oren Ambarchi', role: 'Artist: solo guitar' }],
    title: 'Prophetic Perfect Tense',
    released: '2026-10-23',
    cohort: 'fall-26',
    credits: [
      e('Randall Dunn', 'Producer, mixer, recording (Studio Dede, Tokyo)'),
      e('Shinya Abe', 'Assistant engineer'),
      e('Ben Greenberg', 'Mastering, Dolby Atmos mixes'),
      CUT,
      EXEC,
      a('Kazuko Miyamoto', 'Front cover artwork (Untitled, 1977)'),
      a('Ken Langraf', 'Back cover portrait'),
      ...DESIGN,
    ],
  },
  {
    id: 'kou-reona',
    artists: [{ name: 'REONA', role: 'Artist: music and movement' }],
    title: 'REONA',
    released: '2026-10-23',
    cohort: 'fall-26',
    credits: [
      p('Atsuo', 'Drums and percussion on "M108"'),
      e('Randall Dunn', 'Producer, mixer, recording (Studio Dede, Tokyo)'),
      e('Shinya Abe', 'Assistant engineer'),
      e('Ben Greenberg', 'Mastering, Dolby Atmos mixes'),
      CUT,
      EXEC,
      a('Kazuki Tomokawa', 'Front cover artwork'),
      a('Allison Brant', 'Back cover portrait'),
      ...DESIGN,
    ],
  },
  {
    id: 'kou-looks-far-woman',
    artists: [{ name: 'Aliya Ultan', role: 'Artist: cello' }],
    title: 'Looks Far Woman',
    released: '2026-06-26',
    cohort: 'spring-26',
    credits: [
      e('Randall Dunn', 'Producer, mixer, recording'),
      e('Ben Greenberg', 'Mastering, Dolby Atmos mixes'),
      CUT,
      EXEC,
      a('Caroline Harrison', 'Front cover artwork'),
      a('Daniel Vega', 'Back cover portrait'),
      ...DESIGN,
    ],
  },
  {
    id: 'kou-shade-zero',
    artists: [{ name: 'Taiga Ultan', role: 'Artist: flute, poetry' }],
    title: 'Shade Zero',
    released: '2026-06-26',
    cohort: 'spring-26',
    credits: [
      e('Randall Dunn', 'Producer, mixer, recording'),
      e('Ben Greenberg', 'Mastering, Dolby Atmos mixes'),
      CUT,
      EXEC,
      a('Tushar Dobriyal', 'Front cover artwork'),
      a('Saprophial', 'Back cover portrait'),
      a('Aaron Turner', 'Logos'),
      ...DESIGN,
    ],
  },
  {
    id: 'kou-manifestations',
    artists: [{ name: 'Robert Aiki Aubrey Lowe', role: 'Artist: voice, electronics; front cover artwork' }],
    title: 'Manifestations in the Shadow of an Uncertain Land',
    released: '2026-06-12',
    cohort: 'spring-26',
    credits: [
      e('Randall Dunn', 'Co-producer, mixer, recording'),
      e('Ben Greenberg', 'Mastering, Dolby Atmos mixes'),
      CUT,
      EXEC,
      a('Damon Locks', 'Back cover portrait'),
      ...DESIGN,
    ],
  },
  {
    id: 'kou-pneuma',
    artists: [{ name: 'Henry Fraser', role: 'Artist: double bass' }],
    title: 'Pneuma',
    released: '2026-06-12',
    cohort: 'spring-26',
    credits: [
      e('Randall Dunn', 'Co-producer, mixer, recording'),
      e('Ben Greenberg', 'Co-producer, recording, mastering, Dolby Atmos mixes'),
      CUT,
      EXEC,
      a('Robert Beatty', 'Front cover artwork'),
      a('Santo Hazarika', 'Back cover portrait'),
      ...DESIGN,
    ],
  },
  {
    id: 'kou-now-i-imagine',
    artists: [{ name: 'David Torn', role: 'Artist: guitars, electronics' }],
    title: 'now i imagine a place not the same',
    released: '2026-05-29',
    cohort: 'spring-26',
    credits: [
      e('Randall Dunn', 'Producer, mixer, recording; additional electronics; liner notes'),
      e('Chris Bittner', 'Recording (Applehead Recording)'),
      e('Ben Greenberg', 'Mastering, Dolby Atmos mixes'),
      CUT,
      EXEC,
      a("Stephen O'Malley", 'Concrete poem in honor of Torn'),
      a('Arik Roper', 'Album artwork, gatefold, and portrait'),
      ...DESIGN,
    ],
  },
  {
    id: 'kou-ratsnake',
    artists: [{ name: 'Chloe Kim', role: 'Artist: solo drums' }],
    title: 'Ratsnake',
    released: '2025-10-31',
    cohort: 'cohort-1',
    credits: [e('Randall Dunn', 'Producer'), a('Pat Aulisio', 'Artwork and artist portrait')],
  },
  {
    id: 'kou-riparian',
    artists: [{ name: 'Eyvind Kang', role: "Artist: viola d'amore, compositions" }],
    title: 'Riparian',
    released: '2025-10-31',
    cohort: 'cohort-1',
    credits: [
      e('Randall Dunn', 'Producer, mixer, recording'),
      e('Ben Greenberg', 'Dolby Atmos mixes'),
      EXEC,
      a('Maura Chen', 'Front cover artwork'),
      a('Randy Ortiz', 'Back cover portrait'),
      a('Úna Blue', 'Layout and design'),
    ],
  },
  {
    id: 'kou-tulpa',
    artists: [{ name: 'Charmaine Lee', role: 'Artist: voice, electronics; executive producer' }],
    title: 'Tulpa',
    released: '2025-10-31',
    cohort: 'cohort-1',
    catalog: 'KR002',
    credits: [
      p('Ned Rothenberg', 'Bass clarinet on "Noh Age"'),
      e('Randall Dunn', 'Producer, mixer, recording; sound and synth design'),
      e('Ben Greenberg', 'Dolby Atmos mixes'),
      a('Lale Westvind', 'Front cover artwork, back cover portrait'),
      a('Úna Blue', 'Layout and design'),
    ],
  },
  {
    id: 'kou-uranian-void',
    artists: [{ name: 'Jessika Kenney', role: 'Artist: voice, piano, electronics, compositions, texts' }],
    title: 'Uranian Void',
    released: '2025-10-31',
    cohort: 'cohort-1',
    credits: [
      e('Randall Dunn', 'Producer, mixer, recording'),
      e('Ben Greenberg', 'Dolby Atmos mixes'),
      EXEC,
      a('Keli Mashburn', 'Front cover photography'),
      a('Caroline Harrison', 'Back cover portrait'),
      a('Úna Blue', 'Layout and design'),
    ],
  },
  {
    id: 'kou-elevator-music',
    artists: [
      { name: 'Charmaine Lee', role: 'Artist' },
      { name: 'Ikue Mori', role: 'Featured artist' },
    ],
    title: 'Elevator Music',
    released: '2024-09-04',
    cohort: 'pre',
    credits: [
      e('Randall Dunn', 'Mixing and mastering'),
      CUT,
      a('Austin Gregory', 'Album artwork'),
      a('Aníbal Bley', 'Video for "Royal Flush"'),
    ],
  },
]

/** releases whose credits name Circular Ruin itself as the mastering room */
export const MASTERED_AT_CIRCULAR_RUIN = new Set(['kou-riparian', 'kou-tulpa', 'kou-uranian-void'])
