# Practice Director: how it would be built

Consolidated 14 Nov 2026. The product design this serves is in [PLAN.md](PLAN.md). Nothing is built yet.

## 1. Stack

- Strict TypeScript, ES modules, built with Vite into an installable, offline-capable web app. No server and no accounts.
- **A custom interface with no framework**, as in Study Director, but on a small in-house kit of a few hundred lines instead of freehand DOM code:
  - reactive state, so a screen can never show stale data;
  - a component convention (a function that returns elements) and a keyed-list helper;
  - a router and one motion layer (shared-element and page transitions, springs, reduced-motion support);
  - a design system of tokens and about twenty components, as laid out on the mock-up's design-system sheet. Screens are assembled only from these.
- Why not freehand: Study Director and Practice Desk both show the cost (a 12,000-line host file; hand-written code to stop re-renders destroying focus and input).
- Why not Preact, Svelte, Solid or Lit: each would work, but each adds a dependency for benefits the kit already gives. Polish comes from the design system and motion layer, not from a framework.
- Runtime libraries kept: ts-fsrs, KaTeX, Wordgard.

## 2. Modules

```text
src/
  kernel/     ids, time, hashing, validation (no DOM)
  content/    syllabus, questions, prompts, papers, editions, exam templates
  attempt/    test engine, scoring, timing
  memory/     one memory schedule
  planner/    what to offer today, the time you allow, load forecast
  evidence/   one add-only history and the views derived from it
  store/      device storage, backup, sync
  ui/kit/     reactive state, components, router, motion
  ui/         design system and screens
  assist/     AI with a key (later, optional)
packs/        exam templates, syllabus packs, paper maps
tools/        content command-line tools for agents
```

Features are modules that register their own record types with one shared storage, backup and sync layer.

## 3. Data model

- **Exam**, **Topic**, **Question**, **Prompt**, **Paper** (with editions), **Session or Attempt**.
- **One history**, add-only: answered a question, recalled a prompt, wrote an answer, logged outside practice, studied or reread a topic.
- **Derived views**, always rebuildable from the history: memory state per item, topic freshness, the mistake list, what a topic tends to lose, today's offer, the load forecast.
- **Dates**: exams, scheduled papers, the hours you allow. The calendar itself lives in Study Director.

One memory schedule serves recalled prompts, re-attempted questions and quick cards, with separate settings per kind, because recalling a topic and re-solving a question behave differently. A fixed 90% retention target is the only policy; Revision Director's own benchmark showed the alternative cost about 18% more sessions.

## 4. Storage, sync and safety

- IndexedDB for records; browser file storage for images, PDFs, clips and answer photos.
- One backup file format, optionally encrypted, with versions to go back to.
- Export of everything as plain readable files.
- Google Drive sync for laptop and phone on the mechanism shared with Study Director ([ECOSYSTEM.md](ECOSYSTEM.md), section 6). The history only grows, so two devices merge by union and only new entries are uploaded. A test in progress belongs to one device at a time.

**Safety, reduced without loss.** Kept: the add-only history, writes that land whole or not at all, an integrity check on every backup and restore, backup versions, one writing tab at a time, tested restore. Not carried over from the two source apps: machinery that guarded the old data models, such as re-verifying every memory card against scheduler fingerprints, per-record revision counters in two stores, and scheduler rebases. Views rebuilt from the history make those unnecessary.

## 5. What is reused

| From | Carried over | Left behind |
|---|---|---|
| Practice Desk | Question and paper model, validation, test engine, scoring, timing evidence, calculator, the test player, original and corrected editions, mistake notebook logic, analytics, maths and image viewers, Wordgard authoring, agent content tools | SSC CGL papers as built-in content (an optional sample pack), the single-file build, the current screens |
| Revision Director | The memory scheduler, the daily planner's signals (exam proximity, weakness, balance, interleaving, time), corrective relearning, sticking-point escalation, duration learning, interruption-aware timing | The unit and obligation forms, Study Log tab, plug-in runtime, the script-concatenation build, replay and rebase machinery, the current screens |
| Calendar | Its export code only, for "Add to my calendar" | Everything else; its home is Study Director |
| Study Director | The sync and backup mechanism, encryption and integrity primitives, install and update flow, phone safe-area handling, notification and sound handling, the pacer | Planner, timer and notes stay there |

