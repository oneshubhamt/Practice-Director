# Practice Director — product and build plan

Status: planning draft, second revision (14 Nov 2026) after a first-principles review of the design and mock-up. Nothing is built yet.

The test of this app is whether it gets used every day. Every design choice below is judged against that: it must never feel like a chore to operate.

## 1. What the app is for

Practice Director answers one question every day: **"What should I practise right now, so that what I studied turns into marks and stays in my head until the exam?"** Then it lets you do that practice on the spot and learns from the result.

It is one loop, repeated daily:

1. **Plan** — the app builds today's short list from your exam dates, your weak topics, what is due for revision, and how much time you have.
2. **Do** — recall from memory, solve questions, sit a mock, write an answer.
3. **Review** — see what went wrong and why, in one or two taps per item.
4. **Adapt** — mistakes and forgotten topics come back at the right time; strong topics fade into the background.

The app is built first for one person preparing for UPSC IFoS and CAT. It stays generic because everything exam-specific lives in data (exam templates and syllabus packs), not in code.

## 1a. First principles: what earns a place in this app

The goal is the highest possible rank, not a pleasant app. A feature stays only if it passes three tests: you cannot do it well in your head; a chat with an AI cannot do it, because the AI keeps no record, no clock and no memory between sessions; and it plausibly moves marks. Four jobs pass.

1. **Remember for you.** Nobody can track the forgetting of several hundred topics over a year by intuition. Planning revision is arithmetic, and it is the thing you say you are worst at.
2. **Measure you honestly.** Time per question, accuracy by topic, how often "sure" is wrong, what you leave out of answers. People misjudge their own knowledge; the record does not.
3. **Never waste a mistake.** Most people take a paper, glance at the solutions and move on. Every mistake here comes back as a blind re-attempt until it is solved.
4. **Rehearse the exam.** Real papers, real marking, the real hour of the day, and a clock weighted by marks for written answers.

One rule orders all the work: **marks gained per minute by exam day**. A topic's value is how often it is asked, times how far you are from holding it, divided by the time it takes.

What the app does not try to be: a teacher of content, a planner of your whole day (that is Study Director), a notes app, or a source of motivation by gimmick.

### Three kinds of use

You described yourself as self-contained. The app must be worth using at three depths, and never punish the lighter ones.

| Depth | What you do | What you get |
|---|---|---|
| Ledger only | Study as you please; tick topics, take papers in answer-sheet mode | The memory map, the measurements, the mistake list. No instructions. |
| Suggested | Press Start when it suits you | The session it would choose, cut to the time you have |
| Full | Follow the phases through the year | Everything, including the road and the weekly summary |

So "Start" is a suggestion, "choose your own" sits beside it, work done on your own counts exactly as much, and skipping days rebalances without a backlog.

### Working with AI, without a key

The app is the memory and the measurement; an AI is the reasoning and the content. You carry things between them:

- **Copy for AI**: one tap copies a mistake, a written answer with its marking points, or your weekly state as a brief you can paste into any chat.
- **Paste from AI**: the app accepts key points, cards and question sets in a simple text layout that any assistant can produce.
- **Packs** for official papers and syllabi are prepared in a Claude Code session and imported.

## 2. What exists today

I read the code and docs of all four repos and ran each app.

