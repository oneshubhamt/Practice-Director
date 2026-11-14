# The two apps and how they meet

Consolidated 14 Nov 2026. Proposed and liked by the owner, not yet final. Practice Director's own design is in [PLAN.md](PLAN.md); ideas that belong to Study Director are in [STUDY_DIRECTOR_IDEAS.md](STUDY_DIRECTOR_IDEAS.md).

## 1. Where we start from

Four repos were read and each app was run.

| App | What is genuinely good | Why it feels bad to use |
|---|---|---|
| **Practice Desk** | A solid exam engine: six question types, sectional timers and locks, negative marking, calculator, frozen attempts, detailed results, a mistake notebook with spaced revision, a content pipeline for agents, original and corrected editions of a paper. | The home screen is a settings form. Results are a wall of equally loud panels. It ships only SSC CGL papers, and getting your own content in is hard. |
| **Revision Director** | The smartest scheduling: memory scheduling kept separate from a daily planner that respects exam dates, time, weak areas and subject balance; proper handling of forgotten items. | Adding one topic needs about twenty fields. The vocabulary is internal jargon. Rating one recall asks for checkpoints, cue level and error types. It reads like a compliance tool. |
| **Calendar** | A capable, generic library: recurrence, drag and resize, time zones, availability, milestones and deadlines, planned against actual, year and multi-month views, Google Calendar and ICS, print. It already contains adapters for the other three apps. | It is a plain grid. Nothing in it knows about study, so it adds no insight by itself. |
| **Study Director** | By far the largest and most polished, and in daily use with real data: a day planner, live timer, practice pacer, daily review, a full notes system, insights, and Drive sync across devices. | Its unfinished-work feature goes unused; planning stops at one day. |

The deeper problem: three of these are three databases with three vocabularies, and the owner is the link between them. The same topic is typed into each. A paper's result never reaches the revision planner.

### What Study Director does today

| Surface | What it does |
|---|---|
| Plan | A day of time blocks (work, support, fixed) built on a board or pasted as text, with templates, saved plans, a default plan, and a draft that must be applied. Each block can carry an Area and a measurable target. A study day runs 04:00 to 03:59. |
| Execute | A timer that follows the applied plan: run, pause, finish, skip, extra time, done/total progress, drift against the clock, Adjust Plan tools, Pomodoro, screen-awake, sounds, notifications. Area notes sit beside the running block. |
| Practice Pacer | A stopwatch inside a work block for answers, questions or paper sections: one repeated target, or a paper plan with fixed-time or marks-weighted groups. |
| Review | Brings plan and timer evidence together, lets you correct progress, add a quality rating, reflection and carry-forward note, then Save Today. |
| Library | Notes (nested, rich text, images, PDFs, audio, tags, links, full-text search), Saved Days and Diary, and Data (Device Folder and Drive backups, version history, restore modes, encrypted files, attachments). |
| Insights | Seven read-only surfaces built from saved days, led by a Coach that keeps two priorities open and withholds findings when evidence is thin. |
| Sync | Local-first on every device; Drive carries changes. Clashes are kept as "Needs review". Today's session runs on one device at a time. Multiple profiles. |

### Lessons Practice Director takes from it

- **No "apply" and no "save" steps.** The plan is always live and everything is recorded as it happens.
- **Honest evidence.** Explicit progress, time-derived estimates and missing data are kept apart. Missing is never failed.
- **Two priorities, not twenty.**
- **Features surface where they are needed**, not in a library.
- **Sync that sends only what changed.**
- **Notifications that expire** once they no longer apply.
- **A second device starts with "Connect Drive"** and finds existing data.
- **The same 04:00 day boundary.**
- **The pacer's paper plan** is reused for written answers.

## 2. Two universes

The owner's day has two parts, studying and practising. Each gets one app that is whole by itself.

| | Study Director | Practice Director |
|---|---|---|
| The question it answers | How do I spend my time? | What do I hold, and what can I score? |
| Owns | The plan (day, week, month, year), timer, Pomodoro, notes, diary, insights on time, the **Calendar** | The syllabus, the memory schedule, recall, papers, written answers, mistakes, results |
| Built from | Study Director, Calendar | Practice Desk, Revision Director |

This replaces an earlier intention to absorb Study Director into Practice Director.

## 3. Why the Calendar goes into Study Director

The test is one question: **who decides the dates?**

- A **calendar** is for things a person places in time and then looks at, moves and resizes.
- A **schedule** is worked out by a rule. Nobody places its entries, and moving one by hand makes it worse.

| Work | Who decides when | What it needs |
|---|---|---|
| Study (first reading) | You. Which subject this month, which chapters this week, what today. | A calendar. |
| Revision | The forgetting curve. Each topic's next date follows from how the last recall went, and changes after every recall. | A schedule, shown as today's queue and a forecast of load per day. Several hundred moving entries on a calendar would be noise. |
| Practice | Mostly the same engine. You place only full papers and exam dates. | A date on each paper. |

Revision does need long-range planning, but a machine does it; what you need to see is how much is coming.

**One place for your hours.** A Sunday-morning paper is three hours of your day. It has to be seen beside study blocks and everything else, or it will be double-booked. Hours are allocated in Study Director, so the calendar goes there.

Practice Director keeps only what it needs to stand alone: a date on each paper, the countdown and a 14-day load forecast. It uses the Calendar library's export code for "Add to my calendar", and nothing else from it.

## 4. Why Revision Director's engine goes into Practice Director

Revision feels like study, but:

- Revision that works is retrieval: recalling, answering, writing. That is practice.
- The memory schedule needs the evidence practice produces. It must know you rated a topic well but scored 2 of 6 on its questions, and it must schedule a mistake's re-attempt in the same queue and the same hours as a recall.
- With the schedule in one app and the questions in another, the owner would be carrying data between them again.

Rereading notes is study and stays in Study Director as a block of time. Practice Director records it as "reread" when told, and still asks for recall later.

## 5. The seam: three links

Each app works fully alone. Together they do more.

1. **Studied → ticked.** A finished study block with an Area tells Practice Director the topic was studied.
2. **Due practice → offered to your day.** Today's recall and practice time is offered as a block you can place, resize or ignore. Exam dates, paper slots and recall load appear on the calendar as their own layer, which you can hide. Opening a placed block jumps to the session; the time spent flows back as the block's evidence.
3. **Topic ↔ note.** When checking a recall, "open my note" shows the Study Director note of the same name.

What keeps the seam cheap: the same day boundary, Area names that match topic names, a sibling look, and one sync mechanism.

Until the links exist, the cost is ticking a studied topic by hand in Practice Director.

## 6. One sync mechanism

Both apps keep all data on the device and sync through the owner's own Google Drive, with no server and no accounts. The owner has said this shared-repository approach is to be followed.

- Study Director's engine exists and works. Its own backlog holds a review of the repository design, of hand-over against live sync, and of speed (Drive backups take over 20 seconds).
- Practice Director's needs are simpler: its history only ever grows, so two devices merge by union and only new entries are uploaded. A test in progress belongs to one device at a time.
- The intent is one engine serving both, shaped by that review. The links in section 5 travel over the same Drive.

## 7. Hosting

Separate web addresses. Study Director holds real daily data and is not touched by the Practice Director build. A shared address would share storage limits, a "clear site data" would wipe both, their offline workers would overlap, and a bad deploy of one could break the other.
