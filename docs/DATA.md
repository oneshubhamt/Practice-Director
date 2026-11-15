# Practice Director: what is stored, and where

Written 15 Nov 2026, after a review of the first data design in [BUILD.md](BUILD.md), and revised the same day after the owner's replies (question banks, the plan for Study Director's new sync, earlier versions) and after a check of the whole design for gaps (a few fields added; a bank of your own). The product this serves is in [PLAN.md](PLAN.md). Nothing is built yet.

The aim is a small, well-kept body of data: only what cannot be worked out again is stored; what can be worked out is never stored; a thing that changes is replaced where it sits; and nothing is copied twice.

## 1. The rule

Every piece of data is one of five kinds. The kind decides how it is stored, whether it syncs, and whether it is ever rewritten.

| Kind | What it is | Stored how | Changes how | Syncs |
|---|---|---|---|---|
| **Bank content** | The syllabus, exam patterns, paper maps and question banks prepared for an exam | Published beside the app, fetched for the exams you sit and kept for offline use; not part of your data | When the bank is updated | No: any device can fetch it |
| **Records** | What you set or wrote: settings, exam dates, ticks, marking points, lessons on mistakes, your own papers and cards | One small record each | **Replaced in place** | Yes, record by record |
| **Facts** | What happened: a recall, a sitting, a written answer, a test logged | One compact record each, written once | Normally never; a correction replaces the fact in place | Yes, by month |
| **Files** | Clips, your PDFs, photos of answers, the body of a large paper | One file each, named by a fingerprint of its content | Never: a changed file is a new file | Yes, once each, fetched only where needed |
| **Worked-out data** | Everything else on screen: memory dates, scores, the mistake list, progress, today's offer | **Not stored** | Worked out again whenever its inputs change | No |

The first design said "one history, add-only" for everything that happens, with corrections added on top. That is narrowed here. Only facts are written once, because they are history and everything worked out rests on them. Records are replaced in place. A correction to a fact also replaces it in place: undo covers the moment, and earlier versions (section 7) cover the rest, so no second layer of "the original underneath" is kept.

Nothing the app could do before is given up by this; the check is in section 10.

## 2. Bank content

Practice Desk now keeps its content as a **question bank**: one folder per paper, found through a chain of short lists (catalogue → exam → year → paper), with an original and a revised edition side by side, and a switch per exam family. A paper is added by adding one folder and one line; a family is removed by turning its switch off. Practice Director adopts that form as it is, for three reasons: it is already built and tested, a paper's folder is self-contained, and the revised edition is stored beside the original exactly as section 3 stores a correction.

Refinements for Practice Director. The chain of lists and the folder per paper stay as they are; these concern what reaches a device and how.

| Refinement | Why |
|---|---|
| **Fetched, not built in.** The catalogue is small and always present; a family is fetched when you choose its exam and kept for offline use; a family you drop is removed from the device. | Practice Desk assembles every switched-on family into the app. With many exams every owner would carry every exam. |
| **One index per family, made when the bank is published.** | Finding a paper through the chain takes a request per level. The chain stays the single authority for whoever writes content; the app reads one generated list. |
| **A revised edition is always the changes only.** | Both forms exist in the bank today. The SSC CGL papers keep a revised edition as patches and solutions (about 17 KB beside a 164 KB original). The PFRDA mock keeps a second full copy (about 390 KB beside 336 KB). The first form is a twentieth of the size and says exactly what changed, which is what the editions screen shows. |
| **One compact file per paper reaches the device**, produced when the bank is published. | In the PFRDA mock the generated package is about four times its written source (266 KB against 70 KB). What goes to a device should be chosen, not inherited from the build. |
| **Pictures are separate files, named by fingerprint, fetched when a question is shown.** | The SSC CGL papers hold their pictures inside the paper file. That costs a third more in size and loads every picture of a paper to show one question. |
| **More kinds of content in the same chain**: the syllabus of an exam, its pattern, past Mains questions tied to topics. | Practice Director needs them, and one way of finding content is enough. |
| **A paper may be a map only**: the key and the topic of each question. | For papers whose text cannot be shipped. |
| **A map names its booklet series** and carries the official key for each series; it may also hold the page each question sits on. | UPSC prints a Prelims paper in four series with the questions in a different order ([RULES.md](RULES.md), section 14). |
| **Two banks, one form: the published bank and your bank.** The published bank sits beside the app and holds only what is safe to publish: syllabuses, patterns, topic weights and maps. Question text and prepared marking points come in as your bank: one file brought in from the device, kept as a file by fingerprint, and carried to your other devices by sync like any file. | The app's address is open to anyone. This is also how a bank would be handed to another student. |

