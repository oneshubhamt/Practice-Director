# Practice Director: the rules behind the screens

Written 15 Nov 2026. [PLAN.md](PLAN.md) says what the app does in a sentence each ("work is offered in order of marks gained per minute"). This document turns each such sentence into an exact rule, so that whoever builds it has no product decision left to make, and so that the owner can see and change what the app will actually do.

Three things hold for every rule here:

1. **Every number is a starting value.** All of them live in one file (`core/rules.ts`), each with a name and a one-line reason. Changing a number never needs a change anywhere else.
2. **No rule uses chance, and no rule reads the clock.** The date and time are passed in. The same records and facts give the same result on every device ([DATA.md](DATA.md), section 4).
3. **A rule that speaks to you needs evidence.** Each one names the least it must have seen before it says anything. Below that it stays silent; it never guesses.

Where a rule is the owner's to change in the app, it says so. The rest are changed in the one file.

## 1. Days, clocks and time

| Rule | Exact form |
|---|---|
| The day | Runs from 04:00 to 04:00. |
| The time zone | A setting, filled in from the device at first run (Asia/Kolkata for the owner). Every device uses the setting, not its own zone, so a day is the same day everywhere. |
| What a fact records | The instant it happened. Which day that was is worked out from the setting. |
| Time spent on a recall, a re-attempt, a card | Active time only. A stretch of more than 60 seconds with no touch, key or scroll is cut out. If the app goes to the background the clock stops. |
| Time in a timed paper | Wall-clock time, as in the hall. It is worked out from the moment of starting, never by counting ticks, so a sleeping tab or a locked phone cannot make it wrong. It keeps running if the app is in the background. |
| Pausing a timed paper | Allowed, because life interrupts. Each pause is recorded. A paper whose pauses add up to 5 minutes or less still counts as timed. Past that it is marked "timed, with a break" and is left out of the comparison with your target unless you say it should count. |
| Time up | The app says so and asks: **Finish**, or **Keep going (not counted)**. Answers settled after time are kept and shown apart ("7 more after time: 4 right") and never enter the score. No extra data is needed: the second each answer was settled is already stored. |
| Untimed paper | The same sheet with a clock that counts up. Never measured against your target. |
| Changing your mind later | Timed or untimed, and whether a paper with a break counts, can be changed on the paper's history entry. |

## 2. The memory schedule

One module, three kinds of item. Topics and quick cards follow a forgetting model. Mistakes follow a short fixed ladder, because the aim with a mistake is to solve it, not to carry the question for life; the idea behind it is carried by its topic.

### Topics you recall

| Rule | Exact form |
|---|---|
| The model | The standard forgetting model carried over from Practice Desk (FSRS, through `ts-fsrs`), with its standard settings, aiming for 9 recalls in 10 to succeed. Random scatter of dates is off. |
| What starts an item | Ticking a topic. The tick counts as a first successful meeting, so the first recall falls about 2 to 3 days later. |
| How a recall is graded | From what you tapped. With *n* points shown and *k* missed: none missed is **whole**; up to a third missed is **part**; more than a third is **gone**. In the model's terms: Good, Hard, Again. There is no "easy": nothing in the app lets you say a recall went better than complete. |
| With no points yet | Three buttons: Whole, Part, Gone. The line you type about what you missed becomes the topic's first point, marked as yours. |
| Missed points | A point missed last time is listed first on the next reveal. A point missed in 2 of its last 3 showings goes on the "what you tend to leave out" sheet, and leaves it after 2 clean showings. |
| A written answer on the topic | Counts as a recall of it, graded the same way from the points you left out. |
| Rereading a ticked topic | Recorded, and changes no date. Reading is not recalling. It does clear a "reread your source" sticking point (section 7). |
| Many topics ticked at once | More than 10 ticked in one go, or anything ticked during first run, is treated as "studied at some earlier time". Their first recalls are not all set 3 days out. They are spread over as many days as it takes at 30% of your normal day, heaviest topics first. Each first recall then sets the item's real state. |
| A rested topic | Gets no dates and is not offered, until its exam's final weeks (below), when it returns by itself. |

