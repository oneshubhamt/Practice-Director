# Decision log

How the idea has changed, in order, and where each question stands. Consolidated 14 Nov 2026 from the whole planning conversation. Nothing here is final until the owner says so.

## 1. Where things stand

| Question | Current position | Status |
|---|---|---|
| What is being built | Practice Director: one app for revision and practice, built from Practice Desk and Revision Director | Agreed in outline |
| How it relates to Study Director | Two apps: Study Director for time, Practice Director for marks, joined by three links; each works alone | Proposed; owner likes it, not final |
| Where the Calendar goes | Into Study Director, as Week, Month and Year views above its day board | Proposed; owner now expects it to help a great deal and wants it designed carefully |
| Where Revision Director's engine goes | Into Practice Director | Proposed |
| Who plans the day | The owner, by hand. The apps inform and offer; they never place work in a plan. | Owner's condition |
| Phases of the year | Drafted by the app from the exam dates; approved, edited or adjusted by the owner | Owner's ruling |
| The mock-up | Complete for Practice Director: 43 boards covering every screen, a design-system sheet, and the main screens in both themes; awaiting the owner's review. Five small amendments from the 15 Nov check are listed in `design/README.md` and not yet drawn | Phase 0, drawn; not yet approved |
| The rules behind the screens | Every "by itself" behaviour written as an exact rule with starting numbers, all changeable in one place ([RULES.md](RULES.md)) | Proposed; the owner has not read it yet |
| How the apps guide without dictating | Two sides of one screen: the owner's plan, and the app's "Worth knowing" | Owner's suggestion, refined; proposed |
| How much the owner must enter | As little as possible: recorded automatically, editable afterwards | Owner's condition, for every part of both apps |
| Sync | Both apps on the owner's Google Drive through one shared mechanism; no server | Agreed in principle; Study Director's engine is to be overhauled first |
| What is stored | Five kinds of data ([DATA.md](DATA.md)): bank content fetched per exam, records replaced in place, facts written once, files stored once, and everything else worked out, never stored | Proposed after the owner asked for a lean design |
| Prepared content | Practice Desk's question-bank form (one folder per paper, found through catalogue, exam and year), with refinements for what reaches a device. Two banks of one form: a published one with only what is safe to publish, and a bank of your own brought in as a file | Owner prefers that form and invited refinements; the two-bank split is proposed |
| PDF renderer | pdf.js, loaded only when a paper is opened | Agreed (15 Nov) |
| PDFs and sync | Every file, PDFs included, goes to Drive by default and comes down only where it is opened | Agreed (15 Nov) |
| Earlier versions kept | The latest, one a day for a week, one a week for a month, and one before anything large | Agreed |
| Interface technology | Custom, no framework, on a small in-house kit | Agreed |
| AI inside the app | None in the first builds; copy and paste bridges instead | Agreed |
| Hosting | Own web address, apart from Study Director | Agreed |
| Devices | Laptop (Chrome), Android phone (Chrome, installed), iPad (Safari, on the Home Screen): the three named in Study Director's backlog | Laptop and phone agreed; the iPad is assumed and to be confirmed |
| Exams | UPSC Prelims 2027 (23 May) and IFoS Mains 2027 (from 21 Nov; Forestry, Geology) first. CAT, XAT, PGDBA secondary. | Agreed; dates checked again on 15 Nov against several reports of UPSC's calendar |
| Practice time | 2 to 4 hours a day | Stated by owner |
| Target scores | Default 55% of a paper's marks, changeable | Default set; owner said 50 to 60% is what is needed |
| Test player, question bank, paper editions, authoring | All kept | Owner's ruling |
| Old data | None to import | Stated by owner |

## 2. Log

### 13 Nov 2026

1. **Starting brief.** Combine Practice Desk, Revision Director and Calendar into a new app, Practice Director, for the owner's IFoS and CAT preparation, usable by other students too. The owner finds the interface of all three poor: Calendar basic, Practice Desk rough, Revision Director bureaucratic and unclear. Their code may be used, not necessarily their tests. Planning only.
2. **First answers from the owner.** Study Director to be absorbed eventually (changed on 14 Nov); laptop and phone with sync; optional AI assist (changed later the same day); content from past-paper PDFs, coaching tests, books and the owner's notes. Study Director is at most loosely linked for now.
3. **Plan, first version.** One daily loop; five places (Today, Practice, Syllabus, Plan, Progress); exam templates and syllabus packs for generality; Preact for the interface; Calendar as a library; same web address as Study Director suggested.
4. **Owner feedback.** No data in the old apps. Optionals are Geology and Forestry. Prefers a fully custom interface. No API keys, so no AI for now. The app must be automatic and never feel like a chore; user experience decides whether it gets used. Asked for proven UPSC preparation habits to be built in, said the scope is not limited to the existing apps, and asked for a deeper study of Study Director.
5. **Plan, second version.** Preact dropped for a custom kit. Same-address hosting reversed. AI moved out of the first builds. Answer-sheet mode and clipping added. Preparation habits written in as mechanisms. Exam dates checked. Study Director studied in depth and lessons recorded. First mock-up: six screens.

