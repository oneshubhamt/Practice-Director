# Ideas for Study Director

Notes that came out of planning Practice Director but belong to Study Director. Nothing here is built or final, and none of it is in this repo's scope; it is kept here so it is not lost. The reasoning for the two-app split is in [PLAN.md](PLAN.md), section 9.

## 1. Unfinished work

### What it is today, and why it goes unused

"Make Unfinished Note" (under Adjust Plan in Execute) writes a block of text listing the blocks you did not finish. You can copy it. It is saved with the day and shown in Review and the Library.

The owner never uses it and finds it unintuitive. The reason is that it is a note about unfinished work, not a mechanism that does anything with it:

- You have to ask for it; it is not there when the day ends.
- It is text. To act on it you copy it and retype or paste it into another day's plan.
- It is filed with the day that is over, in the Library, which is the one place you will not be when you plan the next day.
- It does not say what remains (12 of 30 pages), only that a block was not finished.
- Nothing ever closes it, so it is neither a plan nor a record.

### What it should be: a "left over" tray

Unfinished blocks stay alive as blocks, not as text.

- **Made by itself.** When the day ends, every block that was not finished or skipped goes into the tray with what remains of it: time, or units where the block had done/total (18 pages of 30).
- **Shown where you plan.** The tray sits beside the Plan board the next time you plan, and beside the calendar.
- **Yours to place.** Drag an item into today, drop it on another day, split it, or let it go. Nothing is inserted for you; this follows the rule that the owner plans and the app informs.
- **No guilt pile.** Each item shows how old it is. After about a week it asks once whether you still want it, then goes.
- **Review reads plainly.** "3 things left over today" with the items, instead of a text panel.

A separate, optional **note to tomorrow** (one line, such as "start with Geology before breakfast") replaces the free-text part of the old note. It appears at the top of the next day's Plan, where it can be used, instead of in the Library.

### What the new pieces add

- **Calendar**: a leftover can be dropped on any day, and a week or month view shows what keeps slipping. "Evening blocks were left over on 4 of 5 days" is a finding Insights can state.
- **Practice Director**: unfinished revision and practice never need carrying forward at all. The memory schedule already knows what is due and spreads skipped work over the coming days. Only study work, which the owner places by hand, uses the tray.
- **The seam**: when a leftover reading block is finally finished, the topic is ticked in Practice Director like any other study block.

## 2. Plan with a margin: how "I plan, the app informs" works

The owner plans and runs the day by hand and will keep doing so. Long-range planning has to help that, not replace it. A concept screen is on the design canvas ("Study Director: Plan with a margin") and in `design/mockup/SD-Plan-concept.dc.html`.

### Two sides of one screen

- **Your side** (left, wide): the plan. Only you write here.
- **The app's side** (right, narrow), headed "Worth knowing": facts and offers. Each offer has a Place button or can be dragged across. Nothing enters the plan unless you put it there.

The app does three things: **remember, compute, offer**. You do three: **place, change, ignore**.

### One Plan, three distances

Plan gets a switch: Day · Week · Year. The calendar is these views, not a separate screen. A year is the furthest view.

| Distance | What you set | How firm |
|---|---|---|
| Year | Exam dates, deadlines (forms, admit cards), milestones ("Forestry Paper I read by 31 December") | A handful of dates |
| Week | Hours for each subject, and the few fixed points (a paper on Sunday morning, an appointment) | A budget, not a timetable |
| Day | Timed blocks | Exactly as today |

The rule is **plan loosely far away, firmly close up**. A week is hours per subject, not seven days of timed blocks, so each day is still laid out by hand, in whatever order suits that day.

### What appears on the app's side

| Kind | Example | You can |
|---|---|---|
| Pace toward your milestone | "Forestry Paper I by 31 December needs about 11 hours a week from here. You gave it 12 and have done 6.5." | Leave it, or move the date |
| Your week against itself | "Geology is behind: 3 of 10 hours. Two blocks would bring it level. Or lower the 10; it is your number." | Place a block, or change the number |
| Left over | "Forestry, chapter 7: 18 pages left, from Wednesday" | Place, move to a day, split, let go |
| From Practice Director | "45 minutes of recall due today. Sunday's paper is at 9:30." | Place, or ignore |
| From your own record | "Blocks after 8 pm: finished 2 of the last 7" | Bear it in mind |
| A deadline approaching | "Prelims form closes 2 February" | Set a reminder some days ahead |

### Deadlines that work backward

A deadline can be a bare date (a form) or a date with work attached (a milestone). For the second, the app works back to the weekly pace it needs and keeps that figure current as weeks pass.

### When the plan and the day part ways

Plans change and execution is never exact. That is where this earns its keep:

- What you actually did updates the week's hours, and the week updates the pace each milestone needs.
- If a milestone can no longer be met at the pace you really keep, the app says so early and gives the choices: "At your actual pace this ends 12 January, not 31 December. Move the date, or give it 3 more hours a week."
- It never moves anything itself.

## 3. The seam, from Study Director's side

1. A finished study block with an Area tells Practice Director the topic was studied.
2. Practice time due is offered as a block to place; exam dates, paper slots and recall load show as a layer on the calendar.
3. A Study Director note can be opened from Practice Director when checking a recall on the topic of the same name.

## 4. Related items already on Study Director's backlog

- Notes features (tags, links) are hard to discover; a redesign is requested.
- Backup and sync review: repository design, hand-over against live sync, speed.
- Notification lifecycle: each notice should expire once it no longer applies.
