# Design mock-up

This is phase 0 of the build: Practice Director drawn end to end, to be reviewed and approved by the owner before any code is written. It is the reference for how every screen looks, reads and moves.

`mockup/` holds the source of the design canvas: one `.dc.html` file per screen and `canvas.json`, which lays them out. The canvas is published as a private Claude artifact at https://claude.ai/artifact/XNuSS5dFNpLcTR2aXFeh31 (only its owner can open it). These files are the durable copy.

All names, scores, dates and counts in the screens are sample data. Text standing for a real exam paper is drawn as grey lines, because the app ships no papers.

## The screens

Boards 01 to 25 are numbered in the order of a real day, then the edges. Boards 26 to 43 were drawn afterwards: the remaining screens in the same order, then the main screens in the other theme. "Works" means the screen responds to presses on the canvas.

| No. | File | Screen | Works |
|---|---|---|---|
| 01 | `Main.dc.html` | Today on a laptop: the suggested session, less or more time (chips or a typed length), choose your own, memory, next paper, the week, the quick note | Yes |
| 02 | `Phone-flow.dc.html` | Today and a daily session on a phone: three recalls (explain, in sequence, draw with no marking points yet), tap what you missed, a mistake re-attempted blind, done | Yes |
| 03 | `Today-states.dc.html` | Today on other days: back after a gap, the ten-minute minimum, a paper day, the end of a day | |
| 04 | `Practice.dc.html` | Practice: papers by exam, a paused paper, the other ways to practise | Yes |
| 05 | `Phone-places.dc.html` | Practice, Syllabus (tick a topic) and Progress on a phone | Yes |
| 06 | `Practice-sheets.dc.html` | Three short sheets: build a set, log practice done elsewhere, quick cards from a pasted list | Yes |
| 07 | `Briefing.dc.html` | A paper, step 1: your own lessons before the clock; timed or untimed | Yes |
| 08 | `Answer-sheet.dc.html` | A paper, step 2: bubble sheet beside your PDF, Sure · 50-50 · Guess, a clipped question | Yes |
| 09 | `Answer-sheet-tablet.dc.html` | The answer sheet as a dock under the page, for a tablet or phone | Yes |
| 10 | `Paper-key.dc.html` | A paper without a key: paste it, read it from a photo, or tap; settle what could not be read | Yes |
| 11 | `Results.dc.html` | A paper, step 3: results as a story, every question, timing | Yes |
| 12 | `Mistake.dc.html` | A paper, step 4: a first look at each mistake, the reason chosen for you | Yes |
| 13 | `Written-answer.dc.html` | A written answer, phone beside your paper: the clock runs for real | Yes |
| 14 | `Rehearsal.dc.html` | A full Mains paper: choose your five, write against the pacer, check | Yes |
| 15 | `Test-player.dc.html` | The test player for papers on screen: sections in order, passage beside question, palette, calculator | Yes |
| 16 | `Quick-cards.dc.html` | Quick cards | Yes |
| 17 | `Syllabus.dc.html` | Syllabus: tick topics, draining memory bars, Read next, one topic in detail | Yes |
| 18 | `Progress.dc.html` | Progress: the road (press Adjust), two priorities, papers against target, what you hold, recall work coming | Yes |
| 19 | `Speaks-up.dc.html` | When the app speaks up: a sticking point, the load guard, a phase date arriving, the weekly summary | |
| 20 | `First-run.dc.html` | First run in three steps, and a second device finding your data | Yes |
| 21 | `Settings.dc.html` | Settings | Yes |
| 22 | `Search.dc.html` | Search across topics, missed points, mistakes, answers and notes | Yes |
| 23 | `AI-bridge.dc.html` | Working with an AI: the brief that is copied out, and what is pasted in | Yes |
| 24 | `Design-system.dc.html` | The design system: colour roles, type, shape, controls, motion, words | |
| 25 | `SD-Plan-concept.dc.html` | A concept for Study Director: Plan with a margin. Not part of this pass. | Yes |
| 26 | `Recall-laptop.dc.html` | A daily session on a laptop: the same recall, centred, driven by the keyboard | Yes |
| 27 | `Fix-list.dc.html` | Fix mistakes: first look, coming back, solved, saved questions; why they went wrong | Yes |
| 28 | `Clip.dc.html` | Clipping a question from your PDF, and its explanation from a solutions PDF | Yes |
| 29 | `Pacer.dc.html` | The pacer for a test taken elsewhere: set up, run, then the result in two numbers | Yes |
| 30 | `Editions.dc.html` | A paper with two editions: what the corrections changed, who vouches for them, what it does to an earlier sitting | Yes |
| 31 | `Authoring.dc.html` | Writing a paper inside the app (a late phase): six kinds of question, paper rules, what is left to settle | Yes |
| 32 | `More-sheets.dc.html` | Six small sheets: add a paper or PDF, add topics, an exam's date and target, move the next paper, earlier versions, keyboard shortcuts | Yes |
| 33 | `History.dc.html` | History: recorded by itself, corrected by you, thirteen weeks at a glance | Yes |
| 34 | `Leave-out-sheet.dc.html` | "What you tend to leave out", as it prints | Yes |
| 35 | `Memory-schedule.dc.html` | The memory schedule (advanced): the one rule, three kinds of item, rested items, rebuild | Yes |
| 36 | `Guide.dc.html` | The guide in five short pages, and a look around with sample data | Yes |
| 37 | `Main-light.dc.html` | Today in the light theme | Yes |
| 38 | `Practice-light.dc.html` | Practice in the light theme | Yes |
| 39 | `Syllabus-light.dc.html` | Syllabus in the light theme | Yes |
| 40 | `Progress-light.dc.html` | Progress in the light theme | Yes |
| 41 | `Phone-flow-light.dc.html` | Today and a daily session on a phone, in the light theme | Yes |
| 42 | `Answer-sheet-dark.dc.html` | The answer sheet in the dark theme: only the PDF page stays white | Yes |
| 43 | `Results-dark.dc.html` | Results in the dark theme | Yes |