### 14 Nov 2026

6. **Owner asked for a first-principles review**, aimed at the highest possible rank, and said the coming CAT should not shape the app. Described themselves as self-contained, weak at planning revision and at keeping to a timetable, and asked that the app complement both their own habits and AI assistants.
7. **Review and third version.** A value test and four jobs (remember, measure, never waste a mistake, rehearse). Three depths of use. Self-rating replaced by tapping what was missed. Mistakes return as blind re-attempts. Written-answer flow added. Strength labels replaced by a draining memory bar with a cross-check. Targets, paper maps, load guard, minimum day and restart after a gap added. The Plan screen removed, leaving four places. Phases reordered. Mock-up reworked: seven screens, rendered and inspected this time.
8. **Capability audit** against the four apps: about twenty capabilities restored or added.
9. **Owner proposed two universes**, a study side and a practice side. Gave practice time and the level of marks needed.
10. **Two-app structure proposed**, replacing absorption: Study Director for time with the Calendar, Practice Director for marks with Revision Director's engine, three links between them.
11. **Owner liked the direction but did not finalise it.** Asked why the Calendar belongs in Study Director and how multi-day planning fits an app that knows one day. Answer recorded: a calendar is for dates a person decides; revision dates are decided by the forgetting curve, so revision needs a schedule and a load forecast.
12. **Owner's condition: the day must not be dictated by a machine.** Recorded as a principle: the app remembers, computes and offers; it places nothing. Consequences: choose-your-own by subject, kind and length; phases declared by the owner (refined in entry 18); practice time offered to the day, never inserted.
13. **Second audit, beyond the four apps.** Added: briefing before a paper, deadlines, a source line per topic, readable export. Proposed cutting or deferring several inherited parts.
14. **Owner on Study Director's unfinished-work feature**: never used, a bureaucratic procedure. Found to be a generated text note with no way to act on it. Proposed: a "left over" tray of live blocks, and a one-line note to tomorrow.
15. **Owner's rulings.** Suggested two panels in Plan, one to author and one for suggestions, with the calendar as part of Plan; adopted as "Plan with a margin". Briefing, source line and readable export: yes. Form and admit-card dates: added by the owner as deadlines in the calendar, which works back from them. Sharing answers with a person: dropped; AI only. Paper editions: keep, out of the interface by default. Authoring: keep, late. Test player and question bank: must stay. Safety machinery: left to the designer, who reduced it without loss of safety.
16. **Owner's confirmations and a request.** The left-over tray must be automatic and editable, like Review today; effortlessness is required of every part of both apps. The calendar will help a great deal (weeks and months, points and windows, forms, obligations) and must be designed carefully and fully. Both apps should talk to each other, stay independent, and share the sync mechanism. Asked that the whole conversation be organised and consolidated into documents for a final review; the documents were audited against the conversation and rewritten as a set.

