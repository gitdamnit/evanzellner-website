# Source material — copy collected from the earlier builds

**What this is:** every piece of written copy that already exists for this website,
gathered from the pre-launch builds into one file, verbatim. Nothing has to be
hunted down again.

**What this is not:** published content. Nothing here is live, and none of it should
be pasted into the site without being read and approved first. Some of it is
internal planning rather than copy.

**Collected:** 30 October 2026

## Where it came from

| Source | What it holds |
| --- | --- |
| `evanzellner-site/src/content/projects/*.md` | 9 project case studies: front matter plus long-form body |
| `evanzellner-site/src/data/grow.ts` | The Grow (horticulture) page copy and section descriptions |
| `evanzellner-site/editorial/about-stories.md` | Four unstarted About stories — planning notes, not copy |
| `evan-zellner/preview/projects/*/index.html` | 11 project pages from the old Bludit site |

## Contents

1. Project case studies — 9
2. Grow / horticulture
3. Unstarted About stories — internal planning
4. Old site project pages — 11

---

# 1. Project case studies

From `evanzellner-site/src/content/projects/`. Each entry keeps its front matter
(status, release, stack, links) followed by the body exactly as written.

## ADHD Penguin

*File: `adhd-penguin.md`*

```yaml
title: ADHD Penguin
tagline: An idea for task support built around executive function, still waiting for a verified implementation.
summary: A concept and a logo. No source repository, release, or working deployment was found, so this page records only what can be verified.
order: 10
featured: false
status: concept
statusNote: Concept · no implementation verified
categories: [experiments]
year: "2026"
role: Concept
monogram: AP
stack: [Concept only]
license: Not established
distribution: No public repository, package, or working deployment verified.
lastVerified: "2026-10-18"

problem:
  - >-
    Most task tools assume the hard part is deciding what to do. For people with ADHD, the
    hard part is often starting, sequencing, and recovering after an interruption. A list of
    tasks can become another source of guilt rather than a way through.
  - >-
    The concept was a task and planning assistant that breaks work down to a next physical
    action, keeps the current step visible, and makes re-entry easy after a gap.

approach:
  - >-
    There is no verified approach to describe. No implementation was located during this
    review, and the public domain currently serves an unconfigured Bludit installer rather
    than an application.
  - >-
    Rather than publish a speculative feature list, this entry records the concept and the
    missing evidence. A future implementation can replace it with a real case study.

features:
  - No verified feature set. Nothing is presented as working.

challenges:
  - title: The source could not be located
    detail: >-
      No public repository, local project checkout, release artifact, or deployment was found
      under the evidence reviewed on 18 Oct 2026. The only local artefact is a logo image.
  - title: The domain is not an application
    detail: >-
      adhdpenguin.com responds with a Bludit installer page. That is not evidence of a
      working product, and it is not described as one.

lessons:
  - An idea is not a shipped project, and a portfolio should be able to tell the difference.
  - Naming a project is the cheapest part. Without source or deployment, there is no case study to write.
  - Recording a verification gap is more useful than inventing plausible features.

statusDetail:
  - >-
    Concept only. No source repository, release, package, or working deployment was verified.
    The name, a logo asset, and the domain are the only evidence reviewed.
  - >-
    This entry will remain a concept until an implementation can be inspected. It is included
    to keep the inventory honest rather than to fill a grid.

verified:
  - A local logo asset named adhdpenguin-logo.png exists in the project archive
  - adhdpenguin.com served a Bludit installer on 18 Oct 2026
  - No GitHub repository named ADHDPenguin was found for the account on 18 Oct 2026

gaps:
  - Source code, feature set, and architecture are unverified.
  - No release, package, or deployment exists that can be linked.
  - No problem statement beyond the concept has been documented.

links: []

related: []
```

ADHD Penguin is a concept, not a case study. The name and a logo exist; the source, feature set, and deployment do not, at least not anywhere I could verify.

I am keeping it in the inventory because deleting an unfinished idea is not the same as pretending it never happened. It is labelled Concept for a reason.

---

## Bludit MCP Server

*File: `bludit-mcp-server.md`*

```yaml
title: Bludit MCP Server
tagline: A local MCP bridge that gives AI clients bounded, reviewable access to a Bludit site.
summary: Nineteen tools for reading, drafting, and updating Bludit content over MCP, with revision-pinned proposals and no page deletion. Separate from the native plugin.
order: 6
featured: false
status: active-development
statusNote: Pre-release · stdio edition, not published
categories: [ai-tooling, developer-tools]
year: "2026"
role: Design and implementation
monogram: MCP
stack: [TypeScript, Node.js, MCP, Bludit API, Cloudflare Workers]
license: MIT (derived from bludit/bludit-mcp)
distribution: Local checkout and packed tarball only. Not on npm; repository not yet public.
lastVerified: "2026-10-18"

problem:
  - >-
    MCP clients can read files and run commands, but they cannot reach a self-hosted CMS
    unless someone builds a bridge. Handing an assistant a raw Bludit API token and a shell
    command is not a bridge; it is an unbounded credential with no review step.
  - >-
    Bludit's API exposes pages, tags, categories, drafts, and settings. An assistant needs
    enough of that surface to work, and the site owner needs to know that a change was
    proposed, reviewed, and pinned to the revision it was written against.

approach:
  - >-
    The server extracts a portable core — the Bludit client, tool schemas, validation,
    safety rules, SSRF policy, and redaction — and puts transports around it. The local
    stdio edition is the primary distribution because it needs no account, no hosted
    service, and no database. The Cloudflare Workers transport is preserved; a self-hosted
    HTTP transport is designed but not implemented.
  - >-
    Nineteen tools cover site settings, pages, drafts, scheduled content, categories, tags,
    search, summaries, related pages, change previews, and verification. Two write paths
    exist on purpose: direct create/edit with a read-back, and a proposal that records a
    revision-pinned change and refuses to apply if the page moved underneath it.
  - >-
    Page deletion is not in the tool set. The server performs no inference and stores no
    page content; it is a transport and policy layer, not another model.

features:
  - Nineteen MCP tools with read and write scopes, from one shared registry
  - Local stdio transport that keeps credentials on the owner's machine
  - Revision-pinned proposals that refuse stale approvals
  - Deliberate absence of page deletion
  - Deterministic search, summaries, related pages, and change previews
  - No inference, no stored content, and no provider key

challenges:
  - title: The mock was wrong about tags
    detail: >-
      Bludit returns tags as a comma-joined string, not an array. The mock used the cleaner
      shape, so search worked in tests and failed on a real site. Live testing against a
      disposable Bludit 3.22 installation found it immediately.
  - title: Three transports, one core
    detail: >-
      The hosted adapter, the local stdio adapter, and the designed self-hosted transport
      need identical tool behaviour without duplicating tool bodies. The ports abstraction
      took longer than a second copy would have, and it is the reason the local edition
      changed no hosted behaviour when it was added.
  - title: Credentials must not reach the protocol stream
    detail: >-
      MCP uses stdout for protocol traffic. Diagnostics go to stderr, tokens are redacted,
      and a site without an auth token becomes explicitly read-only at startup rather than
      failing later in the middle of a write.

lessons:
  - A mock that is cleaner than the real API is a liability. Test against the system you are integrating.
  - Separate the transport from the policy early; otherwise every new client reimplements the safety rules.
  - The absence of a destructive tool is a feature that is easier to verify than a warning.

statusDetail:
  - >-
    The local stdio edition is implemented and tested. The project status records 438
    hermetic tests across 27 files, a 9-test browser suite, and a live acceptance run that
    covered all 19 tools against a disposable Bludit Community 3.22.0 site. One defect was
    found and fixed: a non-JSON 2xx response had been reported as an empty success.
  - >-
    The package is private and unpublished. There is no public repository, no npm package,
    and no hosted deployment. The self-hosted HTTP transport is a design document, not
    code.
  - >-
    No real MCP client product has been connected. The protocol is exercised by a
    specification-following test client, which is not the same claim.

verified:
  - Project status and test reports at commit 993cc02, inspected 18 Oct 2026
  - Live acceptance against real Bludit 3.22.0 in a disposable container
  - Nineteen tools and a no-delete policy documented in the local README
  - Derived from the MIT-licensed bludit/bludit-mcp project

gaps:
  - No public repository or published package has been verified.
  - No third-party MCP client product has been tested against any transport.
  - The self-hosted HTTP transport is designed only.
  - The packaged tarball has been installed in a clean directory, but not distributed.

disclaimer: This is a separate project from the native Bludit Wizard plugin. They share the Bludit API, not a runtime.

links:
  - label: Upstream project (MIT)
    url: https://github.com/bludit/bludit-mcp
    kind: upstream

related: [bludit-wizard, checkpoint-orchestrator]
```

The Bludit MCP Server is the external counterpart to the native plugin. Where Bludit Wizard runs inside the CMS as PHP, this is a Node.js MCP server that lets a compatible AI client read and draft content from outside the site.

It is the project that taught me the most about trust boundaries. The interesting part is not the tool list; it is deciding which actions deserve a proposal, which deserve a direct write with read-back, and which should not exist at all.

---

## Bludit Wizard

*File: `bludit-wizard.md`*

