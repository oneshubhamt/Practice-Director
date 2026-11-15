# Practice Director: product design

Consolidated 14 Nov 2026 from the whole planning conversation; brought in line with the full mock-up the same day. Nothing is built yet, and nothing here is final until the owner says so. How this design was reached is in [DECISIONS.md](DECISIONS.md); how it would be built is in [BUILD.md](BUILD.md); how it sits beside Study Director is in [ECOSYSTEM.md](ECOSYSTEM.md).

## 1. Purpose

Practice Director answers one question: **what should I practise now, so that what I studied turns into marks and is still in my head on exam day?** It then lets you do that practice on the spot and learns from the result.

**Who it is for.** First, its owner: preparing for UPSC Prelims 2027 and IFoS Mains 2027 (optionals Forestry and Geology), with screen-based exams (CAT, XAT, PGDBA) as secondary aims. The owner is self-directed, plans each day by hand in Study Director, practises 2 to 4 hours a day, and names two weaknesses: planning revision, and keeping to a timetable. The aim is the highest possible rank. Second, other students (CSE aspirants, medical students, JEE and others), which is why everything exam-specific lives in data and not in code.

**The test of success** is daily use. An app that feels like paperwork will not be used, and an unused app is worth nothing.

## 2. First principles

A feature stays only if it passes three tests: you cannot do it well in your head; a chat with an AI cannot do it, because the AI keeps no record, no clock and no memory between sessions; and it plausibly moves marks. Four jobs pass.

1. **Remember for you.** Nobody can track the forgetting of several hundred topics over a year by intuition. Planning revision is arithmetic.
2. **Measure you honestly.** Time per question, accuracy by topic, how often "sure" is wrong, what your answers leave out.
3. **Never waste a mistake.** Every mistake comes back as a blind re-attempt until it is solved.
4. **Rehearse the exam.** Real papers, real marking, the real hour of the day, and a clock weighted by marks for written answers.

One rule orders all the work: **marks gained per minute by exam day**. A topic's value is how often it is asked, times how far you are from holding it, divided by the time it takes.

Not its job: teaching content, planning your whole day (Study Director does that), being a notes app, or motivating by gimmick.

## 3. Principles of the experience

1. **You plan; the app informs.** Your day is yours. The app does three things: remember, compute and offer. You do three: place, change and ignore. Offers never enter a plan by themselves. When reality differs from the plan, the app redoes the sums and tells you what follows; it does not replan for you.
2. **Recorded by itself, editable afterwards.** Everything that happens is captured as it happens, and you can correct any of it later. There is no step whose only purpose is to make a record.
3. **Nothing to set up before the first session.** No configuration stands between opening the app and practising.
4. **One line to add anything.** A topic, a prompt or a log needs one line. The rest has defaults.
5. **Every input must pay for itself the same day.** If the app asks for something, you see what it bought you.
6. **Plain words.** "Due today", "Fading", "Fix mistakes". No scheduler terms on any main screen.
7. **One main thing per screen**, and one primary action. Detail is one tap away.
8. **The engine is invisible.** Integrity checks and memory-model settings live under Settings. The surface says only "Backed up 2 h ago".
9. **No guilt pile.** Missed days are spread forward inside your time, and stated plainly.
10. **Honest numbers.** No invented predictions. Each figure says what it rests on. Memory is shown as dates, not percentages, because it is an estimate.
11. **Phone and laptop are both first-class.** The phone suits recall, re-attempts and sitting beside your paper during a written answer. The laptop suits papers and PDFs. A session offers each device the part that suits it.
12. **Flow and motion matter.** Transitions carry meaning (where you came from, what changed) and are restrained.
13. **Works fully without AI.** Nothing in the core loop needs a key.

## 4. Three depths of use

The app must be worth using at three depths and never punish the lighter ones.

| Depth | What you do | What you get |
|---|---|---|
| Ledger only | Study as you please; tick topics, take papers in answer-sheet mode | The memory map, the measurements, the mistake list. No instructions. |
| Suggested | Press Start when it suits you | The session it would choose, cut to the time you have |
| Full | Follow the phases through the year | Everything, including the road and the weekly summary |