17. **Owner asked for the mock-up to be finished**, end to end and with high polish, as the basis for development (phase 0 of the build). Done for Practice Director: 25 screens on the canvas, each rendered and inspected, with automated checks for broken links, tap-target size, text contrast, text size and narrow-width overflow. Choices made while drawing, all open to change: Search and Settings on the rail and no profile menu; a paused paper offered first on Practice; timed and untimed sittings, with only timed ones measured against the target; mistakes shown sure-and-wrong first; checking after a full paper can be spread over the week; a key-entry step for papers without a key; a first layout for Paste from AI; the test player's keys and question states taken from Practice Desk's own player.
18. **Owner's two rulings during the mock-up.** Phases are to be suggested and tentatively drawn by the app, then approved, edited or adjusted by the owner. Time is to be enterable freely, not only picked from fixed chips. Both applied to the documents and the screens.
19. **Owner asked for the remaining screens to be drawn**, leaving Study Director's for a separate pass. Drawn: a recall session on a laptop, the fix list with saved questions, the clipping tool, paper editions, the authoring studio, the pacer, six small sheets (add a paper, add topics, an exam's date and target, move a paper, earlier versions, keyboard shortcuts), history, the printed sheet, the memory-schedule page, the guide, and the main screens in the other theme. The canvas now has 43 boards, checked the same way as before. Choices made while drawing, all open to change: a correction to a paper records who made it, and one from an AI stays "not confirmed" until the owner says so; a sitting on the original edition keeps its score and the owner chooses whether it also counts under the corrected key, with the fix list following; saved questions live beside mistakes and return on the same schedule; a clip is a picture and no text is read out of it, so the question number comes from the place on the answer sheet; a changed history entry keeps the original underneath; the memory-schedule page offers only two actions (bring back a rested item, rebuild the dates from history) and says plainly that fitting the schedule to the owner's own memory is not built; the guide is five short pages, and the sample data is kept apart from the owner's records; keys 1, 2 and 3 for Sure, 50-50 and Guess, C to clip and N for a quick note are new, beside the test player's own keys; in the authoring studio a question's marks, topic and the paper's rules are filled in from the exam's pattern.

20. **Owner asked for the architecture and the data design to be reviewed** for leanness: store only what is needed, store nothing that can be worked out, replace in place wherever that suits, keep memory and storage small, lose no ability, and reuse the owner's repos directly where possible. Result: [DATA.md](DATA.md), and sections 1 to 5 of [BUILD.md](BUILD.md) rewritten. Five kinds of data. Worked-out data is never stored, on two conditions: the working-out uses no chance, and it stays fast. A sitting names its paper and no longer carries a copy; answers are stored in columns. What leaves a device is a records file, one facts file a month, and files by fingerprint. The source code was checked for how directly it comes over: Practice Desk's core nearly unchanged; Revision Director as rewritten logic with its tests; Calendar's export file as it is; Study Director's sync engine after its planned overhaul. Found on the way: no source app shows a PDF, so a PDF renderer is a new dependency; and reading an answer key from a photo would need a text-reading engine of several megabytes. Two screens adjusted (History, memory schedule). The owner said Study Director's backup system is to be overhauled massively; that plan was not available to this session, so the data design was written not to depend on it.

21. **Owner's replies to the data review.** Practice Desk now keeps content as a question bank with one chain of lists, and the owner prefers that to "packs shipped with the app"; adopted, with refinements the owner invited (fetched per exam, one generated index per family, a revised edition always as changes only, one compact file per paper, pictures as separate files). Asked that nothing meaningful be lost: checked item by item ([DATA.md](DATA.md), section 10); two things added back. Asked whether Revision Director is modular: it is typed and layered in 27 parts, but they share one scope with no imports, so nothing copies over as a file; converting all of it is not worth doing, since most is left behind. Reading a key from a photo: left open. Speaking instead of typing: wanted, parked. Asked whether the browser's own PDF viewer could replace a renderer: it cannot serve clipping or phones; answer recorded in BUILD.md, the owner's ruling awaited. Earlier versions: agreed as proposed. The owner supplied the plan for Study Director's new sync; it is consolidated on branch `SD` with a statement of what Practice Director needs from it, and section 6 of DATA.md now follows that plan (a changes file per device, versions built from pieces) in place of the three shared files first proposed.

22. **Owner agreed the data design, approved the PDF renderer and PDFs going to Drive by default, and asked whether everything for Practice Director has been thought through**, so that the plan, the screens and the details connect, before a detailed implementation plan is written for an agent to build from. The whole design was read again against that question. Three kinds of thing were found.
    - **Behaviour stated only as a sentence.** PLAN.md said what the app does by itself but not exactly how: what "due" means, how the order of Today is worked out, how a recall is graded from the points tapped, how the app works back from an exam, how phases are drafted, when the app speaks and on what evidence, how a typed line or a pasted key is read. All of it is now written as exact rules with starting numbers in [RULES.md](RULES.md). Two refinements came out of writing it: mistakes follow a short fixed ladder (first look, two days, seven days, solved) and not the forgetting model, which is what the screens already showed; and the final weeks before an exam are a rule of the schedule, not a phase to approve.
    - **Gaps.** (a) A mistake that was never clipped had nothing to show when it came back: a sitting now also records the page in view at each answer, so the PDF opens at the question and one drag clips it. (b) A reminder at a set hour is not possible from a web app with no server while it is closed: it becomes a repeating event added once to the phone's own calendar. (c) UPSC prints Prelims in four booklet series with different question order: a paper map names its series and carries all four keys, and the app asks once which series the owner's PDF is. (d) The app's address is public, so question text cannot sit beside it: the published bank holds only syllabuses, patterns, weights and maps, and question text comes in as a bank of the owner's own, one file of the same form. (e) Practice by topic across past papers has no text to draw on when papers are maps only: said plainly, with what "Build a set" does until phase 6. (f) A recall now records how many points were shown, so that adding a point later cannot re-grade an old recall. (g) A timed paper's clock, pauses and time-up were not defined: now they are. (h) Devices and browsers, speed and size budgets, format numbers, safety of pasted content, reach and error notes were nowhere: now in RULES.md, section 15.
    - **Decisions that are the owner's alone.** Listed in section 7 below with a recommendation each.

    Also corrected on the way: BUILD.md still described the first sync layout in one paragraph; PLAN.md and BUILD.md still offered reading a key from a photo, which is parked; the exam dates were checked again.