```yaml
title: Bludit Wizard
tagline: AI-assisted writing, editing, and SEO work inside Bludit — with a human approval step before anything changes.
summary: A native Bludit CMS plugin that turns a short instruction into a draft, revision, or audit, then shows the original beside the proposal until the publisher approves it.
order: 1
featured: true
status: released
statusNote: v1.1.0 · October 2026
categories: [ai-tooling, web-platforms]
year: "2026"
role: Design and implementation
monogram: BW
stack: [PHP 8, Bludit 3.22, JavaScript, OpenAI-compatible APIs]
license: GPL-3.0-only
release:
  version: v1.1.0
  date: October 2026
  url: https://github.com/gitdamnit/bludit-wizard/releases/tag/v1.1.0
distribution: GitHub release ZIP. The Bludit plugin-directory pull request is open, not accepted.
lastVerified: "2026-10-18"

problem:
  - >-
    Writing and editing inside a CMS means leaving the page you are working on: open a
    chat window, paste the content, explain the context again, copy the result back, and
    hope you kept the original. The context is lost, the diff is invisible, and it is far
    too easy to overwrite a newer edit.
  - >-
    Most AI publishing tools solve that by taking over the publishing step. That is the
    wrong trade for a site owner who wants assistance, not an autonomous editor. The plugin
    needed to be useful inside the admin area while leaving every decision with the person
    who owns the site.

approach:
  - >-
    Bludit Wizard is a native PHP plugin that runs inside the Bludit admin, not a separate
    service. It talks directly to an OpenAI-compatible endpoint configured by the site
    owner, so no third party holds the site credentials or the content.
  - >-
    Twelve tasks are grouped into Write & Create, Edit & Improve, SEO & Quality, and Ask
    Wizard. Tasks that touch content select a real Bludit page first and receive only that
    page's context. The result is rendered as original and proposed content side by side;
    applying it is a separate, explicit action.
  - >-
    Analysis tasks — SEO and clarity, internal links, content freshness — are read-only.
    Page deletion is not implemented at all. Server-side request handling keeps the provider
    key out of the browser, and a configurable network policy blocks private address ranges
    unless the owner deliberately opts in.

features:
  - Twelve guided tasks across writing, editing, SEO, and question answering
  - Page selection and task-specific instructions for every page-aware task
  - Original and proposed content shown together before an edit is applied
  - Stale-edit protection and a deliberate no-deletion policy
  - Read-only SEO, internal-link, and content-freshness audits
  - Provider presets, searchable model discovery, and a connection test
  - Safe behaviour when JavaScript or a versioned asset fails to load

challenges:
  - title: Making review feel like part of the work
    detail: >-
      A confirmation dialog is easy to ignore. The review step had to show the actual
      difference, keep the original readable, and make the consequence of applying a change
      obvious without turning every task into a form.
  - title: The RC1 dispatch regression
    detail: >-
      The first 1.1.0 release candidate lost a hidden action field. When JavaScript failed
      or a stale asset was cached, the workspace returned an unknown-action error and the
      page selector stayed hidden. RC2 fixed the dispatch path and versioned every asset so
      an old script cannot silently pair with new markup.
  - title: Provider compatibility is a surface, not a checkbox
    detail: >-
      OpenAI-compatible APIs differ in model discovery, tool support, and error shapes.
      OpenRouter and LLM Gateway were verified in live use; other providers remain
      compatibility guesses until someone tests them.
  - title: Network safety inside a CMS
    detail: >-
      A provider URL is user-controlled input. The plugin validates destinations, refuses
      private address ranges by default, and fails closed on DNS truncation rather than
      silently resolving somewhere unexpected.

lessons:
  - Human approval is a product feature, not a disclaimer. It has to be fast and legible, or people will route around it.
  - Version every front-end asset. The failure mode is not the bug — it is an old script running against new markup.
  - Test the installed ZIP, not only the working tree. The package and both Bludit editions are part of the product.
  - '"No page deletion" removed a class of catastrophic mistakes and made the rest of the interface easier to reason about.'

statusDetail:
  - >-
    v1.1.0 is a stable public release on GitHub, licensed GPL-3.0-only, with the installable
    ZIP attached. The release gate covered 441 HTTP, API, security, and task checks, 33
    Playwright tests on Bludit Community and 33 on Bludit Pro, 98 network-policy assertions,
    and an installed-ZIP browser smoke test on both editions.
  - >-
    The plugin was submitted to the official Bludit plugin directory. The pull request is
    open and has not been accepted, so the project is not described as officially listed.
  - >-
    Live acceptance of all twelve tasks, provider discovery, and testing was performed by
    the maintainer on a disposable Hostinger installation. That acceptance is reported, not
    independently re-run by a second party.

verified:
  - Public GitHub repository, tag v1.1.0, release notes, and attached ZIP — checked 18 Oct 2026
  - Test results recorded in the project status and test reports for v1.1.0
  - Screenshots on this page are captures of the real plugin, not mockups
  - License and plugin metadata state GPL-3.0-only

gaps:
  - Bludit plugin-directory acceptance is pending; the listing is not live.
  - Only OpenRouter and LLM Gateway were verified in live provider use.
  - No independent security audit has been performed.

links:
  - label: Repository
    url: https://github.com/gitdamnit/bludit-wizard
    kind: repository
  - label: Release v1.1.0
    url: https://github.com/gitdamnit/bludit-wizard/releases/tag/v1.1.0
    kind: release
  - label: Download ZIP
    url: https://github.com/gitdamnit/bludit-wizard/releases/download/v1.1.0/bludit-wizard-1.1.0.zip
    kind: download

screenshots:
  - src: /screenshots/bludit-wizard/workspace.png
    alt: Bludit Wizard workspace inside the Bludit admin, showing a task selector, page selector, and instruction field.
    caption: The wizard workspace inside Bludit. Tasks that change content require a page and an instruction.
    width: 1280
    height: 780
  - src: /screenshots/bludit-wizard/review.png
    alt: Side-by-side original and proposed content with Apply this change and Discard suggestion buttons.
    caption: Original and proposed content, with apply and discard as separate actions.
    width: 991
    height: 778

related: [bludit-mcp-server, prodoc-guard]
```

Bludit Wizard is a native plugin that lives in the Bludit admin sidebar. It turns a short instruction into a draft, a revision, or an audit, then shows the original and proposed content side by side. Nothing is saved or published until the publisher approves it.

It is deliberately not an autonomous site manager. There is no page deletion, no scheduled publishing, and no background loop. The plugin connects only to the OpenAI-compatible endpoint the site owner configures, and the provider key stays on the server.

The goal was not to add AI to a CMS for its own sake. It was to remove the copy-and-paste loop between a chat window and the page editor without giving up the diff.

---

## Checkpoint Orchestrator

*File: `checkpoint-orchestrator.md`*

```yaml
title: Checkpoint Orchestrator
tagline: Session-scoped task state for OpenCode, stored in SQLite, so a long session can survive a bad turn.
summary: An OpenCode V2 plugin with eight checkpoint tools, SQLite persistence, and session isolation. The v2.0.0 release moved storage from project-level JSON to a per-session database.
order: 3
featured: true
status: released
statusNote: v2.0.0 · October 2026
categories: [developer-tools, ai-tooling]
year: "2026"
role: Design and implementation
monogram: CO
stack: [TypeScript, OpenCode V2, SQLite, Node.js]
license: MIT
release:
  version: v2.0.0
  date: October 2026
  url: https://github.com/gitdamnit/opencode-checkpoint-plugin/releases/tag/v2.0.0
distribution: Public GitHub release. npm still serves 1.0.1; v2.0.0 is installed from the repository.
lastVerified: "2026-10-18"

problem:
  - >-
    OpenCode persists the conversation. It does not persist the task: what you are doing,
    what is done, what is next, and what is blocking. When a session goes sideways or the
    model changes, that working state disappears into a long transcript.
  - >-
    The first version stored checkpoints per project. That made two sessions in the same
    repository overwrite or inherit each other's state, which is exactly the wrong failure
    mode for an agent that is supposed to improve continuity.

approach:
  - >-
    Version 2 stores one checkpoint per session in SQLite, keyed by the session id that
    OpenCode supplies in the tool context. Snapshots, counters, and dedup hashes are scoped
    the same way. A session cannot read, clear, or restore another session's state, and a
    child session does not inherit a parent's checkpoint.
  - >-
    Eight tools cover save, load, status, clear, list, load-snapshot, restore-snapshot, and
    legacy migration. Saves deep-merge, so a partial update never erases stored fields.
    Restoring a snapshot keeps the previous live state as a pre-restore undo snapshot.
  - >-
    The plugin uses node:sqlite, which has no native module to compile and no ABI to match.
    The trade is a Node floor of 22.13 and an experimental warning in plain Node. The
    OpenCode runtime (Bun) does not print it.

features:
  - Eight tools for saving, inspecting, snapshotting, and restoring task state
  - Per-session isolation, including concurrent and child sessions
  - Deep-merged saves and a pre-restore undo snapshot
  - Named snapshots with read-only loading
  - Explicit migration of legacy JSON into a legacy namespace
  - Failure-resilient writes and restart-safe state

challenges:
  - title: A breaking storage migration without losing old work
    detail: >-
      Legacy project-level JSON does not map cleanly onto session-scoped rows. Rather than
      guessing an owner, the migration imports old data into a legacy namespace and requires
      an explicit adoption into a session. It is slower, and it cannot silently attach an old
      checkpoint to the wrong conversation.
  - title: The V1 to V2 plugin API break
    detail: >-
      V2 changed the package, the configuration key, and the hook shape. The release keeps
      the 1.0.1 line installable and documents the migration instead of pretending the old
      plugin will load.
  - title: Session identity has to come from the runtime
    detail: >-
      Taking the session id from the tool context rather than the working directory is what
      makes isolation real. Project identity and directory mapping still have documented edge
      cases, and the tests cover concurrent writers and plugin restarts.

lessons:
  - Continuity is an identity problem before it is a storage problem.
  - A migration should make the unsafe outcome impossible, not merely unlikely.
  - Legacy tests are a behaviour reference, not coverage. The 979 V1 assertions do not test the v2 code.
  - 'Keep the failure modes visible: the SQLite warning is documented, not hidden.'

statusDetail:
  - >-
    v2.0.0 is a public GitHub release under MIT and the current 2.0 line. The release
    records 120 source-level tests against the built output, 145 checks in the Docker plugin
    lab against OpenCode 2.0.21 and Node 22.23.3, and all eight tools registering across six
    plugin load orders with the companion plugins present.
  - >-
    npm still serves 1.0.1. The v2.0.0 package has not been published to the registry, so the
    documented npm install path resolves to the previous major version. The GitHub release is
    the source of the current build.
  - >-
    979 historical V1 conformance assertions are preserved as a behaviour reference. They
    re-implement the old logic and are not coverage of v2.

verified:
  - Public repository, tag v2.0.0, and release notes — checked 18 Oct 2026
  - Release record with test counts and the Docker lab result
  - Session isolation tests for 2, 5, and 25 concurrent sessions
  - npm registry currently reports 1.0.1 as latest

gaps:
  - v2.0.0 is not published to npm; the registry install path is stale.
  - node:sqlite is marked experimental in Node and warns outside Bun.
  - Project identity and directory mapping have documented edge cases.
  - No independent adoption or third-party review is recorded.

links:
  - label: Repository
    url: https://github.com/gitdamnit/opencode-checkpoint-plugin
    kind: repository
  - label: Release v2.0.0
    url: https://github.com/gitdamnit/opencode-checkpoint-plugin/releases/tag/v2.0.0
    kind: release

related: [git-that-shit, prodoc-guard]
```

Checkpoint Orchestrator is my answer to a narrow but expensive problem: losing the working state of a long agent session, not the transcript.

The v2 rewrite is the part worth reading. It moved from project-level JSON to session-scoped SQLite, which sounds like storage plumbing and is actually about making two concurrent sessions unable to damage each other.

---

## Git That Shit

*File: `git-that-shit.md`*