| App | What is genuinely good | Why it feels bad to use |
|---|---|---|
| **Practice Desk** | Solid exam engine: six question types, sectional timers and locks, negative marking, calculator, frozen attempts, detailed results, mistake notebook with spaced revision, a content pipeline for agents. | The home screen is a settings form. Results are a wall of twelve equally loud panels with disclaimers. Ships only SSC CGL papers. Getting your own content in is hard. |
| **Revision Director** | The smartest scheduling: memory scheduling (FSRS-7) kept separate from a daily planner that respects exam dates, time budget, weak areas and subject balance; proper handling of forgotten items. | Adding one topic needs about twenty fields (scope, protocol, success criteria, checkpoints…). The vocabulary is internal jargon ("obligations", "evidence events", "capacity exceptions"). Rating one recall asks for checkpoints, cue level and error types. It reads like a compliance tool. |
| **Calendar** | A capable, generic calendar library: recurrence, drag and resize, time zones, availability, planned-versus-actual, Google Calendar and ICS support. | It is a plain grid. Nothing in it knows about exams, so it adds no insight by itself. |
| **Study Director** (stays its own app) | By far the largest and most polished: a day planner, live timer, practice pacer, daily review, a full notes system, insights, and Drive sync across devices. | Not part of this build; see section 9. |

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
11. **You plan; the app informs.** Your day is yours and must not become a routine handed down by a machine. The app works out only facts (what is fading, what a paper scored, how much is coming) and makes offers. It never puts anything into your plan, never needs you to obey it to stay useful, and adjusts to what you actually did. How many hours, which subject, in what order and at what pace are your choices every day.

## 4. The app, screen by screen

Four places: Today, Practice, Syllabus, Progress. Settings sit behind the profile menu. On a laptop they are a slim left rail; on a phone, a bottom bar. (An earlier draft had a fifth place, Plan, with a week calendar. It duplicated Today and Study Director, so its useful parts moved into Progress.)

### Today (home)

- Countdown to each exam.
- **Suggested for today**: an ordered list with a reason and a time for each item. It has a core that fits your shorter days (2 hours) and an extension for longer ones (up to 4). One **Start** button, and **choose your own** beside it.
- **Choose your own** works by feel: pick a subject, a kind of work (recall, questions, writing) and a length, in any combination, and the app fills that with the most valuable items inside your choice. You decide what and how long; it only picks which items.
- **"Less time today?"** chips (15 · 30 · 60 min) cut the session to the most valuable part.
- **Your memory**: how many topics are fresh, fading and not started, and how many of the fading ones today's session catches.
- The next full paper, placed at the real exam's hour.
- A week strip. A skipped day is stated plainly and its work is spread forward.
- **Quick note**: one line for anything you did on your own.

### Practice

- **Papers**: past papers and tests. Two taps to start.
- **Answer-sheet mode**: for any PDF, book or coaching test, with no typing-in of questions. Your PDF sits beside a bubble sheet; you answer against the clock and say when you are unsure (Sure · 50-50 · Guess). For official papers a **paper map** (answer key and topic of each question) is already loaded, so there is nothing to enter. For anything else you paste or tap in the key. You can **clip** a question from the page; the clip becomes the revision card.
- **Build a set**: topics, number of questions, source (unseen, my mistakes, weak topics, mixed).
- **Written answers**: see below.
- **Log outside practice**: a pacer and a ten-second results entry for tests taken elsewhere.

**The test player** (for papers held fully in the app) is distraction-free and follows the paper's own rules.

**Results** are a short story: the score against your target → where the marks went → three things to do next → whether your bets paid at each confidence level → **Fix the mistakes**. Every question and timing remain as tabs.

**First look at a mistake**: one tap for the reason, pre-selected from what the app observed.

### How each kind of practice works

**Recall.** A topic comes up as a prompt; for Mains subjects the prompt is a past question wherever one exists. You say, sketch or jot the answer. Then the marking points appear and you **tap anything you missed**. The rating is worked out from that: nothing missed, some missed, mostly gone. This replaces a four-button self-rating, which invites flattering yourself. Missed points come back first next time and collect on the topic. With no marking points yet, you get three buttons and one line to note what you missed; those notes become the points.

**A mistake coming back.** The question is shown as you clipped it and you **answer it again, blind**. The app marks it. Right: it returns once more after a few days, then rests. Wrong: tomorrow, and its topic moves up. No self-rating is involved.

