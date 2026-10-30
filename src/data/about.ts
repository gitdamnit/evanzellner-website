/**
 * About-page copy. Every claim here traces to the October 2026 résumé
 * (`src/data/resume.ts`) or to a project case study in `src/content/projects/`.
 * Unwritten personal stories live in the local, Git-excluded `editorial/`
 * directory until there is a first-person account to publish.
 */

export const aboutPage = {
  eyebrow: 'About',
  title: 'The long way around.',
  lede: 'I am a recruiter who started building software because the tools I used every day kept losing information. The homepage is the short version; this is the rest of it.',
  sections: [
    {
      id: 'before-code',
      index: '01',
      eyebrow: 'Before code',
      title: 'Retail management, then six years of hiring engineers.',
      paragraphs: [
        'My first career was retail management. The useful part of that job was never the sales floor; it was noticing which part of a normal week quietly consumed somebody’s time and fixing it before anyone had to complain.',
        'Technical recruiting applied the same instinct to hiring. Over six years I worked full-cycle roles across .NET and Java teams, cloud and infrastructure, data, and IT support — agency work and enterprise hiring, in the United States, with the paperwork and the awkward conversations that come with an offer.',
        'The numbers I can still defend: $2.6M in annual recruiting revenue with $696K gross profit in FY2022 at Experis, and more than 500 field technicians hired and onboarded in fourteen months. Alongside the work, an MS in Human Resource Management and the PHR and SHRM-CP credentials.',
      ],
    },
    {
      id: 'systems',
      index: '02',
      eyebrow: 'What recruiting taught me',
      title: 'Most failures are ordinary, and most of them are documentation failures.',
      paragraphs: [
        'Recruiting is a system with a long tail. A requisition nobody owns, an onboarding step nobody wrote down, a tool that looks fine in a demo and collapses under real volume — none of those are dramatic, and all of them cost money, time, and trust.',
        'The largest of those projects was leading an ATS evaluation and migration from Google Hire to Comeet. Migrations are mostly an argument about what counts as data and who is allowed to define a field. That work is where I learned to write things down before changing them.',
        'I also spent a lot of time fixing the process around the job rather than just filling it: scheduling, timekeeping, payroll auditing, training, and written procedure. Boring work, in the way that foundations are boring.',
      ],
    },
    {
      id: 'tools',
      index: '03',
      eyebrow: 'Why the tools exist',
      title: 'Every project started as a specific annoyance.',
      paragraphs: [
        'Bludit Wizard exists because editing a CMS through an API should be reviewable, not heroic. ProDoc Guard exists because a project’s documentation should not be allowed to claim work that was never verified. Checkpoint Orchestrator exists because an agent that overwrites an hour of work should be recoverable. git-that-shit exists because a clean history and a working history are different problems.',
        'The pattern repeats: give an automated system bounded access, make the risky step reversible, and write down what actually happened. That is the same lesson as the recruiting years, applied to a different kind of process.',
      ],
    },
    {
      id: 'curiosity',
      index: '04',
      eyebrow: 'Curiosity',
      title: 'The subjects that keep coming back.',
      paragraphs: [
        'How people lose trust in a system, and what it takes to earn it back. Why a process that looks efficient on paper produces quiet workarounds in practice. What documentation is for, once everyone has an AI assistant that can generate more of it.',
        'Horticulture is the other half of the same interest. A tree is a long-running system with delayed feedback: you make a decision in February and find out in July. Citrus in North Texas is that system at its most argumentative.',
      ],
    },
  ],
} as const;

import { href } from '../lib/paths';

export const doors = [
  {
    label: 'Projects',
    href: href('/projects/'),
    description: 'Case studies, including the parts that did not work.',
  },
  {
    label: 'Résumé',
    href: href('/resume/'),
    description: 'The background, the numbers, and the document.',
  },
  {
    label: 'Contact',
    href: href('/contact/'),
    description: 'Email, LinkedIn, and GitHub.',
  },
] as const;