```yaml
title: Git That Shit
tagline: Shadow-Git snapshots before an agent does something it cannot undo.
summary: An OpenCode V2 plugin and standalone gts CLI that snapshot fragile configuration and agent state into an isolated Git repository, then restore them safely.
order: 4
featured: true
status: released
statusNote: v0.3.0 · October 2026
categories: [developer-tools, security]
year: "2026"
role: Design and implementation
monogram: GTS
stack: [TypeScript, Git, OpenCode V2, Node.js, Bun]
license: Apache-2.0
release:
  version: v0.3.0
  date: October 2026
  url: https://github.com/gitdamnit/opencode-git-that-shit/releases/tag/v0.3.0
distribution: GitHub release. npm still serves 0.2.2; 0.3.0 is installed from the release source archive.
lastVerified: "2026-10-18"

problem:
  - >-
    AI coding agents edit configuration and state with the same confidence they edit code.
    One malformed JSON file, one whitespace-sensitive config change, or one bad command can
    break the environment that runs the agent. Project Git does not help when the file is
    untracked, ignored, or changed without a commit.
  - >-
    The failure is temporal: Git records changes after they happen. Recovery needs a
    snapshot from before the risky operation, taken automatically, without asking the model
    to remember.

approach:
  - >-
    Git That Shit maintains a shadow Git repository separate from the project's .git. It
    tracks a deliberate allowlist: OpenCode configuration, agent state, package and build
    configs, container files, and env templates — never real .env files. The plugin hooks
    into the OpenCode V2 lifecycle, and the gts CLI uses the same engine outside a session.
  - >-
    Snapshots run pre-operation and post-edit, with verified commits, no-change handling,
    and a configurable disk-space floor. Restores are dry-runs by default. A real restore
    skips files that changed since the snapshot unless force is explicit, and it never
    restores redacted secrets because a placeholder would destroy live credentials.
  - >-
    Pruning rewrites the shadow history, so it writes a Git bundle of the entire shadow
    repository first. Every destructive path has a preview and a recovery artefact.

features:
  - Automatic pre-operation and post-edit snapshots for OpenCode sessions
  - Standalone gts CLI with status, list, diff, snapshot, restore, prune, and doctor
  - Allowlisted configuration and state files; real secrets excluded
  - Dry-run restore by default, with conflict detection and force as a separate flag
  - Automatic pre-restore recovery snapshot
  - Shadow repository isolated from project Git history
  - Project-scoped locking and owner-only storage permissions

challenges:
  - title: Hooks cannot veto, so strict mode cannot promise more than it has
    detail: >-
      The SDK's pre-execution hook cannot cancel a tool call, and hook ordering with
      permission evaluation is unspecified. Strict mode blocks when a gate exists and fails
      open with a loud warning when it does not. Restore can be strict because Git That Shit
      owns that path.
  - title: Redaction makes some files unrestorable
    detail: >-
      A snapshot of a config containing a secret stores a placeholder, not the value.
      Restoring it would erase the real credential. Those files are skipped and reported; the
      tool does not pretend the snapshot is a complete backup.
  - title: Prune rewrites history
    detail: >-
      Surviving snapshot hashes change. The safety bundle is written before anything is
      touched, and the manifest is rebuilt to reference real commits. This is documented
      rather than hidden behind a tidy success message.
  - title: A legacy path that could not simply be renamed
    detail: >-
      Existing snapshot repositories live under a nested historical path. Moving it would
      orphan every installation, so the canonical path stays, and older layouts are migrated
      on first use.

lessons:
  - Recovery has to be independent of the thing that failed. Project Git cannot protect the files project Git does not see.
  - Destructive commands should default to a preview. Force should be a sentence, not a guess.
  - Do not snapshot what you cannot restore. Redacted files are a boundary, not an oversight.
  - A best-effort guarantee should be labelled best-effort in the product, not only in the code.

statusDetail:
  - >-
    v0.3.0 is a public GitHub release under Apache-2.0. The project records 322 tests across
    24 files, typecheck, lint and build passes, a 70-file npm pack, a fresh isolated install,
    and 145 checks in the Docker plugin lab on OpenCode 2.0.21.
  - >-
    npm still serves 0.2.2. Publishing 0.3.0 requires an authorized manual workflow, so the
    documented npm install path is one minor version behind the release.
  - >-
    The plugin registers eight gts tools, and the CLI exposes the same operations without an
    OpenCode session.

verified:
  - Public repository, tag v0.3.0, and release — checked 18 Oct 2026
  - Release evidence file with test, packaging, and lab results
  - npm registry currently reports 0.2.2 as latest
  - Restore and prune defaults documented in the README

gaps:
  - npm publication of 0.3.0 is pending; the registry path installs 0.2.2.
  - Strict-mode pre-execution blocking is best-effort, not guaranteed.
  - No cross-machine restore and no selective single-file restore.
  - Private-storage permission enforcement is POSIX-only.
  - Historical secrets in old shadow commits are not rewritten.

links:
  - label: Repository
    url: https://github.com/gitdamnit/opencode-git-that-shit
    kind: repository
  - label: Release v0.3.0
    url: https://github.com/gitdamnit/opencode-git-that-shit/releases/tag/v0.3.0
    kind: release

related: [checkpoint-orchestrator, stranger-danger]
```

Git That Shit is named after the thing people say after the disaster. The tool runs before it.

It is both a plugin and a standalone CLI because recovery should not require the agent to be healthy enough to invoke it. The interesting design constraint is not taking snapshots; it is making restore, prune, and secret handling safe enough that a person will trust them under pressure.

---

## ProDoc Guard

*File: `prodoc-guard.md`*

```yaml
title: ProDoc Guard
tagline: Project memory that lives in Git, not in an AI's head.
summary: A vendor-neutral Agent Skill and offline CLI that keeps requirements, decisions, and project status present, consistent, and honest across AI-assisted sessions.
order: 2
featured: true
status: released
statusNote: v0.1.0 · October 2026
categories: [developer-tools]
year: "2026"
role: Design and implementation
monogram: PG
stack: [Python 3, Agent Skills specification, Git, JSON, Markdown]
license: MIT
release:
  version: v0.1.0
  date: October 2026
  url: https://github.com/gitdamnit/prodoc-guard/releases/tag/v0.1.0
distribution: Public GitHub repository and source release. Installed by copying one folder into a skills directory.
lastVerified: "2026-10-18"

problem:
  - >-
    AI assistants lose project context between sessions. They forget why an architecture was
    chosen, restate requirements from memory, duplicate documentation, and report work as
    complete, tested, or shipped when nothing was verified. Conversation history cannot be
    reviewed, diffed, handed to a colleague, or trusted as a record.
  - >-
    The usual answer is another hosted memory service. That moves the source of truth
    somewhere the repository cannot see and creates a new dependency for something that
    should be plain text in version control.

approach:
  - >-
    ProDoc Guard keeps three canonical documents at the repository root: product
    requirements, a decision log, and project status. The skill instructs an assistant to
    read all three before substantial work and to update them honestly. The CLI makes
    "honestly" checkable instead of aspirational.
  - >-
    The core is a specification-format SKILL.md plus one Python script using only the
    standard library. It works in OpenCode, Codex, Claude Code, Cursor, Copilot, Gemini CLI,
    or no agent at all. There are no provider plugins, no vendor SDKs, no hosted service,
    and no model API.
  - >-
    The checker separates observed Git metadata from human-written evidence, rejects
    completion claims without an artefact, refuses deleted or rewritten decision records,
    scans for secrets, and returns stable exit codes. Append-only history is enforced against
    HEAD, not against the tool's memory.

features:
  - Three canonical documents with a required-section contract
  - Offline CLI with init, validate, status, check, and update
  - Evidence rules that fail a completion claim with no path, URL, or commit
  - Append-only decision history with deletion and reorder detection
  - Observed repository state kept separate from verified evidence
  - Skill-directory validator for the Agent Skills specification
  - Least-privilege CI action and a disposable-repository test suite

challenges:
  - title: "Honesty is a schema problem"
    detail: >-
      "Tested" is easy to type and hard to prove. The CLI only accepts completion states with
      evidence attached, and the status template forces a separate machine-observed block so
      Git metadata cannot masquerade as a test report.
  - title: Portability without a lowest common denominator
    detail: >-
      Each client discovers skills differently, and installing a skill in one product does
      not install it in another. The project uses only specification fields, documents each
      client's real state, and refuses to claim runtime support it has not observed.
  - title: The limits of a local integrity check
    detail: >-
      The decision-history check cannot see a rewritten baseline; anyone who can rewrite Git
      history can rewrite the evidence. The tool documents that boundary rather than implying
      immutability it cannot provide.

lessons:
  - Documentation is project data, not an instruction to the model. It needs a contract and a checker.
  - Make false completion fail loudly. A green build that proves nothing is worse than no build.
  - 'Vendor neutrality is mostly restraint: every convenience API you adopt is a client you cannot leave.'
  - "Test the documentation itself. The project's own three files are fixtures for the tool."

statusDetail:
  - >-
    v0.1.0 is a public, non-prerelease GitHub release under MIT. The release gate recorded
    159 tests with 158 passing and one opt-in skip, three document gates, the official Agent
    Skills validator, and 39 disposable-repository scenarios. CI runs the suite on CPython
    3.8 and 3.12.
  - >-
    Runtime evidence exists for OpenCode (discovered, invoked, CLI executed) and Gemini CLI
    (discovered; invocation not independently confirmed). Codex, Claude Code, Cursor, and
    Copilot are specification-conformant only. No marketplace listing is claimed.
  - >-
    The repository ships a GitHub Actions check, and CI runs it against the project itself.

verified:
  - Public repository, tag v0.1.0, and release — checked 18 Oct 2026
  - CI runs linked from the project status for commits f429e56 and ef3e693
  - Release source archive downloaded, validated, and re-run by the maintainer
  - Installed and invoked in OpenCode 2.0.21 as recorded in the runtime evidence

gaps:
  - Windows is implemented but not executed; macOS is expected but untested.
  - Most listed clients are specification-conformant only, not runtime-tested.
  - The secret scan covers the three canonical documents, not the whole repository.
  - The decision-history check cannot detect a rewritten Git baseline.
  - No marketplace or directory listing has been verified.

links:
  - label: Repository
    url: https://github.com/gitdamnit/prodoc-guard
    kind: repository
  - label: Release v0.1.0
    url: https://github.com/gitdamnit/prodoc-guard/releases/tag/v0.1.0
    kind: release

related: [checkpoint-orchestrator, remindskill]
```

ProDoc Guard is the project I use on my own repositories, including this website. It started as a reaction to a specific failure: an assistant reporting that something was "done" when the repository could not prove it.

The fix is deliberately unglamorous. Three Markdown files, one Python script, no network, and a rule that a claim without evidence is a failing build.

---

## ReMindSkill / ReMindGuard

*File: `remindskill.md`*

```yaml
title: ReMindSkill / ReMindGuard
tagline: Persistent context for ChatGPT, stored as Markdown you can read and carry away.
summary: Two iterations of an offline memory engine and skill for keeping decisions, corrections, and project state across separate conversations — without a hosted service.
order: 8
featured: false
status: prototype
statusNote: 0.2.0-dev / 0.1.0-dev · unpublished
categories: [ai-tooling]
year: "2026"
role: Design and implementation
monogram: RM
stack: [Python 3, Markdown, Agent Skills, ChatGPT Projects]
license: Undecided / all rights reserved
distribution: Local source only. No public repository, package, or release.
lastVerified: "2026-10-18"

problem:
  - >-
    ChatGPT conversations forget. Users re-explain the same project, watch rejected ideas
    return, receive contradictory advice, and are told work is done when only a plan exists.
    Native memory is useful but opaque: it is not easily inspected, diffed, exported, or
    moved to another tool.
  - >-
    A memory system for a hosted assistant has an awkward constraint: there is no supported
    write API for the assistant's memory or project sources. Any design that pretends
    otherwise is a demo, not a tool.

approach:
  - >-
    The memory is plain Markdown with explicit provenance, status, and authority. Significant
    items are captured — decisions, corrections, retirements, preferences, open questions —
    not whole conversations. A newer guess never silently replaces an older confirmed fact.
  - >-
    A standard-library Python CLI handles capture, review, apply, search, compact, archive,
    export, restore, validate, and forget. It runs offline with no dependencies and no model
    call. Imports from ChatGPT exports are treated as untrusted input, with traversal limits,
    size limits, and injection flagging.
  - >-
    ReMindGuard is the earlier ChatGPT-first protocol and engine; ReMindSkill is the later
    skill packaging with a reproducible distribution, Agent Skill format, and a benchmark
    harness. Both use the same core idea: the memory is a reviewable artefact, and updating
    it in ChatGPT is a documented manual replacement.

features:
  - Canonical Markdown memory with provenance and authority
  - 'Deterministic reconciliation: corrections supersede, conflicts are flagged'
  - Retired items stay retired unless explicitly reversed
  - Offline CLI with capture, review, apply, search, compact, export, and restore
  - Safe import of ChatGPT conversation exports
  - Skill and ChatGPT Project packaging around the same engine

challenges:
  - title: The assistant cannot be written to
    detail: >-
      Consumer ChatGPT has no documented API for updating project sources or Library files.
      The workflow is therefore: generate a reviewable patch, replace the file manually,
      start a fresh conversation, and verify. The CLI prints those steps rather than hiding
      them behind a sync button that does not exist.
  - title: Retrieval is manual too
    detail: >-
      There is no conversation-start hook on consumer ChatGPT. The relevant memory file has
      to be attached. The project describes this as a workflow, not an automatic system.
  - title: Two codebases, one idea
    detail: >-
      ReMindGuard and ReMindSkill overlap. ReMindSkill is the more complete packaging and
      benchmark work; ReMindGuard carries the earlier protocol and CLI. Consolidation is
      unfinished, and the project does not claim a single stable product name yet.
  - title: Licensing is undecided
    detail: >-
      Both repositories currently grant no license. Nothing is published, and the absence of
      a grant is intentional until the direction is settled.

lessons:
  - Memory is only useful if it can be inspected and corrected. Opaque memory recreates the problem.
  - A feasibility result of PARTIAL is more valuable than a demo that hides the manual step.
  - Packaging a workflow for a platform without an API is mostly documentation and restraint.
  - Two prototypes can share an idea without being one product; say so instead of merging the names.

statusDetail:
  - >-
    Both projects are pre-release and unpublished. ReMindSkill reports version 0.2.0-dev, 42
    of 42 tests passing, a 100% benchmark result, an Agent Skill package, a ChatGPT Plus
    package, and a reproducible distribution. ReMindGuard reports 0.1.0-dev, a portable Agent
    Skill package, and live ChatGPT acceptance untested.
  - >-
    There is no public repository for either project and no release artifact. The pyproject
    homepage fields point at repository names that are not publicly available, so they are
    not linked from this page.
  - >-
    The project is best described as a prototype with a working offline engine and an
    honest manual path for the hosted half.

verified:
  - Local README, pyproject, and source trees inspected 18 Oct 2026
  - ReMindSkill README reports 42/42 tests and a 100% benchmark result
  - ReMindGuard README states pre-release, not published, live acceptance untested
  - Both repositories state that no license has been selected

gaps:
  - No public repository, package, or release has been verified.
  - Live ChatGPT acceptance has not been established.
  - The license is undecided, so no reuse rights are granted.
  - The relationship between the two codebases is not consolidated.

links: []

related: [prodoc-guard]
```