**Written answer.** The phone sits beside your paper. It shows a past question, runs a clock weighted by marks, then shows the marking points for you to tap what your answer left out, and asks about the diagram. Missed points become recall cards. A photo of the page and **Copy for AI feedback** are optional.

**Cross-check.** If you rate a topic well in recall but score poorly on its questions, the Syllabus says so: "weaker in questions than you rate it".

### Syllabus

- The topic tree for each paper. Tick a topic once you have studied it; nothing else is needed.
- Each topic has a **memory bar that drains** as days pass, with a date: Fresh (till 4 Dec), Fading (recall today), Not started. This replaces the earlier five strength labels, which mixed up how well you know a topic with how long since you saw it.
- A topic page shows memory, results in questions, how often it is asked, answers written, **what you tend to leave out** (the list that becomes your final-month sheet), and past questions ready to write.
- Ticking topics shows the cost: "this adds about 4 minutes a day".

### Progress

- **The road ahead**: phases from today to each exam. You set the dates and you say which phase you are in; the app proposes a change of phase and you confirm it. A phase only shifts what is offered.
- **Two things that matter now**, never more, each with the reason and what the app is doing about it.
- **Full papers against your target**: every result is read against a target, which starts at 55% of the paper's marks and can be changed.
- **What you still hold**: fresh, fading and not started, by paper.
- **Recall work coming** for the next 14 days against the time you allow, with a warning when starting more topics would overflow it.
- **How marks get lost**: did not know, torn between two options, careless.
- The full history archive.

### Staying with it

- **One daily anchor**: a single reminder at the hour you choose. No other nagging.
- **A minimum day**: ten minutes that keeps the most at-risk items alive.
- **Coming back after a gap**: a short restart session, with the pile already spread over the following days.
- **Load guard**: the app tells you before you take on more topics than your time can keep alive, and offers to rest items that are both low-value and reliably easy. You decide.

### Key flows

- **First run (under two minutes)**: pick an exam template → set the date → set daily time → the syllabus is preloaded → take one past paper in answer-sheet mode. The first result is the first reason to return.
- **Second device**: starts with "Connect Drive" and finds your data.

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
| Retrievability, stability | Fresh / fading, with a date |

### Visual direction

A calmer sibling of Study Director's Glass look: dark and light from one set of colour roles, one accent, one warm colour reserved for "needs attention", Inter throughout (Inter Tight for headings and large numbers), generous spacing, restrained motion. Reading surfaces are plain and high-contrast. The mock-up on the design canvas shows it; its source is kept in `design/mockup/`.

## 5. Preparation habits built into the mechanisms

The app encodes how people who clear these exams actually prepare, so that following good practice takes no effort or knowledge.

| Proven habit | What the app does by itself |
|---|---|
| Few sources, many revisions; the whole syllabus revised several times before the exam | The memory schedule keeps every studied topic alive, and works back from the exam date so that everything is fresh in the final weeks. Progress shows whether your pace leaves room for full revisions. |
| Past papers decide what matters | Each topic shows how often it has been asked. That frequency sets the topic's weight automatically; there is no "importance" field to fill. |
| Tracking the syllabus line by line | The syllabus is a checklist. Ticking a topic starts its revision cycle. |
| Analysing a mock matters more than taking it | A mock is not marked done until its mistakes are triaged. Results lead straight into the fix loop. |
| Calibrated risk in negative-marking papers (sure / 50-50 / guess) | Optional one-tap confidence while answering. The app reports your accuracy at each confidence level against the break-even for that paper's marking, and says which bets are paying. |
| Daily answer writing for mains | One or two past questions a day from topics studied recently, on a clock weighted by marks. You tap what the answer left out; those points become cards. |
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
| CAT | Not a target for now | The engine supports its pattern (sections, typed answers, calculator); a template follows when wanted. |

All dates are editable and are confirmed against the official notification when it appears. A blank template is included. Later packs: CSE Mains, NEET PG and medical professional exams, JEE. The engine already supports what these need: negative and partial marking, numeric and typed answers, multiple-correct, images, maths rendering.

