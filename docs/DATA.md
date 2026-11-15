# Practice Director: what is stored, and where

Written 15 Nov 2026, after a review of the first data design in [BUILD.md](BUILD.md). The product this serves is in [PLAN.md](PLAN.md). Nothing is built yet.

The aim is a small, well-kept body of data: only what cannot be worked out again is stored; what can be worked out is never stored; a thing that changes is replaced where it sits; and nothing is copied twice.

## 1. The rule

Every piece of data is one of five kinds. The kind decides how it is stored, whether it syncs, and whether it is ever rewritten.

| Kind | What it is | Stored how | Changes how | Syncs |
|---|---|---|---|---|
| **Pack content** | The syllabus, exam patterns, paper maps and past questions that come with the app | In the app itself, not in your data | With an app update | No: every device already has it |
| **Records** | What you set or wrote: settings, exam dates, ticks, marking points, lessons on mistakes, your own papers and cards | One small record each | **Replaced in place** | Yes, record by record |
| **Facts** | What happened: a recall, a sitting, a written answer, a test logged | One compact record each, written once | Normally never; a correction replaces the fact in place | Yes, by month |
| **Files** | Clips, your PDFs, photos of answers, the body of a large paper | One file each, named by a fingerprint of its content | Never: a changed file is a new file | Yes, once each, fetched only where needed |
| **Worked-out data** | Everything else on screen: memory dates, scores, the mistake list, progress, today's offer | **Not stored** | Worked out again whenever its inputs change | No |

The first design said "one history, add-only" for everything that happens, with corrections added on top. That is narrowed here. Only facts are written once, because they are history and everything worked out rests on them. Records are replaced in place. A correction to a fact also replaces it in place: undo covers the moment, and earlier versions (section 6) cover the rest, so no second layer of "the original underneath" is kept.

## 2. What is stored

### Records (replaced in place)

One store, one record per thing, each with an id and the time it last changed. A record is small, usually under a kilobyte.

| Record | Holds | How many |
|---|---|---|
| Setting | One setting each: the time you allow, the reminder, text size, each shortcut | About 30 |
| Exam | Date, target, whether you are sitting it | 2 to 5 |
| Road | The phases and their dates | 1 |
| Topic | Only for a topic you have touched: your source line, rested or not; for a topic you added, its name and place | Up to a few hundred |
| Marking point | One point of one topic: its text, who wrote it, whether you have confirmed it | 1,000 to 2,000 |
| Paper | For a paper you added: title, exam, subject, number of questions, its PDF's fingerprint, its key, and any corrections | Tens to a few hundred |
| Mistake note | For one question of one paper: the reason, your one-line lesson, saved or not, its clip | A few thousand over the years |
| Card list | One pasted list of quick cards | Tens |
| Paper slot | When the next full paper is set | A handful |
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
| Recall | Topic, the points you missed (or one of three answers when there are no points), time taken | 60 bytes |
| Re-attempt | Question, the answer you gave, time taken | 50 bytes |
| Quick cards | The list, and one character per card for known or missed | 80 bytes |
| Written answer | Question, marks, time taken, points left out, the photo's fingerprint if there is one | 100 bytes |
| Sitting | Paper, the edition sat, timed or not, then **one column each** for answers, sure / 50-50 / guess, seconds spent, and the second each answer was settled; changed answers listed only where there were any | About 1 KB per 100 questions |
| Test logged | Label, exam, subject, right, wrong, time | 80 bytes |

Three decisions inside this table:

- **A sitting names its paper; it does not carry a copy of it.** Practice Desk freezes the whole paper, key, questions and images inside every attempt so that an old attempt can never be re-marked against a changed paper. The same promise is kept here at no cost: the sitting names the exact edition, and an edition never changes once it has been sat. This is the largest single saving over the source apps.
- **Columns, not one object per question.** Practice Desk writes an object per question with full timestamps. A hundred answers in columns are about a tenth of the size and hold everything the results screens use: time per question, pace through the paper, speed against accuracy, changed answers.
- **Whether an answer was right is not stored.** It is the answer against the key, and the key can be corrected.

### Files (never changed)

A file is named by a fingerprint of its content, so the same file is never stored twice and a file can be checked on arrival.

