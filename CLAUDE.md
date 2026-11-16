# Practice Director

One app for revision and practice toward exams (first: UPSC Prelims 2027 and IFoS Mains 2027), built for its owner's daily use and usable by other students. A web app with no server, no accounts and no AI inside it.

**State:** see `docs/STATUS.md`. Until it says building has started, this repository holds the design only.

## What the owner requires

These override convenience, every time.

- The app is never a chore. Everything is recorded by itself and can be corrected afterwards.
- The app offers; the owner decides. It never places work in a plan and never nags.
- No server. No dependency the owner has not agreed to.
- Plain words on screen and in documents. No jargon, no "FSRS", no "retrievability".

## If you are here to build

1. Read `docs/STATUS.md`, then your package in `docs/IMPLEMENTATION.md`, section 6.
2. Read only what the package lists. Boards are pictures in `design/reference/` and sources in `design/mockup/`.
3. Follow the routine in `docs/IMPLEMENTATION.md`, section 3, and the meaning of "done" in section 4.
4. End by updating `docs/STATUS.md`.

## The rules of the code

1. `src/core` is pure: no screen, no storage, no clock. The date is passed in. The same inputs always give the same result; nothing uses chance.
2. A screen never writes to storage. It issues a command in `src/app`; the command writes one record or fact, whole or not at all.
3. Every kind of record and fact is declared once, in the table of kinds in `src/core/kernel`.
4. Dependencies point one way: `ui` → `app` → `core` and `data`. `core` and `data` do not know each other.
5. Nothing that can be worked out is stored (`docs/DATA.md`, section 4).
6. Every number from `docs/RULES.md` lives in `src/core/rules.ts` and nowhere else.
7. Screens are assembled from the kit's components and match their boards.

## Where things are

| | |
|---|---|
| `docs/PLAN.md` | What the app does |
| `docs/RULES.md` | The exact rule behind each automatic behaviour |
| `docs/DATA.md` | What is stored and what is not |
| `docs/BUILD.md` | Stack, modules, what is reused |
| `docs/IMPLEMENTATION.md` | The work packages and the routine |
| `docs/DECISIONS.md` | What was decided, reversed, parked, and what is open |
| `design/` | The mock-up: sources, pictures, and amendments not yet drawn |

The documents are the authority. If code and a document disagree, say so; do not quietly follow the code. When behaviour changes on the owner's word, change the document in the same commit.

## Commands

Set up by package 1.0: `npm run check` (types, dependency direction, unit tests, budgets), `npm run journeys` (browser journeys), `npm run shots` (screenshots at 390, 820 and 1440 wide, both themes), `npm run dev`, `npm run build`.

## Stop and ask the owner when

Two documents contradict each other; a new dependency seems needed; a stored format would change after real use; anything would delete data; content you need does not exist.
