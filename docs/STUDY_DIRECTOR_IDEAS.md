# Ideas for Study Director

Consolidated 14 Nov 2026. These came out of planning Practice Director but belong to Study Director. Nothing here is built or final, and none of it is in this repo's scope; it is kept here so it is not lost. Why the two apps are split this way is in [ECOSYSTEM.md](ECOSYSTEM.md).

Everything below follows the same rules as Practice Director: the owner plans, the app informs; things are recorded by themselves and stay editable; nothing should feel like a procedure.

## 1. Plan with a margin: how "I plan, the app informs" works

The owner plans and runs the day by hand and will keep doing so. Long-range planning has to help that, not replace it. A concept screen is on the design canvas ("Study Director: Plan with a margin") and in `design/mockup/SD-Plan-concept.dc.html`.

### Two sides of one screen

- **Your side** (left, wide): the plan. Only you write here.
- **The app's side** (right, narrow), headed "Worth knowing": facts and offers. Each offer has a Place button or can be dragged across. Nothing enters the plan unless you put it there.

The app does three things: remember, compute, offer. You do three: place, change, ignore.

### What appears on the app's side

| Kind | Example | You can |
|---|---|---|
| Pace toward your milestone | "Forestry Paper I by 31 December needs about 11 hours a week from here. You gave it 12 and have done 6.5." | Leave it, or move the date |
| Your week against itself | "Geology is behind: 3 of 10 hours. Two blocks would bring it level. Or lower the 10; it is your number." | Place a block, or change the number |
| Left over | "Forestry, chapter 7: 18 pages left, from Wednesday" | Place, move to a day, split, let go |
| From Practice Director | "45 minutes of recall due today. Sunday's paper is at 9:30." | Place, or ignore |
| From your own record | "Blocks after 8 pm: finished 2 of the last 7" | Bear it in mind |
| A deadline approaching | "Prelims form closes 2 February" | Set a reminder some days ahead |

### When the plan and the day part ways

Plans change and execution is never exact. This is where the value lies.

- What you actually did updates the week's hours, and the week updates the pace each milestone needs.
- If a milestone can no longer be met at the pace you really keep, the app says so early and gives the choices: "At your actual pace this ends 12 January, not 31 December. Move the date, or give it 3 more hours a week."
- It never moves anything itself.

## 2. The calendar

The owner expects this to help a great deal and wants it designed carefully and fully. What follows is a first pass, not that design.

### One Plan, four distances

Plan gets a switch: Day · Week · Month · Year. The calendar is these views, not a separate screen. A year is the furthest view.

| Distance | What you set | How firm |
|---|---|---|
| Year | Exam dates, deadlines, milestones, long windows (a phase, a trip) | A handful of dates |
| Month | Which subject leads; windows and fixed dates within the month | An outline |
| Week | Hours for each subject, and the few fixed points | A budget, not a timetable |
| Day | Timed blocks | Exactly as today |

The rule is **plan loosely far away, firmly close up**. A week is hours per subject, not seven days of timed blocks, so each day is still laid out by hand.

### What can be put on it

| Item | What it is | Example |
|---|---|---|
| Block | Timed work on a day | Geology, 7:00, 1 h 30 |
| Fixed point | Something at a set time that study must fit around | A full paper, Sunday 9:30; an appointment |
| Window | A span of days | "Mains answer-writing month"; travel, 3 to 6 December |
| Deadline | A date by which something must be done | Prelims form closes 2 February |
| Milestone | A deadline with work attached | Forestry Paper I read by 31 December |
| Obligation | A thing to do on or by a date, not study | Fill the form; collect a document |
| Repeating item | Any of the above on a pattern | Current affairs every morning; a paper every Sunday |

### Deadlines that work backward

A deadline can be a bare date or carry work. For a bare date the app offers a reminder some days ahead. For a milestone it works back to the weekly pace the work needs and keeps that figure current as weeks pass.

### What the day gains

- **The Plan board is already one day of a calendar.** Its blocks have a start, a length, a kind and an Area. A week view is seven boards side by side.
- **Each morning's board can start from the week you laid out**, instead of from nothing. It is still a draft you reshape freely. Templates and saved plans become repeating items.
- **Planned against actual, over weeks and months.** Study Director already records what really happened. A month view shows where plans and reality part.
- **Outside commitments** come in from Google Calendar and block out time before you plan around them.
- **Practice Director's layer**: exam dates, paper slots and the recall time due each day, shown beside your plan and never placed in it.

### What the Calendar library already provides

Recurrence and exceptions, drag and resize, time zones, month, week, day, year and multi-month views, milestones and deadlines, planned against actual, availability shading, Google Calendar and ICS, reminders, print, and an existing Study Director adapter. The library projects the host's data and does not keep its own copy, which fits Study Director owning its records.

### Open design questions for the careful pass

1. Does a week need anything beyond hours per subject and fixed points, such as a preferred subject per day?
2. What exactly does the month view add between year and week?
3. How do repeating items replace templates, saved plans and the default plan without losing what works today?
4. How does this meet the draft-and-apply step of today's Plan?
5. How is pace computed for a milestone: from hours, from units (pages, topics), or either?
6. How do calendar items travel through sync?
7. Which views matter on a phone?

## 3. Unfinished work

### What it is today, and why it goes unused

"Make Unfinished Note" (under Adjust Plan in Execute) writes a block of text listing the blocks you did not finish. You can copy it. It is saved with the day and shown in Review and the Library. The owner never uses it and finds it a bureaucratic procedure. It is a note about unfinished work, not a mechanism that does anything with it:

- You have to ask for it.
- It is text; acting on it means copying and retyping it into another day's plan.
- It is filed with the finished day, in the Library.
- It does not say what remains, only that a block was not finished.
- Nothing ever closes it.

### What it should be: a "left over" tray

Unfinished blocks stay alive as blocks.

- **Made by itself.** When the day ends, every block not finished or skipped goes into the tray with what remains of it: time, or units where the block had done/total (18 pages of 30). No button, no step.
- **Editable**, the way Review lets you correct a day today: change what remains, rename, remove.
- **Shown where you plan**, on the app's side of the Plan screen and beside the calendar.
- **Yours to place.** Drag into today, drop on another day, split, or let go.
- **No guilt pile.** Each item shows its age. After about a week it asks once whether you still want it, then goes.
- **Review reads plainly**: "3 things left over today".

A separate, optional **note to tomorrow** (one line) appears at the top of the next day's Plan instead of in the Library.

### What the other pieces add

- **Calendar**: a leftover can be dropped on any day, and week and month views show what keeps slipping.
- **Practice Director**: unfinished revision and practice never need carrying forward; the memory schedule spreads skipped work by itself. Only study work, which the owner places by hand, uses the tray.
- **The seam**: when a leftover reading block is finally finished, its topic is ticked in Practice Director.

## 4. The seam, from Study Director's side

1. A finished study block with an Area tells Practice Director the topic was studied.
2. Practice time due is offered as a block to place; exam dates, paper slots and recall load show as a layer on the calendar.
3. A Study Director note can be opened from Practice Director when checking a recall on the topic of the same name.

## 5. Related items already on Study Director's backlog

- Notes features (tags, links) are hard to discover; a redesign is requested.
- Backup and sync review: repository design, hand-over against live sync, speed. Practice Director's sync is meant to follow its conclusions.
- Notification lifecycle: each notice should expire once it no longer applies.
- A second device should start with "Connect Drive".