ReMindSkill and ReMindGuard are two attempts at the same problem: making an assistant's project memory inspectable instead of mysterious.

The useful part is not the memory format. It is the refusal to pretend that ChatGPT offers a write path it does not. The project is unpublished, unfinished, and unlicensed, and this page says so.

---

## Stranger Danger

*File: `stranger-danger.md`*

```yaml
title: Stranger Danger
tagline: A redaction guard for the boundary where prompts, tool output, and context leave for a model.
summary: An OpenCode V2 plugin and sd CLI that scan and redact secrets and sensitive data at model-request boundaries, with a secret-free audit log and fail-closed limits.
order: 5
featured: false
status: released
statusNote: v0.2.0 · October 2026
categories: [security, ai-tooling]
year: "2026"
role: Design and implementation
monogram: SD
stack: [TypeScript, OpenCode V2, Node.js, TOML, JSONL]
license: MIT
release:
  version: v0.2.0
  date: October 2026
  url: https://github.com/gitdamnit/opencode-stranger-danger/releases/tag/v0.2.0
distribution: GitHub release. Not published to npm; the README's npm install command does not resolve.
lastVerified: "2026-10-18"

problem:
  - >-
    Secret scanners check files. They do not check what enters a model's context window. A
    repository can be clean and still leak a credential inside a prompt, a shell summary, a
    checkpoint, or a compaction transcript sent to a cloud provider.
  - >-
    Blocking the read is one answer, and it breaks the agent. The useful place to intervene
    is the request boundary: scan the assembled content immediately before transmission,
    redact what matches, and keep an audit record that does not itself contain the secret.

approach:
  - >-
    The plugin registers documented OpenCode V2 hooks at each request kind: incoming prompt,
    tool results, the agent-loop request, transient generation, title generation, and
    compaction. Registering all of them makes redaction independent of which path a request
    takes.
  - >-
    The scanner is bounded and chunk-safe. Large inputs are covered across window boundaries
    with overlap; anything that cannot be inspected fails closed with an explicit marker
    rather than passing through. Redaction replaces the match with a token; the raw value is
    never printed, logged, or written to the audit file.
  - >-
    A standalone sd CLI shares the engine for scan, redact, audit, rules, and allowlist work.
    Reading a file through the plugin never modifies it on disk; redaction is a separate,
    atomic command with an opt-in backup.

features:
  - Request-boundary scanning for prompts, tool results, context, generation, titles, and compaction
  - Bounded, chunk-safe scanning with fail-closed size and error limits
  - Redaction tokens instead of raw values in output and logs
  - Project-scoped audit log that never stores the secret
  - Allowlist by fingerprint, rule ID, path, or regular expression
  - Five plugin tools plus a standalone sd CLI
  - Read-only file inspection; no silent disk writes

challenges:
  - title: Hooks are not a single choke point
    detail: >-
      OpenCode has several request kinds, and the provider layer can add content after the
      assembled messages. The plugin covers the documented session request paths and states
      plainly that raw HTTP bodies and provider-native WebSockets are not inspected.
  - title: Fail closed without breaking the session
    detail: >-
      A scanner that throws can take down the agent. Hook callbacks never throw; malformed
      events are contained, oversized content becomes an explicit fail-closed marker, and
      the audit trail records what happened.
  - title: Exotic values are a coverage boundary
    detail: >-
      String leaves of plain objects and arrays are redacted. Maps, sets, dates, typed
      arrays, and similar objects pass through unchanged to avoid corrupting non-plain data.
      That is a documented gap, not an invisible one.
  - title: Pattern detection is not encryption
    detail: >-
      A base64-encoded secret that does not match a rule may survive. High-entropy detectors
      help, but the tool does not claim to be a vault or a guarantee against an adversary
      who encodes around the rules.

lessons:
  - The boundary matters more than the rule count. A perfect scanner at the wrong layer protects nothing.
  - An audit log that stores the leaked secret is a second leak.
  - Fail-closed behaviour needs a visible marker; silent truncation is indistinguishable from safety.
  - Security tools earn trust by publishing what they do not cover.

statusDetail:
  - >-
    v0.2.0 is a public GitHub release under MIT. The project records 322 tests, package
    verification, a clean rebuild, and 145 checks in the Docker plugin lab on OpenCode
    2.0.21. A synthetic secret in a prompt was transmitted by a control run and absent with
    the plugin loaded against a loopback mock provider.
  - >-
    The package is not published to npm; the registry returns 404. The installation command
    in the README therefore does not work as written, and the public release remains the
    source archive.
  - >-
    The security contract lists the uncovered surfaces: provider-native WebSocket traffic,
    raw HTTP bodies, exotic object values, and encoded secrets that do not match a rule.

verified:
  - Public repository, tag v0.2.0, and release — checked 18 Oct 2026
  - Project status with test, packaging, and Docker lab evidence at commit 9cfd813
  - Security guarantees and known limitations documented in the README
  - npm registry returns 404 for @gitdamnit/stranger-danger

gaps:
  - Not published to npm; the documented install path is broken.
  - WebSocket traffic and raw HTTP bodies are not inspected.
  - Exotic objects and encoded secrets are not covered.
  - No independent security audit or third-party penetration test is recorded.
  - The live verification used a loopback mock provider, not a production provider.

links:
  - label: Repository
    url: https://github.com/gitdamnit/opencode-stranger-danger
    kind: repository
  - label: Release v0.2.0
    url: https://github.com/gitdamnit/opencode-stranger-danger/releases/tag/v0.2.0
    kind: release

related: [git-that-shit, checkpoint-orchestrator]
```

Stranger Danger is the security half of the companion set: Git That Shit makes destructive operations recoverable, and this one tries to stop sensitive data from leaving the machine in the first place.

The most useful part of the project is its limitations section. A security tool that only lists what it catches is marketing; one that lists where it fails is documentation.

---

## TRAVIS

*File: `travis.md`*

```yaml
title: TRAVIS
tagline: A private training platform for one coach, built around the client history that usually lives in spreadsheets.
summary: A single-trainer application for intake, program generation, manual programming, session logging, measurements, nutrition tracking, and trainer-controlled AI assistance.
order: 7
featured: false
status: active-development
statusNote: Private build · v2.3.0
categories: [web-platforms]
year: "2025–2026"
role: Design and implementation
monogram: TR
stack: [React 18, TypeScript, Tailwind CSS, Express 5, PostgreSQL, Drizzle ORM]
license: MIT (private repository)
distribution: Private development build. No public repository, download, or hosted product.
lastVerified: "2026-10-18"
disclaimer: Personal project for a single trainer. It is not a YMCA product, a commercial SaaS offering, or an adopted platform, and no client or usage claims are made here.

problem:
  - >-
    A personal trainer carries a lot of state between sessions: intake assessments, injuries,
    equipment access, prior loads, measurements, nutrition targets, and the note that changes
    next week's program. In small practices that state lives across notebooks,
    spreadsheets, and memory.
  - >-
    Generic fitness apps optimize for the member, not the coach. They rarely support a
    six-week program with a trainer's own progression logic, and they do not let the trainer
    revise a plan without losing the manual edits already made.

approach:
  - >-
    TRAVIS is a single-trainer web application: a React client, an Express API, and
    PostgreSQL through Drizzle. The data model is typed and shared, with imperial units as
    canonical and metric conversion at the interface edge.
  - >-
    Programs can be generated with AI assistance, authored manually, or revised from trainer
    notes. Generation is coach-invoked, not autonomous, and every AI endpoint has a
    deterministic fallback so a model failure does not take down the workflow.
  - >-
    Client intake, measurements, nutrition, hydration, and personal records are tracked
    against the same client record. The goal is one operational tool for one coach, not a
    multi-tenant product.

features:
  - AI-assisted workout generation from goals, equipment, injuries, and schedule
  - Manual multi-week program authoring and editing
  - Session-aware generation that considers previous session notes
  - Client intake, profiles, and progress history
  - BMR and TDEE calculation using the Mifflin–St Jeor equation
  - Macro, hydration, measurement, and personal-record tracking with charts
  - Role-based trainer access and a responsive client interface

challenges:
  - title: AI revision must not destroy manual work
    detail: >-
      An early revision path accepted a legacy program shape and wrote it over a v2 multi-week
      plan. A code audit flagged it as blocking further AI write-path work. The AI revise
      endpoint was disabled and the schema and editor needed a coordinated fix before it could
      return.
  - title: "The program schema is the product"
    detail: >-
      A six-week program needs day sections, per-exercise duration, progression and regression
      rules, substitutions, and week emphasis. Fields that the schema cannot represent quietly
      disappear on normalization. The schema and editor have to change together.
  - title: Partial onboarding failures create duplicates
    detail: >-
      The new-client flow originally created the client before the intake, measurement, and
      target requests. A failure halfway through left a partial record with no safe retry.
      The fix adds an idempotent retry path rather than asking the trainer to notice.
  - title: PDF and Android sharing are not a print dialog
    detail: >-
      The current program view uses an HTML popup and window.print(). A real export needs
      pagination, grayscale printing, whole-program and per-day output, and the Android share
      sheet. That work is still outstanding.

lessons:
  - "Requested, planned, implemented, tested, and accepted are five different states. A merge is not coach approval."
  - AI that writes into a structured document needs a schema that can represent the document losslessly.
  - Idempotency is a user-experience feature when a form spans several API calls.
  - Building for one user removes a lot of product guesswork and replaces it with real workflow constraints.

statusDetail:
  - >-
    TRAVIS is under active development as a private repository, currently versioned 2.3.0.
    The project status tracks features by phase and explicitly separates source-level
    existence from test execution and coach acceptance.
  - >-
    The most recent audit recorded 155 unit tests and a clean typecheck and build, and earlier
    reports recorded 219 unit tests. The 71 to 76 historical Playwright runs were not re-run
    because the test target is a shared, persistent database rather than an isolated
    disposable one.
  - >-
    Equipment inventory, PDF program export, and Android file sharing are not delivered.
    Phase 4 AI write-path work is paused pending schema fixes and explicit authorization.

verified:
  - Repository README, package manifest, and status document inspected 18 Oct 2026
  - Source-verified features and known defects recorded in the project status audit
  - Stack and version verified from the private repository at this checkout
  - No public repository, release, client count, or adoption claim is made

gaps:
  - No public repository, release, or demo exists.
  - End-to-end tests have not been re-run in the latest audit.
  - Coach acceptance is not established for all workflows.
  - Equipment inventory, PDF export, and Android sharing are not implemented.
  - The private repository and its data are not published here.

links: []

related: []
```

