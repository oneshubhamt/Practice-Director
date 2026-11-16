# Practice Director: how the building is run

Written 16 Nov 2026 at the owner's request: a detailed plan and process for having the app built by an agent, in one chat or across many. It turns the phases of [BUILD.md](BUILD.md), section 7, into **work packages**, each small enough for one session, each with a list of what to read, what to build and how to know it is done.

It rests on the recommendations in [DECISIONS.md](DECISIONS.md), section 7 (A to G). Where the owner decides otherwise, the package that changes is named there and here.

## 1. Who does what

| | Does |
|---|---|
| **The owner** | Starts each session with the short message in section 3. Tries what the package delivered, on real devices. Answers the questions a session leaves. Decides everything in DECISIONS.md, section 7. Merges finished work. |
| **The building agent** | One package per session: reads what the package lists, builds it, proves it against the package's checks, writes down what happened, pushes. It does not redesign. Where the documents are silent or contradict each other it stops and asks. |
| **A reviewing session** | At the end of each phase, a fresh session reads the code against the documents and the four rules of the code, and lists what has drifted. Fresh eyes catch what the builder cannot. |
| **Content sessions** | Prepare the syllabus, patterns, maps and past questions (section 8). They run beside the building and never wait for it. |

## 2. What every session rests on

Three files keep a session from needing the whole history:

| File | Holds | Changed by |
|---|---|---|
| `CLAUDE.md` (root) | What this repository is, the order to read things in, the rules of the code, the commands. Short. | Rarely |
| `docs/STATUS.md` | Which packages are done, which is next, what is waiting on the owner, notes for the next session | Every session, at its end |
| This document | The packages | When the plan changes |

The design documents stay the authority. **If the code and a document disagree, one of them is wrong and the session says which**; it does not quietly follow the code. When a session changes behaviour on the owner's word, it changes the document in the same commit.

## 3. The routine of a session

**To start one**, the owner writes:

```text
Build package <number> of docs/IMPLEMENTATION.md.
```

Add "and open a pull request when its checks pass" if you want one. For a package that ports code, the session must be able to read the source repository (Practice Desk, Revision Director or Calendar); it adds the repository itself and asks if that is refused.

**The session then:**

1. Reads `CLAUDE.md`, `docs/STATUS.md`, and its package below.
2. Reads only the document sections and mock-up boards the package lists. Each board has a picture in `design/reference/` and its source in `design/mockup/`; the source also shows the states a single picture cannot (tabs, sheets, steps).
3. Says in a few lines what it will build and anything it finds unclear. If something is truly the owner's to decide it asks then, not at the end.
4. Builds, with tests written beside the code.
5. Proves the package: runs its checks, and for a screen takes screenshots at 390, 820 and 1440 wide in both themes and **looks at them beside the board**.
6. Updates `docs/STATUS.md`, commits, pushes.
7. Ends with a short report: what now works, three to six things for the owner to try, what was left out and why, and any question.

**A session stops and asks** when: two documents, or a document and a board, contradict each other; a new dependency seems needed; a stored format would change after a phase has been used with real data; anything would delete data; content it needs does not exist.

**A session never**: adds a dependency on its own; stores something that can be worked out; puts a number of RULES.md anywhere but `core/rules.ts`; lets a screen write to storage; skips or weakens a test to pass; changes what a screen says or does because it was easier.

## 4. Done means

A package is done when all of these hold. They are the same for every package.

1. Its own checks, listed with it, pass.
2. `npm run check` passes: types, the dependency-direction test, every unit test, the speed and size budgets.
3. Any screen in it matches its board at three widths in both themes, by looking; the report lists each difference as intended or fixed.
4. Every control in it works by keyboard, shows focus, has a name, and is at least 40 points to touch.
5. Nothing worked out is stored; nothing is written except through a command.
6. `docs/STATUS.md` is updated and the work is pushed.

## 5. The ground the code stands on

Decided here so that no session has to.

