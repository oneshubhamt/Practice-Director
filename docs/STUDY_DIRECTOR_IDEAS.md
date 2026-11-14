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

## 2. Calendar above the day board

Year and month for exam dates and milestones; week for subjects by day and repeating blocks; the existing Plan board as the day. The week level is optional. Detail and reasoning: [PLAN.md](PLAN.md), section 9, "How a calendar fits Study Director".

## 3. The seam, from Study Director's side

1. A finished study block with an Area tells Practice Director the topic was studied.
2. Practice time due is offered as a block to place; exam dates, paper slots and recall load show as a layer on the calendar.
3. A Study Director note can be opened from Practice Director when checking a recall on the topic of the same name.

## 4. Related items already on Study Director's backlog

- Notes features (tags, links) are hard to discover; a redesign is requested.
- Backup and sync review: repository design, hand-over against live sync, speed.
- Notification lifecycle: each notice should expire once it no longer applies.
