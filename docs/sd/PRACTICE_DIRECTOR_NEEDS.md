# What Practice Director needs from the new sync engine

Written 15 Nov 2026 for whoever designs Study Director's new sync (summarised in [SYNC_PLAN.md](SYNC_PLAN.md)). The owner intends both apps to run on that one engine. This page is written to be read on its own, so it can be handed to the Study Director session as it is.

Practice Director accepts the plan as it stands: a small changes file per device that only that device overwrites, versions built from shards, merging record by record with a count per device, and a "to send" list written with every save. Nothing below asks for a different design. It asks that the engine not assume it serves Study Director alone.

## 1. Practice Director in five lines

- A second app by the same owner: revision and exam practice, where Study Director is time and notes. It will be a separate web address. Nothing is built yet.
- Same rules: no server, no accounts, everything on the device, the owner's Google Drive between devices.
- It is written in TypeScript modules and built with Vite.
- It stores three kinds of thing (below) and **stores nothing that can be worked out**: memory dates, scores and progress are computed each time.
- It has no running timer to hand from one device to another.

| Kind | What | How it behaves | How much |
|---|---|---|---|
| Records | Settings, exam dates, ticked topics, marking points, lessons on mistakes | Small; replaced in place | A few thousand, under 1 MB in all |
| Facts | A recall, a sitting of a paper, a written answer | Written once; about 60 bytes to 1.5 KB each; a correction replaces one | About 10,000 a year, 1 to 2 MB |
| Files | Clips (20 to 60 KB), the owner's PDFs (2 to 10 MB), photos | Never change | Clips in the thousands; PDFs in the hundreds |

## 2. What it needs

### To be usable by a second app at all

1. **No built-in knowledge of Study Director's own things.** Today's repository core asks its host for day, session and note fingerprints by name. The new engine should be given a table by the app: each kind of data, how it is keyed, how it is cut into shards, and what happens when two devices both changed it.
2. **Importable as a module** from a TypeScript app, with no dependence on Study Director's internal module registry or on anything in `app.html`.
3. **A clear answer on who owns the database write.** The "to send" list must be written in the same database write as the app's own save. Either the engine offers a call that takes the app's open write, or the engine owns the store and the app saves through it. Either works; it has to be decided once for both apps.
4. **Its own folder on Drive.** Each app writes only inside its own folder, in the same way each device writes only its own files.
5. **The parts it does not use cost it nothing.** Practice Director does not use the session file, Continue Here, the ten-second check, Smart merge for notes or the review queue. Those should be separable, so that they are neither loaded nor running.

### To fit its data

6. **Shards cut by time for facts.** One shard per month. A finished month then never changes, so it is never sent again and costs nothing in any later version. Records can use the growing shard count the plan already proposes.
7. **A "both changed" rule that never asks the owner.** For records: the later change wins. For facts: they are written once, so two devices only differ on a fact when one corrected it; the later correction wins. The count per device still does the detecting, as in the plan; the time is used only to break that tie. No Practice Director kind is ever kept for review, so a kind must be able to opt out of review entirely.
8. **Files fetched only when asked for.** The plan has an attachment's content follow its entry by itself. That suits notes. Practice Director's PDFs are large and most will never be opened on the phone, so it needs a setting per kind of file: fetch at once, or fetch when opened. It also needs to drop a local copy that Drive holds.
9. **Deletion records that work for any kind.**

### Timing and connection

10. **Sync without a session.** Practice Director sends when a session or a paper ends and about a minute after an edit, and receives when the app is opened or returned to. It needs no polling.
11. **Whole without Drive.** The one-hour sign-in is accepted as it is. The app must be complete while signed out, the "to send" list must simply wait, and nothing may block the screen.
12. **Versions on the app's own settings.** Written twenty minutes after the first change is fine. Kept: the latest, one a day for a week, one a week for a month, and one before anything large. So the retention rule should be something an app sets, not a constant.
13. **A device that lost its storage recovers by itself**, as Study Director's own backlog already asks: a small marker outside the database says that this device had data and where its backup lives.
14. **A place for versions on the device itself**, for an owner who has connected neither Drive nor a folder: the last three daily versions. If the engine's storage adapters (list, download, upload, delete) allow a third kind beside Drive and the Device Folder, this needs nothing more.

### So that the two apps can talk

The owner wants three links between the apps: a finished study block ticks a topic; today's practice time is offered to the day's plan; a topic opens the note of the same name.

15. **One Google sign-in project for both apps, with both web addresses allowed.** With the permission Study Director uses, an app sees only the files it created. Unless both apps count as one to Google, neither can read what the other wrote. **This needs checking on real Drive**, alongside the two checks already in the plan.
16. **Two small exchange files, on the plan's own principle**: each app overwrites only its own, and the other only reads it.

| File | Written by | Holds |
|---|---|---|
| From Practice Director | Practice Director | Minutes of practice due today, recall load for the next 14 days, exam dates, the slots of full papers, the names of topics |
| From Study Director | Study Director | Study blocks finished in the last few days (Area, date, minutes), and the titles of notes |

17. **The same day**, which starts at 04:00, and Area names that match topic names. Both are already Study Director's.

## 3. What it does not need

So that the design is not stretched for it: handing over a live session, the ten-second check, merging the text of notes, a review queue, a CRDT, reading old formats, and encryption in its first builds.

## 4. Questions for the design document

1. Who owns the database write (need 3)?
2. Can an app choose how a kind is cut into shards, including by month (need 6)?
3. Can a kind of file be fetched only when opened (need 8)?
4. Can a kind opt out of review, with "later wins" (need 7)?
5. Do two web addresses under one Google project see each other's files (need 15)?
6. How much code does an app carry if it uses no session, no attachments and no encryption (need 5)?

## 5. Timing

Practice Director needs no sync for its first three phases. Sync is its phase 4. If the engine is not ready by then, Practice Director would write a small sync of its own to the same layout on Drive (a changes file per device, versions built from shards), so that moving onto the shared engine later changes no data.
