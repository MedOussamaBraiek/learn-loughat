# Handoff — learn-german

Last updated: 2026-10-23
Repo: https://github.com/MedOussamaBraiek/learn-german
Branch: `main`
Stack: Vite 8 + React 19 + TypeScript + Supabase. Lint = `oxlint`.

---

## Resume on another laptop

1. `git clone https://github.com/MedOussamaBraiek/learn-german.git` (or `git pull` if already cloned)
2. `npm install`
3. Create `.env.local` in the project root (gitignored) with:
   ```
   VITE_SUPABASE_URL=...
   VITE_SUPABASE_ANON_KEY=...
   ```
   The app still runs offline without these, but login/rankings need them.
4. `npm run dev` → http://localhost:5173
5. Open opencode in the repo and say: **"Read HANDOFF.md and continue."**
6. Verify before changing anything:
   - `npm run build` (runs `tsc -b && vite build`)
   - `npm run lint` (`oxlint` — 2 known fast-refresh warnings are expected, 0 errors)

The exact chat transcript lives only on the first machine in
`C:\Users\pc\.local\share\opencode\opencode.db`. This file is the portable summary instead.

---

## Current state — uncommitted work from this session

New files:
- `src/data/dialogs.ts`
- `src/components/McqGame.tsx`
- `src/components/DialogGame.tsx`
- `src/components/DialogScene.tsx`
- `src/components/DialogChat.tsx`

Modified files:
- `src/App.tsx` — added `'dialog'` screen, `activeDialogId`, `handleOpenDialog`
- `src/components/TopicCourse.tsx` — Dialogues section + `onOpenDialog`
- `src/components/VerbGame.tsx` — now a thin wrapper over `McqGame`
- `src/data/topics.ts` — A1 `directions` topic (16 words)
- `src/data/wordEmoji.ts` — direction emojis
- `src/data/scenes.ts` — `directions` picture scene
- `src/i18n/uiText.ts` — `dialogues.*` keys + verb-lab keys
- `src/App.css` — full-screen dialogue styles + verb-lab tweaks

Status before leaving: `tsc` clean, `oxlint` 0 errors (2 pre-existing warnings), `npm run build` passing.

---

## What was built

### 1. Dialogues (A1 pilot)
- `src/data/dialogs.ts` — 3 dialogues, each line has `de` / `en` / `ar`:
  - `cafe-a1` — Im Café
  - `directions-a1` — Nach dem Weg fragen
  - `shopping-a1` — Kleidung kaufen
- Helpers: `getDialogs(level)`, `getDialog(id)`, `buildDialogQuestions(dialog)`.
- `DialogChat.tsx` — full-screen immersive reader:
  - `SceneBackdrop` (SVG café/street/shop) fills the viewport (`position: fixed`, `preserveAspectRatio="slice"`).
  - Two `PersonSprite` characters at the edges with name tags.
  - Chat messages in a scrollable overlay: person A left / person B right, translation underneath in small gray.
  - Glassy top bar (back, title, EN/AR gloss toggle) and bottom bar (Play).
  - Forced `dir="ltr"` so Arabic UI doesn't flip the bubbles.
- `DialogGame.tsx` — "fill the missing reply", built on `McqGame`.
- `McqGame.tsx` — shared 10-question engine (also used by `VerbGame`).
- Access: **Home → Courses → A1 → Learn → Dialogues**.

### 2. Directions vocab
- A1 topic `directions`: links, rechts, geradeaus, vorne, hinten, oben, unten, neben, zwischen, gegenüber, nah, weit, Straße, Ecke, Kreuzung, Ampel.
- Shows in **Quick memory** and **Word games**.
- Kept to 16 words on purpose: the emoji picture grid uses 56px tiles above 10 items and overlaps with more.

### 3. Verb Lab (committed earlier, still present)
- Overview + Perfekt / Präteritum / Imperativ tabs, advice cards, haben/sein filter, verb tables.
- Rule-based same-verb distractors in `src/data/generators.ts`.
- Access: **Level → Hub → ⏰ Past & Verbs**.

---

## Design decisions
- Content gloss is **EN + AR** only (`GlossToggle`); UI chrome is localized via `useTx()` in `src/i18n/uiText.ts`.
- Dialogues are **A1-only for now** — the section hides on other levels.
- Dialogue background is a full-bleed SVG scene; messages float over it in a scroll layer.
- Emoji picture scenes should stay **≤16 items**.

---

## Known issues / next steps
- Add more dialogues (data only — extend `src/data/dialogs.ts`; `DialogPlace` is `'cafe' | 'street' | 'shop'`).
- Optionally add French translations to dialogue lines.
- Enable dialogues for A2/B1 when content exists (gate in `TopicCourse.tsx`).
- Pre-existing bugs:
  - `DailyChallenge.tsx:76` sets the localStorage lock before the network save (lockout risk).
  - TTS uses the wrong language in `WordMatch.tsx:76` and `SceneBoard.tsx:76`.
  - `DerDieDas.tsx:22` ending rules contradict each other.
  - i18n is only half-wired; two sources of truth for scenes.
- `oxlint` warnings: `GlossContext.tsx:18`, `LanguageContext.tsx:25` (react-refresh only).

---

## Supabase / Google login on localhost
The code is correct (`redirectTo: window.location.origin`, `src/lib/rankings.ts:31`).
In the Supabase dashboard: **Authentication → URL Configuration → Redirect URLs**, add:
```
http://localhost:5173
http://localhost:5173/**
```
Then hard-refresh with `Ctrl+Shift+R`.

---

## Quick access paths
- Quick memory: Home → ⚡ Quick memory → Directions & Places
- Dialogues: Home → Courses → A1 → Learn → Dialogues → open one
- Verb Lab: Level → Hub → ⏰ Past & Verbs
- "Hub" = the "What do you want to do?" screen after picking a level.