| File | Typical size | Notes |
|---|---|---|
| Clip | 20 to 60 KB | A picture of one question or explanation, sized for reading, not for print |
| Your PDF | 2 to 10 MB | Stored once however many times the paper is sat |
| Photo of an answer | About 300 KB after shrinking | Optional |
| Body of a large paper | 50 to 300 KB | For a paper held fully inside the app: its questions and images. Its record holds only the title and the fingerprint |

A file that no record points to any more is removed. Nothing else is ever deleted without you: clips of long-solved mistakes and old answer photos are offered for removal in Settings, with the space each would free.

## 3. What is not stored

Everything below is worked out from records, facts and pack content each time it is needed, and so can never be out of step with them.

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

## 4. On the device

| Place | Holds |
|---|---|
| A database with three stores | Records · Facts · This device only |
| The browser's file store | Files, by fingerprint |
| The app's own cache | The app and its packs, for use offline |

"This device only" holds what never leaves the device: a paper in progress (saved after every answer, and turned into one sitting fact when you finish), today's choices such as "30 minutes today", which screen you were on, the sign-in to Drive, and where the last sync got to.

Facts are not all held in memory. At start they are read once, in order, into running totals; after that History reads a screenful at a time.

**The device copy can vanish.** Study Director's backlog records a phone and a tablet each losing their whole database overnight with nothing done to them. So: the app asks the browser to keep its storage; a small marker outside the database says "this device had data, and this is where its backup lives"; and a start that finds the database empty but the marker present brings everything back by itself once Drive or the folder answers.

## 5. Between devices

What leaves a device is small and has a fixed shape:

```text
records              every record, in one file           rewritten when a record changes
facts / 2026-11      one file per month                  a finished month is not written again
files / <fingerprint>  one per clip, photo, PDF or paper body   written once
```

- **A usual sync moves two small files**, the records and the current month, plus any new clips. Both are compressed; a year of use is a few megabytes without PDFs.
- **Joining two devices is done record by record and fact by fact**: the one changed last wins. There is no "needs review" queue. A session happens on one device, so two devices changing the same record between syncs is close to impossible, and when it happens nothing of value is lost.
- **Files are fetched only where they are used.** A phone downloads a clip when a mistake comes back, and a PDF only if you open that paper there. A device can drop its copy of any file that Drive also holds.
- **A paper in progress is not synced.** It belongs to the device it was started on, as in the plan.

This is a description of the data, not of the engine that carries it. Study Director's sync engine is to be overhauled and the plan for that is not in this repository, so nothing here depends on how it works inside. What Practice Director needs from whatever engine is used: carry these few files, tell a changed file from an unchanged one, and keep versions.

Lessons taken from Study Director's backlog, which shaped the layout above: few files, because listing two hundred versions and objects on Drive took half a minute or more; joining record by record, because joining block by block lost a setting; no review queue, because it produced questions nobody could answer.

## 6. Earlier versions and backup

- **A version is a short list naming the files as they stood.** Files that did not change between two versions are shared, so a version costs only what changed: the records file and the current month.
- **Versions live where backups live**: on Drive, in a folder you choose on a laptop, or both. With neither connected the app keeps the last three daily versions on the device and says plainly that this does not protect against losing the device.
- **Kept**: the latest, then one a day for a week, one a week for a month, and one before anything large (a restore, a big import).
- **One backup file by hand**, when you want one: records and facts always, clips by default, PDFs only if you ask.
- **Readable export**: records and facts as plain text and tables.

## 7. How big it gets

A heavy year: 20 recalls a day, 100 sittings, 150 written answers, 1,500 clips, 100 PDFs.

| | In a year |
|---|---|
| Records | Under 1 MB |
| Facts | 1 to 2 MB |
| Clips | 30 to 90 MB |
| PDFs | 200 MB to 1 GB, on the devices that open them |
| Worked-out data | Nothing |

Everything except files stays in the low megabytes for the life of the app. Files are the only thing that grows, they are yours to prune, and Settings shows the space by kind.

## 8. What changes elsewhere because of this

- [BUILD.md](BUILD.md), sections 2 to 5, now follow this document.
- Two screens were adjusted: History no longer says the original is kept underneath a change, and the memory-schedule page no longer has a rebuild button.
- Still to settle are listed in [DECISIONS.md](DECISIONS.md), section 6.