TRAVIS is the project that keeps me honest about the difference between code that exists and a feature a person can rely on.

It is a private build for one trainer. I am including it because the engineering decisions are real — schema fidelity, AI revision safety, idempotent onboarding — not because it has users or commercial adoption to show.

---

# 2. Grow / horticulture

From `evanzellner-site/src/data/grow.ts`. The Grow section was built but never
populated — every entry is a real zero, not a placeholder.

## Page copy

- **Eyebrow:** Horticulture
- **Title:** Grow
- **Tagline:** I don’t even like lemons.
- **Intro:** Citrus cultivation and horticulture, written down honestly: cultivar
  notes, experiments, observations, photographs, and the occasional discovery that
  survives a season.

**Premise**

> Hot summers, alkaline clay soil, and hard freezes that arrive faster than a tree
> can be protected. The interest is not in beating that — it is in watching how
> close it is possible to get.
>
> Grow is a working notebook, not a catalogue. Entries are added when there is
> something worth recording: a cultivar that handles the heat, a graft that
> finally took, a protection method that failed loudly enough to be useful.

**Note**

> Nothing has been published yet. No plant inventory, experiment log, cultivar
> profile, or photograph is shown on this page, because none has been documented
> for publication. The counters below are real zeros, not an empty template.

## Sections

### Cultivar profiles — *Empty*

One page per cultivar: what it is, why it is worth growing here, and how it behaves.

The profile schema records the cultivar name, the reason it was chosen, cold and
heat notes, and the season it was observed. No cultivars have been added.

### Field notes — *Empty*

Dated observations, experiments, discoveries, and longer articles about a season.

A note can be an article, an experiment write-up, an observation, or a discovery.
Each carries a date, a kind, and enough context to be useful a year later. No notes
have been added.

### Photographs — *Planned*

The visual record: growth, damage, fruit, graft unions, and the occasional proof
that something worked.

Photographs will be published only when real images exist, with alt text describing
what is actually visible. No placeholder photography is used.

## What it was meant to grow into

- Articles about a single season or a single mistake.
- Experiments with a stated method, a control, and an honest result.
- Observations short enough to write on a phone in the yard.
- Discoveries that were not the plan.

---

# 3. Unstarted About stories — internal planning

From `evanzellner-site/editorial/about-stories.md`. These are notes about
stories that were never written, not copy. None of it was ever published.

This file is **git-excluded** and is never built into the site. It holds the four
unfinished stories that used to appear on `about.evanzellner.com` as visible
"editorial placeholder" blocks. They were hidden from production because a
personal site reads better with fewer, finished sections than with marked gaps.

Nothing here may be published until it is written from Evan's own account. Do not
invent biography, photographs, dates, or names. The site's rule is unchanged: if
it did not happen, it does not get written down.

## 1. Horticulture origin story

**Was labelled:** "Horticulture origin story."

**What the page needs:** when the interest started, what came first, and what is
growing now. This is the piece that would connect the About page to
`grow.evanzellner.com` without duplicating it.

**Notes for writing it:**

- First person, specific, one or two paragraphs.
- A single concrete detail (a first plant, a first failure, a move) is worth more
  than a summary of the interest.
- Link to `grow.evanzellner.com` only after the Grow notebook has at least one
  real entry; otherwise the link leads to an empty section.

**Status:** not written.

## 2. Photographs

**Was labelled:** "Photographs."

**What the page needs:** no personal photographs have been selected for this
page. Images will be added with real captions and alt text, not stock photography.

**Notes for writing it:**

- Decide first whether the About page should carry photographs at all; the
  current design does not depend on them.
- If yes: prefer two or three images that carry a story over a gallery.
- Alt text describes what is visible, not what it means.
- Confirm permission for any image that shows other people.

**Status:** not written; no assets selected.

## 3. The gitdamnit handle

**Was labelled:** "The gitdamnit handle."

**What the page needs:** where the GitHub handle came from, and which project
earned it.

**Notes for writing it:**

- Short and dry; one paragraph at most.
- Avoid making it a joke explainer — the handle is already on every page footer.
- If the origin is not interesting, leave it out permanently rather than padding
  it. Not every story needs to be told.

**Status:** not written.

## 4. The people who taught the trade

**Was labelled:** "The people who taught the trade."

**What the page needs:** a short piece about the managers, recruiters, and
engineers who made the career legible.

**Notes for writing it:**

- **Needs names and permission before anything is published.** Until then, write
  it without names or do not publish it.
- Prefer one specific lesson attributed to a role ("a manager who ...") over a
  list of tributes.
- Keep it about what was learned, not about gratitude performance.

**Status:** not written; permission not sought.

---

## Where these would go

`src/pages/about/index.astro` currently ends with the four verified sections
(background, what recruiting taught, why the tools exist, curiosity) and then
"Where to go next." If one of these stories is finished, add it as a new
`Section` between curiosity and the closing section, with its own `index`
number, and update `src/data/about.ts`. No placeholder component is needed; a
finished story is just content.

---

# 4. Old site project pages

Extracted text from `evan-zellner/preview/projects/*/index.html`, the static
export of the old Bludit site. Formatting was flattened to markdown; the
wording is unchanged.

## ADHD Penguin

*Source: `adhd-penguin/`*

### ADHD Penguin

ADHD-focused productivity and workflow application

#### Problem

Most productivity tools assume a neurotypical brain — linear workflows, consistent motivation, and the ability to hold multiple tasks in working memory. ADHD brains don't work that way. They need low-friction capture, visual prioritization, and tools that reduce cognitive load instead of adding to it.

#### What I Built

An ADHD-focused productivity and workflow application designed around how distracted, overloaded brains actually operate. Emphasizes low-friction task capture, prioritization, and cognitive load reduction. Built with the understanding that the best productivity tool for ADHD is the one you'll actually use when your brain is firing on all cylinders and when it isn't.

#### Tech Stack

- Frontend: TBD

- Backend: TBD

- Database: TBD

- Deployment: Docker container

#### Screenshots

Screenshots coming soon.

#### Live Demo

N/A — in development.

#### GitHub / Code

Private/internal repository.

#### Status

Active build / prototype

#### What It Shows

Neurodivergent workflow design, practical product thinking, and user-focused software architecture. Building tools that work with how brains actually function, not how productivity gurus wish they did.

---

## CheapCode

*Source: `cheapcode/`*

### CheapCode

The open source coding agent — local-first, budget-conscious AI development

#### Problem

AI-assisted development is expensive. Large model API calls add up fast, and reliability is tied to external providers. Most developers don't need GPT-4-level inference for every coding task — they need a system that uses the right model for the right job, with local fallback when the cloud fails or gets too expensive.

#### What I'm Building

CheapCode is a fork and extension of OpenCode focused on making AI-assisted development affordable, resilient, and portable. It emphasizes small local worker models for routine tasks, larger models for complex reasoning, and config scaffolds/blueprints for repeatable development workflows.

Built with TypeScript in a monorepo structure, using Bun for package management and SST for deployment infrastructure.

#### Tech Stack

- Language: TypeScript (63.6%), MDX (33.5%)

- Runtime: Bun

- Build: Turbo (monorepo build orchestration)

- Deployment: SST infrastructure

- Ecosystem: OpenCode-compatible plugin system

- Config: Nix flakes for reproducible environments

#### Screenshots

Screenshots coming soon.

#### Live Demo

N/A — active development. Coming soon.

GitHub: github.com/gitdamnit/cheapcode-cli

#### GitHub / Code

Public repository. Fork of OpenCode with CheapCode-specific modifications.

#### Status

Active development — coming soon

#### What It Shows

Systems thinking around AI-assisted development cost, reliability, and portability. Understanding that the future of AI coding isn't just about bigger models — it's about building workflows that are cheap, resilient, and portable.

---

## FRANKIE v2.1.0

*Source: `frankie-v210/`*

### FRANKIE v2.1.0

###### Fitness, Results, Analytics, Nutrition, Knowledge, Intelligent Engine

FRANKIE is a private AI-powered training management system designed for personal trainers to automate client intake, program generation, progress tracking, and session logging.

The system combines structured client assessments with AI-assisted workout generation to create customized training programs while maintaining a complete client history.

FRANKIE is designed as a single-trainer operational tool rather than a SaaS platform.

"Why is it named Frankie?"

I'm glad you asked. My husband, Frankie, is a personal trainer. The amount of papers he carries around on a clipboard is insane and I wanted to make his job just a little bit easier.

#### Features

##### Core

• AI-powered workout program generation based on client goals, equipment, injuries, and schedule
• AI-assisted workout plan revision from trainer notes — refine existing plans with natural language instructions
• Manual workout editing with full control over every exercise, set, and rep
• Comprehensive intake assessments covering fitness, health, lifestyle, and nutrition
• Client profile management with notes and progress tracking
• Automatic BMR and TDEE calculation using the Mifflin–St Jeor equation
• Role-based authentication for trainer access
• Clean React interface with dark/light mode support • Full-width layout — no sidebar; navigate via dashboard client list and profile tabs

##### v2 — Tracking & Analytics

• Macro Tracking — Daily calorie, protein, carbs, fat, and fiber logging with trend charts and AI-suggested targets
• Hydration Tracking — Water intake logging in oz/ml with daily target progress and history charts
• Body Measurements — Full body measurement logging (11 body sites) with multi-line trend charts and delta tracking
• Personal Records — PR tracking for any exercise with history charts, previous-value comparison, and time-format support

##### Imperial Canonical

All data stored in imperial units (inches, lbs, oz) with metric input conversion at the UI layer.

#### Stack

##### Frontend

React 18 + TypeScript
Tailwind CSS + shadcn/ui
TanStack Query
Wouter routing
Recharts for data visualization

##### Backend

Node.js + Express 5

##### Database

PostgreSQL
Drizzle ORM

##### AI

OpenCode Go Cloud AI

- Workout generation: LLM_MODEL / LLM_MODEL_FALLBACKS (default: qwen3.6-plus)

- Macro AI suggestions: minimax-m2.7 (configurable via MACRO_LLM_MODEL)

- All AI endpoints use deterministic fallbacks — never fail with 500 on model/parse errors

##### Testing

Vitest + jsdom (unit tests)
Playwright (E2E tests)

#### Status

Production.

Although this system is was designed for single personal trainer but it could easily be extended into a multi-tenant platform.

### Changelog

All notable changes to FRANKIE will be documented in this file.

The format is based on Keep a Changelog.

#### [2.1.0] — 2026-05-12

##### Added

