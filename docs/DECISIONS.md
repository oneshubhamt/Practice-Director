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
| The mock-up | Complete for Practice Director: 43 boards covering every screen, a design-system sheet, and the main screens in both themes; awaiting the owner's review | Phase 0, drawn |
| How the apps guide without dictating | Two sides of one screen: the owner's plan, and the app's "Worth knowing" | Owner's suggestion, refined; proposed |
| How much the owner must enter | As little as possible: recorded automatically, editable afterwards | Owner's condition, for every part of both apps |
| Sync | Both apps on the owner's Google Drive through one shared mechanism; no server | Agreed in principle |
| Interface technology | Custom, no framework, on a small in-house kit | Agreed |
| AI inside the app | None in the first builds; copy and paste bridges instead | Agreed |
| Hosting | Own web address, apart from Study Director | Agreed |
| Devices | Laptop and phone | Agreed |
| Exams | UPSC Prelims 2027 and IFoS Mains 2027 (Forestry, Geology) first. CAT, XAT, PGDBA secondary. | Agreed |
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
| Sharing a written answer with a person | AI only | Owner's ruling |
| Calendar week level "optional" | A real part of planning, though the day never depends on it | Owner expects it to be useful |

## 4. Parked for later

- Interview-stage preparation (300 marks in IFoS).
- A fuller treatment of current affairs.
- A real self-check for General English.
- AI with a key inside the app.
- Personal tuning of the memory model.
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
4. The layout for "Paste from AI": a first proposal is in the mock-up, not settled.
5. The owner's review of the mock-up. Every Practice Director screen is drawn; the choices made while drawing are listed in log entries 17 and 19.
6. Thin areas: current affairs, General English, the interview stage.
7. Exam dates and paper patterns to be confirmed against official notifications.
8. The review of the sync mechanism that both apps are to share.