Work done on your own counts exactly as much as work the app suggested.

## 5. The four places

Today, Practice, Syllabus, Progress. On a laptop they are a slim left rail, with Search at its head and Settings at its foot; on a phone, a bottom bar, with Search and Settings as two icons on Today. There is no profile menu, because there are no accounts.

### Today

- Countdown to each exam.
- **Suggested for today**: an ordered list with a reason and a time for each item. It has a core that fits a 2-hour day, and below it a few offers you can add one by one, up to the 4 hours you allow. One **Start** button.
- **Choose your own**, beside Start, works by feel: pick a subject, a kind of work (recall, questions, writing, fixing mistakes) and a length, in any combination. You decide what and how long; the app only picks which items fill it.
- **Less time today?** Chips for the common lengths, and a field for any number of minutes you type, cut the session to its most valuable part. The same holds wherever a length of time is chosen: chips for speed, a typed value for anything else.
- **Your memory**: topics fresh, fading and not started, and how many of the fading ones today's session catches.
- The next full paper, set at the real exam's hour.
- A week strip. A skipped day is stated plainly and its work spread forward.
- **Quick note**: one line for anything you did on your own. The app shows how it read the line (which topic it ticked, what it recorded) with an Undo.

### Practice

- **Papers**: past papers and tests, grouped by exam; two taps to start. A paper's slot can be added to your phone's own calendar. A paper left half-done is offered first, on the device that holds it.
- **Fix mistakes** and **Saved questions**: the open list, and the questions you chose to keep.
- **Answer-sheet mode** (section 6).
- **Build a set**: topics, number of questions, source (unseen, my mistakes, weak topics, mixed).
- **Written answers** and **full-paper rehearsal** (section 6).
- **Quick cards** for memory-heavy lists.
- **Log outside practice**: a pacer and a ten-second results entry for tests taken elsewhere.

### Syllabus

- The topic tree for each paper. **Tick a topic once you have studied it; nothing else is needed** to start its revision.
- Each topic has a **memory bar that drains** as days pass, with a date: Fresh (till 4 Dec), Fading (recall today), Not started.
- A flag where your question results are worse than your recall suggests: "weaker in questions than you rate it".
- **Read next**: unread topics ordered by how often they are asked.
- A topic page shows memory, results in questions, how often it is asked, answers written, **what you tend to leave out**, past questions ready to write, and an optional line naming your source.
- Ticking topics shows the cost: "this adds about 4 minutes a day".
- Add a topic or a whole outline by pasting text, one line per topic.

### Progress

- **The road ahead**: phases from today to each exam. The app drafts them from your exam dates as a tentative suggestion; you approve the draft, or edit its dates, names and number of phases, at any time. When a phase date arrives the app asks and you confirm, postpone or change the road. A phase only shifts what is offered.
- **Two things that matter now**, never more, each with its reason.
- **Full papers against your target**. A target starts at 55% of a paper's marks and can be changed.
- **What you still hold**: fresh, fading and not started, by paper.
- **Recall work coming** over the next 14 days against the time you allow.
- **How marks get lost**: did not know, torn between two options, careless.
- A weekly summary written for you, the history archive (recorded by itself; any entry can be corrected afterwards, and the correction undone), and search across topics, mistakes and clips.

### First run and a second device

- **First run, under two minutes**: pick your exams, confirm the dates and optionals already filled in, say how long you practise on a normal day. The syllabus is preloaded and a first road is drafted. Take one past paper in answer-sheet mode; its result is the first reason to return.
- **A second device** starts with "Connect Drive" and finds your data before asking for anything.

### Settings

Exams, dates and targets; the time you allow on a normal day and at most (chips or a typed value); the one daily reminder; appearance and text size; data (backup, versions, export in readable form, sync); the memory schedule (advanced); working with an AI; an in-app guide and a sample-data preview; keyboard shortcuts.

## 6. How each kind of practice works

