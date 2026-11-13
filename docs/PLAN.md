# Practice Director — product and build plan

Status: planning draft, revised 13 Nov 2026 after owner feedback. Nothing is built yet.

The test of this app is whether it gets used every day. Every design choice below is judged against that: it must never feel like a chore to operate.

## 1. What the app is for

Practice Director answers one question every day: **"What should I practise right now, so that what I studied turns into marks and stays in my head until the exam?"** Then it lets you do that practice on the spot and learns from the result.

It is one loop, repeated daily:

1. **Plan** — the app builds today's short list from your exam dates, your weak topics, what is due for revision, and how much time you have.
2. **Do** — recall from memory, solve questions, sit a mock, write an answer.
3. **Review** — see what went wrong and why, in one or two taps per item.
4. **Adapt** — mistakes and forgotten topics come back at the right time; strong topics fade into the background.

The app is built first for one person preparing for UPSC IFoS and CAT. It stays generic because everything exam-specific lives in data (exam templates and syllabus packs), not in code.

## 2. What exists today

I read the code and docs of all four repos and ran each app.

| App | What is genuinely good | Why it feels bad to use |
|---|---|---|
| **Practice Desk** | Solid exam engine: six question types, sectional timers and locks, negative marking, calculator, frozen attempts, detailed results, mistake notebook with spaced revision, a content pipeline for agents. | The home screen is a settings form. Results are a wall of twelve equally loud panels with disclaimers. Ships only SSC CGL papers. Getting your own content in is hard. |
| **Revision Director** | The smartest scheduling: memory scheduling (FSRS-7) kept separate from a daily planner that respects exam dates, time budget, weak areas and subject balance; proper handling of forgotten items. | Adding one topic needs about twenty fields (scope, protocol, success criteria, checkpoints…). The vocabulary is internal jargon ("obligations", "evidence events", "capacity exceptions"). Rating one recall asks for checkpoints, cue level and error types. It reads like a compliance tool. |
| **Calendar** | A capable, generic calendar library: recurrence, drag and resize, time zones, availability, planned-versus-actual, Google Calendar and ICS support. | It is a plain grid. Nothing in it knows about exams, so it adds no insight by itself. |
| **Study Director** (reference, not merged now) | The most polished: installable app, Google Drive sync across devices, timer, notes, themes, phone layout. | Not part of this build; see section 8. |

The deeper problem is that the three apps are three databases with three vocabularies, and you are the integration layer. The same topic is typed into each. A mock result never reaches the revision planner. The calendar only shows what the others export to it.

There is also real duplication to remove: Practice Desk and Revision Director each carry their own FSRS scheduler, optimizer, IndexedDB store, backup format and cross-tab guard.

## 3. Design principles

1. **Open the app, press Start.** The home screen is today's work, already chosen. No setup is needed to begin a session.
2. **One line to add anything.** A topic, a prompt or a practice log needs one line of text. Everything else has a sensible default and can be refined later.
3. **Plain words.** "Due today", "Shaky", "Fix mistakes". No scheduler terms on any main screen.
4. **One main thing per screen.** Each screen has a single hero element and a single primary action. Detail is one tap away, never in the way.
5. **The engine is invisible.** Integrity checks, FSRS parameters and optimizer runs still happen, but live under Settings → Advanced. The surface shows only "Backed up 2 h ago" and "Schedule tuned to your memory".
6. **No guilt backlog.** When you miss days, the app spreads the catch-up over the coming days inside your time budget and tells you so.
7. **Honest numbers.** Keep Practice Desk's rule: no invented predictions. Every strength label says what it is based on ("from 14 questions and 3 recalls").
8. **Phone and laptop are both first-class.** Quick reviews and today's plan on the phone; mocks and writing on the laptop.
9. **Automatic by default.** The app decides what, when and how much from sound mechanisms (section 5). You confirm with a tap or override; you never configure before you can start. Every input the app asks for must pay for itself the same day.
10. **Works fully without AI.** No feature in the core loop depends on an AI key. AI is a later, optional layer (section 8).

## 4. The app, screen by screen

Five places, plus Settings behind the profile menu. On a laptop they sit in a slim left rail; on a phone, a bottom bar.

### Today (home)

