# Study Director: the plan for its new sync

Consolidated on 15 Nov 2026 from a planning conversation held in another session about Study Director, which the owner pasted here. It is a tidy record of where that conversation ended, kept in this repository so that Practice Director can be designed against it.

**Standing of this document.** Nothing in it is built. The full design (file formats, the merge rule for each kind of data, failure paths, migration, tests) is still to be written, on a branch named `Sync` in the Study Director repository. Once that exists, it is the authority and this page is only a summary. Timings below are estimates from the design, not measurements.

What Practice Director needs from the same engine is in [PRACTICE_DIRECTOR_NEEDS.md](PRACTICE_DIRECTOR_NEEDS.md).

## 1. The constraints

- **No server.** Everything lives on the owner's devices and the owner's Google Drive.
- **A Drive sign-in lasts about an hour.** With no server there is nothing to renew it, so nothing can sync in the background for long, and the app must be whole without it.
- **Drive cannot "write only if unchanged".** Two devices writing the same file cannot detect each other. This one fact is behind most of today's coordination.

## 2. What is wrong today

The repository is sound for what it was built for: checked, unchanging versions in which a piece that did not change never moves again. The trouble is that one mechanism does three jobs.

| Job | Needs | Gets today |
|---|---|---|
| Sync between devices | Small, frequent, cheap changes | A complete new version per sync: about six Drive requests in a row, 15 to 20 seconds on the phone |
| Backup and Version History | A few checked versions a day | A version per sync, so cleanup always has a backlog |
| Large files | Pieces that resume | Pieces, but an upload restarts after a reload |

Two things follow:

- **Devices must take turns.** All devices write into one shared history, so there are markers, renewals, refusals and cleanup coordination. Most of this year's sync bugs come from there.
- **Every sync is a restore.** Taking in a version rebuilds it, compares the whole library, makes a full safety copy and applies it under a rollback journal.

The backup code is about 1.2 MB of source, for a library that was 12 KB on the phone.

In the owner's words, the engine today carries many small objects (shards of notes, of Saved Days and of attachments), some of it as whole files in a stream, and sync is built around handing the running session from one device to the next.

## 3. The design: split the jobs

Sync stops using whole versions. Versions stay, for Version History and restore only.

What Drive holds:

| | What it is | Who writes it | Used for |
|---|---|---|---|
| **Session file** | One small file per device: its current copy of today's session and who is running it | Only that device; overwritten | Following a running timer, and Continue Here |
| **Changes file** | One small file per device: the current value of each record it changed recently | Only that device; overwritten | Sync of everything else |
| **The repository** | Versions of the whole library, built from shards named by fingerprint, and attachments in pieces | Any device adds; each deletes only what it wrote | Version History, restore, earlier versions of a note, starting a new or long-absent device |

**Each device writes only its own session file and changes file, and never touches another device's.** So no device can be in another's way, and turns, markers and refusals have nothing left to do.

*Example.* The timer is paused on the laptop. The laptop overwrites its session file, in one request. The phone's ten-second check sees it changed, downloads it and applies it.

## 4. What counts as a change, and when it moves

A change is something the owner did that was saved. A running timer is not a change: it is stored as "running since 10:42", and the other device works out the elapsed time.

| | When |
|---|---|
| Start, pause, resume, finish or skip a block, shift the schedule, Finish Today | Sent at once |
| Notes, plans, the Plan draft, settings, Saved Days, a kept version resolved | Sent about a minute after the owner stops editing, all together |
| An attachment added or removed | Its entry goes with the next changes file; its pieces upload in the background |
| Receiving | Every 10 seconds while a session is open; otherwise on opening or returning to the app, and every 20 minutes |
| A version (a restore point) | 20 minutes after the first change, and at once on Finish Today and Save Today |

Pause, resume and finish no longer write a version; they did only so that the other device could continue from them.

## 5. The changes file

- It holds the **current value** of each record the device changed recently. A theme switched ten times appears once. It is not a log, and there is nothing to prune.
- "Recently" means since that device's last-but-one version: roughly the last forty minutes of editing. Everything older is in the repository.
- It is re-sent whole each time, which is why it is kept small.
- A device that was following along reads only these small files. A device that was away longer reads the newest version first (only the shards that changed), then these files. Both paths use the same merge.

This replaced an earlier proposal in the same conversation (numbered change files kept for about thirty days). Overwriting in place was the owner's idea and removed the question of how long to keep them.

## 6. Merging

Every record carries a small count per device: for example, "includes the laptop's change 7 and the phone's change 3". When a record arrives:

| The arriving record | Then |
|---|---|
| Includes everything mine has | Take it |
| Has nothing mine lacks | Ignore it |
| Neither | Both devices changed it: the rule for that kind of data applies |