### Mistakes and saved questions

| Step | Exact form |
|---|---|
| First look | Offered as one batch per paper from the moment the paper is scored. One tap sets the reason. |
| First re-attempt | 2 days after the first look, blind. |
| Right | Once more, 7 days later. Right again: **solved**, and it rests. |
| Wrong, at any step | Tomorrow, and the count of rights starts again. Its topic's value is raised (section 5). |
| A solved mistake | Is not offered again, with two exceptions: the same question answered wrong in a later sitting reopens it at once; and in the final weeks before its exam, the hardest ones (sure-and-wrong, or wrong three times or more) are offered once more as one quick set. |
| A saved question | The same ladder, starting from the day it was saved. |
| A mistake with no clip | Shows the page of your PDF it sits on, opened at the page that was in view when you answered it ([DATA.md](DATA.md), section 3), with its number. One drag there clips it. If the PDF is not on this device, the app shows the question number, your answer and your lesson, and says where the PDF is. |

### Quick cards

Each card is its own item in the forgetting model. Knew it is Good; Missed is Again. A missed card comes round again in the same sitting until you know it once, and only the first answer is recorded. A list is offered as "the cards of this list that are due", never the whole list.

### Working back from the exam

Each item belongs to the earliest coming exam, among those you sit, that its topic counts toward.

1. **The final weeks.** Every item you hold gets one last recall inside a window before its exam. The window starts at 21 days for a paper of objective questions and 28 days for a written one, and is widened (up to 35 days) if the last recalls would not fit into 60% of your normal day.
2. **No date falls after the exam.** A next date that the model sets beyond the start of the window is moved into the window.
3. **Order inside the window.** Items you hold most firmly come first and the weakest last, so the weakest are seen closest to the exam.
4. **After the exam.** Items that counted only toward that exam stop being offered. The app asks once whether you are sitting it again.

## 3. What a recall item is, and what it asks

- **The unit is a syllabus leaf you ticked.** A good leaf is recalled in 2 to 6 minutes and has 3 to 9 marking points. The bank is prepared to that size.
- **A leaf that has grown past 9 points is offered a split**, once, when the tenth point is added. You choose which points go where. The two halves inherit the parent's history up to that day and go their own way after it.
- **Which prompt is shown.** For a Mains subject, a past question tied to the topic if the bank has one; with several, they take turns in order of year, oldest first, by counting your recalls so far. Otherwise the topic's name with the form the bank gives it (explain, list, compare, draw, put in sequence), and "explain" where it gives none.
- **Whose points are shown.** The topic's own. Points that came from the bank or from an AI carry "unverified" until you confirm them. Confirming is one tap on the point and is never demanded.

## 4. How much a topic is worth

There is no importance field. A topic's weight comes from past papers:

> weight = (marks asked from the topic + one paper's even share) ÷ (marks in all the papers counted + one paper's marks)

over the last ten sittings of that paper held in the bank. The "one paper's even share" keeps a topic that happens never to have been asked from being worth nothing, and stops a single odd year from dominating.

- For a paper whose bank has no past papers yet, every leaf has an even share.
- A topic that counts toward two exams adds its weight in each.
- Each exam has a standing you set: first or secondary. A secondary exam's weights count at 0.3.
- A paper that only qualifies (CSAT) is weighed by how far you are from the qualifying mark, and is worth nothing more once your last three timed papers clear it by 10 marks in 100.

## 5. What Today offers, and in what order

### The value of one item

> value per minute = weight × urgency × lift ÷ minutes it takes you

