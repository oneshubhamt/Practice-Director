# Practice Director — product and build plan

Status: planning draft, 13 Nov 2026. Nothing is built yet.

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

## 4. The app, screen by screen

Five places, plus Settings behind the profile menu. On a laptop they sit in a slim left rail; on a phone, a bottom bar.

### Today (home)

- A strip of countdown chips: each exam stage and its days remaining.
- **Today's session**: an ordered list with time estimates that fits your time budget, for example: fix 8 mistakes from Mock 4 (12 min) · 14 recalls due (25 min) · Polity: Parliament, 20 questions (weak topic) · CAT Mock 6 at 2 pm. One **Start** button runs them back to back. Any item can be skipped or pushed to tomorrow; the plan reflows.
- **Quick capture** bar: type "read Parliament chapter 2h" or "30 Q percentages from book, 22 right, 40 min". The app suggests the topic, asks nothing else, and schedules the follow-up.
- A small week strip showing consistency.

### Practice

- **Papers**: mocks, past papers and sectional tests, filtered by exam. Two taps to start: pick paper, pick mode (exam simulation, untimed, one section).
- **Build a set**: choose topics, number of questions, and source (unseen, my mistakes, weak topics, mixed).
- **Written answers**: mains-style questions with marks, word limit and timer. Write on paper or type; then compare against key points and score yourself (or ask AI, see section 7).
- **Log outside practice**: for books, paper tests and coaching websites. Includes a pacer (a per-question timer you tap through) and a quick results form. Mistakes logged here join the same revision loop.

**The test player** is distraction-free and follows the paper's own rules: sectional locks, question palette, mark-for-review, on-screen calculator where the exam allows it, split view for reading passages, and a usable phone layout.

**Results** are told as a short story instead of a dashboard: your score → where the marks went (did not know, errors, left blank, ran out of time) → the three most useful things to do next → **Fix mistakes now**. Full question-by-question review and timing stay available as tabs.

**Mistake triage**: each wrong, guessed or slow question gets one tap for the reason (didn't know · silly error · misread · time pressure · guessed). It is then scheduled to return, and its topic is marked weaker.

### Syllabus

- The syllabus tree for each exam, with a strength bar on every node: New · Learning · Shaky · Steady · Strong.
- A topic page shows strength, last practised, next due, and tabs for its prompts, questions, notes and history.
- Add a topic or a whole outline by pasting text. One line per topic is enough.

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

## 5. Tailored for you, generic for others

Exam-specific behaviour comes from **exam templates** and **syllabus packs**, which are data files:

- A template defines stages and dates, papers, sections, timing, marking, allowed tools and answer formats.
- A syllabus pack is a topic tree for that exam.
- One topic can count toward more than one exam (CSAT quant and CAT quant overlap).

Shipped first: UPSC Prelims (shared by CSE and IFoS), IFoS Mains (descriptive), CAT, and a blank template. Later packs: CSE Mains, NEET PG and medical professional exams, JEE. The engine already supports what these need: negative and partial marking, numeric and typed answers, multiple-correct, images, maths rendering.

Exact patterns (question counts, marking, section timing) change between years, so each template is checked against the current official notification when it is written, and stays editable.

## 6. How content gets in

| Your source | How it enters |
|---|---|
| Past papers as PDFs | With AI assist: upload PDF and answer key → draft questions → you review in a grid → publish. Without AI: the existing Practice Desk agent pipeline produces a pack file that the app imports. |
| Coaching test series | PDFs go the same way. For tests taken on a coaching website: log the result (score, sections, time) and add mistakes by photo or quick entry. |
| Books and paper practice | Pacer plus quick log; no need to enter the questions. |
| Your notes | One-line prompts by hand, or AI drafts prompts and questions from pasted notes. |

The app itself ships no copyrighted papers. You import your own; shared packs carry only templates and syllabi unless the content is free to share.

## 7. Optional AI assist

The app is complete without it. With your own API key (stored only on your device), it can:

- turn a PDF, photo or pasted text into draft questions with keys;
- turn a pasted syllabus into a topic tree;
- draft recall prompts and key points from notes;
- give feedback on a written answer against the key points, including from a photo of handwriting;
- explain a mistake.

Rules: everything AI produces is a draft you approve; AI-made content is labelled as such; nothing is sent anywhere unless you trigger it; the cost of each action is shown.

## 8. Study Director: separate now, loose link next, absorbed later

**Now**: Practice Director is fully independent and does not need Study Director. It deliberately does not rebuild what Study Director does well (full-day routine planning, Pomodoro, long-form notes). It keeps only light versions: a time budget, a session timer and short topic notes.

**Loose link (optional, later)**: Practice Director can read a "study feed" of what you studied (subject, task, amount, minutes) and offer "You studied X — add it to revision?". Hosting both apps on the same web origin makes this possible without file exports, and makes the later merge an in-place move.

**Built so absorption is easy**:

- Every Study Director surface already has a natural slot: its Plan board → the Plan screen's day view; Execute timer → the session runner; daily Review → an end-of-day step on Today; Notes → topic notes in Syllabus; Insights → Progress.
- The syllabus tree is the shared spine. Study Director's "Area" maps onto a syllabus node.
- Features are modules that register their own record types with one shared storage, backup and sync layer. Study Director's planner, timer and notes can arrive later as new modules without reshaping the core.
- The sync layer is adapted from Study Director's Drive engine, so both apps already speak the same backup language.
- The visual language is a sibling of Study Director's.

## 9. Architecture

### Stack

- Strict TypeScript, ES modules, built with Vite into an installable, offline-capable web app (PWA). No server and no accounts.
- **Preact** (about 4 KB) for the interface, with plain CSS and design tokens. All four existing apps hand-build the DOM; that is where most of the roughness comes from (Study Director's host file is over 12,000 lines). The screens are being rewritten anyway, and a small component model makes them consistent. Everything below the interface stays framework-free.
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
  assist/     optional AI
  ui/         design system and screens
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

## 10. Build phases

Each phase ends with something you can use daily.

| Phase | Delivers | Replaces |
|---|---|---|
| 0. Design | Clickable mock-up of the five screens and the test player, light and dark, laptop and phone. You approve before build. | — |
| 1. Revise | App shell, storage, exam templates, syllabus, prompts, recall sessions, Today, backup file | Revision Director (core) |
| 2. Practise | Question bank, pack import, set builder, test player, results, mistake loop, outside-practice log | Practice Desk |
| 3. Sync | Google Drive sync, phone polish, install flow | — |
| 4. Plan and Progress | Calendar integration, mock scheduling, load forecast, reminders, Progress screen | Calendar as a separate app; rest of Revision Director |
| 5. Write and Assist | Written answers, AI assist, in-app authoring | — |
| 6. Wider use | More exam packs, pack sharing, onboarding for other students | — |
| 7. Study Director | Loose link, then absorption | Study Director |

Until phase 5, question content comes in through the existing agent pipeline as pack files.

## 11. Decisions I made, and points still open

Decisions (tell me if you disagree):

- Preact for the interface instead of hand-built DOM.
- Calendar stays its own library; Practice Desk and Revision Director code moves in.
- One visual style instead of multiple skins.
- Fixed-retention scheduling only.
- No migration of existing data from Practice Desk or Revision Director, since both describe themselves as clean-slate prototypes.

Open:

1. Do you have real history in Practice Desk or Revision Director worth importing?
2. Which IFoS optional subjects, and which exam dates, should the first templates target?
3. Should Practice Director be hosted on the same origin as Study Director (recommended, see section 8)?
4. Exam patterns for the first templates need checking against the current official notifications.
