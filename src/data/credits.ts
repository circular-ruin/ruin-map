/**
 * Hand-authored credits. Sources:
 * - Team bios and selected works: circularruin.com (shopify repo,
 *   theme/templates/page.team.json and index.json)
 * - Directors, composers, cast, and companies: verified against public
 *   film databases and trade press in November 2026. Fields that could not
 *   be confirmed are left out rather than guessed.
 */

export type MemberId = 'randall' | 'ben' | 'arjan'

export interface Member {
  id: MemberId
  name: string
  role: string
  blurb: string
}

export const MEMBERS: Member[] = [
  {
    id: 'randall',
    name: 'Randall Dunn',
    role: 'Composer, Music Producer',
    blurb:
      'Composer, producer, and multi-instrumentalist. Collaborated with Jóhann Jóhannsson on the Mandy score and has produced scores for Candyman, Problemista, and The Curse.',
  },
  {
    id: 'ben',
    name: 'Ben Greenberg',
    role: 'Composer, Music Producer',
    blurb:
      'NYC producer, engineer, mixer, and founding member of Uniform. Won the 2024 Cinema Audio Society award for his mixes of the 32 Sounds score.',
  },
  {
    id: 'arjan',
    name: 'Arjan Miranda',
    role: 'Composer, Music Editor',
    blurb:
      'Songwriter, composer, and music editor (IATSE 700). Longtime bassist in Black Mountain; met Randall Dunn while recording Black Mountain IV.',
  },
]

export interface Film {
  id: string
  title: string
  year: number
  /** shown on circularruin.com under Selected Works */
  selected: boolean
  /** the studio's credit line for the project, when the site gives one */
  studioCredit?: string
  kind?: 'film' | 'series' | 'episode' | 'documentary'
  directors?: string[]
  writers?: string[]
  composers?: string[]
  cast?: string[]
  companies?: string[]
  note?: string
  crew: Partial<Record<MemberId, string[]>>
}

