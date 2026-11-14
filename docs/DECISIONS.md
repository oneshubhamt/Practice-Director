# Decision log

How the idea has changed, in order, and where each question stands. The current design is in [PLAN.md](PLAN.md); this file records how it got there. Nothing here is final until the owner says so.

## Where things stand (14 Nov 2026)

| Question | Current position | Status |
|---|---|---|
| What is being built | Practice Director: one app for revision and practice, built from Practice Desk and Revision Director | Agreed in outline |
| How it relates to Study Director | Two apps: Study Director for time, Practice Director for marks, joined by three links | Proposed; owner likes it, not final |
| Where the Calendar goes | Into Study Director, as the levels above its day board | Proposed; owner unsure, reasoning in PLAN.md section 9 |
| Where Revision Director's engine goes | Into Practice Director | Proposed |
| Interface technology | Custom, no framework, on a small in-house kit | Agreed |
| AI inside the app | None in the first builds; copy and paste bridges instead | Agreed |
| Hosting | Own web address, apart from Study Director | Agreed |
| Devices | Laptop and phone, synced through the owner's Google Drive | Agreed |
| Exams targeted first | UPSC Prelims 2027 and IFoS Mains 2027 (Forestry, Geology). Screen-based exams (CAT, XAT, PGDBA) secondary. | Agreed |
| How the app guides without dictating | Plan with a margin: the owner's side and the app's side; offers cross only by hand | Proposed; owner's own suggestion, refined |
| Practice time | 2 to 4 hours a day | Stated by owner |
| Target scores | Default 55% of a paper's marks, changeable | Default set; owner said 50 to 60% is what is needed |
| Old data | None to import | Stated by owner |
| Who plans the day | The owner, by hand. The app informs and offers; it never places work in the plan. | Owner's condition |

## Log

### 13 Nov 2026

1. **Starting brief.** Combine Practice Desk, Revision Director and Calendar into a new app, Practice Director, for the owner's IFoS and CAT preparation, usable by other students too. The owner finds the interface of all three poor: Calendar basic, Practice Desk rough, Revision Director bureaucratic and unclear. Planning only.
2. **First answers from the owner.** Study Director to be absorbed eventually (changed on 14 Nov); laptop and phone with sync; optional AI assist (changed later the same day); content from past-paper PDFs, coaching tests, books and the owner's notes. The owner added that Study Director is at most loosely linked for now.
3. **Plan, first version.** One daily loop (plan, do, review, adapt); five places (Today, Practice, Syllabus, Plan, Progress); exam templates and syllabus packs for generality; Preact for the interface; Calendar as a library; same web address as Study Director suggested.
4. **Owner feedback.** No data in the old apps. Optionals are Geology and Forestry. Prefers a fully custom interface. No API keys, so no AI for now. The app must be automatic and never feel like a chore; user experience decides whether it gets used. Asked for proven UPSC preparation habits to be built in, said the scope is not limited to the existing apps, and asked for a deeper study of Study Director.
5. **Plan, second version.**
   - Preact dropped for a custom interface kit.
   - Same-address hosting reversed: Study Director holds real daily data and is not to be touched.
   - AI moved out of the first builds.
   - Answer-sheet mode and clipping added so any PDF or book becomes practice without data entry.
   - Preparation habits written in as mechanisms.
   - Exam dates checked: Prelims 23 May 2027; IFoS Mains reported from 21 Nov 2027 (one secondary source).
   - Study Director studied in depth; lessons recorded (no apply or save steps, honest evidence, two priorities, sync that sends only changes).
   - First mock-up: six screens.

### 14 Nov 2026