The sizes above were measured on one paper of each family on 15 Nov; they show the direction, not a survey of the bank.

A paper you add yourself is stored in the same form as a bank paper, so the two behave alike everywhere, and one of yours can later be shared as a folder.

Bank content is never copied into your records. Your data holds only what you did with it.

## 3. What is stored

### Records (replaced in place)

One store, one record per thing, each with an id and the time it last changed. A record is small, usually under a kilobyte.

| Record | Holds | How many |
|---|---|---|
| Setting | One setting each: the time you allow, the time zone, the reminder's hour, text size, each shortcut | About 30 |
| Exam | Date, target, whether you are sitting it | 2 to 5 |
| Road | The phases and their dates | 1 |
| Topic | Only for a topic you have touched: your source line, rested or not, your own first-shown line; for a topic you added or split off, its name and place, and for a split the topic it came from and the day | Up to a few hundred |
| Marking point | One point of one topic: its text, who wrote it, whether you have confirmed it | 1,000 to 2,000 |
| Paper | For a paper you added: title, exam, subject, number of questions, its PDF's fingerprint, its key, and any corrections | Tens to a few hundred |
| Mistake note | For one question of one paper: the reason, your one-line lesson, saved or not, pinned to the briefing or not, its clip | A few thousand over the years |
| Card list | One pasted list of quick cards | Tens |
| Paper slot | When the next full paper is set | A handful |
| Paused paper | That a paper is paused, on which device, and how far it got, so the other device can say so | One at most |
| Nudge | That you answered or put off something the app raised, so it is not raised again | Tens |
| File entry | For each file: fingerprint, kind, size | One per file |

Three decisions inside this table:

- **Settings are one record per setting, and marking points one record per point.** Two devices that each change a different one both keep their change. Study Director's own backlog records a name lost because settings merged as one block; this avoids that by construction.
- **A correction to a paper is stored as the changes only**, not as a second copy: "question 9, key D, by you". An edition is the original plus that short list. A key that is fixed before the paper has ever been sat is simply replaced.
- **A deleted record leaves a marker** (its id and the time) so the deletion reaches the other device. Markers are dropped after 90 days.

### Facts (written once)

One store, one compact record per event. The id carries the time, so facts sort by date without a separate field.

| Fact | Holds | Size |
|---|---|---|
| Studied | Topic, and the quick note if it came from one | 40 bytes |
| Recall | Topic, how many points were shown, the points you missed (or one of three answers when there are no points), time taken | 60 bytes |
| Re-attempt | Question, the answer you gave, time taken | 50 bytes |
| Quick cards | The list, and one character per card for known or missed | 80 bytes |
| Written answer | Question, marks, time taken, how many points were shown, points left out, the diagram answer, the photo's fingerprint if there is one | 100 bytes |
| Sitting | Paper, the edition and the booklet series sat, timed or not, any pauses, then **one column each** for answers, sure / 50-50 / guess, seconds spent, seconds on the first visit, seconds before the first answer, the second each answer was settled, and the page of the PDF in view at that moment; changed answers listed only where there were any | About 1.7 KB per 100 questions |
| Test logged | Label, exam, subject, right, wrong, time | 80 bytes |

Three decisions inside this table:

- **A sitting names its paper; it does not carry a copy of it.** Practice Desk freezes the whole paper, key, questions and images inside every attempt so that an old attempt can never be re-marked against a changed paper. The same promise is kept here at no cost: the sitting names the exact edition, and an edition never changes once it has been sat. This is the largest single saving over the source apps.
- **Columns, not one object per question.** Practice Desk writes an object per question with full timestamps. A hundred answers in columns are about a tenth of the size and hold everything the results screens use: time per question, pace through the paper, speed against accuracy, changed answers.
- **Whether an answer was right is not stored.** It is the answer against the key, and the key can be corrected.
- **Facts are the one place where slightly more is kept than today's screens use.** What was not recorded at the time can never be worked out later, and a column costs a few hundred bytes. So a sitting keeps all the timing Practice Desk measures, and the facts hold everything a later fitting of the memory schedule to your own results would need.
- **Missing is stored as missing**, never as zero: a recall with no time measured has no time.
- **The page in view is kept so that a mistake you did not clip can still be shown.** A sitting from your own PDF has no question text. With the page, a mistake coming back opens the PDF where the question is, and one drag clips it then.
- **How many points were shown is kept with a recall**, because points are added over time and an old recall must not be re-graded against points that did not exist.

