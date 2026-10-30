import { getImage } from 'astro:assets';

/**
 * The rotating hero photographs: Evan as film characters, each with the line
 * that belongs to it.
 *
 * Every PNG in `src/assets/moviestar/` is picked up automatically. The leading
 * `01_`, `A_02_01_` or `D_08_` numbering is stripped and the rest is matched
 * against `CHARACTERS`, so adding a picture means dropping the file in and
 * adding a record here.
 *
 * Only `status: 'approved'` captions are published. Rejected and pending
 * records are kept deliberately — they are the review trail, and deleting them
 * would lose the fact that they were considered (see D-0015).
 */
export type CaptionStatus = 'approved' | 'rejected' | 'pending';

export type Character = {
  id: string;
  character: string;
  source: string;
  status: CaptionStatus;
  captions: string[];
};

export type Photo = {
  src: string;
  width: number;
  height: number;
  character: Character | null;
};

export const CHARACTERS: Record<string, Character> = {
  'silence of the lambs': {
    id: 'hannibal-lecter',
    character: 'Hannibal Lecter',
    source: 'The Silence of the Lambs',
    status: 'approved',
    captions: ['I mean, Hello, Clarice?'],
  },
  'pretty woman': {
    id: 'vivian-ward',
    character: 'Vivian Ward',
    source: 'Pretty Woman',
    status: 'approved',
    captions: [
      'Big mistake. Big. Huge.',
      'Never underestimate a woman who knows what she wants.',
    ],
  },
  'basic instinct': {
    id: 'catherine-tramell',
    character: 'Catherine Tramell',
    source: 'Basic Instinct',
    status: 'rejected',
    captions: [],
  },
  'the exorcist': {
    id: 'regan-pazuzu',
    character: 'Regan / Pazuzu',
    source: 'The Exorcist',
    status: 'rejected',
    captions: [],
  },
  'devil wears prada': {
    id: 'miranda-priestly',
    character: 'Miranda Priestly',
    source: 'The Devil Wears Prada',
    status: 'rejected',
    // Retained as a candidate; not published.
    captions: ['Florals? For spring? Groundbreaking!'],
  },
  'pulp fiction': {
    id: 'mia-wallace',
    character: 'Mia Wallace',
    source: 'Pulp Fiction',
    status: 'approved',
    captions: [
      'Uncomfortable silences are underrated.',
      "I'll have the five-dollar milkshake.",
    ],
  },
  'mrs doubtfire': {
    id: 'mrs-doubtfire',
    character: 'Mrs. Doubtfire',
    source: 'Mrs. Doubtfire',
    status: 'approved',
    captions: ['I mean, Helloooo dear!', 'Just a perfectly ordinary British nanny.'],
  },
  'home alone': {
    id: 'kevin-mccallister',
    character: 'Kevin McCallister',
    source: 'Home Alone',
    status: 'pending',
    captions: ['This is my site. I have to defend it.'],
  },
  jaws: {
    id: 'martin-brody',
    character: 'Martin Brody',
    source: 'Jaws',
    status: 'approved',
    captions: ["I'm definitely not going back in that water."],
  },
  'dirty dancing': {
    id: 'baby-houseman',
    character: 'Baby Houseman',
    source: 'Dirty Dancing',
    status: 'approved',
    captions: ['I carried a watermelon.'],
  },
  'lord of the rings gollum': {
    id: 'gollum',
    character: 'Gollum',
    source: 'The Lord of the Rings',
    status: 'approved',
    captions: ['My precious!'],
  },
  'the terminator': {
    id: 't-800',
    character: 'T-800',
    source: 'The Terminator',
    status: 'approved',
    captions: ['Come with me if you want to live.'],
  },
  'hunger games effie': {
    id: 'effie-trinket',
    character: 'Effie Trinket',
    source: 'The Hunger Games',
    status: 'approved',
    captions: ['May the odds be ever in your favor.'],
  },
  'return of the jedi': {
    id: 'princess-leia',
    character: 'Princess Leia',
    source: 'Return of the Jedi',
    status: 'approved',
    captions: ['Help me, Obi-Wan'],
  },
  'wolf of wall street': {
    id: 'jordan-belfort',
    character: 'Jordan Belfort',
    source: 'The Wolf of Wall Street',
    status: 'approved',
    captions: ['Sell me this pen.', 'Confidence is my most expensive asset.'],
  },
  'harry potter voldemort': {
    id: 'lord-voldemort',
    character: 'Lord Voldemort',
    source: 'Harry Potter',
    status: 'approved',
    captions: ['Avada Kedavra!'],
  },
  'rocky horror': {
    id: 'frank-n-furter',
    character: 'Dr. Frank-N-Furter',
    source: 'The Rocky Horror Picture Show',
    status: 'approved',
    captions: [
      "Don't dream it, be it.",
      'I see you shiver with anticipation.',
      'Meet my latest creation.',
    ],
  },
  'princess bride': {
    id: 'inigo-montoya',
    character: 'Inigo Montoya',
    source: 'The Princess Bride',
    status: 'approved',
    captions: [
      'You killed my father. Prepare to die.',
      "I've been practicing this introduction for years.",
    ],
  },
  'mean girls': {
    id: 'regina-george',
    character: 'Regina George',
    source: 'Mean Girls',
    status: 'approved',
    captions: ['Stop trying to make fetch happen.', 'On Wednesdays, we wear pink.'],
  },
  alien: {
    id: 'kane-chestburster',
    character: 'Kane / Chestburster',
    source: 'Alien',
    status: 'rejected',
    captions: [],
  },
  'breaking bad': {
    id: 'walter-white',
    character: 'Walter White / Heisenberg',
    source: 'Breaking Bad',
    status: 'rejected',
    captions: [],
  },
  'the shining': {
    id: 'jack-torrance',
    character: 'Jack Torrance',
    source: 'The Shining',
    status: 'approved',
    captions: ["Here's Evan! I mean – Johnny!"],
  },
  titanic: {
    id: 'jack-dawson',
    character: 'Jack Dawson',
    source: 'Titanic',
    status: 'approved',
    captions: ["I'm the king of the world!"],
  },
  'jurassic park': {
    id: 'jurassic-park-visitor',
    character: 'Jurassic Park visitor',
    source: 'Jurassic Park',
    status: 'pending',
    captions: ['Life finds a way.', 'You clever girl.'],
  },
  'the matrix': {
    id: 'neo',
    character: 'Neo',
    source: 'The Matrix',
    status: 'approved',
    captions: ["I don't really know kung fu.", 'What happens if I took them both?'],
  },
  'wizard of oz': {
    id: 'glinda',
    character: 'Glinda',
    source: 'The Wizard of Oz',
    status: 'approved',
    captions: ['Are you a good witch or a bad witch?'],
  },
  'lord of the rings': {
    id: 'gandalf',
    character: 'Gandalf',
    source: 'The Lord of the Rings',
    status: 'rejected',
    captions: [],
  },
  'indiana jones': {
    id: 'indiana-jones',
    character: 'Indiana Jones',
    source: 'Indiana Jones',
    status: 'rejected',
    captions: [],
  },
  beetlejuice: {
    id: 'betelgeuse',
    character: 'Betelgeuse',
    source: 'Beetlejuice',
    status: 'approved',
    captions: ["It's showtime!", 'Bio-exorcist. Reasonable rates.'],
  },
  ghostbusters: {
    id: 'peter-venkman',
    character: 'Ghostbuster / Peter Venkman',
    source: 'Ghostbusters',
    status: 'approved',
    captions: ['Who you gonna call?'],
  },
  'fifth element': {
    id: 'ruby-rhod',
    character: 'Ruby Rhod',
    source: 'The Fifth Element',
    status: 'approved',
    captions: ['Bzzzz!'],
  },
  'austin powers': {
    id: 'dr-evil',
    character: 'Dr. Evil',
    source: 'Austin Powers',
    status: 'rejected',
    captions: [],
  },
  'alien party': {
    id: 'alien-party',
    character: 'Alien Party',
    source: 'Original scene',
    status: 'approved',
    captions: ['Close encounters of the fabulous kind.'],
  },
  'satirical beer': {
    id: 'satirical-beer',
    character: 'Satirical Beer Spokesman',
    source: 'Original scene',
    status: 'approved',
    captions: ['A questionable spokesperson for questionable decisions.'],
  },
  superhero: {
    id: 'original-superhero',
    character: 'Original Superhero',
    source: 'Original scene',
    status: 'approved',
    captions: ['Superhero me?'],
  },
  'underwater dj': {
    id: 'underwater-dj',
    character: 'Underwater DJ',
    source: 'Original scene',
    status: 'rejected',
    captions: [],
  },
  'rubber duck vacation': {
    id: 'rubber-duck-vacation',
    character: 'Rubber Duck Vacation',
    source: 'Original scene',
    status: 'approved',
    captions: ['What the duck?'],
  },
  'fantasy adventure': {
    id: 'fantasy-adventurer',
    character: 'Fantasy Adventurer',
    source: 'Original scene',
    status: 'approved',
    captions: ["Saving the kingdom wasn't on today's agenda."],
  },
  pope: {
    id: 'the-pope',
    character: 'The Pope',
    source: 'Original scene',
    status: 'rejected',
    captions: [],
  },
  'wicked witch': {
    id: 'wicked-witch',
    character: 'Wicked Witch of the West',
    source: 'The Wizard of Oz',
    status: 'approved',
    captions: [
      "I'll get you, my pretty!",
      'Are flying monkeys your management strategy too?',
    ],
  },
  'sea witch': {
    id: 'ursula',
    character: 'Ursula / Sea Witch',
    source: 'The Little Mermaid',
    status: 'approved',
    captions: ['You poor unfortunate souls!', 'Hope you read the fine print!'],
  },
  'country singer': {
    id: 'country-singer',
    character: 'Country Singer',
    source: 'Original scene',
    status: 'approved',
    captions: ['Jolene!'],
  },
  'sci fi battle': {
    id: 'sci-fi-soldier',
    character: 'Sci-Fi Battle Soldier',
    source: 'Original scene',
    status: 'rejected',
    captions: [],
  },
  'iron man': {
    id: 'tony-stark',
    character: 'Tony Stark / Iron Man',
    source: 'Iron Man',
    status: 'rejected',
    captions: [],
  },
};