## 7. How content gets in (no AI needed)

| Your source | How it enters |
|---|---|
| Official past papers | A **paper map** per paper: the answer key and the topic of each question, with no question text. It is a tiny file, prepared once in a Claude Code session, and makes answer-sheet mode need no entry at all while still giving results by topic. |
| Past Mains questions for the optionals | A pack of questions mapped to topics, prepared the same way. These are what recall and written answers draw on. |
| Coaching tests and other PDFs | Answer-sheet mode; you enter the key at the end and pick a subject for the paper. |
| Tests on a coaching website | Log the result; clip or note the mistakes. |
| Books and paper practice | Answer-sheet mode or the pacer. |
| Marking points for a topic | They grow from your own "what I missed" notes after each recall and answer. Pasted from an AI or your notes when you want them sooner; anything not from you is labelled unverified until you confirm it against your source. |
| Memory-heavy lists (species, formations, formulae) | Paste a two-column list; each row becomes a quick card. |

The app ships no copyrighted papers. Paper maps carry only numbers, keys and topic names.

## 8. AI assist: later and optional

Not part of the first builds; you have no API key now and nothing above depends on one. A slot is kept so it can be added without reshaping anything. With a key it would draft questions from a PDF, give feedback on a written answer, or explain a mistake, always as drafts you approve.

## 9. Study Director and Practice Director: two apps, one seam

### What Study Director is

Study Director answers "how did I spend my day?"; Practice Director answers "what do I know, and what can I score?". They meet at the subject, the timer and the notes.

| Study Director surface | What it does |
|---|---|
| Plan | A day of time blocks (work, support, fixed) built on a board or pasted as text, with templates, saved plans, a default plan, and a draft that must be applied. Each block can carry an Area and a measurable target. A study day runs 04:00 to 03:59. |
| Execute | A timer that follows the applied plan: run, pause, finish, skip, extra time, done/total progress, a drift indicator against the clock, Adjust Plan tools, Pomodoro rhythm, screen-awake, sounds and device notifications. Area notes sit beside the running block. |
| Practice Pacer | A stopwatch inside a work block for answers, questions or paper sections: one repeated target, or a paper plan with fixed-time or marks-weighted groups. It records unit times, not correctness. |
| Review | Brings plan and timer evidence together, lets you correct progress, add a quality rating, reflection and carry-forward note, then Save Today. Without a study day it is a diary. |
| Library | Notes (nested, rich text, images, PDFs, audio, tags, links between notes, full-text search, import, recently deleted), Saved Days and Diary, and Data (Device Folder and Drive backups, version history, three restore modes, encrypted standalone files, attachments). |
| Insights | Seven read-only surfaces built from saved days, led by a Coach that keeps two priorities open, and careful to withhold findings when evidence is thin. |
| Sync | Local-first on every device; Drive carries changes between them. Clashes are kept as "Needs review". Today's session runs on one device at a time and is handed over with Continue Here. Multiple profiles. |

### Lessons taken from it

- **No "apply" and no "save" steps.** Study Director's draft-versus-applied plan and its Save Today ritual are its two heaviest concepts. In Practice Director the plan is always live and everything is recorded as it happens.
- **Honest evidence.** Keep its distinction between explicit progress, time-derived estimates and missing data. Missing is never treated as failed.
- **Two priorities, not twenty.** Progress leads with at most two things to act on, as its Coach does.
- **Features must surface where they are needed.** Its own backlog notes that tags and note links are buried in the Library. Practice Director shows notes, mistakes and last-mile sheets on the topic and in the session, not in a separate store.
- **Sync that sends only what changed.** Its Drive backups take over 20 seconds and the hand-over feels heavy; a review of the repository design and of hand-over versus live sync is already on its backlog. Practice Director's sync is designed from that review's conclusions, so both apps end up on one engine, and its add-only history keeps uploads small.
- **Notifications that expire.** Few, and each one disappears once it no longer applies.
- **Second device starts with "Connect Drive".** A new phone should find existing data before asking for anything.
- **Same day boundary.** 04:00, so a day means the same thing in both apps.
- **The pacer's paper plan** (time per question weighted by marks) is reused for written answers and answer-sheet mode.