| Matter | Choice | Why |
|---|---|---|
| Language and build | Strict TypeScript, ES modules, Vite, on Node 22 or later (what a build session has). Versions pinned exactly. | BUILD.md, section 1 |
| Runtime libraries | `ts-fsrs` from package 1.3; `pdfjs-dist` from 2.2; `katex` and `wordgard` in phase 6. Nothing else without the owner. | BUILD.md, section 1 |
| Tests of pure code | Node's own test runner, reading TypeScript directly, as Practice Desk does. No test framework. | Ported tests arrive in that form; one dependency fewer |
| Tests in a browser | Playwright with Chromium: the store, and a few journeys per phase. Safari on the iPad is checked by the owner from a short list at each phase's end. | Only Chromium is in the build sessions |
| Dependency direction | A test that reads the import graph and fails on a wrong arrow, modelled on Practice Desk's `architecture-boundaries` test. No lint tool. | BUILD.md, section 2, rule 4 |
| Routes | In the address after `#`. | Works on any static host with no set-up, and an installed app never shows its address |
| Offline | A service worker written by hand (about a hundred lines): the app shell first, then each screen's part and the bank for your exams as they are first used. | No plug-in needed for this little |
| Files on the device | The browser's private file system, with a fallback to the database for a browser that lacks it. Behind one small interface in `data/store`. | DATA.md, section 5 |
| Wording | Copied from the boards exactly. New wording follows the Design-system board's rules for words. | The wording was part of the design |
| Sample data | One made-up year of records and facts, produced by a script with no chance in it. Used by tests, by screenshots, and by the guide's preview. It reproduces the mock-up's story in kind (the same exams, papers and kinds of mistake), not to the digit. | One body of data for three uses |
| Ported code | Copied at a named commit. `PROVENANCE.md` lists each file: where it came from, the commit, what was changed. | Decision B |
| Branches | Each session works on the branch it is given. Finished packages are merged into `main` by the owner. `main` does not exist yet: create it from the planning branch before package 1.0. | So that every new session starts from the latest work |
| Trying it on a phone | From package 1.7 every merge to `main` is published to the app's address (decision E). | Real devices from the first screen |

## 6. The packages

Sizes are rough: S is one session, M one or two, L two or three. **After** shows what must be done first; packages with the same "after" can run in separate sessions at the same time.

### Phase 1: Remember

Ends with an app that replaces Revision Director for daily use: tick what you studied, be offered what to recall, recall it, lose nothing.

| # | Package | Size | After |
|---|---|---|---|
| 1.0 | Ground | S | — |
| 1.1 | Contracts | M | 1.0 |
| 1.2 | Store | M | 1.1 |
| 1.3 | Memory | M | 1.1 |
| 1.4 | Bank | M | 1.1 |
| 1.5 | Interface kit | L | 1.0 |
| 1.6 | Planner and what is worked out | M | 1.3, 1.4 |
| 1.7 | Shell and Syllabus | M | 1.2, 1.4, 1.5 |
| 1.8 | Today | M | 1.6, 1.7 |
| 1.9 | Recall and quick cards | L | 1.8 |
| 1.10 | First run, Settings, guide | M | 1.9 |
| 1.11 | The app speaks up; history | M | 1.9 |
| 1.12 | Backup file; close of phase | M | 1.10, 1.11 |

**1.0 Ground.**
Read: BUILD.md 1, 2; this document 3 to 5.
Build: the folder tree of BUILD.md, section 2; `package.json` with `check`, `test`, `build`, `dev`, `journeys`, `shots`; strict `tsconfig`; Vite; the dependency-direction test; a budgets test that measures the built shell; a workflow that runs `check` on every push; the hand-written service worker; `core/rules.ts` holding every number in RULES.md, each named and with its reason; empty `PROVENANCE.md`.
Done when: a page saying "Practice Director" builds, installs, and opens with the network off; `npm run check` is green locally and in the workflow; a deliberately wrong import (a file in `core` importing from `ui`) makes the test fail.

**1.1 Contracts.**
Read: DATA.md 1 to 5; RULES.md 1, 15 (formats).
Build: in `core/kernel`, the one table of kinds: every record and every fact of DATA.md, section 3, with its fields, its checks, its format number, whether it syncs and how two copies join. Ids that carry the time. The count per device that each record carries from the first day (so that sync, in phase 4, needs no change to stored data). The day (04:00, the time-zone setting). Fingerprints. The formats of bank files: catalogue, family index, syllabus, pattern, paper map, paper, a bank of your own. The format of the backup file. The sample-data script.
Done when: every kind round-trips (made, checked, written as text, read back, equal); a wrong value in any field is refused with a message that names the field; `npm run contracts` prints the table as a readable document, which is committed as `docs/CONTRACTS.md`; the sample year passes every check.
Owner looks at: `docs/CONTRACTS.md`, the first place where "what is stored" is exact to the field.