## How to read it

- **The design-system sheet (24) is the rulebook.** Every other screen is built only from what is on it. When a screen and the sheet disagree, the sheet is right and the screen is a mistake.
- **Dark and light.** The app's own screens are drawn dark and paper screens light. Boards 37 to 43 show the main screens in the other theme; they are made from the first drawings by `tools/theme.py`, so they are never edited by hand. In the app the theme is the owner's choice; only the PDF page is always white.
- **Laptop screens are fluid.** Below about 760 px the left rail gives way to the bottom bar. The phone screens (02, 03, 05) are the designed phone layouts; a laptop screen opened on a phone is only a fallback.
- **Sample data is kept consistent across screens** (the Prelims 2023 paper scores 81.3 everywhere; question 6 is the same 50-50 mistake on the answer sheet, in results, in the mistake list and in the phone re-attempt; the week in History is the week shown on Today), so a flow can be followed from one screen to the next.
- **Links between screens work** on the canvas: the rail, the bottom bar, Start, Finish, Fix the mistakes and so on. Every screen can be reached from another by the control that would open it in the app.

## What was checked

Each screen was rendered at its own size and looked at; the interactive ones were clicked through. An automated pass over all 43 confirmed: no broken links between screens, no sideways overflow at phone width, text contrast of at least 4.5 to 1, no text under 12 px, and pressable things at least 40 px (44 on phones). Two deliberate exceptions, both laptop-only and dense by nature: the bubble sheet (34 px) and the test player's question palette (36 px). A typed field inside a larger labelled box is measured by its box. The Study Director concept (25) was not revised in this pass.

## What is not drawn

Nothing of Practice Director's. Study Director's own screens are a separate pass.

## Editing the mock-up

The left rail and the phone's bottom bar are the same on every screen. They are written once, in `tools/inject.js`, and placed into each file between `<!--pd:rail ...-->` and `<!--pd:tabs ...-->` markers. After changing the navigation, run:

```bash
node design/tools/inject.js
```

The seven boards in the other theme are generated. After changing one of the screens they are made from, make its variant again and re-run the injector, for example:

```bash
python3 design/tools/theme.py light Main Main-light
```

```bash
python3 design/tools/theme.py dark Results Results-dark
```

The light variants come from `Main`, `Practice`, `Syllabus`, `Progress` and `Phone-flow`; the dark ones from `Answer-sheet` and `Results`.