## 3. Positions that were reversed

| Was | Now | Why |
|---|---|---|
| Absorb Study Director into Practice Director | Two apps with three links | Each app has one job; the owner's day has two parts |
| Calendar inside Practice Director | Calendar inside Study Director | Hours are allocated in one place; revision dates are computed, not placed |
| Preact | Custom interface kit | Owner's preference; the kit gives the same consistency without a dependency |
| Same web address as Study Director | Separate address | Risk to real daily data |
| Optional AI in the app | Copy and paste bridges; AI later | No API key now |
| Five places | Four | The Plan screen duplicated Today and Study Director |
| Four-button self-rating | Tap what you missed | Self-rating invites flattery |
| "Fix" shows the answer | Blind re-attempt | Seeing an answer is not solving it |
| Five strength labels | Draining memory bar | The labels mixed knowing with recency |
| The app decides what, when and how much | The app offers; the owner decides | Owner's condition |
| Phases worked out from exam dates, then phases declared by the owner | The app drafts the phases from the exam dates as a tentative suggestion; the owner approves, edits or adjusts them | Owner's ruling: a suggestion saves the work, and approval keeps the decision the owner's |
| Time chosen from fixed chips | Chips for the common lengths, plus any length the owner types | Owner's question: there was no reason to limit it |
| Test player to be re-examined; editions dropped from the interface; authoring pushed far back | All three kept | Owner's ruling |
| One add-only history for everything that happens, with corrections added on top | Only facts are written once; records are replaced in place; a corrected fact is replaced too | Owner asked for a lean design that replaces in place wherever that suits. Undo and earlier versions cover a wrong change |
| Memory state, scores and the mistake list kept as stored views, rebuildable from the history | Not stored at all; worked out each time | Stored copies can fall out of step and need machinery to check them. Working them out takes a fraction of a second |
| A copy of the paper inside every attempt (Practice Desk) | A sitting names the exact edition it was sat on | The same promise, that an old sitting is never re-marked against a changed paper, at no cost |
| "Rebuild from history" on the memory-schedule page | Removed | The dates are rebuilt every time the app opens, so the button had nothing to do |
| One forgetting model for topics, mistakes and cards alike | Topics and cards on the forgetting model; mistakes on a fixed ladder that ends in "solved" | A mistake is to be solved, not carried for life; the screens already showed two right answers, days apart, then rest |
| The daily reminder as a notification from the app | A repeating event in the phone's own calendar, added once | No server, so a closed web app cannot ring |
| All prepared content published with the app | Maps, syllabuses and patterns published; question text in a bank of your own | The app's address is public |
| Sharing a written answer with a person | AI only | Owner's ruling |
| Calendar week level "optional" | A real part of planning, though the day never depends on it | Owner expects it to be useful |

## 4. Parked for later

- Interview-stage preparation (300 marks in IFoS).
- A fuller treatment of current affairs.
- A real self-check for General English.
- AI with a key inside the app.
- Personal tuning of the memory model.
- Reading an answer key from a photo. Left open by the owner on 15 Nov: whether and how is decided later. Paste, tap and a solutions PDF with real text cover the first builds.
- Speaking instead of typing. The owner wants it eventually. Good recognition of natural Indian English is heavy (a large model on the device, or an AI connection), so it waits. Until then the microphone on a phone's keyboard, and dictation on a laptop, already work in every text field of the app at no cost to it.
- Two-way Google Calendar sync (belongs with the calendar in Study Director).
- Multiple profiles on one device.
- Exam packs for other students: CSE Mains, NEET PG, JEE.

## 5. Considered and left out