| Part | Exact form |
|---|---|
| Urgency of a recall | 0 before its date; 1 on its date; rising with lateness to at most 2 (one extra for each full gap it is overdue by). |
| Urgency of a mistake coming back | 1 on its date, and it is not left to wait: due re-attempts go first (below). |
| Lift | ×1.5 for a re-attempt (a proven loss). ×1.25 for a topic with a point missed last time. ×1.3 for a topic flagged "weaker in questions than you rate it". ×1.3 for a subject that has had less than its share of the last seven days. ×1.5 after a wrong re-attempt in the topic, for seven days. Lifts multiply, to at most ×3. |
| Minutes | Your own pace (section 8). |

### Building the list

1. **A paper day.** If a full paper is set for today, the paper is the day: it leads, its first look follows, and nothing else is in the core.
2. **A paper waiting for its first look** leads the core until it is done, for up to seven days after the paper.
3. **Due re-attempts**, up to 15% of the core's time.
4. **Recalls**, in order of value per minute, until the core holds your normal day (2 hours).
5. **One written answer** in any phase that includes writing (section 6): a past question from a topic ticked or recalled in the last 14 days and not written on in the last 30, heaviest first.
6. **Upkeep of a qualifying paper.** While CSAT is not yet safely cleared (section 4), a short set of 15 questions twice a week, so that it never needs a panic week. It draws on your bank; with no questions there, the line opens the answer sheet on a paper of yours.
7. **Mixing.** The list is then rearranged so that no more than three items in a row come from one subject while another subject has items waiting. Order within a subject is kept.
8. **Offers below the core**, one line each, up to the most you allow (4 hours): the next recalls in order; recalls due in the next two days, at half urgency; a question set where the bank has questions; quick cards that are due.

### Less time, more time, your own choice

- **Less time today (N minutes).** Due re-attempts first, then the highest value per minute that fits.
- **The minimum day.** Ten minutes of the items that lose most by waiting: weight × lateness.
- **Choose your own.** Subject, kind and length filter the same ordered list. The app never overrides the filter.
- **Read next** (Syllabus). Unticked topics by weight, heaviest first, within the paper you are looking at.

### What is not done

Nothing is carried as a debt. An item not done stays due, and tomorrow's list is built afresh. When more is due than a day holds, the excess is laid out over the following days, heaviest first, each day filled to your normal time, for up to 14 days. That layout is what "spread over the next eight days" reports. It is worked out, never stored, and nothing in it is a commitment.

After a gap of three days or more, the first Today leads with a restart of 15 minutes, says how the rest is spread, and does not mention the days missed again.

## 6. The road and its phases

### Drafting

Only exams of first standing shape the road. In date order:

| Phase | Runs |
|---|---|
| Foundation | From today until the first focus begins |
| Focus on the first exam | The twelve weeks before it |
| Focus on each later exam | From the day after the exam before it |

The **final weeks** are not a separate phase to approve. They are the last 21 days of a focus phase before a paper of objective questions, and the last 28 before a written one, and they begin by themselves.

For the owner's dates this drafts what the mock-up shows: Foundation to 28 February 2027, Prelims focus to 23 May, Mains focus to 21 November.

The draft is a suggestion. You approve it, or change any date, name or the number of phases, at first run or later. When a phase date arrives the app asks once; you confirm, postpone by a week, or change the road.

### What a phase changes

A phase changes only the lifts in section 5 and which kinds of work are offered. It never removes a due item.

| Phase | Recall | Papers | Writing | New topics |
|---|---|---|---|---|
| Foundation | All exams at their weight | One full paper a fortnight | One answer a day once 20 optional topics are ticked | Read next shown on Today |
| Focus | This exam ×1.5; others kept alive at ×0.6 | One full paper a week, at the exam's hour | Mains focus: two a day and a full paper each fortnight. Prelims focus: none unless you choose it | Read next only on Syllabus |
| Final weeks of a focus | The last recalls of section 2; other exams only on a minimum-day footing | Two full papers a week, none in the last three days | As in focus | None offered; the app says so if you tick one |

Every figure in this table is the owner's to change on the road screen: a phase is a named set of these few numbers.

## 7. When the app speaks up

Each of these is raised once and its answer remembered. "Not now" puts it off for seven days.