/** `A_02_01_The_Matrix.png` -> `the matrix`; `01_Jaws.png` -> `jaws`. */
const keyOf = (path: string): string =>
  path
    .split('/')
    .pop()!
    .replace(/\.png$/i, '')
    .replace(/^[A-Z]_\d+_\d+_/i, '')
    .replace(/^[A-Z]_\d+_/i, '')
    .replace(/^\d+_/, '')
    .replace(/_/g, ' ')
    .toLowerCase();

export const characterFor = (path: string): Character | null =>
  CHARACTERS[keyOf(path)] ?? null;

const modules = import.meta.glob<ImageMetadata>('../assets/moviestar/*.png', {
  eager: true,
  import: 'default',
});

/**
 * Optimises every photograph at build time and returns them in filename order.
 * Sources are roughly 330 px wide, so they are emitted at their intrinsic width
 * rather than upscaled into a blur.
 */
export const loadPhotos = async (): Promise<Photo[]> => {
  const entries = Object.entries(modules).sort(([a], [b]) => a.localeCompare(b));

  return Promise.all(
    entries.map(async ([path, image]) => {
      const optimized = await getImage({
        src: image,
        width: image.width,
        format: 'webp',
        quality: 88,
      });

      return {
        src: optimized.src,
        width: image.width,
        height: image.height,
        character: characterFor(path),
      };
    }),
  );
};