- AI-assisted workout plan revision from trainer notes — Existing workout plans can be regenerated/revised using the current client profile, intake, existing plan content, and trainer revision instructions. Trainers can describe changes in natural language (e.g. "Make sessions 45 min max", "Remove overhead pressing", "Use cables instead of dumbbells") and FRANKIE will apply targeted edits while preserving the plan structure.

##### Changed

- Workout plan workflow now supports generate → edit → revise → approve.

- Revising an approved plan returns it to draft status for review before re-approval.

#### [2.0.4] — 2026-05-12

##### Fixed

- Macro AI Suggest reliability — Endpoint no longer returns 500 when AI returns prose/Markdown instead of JSON. All AI failures (parse errors, timeouts, model unavailability) are caught inside the route and converted into deterministic macro targets with a fallback rationale.
- Deterministic baseline computed first: calories from TDEE adjusted by goal, protein at 0.8g/lb, fat at 25% of calories, carbs from remainder

- AI is only asked for rationale refinement; numeric targets are always deterministic

- System prompt strengthened: "Return ONLY valid JSON — no markdown, no code fences, no headings, no prose"

- Fallback rationale: "AI rationale could not be parsed, so FRANKIE generated a standard macro target from the client's TDEE/bodyweight/intake data."

- Macro AI model preference — Macro suggestions now prefer minimax-m2.7 as the default model (configurable via MACRO_LLM_MODEL env var). Falls back through LLM_MODEL → LLM_MODEL_FALLBACKS if unavailable. Workout generation model selection unchanged.

##### Removed

- AICommandBox and voice input — AI command box and Web Speech API voice input removed from client profile header. Manual macro target entry remains available.

#### [2.0.3] — 2026-05-12

##### Removed

- Sidebar/navigation UI — Entire left sidebar removed. App uses full-width layout with top header bar (theme toggle + logout). Navigation is now dashboard → client click → profile tabs workflow.

##### Fixed

- AICommandBox parse failure — clientLookup schema made optional; request clientId/clientName injected when AI omits them. Backend returns structured JSON errors instead of generic 500. Frontend displays actual error messages.

- update_client_field not implemented — Added to executeAction() with allowlist validation, protected-field rejection, and proper decimal/string coercion for Drizzle fields.

- AI provider timeout — 30-second AbortController timeout added. response_format 400 errors fall back to non-JSON mode, then repair prompt.

#### [2.0.2] — 2026-05-11

##### Added

- Model fallback / auto-selection: FRANKIE no longer crashes if LLM_MODEL is unavailable
- LLM_MODEL_FALLBACKS env var defines ordered fallback list (comma-separated)

- If LLM_MODEL is unavailable, falls back through list in order

- If no fallbacks match, smart-selects from available models (prefers qwen > deepseek > glm > kimi)

- Model resolution cached with 10-minute TTL

- Auto-retry on 404: clears cache, re-resolves model, retries once

- GET /api/ai/models now returns configuredModel, fallbackModels, resolvedModel, and live models list

- No secrets exposed in API response

- App logs selected model ID at startup

#### [2.0.1] — 2026-05-11

##### Security

- Session hardening: SESSION_SECRET required in production; removed dangerous default fallback

- Secure cookies: secure: true in production for HTTPS/Cloudflare compatibility

- Trust proxy: app.set("trust proxy", 1) enabled in production for Cloudflare reverse proxy

- SameSite cookies: Added sameSite: "lax" for CSRF protection

- Login rate limiting: 5 failed attempts per 15 minutes per IP, generic error messages

- 401 handling: Frontend clears auth state and redirects to login on any protected API 401

- Auth gate hardening: auth/me query uses returnNull on 401 to prevent error flash

- Docker env vars: Added FRANKIE_USERNAME and FRANKIE_PASSWORD to docker-compose.yml

- Cloudflare deployment docs: Complete two-wall auth model documented in docs/deployment-cloudflare.md

- .env.example: Improved with security notes and clearer placeholder descriptions

#### [2.0.0] — 2026-05-11

##### Added

- Macro Tracking — Daily logging (calories, protein, carbs, fat, fiber) with bar chart trends, AI-suggested targets, and approval workflow

- Hydration Tracking — Water intake logging in oz/ml with daily target progress bar, history charts, and target reference lines

- Body Measurements — 11-site body measurement logging (neck, chest, biceps, waist, hips, thighs, calves, body fat %) with multi-line trend charts and toggleable visibility

- Personal Records — PR tracking for any exercise with current PR board, history line charts, previous-value comparison, and MM:SS / HH:MM:SS time format support

- AI Command Box — Natural language editing interface with voice input (Web Speech API), parse → preview → confirm workflow, clarification handling, and audit logging

- Unit Conversion Library — Bidirectional conversions for cm/in, kg/lb, ml/oz with formatting helpers

- Docker Support — Production-ready Dockerfile and docker-compose.yml

- Testing Infrastructure — Vitest (50 unit tests), Playwright (E2E tests), coverage reporting

##### Changed

- Imperial Canonical Storage — All v2 tables store in imperial units (inches, lbs, oz). Metric input converted at UI layer

- AI Provider — Migrated from local llama.cpp to OpenCode Go cloud AI (qwen3.6-plus)

- Client Schema — Updated clients table to imperial fields (heightIn, startingWeightLb, currentWeightLb)

- Client Profile — Expanded from 4 tabs to 7 tabs (Intake, Workouts, Macros, Hydration, Measurements, PRs, Sessions)

- Dashboard Stats — Updated to reflect v2 features (Macro Tracking, PRs Tracked)

- Version — Bumped to v2.0

##### Removed

- openai.ts provider (replaced by ai-provider.ts)

- progress_logs table (replaced by body_measurements)

- Local llama.cpp / GGUF / host.docker.internal AI configuration

##### Technical

- 8 new database tables: macro_logs, macro_targets, hydration_logs, hydration_targets, body_measurements, personal_records, ai_pending_actions, ai_action_logs

- AI action allowlist system for restricted NL editing targets

- Workout generator migrated to new AI provider

- Zero TypeScript errors across all new code

#### [1.0.0] — 2026-03-22

##### Added

- AI-powered workout program generation

- Client intake form (fitness, health, lifestyle, nutrition)

- Client profile management

- Session notes with mood tracking

- Progress logging with weight charts

- BMR/TDEE calculation (Mifflin–St Jeor)

- Role-based authentication

- Dark/light mode support

- Meal plan generation (AI)

- Printable plan views!

---

## HR Assist

*Source: `hr-assist-2/`*

### HR Assist

AI-powered HR assistant with policy-grounded guidance

#### Problem

HR departments juggle multiple systems for recruiting, onboarding, compliance, and employee management. Small to mid-size organizations don't have the budget for enterprise HR platforms, but spreadsheets and email don't scale either.

#### What I Built

An HR operations assistant designed to consolidate recruiting workflows, candidate tracking, and task management into a single practical tool. Built from actual HR domain knowledge, not from a template.

#### Tech Stack

- Frontend: TBD

- Backend: TBD

- Database: TBD

- Deployment: Docker container, planned subdomain hr.evanzellner.com

- Routing: Cloudflare Tunnel

#### Screenshots

Screenshots coming soon.

#### Live Demo

Planned subdomain: hr.evanzellner.com. Not publicly available yet. Will require authentication and data protection before any external access.

#### GitHub / Code

Private/internal repository. Code available selectively.

#### Status

Prototype / active concept

#### What It Shows

Domain knowledge in HR/recruiting combined with software design and automation. Understanding that the best HR tools are built by people who actually work in HR.

---

## JobSearch App

*Source: `jobsearch-app/`*

### JobSearch App

Automated job search and application tool — finds relevant openings and applies on your behalf

#### Problem

Job searching is a full-time job. Scrolling through boards, tailoring resumes, writing cover letters, filling out redundant application forms, tracking follow-ups — it's repetitive, soul-crushing work that burns people out before they even get an interview.

#### What I Built

A tool that automates the grind: scans job boards for matching roles, filters by criteria you set, and handles the application process automatically. Built from actual recruiting domain knowledge — knowing what gets past the initial screen, what keywords matter, and how applications actually move through ATS pipelines.

The goal isn't to spray applications everywhere. It's to automate the mechanical work so you can focus on the parts that actually require a human — interviews, networking, and deciding which opportunities are worth your time.

#### Tech Stack

- 
- Frontend: TBD

- Backend: TBD

- Database: TBD

- Deployment: Docker container

#### Screenshots

Screenshots coming soon.

#### Live Demo

N/A — in development.

#### GitHub / Code

Private/internal repository.

#### Status

Active concept

#### What It Shows

Domain knowledge from the recruiter side applied to automating the candidate experience. Understanding that job searching shouldn't require 40 hours a week of repetitive form-filling — and that the right tooling can handle the mechanical work while humans focus on the human parts.

---

## Ollama Modelfile Wizard

*Source: `ollama-modelfile-wizard/`*

### Ollama Modelfile Wizard

FastAPI web app that builds Ollama Modelfiles and llama.cpp commands locally

#### Problem

Creating Ollama Modelfiles manually is error-prone. You need to know the right TEMPLATE format for each model family, set system prompts, configure parameters, and handle stop sequences. Getting any of these wrong means the model won't behave as expected.

#### What I'm Building

A web-based wizard that generates correct Modelfiles and llama.cpp commands. Key features:

- Model family + prompt format selectors — Llama 2 chat, Llama 3+ instruct, ChatML, Alpaca, raw/custom

- Optional local fetch — ollama show --modelfile or Hugging Face Modelfile fetch to auto-fill TEMPLATE, SYSTEM, and stop sequences

- Preset formats lock TEMPLATE unless you choose Custom

- Expanded parameters and optional LICENSE/ADAPTER blocks

- Download and optional ollama create remain available

#### Tech Stack

- Backend: FastAPI (Python)

- Frontend: Web UI served by FastAPI

- Integration: Ollama CLI, Hugging Face API

- Deployment: Local/self-hosted

#### Screenshots

Screenshots coming soon.

#### Live Demo

N/A — local/self-hosted tool.

#### GitHub / Code

Public repository.

#### Status

Published / active

#### What It Shows

Practical tooling for the local AI ecosystem. Understanding that the barrier to using local models isn't just inference — it's configuration. Building tools that make the mechanical parts of AI setup easier so people can focus on actually using the models.

---

## OpenCode Checkpoint Orchestrator v3.1.0

*Source: `opencode-checkpoint-orchestrator/`*

#### OpenCode plugin - Checkpoint Orchestrator v3.1.0

###### 

###### Failure-resilient checkpointing for OpenCode — npm package

###### Problem

AI-assisted coding sessions fail — provider timeouts, model switches, rate limits, network issues. When they fail, you lose context, progress, and the ability to pick up where you left off. There's no standard way to checkpoint and resume an interrupted AI coding workflow.

#### What I Built

An OpenCode plugin that creates JSON checkpoint/handoff state files during coding sessions. When a session fails — provider timeout, rate limit, model switch — the checkpoint captures enough context to resume without starting over.

#### Tech Stack

- Package: @gitdamnit/checkpoint-orchestrator (npm)

- Ecosystem: OpenCode plugin system

- State format: JSON checkpoint/handoff files

- Features: Recovery after provider failures, timeout resilience, model switching support, context persistence across sessions

#### Screenshots

Screenshots coming soon.

#### Live Demo

N/A — this is an npm package, not a web app.

Install with: npm install @gitdamnit/checkpoint-orchestrator

#### GitHub / Code

Public npm package. Source available on npm registry.

#### Status

Published npm package