| Moment | Trigger | What is offered |
|---|---|---|
| Load guard | Something you are about to tick or add would take the average recall time of any week in the next three above your normal day | Rest the items that are right five times running and in the lightest quarter by weight; or raise your time; or go ahead. Each choice says what it does |
| The cost of a tick | Always, on ticking | "This adds about N minutes a day": the topic's minutes × its expected recalls over the next 30 days ÷ 30 |
| Sticking point | A topic gone in 4 of its last 5 recalls, or one point missed in 4 of its last 5 showings | Reread the source (the item rests until you say you have, then returns two days later); split the topic; or write one line, table or sketch of your own that is shown first |
| Cross-check | At least 5 questions on a topic in the last 90 days, under half right, while its last two recalls were whole | A flag on the topic, and the lift of section 5. Nothing to answer |
| A phase date | The date arrives | Confirm, postpone or change |
| A paper not looked at | Seven days after a paper with mistakes unseen | One line on Today. After that it waits on Practice without comment |
| Coming back | Three days or more away | The restart of section 5 |
| Storage at risk | The browser has not granted lasting storage, and no backup is connected | One line, with the two ways to fix it |

Nothing else interrupts. There are no streaks, badges or scores for showing up.

## 8. How long things take you

| Item | Estimate |
|---|---|
| A topic you have recalled before | The middle value of its last five active times |
| A topic new to recall | The middle value for its subject; before there is one, 3 minutes |
| A re-attempt | The middle value of your last 20; before that, 1 minute |
| A first look | 30 seconds a mistake until 20 are done, then your own |
| A quick card | 8 seconds until 50 are done, then your own |
| A written answer | Its marks × the paper's minutes ÷ the paper's marks |

A time more than three times the estimate is treated as interrupted and left out of the estimate. It is still recorded.

## 9. Papers: scoring and what is said afterwards

### Scoring

- **Score.** Each right answer earns the question's marks; each wrong one loses the paper's penalty; a blank is nothing. The pattern comes from the bank, or from what you set when adding the paper.
- **A question dropped by the examiner** is marked so in the key. It scores for nobody, and the paper is out of what remains.
- **Your target.** 55% of the paper's marks until you change it. For a qualifying paper, the qualifying mark.
- **Right or wrong is never stored.** It is your answer against the key of the edition you sat.
- **Break-even.** For each paper the app works out the share of answers you must get right for answering to pay: with four options and a third deducted, one in four. Each confidence level is reported as count, right, marks gained or lost, and whether it paid.

### The reason pre-selected on a mistake

The first rule that fits, and always changeable in one tap:

| What the app saw | Reason offered |
|---|---|
| Changed from the right answer to a wrong one | Careless slip, with "you changed a right answer" |
| Marked Sure, and answered in under 40% of your usual time for a question | Misread the question |
| Marked 50-50 | Torn between two |
| Marked Guess, or anything else | Did not know it |

A question left blank is not a mistake. Blanks at the end of a timed paper are reported together as "not reached".

### The order of the first look

Sure and wrong; then 50-50 and wrong; then guesses. Within each, heaviest topic first.

### "Three things to do next"

The first is fixed; the others are the two largest by marks lost in this paper. A line is shown only if its condition holds, so there may be fewer than three.

| Line | Shown when | Size |
|---|---|---|
| Fix the mistakes | There are any | — |
| Recall a topic | Two or more questions lost in it | Marks lost there |
| Stop pure guessing | Five or more guesses, and they lost marks overall | Marks lost |
| Leave the long ones | Three or more questions took over twice your usual time and were wrong | Marks, and the minutes spent |
| Do not change an answer without a reason | Two or more changed from right to wrong | Marks lost |
| Pace | Five or more not reached | Marks not attempted × your accuracy |
| Read the last line first | Three or more mistakes given the reason "misread" | Marks lost |

### Standing lessons (the briefing)

