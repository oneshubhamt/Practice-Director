# Practice Director: how it would be built

Consolidated 14 Nov 2026; sections 1 to 5 revised 15 Nov after a review of the architecture and the data design. The product design this serves is in [PLAN.md](PLAN.md); what is stored is in [DATA.md](DATA.md); the exact rules the app follows are in [RULES.md](RULES.md). Nothing is built yet.

## 1. Stack

- Strict TypeScript, ES modules, built with Vite into an installable, offline-capable web app. No server and no accounts.
- **A custom interface with no framework**, as in Study Director, but on a small in-house kit of a few hundred lines instead of freehand DOM code:
  - reactive state, so a screen can never show stale data;
  - a component convention (a function that returns elements) and a keyed-list helper;
  - a router and one motion layer (shared-element and page transitions, springs, reduced-motion support);
  - a design system of tokens and about twenty components, as laid out on the mock-up's design-system sheet. Screens are assembled only from these.
- Why not freehand: Study Director and Practice Desk both show the cost (a 12,000-line host file; hand-written code to stop re-renders destroying focus and input).
- Why not Preact, Svelte, Solid or Lit: each would work, but each adds a dependency for benefits the kit already gives. Polish comes from the design system and motion layer, not from a framework.
- Runtime libraries: ts-fsrs, KaTeX, Wordgard, and **a PDF renderer (pdf.js), which is new and was approved by the owner on 15 Nov**: none of the four source apps shows a PDF, and the answer sheet and clipping both need one. The browser's own PDF viewer was considered and is not enough: a page that embeds it cannot learn which page is showing, cannot draw a clip box on it or read the picture under the box, and phone browsers do not show it inside a page at all. The renderer is the one Firefox itself uses; it loads only when a paper is opened.
- **Each screen loads only what it uses.** Today, Syllabus and Progress need none of the four libraries. The PDF renderer loads with a paper, KaTeX with a question that has maths, Wordgard with the authoring studio. The PDF renderer and the packing of backups run off the main thread, and only the page in view (and its neighbours) is kept drawn.

## 2. Modules

```text
src/
  core/           no screen, no storage, no clock: the date is passed in
    rules.ts      every number in RULES.md, named, in one place
    kernel/       ids, change stamps, the 04:00 day, fingerprints, validation
    content/      topics, papers, questions, editions; reads banks
    attempt/      test engine, scoring, timing
    memory/       the one memory schedule
    planner/      what to offer today, the time you allow, load forecast
    derive/       works out everything shown from records and facts
  data/
    store/        the database and the file store; the only code that touches them
    sync/         files out, files in, joining two copies; the engine sits behind a port
    backup/       one file out, one file in; the readable export
  app/            commands (the one way anything is written), start-up
  ui/kit/         reactive state, components, router, motion
  ui/             design system and screens, loaded per screen
  assist/         AI with a key (later, optional)
question-banks/   content in Practice Desk's form: catalogue → exam → year → paper
tools/            content command-line tools for agents
```

Four rules hold the shape:

1. **`core` is pure.** It never touches the screen, the database or the clock, so all of it runs in a plain test with no browser, and the same inputs always give the same result.
2. **One way in.** A screen never writes to storage. It issues a command ("recall checked", "topic ticked"); the command writes one record or fact in a single step that lands whole or not at all; `derive` updates what is shown; the screen redraws from that. Undo, the one-writing-tab check and sync all hang on this one path.
3. **One list of what is stored.** Every kind of record and fact is declared in one table: its fields, whether it syncs, how two copies join. Validation, backup and export are read from that table, not written again per feature.
4. **Dependencies point one way**: `ui` → `app` → `core` and `data`. `core` and `data` do not know each other; `app` joins them. A lint rule enforces it.

## 3. Data

Set out in full in [DATA.md](DATA.md). In brief:

- **Bank content** follows Practice Desk's question-bank form, is fetched for the exams you sit, and is never copied into your data.
- **Records** (settings, dates, ticks, marking points, lessons, your papers) are small and replaced in place.
- **Facts** (a recall, a sitting, a written answer) are compact, written once, and corrected in place.
- **Files** (clips, PDFs, photos) are stored once each, by fingerprint.
- **Everything else on screen is worked out and never stored**: memory dates, scores, the mistake list, progress, today's offer.

One memory schedule serves recalled topics, re-attempted questions and quick cards, with separate settings per kind, because recalling a topic and re-solving a question behave differently. A fixed 90% retention target is the only policy; Revision Director's own benchmark showed the alternative cost about 18% more sessions. The schedule uses no chance, so that replaying the same recalls always gives the same dates.

## 4. Storage, sync and safety

- On the device: one database with three stores (records, facts, this device only) and the browser's file store for files. See [DATA.md](DATA.md), section 5.
- Between devices, on the owner's Google Drive: one small changes file per device, written only by that device, and versions built from pieces named by fingerprint, with facts in one piece per month. Joining is record by record; where both devices changed the same record the later change wins; there is no review queue. Files, PDFs included, go up by default and come down only where they are opened. See [DATA.md](DATA.md), section 6.
- Earlier versions live where backups live and cost only what changed. One backup file by hand; a readable export. See [DATA.md](DATA.md), section 7.
- The sync engine is shared with Study Director in intent ([ECOSYSTEM.md](ECOSYSTEM.md), section 6), and that engine is to be overhauled. Practice Director's side is written against a small port (carry these files, tell changed from unchanged, keep versions), so it can sit on the overhauled engine, or on a small engine of its own until that is ready.