**1.2 Store.**
Read: DATA.md 5; BUILD.md 2 (rule 2), 4; RULES.md 12.
Build: `data/store` (the database with its three stores, the file store, the marker outside the database, the request for lasting storage, upgrading old formats on read); `app/commands` as the only way to write, each command landing whole or not at all; undo of the last command; one writing tab.
Done when, in a real browser: a command interrupted half-way leaves nothing behind; a second tab is read-only and can take over; a database emptied behind the app's back is noticed at start through the marker; data in a newer format is left untouched and said so; a year of sample data loads into running totals inside the budget.

**1.3 Memory.**
Read: RULES.md 1, 2, 3; DATA.md 4.
Port: Practice Desk `src/learning/revision-scheduler-port.ts` and `fsrs-scheduler-adapter.ts` with the scheduler contract test; scatter off.
Build: `core/memory`: grading a recall from points missed; the three kinds; the ladder for mistakes; the window before an exam; rested items; many topics ticked at once; a split topic's history. One function: facts and records in, the state and next date of every item out.
Done when: each row of RULES.md, section 2, has a test named after it; the same facts give the same dates whatever order they arrive in and whatever "today" is asked about first; no date ever falls after its exam; ten thousand facts replay inside the budget.

**1.4 Bank.**
Read: DATA.md 2; RULES.md 4, 14; PLAN.md 8, 9.
Port: from Practice Desk, the reading and checking of its bank form (`src/content`, the catalogue test), and the content tools that still apply.
Build: `core/content` (topics, papers, patterns, maps, topic weights by the formula of RULES.md 4); `tools/publish` (from the written bank to what a device fetches: one index per family, one compact file per paper, pictures apart); fetching and keeping a family for offline use; bringing in a bank of your own as one file. A small test bank, hand-made.
Done when: the test bank publishes, is fetched, works offline and is dropped again; a broken bank file is refused naming the fault; weights add up to one within a paper; whatever real content exists by then (section 8) passes the same checks.

**1.5 Interface kit.**
Read: BUILD.md 1; PLAN.md 3, 12; the Design-system board and its source.
Build: `ui/kit`: reactive state; the component convention and keyed lists; the router; the motion layer with reduced motion; the colour roles for both themes and text size as tokens. Then the components on the Design-system board, and nothing that is not on it. A gallery page, for development only, laid out like that board.
Done when: the gallery matches the Design-system board in both themes at three widths; a list of a thousand rows updates one row without redrawing the rest or losing focus or typed text; every component works by keyboard; the kit is inside its share of the size budget.
**Gate:** the owner's answer on the mock-up (decision A) is wanted here, before screens are built on the kit.

**1.6 Planner and what is worked out.**
Read: RULES.md 4, 5, 6, 8; DATA.md 4.
Take from Revision Director, as ideas and test cases only (its code shares one scope and cannot be copied): the planner-policy and planner-properties tests, interruption-aware timing, learning how long things take.
Build: `core/planner` (value per minute, the list for Today, less time, the minimum day, choose-your-own, laying out what is over, the cost of a tick, the load forecast, drafting a road); `core/derive` (everything in DATA.md, section 4, that phase 1 shows).
Done when: each rule of RULES.md, sections 5, 6 and 8, has a test named after it; the list for a given day of the sample year is the same on every run; changing one number in `core/rules.ts` changes the list and nothing else needs touching.

**1.7 Shell and Syllabus.**
Read: PLAN.md 5 (Syllabus); boards Main, Syllabus, Syllabus-light, Phone-places, More-sheets (add topics).
Build: the rail on a laptop and the bar on a phone; the Syllabus place: the tree, ticking with its cost, memory bars with dates, Read next, the topic page, adding topics by pasting lines, the source line, resting a topic.
Done when: ticking a topic in the sample bank shows its first recall date and an Undo; a tree of 400 topics scrolls and ticks inside the speed budget on a phone-sized window; the screens match their boards.
Owner tries: the first thing that runs on the phone.

