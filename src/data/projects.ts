/**
 * The portfolio inventory.
 *
 * Every entry was read from the live GitHub API on 30 October 2026
 * (`gh api repos/gitdamnit/<name>`), not from memory. A project is listed as
 * Released only when it has a tagged GitHub release; the version below is that
 * tag. In-development entries have no tag, and none of them is described as
 * shipped.
 *
 * `repo` is omitted when the repository is private, because a link to a private
 * repository returns 404 for every visitor. `visibility` records why.
 *
 * ProDoc Guard and ProDoc Memory are separate projects: one is a released CLI
 * and Agent Skill, the other an in-development consumer-first skill.
 */

export type ReleaseState = 'released' | 'in-development';

export interface ProjectEntry {
  id: string;
  title: string;
  summary: string;
  stack: string[];
  repo?: string;
  releaseUrl?: string;
  version?: string;
  year: string;
  visibility: 'public' | 'private' | 'public-mirror';
  /** ISO date of the last push observed via the GitHub API. */
  lastPushed: string;
  note?: string;
}

export const completedProjects: ProjectEntry[] = [
  {
    id: 'bludit-wizard',
    title: 'Bludit Wizard',
    summary:
      'AI-assisted writing, editing, SEO analysis, and content management for Bludit CMS — twelve guided tasks, each with a human-reviewed change before anything publishes.',
    stack: ['PHP 8', 'Bludit 3.22', 'JavaScript'],
    repo: 'https://github.com/gitdamnit/bludit-wizard',
    releaseUrl: 'https://github.com/gitdamnit/bludit-wizard/releases/tag/v1.1.0',
    version: 'v1.1.0',
    year: '2026',
    visibility: 'public',
    lastPushed: '2026-10-18',
  },
  {
    id: 'bludit-wizard-mcp',
    title: 'Bludit Wizard MCP',
    summary:
      'A local-first Model Context Protocol server for Bludit CMS: 19 tools for site discovery, content retrieval, search, and human-controlled page editing.',
    stack: ['TypeScript', 'Model Context Protocol', 'Node.js'],
    repo: 'https://github.com/gitdamnit/bludit-wizard-mcp',
    releaseUrl: 'https://github.com/gitdamnit/bludit-wizard-mcp/releases/tag/v1.0.0',
    version: 'v1.0.0',
    year: '2026',
    visibility: 'public',
    lastPushed: '2026-10-24',
  },
  {
    id: 'prodoc-guard',
    title: 'ProDoc Guard',
    summary:
      'Project memory that lives in Git, not in an AI’s head: a vendor-neutral Agent Skill and offline CLI that keeps requirements, decisions, and status present and honest across sessions.',
    stack: ['Python 3', 'Agent Skills', 'Git'],
    repo: 'https://github.com/gitdamnit/prodoc-guard',
    releaseUrl: 'https://github.com/gitdamnit/prodoc-guard/releases/tag/v0.1.0',
    version: 'v0.1.0',
    year: '2026',
    visibility: 'public',
    lastPushed: '2026-10-16',
  },
  {
    id: 'checkpoint-orchestrator',
    title: 'Checkpoint Orchestrator',
    summary:
      'Failure-resilient checkpointing for OpenCode: persistent task state, atomic writes, and resumable workflows so a bad turn does not erase the work.',
    stack: ['TypeScript', 'SQLite', 'OpenCode V2'],
    repo: 'https://github.com/gitdamnit/opencode-checkpoint-plugin',
    releaseUrl:
      'https://github.com/gitdamnit/opencode-checkpoint-plugin/releases/tag/v2.0.0',
    version: 'v2.0.0',
    year: '2026',
    visibility: 'public',
    lastPushed: '2026-10-30',
  },
  {
    id: 'git-that-shit',
    title: 'Git That Shit',
    summary:
      'Automatic pre-disaster snapshots for OpenCode agent configuration and state, so a risky operation can be undone without hand-reconstructing it.',
    stack: ['TypeScript', 'Git', 'OpenCode'],
    repo: 'https://github.com/gitdamnit/opencode-git-that-shit',
    releaseUrl: 'https://github.com/gitdamnit/opencode-git-that-shit/releases/tag/v0.3.0',
    version: 'v0.3.0',
    year: '2026',
    visibility: 'public',
    lastPushed: '2026-10-30',
  },
  {
    id: 'stranger-danger',
    title: 'Stranger Danger',
    summary:
      'A secret and PII redaction guard for AI coding agents: scans prompts, tool output, and model requests before sensitive data leaves the machine.',
    stack: ['TypeScript', 'OpenCode'],
    repo: 'https://github.com/gitdamnit/opencode-stranger-danger',
    releaseUrl: 'https://github.com/gitdamnit/opencode-stranger-danger/releases/tag/v0.2.0',
    version: 'v0.2.0',
    year: '2026',
    visibility: 'public',
    lastPushed: '2026-10-30',
  },
  {
    id: 'plugin-lab',
    title: 'Plugin Lab',
    summary:
      'A disposable, isolated Docker test lab for OpenCode V2 plugins: point it at a plugin and it builds, loads, and exercises it in the real runtime.',
    stack: ['JavaScript', 'Docker', 'OpenCode V2'],
    repo: 'https://github.com/gitdamnit/opencode-plugin-lab',
    releaseUrl: 'https://github.com/gitdamnit/opencode-plugin-lab/releases/tag/v1.0.0',
    version: 'v1.0.0',
    year: '2026',
    visibility: 'public',
    lastPushed: '2026-10-23',
  },
];