| Idea | Why not |
|---|---|
| Percentile or peer comparison | Needs a server and other people's data |
| Energy, sleep or mood tracking | Not this app's job; no clear link to marks |
| Handwriting speed tracking | An extra input for a small gain |
| Recall by voice recording | Adds storage and nothing the tap check does not give |
| An in-app drawing canvas | The owner writes and draws on paper; a photo serves |
| A plug-in interface | No use for it inside one app |
| A calendar screen in Practice Director | See section 3 |

## 6. Still open

1. Final word on the two-app structure and the Calendar's home.
2. The careful design pass on the calendar ([STUDY_DIRECTOR_IDEAS.md](STUDY_DIRECTOR_IDEAS.md), section 2, lists its questions).
3. When Study Director work is taken up, and in which repo.
4. The layout for "Paste from AI": written out in RULES.md, section 11, and taken as settled unless the owner changes it.
5. The owner's review of the mock-up. Every Practice Director screen is drawn; the choices made while drawing are listed in log entries 17 and 19.
6. Thin areas: current affairs, General English, the interview stage.
7. Exam dates and paper patterns: checked again on 15 Nov against several reports that agree. Still to do when the first content is prepared: read the dates off UPSC's own file, and the pattern of an optional paper off a real paper's instructions.
8. The overhaul of Study Director's backup and sync, which both apps are to share. The plan and what Practice Director needs from it are on branch `SD` (`docs/sd/`). Until the engine is ready, phases 1 to 3 need no sync at all.
9. ~~The PDF renderer.~~ Approved by the owner on 15 Nov.
10. ~~Whether PDFs go to Drive by default.~~ Yes, by the owner on 15 Nov.
11. The refinements to the question-bank form ([DATA.md](DATA.md), section 2): which of them are made in Practice Desk's own bank, and which only in what Practice Director fetches.
12. The numbers in RULES.md. Each is a starting value in one file. None needs the owner's ruling before building, and all can be changed after a few weeks of real use.

## 7. Before building starts

Asked by the owner on 15 Nov: is everything thought through, and is phase 0 done?

**Settled, and enough to build from**

| Area | Where |
|---|---|
| What the app is for, its principles, its four places, every kind of practice | PLAN.md |
| Every screen | The mock-up, 43 boards |
| What is stored, what is worked out, how devices join, versions | DATA.md |
| The exact rule behind every automatic behaviour | RULES.md |
| Stack, modules, the four rules of the code, what is reused | BUILD.md |
| Devices, speed, formats, safety, reach | RULES.md, section 15 |

**The owner's alone to decide** (each has a recommendation, and none blocks the first weeks of building)

| # | Decision | Recommendation | Needed by |
|---|---|---|---|
| A | Approve the mock-up, or say what to change | Approve it as the reference, with changes welcome at any time: the interface kit is built before any screen, so a change to a screen is cheap until that screen's phase | Before the first screen is built (phase 1, second step) |
| B | How Practice Director relates to Practice Desk, which is still being developed | Copy the pure parts at a named commit, keep a list of what came from where, and let the two go their own way. Sharing one library between two apps would tie every release of one to the other, and the part most worth sharing (attempts) is the part Practice Director changes | Before porting starts (phase 1, first step) |
| C | Where the UPSC bank is written | In this repository, in Practice Desk's form, with the same content tools. Practice Desk's bank stays where it is for the families it holds | Before content preparation (phase 0b) |
| D | What may sit in the published bank | Syllabuses, patterns, weights and maps only. Past Mains questions and anything with question text in your own bank, until you decide otherwise | Before the first publish |
| E | Hosting | The same kind of static hosting Study Director uses, at its own address. Whether this repository is public is yours to say; nothing in the design needs it to be | Before the first build is put on a phone (end of phase 1) |
| F | The iPad | Supported from the start, since it is the natural device for the answer sheet | Phase 2 |
| G | Google sign-in for Drive | Reuse the project Study Director already has, with Practice Director's address added | Phase 4 |

**Decided when its phase arrives, not now**

- The careful design of the calendar, and everything else that is Study Director's (items 1 to 3 above).
- The three links between the two apps (phase 8).
- Which of the bank refinements are also made in Practice Desk (item 11).
- Thin areas: current affairs, General English, the interview (item 6).
- Reading a key from a photo, speaking instead of typing, AI with a key, fitting the schedule to the owner's own memory (section 4).

**Phase 0, plainly.** Drawn and written: yes. Approved by the owner: not yet. Content (phase 0b): not started; it runs beside phase 1 and is the main thing that decides whether the first week of use is practice or setup.