**1.8 Today.**
Read: PLAN.md 5 (Today); RULES.md 5, 11 (quick note); boards Main, Main-light, Today-states, Phone-places.
Build: countdowns; Suggested for today with a reason and a time on each line; Start; Less time (chips and a typed length); Choose your own; Your memory; the week strip; the quick note with what it understood and Undo; the other days of Today (a thin day, coming back, a paper day's place-holder).
Done when: every line's reason can be traced to a rule; a quick note that matches no topic clearly offers three and records nothing until one is chosen; the screens match their boards.

**1.9 Recall and quick cards.**
Read: PLAN.md 6 (Recall, Quick cards); RULES.md 2, 3; boards Phone-flow, Phone-flow-light, Recall-laptop, Quick-cards.
Build: a session on a phone and on a laptop: prompt, reveal, tap what you missed, the three buttons where there are no points, adding and editing points, the unverified mark and confirming it, the end of a session; quick cards from a pasted two-column list; time measured as RULES.md, section 1.
Done when: a full session can be done from the keyboard alone on a laptop and with one thumb on a phone; a session cut off (tab closed, phone locked) loses nothing already answered; the dates after a session are those package 1.3 gives for the same facts.
Owner tries: a real session on a real topic. This is the heart of phase 1.

**1.10 First run, Settings, guide.**
Read: PLAN.md 5 (First run, Settings); boards First-run, Settings, Guide, Memory-schedule, More-sheets (exam date and target, shortcuts).
Build: first run in under two minutes, with the road drafted and shown for approval; Settings as far as phase 1 reaches (exams and dates, time allowed, time zone, theme, text size, shortcuts, storage used); the memory-schedule page; the guide and its sample data in a database of its own.
Done when: a new visitor reaches a first recall in under two minutes by the clock; the sample preview can be entered and left without a trace in real data.

**1.11 The app speaks up; history.**
Read: RULES.md 7; boards Speaks-up, History.
Build: the load guard, the sticking point, coming back after a gap, storage at risk, each raised once and remembered; History: entries by day, changing one in place, removing one.
Done when: each trigger of RULES.md, section 7, that phase 1 can reach has a test from the sample year; "Not now" silences it for seven days; correcting a history entry moves the dates that depend on it at once.

**1.12 Backup file; close of phase.**
Read: DATA.md 7; RULES.md 15.
Build: one backup file out and in; three daily versions kept on the device; the journeys for phase 1 (first run to first recall; a day's session; tick, undo; back up, wipe, restore); the phase's entry in the trouble notes.
Done when: a restore on a clean browser gives back exactly what was backed up, proven by comparing fingerprints; every budget holds; the journeys pass at phone and laptop size.
**Then:** a reviewing session, and the owner uses the app daily for a week. What that week turns up is the first work of phase 2.

### Phase 2: Rehearse

Ends with a real paper sat in the app from the owner's own PDF, scored, and its mistakes coming back.

| # | Package | Size | Read and build |
|---|---|---|---|
| 2.1 | Papers and scoring | M | RULES.md 1, 9, 11 (keys), 14; DATA.md 3. Port Practice Desk `src/engine/scoring.ts`, `score-ceiling.ts`, `src/domain/answer-key.ts`, `scoring.ts`, `timing.ts` and their tests. Build the sitting in columns, editions as changes only, the key reader, booklet series, break-even, every reason and line of RULES.md, section 9, as pure functions. Done when each row of section 9 has a test and a corrected key never changes an old sitting's score unless an edition is approved. |
| 2.2 | PDF pages | M | BUILD.md 1. Add `pdfjs-dist`, loaded only with a paper and worked off the main thread. Build opening a PDF from the device, keeping it by fingerprint, drawing only the pages near the one in view, zoom, and knowing which page is in view. Done when a 10 MB, 40-page paper shows its first page inside the budget on a phone-sized window, memory stays flat while scrolling to the end, and no other screen loads the library. |
| 2.3 | Answer sheet and briefing | L | PLAN.md 6; RULES.md 1; boards Answer-sheet, Answer-sheet-dark, Answer-sheet-tablet, Briefing, Practice-sheets, and the amendments in `design/README.md`. Build the sheet beside the page on a laptop and as a dock on a tablet and phone; Sure, 50-50, Guess; the clock, pauses and time up; keys; the screen kept awake; a paper saved after every answer and paused across restarts; the briefing with standing lessons. Done when a 100-question paper can be sat start to finish at each size, survives a reload at any point, and its clock is right after the tab has slept. |
| 2.4 | Clipping | M | Boards Clip, Mistake. Build the box drawn on a page, the picture kept by fingerprint at reading size, question and explanation, and the one-drag clip from a mistake that has none. Done when a clip is under 60 KB and readable on a phone. |
| 2.5 | Adding a paper and its key | M | Boards Paper-key, More-sheets (add a paper, move a paper). Build adding a PDF with its pattern, entering the key by paste, from a solutions PDF's text, or by tap, with "to settle". Done when each key form of RULES.md 11 is read rightly and scoring goes ahead with gaps. |
| 2.6 | Results | L | PLAN.md 6 (Results); RULES.md 9; boards Results, Results-dark. Build the story and every tab. Done when each figure on the screen is traced to a test in 2.1 and the screens match their boards. |
| 2.7 | Mistakes | L | PLAN.md 6; RULES.md 2 (ladder), 7 (cross-check); boards Mistake, Fix-list. Build the first look with its reason chosen for you, the lesson line, pinning, the blind re-attempt inside Today's session, saved questions, the fix list, the cross-check flag on Syllabus. Done when a wrong answer travels the whole ladder to "solved" in a test that moves the date forward. |
| 2.8 | Practice place; outside practice | M | PLAN.md 5 (Practice); boards Practice, Practice-light, Pacer, Practice-sheets. Build the Practice place, logging a test taken elsewhere, the pacer. |
| 2.9 | Close of phase | S | Journeys: add a paper, sit it, enter its key, read the results, look at the mistakes, meet one again. Review. The owner sits a real past paper. |

### Phase 3: Write

| # | Package | Size | Read and build |
|---|---|---|---|
| 3.1 | Written answer | M | PLAN.md 6; RULES.md 10; board Written-answer. The question, the clock by marks, the check against points, the diagram question, the photo kept small, points left out returning in recall. |
| 3.2 | Full-paper rehearsal | M | RULES.md 10; board Rehearsal. Choosing questions on the running clock with the paper's rules checked, the pacer across the paper, checking at once or spread over days. General English through the same flow. |
| 3.3 | Working with an AI | M | PLAN.md 10; RULES.md 11; board AI-bridge. The three briefs to copy, and Paste from AI with its preview of what will be added. Done when a paste with every block, a paste with mistakes in it, and a paste for an unknown topic each behave as RULES.md says. |
| 3.4 | Close of phase | S | Journeys, review, a week of the owner writing an answer a day. |

### Phase 4: Sync

This phase follows the plan on branch `SD` (`docs/sd/SYNC_PLAN.md`) and needs decision G. If Study Director's new engine exists by then, package 4.2 adapts it; if not, 4.2 builds the small part Practice Director needs, behind the same port.

| # | Package | Size | Read and build |
|---|---|---|---|
| 4.1 | Joining two copies | M | DATA.md 6. Pure code in `data/sync`: joining record by record from the count per device; the "to send" list; versions as lists of pieces by fingerprint, facts by month. Tested against a pretend Drive in memory: two and three devices, changes in every order, a device a month behind, a deleted record, a corrected fact. Done when every order of the same changes ends in the same data. |
| 4.2 | Drive | L | Sign-in that lasts its hour and is asked for again without losing work; the changes file per device; versions; the checks on real Drive that the SD plan lists. Done on the owner's real Drive with a test folder. |
| 4.3 | Files | M | Clips, photos, PDFs and your bank going up by fingerprint and coming down only where opened; resuming a large one; dropping a device's copy. |
| 4.4 | Earlier versions and export | M | Board More-sheets (earlier versions), Settings (data). What is kept, going back to a version with a safety version first, the readable export. |
| 4.5 | A second device; recovery | M | First run with "Connect Drive" finding the data; the marker bringing everything back after a device's storage is emptied. |
| 4.6 | Close of phase | S | A fortnight on phone, tablet and laptop together. Review. |

### Phase 5: See

| # | Package | Size | Read and build |
|---|---|---|---|
| 5.1 | Progress | L | PLAN.md 5 (Progress); RULES.md 6, 9; boards Progress, Progress-light. The road with editing and the phase-date moment, two things that matter now, papers against target, what you hold, recall coming, how marks get lost. |
| 5.2 | Weekly summary and calendar file | M | RULES.md 9, 13. The summary for any week. Port Calendar `src/interoperability/ics.ts` for the reminder, paper slots and "Add to my calendar". |
| 5.3 | Search | M | Board Search. Topics, mistakes, clips, points, worked out in memory at first use. |
| 5.4 | Print | S | Board Leave-out-sheet. |
| 5.5 | Close of phase | S | Review. |

### Phase 6: Full papers in the app

| # | Package | Size | Read and build |
|---|---|---|---|
| 6.1 | The test engine | M | Port Practice Desk `src/engine/session.ts`, `response.ts`, `generic-attempt.ts`, `clock.ts`, `manual-grading.ts`, the question model (`src/domain/question.ts`, `exam.ts`, `media.ts`, `rich-document.ts`, `calculator.ts`) and their tests, with attempts no longer carrying a copy of the paper. |
| 6.2 | The player | L | Board Test-player. Sections and locks, the palette, mark for review, the calculator, passages in a split view, keys. Add `katex`. |
| 6.3 | Question bank and sets | M | Build a set by topic, source and number, from your bank and your mistakes. |
| 6.4 | Editions | M | Board Editions. |
| 6.5 | Authoring | L | Board Authoring. Add `wordgard`. Last, as agreed. |

### Phases 7 and 8

Not broken into packages yet. Phase 7 (other students) starts from what a second person needs on their first day. Phase 8 (the three links with Study Director) waits on Study Director's own work. Both are planned when phase 5 closes.

## 7. How a phase is closed

1. **Journeys** for the phase pass at phone and laptop size.
2. **A reviewing session**, with nothing in its memory, reads the phase's code against the documents: the four rules of the code, numbers outside `core/rules.ts`, stored things that could be worked out, wording that drifted from the boards, tests that test nothing.
3. **The iPad list**: five to ten things the owner does on the iPad in Safari, written by the closing session.
4. **Real use.** The owner uses the phase for a week. What it turns up goes into `docs/STATUS.md` under "From use" and is the first package of the next phase.
5. **The documents are brought level** with anything that changed.

## 8. Content, beside the building

The app is only as useful as what is prepared for the owner's exams (PLAN.md, section 13). These run in their own sessions, need no code from phase 1 beyond package 1.4's checks, and can start now. Each ends with a file the checks accept and a short list for the owner to spot-check, because an agent's reading of a syllabus or a key is not to be trusted unseen.

| # | Content | From | Notes |
|---|---|---|---|
| C1 | Syllabus trees: Forestry I and II, Geology I and II, General Knowledge, Prelims General Studies, CSAT | UPSC's syllabus text | Leaves sized as RULES.md, section 3. The owner reads each tree once: it is the map of their year. |
| C2 | Exam patterns: Prelims, IFoS Mains | UPSC's notice and a real paper's instructions | Confirms the dates and the pattern noted as unconfirmed in PLAN.md, section 8 |
| C3 | Prelims paper maps, ten years | Official keys; the papers as PDFs supplied by the owner | The key for every series; the topic and kind of each question for one series; pages where the PDF is the common one |
| C4 | Past Mains questions for Forestry and Geology, each tied to a leaf | The papers as PDFs supplied by the owner | Goes in the owner's own bank (decision D) |
| C5 | Topic weights | Worked out from C3 and C4 by the tools | No hand work |
| C6 | Marking points for the heaviest fifty topics | Drafted by an agent from the owner's sources | Optional. All arrive "unverified". |

Practice Desk's content tools (PDF intake, the blueprint, editions) are used where they fit.

## 9. What could go wrong

| Risk | What is done about it |
|---|---|
| A browser empties the app's storage, as happened to Study Director on the phone and the iPad | The marker and automatic recovery (1.2, 4.5); lasting storage asked for; the app said to be added to the Home Screen on the iPad; a backup file from 1.12 and a plain line on Today while no backup exists |
| Sessions drift from the design, a little each time | The boards looked at in every screen package; the reviewing session at each phase's end; documents changed in the same commit as behaviour |
| The sync phase waits on Study Director | Phases 1 to 3 need no sync. Package 4.1 is pure and can be written early. The port lets 4.2 use either engine |
| PDF pages are slow or heavy on a phone | Package 2.2 is its own package with its own budget, before any screen depends on it |
| Content is late or wrong | It starts now; every piece is checked by tools and spot-checked by the owner; the app is usable with a syllabus tree alone |
| A stored format turns out wrong after real use | Format numbers and upgrade-on-read from 1.1; the contracts are read by the owner before anything is stored |
| A rule's number is wrong in practice | Every number is in one file; none is spread through the code |

## 10. The first three things to do

1. The owner answers decisions A to E in DECISIONS.md, section 7 (a line each is enough), and creates `main`.
2. Package 1.0, then 1.1. The owner reads `docs/CONTRACTS.md`.
3. Content C1 and C2 in a session of their own, at the same time.