- A strip of countdown chips: each exam stage and its days remaining.
- **Today's session**: an ordered list with time estimates that fits your time budget, for example: fix 8 mistakes from Mock 4 (12 min) · 14 recalls due (25 min) · Polity: Parliament, 20 questions (weak topic) · CAT Mock 6 at 2 pm. One **Start** button runs them back to back. Any item can be skipped or pushed to tomorrow; the plan reflows.
- **Quick capture** bar: type "read Parliament chapter 2h" or "30 Q percentages from book, 22 right, 40 min". The app suggests the topic, asks nothing else, and schedules the follow-up.
- **"How long do you have?"** chips (5 · 15 · 30 · 60 min): pick one and the app hands you exactly that much of the most valuable work. Made for the phone and for low-energy days.
- A small week strip showing consistency.

### Practice

- **Papers**: mocks, past papers and sectional tests, filtered by exam. Two taps to start: pick paper, pick mode (exam simulation, untimed, one section).
- **Build a set**: choose topics, number of questions, and source (unseen, my mistakes, weak topics, mixed).
- **Written answers**: mains-style questions with marks, word limit and timer. Write on paper or type; then compare against key points and run the five-point self-check (section 5).
- **Answer-sheet mode**: for any PDF, book or coaching test, with no typing-in of questions. Open the PDF beside a bubble sheet (or keep the paper on your desk), answer against the timer, then paste or tap in the answer key. The app scores it with that exam's marking, times each question, and builds the mistake list. For each mistake you can **clip** the question straight from the PDF page as an image; that clip becomes the revision card.
- **Log outside practice**: for tests taken on a coaching website or anything already finished. A pacer (a per-question timer you tap through) and a ten-second results entry. Mistakes logged here join the same revision loop.

**The test player** is distraction-free and follows the paper's own rules: sectional locks, question palette, mark-for-review, on-screen calculator where the exam allows it, split view for reading passages, and a usable phone layout.

**Results** are told as a short story instead of a dashboard: your score → where the marks went (did not know, errors, left blank, ran out of time) → the three most useful things to do next → **Fix mistakes now**. Full question-by-question review and timing stay available as tabs.