**Recall.** A topic comes up as a prompt. For Mains subjects the prompt is a past question wherever one exists. Prompts take the form the material needs: explain, list, compare in a table, draw, put in sequence. You say, sketch or jot the answer. The marking points then appear and you **tap anything you missed**. The rating is worked out from that: nothing missed, some missed, mostly gone. Missed points come back first next time and collect on the topic. With no marking points yet, you get three buttons and one line to note what you missed; those notes become the points.

**A mistake coming back.** The question appears as you clipped it and you **answer it again, blind**. The app marks it. Right: it returns once more after a few days, then rests. Wrong: tomorrow, and its topic moves up. A one-line lesson you wrote ("what I should have seen") shows after you answer.

**Answer-sheet mode.** For any PDF, book or coaching test, with no typing-in of questions. Your PDF sits beside a bubble sheet; on a tablet or phone the sheet becomes a dock under the page with one large row of answers. You answer against the clock and say when you are unsure: Sure · 50-50 · Guess. For official papers a **paper map** (answer key and topic of each question) is already loaded. For anything else you enter the key at the end: paste it in whatever form it comes, take it from a solutions PDF, or tap the letters (reading a key from a photo is parked); anything unreadable is marked for you to settle, and scoring can wait if you have no key yet. You can **clip** a question, and its explanation from a solutions PDF, straight from the page; the clip becomes the revision card. This is also closest to how Prelims is actually sat.

**Results.** A short story: the score against your target → where the marks went → three things to do next → whether your bets paid at each confidence level, against the break-even for that paper's marking → **Fix the mistakes**. Every question, timing, speed against accuracy, changed answers and time sinks (long and wrong: questions to have left) remain as tabs. A first look at each mistake takes one tap for the reason, pre-selected from what the app observed (answered in seconds, changed from right to wrong, left blank at the end, marked unsure). Mistakes are shown in the order worth looking at: sure and wrong first.

**Briefing before a paper.** Your own standing lessons appear before the clock starts: "your pure guesses lose marks", "misreading 'not correct' cost 9 marks last time". You choose to sit it as in the exam or untimed; only timed papers are measured against your target.

**Written answer.** The phone sits beside your paper. It shows a past question, runs a clock weighted by marks (about 9 minutes for 10 marks in a 200-mark, 3-hour paper), then shows the marking points for you to tap what your answer left out, and asks about the diagram. Missed points become recall cards. A photo of the page and **Copy for AI feedback** are optional.

**Full-paper rehearsal.** A whole Mains paper: three hours, a choose-your-questions step on the running clock, the pacer across questions (every mark gets the same time, and the screen says how far ahead or behind the paper you are), then the same check for each answer. The checking can be done at once or spread over the following days by itself. General English practice (essay, précis) uses the same flow.

**The in-app test player.** For papers held fully inside the app, and for screen-based exams. Distraction-free and faithful to the paper's own rules: sectional locks, question palette, mark for review, on-screen calculator where allowed, split view for passages, keyboard shortcuts. Ported from Practice Desk.

**Quick cards.** Paste a two-column list (species and botanical names, formations, formulae); each row becomes a rapid-fire card, asked one way or both: say it, show it, Knew it or Missed.

**Saving a question** you got right, when it is worth seeing again.

## 7. What runs by itself

| Mechanism | What it does |
|---|---|
| Memory schedule | Each studied topic and each mistake gets its next date from how the last attempt went. One schedule serves recall, re-attempts and quick cards. It works back from the exam so that everything is fresh in the final weeks. |
| Ordering | Work is offered in order of marks gained per minute: how often a topic is asked, how far you are from holding it, how long it takes. |
| Cross-check | Recall you rated well is compared with your results on that topic's questions. |
| Sticking points | After repeated misses the app stops repeating the same card and proposes a different approach: reread the source, split the topic, or turn it into a table, diagram or mnemonic. |
| What you tend to leave out | Missed points and mistake lessons collect per topic into a sheet for the final month, which can be printed. |
| Load guard | Before you take on more topics than your time can keep alive, the app says so, and offers to rest items that are low-value and reliably easy. You decide. |
| Time estimates | Learned from your own pace, ignoring interruptions. |
| A minimum day | Ten minutes that keeps the most at-risk items alive. |
| Coming back after a gap | A short restart session, with the pile already spread over the following days. |
| One daily anchor | A single reminder at the hour you choose. No other nagging. With no server the app cannot ring while it is closed, so the reminder is a repeating event added once to your phone's own calendar. |
| Rehearsal slots | Full papers are offered at the real exam's hour. |