### Files (never changed)

A file is named by a fingerprint of its content, so the same file is never stored twice and a file can be checked on arrival.

| File | Typical size | Notes |
|---|---|---|
| Clip | 20 to 60 KB | A picture of one question or explanation, sized for reading, not for print |
| Your PDF | 2 to 10 MB | Stored once however many times the paper is sat |
| Photo of an answer | About 300 KB after shrinking | Optional |
| Body of a large paper | 50 to 300 KB | For a paper held fully inside the app: its questions and images. Its record holds only the title and the fingerprint |

A file that no record points to any more is removed. Nothing else is ever deleted without you: clips of long-solved mistakes and old answer photos are offered for removal in Settings, with the space each would free.

## 4. What is not stored

Everything below is worked out from records, facts and bank content each time it is needed, and so can never be out of step with them.

| Never stored | Worked out from |
|---|---|
| Memory state and the next date of every topic, mistake and card | That item's own recalls, replayed in order |
| Scores, and which answers were right | The sitting's answers against the key of its edition |
| The mistake list and where each mistake stands | Sittings, re-attempts and mistake notes |
| How fresh each topic is, and the memory bars | Memory state |
| "What you tend to leave out" | The missed points in recalls and written answers, and lessons on mistakes |
| Today's offer, the load forecast, the weekly summary | All of the above and today's date |
| Progress, accuracy by subject and type, time per question, how often "sure" is wrong | Sittings |
| How long things take you | Times in the facts |
| The search index | Records and facts |
| History | It is the facts, read back in order |

Also not stored, though the source apps store them: a copy of a paper per attempt; the state of things before and after each review; fingerprints of the scheduler's settings and the checks against them; revision counters; a second scheduler's cards.

**Two conditions make this safe.**

1. **The same inputs must always give the same result**, on any device and on any day. So the working-out takes the date as an input and uses no chance. The scheduler carried over from Practice Desk can scatter due dates at random; that is switched off, and the planner's own spreading (which is not random) does the job.
2. **It must be fast.** A recall replayed through the scheduler takes microseconds. A year of practice is about ten thousand facts and replays in well under a tenth of a second. If a phone ever takes longer than a fifth of a second at start, the result of the last run may be kept on that device as a shortcut; it is never synced, never backed up, and can be thrown away at any time. It is not built until a measurement asks for it.

One consequence for the screens: there is no "rebuild from history" button. The dates are rebuilt every time the app opens.

## 5. On the device

| Place | Holds |
|---|---|
| A database with three stores | Records · Facts · This device only |
| The browser's file store | Files, by fingerprint |
| The app's own cache | The app and the published bank for your exams, for use offline |

"This device only" holds what never leaves the device: a paper in progress (saved after every answer, and turned into one sitting fact when you finish), today's choices such as "30 minutes today", which screen you were on, the sign-in to Drive, and the list of changes still to send.

The sample data of the guide lives in a second database of the same shape, so it can never mix with yours.

Every record, fact, backup and bank file carries a format number. The app reads every format it has ever written and upgrades in one place as it reads; it never writes to data in a format newer than it understands ([RULES.md](RULES.md), section 15).

Facts are not all held in memory. At start they are read once, in order, into running totals; after that History reads a screenful at a time.

**The device copy can vanish.** Study Director's backlog records a phone and a tablet each losing their whole database overnight with nothing done to them. So: the app asks the browser to keep its storage; a small marker outside the database says "this device had data, and this is where its backup lives"; and a start that finds the database empty but the marker present brings everything back by itself once Drive or the folder answers.

## 6. Between devices

Practice Director follows the plan made for Study Director's new sync, which is consolidated on branch `SD` of this repository (`docs/sd/SYNC_PLAN.md`). What Practice Director needs from that engine is in `docs/sd/PRACTICE_DIRECTOR_NEEDS.md` on the same branch. In that plan sync and Version History are two separate jobs:

| | What it is | For Practice Director |
|---|---|---|
| **Changes file** | One small file per device on Drive, written only by that device and overwritten each time: the current value of everything it changed recently | After a session: a few new facts and a few records, a few KB, one request |
| **Versions** | Restore points of everything, built from pieces named by fingerprint; a piece that did not change is never sent again | Records in a few pieces; facts in **one piece per month**, so a finished month never moves again; files in fixed-size pieces |

- **Each device writes only its own files**, so two devices can never be in each other's way and nothing has to take turns.
- **Joining is record by record.** Each record and fact carries a small count per device, which shows whether one device changed it or both. One: its value is taken. Both: the later change wins. Facts are written once, so two devices can only differ on a fact when one corrected it. There is no "needs review" queue in Practice Director.
- **Nothing is handed over live.** Study Director moves a running timer between devices and checks Drive every ten seconds to do it. Practice Director has no such thing: a paper in progress stays on the device it was started on, and the paused-paper record tells the other device where it is. So it syncs when the app is opened or returned to, when a session or sitting ends, and about a minute after an edit.
- **The sign-in to Drive lasts an hour**, because there is no server to renew it. The app is complete without it: every change is added to a "to send" list in the same step that saves it, and the list goes up the next time you are signed in.
- **Files are fetched only where they are used.** Every file, PDFs included, goes up to Drive by default (the owner's ruling, 15 Nov), so that any paper can be opened on any device. A phone downloads a clip when a mistake comes back, and a PDF only if you open that paper there. A device can drop its copy of any file that Drive also holds.

Lessons from Study Director's backlog that this layout answers: few requests, because a whole version per sync cost about six in a row; joining record by record, because joining block by block lost a setting; no review queue here, because nothing in Practice Director needs a person to choose between two copies.

## 7. Earlier versions and backup

- **A version is a short list naming the files as they stood.** Files that did not change between two versions are shared, so a version costs only what changed: the records file and the current month.
- **Versions live where backups live**: on Drive, in a folder you choose on a laptop, or both. With neither connected the app keeps the last three daily versions on the device and says plainly that this does not protect against losing the device.
- **Kept** (agreed by the owner): the latest, then one a day for a week, one a week for a month, and one before anything large (a restore, a big import).
- **One backup file by hand**, when you want one: records and facts always, clips by default, PDFs only if you ask.
- **Readable export**: records and facts as plain text and tables.

## 8. How big it gets

A heavy year: 20 recalls a day, 100 sittings, 150 written answers, 1,500 clips, 100 PDFs.

| | In a year |
|---|---|
| Records | Under 1 MB |
| Facts | 1 to 2 MB |
| Clips | 30 to 90 MB |
| PDFs | 200 MB to 1 GB, on the devices that open them |
| Worked-out data | Nothing |

Everything except files stays in the low megabytes for the life of the app. Files are the only thing that grows, they are yours to prune, and Settings shows the space by kind.

## 9. What changes elsewhere because of this

- [BUILD.md](BUILD.md), sections 2 to 5, now follow this document.
- Two screens were adjusted: History no longer says the original is kept underneath a change, and the memory-schedule page no longer has a rebuild button.
- The exact rules that the working-out follows are in [RULES.md](RULES.md).
- Still to settle are listed in [DECISIONS.md](DECISIONS.md), section 6.

## 10. Was anything lost?

The owner asked that the leaner design give up nothing meaningful. Each thing the first design or a source app stored was checked against what the screens and the plan use.

| Was stored | Now | Anything lost |
|---|---|---|
| Memory state and next dates | Worked out | No. Same dates, and they cannot fall out of step |
| Scores and right or wrong | Worked out | No. A corrected key now reaches old sittings only through an edition you approve |
| The mistake list | Worked out | No |
| A copy of the paper in every attempt | The sitting names its edition | No. The promise it existed for is kept |
| Per-question objects with full timestamps | Columns | The clock time of each change of answer is not kept; the order of the changes, the second the answer was settled and all three timings are |
| The original under a corrected history entry | Replaced in place | Slightly. Undo covers the moment; after that the old entry is in an earlier version, not one press away |
| The state before and after each review (Revision Director) | Not kept | No. It was used only to check stored cards, which no longer exist |
| Due dates scattered by chance | No chance | No. The planner spreads work, which does the same job predictably |
| "Rebuild from history" | Removed | No. It happens at every start |
| A paper in progress, synced | Device only, with a marker | No. The plan already kept it on one device; the marker lets the other device say where it is |

Two things were added back while checking, both cheap: the seconds spent on a first visit to a question and before a first answer, and the paused-paper marker.