Practice Desk and Revision Director are frozen once Practice Director reaches parity with each. Both source apps carry their own scheduler, optimizer, store, backup format and tab guard; one of each remains.

**Deferred, perhaps for good**: personal tuning of the memory model (the optimizer both apps built). It needs thousands of reviews to beat the standard settings and brings a large component for a small gain.

## 6. Tests

Carry over the tests that guard pure logic: scoring, attempt rules, the memory schedule, planner determinism, backup integrity. Drop the old acceptance and visual suites, which test screens that will no longer exist. Add a small set of browser journeys for the core flows at laptop and phone widths, with screenshots looked at before any interface change is called done.

## 7. Phases

Each phase ends with something usable daily.

| Phase | Delivers | Replaces |
|---|---|---|
| 0. Design | The mock-up, drawn end to end for Practice Director with a design-system sheet (see `design/README.md`). Every Practice Director screen is drawn; Study Director's are a separate pass. The owner approves before build. | — |
| 0b. Content | Syllabus packs for Forestry, Geology, General Knowledge and Prelims; paper maps for recent Prelims papers; past Mains questions mapped to topics. In Claude Code sessions, alongside phase 1. | — |
| 1. Remember | Interface kit and design system, storage, syllabus checklist, memory schedule, recall with tap-what-you-missed, Today, backup file | Revision Director |
| 2. Rehearse | Answer-sheet mode with paper maps and clipping, results, mistake re-attempts, cross-check, outside-practice log | Practice Desk (core) |
| 3. Write | Written answers on the marks-weighted clock, full-paper rehearsal, missed points to cards, Copy for AI, Paste from AI | — |
| 4. Sync | Google Drive sync, backup versions, readable export, phone polish, install flow | — |
| 5. See | Progress, targets, load guard, weekly summary, daily anchor, search, print, Add to my calendar | — |
| 6. Full papers in-app | Question bank, test player, set builder, paper editions; in-app authoring last | Rest of Practice Desk |
| 7. Wider use | More exam packs, pack sharing, onboarding for other students | — |
| 8. The seam | The three links to Study Director | — |
| Later, optional | AI with a key; memory-model tuning | — |

Written answers come early because IFoS rank is decided in Mains, which is entirely written. The in-app test player comes after only because Prelims and Mains are sat on paper and answer-sheet mode covers them from phase 2; it is a port of a working player, and it is not in doubt.

Work that belongs to Study Director (the calendar, the left-over tray, its side of the seam) is a separate project in that repo.

## 8. Capabilities by phase

Everything in PLAN.md that is not named in the phase table above, with where it lands.

| Phase | Capability |
|---|---|
| 1 | Any length of time typed as well as picked; prompt forms (explain, list, compare, draw, sequence); sticking points; time estimates learned from your pace; Read next; the optional source line; choose-your-own by subject, kind and length; a sample-data preview and an in-app guide; exam templates with known dates offered for acceptance; quick cards from a pasted list |
| 2 | Sure · 50-50 · Guess; entering a key by paste, photo or tap; timed and untimed sittings; the briefing before a paper; saving a question; a one-line lesson on a mistake; clipping the explanation; changed answers; speed against accuracy; accuracy by question type; keyboard shortcuts and text size; screen stays awake and sound cues during timed work |
| 3 | The pacer across a whole paper; the choose-your-questions step; the diagram check; General English through the same flow; a photo of the page |
| 5 | Phases drafted by the app and approved or adjusted by you; "what you tend to leave out" as a printable sheet; a minimum day; coming back after a gap |