export const FILMS: Film[] = [
  {
    id: 'marty-supreme',
    title: 'Marty Supreme',
    year: 2025,
    selected: true,
    studioCredit: 'Music Editing',
    directors: ['Josh Safdie'],
    writers: ['Ronald Bronstein'],
    composers: ['Daniel Lopatin'],
    cast: ['Timothée Chalamet', 'Gwyneth Paltrow', "Odessa A'zion", "Kevin O'Leary", 'Tyler, the Creator'],
    companies: ['A24'],
    crew: { arjan: ['Music Editing'] },
  },
  {
    id: 'mandy',
    title: 'Mandy',
    year: 2018,
    selected: true,
    studioCredit: 'Additional Composition, Score Production',
    directors: ['Panos Cosmatos'],
    composers: ['Jóhann Jóhannsson'],
    cast: ['Nicolas Cage', 'Andrea Riseborough', 'Linus Roache', 'Ned Dennehy', 'Olwen Fouéré'],
    companies: ['SpectreVision', 'XYZ Films', 'RLJE Films'],
    crew: {
      randall: ['Additional Composition', 'Score Production'],
      ben: ['Score Engineering and Mixing'],
    },
  },
  {
    id: 'smashing-machine',
    title: 'The Smashing Machine',
    year: 2025,
    selected: true,
    studioCredit: 'Music Editing, Score Mixing',
    directors: ['Benny Safdie'],
    composers: ['Nala Sinephro'],
    cast: ['Dwayne Johnson', 'Emily Blunt', 'Ryan Bader', 'Bas Rutten', 'Oleksandr Usyk'],
    companies: ['A24', 'Seven Bucks Productions'],
    crew: {
      randall: ['Score Production'],
      ben: ['Score Engineering and Mixing'],
      arjan: ['Music Editing'],
    },
  },
  {
    id: 'john-lilly',
    title: 'John Lilly and the Earth Coincidence Control Office',
    year: 2025,
    selected: true,
    kind: 'documentary',
    studioCredit: 'Additional Composition',
    directors: ['Michael Almereyda', 'Courtney Stephens'],
    cast: ['Chloë Sevigny'],
    companies: ['Oscilloscope'],
    note: 'Chloë Sevigny narrates.',
    crew: { randall: ['Additional Composition'], arjan: ['Additional Composition'] },
  },
  {
    id: 'the-viewing',
    title: 'The Viewing',
    year: 2022,
    selected: true,
    kind: 'episode',
    studioCredit: 'Additional Composition, Score Production',
    directors: ['Panos Cosmatos'],
    writers: ['Guillermo Del Toro'],
    composers: ['Daniel Lopatin'],
    cast: ['Peter Weller', 'Eric André', 'Sofia Boutella', 'Steve Agee', 'Charlyne Yi'],
    companies: ['Netflix'],
    note: "An episode of Guillermo del Toro's Cabinet of Curiosities. Del Toro created the series.",
    crew: { randall: ['Additional Composition', 'Score Production'] },
  },
  {
    id: 'candyman',
    title: 'Candyman',
    year: 2021,
    selected: true,
    studioCredit: 'Score Production',
    directors: ['Nia DaCosta'],
    composers: ['Robert Aiki Aubrey Lowe'],
    cast: ['Yahya Abdul-Mateen II', 'Teyonah Parris', 'Nathan Stewart-Jarrett', 'Colman Domingo'],
    companies: ['Universal Pictures', 'Monkeypaw Productions', 'MGM'],
    note: 'The score was shortlisted for the Academy Award.',
    crew: { randall: ['Score Production'] },
  },
  {
    id: 'tv-glow',
    title: 'I Saw the TV Glow',
    year: 2024,
    selected: true,
    studioCredit: 'Music Editing',
    directors: ['Jane Schoenbrun'],
    composers: ['Alex G'],
    cast: ['Justice Smith', 'Brigette Lundy-Paine', 'Helena Howard', 'Danielle Deadwyler'],
    companies: ['A24', 'Fruit Tree'],
    crew: { arjan: ['Music Editing'] },
  },
  {
    id: 'problemista',
    title: 'Problemista',
    year: 2023,
    selected: true,
    studioCredit: 'Score Production, Music Editing',
    directors: ['Julio Torres'],
    composers: ['OHYUNG'],
    cast: ['Julio Torres', 'Tilda Swinton', 'RZA', 'Greta Lee', 'Isabella Rossellini'],
    companies: ['A24'],
    crew: {
      randall: ['Score Production'],
      ben: ['Score Mixing'],
      arjan: ['Music Editing'],
    },
  },
  {
    id: 'the-curse',
    title: 'The Curse',
    year: 2023,
    selected: true,
    kind: 'series',
    studioCredit: 'Additional Composition, Score Production',
    directors: ['Nathan Fielder', 'Benny Safdie'],
    composers: ['John Medeski'],
    cast: ['Emma Stone', 'Nathan Fielder', 'Benny Safdie'],
    companies: ['Showtime', 'A24'],
    note: 'Daniel Lopatin executive-produced the soundtrack album.',
    crew: {
      randall: ['Additional Composition', 'Score Production'],
      arjan: ['Additional Composition'],
    },
  },
  {
    id: 'a-real-pain',
    title: 'A Real Pain',
    year: 2024,
    selected: true,
    studioCredit: 'Music Editing',
    directors: ['Jesse Eisenberg'],
    cast: ['Jesse Eisenberg', 'Kieran Culkin', 'Will Sharpe', 'Jennifer Grey', 'Kurt Egyiawan'],
    companies: ['Searchlight Pictures', 'Topic Studios', 'Fruit Tree'],
    note: 'No original score: the music is Chopin, played by Tzvi Erez.',
    crew: { arjan: ['Music Editing'] },
  },
  {
    id: 'fair-play',
    title: 'Fair Play',
    year: 2023,
    selected: true,
    studioCredit: 'Score Mixing',
    directors: ['Chloe Domont'],
    composers: ['Brian McOmber'],
    cast: ['Phoebe Dynevor', 'Alden Ehrenreich', 'Eddie Marsan', 'Rich Sommer'],
    companies: ['Netflix', 'T-Street'],
    crew: { ben: ['Score Mixing'] },
  },
  {
    id: 'anniversary',
    title: 'Anniversary',
    year: 2025,
    selected: true,
    studioCredit: 'Music Editing',
    directors: ['Jan Komasa'],
    composers: ['Danny Bensi', 'Saunder Jurriaans'],
    cast: ['Diane Lane', 'Kyle Chandler', 'Madeline Brewer', 'Zoey Deutch', 'Phoebe Dynevor'],
    companies: ['Lionsgate'],
    crew: { arjan: ['Music Editing'] },
  },
  {
    id: 'the-bride',
    title: 'The Bride!',
    year: 2026,
    selected: true,
    studioCredit: 'Score Production, Music Editing',
    directors: ['Maggie Gyllenhaal'],
    composers: ['Hildur Guðnadóttir'],
    cast: ['Jessie Buckley', 'Christian Bale', 'Peter Sarsgaard', 'Annette Bening', 'Jake Gyllenhaal'],
    companies: ['Warner Brothers'],
    crew: { randall: ['Score Production'], arjan: ['Music Editing'] },
  },
  {
    id: '32-sounds',
    title: '32 Sounds',
    year: 2022,
    selected: true,
    kind: 'documentary',
    studioCredit: 'Score Mixing',
    directors: ['Sam Green'],
    composers: ['JD Samson'],
    companies: ['Abramorama'],
    note: 'Ben Greenberg won the 2024 Cinema Audio Society award for its stereo and surround score mixes.',
    crew: { ben: ['Score Mixing', 'Re-Recording Mixing'] },
  },
  {
    id: 'moloch',
    title: 'Moloch',
    year: 2022,
    selected: true,
    studioCredit: 'Additional Composition, Score Production',
    directors: ['Nico van den Brink'],
    composers: ['Ella van der Woude'],
    cast: ['Sallie Harmsen', 'Alexandre Willaume', 'Anneke Blok'],
    companies: ['Shudder'],
    crew: {
      randall: ['Additional Composition', 'Score Production'],
      ben: ['Score Engineering and Mixing'],
      arjan: ['Additional Composition'],
    },
  },
  {
    id: 'it-comes-at-night',
    title: 'It Comes at Night',
    year: 2017,
    selected: true,
    studioCredit: 'Score Mixing',
    directors: ['Trey Edward Shults'],
    composers: ['Brian McOmber'],
    cast: ['Joel Edgerton', 'Christopher Abbott', 'Carmen Ejogo', 'Riley Keough', 'Kelvin Harrison Jr.'],
    companies: ['A24'],
    crew: { ben: ['Score Mixing'] },
  },
  {
    id: 'goat',
    title: 'Goat',
    year: 2016,
    selected: true,
    studioCredit: 'Composition, Score Production',
    directors: ['Andrew Neel'],
    cast: ['Ben Schnetzer', 'Nick Jonas', 'Gus Halper', 'Virginia Gardner'],
    companies: ['Killer Films'],
    crew: { arjan: ['Composition'] },
  },
  {
    id: 'argonauts',
    title: 'Argonauts at the End of History',
    year: 2026,
    selected: false,
    kind: 'documentary',
    directors: ['Sierra Pettengill'],
    crew: {
      randall: ['Composition'],
      ben: ['Additional Composition', 'Re-Recording Mixing'],
      arjan: ['Additional Composition', 'Music Editing'],
    },
  },
  {
    id: 'feed-a-dictator',
    title: 'How to Feed a Dictator',
    year: 2026,
    selected: false,
    kind: 'documentary',
    directors: ['Andrew Neel'],
    note: 'Premiered at Tribeca in 2026.',
    crew: {
      ben: ['Additional Composition'],
      arjan: ['Composition', 'Music Editing'],
    },
  },
  {
    id: 'salvage-marines',
    title: 'Salvage Marines',
    year: 2022,
    selected: false,
    kind: 'series',
    directors: ['Shaun Paul Piccinino'],
    cast: ['Casper Van Dien', 'Armand Assante'],
    crew: { randall: ['Composition'] },
  },
  {
    id: 'the-shade',
    title: 'The Shade',
    year: 2023,
    selected: false,
    directors: ['Tyler Chipman'],
    composers: ['Brian McOmber'],
    cast: ['Chris Galust', 'Laura Benanti'],
    crew: { ben: ['Additional Composition'], arjan: ['Additional Composition'] },
  },
  // Scores Ben Greenberg engineered and mixed, per his bio. Only the
  // composer link is sourced; directors and cast are left out.
  ...(
    [
      ['krisha', 'Krisha', 2015, 'Brian McOmber'],
      ['kingdom-of-silence', 'Kingdom of Silence', 2020, 'Brian McOmber'],
      ['16-shots', '16 Shots', 2019, 'Brian McOmber'],
      ['little-woods', 'Little Woods', 2018, 'Brian McOmber'],
      ['mickey-and-the-bear', 'Mickey and the Bear', 2019, 'Brian McOmber'],
      ['blow-the-man-down', 'Blow the Man Down', 2019, 'Brian McOmber'],
      ['something-you-said', 'Something You Said Last Night', 2022, 'Ella van der Woude'],
      ['silver-haze', 'Silver Haze', 2023, 'Ella van der Woude'],
    ] as const
  ).map(
    ([id, title, year, composer]): Film => ({
      id,
      title,
      year,
      selected: false,
      composers: [composer],
      crew: { ben: ['Score Engineering and Mixing'] },
    }),
  ),
]