At most three, shown before a paper. A lesson needs the same finding in two timed papers, or 20 answers of the kind it speaks about. They are ordered by marks lost across the last three papers. A line you pinned yourself from a mistake's lesson always shows, and counts toward the three.

### "Two things that matter now" (Progress)

Every candidate is given a rough figure of marks at stake, and the top two are shown, each with its reason. A candidate you dismissed stays away for 14 days.

| Candidate | Condition | Marks at stake |
|---|---|---|
| A subject far from target | Three or more timed papers | Gap to target in that subject |
| Heavy topics unread | Unticked topics in the heaviest third | Their weight × the paper's marks |
| Mistakes not looked at | Ten or more | Their marks × 0.5 |
| Too much fading | Over 30% of what you hold is past its date | Weight of those topics × the paper's marks × 0.3 |
| No full paper lately | A focus phase, and none in 21 days | Fixed, high |
| Too little writing | Mains focus, fewer than three answers in seven days | Fixed, high |
| Pure guessing loses marks | The standing lesson holds | Marks lost per paper |

### The weekly summary

Written from the facts for any week, and offered from Sunday 18:00. A fixed form, with each line dropped if it has nothing to say: days practised and time against what you allow; recalls done and how many were whole; what held and what slipped (a topic gone twice in the week); the paper sat, against the last one and against the target; how often "sure" was right; written answers and whether they kept time; one suggestion, which is the first of the two things that matter now.

## 10. Written answers and full-paper rehearsal

- **The clock** for a question is its marks × the paper's minutes ÷ the paper's marks: 9 minutes for 10 marks in a 200-mark, 3-hour paper.
- **The check.** The marking points appear and you tap what your answer left out. The question's own points are shown if the bank has them; otherwise the topic's. Then one question about the diagram: Drew it, Did not, Not needed.
- **What follows.** Each point left out is treated exactly as a point missed in recall. A point that belonged to the question and not yet to the topic is added to the topic, unverified.
- **Rehearsal.** The choose-your-questions step runs on the paper's clock. After it, the time left is shared across the questions chosen by marks, and the screen says how far ahead of or behind that share you are. The paper's own rules (how many to answer, which are compulsory, one at least from each section) are checked at the choosing step, as a warning that can be passed.
- **Checking afterwards** can be done at once, or is laid out over the following days as "one answer to check", two a day.

## 11. How the app reads what you type or paste

Every reading is shown back with an Undo, and nothing is recorded silently on a doubtful reading.

### The quick note

1. **Find the topic.** Words of the note are matched against topic names and the words of their parents, ignoring case, punctuation and common words; rarer words count for more. The best match is taken if it is clearly ahead (half as much again as the second). Otherwise the top three are offered as chips, with "Just keep the note".
2. **Find what happened.** "Read", "studied", "finished", "did", "covered" with a topic: the topic is ticked. A count with "right" or "correct" ("25 polity questions, 18 right"): a test is logged. A length of time is attached to whichever it is.
3. **Otherwise** the line is kept as a note on today, with no topic.

### An answer key

Accepted as it comes: "1. B", "1-B", "1) b", "1 B 2 C", one unbroken run of exactly as many letters as there are questions, or a table. Digits 1 to 4 are read as A to D only if every answer is a digit. "X", "dropped" or "cancelled" marks a dropped question. Anything else, a number given two different answers, and any number missing are listed "to settle", and scoring can go ahead without them.

### Paste from AI

Settled as drawn in the mock-up, unless the owner says otherwise:

```text
TOPIC: Forestry > Silvicultural systems
POINTS:
- One point to a line.
CARDS:
Front :: Back
QUESTION: The question in one paragraph.
A) …  B) …  C) …  D) …
ANSWER: B
WHY: One or two lines.
```

A paste may hold several TOPIC blocks. Section names are read in any letter case. A topic that matches nothing is offered the nearest three, or "add as new". The screen always shows what will be added and what is already there before anything is added, and everything added carries "unverified".

## 12. Undo, deletion and one writing tab