#### What It Shows

Ability to build developer tooling around real AI workflow failure modes. Understanding that AI-assisted development needs the same resilience patterns as any other software system — checkpointing, recovery, and state management.

---

## OpenCode Git That Shit v0.1.0

*Source: `opencode-git-that-shit/`*

### OpenCode plugin - Git That Shit

“Oh Shit Git” is what you say after the disaster. Git That Shit is what the tool does before the disaster.

Automatic pre-disaster snapshots for OpenCode AI coding agent config and state files.

#### What is Git That Shit?

Git That Shit is a safety plugin for OpenCode AI coding agent sessions. It automatically snapshots fragile configuration and agent state files into a separate shadow git repository before risky operations.

The product exists because one malformed JSON edit, one extra whitespace-sensitive config mistake, one bad agent command, or one accidental overwrite can break an entire coding environment. Git That Shit makes those failures recoverable.

#### Why it exists

AI coding agents (OpenCode, Claude Code, Aider, Codex) operate with elevated privileges over project files. Unlike human developers who hesitate before destructive acts, agents execute commands confidently — and sometimes catastrophically.

Why project git is not enough:

- Git is not always present

- Config files are often in .gitignore or untracked

- Git records changes after they happen, not before

- Most users don’t commit before every risky operation

Git That Shit is inspired by etckeeper — the Linux tool that automatically commits /etc to git before package manager operations.

#### What it protects

By default, Git That Shit tracks:

- opencode.json - OpenCode main config

- .opencode/state/checkpoint.json - Session state

- .opencode/state/handoff.md - Handoff document

- .opencode/state/checkpoint-history.json - Checkpoint history

- package.json, tsconfig.json - Project configs

- Build configs (vite.config.ts, webpack.config.js, rollup.config.js, etc.)

- Docker configs (Dockerfile, docker-compose.yml)

- .env.example, .env.sample, .env.template - Env templates (NOT actual .env files)

#### What it does NOT protect

- Not a replacement for project git — use project git for code

- Not a general backup system — focused on config/state files only

- Not secret management — excludes .env by default (actual secrets)

- Not cloud sync — local git only

- Not for other AI agents — only tested with OpenCode

#### Installation

```
npm install @gitdamnit/opencode-git-that-shit
```

#### OpenCode Plugin Setup

Create opencode.json in your project:

```
{
 "plugins": [
 "@gitdamnit/opencode-git-that-shit"
 ]
}
```

Or use the local path for development:

```
{
 "plugins": [
 "./node_modules/@gitdamnit/opencode-git-that-shit"
 ]
}
```

#### How It Works

##### Shadow Git Repository

Git That Shit creates an isolated shadow git repository that is completely separate from your project’s .git:

- Location: .git-that-shit/snapshots/

- Config: .git-that-shit/config.json

- Never touches your real git — completely independent

This means:

- Your project’s git history stays clean

- Git That Shit’s commits don’t appear in your normal git log

- The shadow repo only stores config/state file snapshots

##### Auto-Triggers

Git That Shit automatically creates snapshots before risky operations:

Trigger TypeCommands/Events DetectedDestructive Gitgit reset --hard, git reset --mixed, git clean -fd, git stash drop, git checkout -f, git rebase --abort (during conflict)Risky Package Opsnpm install, npm ci, yarn install, yarn add, pnpm install, pnpm add, bun installConfig File EditsWriting to .json, .yaml, .yml, .toml, .ini files that match tracked patternsSession EventsOn new session start, on context compaction

##### Hooks

Git That Shit uses these OpenCode-compliant hooks:

- tool.execute.before - Fires before any bash/shell command runs

- file.edited - Fires after file modifications

- session.created - Fires when a new session starts

- session.compacted - Fires when context window is compacted

##### Plugin Execution Order

Git That Shit runs after other plugins in the hook chain. This is important:

- Other plugins (like Stranger Danger) process tool arguments first

- Git That Shit snapshots the result after other plugins have modified things

This means Git That Shit captures the “safe” version of files after other security plugins have redacted secrets.

#### IMPORTANT: What NOT to Use With This

##### Other AI Coding Agents (Not Compatible)

Git That Shit is specifically built for OpenCode and may conflict with or not work properly with:

- Claude Code (has its own safety mechanisms)

- Aider (different hook system)

- Codex (different architecture)

- Cursor (has built-in git integration)

- Windsurf (has built-in safety)

If you’re using OpenCode in a project that also uses other AI agents, Git That Shit’s snapshots may not capture changes made by those other agents.

##### Other OpenCode Plugins

Git That Shit should work fine with most other OpenCode plugins, but be aware:

- Plugin order matters — Git That Shit’s snapshots happen after other plugins process

- Disk space — If you have many plugins creating files, the shadow repo will grow

- Lock conflicts — Only one snapshot can run at a time; subsequent triggers wait

##### Not for Production CI/CD

This plugin is designed for interactive AI coding sessions. Do not:

- Use in automated CI/CD pipelines

- Rely on it for production disaster recovery

- Use as your only backup solution

#### CLI Usage

Run these commands in your terminal (not inside OpenCode):

```
gts status # Show status
gts list # List recent snapshots
gts diff # Show what changed
gts restore # Restore (dry-run by default)
gts snapshot # Manual snapshot
gts prune # Prune old snapshots (dry-run)
gts config # Show configuration
gts init # Initialize shadow repo
gts doctor # Run health checks
gts version # Show version
```

##### Restore examples

```
# Dry-run (default) - shows what would happen
gts restore abc1234

# Real restore - actually overwrites files
gts restore abc1234 --yes

# List first to find the hash
gts list
gts diff 719ab88
```

#### Configuration

Config is stored at .git-that-shit/config.json:

```
{
 "version": "0.1",
 "tracking": {
 "include": ["opencode.json", ".opencode/state/*.json", "*.config.js"],
 "exclude": [],
 "allowSensitiveFiles": false
 },
 "destructiveOps": {
 "riskyPackageManagerOps": true, // Snapshot before npm/yarn/pnpm install
 "configWrites": true // Snapshot before config file edits
 },
 "fileEdits": {
 "mode": "pre-if-available", // pre-if-available, post-edit, or disabled
 "debounceMs": 2000 // Wait 2s before snapshot on file edits
 },
 "secrets": {
 "redactKeys": ["token", "apiKey", "password", "secret", "credential"],
 "warnOnSensitive": true
 },
 "snapshot": {
 "maxFileSizeMb": 10, // Skip files larger than 10MB
 "minDiskSpaceMb": 100 // Fail if less than 100MB free
 },
 "restore": {
 "autoPreRestoreSnapshot": true // Create snapshot before restore
 }
}
```

##### Configuration Options Explained

OptionWhat it doestracking.includeGlob patterns for files to snapshottracking.excludeAdditional patterns to skipdestructiveOps.riskyPackageManagerOpsEnable/disable npm/yarn snapshotsdestructiveOps.configWritesEnable/disable config file write snapshotsfileEdits.modeWhen to snapshot: before, after, or disabledsecrets.redactKeysJSON keys to redact in snapshotssnapshot.maxFileSizeMbSkip files larger than thisrestore.autoPreRestoreSnapshotAuto-snapshot before each restore

#### Secret Handling

Git That Shit takes secrets seriously:

- .env files are EXCLUDED — actual env files with secrets are never tracked

- Sensitive file patterns blocked — *.pem, *.key, id_rsa, credentials.json, etc.

- JSON value redaction — Values with keys like token, apiKey, password are replaced with [REDACTED]

- Warning system — Alerts if you try to track sensitive files

To explicitly allow sensitive files (NOT RECOMMENDED):

```
{
 "tracking": {
 "allowSensitiveFiles": true
 }
}
```

#### Restore Workflow

When something breaks:

- Identify the problem — “My opencode.json is corrupted!”

- List snapshots — gts list

- Preview changes — gts diff 

- Dry-run restore — gts restore (shows what would happen)

- Confirm restore — gts restore --yes

Restore always defaults to dry-run — it’s safe by default.

#### Doctor Command

Run health checks:

```
gts doctor
```

Checks:

- Git availability and version

- Config file validity

- Shadow repo exists and is valid git

- Manifest file readable

- No lock file conflicts (means no snapshot in progress)

- Sufficient disk space

- No sensitive files accidentally tracked

- Project git untouched (shadow repo is independent)

#### Plugin Tools (Direct Use in OpenCode)

You can call these directly in your OpenCode conversations:

```
@tool gts_status
@tool gts_list
@tool gts_diff hash=
@tool gts_restore hash=
@tool gts_snapshot
@tool gts_prune
@tool gts_config
@tool gts_doctor
```

#### Limitations & Known Issues

##### v0.1.0 Limitations

- Prune not implemented — gts prune shows preview but doesn’t actually delete

- No cross-machine restore — Snapshots are local only

- No selective restore — Restores all files, not single files

- Hook timing — The file.edited hook timing from OpenCode should be verified in production

- Large files skipped — Files over 10MB are not snapshot (configurable)

- Disk space check — Requires 100MB free or snapshot fails

##### What Could Go Wrong

ScenarioWhat HappensDisk fullSnapshot fails with error, but command still runsGit not installedPlugin warns but doesn’t break OpenCodeLock file presentWaits for previous snapshot to finishNetwork issuesN/A — all local, no network requiredCorrupt shadow repoRun gts doctor to diagnose

#### Uninstalling

To remove Git That Shit:

- Remove from opencode.json:

```
{
 "plugins": []
}
```

- Optionally delete the shadow repo:

```
rm -rf .git-that-shit
```

#### Testing

```
npm run build
npm test
```

#### Roadmap

Future versions may include:

- Bundle export for portability (share snapshots as archive)

- Selective restore (single file restore)

- Snapshot comparison UI

- Integration with more coding agents

- Cloud backup option

#### License

Apache-2.0

#### Support

If you encounter issues:

- Run gts doctor for diagnostics

- Check .git-that-shit/snapshots/.git-that-shit/manifest.jsonl for snapshot history

- Review .git-that-shit/config.json for configuration issues

---

## Opencode Git That Shit v0.1.0

*Source: `opencode-git-that-shit-plugin/`*

### Opencode plugin - Git That Shit v0.1.0

Safety plugin for AI coding agent sessions — automatic config snapshots before destructive operations

Oh Shit Git is what you say after the disaster. Git That Shit is what the tool does before the disaster.

Automatic pre-disaster snapshots for OpenCode AI coding agent config and state files.

#### What is Git That Shit?

Git That Shit is a safety plugin for OpenCode AI coding agent sessions. It automatically snapshots fragile configuration and agent state files into a separate shadow git repository before risky operations.

The product exists because one malformed JSON edit, one extra whitespace-sensitive config mistake, one bad agent command, or one accidental overwrite can break an entire coding environment. Git That Shit makes those failures recoverable.

#### Why it exists

AI coding agents (OpenCode, Claude Code, Aider, Codex) operate with elevated privileges over project files. Unlike human developers who hesitate before destructive acts, agents execute commands confidently — and sometimes catastrophically.

Why project git is not enough:

- Git is not always present

- Config files are often in .gitignore or untracked

- Git records changes after they happen, not before

- Most users don't commit before every risky operation

Git That Shit is inspired by etckeeper — the Linux tool that automatically commits /etc to git before package manager operations.

#### What it protects

By default, Git That Shit tracks:

- opencode.json - OpenCode main config

- .opencode/state/checkpoint.json - Session state

- .opencode/state/handoff.md - Handoff document

- .opencode/state/checkpoint-history.json - Checkpoint history

- package.json, tsconfig.json - Project configs