### Two universes (proposed 14 Nov, replaces "absorb Study Director")

Your day has two parts, studying and practising, and each gets one app that is whole by itself.

| | Study Director | Practice Director |
|---|---|---|
| The question it answers | How did I spend my day? | What do I hold, and what can I score? |
| Owns | The day plan, timer, Pomodoro, notes, diary, insights on time, and the **Calendar** | The syllabus, the memory schedule, recall, papers, written answers, mistakes, results |
| Built from | Study Director, Calendar | Practice Desk, Revision Director |

**Why the Calendar belongs in Study Director.** A calendar is about time, and Study Director is where time is planned. Its day board becomes week, month and year views with repeating blocks, exam dates and planned-against-actual, which the Calendar library already supports and already has a Study Director adapter for. That is a separate piece of work in the Study Director repo.

**Why Revision Director's engine belongs in Practice Director, although revision feels like study.**

- Revision that works is retrieval: recalling, answering, writing. That is practice.
- The memory schedule needs the evidence that practice produces. It must know that you rated a topic well but scored 2 of 6 on its questions, and it must schedule a mistake's re-attempt in the same queue and the same hours as a recall. Put the schedule in one app and the questions in another and you are carrying data between them again, which is the problem this project began with.
- Rereading notes is study and stays in Study Director as a block of time. Practice Director records it as "reread" when told, and still asks you to recall the topic later.

**Revision still shows up in your study day.** The engine sits in Practice Director, but what is due appears in Study Director through the seam.

### Where the calendar belongs, from first principles

The test is one question: **who decides the dates?**

- A **calendar** is for things a person places in time and then looks at, moves and resizes: "Geology Paper II this week", "a full paper on Sunday morning", "exam on 23 May".
- A **schedule** is worked out by a rule. Nobody places its entries, and moving one by hand makes it worse.

Applied to the three kinds of work:

| Work | Who decides when | What it needs |
|---|---|---|
| Study (first reading) | You. Which subject this month, which chapters this week, what today. | A calendar. This is ordinary planning, and it spans months. |
| Revision | The forgetting curve. Each topic's next date follows from how the last recall went, and changes after every recall. | A schedule, shown as today's queue and a forecast of the load per day. Several hundred moving entries on a calendar would be noise, and dragging one to a later date overrides the one thing the engine is good at. Planning revision by hand is the task you say you are worst at, so the app does not hand it back to you. |
| Practice | Mostly the same engine (which mistakes, which weak topics). You place only a few things: full papers and the exam dates. | A date on each paper. One or two entries a week do not justify a calendar screen. |

So revision does need long-range planning, but a machine does it; what you need to see is how much is coming, not a grid of entries.

**One place for your hours.** A Sunday-morning paper is three hours of your day. It has to be seen beside study blocks, meals and everything else, or it will be double-booked. Your hours are allocated in Study Director, so the calendar goes there. A second calendar in Practice Director would be a second place claiming the same Sunday.

### How a calendar fits Study Director

Today Study Director knows one day. A calendar adds the levels above it without changing the day.

| Level | What you do there | What exists today |
|---|---|---|
| Year and month | Exam dates; milestones such as "finish Forestry Paper I by 31 December"; which subject leads each month | Nothing |
| Week | Which subjects on which days; repeating blocks (morning routine, daily current affairs); hours per subject | Saved plans and the default plan, used by hand |
| Day | Blocks with start time, length, kind and Area | The Plan board |