- **Undo** reverses the last thing you did, from a line at the foot of the screen for eight seconds. After that, the same change can be made on its history entry at any time.
- **Deleting** a paper that has sittings, a topic that has recalls, or a list of cards asks first, says what goes with it, and takes a safety version before it happens.
- **One writing tab.** The first tab holds the right to write. A second tab opens read-only and offers "use this tab instead".

## 13. What the app cannot do without a server, and what it does instead

| Wanted | Limit | What it does |
|---|---|---|
| A reminder at your hour | A web app with no server cannot raise a notification while it is closed | "Add the reminder to my calendar" writes one repeating daily event to a calendar file, and your phone's own calendar does the reminding. Changing the hour offers a new file. When the app is opened after that hour with nothing done, Today leads with the minimum day |
| A full paper's slot | The same | The same file export, one event per slot |
| Sync in the background | Sign-in to Drive lasts an hour and needs you there | Sync runs when the app is open and signed in; the screen says when it last ran. Everything works without it |
| Comparing with other candidates | Needs other people's data | Left out ([DECISIONS.md](DECISIONS.md), section 5) |

## 14. Official papers: series, pages and what is shipped

- **Booklet series.** UPSC prints each Prelims paper in four series with the questions in a different order. A paper map says which series it was written for and carries the official key for all four. On starting a paper from your own PDF the app asks once which series is printed on it. If it is the map's series, everything works. If it is another, the score and the mistakes are right at once; the topic of each question is shown only if the bank also holds that series' order, and the app says so plainly.
- **Pages.** A map may hold the page each question sits on in the commonly circulated PDF. Where it does not, the page in view when you answered is used.
- **What the published bank holds.** The app's address is open to anyone, so what sits beside it is limited to what is safe to publish: syllabuses, exam patterns, topic weights and paper maps. Question text and prepared marking points reach the app as **your bank**: a folder of the same form, brought in as one file from the device (and, once sync exists, from your Drive). Other students would be given the app's address and, separately, a bank file.
- **Practice by topic across past papers.** With maps only, there is no question text to build a set from. So "Build a set" draws on your mistakes and saved questions (as clips) and on questions in your bank. A set that walks across your PDFs to the questions of one topic is possible where maps hold pages, and belongs to phase 6.

## 15. The qualities the build must meet

### Devices

Laptop (Chrome), Android phone (Chrome, installed to the home screen), iPad (Safari, added to the Home Screen). All three are named in Study Director's backlog as the owner's devices. Each screen is checked at 390, 820 and 1440 points wide.

### Speed and size

| Measure | Budget |
|---|---|
| From tapping the icon to a usable Today, after the first visit, offline | Under 1 second on the phone |
| Any tap to a visible response | Under 0.1 second |
| Working everything out from a year of facts | Under 0.2 second on the phone |
| The app shell and Today, compressed | Under 150 KB |
| A page of a PDF shown | Under 1 second |
| Your data after a year, without PDFs | Under 5 MB |

Each budget has a test. A change that breaks one is not done.

### Formats

Every stored thing (a record, a fact, a backup, a bank file, a version on Drive) carries a format number. The app reads every format it has ever written, upgrading in one place as it reads. Data in a format newer than the app understands is left untouched: the app says "update the app on this device" and writes nothing to it.

### Safety of what comes in

All text you paste or a bank supplies is shown as text and never run as a page. Formulae are drawn with the formula library's unsafe features off. A bank file is checked against the table of kinds before anything in it is used. The app loads no code from anywhere but its own address, and talks to no address but its own and, for sync, Google's.

### Reach

Every control is reachable by keyboard with a visible focus; every control has a name a screen reader can say; touch targets are at least 40 points; text meets the contrast the mock-up was checked against; motion is reduced when the device asks; text size is yours to set; sound is off until you turn it on.

### When something goes wrong

There is no reporting to anyone. The app keeps the last 200 errors on the device, with the app's version and no content of yours, and Settings can copy them as text for you to paste where you choose.