/** Software Circular Ruin builds alongside the studio work. */
export const SOFTWARE = [
  { id: 'torus', title: 'Torus', blurb: 'An audio plugin by Circular Ruin.' },
  { id: 'tiny-torus', title: 'Tiny Torus', blurb: 'A smaller sibling of Torus.' },
]

/**
 * Person-to-musician links from the team bios: bands played in, records
 * produced or mixed, and collaborators. Names match the client roster
 * where the roster lists them.
 */
export const MEMBER_MUSIC: Record<MemberId, { name: string; role: string }[]> = {
  randall: [
    { name: 'Jóhann Jóhannsson', role: 'Score collaborator (Mandy)' },
    { name: 'Oneohtrix Point Never', role: 'Collaborator (The Viewing, The Curse)' },
    { name: 'Black Mountain', role: 'Producer (Black Mountain IV)' },
  ],
  ben: [
    { name: 'Uniform', role: 'Founding member' },
    { name: 'Dan Boeckner', role: 'Played with' },
    { name: 'Couch Slut', role: 'Played with' },
    { name: 'Dazzling Killmen', role: 'Played with' },
    { name: 'Miasmatic Necrosis', role: 'Played with' },
    { name: 'Stephen Tanner', role: 'Played with' },
    { name: 'The Men', role: 'Played with' },
    { name: 'Zs', role: 'Played with' },
    { name: 'Hubble', role: 'Played with' },
    { name: 'Danny Elfman', role: 'Recording, mixing, or production' },
    { name: 'Depeche Mode', role: 'Recording, mixing, or production' },
    { name: 'Chat Pile', role: 'Recording, mixing, or production' },
    { name: 'Drab Majesty', role: 'Recording, mixing, or production' },
    { name: 'Nels Cline', role: 'Recording, mixing, or production' },
    { name: 'Wicca Phase Springs Eternal', role: 'Recording, mixing, or production' },
    { name: 'Show Me The Body', role: 'Recording, mixing, or production' },
    { name: 'Marc Ribot', role: 'Recording, mixing, or production' },
    { name: 'Drew McDowall', role: 'Recording, mixing, or production' },
    { name: 'Black Marble', role: 'Recording, mixing, or production' },
    { name: 'Christeene', role: 'Recording, mixing, or production' },
    { name: 'Brian McOmber', role: 'Score engineering and mixing' },
    { name: 'Jóhann Jóhannsson', role: 'Score engineering and mixing (Mandy)' },
    { name: 'Nala Sinephro', role: 'Score engineering and mixing (The Smashing Machine)' },
    { name: 'OHYUNG', role: 'Score mixing (Problemista)' },
    { name: 'Ella van der Woude', role: 'Score engineering and mixing' },
    { name: 'JD Samson', role: 'Score mixing (32 Sounds)' },
  ],
  arjan: [{ name: 'Black Mountain', role: 'Bassist' }],
}

/**
 * Different names for the same person or act. The first spelling is used
 * as the label; the roster's spellings (left) fold into it.
 */
export const ALIASES: Record<string, string> = {
  'Brian McComber': 'Brian McOmber',
  'Oneohtrix Point Never': 'Daniel Lopatin',
  'Guillermo Del Toro': 'Guillermo del Toro',
  'Warner Brothers': 'Warner Bros.',
}

export const DISPLAY_NOTES: Record<string, string> = {
  'Daniel Lopatin': 'Records as Oneohtrix Point Never.',
  OHYUNG: 'Credited on Problemista as Robert Ouyang Rusli.',
  'Jim Jarmusch': 'Plays in SQÜRL.',
}

/** Extra sourced links between non-members. */
export const EXTRA_LINKS: { a: string; b: string; role: string }[] = [
  { a: 'Jim Jarmusch', b: 'SQÜRL', role: 'Band member' },
  { a: 'Emma Stone', b: 'Fruit Tree', role: 'Co-founder' },
]