- **The Plan board is already one day of a calendar.** Its blocks have a start, a length, a kind and an Area, which is what a calendar event is. A week view is seven boards side by side.
- **Each morning's board can start from the week you laid out**, instead of being built from nothing. It is still a draft you reshape freely, and if you never use the week level, Study Director works exactly as it does today. Templates and saved plans become repeating blocks.
- **Unfinished work is moved, not retyped**: drag a block to Thursday.
- **Planned against actual, over weeks.** Study Director already records what really happened. Laid on a calendar, a month shows where plans and reality part, which speaks directly to keeping to a timetable.
- **Outside commitments** (travel, family) come in from Google Calendar and block out time before you plan around them.
- **Practice Director publishes into it** as a separate layer you can show or hide: exam dates, paper slots and the recall time due each day. It is information beside your plan, never a block placed in it. Moving a paper there moves it in Practice Director.

Practice Director keeps only what it needs to stand alone: a date on each paper, the countdown, and the 14-day load forecast.

### The seam: three links

All three travel through your own Google Drive. Until they exist each app works alone, and the cost is ticking a studied topic by hand in Practice Director.

1. **Studied → ticked.** A finished study block with an Area tells Practice Director the topic was studied.
2. **Due practice → offered to your day.** Today's recall and practice time is offered as a block you can place, resize or ignore; nothing enters the plan unless you put it there. Exam dates, paper slots and the recall load appear on the calendar as their own layer. Opening a placed block jumps to the session; the time spent flows back as the block's evidence.
3. **Topic ↔ note.** When you check a recall, "open my note" shows the Study Director note with the same name.

What keeps the seam cheap: the same 04:00 day boundary, Area names that match topic names, one approach to sync and backup, and a sibling look.

**Hosting**: separate web addresses. Study Director holds your real daily data and is not touched by this build.

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
- **Dates**: exams, scheduled papers, the hours you allow. The calendar itself lives in Study Director.

One scheduler serves both recalled prompts and re-attempted questions, with separate tuning per kind, because recalling a topic and re-solving an MCQ behave differently. The fixed 90% retention policy stays as the only policy; Revision Director's own benchmark showed the Cost-ADR alternative cost about 18% more sessions, so that option is dropped.

### Storage and sync

- IndexedDB for records; browser file storage (OPFS) for images, PDFs and answer photos.
- One backup file format, optionally encrypted.
- Google Drive sync for laptop + phone, building on Study Director's engine and the lessons in section 9. It is much simpler here: history entries only ever get added, so two devices merge by union, only new entries are uploaded, and derived views are recomputed. A test in progress belongs to one device at a time.

### What is reused

| From | Carried over | Left behind |
|---|---|---|
| Practice Desk | Question and paper model, validation, test engine, scoring, timing evidence, calculator, mistake notebook logic, analytics, maths and image viewers, Wordgard authoring, backup integrity, agent content tools | SSC CGL papers as built-in content (become an optional sample pack), the single-file `file://` build, the current screens. Source-versus-Reviewed editions stay in the data model but appear only when a paper has both. |
| Revision Director | FSRS-7 scheduler with replay verification, optimizer and its safety gates, daily planner (exam proximity, weakness, balance, interleaving, time budget), corrective relearning, duration learning, interruption-aware timer | The unit and obligation forms, Study Log tab, plugin and public-bridge runtime, the script-concatenation build, the current screens |
| Calendar | Not used in Practice Director. Its home is Study Director (section 9), as a library dependency there (Ayana depends on it too, so a fork would split it). Practice Director uses only its export code for "Add to my calendar" and later supplies exam dates, paper slots and recall load to it through the seam. | All screens |
| Study Director | Borrowed now: Drive sync and backup engine design, encryption and integrity primitives, PWA install/update flow, phone safe-area handling, notification and sound coordinator, pacer | Planner, timer and notes stay in Study Director |

Practice Desk and Revision Director are frozen once Practice Director reaches parity with each.

### Tests

