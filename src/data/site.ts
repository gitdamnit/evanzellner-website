export const identity = {
  name: 'Evan Zellner',
  shortName: 'Evan Zellner.',
  location: 'Wichita Falls, Texas',
  email: 'evanzellner@outlook.com',
  linkedin: 'https://www.linkedin.com/in/evanzellner',
  linkedinLabel: 'LinkedIn',
  github: 'https://github.com/gitdamnit',
  githubLabel: 'Github',
} as const;

export const navItems = [
  { key: 'home', label: 'Home', href: '/' },
  { key: 'projects', label: 'Projects', href: '/projects/' },
  { key: 'resume', label: 'Résumé', href: '/resume/' },
  { key: 'about', label: 'About', href: '/about/' },
  { key: 'contact', label: 'Contact', href: '/contact/' },
] as const;

export type NavKey = (typeof navItems)[number]['key'];

/** Homepage copy, fixed by the approved design. */
export const home = {
  hero: {
    nameLines: ['Evan', 'Zellner.'],
    caption: 'A little about me.',
    href: '/about/',
    ariaLabel: 'A little about me — go to the About page',
  },
  about: {
    index: '01',
    section: 'The person',
    pill: 'About',
    title: 'Curiosity is the starting point.',
    paragraphs: [
      'I like figuring things out. Sometimes that means building a tool. Sometimes it means challenging an assumption. Sometimes it means finding out why a perfectly good lemon just split in half.',
      'People, technology, writing, plants. I tend to follow the interesting part.',
    ],
    link: { label: 'More about me', href: '/about/' },
  },
  resume: {
    index: '02',
    section: 'Resume',
    pill: 'Resume',
    title: 'People. Process. Results.',
    paragraphs: [
      'My background spans talent acquisition, human resources, training, and operations. Useful experience. One part of a much bigger picture.',
    ],
    tags: ['HR — HR Management', 'PHR', 'SHRM-CP'],
    link: { label: 'View my résumé', href: '/resume/' },
  },
  projects: {
    index: '03',
    section: 'Projects',
    pill: 'Projects',
    titleLead: 'Less “what if.”',
    titleTurn: 'More “let’s build it.”',
    paragraphs: [
      'Tools for AI workflows. Plugins that solve actual problems. Experiments that turn into something useful.',
    ],
    links: [
      { label: 'Explore the projects', href: '/projects/' },
      { label: 'Current development', href: '/projects/#current-development' },
    ],
    footer: 'Small tools. Real problems.',
    link: { label: 'All projects', href: '/projects/' },
  },
} as const;

export const featuredProjects = [
  {
    index: '01',
    title: 'Bludit Wizard',
    href: 'https://github.com/gitdamnit/bludit-wizard',
  },
  {
    index: '02',
    title: 'ProDoc Guard',
    href: 'https://github.com/gitdamnit/prodoc-guard',
  },
  {
    index: '03',
    title: 'Checkpoint Orchestrator',
    href: 'https://github.com/gitdamnit/opencode-checkpoint-plugin',
  },
] as const;