The exact rule behind each row (what counts as due, how the order is worked out, when the app speaks) is in [RULES.md](RULES.md).

### Preparation habits these carry

| Proven habit | Carried by |
|---|---|
| Few sources, many revisions | The memory schedule; the optional source line shown when a recall fails |
| Past papers decide what matters | Each topic's weight comes from how often it is asked; there is no importance field |
| Tracking the syllabus line by line | The syllabus as a checklist; Read next |
| Analysing a paper matters more than sitting it | Results lead straight into fixing mistakes; a paper is not done until its mistakes have been looked at |
| Calibrated risk under negative marking | Sure · 50-50 · Guess, reported against break-even |
| Daily answer writing | A past question a day from topics studied recently, on the marks-weighted clock |
| Diagrams, maps and tables | "Draw it" prompts with a reference image; the diagram check after an answer |
| Short notes for the final month | "What you tend to leave out", gathered automatically |
| Current affairs revised monthly | A current-affairs topic created each month and scheduled like any other |
| Preparation in phases | The road ahead: drafted by the app, approved or adjusted by you |
| Weekly review | The weekly summary, written for you |
| Consistency over intensity | The time you allow, a week strip that states a rest day plainly, catch-up spread forward |

## 8. Exams and generality

Exam-specific behaviour comes from data files:

- An **exam template** defines stages and dates, papers, sections, timing, marking, allowed tools and answer formats.
- A **syllabus pack** is a topic tree for a paper. One topic can count toward more than one exam.

| Exam | Date | Standing |
|---|---|---|
| UPSC Prelims 2027 (CSE and IFoS share it) | 23 May 2027 | First priority |
| IFoS Mains 2027: Forestry, Geology, General English, General Knowledge | From 21 Nov 2027, seven days | First priority |
| CAT, XAT, PGDBA | Not fixed | Secondary; served by the in-app test player |
| CSE Mains, NEET PG and medical professionals, JEE | — | Later packs, for other students |

Dates are from UPSC's 2027 calendar, published on 20 May 2026, as carried by several news and coaching sites that agree with each other (checked again on 15 Nov 2026). The official file itself was not read; the dates are read off it when the exam templates are written.

Paper patterns. The marks and papers of IFoS Mains were checked against published summaries on 15 Nov 2026. The inner pattern of an optional paper is from memory, and is read off the instructions printed on a real paper when the first one is prepared:

| Paper | Pattern |
|---|---|
| Prelims General Studies | 100 questions, 200 marks, 2 hours, one-third of a question's marks deducted for a wrong answer |
| Prelims CSAT | 80 questions, 200 marks, 2 hours, qualifying at 33% |
| IFoS Mains | Six papers of 3 hours: General English 300, General Knowledge 300, and two papers of 200 for each of two optionals; then an interview of 300 |
| IFoS optional paper | 200 marks, 3 hours. Eight questions in two sections, five to be answered: questions 1 and 5 are compulsory, and of the other three at least one comes from each section |

## 9. Content

| Your source | How it enters |
|---|---|
| Official past papers | A **paper map**: the answer key and topic of each question, with no question text. A tiny file, prepared once in a Claude Code session. It can also record the type of each question (statement-based, matching), which gives accuracy by type. |
| Past Mains questions for the optionals | A pack of questions mapped to topics, prepared the same way. Recall and written answers draw on these. |
| Coaching tests and other PDFs | Answer-sheet mode; you enter the key and pick a subject. |
| Papers from uncertain sources, or mocks with errors | A **corrected edition** beside the original, after an AI or you have checked it. Both are kept; the interface shows editions only when a paper has more than one. Each correction records who made it: you, or an AI until you confirm it. A sitting taken on the original keeps its score, and you choose whether it also counts under the corrected key; the fix list follows that choice. |
| Tests on a coaching website | Log the result; clip or note the mistakes. |
| Books and paper practice | Answer-sheet mode or the pacer. |
| Marking points for a topic | They grow from your own "what I missed" notes. Pasted from an AI or your notes when you want them sooner. Anything not from you is labelled unverified until you confirm it. |
| Memory-heavy lists | Paste a two-column list. |
| Questions written inside the app | An authoring studio, in a late phase. |