**Mistake triage**: each wrong, guessed or slow question gets a reason (didn't know · silly error · misread · time pressure · guessed). The app pre-selects the likely reason from what it observed (answered in seconds and wrong, changed from right to wrong, left blank when time ran out, marked unsure), so most of the time you only confirm. The question is then scheduled to return, and its topic is marked weaker.

### Syllabus

- The syllabus tree for each exam, with a strength bar on every node: New · Learning · Shaky · Steady · Strong.
- A topic page shows strength, last practised, next due, and tabs for its prompts, questions, notes and history.
- Add a topic or a whole outline by pasting text. One line per topic is enough.
- **Ticking a topic as studied is the only input revision needs.** The topic itself becomes the recall prompt ("recall everything on X"), scheduled automatically. Key points, diagrams and finer prompts are optional extras you add when you feel the need.

### Plan

- A calendar (week view on laptop, agenda on phone) with layers: exams and milestones, scheduled mocks, your study hours, and completed sessions shown against what was planned.
- A per-day **revision load forecast**, so you can see heavy days coming and move a mock by dragging it.
- Time budget per weekday.

### Progress

- Mock score trend per exam with sectional breakdown.
- Accuracy and time by topic; mistakes by reason; real recall rate; syllabus coverage per exam.
- The full history archive lives here.

### Key flows

- **First run (under two minutes)**: pick an exam template → set the date → set daily time → the syllabus is preloaded → Today already shows a starter session.
- **Recall**: prompt appears → think or write → reveal key points → one tap: Forgot · Partly · Got it · Easy. "Add detail" is optional.
- **Forgotten item**: comes back tomorrow as a "fix" with the source shown first, then a closed-book check. This is Revision Director's corrective relearning, shown simply.

### Words

| Old term | New term |
|---|---|
| Exam profile | Exam (goal) |
| Knowledge unit, notebook card | Prompt (something to recall) or Question (has an answer key) |
| Obligation | Due item |
| Evidence event | History entry |
| Daily capacity | Time budget |
| Relearn / remediation / leech | Fix / sticking point |
| FSRS policy, optimizer | Memory schedule (Advanced only) |

### Visual direction

Study Director's "Glass" look is the most polished thing in the four repos, and Practice Director will eventually share a home with it, so the new design is its calmer sibling: dark and light themes from one set of colour roles, one accent colour, sentence-case type with tabular numbers, generous spacing, restrained motion. Reading surfaces (questions, passages, answers) are plain and high-contrast with no decoration. One look, done well, instead of several skins.

I will show this as a clickable mock-up before any build work, so you judge screens and not descriptions.

## 5. Preparation habits built into the mechanisms

The app encodes how people who clear these exams actually prepare, so that following good practice takes no effort or knowledge.

| Proven habit | What the app does by itself |
|---|---|
| Few sources, many revisions; the whole syllabus revised several times before the exam | **Revision rounds**: the app tracks full passes over the syllabus and spaces them so the final pass ends just before the exam. A coverage meter shows each round. |
| Past papers decide what matters | Each topic shows how often it has been asked. That frequency sets the topic's weight automatically; there is no "importance" field to fill. |
| Tracking the syllabus line by line | The syllabus is a checklist. Ticking a topic starts its revision cycle. |
| Analysing a mock matters more than taking it | A mock is not marked done until its mistakes are triaged. Results lead straight into the fix loop. |
| Calibrated risk in negative-marking papers (sure / 50-50 / guess) | Optional one-tap confidence while answering. The app reports your accuracy at each confidence level against the break-even for that paper's marking, and says which bets are paying. |
| Daily answer writing for mains | One or two questions a day, picked from topics studied recently, timed, followed by a five-point self-check: structure, key terms, diagram, length, finished in time. |
| Diagrams, maps and tables (central to Forestry and Geology) | Prompts can be "draw it" prompts with a reference image; the self-check asks about the diagram. |
| Short notes for the final month | A **last-mile sheet** per topic, compiled automatically from your mistakes, key points and sticking points. |
| Current affairs revised monthly | A current-affairs topic is created each month and scheduled like any other. |
| Preparation moves in phases | The planner changes its mix by phase, worked out from exam dates: foundation → prelims focus → mains focus → final month (revision and full mocks only) → final week (taper). |
| Weekly review and planning | A Sunday summary is generated: what was covered, what slipped, what next week holds. One screen, nothing to type. |
| CAT: sectional tests, long analysis per mock, choosing which questions to leave | Section tests; "time sinks" (long and wrong) flagged as questions to have skipped; unsolved sets offered again untimed. |
| Consistency over intensity | Time budget, a streak that allows a planned rest day, and catch-up spread over several days. |

### Beyond what the four apps do today

The scope is not limited to the existing apps. Added because they earn daily use:

- **Answer-sheet mode and clipping** (section 4): any PDF or book becomes timed, scored practice with a mistake list, with no data entry.
- **Time-boxed start**: "I have 15 minutes" gives a ready session.
- **Rapid-fire fact decks**: quick cards for memory-heavy material (species and botanical names, stratigraphy, formulae, vocabulary), separate from long recall prompts.
- **Exam rehearsal**: full mocks are proposed at the real exam's time of day and, in the final month, on its weekday pattern.
- **Attempt-strategy report** from confidence tags and time sinks.
- **Last-mile sheets** and the **Sunday summary**.

Removed because they cost attention without paying it back: the study-log tab, per-item protocol and success-criteria fields, splitting of long items into chunks, the alternative scheduling policy, multiple skins, the plugin runtime, and edition comparison as a default view.

## 6. Tailored for you, generic for others

Exam-specific behaviour comes from **exam templates** and **syllabus packs**, which are data files:

- A template defines stages and dates, papers, sections, timing, marking, allowed tools and answer formats.
- A syllabus pack is a topic tree for that exam.
- One topic can count toward more than one exam (CSAT quant and CAT quant overlap).

First targets:

| Exam | Date | Notes |
|---|---|---|
| UPSC Prelims 2027 (CSE and IFoS share it) | 23 May 2027 | From the UPSC 2027 calendar as reported by news and coaching sites |
| IFoS Mains 2027 | Starts about 21 Nov 2027 | One secondary source only; exact dates come with the notification. Optionals: Forestry and Geology, plus General English and General Knowledge. |
| CAT | 29 Nov 2026 or about 28 Nov 2027 | The 2027 date is a projection and would fall right after IFoS Mains. |

All dates are editable and are confirmed against the official notification when it appears. A blank template is included. Later packs: CSE Mains, NEET PG and medical professional exams, JEE. The engine already supports what these need: negative and partial marking, numeric and typed answers, multiple-correct, images, maths rendering.

## 7. How content gets in (no AI needed)

| Your source | How it enters |
|---|---|
| Past papers as PDFs | **Answer-sheet mode** works on any PDF immediately. For papers worth having fully inside the app (searchable, mixable into custom sets), a pack file is prepared outside the app in a Claude Code session, using the existing Practice Desk content tools, and imported. That needs no API key. |
| Coaching test series | PDFs: answer-sheet mode. Tests on a coaching website: log the result and clip or note the mistakes. |
| Books and paper practice | Answer-sheet mode or the pacer; the questions are never typed in. |
| Your notes | Syllabus topics are the prompts by default. Add one-line prompts or key points only where you want finer recall. |

The app itself ships no copyrighted papers. You import your own; shared packs carry only templates and syllabi unless the content is free to share.

## 8. AI assist: later and optional

Not part of the first builds; you have no API key now and nothing above depends on one. A slot is kept so it can be added without reshaping anything. With a key it would draft questions from a PDF, give feedback on a written answer, or explain a mistake, always as drafts you approve.

## 9. Study Director: separate now, loose link next, absorbed later

**Now**: Practice Director is fully independent and does not need Study Director. It deliberately does not rebuild what Study Director does well (full-day routine planning, Pomodoro, long-form notes). It keeps only light versions: a time budget, a session timer and short topic notes.

**Hosting**: Practice Director gets its own web address. Study Director is in daily use with real data, so its address is not touched: a shared address would share storage limits, a "clear site data" would wipe both apps, their offline workers would overlap, and a bad deploy of the new app could break the old one. (This reverses my earlier suggestion to share an address.)

**Loose link (optional, later)**: Practice Director can read a "study feed" of what you studied (subject, task, amount, minutes) and offer "You studied X — add it to revision?". The feed travels through your own Google Drive, which both apps already use, so neither app reaches into the other's storage.

**Absorption (last phase)**: the combined app is released at Study Director's existing address, so Study Director's data stays where it is and is adopted in place; Practice Director's data arrives through its normal Drive sync. Study Director keeps working unchanged until that release.

**Built so absorption is easy**:

- Every Study Director surface already has a natural slot: its Plan board → the Plan screen's day view; Execute timer → the session runner; daily Review → an end-of-day step on Today; Notes → topic notes in Syllabus; Insights → Progress.
- The syllabus tree is the shared spine. Study Director's "Area" maps onto a syllabus node.
- Features are modules that register their own record types with one shared storage, backup and sync layer. Study Director's planner, timer and notes can arrive later as new modules without reshaping the core.
- The sync layer is adapted from Study Director's Drive engine, so both apps already speak the same backup language.
- The visual language is a sibling of Study Director's.

## 10. Architecture

### Stack

- Strict TypeScript, ES modules, built with Vite into an installable, offline-capable web app (PWA). No server and no accounts.
- **A custom interface with no framework**, as in Study Director, but built on a small in-house kit of a few hundred lines instead of freehand DOM code:
  - reactive state, so a screen can never show stale data;
  - a component convention (a function that returns elements) and a keyed-list helper;
  - a router and one motion layer (shared-element and page transitions, springs, reduced-motion support);
  - a design system of tokens and about twenty components. Screens are assembled only from these, which is what keeps the app consistent.
- Why not freehand: Study Director and Practice Desk both show the cost (a 12,000-line host file; hand-written code to stop re-renders destroying focus and input). Why not Preact, Svelte, Solid or Lit: each would work, but each adds a dependency and a second way of doing things next to Calendar and, later, Study Director's code, for benefits the small kit already gives. Polish comes from the design system and motion layer, not from a framework.
- Existing runtime libraries are kept: ts-fsrs, KaTeX, Wordgard.

### Modules

```text
src/
  kernel/     ids, time, hashing, validation (no DOM)
  content/    syllabus, questions, prompts, papers, exam templates
  attempt/    test engine, scoring, timing
  memory/     one FSRS scheduler, replay, optimizer
  planner/    daily plan, time budget, load forecast
  evidence/   one append-only history log and the views derived from it
  store/      IndexedDB + file storage, backup, sync
  ui/kit/     reactive state, components, router, motion
  ui/         design system and screens
  assist/     optional AI (later)
packs/        exam templates and syllabus packs
tools/        content command-line tools for agents
```

### Data model

- **Exam** (goal), **Topic** (syllabus node), **Question**, **Prompt**, **Paper**, **Session/Attempt**.
- **One history log**, append-only: answered a question, recalled a prompt, wrote an answer, logged outside practice, studied a topic.
- **Derived views**, always rebuildable from the log: memory card per item, topic strength, mistakes list, today's plan, load forecast.
- **Calendar items**: exams, scheduled mocks, study hours, your own events. Planned work is projected into the calendar from the store, never copied.

One scheduler serves both recalled prompts and re-attempted questions, with separate tuning per kind, because recalling a topic and re-solving an MCQ behave differently. The fixed 90% retention policy stays as the only policy; Revision Director's own benchmark showed the Cost-ADR alternative cost about 18% more sessions, so that option is dropped.

### Storage and sync

- IndexedDB for records; browser file storage (OPFS) for images, PDFs and answer photos.
- One backup file format, optionally encrypted.
- Google Drive sync for laptop + phone, adapted from Study Director's engine. It is much simpler here: history entries only ever get added, so two devices merge by union, and derived views are recomputed. A test in progress belongs to one device at a time.

### What is reused

| From | Carried over | Left behind |
|---|---|---|
| Practice Desk | Question and paper model, validation, test engine, scoring, timing evidence, calculator, mistake notebook logic, analytics, maths and image viewers, Wordgard authoring, backup integrity, agent content tools | SSC CGL papers as built-in content (become an optional sample pack), the single-file `file://` build, the current screens. Source-versus-Reviewed editions stay in the data model but appear only when a paper has both. |
| Revision Director | FSRS-7 scheduler with replay verification, optimizer and its safety gates, daily planner (exam proximity, weakness, balance, interleaving, time budget), corrective relearning, duration learning, interruption-aware timer | The unit and obligation forms, Study Log tab, plugin and public-bridge runtime, the script-concatenation build, the current screens |
| Calendar | Used as a library dependency, not copied (Ayana depends on it too, so a fork would split it): core, month/week/day/agenda views, planning, availability, ICS, Google Calendar, reminders. A new host adapter and theme live in Practice Director; kernel improvements go upstream. | Resource scheduler, the per-app bridge adapters (no longer needed inside one app) |
| Study Director | Borrowed now: Drive sync and backup engine design, encryption and integrity primitives, PWA install/update flow, phone safe-area handling, notification and sound coordinator, pacer | Planner, timer and notes stay in Study Director until absorption |

Practice Desk and Revision Director are frozen once Practice Director reaches parity with each.

### Tests

Carry over the tests that guard correctness of pure logic: scoring, attempt rules, FSRS replay and parity, planner determinism, backup integrity. Drop the old acceptance and visual suites, which test screens that will no longer exist. Add a small new set of browser journeys for the core flows at laptop and phone widths, with screenshots checked before any interface change is called done.

## 11. Build phases

Each phase ends with something you can use daily.

| Phase | Delivers | Replaces |
|---|---|---|
| 0. Design | Clickable mock-up of the five screens and the test player, light and dark, laptop and phone. You approve before build. | — |
| 1. Revise | Interface kit and design system, storage, exam templates, syllabus checklist, recall sessions, revision rounds, Today, backup file | Revision Director (core) |
| 2. Practise | Answer-sheet mode with clipping, question bank, pack import, set builder, test player, results, mistake loop, outside-practice log | Practice Desk |
| 3. Sync | Google Drive sync, phone polish, install flow | — |
| 4. Plan and Progress | Calendar integration, mock scheduling, load forecast, reminders, Progress screen | Calendar as a separate app; rest of Revision Director |
| 5. Write | Written answers with self-check, last-mile sheets, weekly review, in-app authoring | — |
| 6. Wider use | More exam packs, pack sharing, onboarding for other students | — |
| 7. Study Director | Loose link, then absorption | Study Director |
| Later, optional | AI assist | — |

## 12. Decisions and open points

Settled:

- Custom interface on a small in-house kit; no framework.
- Calendar stays its own library; Practice Desk and Revision Director code moves in.
- One visual style, improving on Study Director's Glass look.
- Fixed-retention scheduling only.
- No import of old data from Practice Desk or Revision Director (there is none).
- Separate web address from Study Director until absorption.
- No AI in the first builds.

Open:

1. Which CAT are you sitting: 29 Nov 2026, or 2027? A 2027 sitting would fall right after IFoS Mains, which changes how the planner splits the final months.
2. IFoS Mains dates and all exam patterns are to be confirmed against official notifications when templates are written.