Carry over the tests that guard correctness of pure logic: scoring, attempt rules, FSRS replay and parity, planner determinism, backup integrity. Drop the old acceptance and visual suites, which test screens that will no longer exist. Add a small new set of browser journeys for the core flows at laptop and phone widths, with screenshots checked before any interface change is called done.

## 11. Build phases

Each phase ends with something you can use daily.

| Phase | Delivers | Replaces |
|---|---|---|
| 0. Design | Mock-up on a design canvas, reviewed and reworked once: Today, phone session, written answer, answer-sheet mode, results, Syllabus, Progress. Still to draw: the in-app test player, Practice home, first run, Settings. You approve before build. | — |
| 0b. Content | Syllabus packs for Forestry, Geology, General Knowledge and Prelims; paper maps for recent Prelims papers; past Mains questions mapped to topics. Done in Claude Code sessions, in parallel with phase 1. | — |
| 1. Remember | Interface kit and design system, storage, syllabus checklist, memory schedule, recall with tap-what-you-missed, Today, backup file | Revision Director |
| 2. Rehearse | Answer-sheet mode with paper maps and clipping, results, mistake re-attempts, cross-check, outside-practice log | Practice Desk (core) |
| 3. Write | Written answers with the marks-weighted clock, missed points to cards, Copy for AI, Paste from AI | — |
| 4. Sync | Google Drive sync, phone polish, install flow | — |
| 5. See | Progress, targets, load guard, weekly summary, daily anchor | — |
| 6. Full papers in-app (re-examine first) | Question bank, test player, set builder | Rest of Practice Desk |
| 7. Wider use | More exam packs, pack sharing, onboarding for other students | — |
| 8. The seam | The three links to Study Director. Integrating the Calendar into Study Director is its own project in that repo. | — |
| Later, optional | AI assist with a key | — |

Written answers moved up because IFoS rank is decided in Mains, which is entirely written. The in-app test player moved down because answer-sheet mode covers real papers from day one.

## 11a. Capability audit against the four apps

After the redesign I went back through what each existing app can do and what a full preparation cycle needs, and listed what the plan had lost or never had. These are now part of the design.

| From | Capability added to the plan | Phase |
|---|---|---|
| Practice Desk | **Save a question** even when you got it right, so good questions return too | 2 |
| Practice Desk | **One-line lesson on a mistake** ("what I should have seen"), shown when it comes back | 2 |
| Practice Desk | **Clip the explanation as well**, from a solutions PDF, as the back of the card | 2 |
| Practice Desk | **Changed answers** in results: how often you switched from right to wrong | 2 |
| Practice Desk | **Speed against accuracy** in the Timing view; keyboard shortcuts; text size | 2 |
| Revision Director | **Sticking points**: after repeated misses the app stops repeating the same card and proposes a different approach: reread the source, split the topic, or turn it into a table, diagram or mnemonic | 1 |
| Revision Director | **Prompt forms**: explain, list, compare in a table, draw, put in sequence | 1 |
| Revision Director | Timing that ignores interruptions, and time estimates learned from your own pace | 1 |
| Calendar | **Add to my calendar**: exam dates and paper slots exported so your phone's own calendar reminds you. Uses the library's export code without its screens. | 5 |
| Calendar | **Print** the final-month sheets | 5 |
| Study Director | Screen stays awake and sound cues during timed work | 2 |
| Study Director | A sample-data preview and an in-app guide | 1 |
| Study Director | Backup versions you can go back to; encrypted backups | 4 |
| Study Director | The marks-weighted pacer across a whole paper | 3 |
| New | **Full Mains paper rehearsal**: three hours, a choose-your-questions step, the pacer across questions, then the same tap-what-you-missed check for each answer | 3 |
| New | **Read next**: unread topics ordered by how often they are asked | 1 |
| New | **Search** across topics, mistakes and clips | 5 |
| New | **Accuracy by question type** in Prelims (statement-based, matching and so on), when the paper map records the type | 2 |
| New | General English practice (essay, précis) through the written-answer flow | 3 |