export const inDevelopmentProjects: ProjectEntry[] = [
  {
    id: 'prodoc-memory',
    title: 'ProDoc Memory',
    summary:
      'A consumer-first project memory Agent Skill. Separate from ProDoc Guard: Guard is the released CLI and document contract, Memory is the in-development skill built for people who never read a decision log.',
    stack: ['Python', 'Agent Skills', 'Markdown'],
    year: '2026',
    visibility: 'private',
    lastPushed: '2026-10-27',
    note: 'No public release yet.',
  },
  {
    id: 'travis',
    title: 'TRAVIS',
    summary:
      'An AI-assisted training management system for personal trainers: client intake, program generation, progress tracking, and session logging in one client history.',
    stack: ['TypeScript', 'AI assistance'],
    year: '2026',
    visibility: 'private',
    lastPushed: '2026-10-23',
    note: 'Private repository. No public release yet.',
  },
  {
    id: 'myrealgbff',
    title: 'My(real)GBFF',
    summary:
      'An offline-first persona evaluation harness: a Phase 0 personality lab that scores candidate personas on constraint-aware behaviour rather than vibes.',
    stack: ['TypeScript'],
    year: '2026',
    visibility: 'private',
    lastPushed: '2026-10-30',
    note: 'Phase 0. Private repository.',
  },
  {
    id: 'hr-care-agent',
    title: 'HR CARE',
    summary:
      'HR Compliance and Rights Engine: a channel-agnostic HR assistant that answers role-aware questions with citations grounded in company policy documents and employment law.',
    stack: ['TypeScript', 'Retrieval', 'AI assistance'],
    repo: 'https://github.com/gitdamnit/hr-care-agent---public',
    year: '2026',
    visibility: 'public-mirror',
    lastPushed: '2026-03-22',
    note: 'Public mirror; primary repository is private. No release yet.',
  },
  {
    id: 'modelfile-forge',
    title: 'Modelfile Forge',
    summary:
      'Tooling for authoring and managing Ollama Modelfiles, so local model configuration is generated and kept reviewable instead of retyped per machine.',
    stack: ['TypeScript', 'Ollama'],
    year: '2026',
    visibility: 'private',
    lastPushed: '2026-05-14',
    note: 'Private repository. No public release yet.',
  },
  {
    id: 'universal-cast',
    title: 'Universal Cast',
    summary:
      'A modular, self-hostable media casting application. Phase 1 implements browser-based playback only; Google Cast support is planned and not yet implemented or tested.',
    stack: ['TypeScript', 'Media', 'Self-hosted'],
    year: '2026',
    visibility: 'private',
    lastPushed: '2026-10-29',
    note: 'Phase 1. Private repository. Cast support not built.',
  },
  {
    id: 'brainstorm',
    title: 'Brainstorm',
    summary:
      'A portable, platform-independent Agent Skill for structured brainstorming that produces genuinely different, constraint-aware options and converges on an actionable decision.',
    stack: ['Python', 'Agent Skills'],
    year: '2026',
    visibility: 'private',
    lastPushed: '2026-10-29',
    note: 'Private repository. No public release yet.',
  },
  {
    id: 'gpl-scraper',
    title: 'GPL Scraper',
    summary:
      'Browser-automation scraper that downloads GPL archives from gpldl.com behind login, with a modular site-adapter design, concurrency, and rate limiting.',
    stack: ['Python', 'Playwright'],
    year: '2026',
    visibility: 'private',
    lastPushed: '2026-04-17',
    note: 'Private repository. No public release yet.',
  },
  {
    id: 'bible-stories-kids-edition',
    title: 'Bible Stories — Kids Edition',
    summary:
      'A pnpm-workspace monorepo for a children’s Bible-stories app, including Docker deployment configuration.',
    stack: ['TypeScript', 'pnpm', 'Docker'],
    year: '2026',
    visibility: 'private',
    lastPushed: '2026-05-07',
    note: 'Private repository. No public release yet.',
  },
];

export const projectCounts = {
  completed: completedProjects.length,
  inDevelopment: inDevelopmentProjects.length,
} as const;