**Safety, reduced without loss.** Kept: writes that land whole or not at all, a fingerprint check on every file sent or received, versions to go back to, one writing tab at a time, a tested restore, and recovery by itself when a device's storage has been emptied. Not carried over from the two source apps: a copy of the paper inside every attempt, re-verifying every memory card against scheduler fingerprints, per-record revision counters in two stores, and scheduler rebases. Working the schedule out from the facts each time makes those unnecessary.

## 5. What is reused

How directly each part comes over was checked against the code on 15 Nov.

| From | Comes over as it is | Comes over reworked | Left behind |
|---|---|---|---|
| **Practice Desk** (TypeScript modules, the same form this app uses) | The test engine and scoring (`src/engine`, about 1,000 lines, no browser code); the question and paper model and its validation (`src/domain`, `src/content`); the scheduler adapter and its port (`src/learning`, about 140 lines), with chance switched off; the calculator; the question-bank form and its content tools (`question-banks/`, `scripts/`) | Attempts, which stop carrying a copy of the paper; mistake and analytics logic, which read facts and are no longer stored; editions, stored as changes only; the authoring studio (late phase), which is tied to its screens | SSC CGL papers as built-in content (an optional sample pack), its history stores, the single-file build, every screen |
| **Revision Director** (TypeScript in 27 ordered parts that share one scope and are joined into one script; typed and layered, but with no imports or exports) | Nothing as a file | The planner's signals (exam proximity, weakness, balance, interleaving, time), sticking-point escalation, corrective relearning, learning how long things take, and interruption-aware timing: each is rewritten as a small pure function over topics and facts, with its existing tests as the specification | Its scheduler (Practice Desk's does the same job in a fifth of the code), units and obligations, stored cards and their fingerprints, replay and rebase machinery, the plug-in runtime, every screen |
| **Calendar** (TypeScript modules) | Its calendar-file export (`src/interoperability/ics.ts`), for "Add to my calendar" | — | Everything else; its home is Study Director |
| **Study Director** (plain JavaScript in its own module registry) | — | The pacer's arithmetic (its code is tied to Study Director's screen); install and update flow, phone safe-area handling, notification and sound handling, as patterns; the sync engine once its overhaul is done | Planner, timer and notes stay there |

In short: Practice Desk's core drops in nearly unchanged, because it is already written the way this app will be. Revision Director contributes its ideas and its tests more than its files; turning the whole of it into modules would not change that, because most of it (units, obligations, stored cards, its screens) is left behind. Only the few parts being carried need the conversion, and they are converted as they are carried. The largest new pieces, with no source in any of the four, are the interface kit, the PDF answer sheet with clipping, and written answers.

Practice Desk and Revision Director are frozen once Practice Director reaches parity with each. Both source apps carry their own scheduler, optimizer, store, backup format and tab guard; one of each remains.

**Deferred, perhaps for good**: personal tuning of the memory model (the optimizer both apps built). It needs thousands of reviews to beat the standard settings and brings a large component for a small gain.

## 6. Tests

Carry over the tests that guard pure logic: scoring, attempt rules, the memory schedule, planner determinism, backup integrity. Drop the old acceptance and visual suites, which test screens that will no longer exist. Add a small set of browser journeys for the core flows at laptop and phone widths, with screenshots looked at before any interface change is called done.

## 7. Phases

Each phase ends with something usable daily.

| Phase | Delivers | Replaces |
|---|---|---|
| 0. Design | The mock-up, drawn end to end for Practice Director with a design-system sheet (see `design/README.md`); the data design ([DATA.md](DATA.md)); the rules behind the screens ([RULES.md](RULES.md)). All three are written. The owner approves before build. | — |
| 0b. Content | Syllabus packs for Forestry, Geology, General Knowledge and Prelims; paper maps for recent Prelims papers; past Mains questions mapped to topics. In Claude Code sessions, alongside phase 1. | — |
| 1. Remember | Interface kit and design system, storage as set out in DATA.md, syllabus checklist, memory schedule, recall with tap-what-you-missed, Today, backup file, bringing in a bank of your own | Revision Director |
| 2. Rehearse | Answer-sheet mode with paper maps and clipping, results, mistake re-attempts, cross-check, outside-practice log | Practice Desk (core) |
| 3. Write | Written answers on the marks-weighted clock, full-paper rehearsal, missed points to cards, Copy for AI, Paste from AI | — |
| 4. Sync | Google Drive sync, backup versions, readable export, phone polish, install flow | — |
| 5. See | Progress, targets, load guard, weekly summary, the daily reminder as a calendar event, search, print, Add to my calendar | — |
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
| 2 | Sure · 50-50 · Guess; entering a key by paste, from a solutions PDF or by tap (reading one from a photo is parked); timed and untimed sittings; the briefing before a paper; saving a question; a one-line lesson on a mistake; clipping the explanation; changed answers; speed against accuracy; accuracy by question type; keyboard shortcuts and text size; screen stays awake and sound cues during timed work |
| 3 | The pacer across a whole paper; the choose-your-questions step; the diagram check; General English through the same flow; a photo of the page |
| 5 | Phases drafted by the app and approved or adjusted by you; "what you tend to leave out" as a printable sheet; a minimum day; coming back after a gap |