### Second audit: beyond the four apps

Asked again whether anything outside the four apps is missing, these passed the value test and are added:

| Capability | Why it earns its place | Phase |
|---|---|---|
| **Briefing before a paper** | Your own standing lessons shown at the moment they can be used: "last time, misreading 'not correct' cost 9 marks; your pure guesses lose marks". | 2 |
| **Form and admit-card dates** | Notification, application deadline and admit-card dates sit in the exam template and on the road. Missing a form costs more than any weak topic. | 1 |
| **Where to reread** | One optional line per topic naming your source (book, chapter, pages), shown when a recall fails. Supports the habit of few sources. | 1 |
| **Share for feedback with a person** | The same one-tap package as Copy for AI (question, your answer or its photo, marking points), sent to a mentor or friend. | 3 |
| **Your data in readable form** | Everything can be exported as plain files that outlast the app. | 4 |

### Cut or pushed back as unnecessary

| Item | Verdict | Reason |
|---|---|---|
| Personal tuning of the memory model (the optimizer both source apps built) | Much later, perhaps never | It needs thousands of reviews to beat the standard settings and brings a large component for a small gain. |
| Source and Reviewed editions of a paper | Dropped from the interface | Official papers have official keys. The field stays in the data for coaching papers. |
| In-app question authoring studio | Pushed to "wider use" | Paper maps, clips and packs cover your content without it. |
| In-app test player and full question bank | Kept at phase 6, to be re-examined before it is built | Prelims and Mains are sat on paper, so answer-sheet mode beside the PDF is closer to the real exam than an on-screen player. The player matters for screen-based exams such as CAT. It is the largest single piece of work in the plan. |
| Much of the safety machinery in the two source apps (replay verification, scheduler rebases, ownership leases between tabs) | Not carried over | One add-only history with views rebuilt from it makes most of it unnecessary. A simple integrity check and a single-tab guard remain. |

Considered and left for later: interview-stage preparation, a current-affairs feed, an in-app drawing canvas, multiple profiles on one device, two-way Google Calendar sync, and a plug-in interface.

Still thin after this audit, and stated so plainly: current affairs has only a monthly topic; General English has a clock but no real self-check; and several screens are not yet drawn (the in-app test player, Practice home, first run, Settings, search, a tablet layout).

## 12. Decisions and open points

Settled:

- Custom interface on a small in-house kit; no framework.
- One visual style, improving on Study Director's Glass look.
- Fixed-retention scheduling only.
- No import of old data from Practice Desk or Revision Director (there is none).
- Separate web address from Study Director.
- No AI in the first builds; copy-and-paste bridges to AI instead.
- Four places, not five; no calendar screen in Practice Director.
- Practice time: 2 to 4 hours a day. The session has a core that fits 2 hours and an extension up to 4.
- Targets default to 55% of each paper's marks and can be changed per paper.
- Recall and written answers are checked by tapping what was missed, not by self-rating.
- CAT is not a target for now.

Open:

1. Whether the two-universe split in section 9 is how you want it: Calendar into Study Director, Revision Director's engine into Practice Director.
3. IFoS Mains dates and all exam patterns are confirmed against official notifications when templates are written.

## 13. Known limits

- **It cannot check content.** Marking points are only as good as their source. Your own notes are the authority; anything pasted from an AI stays labelled until you confirm it.
- **Tapping what you missed is still self-report.** It is more honest than a single rating, and the cross-check against questions catches drift, but it is not an examiner.
- **Memory dates are estimates** from a forgetting model, shown as dates and not as percentages for that reason.
- **Double entry with Study Director** is the main risk to daily use until the two are linked: a topic studied there still has to be ticked here.
- **Value depends on the content packs.** Without the syllabus, paper maps and past questions for your papers, the first week would be setup instead of practice. Phase 0b exists for this.
