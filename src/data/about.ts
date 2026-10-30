/**
 * About-page copy, supplied verbatim by the owner (D-0016).
 *
 * This page is first-person and opinionated by design. Do not "correct" the
 * wording, soften the humour, or re-derive sentences from the résumé.
 */

export const aboutPage = {
  eyebrow: 'About',
  title: "I'm a lot of things. Consistent isn't necessarily one of them.",
  intro: [
    "I'm Evan.",
    'I have an inconvenient number of interests, an unreasonable number of questions, and a tendency to pursue both considerably further than necessary.',
    'I like technology, plants, psychology, writing, design, science, and the occasional spectacularly stupid idea. Particularly the stupid ideas that turn out to be brilliant.',
    "I don't have a singular passion. I have about seventeen competing for attention, and whichever one is loudest usually wins.",
  ],
  sections: [
    {
      id: 'personality',
      index: '01',
      eyebrow: 'The personality',
      title: 'Curious. Opinionated. Occasionally insufferable.',
      paragraphs: [
        "I question nearly everything, including things that probably didn't need questioning.",
        "I'm skeptical of conventional wisdom, deeply suspicious of unnecessary rules, and fascinated by the peculiar things people convince themselves are perfectly normal.",
        'I enjoy intelligent conversation, uncomfortable questions, dark humor, and people who can defend an opinion without confusing confidence with evidence.',
        "I'm not particularly interested in being agreeable for the sake of it. I'd rather have an interesting disagreement than a boring consensus.",
      ],
    },
    {
      id: 'interests',
      index: '02',
      eyebrow: 'The interests',
      title: 'A little bit of everything. Usually all at once.',
      paragraphs: [
        'I might spend an afternoon learning about artificial intelligence, an evening troubleshooting something on Linux, and the following morning investigating why a citrus tree is behaving like an asshole.',
        'Sometimes I build software. Sometimes I write. Sometimes I research obscure subjects for absolutely no practical reason.',
        "I like making things, understanding things, and occasionally taking things apart just to see what's inside.",
        'The subject matters less than whether it makes me curious.',
      ],
    },
    {
      id: 'projects',
      index: '03',
      eyebrow: 'The projects',
      title: 'It seemed like a good idea at the time.',
      paragraphs: [
        'Most of my projects begin with a question, a frustration, or an idea that refuses to leave me alone.',
        'Some become useful tools. Some become elaborate experiments. Others teach me exactly why nobody else bothered trying.',
        'I build things because I enjoy the process of figuring them out. Finishing is satisfying, but discovering something unexpected along the way is usually the better part.',
        'And yes, occasionally a supposedly simple idea becomes an entire fucking software project.',
      ],
    },
    {
      id: 'philosophy',
      index: '04',
      eyebrow: 'The philosophy',
      title: 'Think for yourself. Then question that, too.',
      paragraphs: [
        "I don't believe anyone has a monopoly on truth, wisdom, morality, or good ideas.",
        'I value evidence over authority, curiosity over certainty, and authenticity over the exhausting performance of trying to be acceptable to everyone.',
        "People are complicated. Life is absurd. Most things are considerably less black-and-white than we'd like to believe.",
        'I try to stay open to changing my mind while remaining stubbornly unwilling to stop using it.',
        "And if there's one thing I've learned, it's that there's almost always more to the story.",
      ],
    },
  ],
} as const;