The app ships no copyrighted papers. Paper maps carry only numbers, keys and topic names. A map names the booklet series it was written for, since UPSC prints each Prelims paper in four series. Question text and prepared marking points reach the app as a bank of your own, brought in as a file, never from the app's public address ([RULES.md](RULES.md), section 14).

Prepared content is kept as a question bank in the form Practice Desk now uses (one folder per paper, found through catalogue, exam and year, with original and revised editions), and is fetched for the exams you sit. See [DATA.md](DATA.md), section 2.

## 10. Working with AI

The app is the memory and the measurement; an AI is the reasoning and the content. Without a key, you carry things between them:

- **Copy for AI**: one tap copies a mistake, a written answer with its marking points, or your weekly state, as a brief to paste into any chat.
- **Paste from AI**: the app accepts key points, cards and question sets in a simple text layout that any assistant can produce. The layout is the one in the mock-up (a TOPIC line, then POINTS, CARDS and QUESTION blocks), taken as settled unless the owner changes it. The screen also gives a ready request to copy into the chat, so the assistant replies in that shape. The layout is written out in [RULES.md](RULES.md), section 11.
- **Packs** and paper maps are prepared in Claude Code sessions.

With a key, later and optional: drafting questions from a PDF, feedback on a written answer, explaining a mistake. Always as drafts you approve.

## 11. Words

| Old term | New term |
|---|---|
| Exam profile | Exam |
| Knowledge unit, notebook card | Prompt (something to recall) or Question (has an answer key) |
| Obligation | Due item |
| Evidence event | History entry |
| Daily capacity | The time you allow |
| Relearn, remediation, leech | Fix, sticking point |
| Retrievability, stability | Fresh or fading, with a date |
| FSRS policy | Memory schedule (Settings only) |

## 12. Look and feel

A calmer sibling of Study Director's Glass look: dark and light from one set of colour roles, one accent, one warm colour reserved for "needs attention", Inter throughout (Inter Tight for headings and large numbers), generous spacing, restrained motion. Reading surfaces are plain and high-contrast.

The mock-up is on a design canvas; its source is in `design/mockup/` and every screen is listed in `design/README.md`. It now covers Practice Director end to end: the four places on a laptop and on a phone, a daily session on both, every kind of practice, the whole path of a paper (briefing, answer sheet, clipping, key entry, results, mistakes and the fix list), paper editions, the authoring studio, the pacer, the moments the app speaks up, first run, Settings and the pages behind it (memory schedule, guide, earlier versions, keyboard shortcuts), history, the printed sheet, search, the AI bridge and a design-system sheet. The design-system sheet is the reference for colour roles, type, shape, controls, motion and wording.

Paper pages (answer sheet, results, mistakes, the test player) are drawn light and the rest dark. The four places, the phone session, the answer sheet and results are also drawn in the other theme, to show that each works in both. In the app the theme is your choice, and only the PDF page itself is always white.

**Not drawn.** Nothing of Practice Director's is left undrawn. Study Director's own screens (Plan with a margin, the calendar, the left-over tray) are a separate pass; the one concept board for it on the canvas has not been revised.

## 13. Known limits and thin areas

- **It cannot check content.** Marking points are only as good as their source. Your notes are the authority.
- **Tapping what you missed is still self-report.** More honest than one rating, and cross-checked against questions, but not an examiner.
- **Memory dates are estimates** from a forgetting model.
- **Double entry with Study Director** until the two are linked: a topic studied there must be ticked here. This is the main risk to daily use.
- **Value depends on content.** Without the syllabus, paper maps and past questions for your papers, the first week would be setup instead of practice.
- **Thin areas**: current affairs has only a monthly topic; General English has a clock but no real self-check; the interview stage (300 marks) is not covered.