- Build configs (vite.config.ts, webpack.config.js, rollup.config.js, etc.)

- Docker configs (Dockerfile, docker-compose.yml)

- .env.example, .env.sample, .env.template - Env templates (NOT actual .env files)

#### What it does NOT protect

- Not a replacement for project git — use project git for code

- Not a general backup system — focused on config/state files only

- Not secret management — excludes .env by default (actual secrets)

- Not cloud sync — local git only

- Not for other AI agents — only tested with OpenCode

#### Installation

```
npm install @gitdamnit/opencode-git-that-shit
```

#### OpenCode Plugin Setup

Create opencode.json in your project:

```
{
  "plugins": [
    "@gitdamnit/opencode-git-that-shit"
  ]
}
```

Or use the local path for development:

```
{
  "plugins": [
    "./node_modules/@gitdamnit/opencode-git-that-shit"
  ]
}
```

#### How It Works

##### Shadow Git Repository

Git That Shit creates an isolated shadow git repository that is completely separate from your project's .git:

- Location: .git-that-shit/snapshots/

- Config: .git-that-shit/config.json

- Never touches your real git — completely independent

This means:

- Your project's git history stays clean

- Git That Shit's commits don't appear in your normal git log

- The shadow repo only stores config/state file snapshots

##### Auto-Triggers

Git That Shit automatically creates snapshots before risky operations:

  Trigger Type
  Commands/Events Detected

  Destructive Git
  git reset --hard, git reset --mixed, git clean -fd, git stash drop, git checkout -f, git rebase --abort (during conflict)

  Risky Package Ops
  npm install, npm ci, yarn install, yarn add, pnpm install, pnpm add, bun install

  Config File Edits
  Writing to .json, .yaml, .yml, .toml, .ini files that match tracked patterns

  Session Events
  On new session start, on context compaction

##### Hooks

Git That Shit uses these OpenCode hooks:

- tool.execute.before - Fires before any bash/shell command runs

- file.edited - Fires after file modifications

- event - Fires on session.created and session.compacted

##### Plugin Execution Order

Git That Shit runs after other plugins in the hook chain. This is important:

- Other plugins (like Stranger Danger) process tool arguments first

- Git That Shit snapshots the result after other plugins have modified things

This means Git That Shit captures the "safe" version of files after other security plugins have redacted secrets.

#### IMPORTANT: What NOT to Use With This

##### Other AI Coding Agents (Not Compatible)

Git That Shit is specifically built for OpenCode and may conflict with or not work properly with:

- Claude Code (has its own safety mechanisms)

- Aider (different hook system)

- Codex (different architecture)

- Cursor (has built-in git integration)

- Windsurf (has built-in safety)

If you're using OpenCode in a project that also uses other AI agents, Git That Shit's snapshots may not capture changes made by those other agents.

##### Other OpenCode Plugins

Git That Shit should work fine with most other OpenCode plugins, but be aware:

- Plugin order matters — Git That Shit's snapshots happen after other plugins process

- Disk space — If you have many plugins creating files, the shadow repo will grow

- Lock conflicts — Only one snapshot can run at a time; subsequent triggers wait

##### Not for Production CI/CD

This plugin is designed for interactive AI coding sessions. Do not:

- Use in automated CI/CD pipelines

- Rely on it for production disaster recovery

- Use as your only backup solution

#### CLI Usage

Run these commands in your terminal (not inside OpenCode):

```
gts status              # Show status
gts list                # List recent snapshots
gts diff         # Show what changed
gts restore     # Restore (dry-run by default)
gts snapshot            # Manual snapshot
gts prune               # Prune old snapshots (dry-run)
gts config              # Show configuration
gts init                # Initialize shadow repo
gts doctor              # Run health checks
gts version             # Show version
```

##### Restore examples

```
# Dry-run (default) - shows what would happen
gts restore abc1234

# Real restore - actually overwrites files
gts restore abc1234 --yes

# List first to find the hash
gts list
gts diff 719ab88
```

#### Configuration

Config is stored at .git-that-shit/config.json:

```
{
  "version": "0.1",
  "tracking": {
    "include": ["opencode.json", ".opencode/state/*.json", "*.config.js"],
    "exclude": [],
    "allowSensitiveFiles": false
  },
  "destructiveOps": {
    "riskyPackageManagerOps": true,  // Snapshot before npm/yarn/pnpm install
    "configWrites": true              // Snapshot before config file edits
  },
  "fileEdits": {
    "mode": "pre-if-available",       // pre-if-available, post-edit, or disabled
    "debounceMs": 2000                // Wait 2s before snapshot on file edits
  },
  "secrets": {
    "redactKeys": ["token", "apiKey", "password", "secret", "credential"],
    "warnOnSensitive": true
  },
  "snapshot": {
    "maxFileSizeMb": 10,             // Skip files larger than 10MB
    "minDiskSpaceMb": 100             // Fail if less than 100MB free
  },
  "restore": {
    "autoPreRestoreSnapshot": true   // Create snapshot before restore
  }
}
```

##### Configuration Options Explained

  Option
  What it does

  tracking.include
  Glob patterns for files to snapshot

  tracking.exclude
  Additional patterns to skip

  destructiveOps.riskyPackageManagerOps
  Enable/disable npm/yarn snapshots

  destructiveOps.configWrites
  Enable/disable config file write snapshots

  fileEdits.mode
  When to snapshot: before, after, or disabled

  secrets.redactKeys
  JSON keys to redact in snapshots

  snapshot.maxFileSizeMb
  Skip files larger than this

  restore.autoPreRestoreSnapshot
  Auto-snapshot before each restore

#### Secret Handling

Git That Shit takes secrets seriously:

- .env files are EXCLUDED — actual env files with secrets are never tracked

- Sensitive file patterns blocked — *.pem, *.key, id_rsa, credentials.json, etc.

- JSON value redaction — Values with keys like token, apiKey, password are replaced with [REDACTED]

- Warning system — Alerts if you try to track sensitive files

To explicitly allow sensitive files (NOT RECOMMENDED):

```
{
  "tracking": {
    "allowSensitiveFiles": true
  }
}
```

#### Restore Workflow

When something breaks:

- Identify the problem — "My opencode.json is corrupted!"

- List snapshots — gts list

- Preview changes — gts diff <hash>

- Dry-run restore — gts restore <hash> (shows what would happen)

- Confirm restore — gts restore <hash> --yes

Restore always defaults to dry-run — it's safe by default.

#### Doctor Command

Run health checks:

```
gts doctor
```

Checks:

- Git availability and version

- Config file validity

- Shadow repo exists and is valid git

- Manifest file readable

- No lock file conflicts (means no snapshot in progress)

- Sufficient disk space

- No sensitive files accidentally tracked

- Project git untouched (shadow repo is independent)

#### Plugin Tools (Direct Use in OpenCode)

You can call these directly in your OpenCode conversations:

```
@tool gts_status
@tool gts_list
@tool gts_diff hash=
@tool gts_restore hash=
@tool gts_snapshot
@tool gts_prune
@tool gts_config
@tool gts_doctor
```

#### Limitations & Known Issues

##### v0.1.0 Limitations

- Prune not implemented — gts prune shows preview but doesn't actually delete

- No cross-machine restore — Snapshots are local only

- No selective restore — Restores all files, not single files

- Hook timing — The file.edited hook timing from OpenCode should be verified in production

- Large files skipped — Files over 10MB are not snapshot (configurable)

- Disk space check — Requires 100MB free or snapshot fails

##### What Could Go Wrong

  Scenario
  What Happens

  Disk full
  Snapshot fails with error, but command still runs

  Git not installed
  Plugin warns but doesn't break OpenCode

  Lock file present
  Waits for previous snapshot to finish

  Network issues
  N/A — all local, no network required

  Corrupt shadow repo
  Run gts doctor to diagnose

#### Uninstalling

To remove Git That Shit:

- Remove from opencode.json:

```
{
  "plugins": []
}
```

- Optionally delete the shadow repo:

```
rm -rf .git-that-shit
```

#### Testing

```
npm run build
npm test
```

#### Roadmap

Future versions may include:

- Bundle export for portability (share snapshots as archive)

- Selective restore (single file restore)

- Snapshot comparison UI

- Integration with more coding agents

- Cloud backup option

#### License

Apache-2.0

#### Support

If you encounter issues:

- Run gts doctor for diagnostics

- Check .git-that-shit/snapshots/.git-that-shit/manifest.jsonl for snapshot history

- Review .git-that-shit/config.json for configuration issues

---

## Opencode Stranger Danger v0.1.0

*Source: `opencode-stranger-danger-v010/`*

### Opencode plugin - Stranger Danger v0.1.0

Secret and PII redaction guard for AI coding agents — OpenCode plugin

#### Problem

Every secret scanner checks your files. None check what goes into the LLM's context window. A secret can be clean in your repo and still get sent to a cloud API inside a prompt, checkpoint, or shell summary.

#### What I Built

strangerDanger operates at three layers to catch what others miss:

- Layer 1: File-level (before reads) — Intercepts file reads, redacts secrets in-place before the agent sees them.

- Layer 2: Context-level (before compaction) — Scans everything injected into the LLM context during session compaction. Also scans outbound user messages.

- Layer 3: Output-level (after tool execution) — Scans tool outputs before they're written to disk.

~160 rules vendored from gitleaks, plus clean-room additions for AI/ML providers, and entropy-based detectors for Base64, Hex, and Alphanumeric strings.

#### Tech Stack

- Package: @gitdamnit/stranger-danger (npm)

- Ecosystem: OpenCode plugin system + standalone CLI (sd binary)

- Detection: gitleaks rules, clean-room AI provider rules, entropy-based detectors

- Architecture: Zero runtime dependencies beyond @opencode-ai/plugin. Node.js built-ins only.

- Audit: JSONL audit log at .opencode/state/strangerdanger-audit.jsonl

#### Screenshots

Screenshots coming soon.

#### Live Demo

N/A — this is an npm package and OpenCode plugin.

Install with: npm install @gitdamnit/stranger-danger

#### GitHub / Code

Public npm package. Source available on npm registry.

#### Status

Published npm package

#### What It Shows

Understanding that AI agent security isn't just about file scanning — it's about protecting the context window. Ability to build developer tooling with zero dependencies, clean architecture, and real-world threat coverage.

---

## YMCAgent Assist

*Source: `ymcagent-assist/`*

### YMCAgent Assist

Onboarding and Recruiting Command Center

#### Problem

HR and recruiting workflows involve repetitive candidate review, status tracking, and communication tasks that are time-consuming and error-prone. Existing tools don't fit the specific workflow of YMCA talent operations.

#### What I Built

A prototype AI-assisted agent that helps with candidate review, prompt-based workflows, and model selection for internal HR operations. Designed around the actual pain points of a recruiting workflow — not a generic chatbot wrapper.

#### Tech Stack

- Frontend: TBD (React/Vite or similar)

- Backend: TBD

- AI/ML: Multiple model support with selection logic

- Deployment: Docker container, planned subdomain ymca.evanzellner.com

- Routing: Cloudflare Tunnel

#### Screenshots

Screenshots coming soon.

#### Live Demo

Planned subdomain: ymca.evanzellner.com. Public demo status TBD depending on API key management and security setup. May remain internal-only if it handles real candidate data.

#### GitHub / Code

Private/internal repository. Code available selectively.

#### Status

Active prototype

#### What It Shows

Ability to translate HR/recruiting workflow pain into a working AI-assisted internal tool. Domain knowledge in recruiting combined with practical software design and deployment.

---