6. **Owner asked for a first-principles review** of the plan and mock-up, aimed at the highest possible rank, and said the coming CAT should not shape the app.
7. **Review and third version.**
   - A value test for every feature, and four jobs that pass it: remember, measure, never waste a mistake, rehearse.
   - Three depths of use, so a self-directed person is never forced to follow the plan.
   - Self-rating replaced by tapping what was missed.
   - Mistakes return as blind re-attempts, marked by the app.
   - Written-answer flow added, since IFoS rank is decided in Mains.
   - Strength labels replaced by a memory bar that drains, with a cross-check against question results.
   - Target scores, paper maps, load guard, minimum day and restart after a gap added.
   - The Plan screen removed; four places remain.
   - Build phases reordered: written answers earlier, the in-app test player later, a content phase alongside the first build.
   - Mock-up reworked: seven screens.
8. **Capability audit** against the four apps: about twenty capabilities restored or added (PLAN.md section 11a).
9. **Owner proposed two universes**: a study side and a practice side. Gave practice time (2 to 4 hours) and the level of marks needed (50 to 60%).
10. **Two-app structure proposed.** Study Director for time, with the Calendar; Practice Director for marks, with Revision Director's engine; three links between them. This replaces absorbing Study Director.
11. **Owner likes the direction but has not finalised it.** Open in the owner's mind: why the Calendar belongs in Study Director and not with revision or practice, and how multi-day planning fits an app that knows one day. Reasoning recorded in PLAN.md section 9: a calendar is for dates a person decides; revision dates are decided by the forgetting curve, so revision needs a schedule and a load forecast, not a calendar.
12. **Owner's condition: the day must not be dictated by a machine.** Study Director exists so the owner plans by hand, at an organic pace. Recorded as a design principle ("You plan; the app informs"): the app works out facts and makes offers; it places nothing in the plan. Consequences written in: choose-your-own by subject, kind and length; phases declared by the owner; practice time offered to the day, never inserted; the week level of the calendar optional.
13. **Second audit, beyond the four apps.** Added: briefing before a paper, form and admit-card dates, a source line per topic, sharing for feedback with a person, readable export. Cut or pushed back: the memory-model optimizer, paper editions in the interface, the authoring studio, much of the inherited safety machinery; the in-app test player is to be re-examined before it is built, because the target exams are sat on paper.

14. **Owner on Study Director's unfinished-work feature**: never used, unintuitive, unclear what it is for. Found to be a generated text note with no way to act on it. Proposed replacement: a "left over" tray of live blocks beside the Plan board, placed by hand, plus a one-line note to tomorrow. Recorded in STUDY_DIRECTOR_IDEAS.md, a new file for ideas that belong to Study Director.

15. **Owner's rulings and a question** (14 Nov).
    - Asked how "I plan, the app informs" fits with a calendar that guides; suggested two panels, one to author the plan and one for suggestions, with the calendar as part of Plan. Adopted: Plan with a margin, and Day, Week and Year views, a year at most. The owner expects the week level to be useful, not merely optional.
    - Briefing before a paper: yes. Source line per topic: yes, optional. Readable export: yes.
    - Form and admit-card dates: to be added by the owner as deadlines in the calendar, which should work back from them.
    - Sharing answers with a person: dropped; AI only.
    - Paper editions: keep the function, out of the interface by default. In-app authoring: keep, late.
    - In-app test player and question bank: must stay; needed for screen-based exams (CAT, XAT, PGDBA) and for AI-written questions. UPSC Prelims and Mains remain the first concern.
    - Safety machinery: left to the designer. Call made: reduced with no loss of safety (PLAN.md section 11a).

## Positions that were reversed

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
| Test player to be re-examined; editions dropped from the interface; authoring pushed to "wider use" | All three kept | Owner's ruling: screen-based exams and AI-checked papers need them |

## Still open

1. Final word on the two-app structure and the Calendar's home.
2. Whether the Calendar work in Study Director is wanted now or later; it is a separate project in that repo.
3. When Study Director work (calendar, left-over tray, the seam) is taken up, and in which repo session.
4. Screens not yet drawn: in-app test player, Practice home, first run, Settings, search, tablet layout.
5. Thin areas: current affairs, General English, the interview stage.
6. IFoS Mains dates and paper patterns to be confirmed against official notifications.