- **Timestamps never decide.**
- The rules for "both changed" are today's: Smart merge for notes, the decision rule for the session, otherwise the other copy is kept for review. Today they compare the whole library with the last shared version; in the new design they run record by record.
- **Notes.** Each device keeps the text a note had before its own unsent edits. When the other device's edit started from that same text, Smart merge uses it as the true common starting point; otherwise the note is kept for review. The same note changing on two devices happens to the owner every two or three days, so this matters.
- Merging at the level of characters (a CRDT inside notes) is noted for later. The note record is to be built so that it can be added.
- The merge layer decides what happens to the owner's data, so it gets tests for every rule, with two and three devices, in every order of arrival.

## 7. Session and handoff

- One device runs the timer; everything else syncs live.
- A device showing "Running on another device" already has the session, so Continue Here is one write.
- **Continue Here starts the timer once Drive confirms that one write.** If the write never arrived, the other device would never learn and both would run; waiting for one confirmation removes that case.

## 8. Versions

Unchanged in how they work, and no longer written at every sync.

- **One repository and one history on Drive**, not one per device.
- **Kept**, as today: the latest, six daily, four weekly, four monthly, with spare slots given to the widest gaps; on top, up to ten hourly versions where notes changed; and one safety version per device for seven days. (The conversation calls this "25 overall".)
- **Each device deletes only the files it wrote.** Every device works out the same kept set from the same list, so none ever deletes under another and no cleanup markers are needed. A device's outdated versions stay on Drive, hidden and small, until that device is next opened. Any device may clean up after one not seen for thirty days.
- **No duplicates.** A device writes no new version when the newest already holds the same data.
- **Shards stay.** One refinement: with four fixed shards, one changed note re-sends a quarter of all small notes, so the number of shards should grow with the library.

## 9. Attachments

- Stored in fixed-size pieces named by fingerprint. Only missing pieces move, and each is checked on arrival.
- New: an interrupted upload or download continues from the pieces already there, also after a reload, with nothing sensitive stored.
- New: on the other device the attachment's entry appears with the next sync; its content follows once the pieces are complete, and until then it shows as still arriving.
- Attachments are part of the first build.

## 10. On the device

- **A "to send" list.** Every save adds its record to the list in the same database write, so a saved change cannot be missed. "Synced" means the list is empty and every other device's files have been applied. Today the app works out what changed by fingerprinting the library and comparing.
- **One database write per batch received**, which happens completely or not at all. No safety copy is needed, because nothing is replaced wholesale. The full safety copy and the journal stay only for Restore and Replace.
- **The twenty-minute version doubles as a cross-check**: it is the whole library, so two devices can compare fingerprints and catch anything sync missed.

## 11. Cleanup

| What | How |
|---|---|
| Versions | The retention rule of section 8 |
| Shards and pieces no kept version uses | Removed, as today |
| Deleted attachments | Pieces removed once no kept version needs them, so a restore still works |
| Deleted notes | Recently deleted, and deletion records, as today |
| Session and changes files | Nothing to clean |

## 12. What it should buy

| | Today | Proposed |
|---|---|---|
| Upload a change | About 6 requests | 1 |
| Continue Here | About 5 | 1 (estimated 1 to 4 seconds on the phone, under a second on the laptop) |
| Delay before a change goes up | Up to 20 minutes | Seconds for the session, about a minute for the rest, while signed in |

The shorter delay also limits what a lost database on the phone can cost. Encryption fits: each small file and each piece is encrypted on its own.

**The cost:** two kinds of files on Drive instead of one, and a new merge layer that needs thorough tests of its own.

## 13. Not doing

| | Why |
|---|---|
| Only trimming requests on today's design | Reaches perhaps three requests and keeps all the coordination |
| A CRDT library now | It means rebuilding the editor around it; fast sync makes the case rarer; room is left to add it inside notes |
| A server | The only route to true push and background sync, and the owner's rule excludes it |
| Reading versions made by today's app | The owner exports one backup file before the move; the new app must import a file made by today's app |

## 14. To check on real Google Drive before committing

1. Whether Drive's "what changed since" feed works with this app's level of permission. If not, the current ten-second listing still does the job.
2. That a reader never sees a half-overwritten file.

## 15. Order of building

The session first (the smallest data and the biggest pain), then the other records, then attachments, then encryption. The old path keeps working until each step is proven.

## 16. Settled with the owner

- One device runs the timer; everything else syncs.
- Continue Here waits for Drive to confirm one write.
- Version History as today, on the twenty-minute rule, one history overall, each device deleting only its own files.
- Session changes go at once; everything else about a minute after editing stops.
- A changes file that is overwritten in place, not numbered files.
- Attachments in the first build.
- A CRDT for note text is noted for later.
- Old versions are not carried over; one backup file is exported before the move.

## 17. Not yet stated in the conversation

Points this summary could not find an answer to, for the design document to settle:

- The exact folder layout on Drive after the later rulings (the first picture had a folder per device holding its own versions; the later ruling is one repository for all).
- How large a changes file may grow before a device writes a version early.
- What a device does when its sign-in has lapsed and it holds session changes it could not send.
- Whether the engine is to be usable by a second app. Practice Director asks for this; see the needs document.
