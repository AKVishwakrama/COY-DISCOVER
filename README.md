# Coy · Discover

A swipe-based "Discover" tab for Coy. Like in secret, match only when it is mutual.
Built with Next.js (App Router) + API routes + a JSON file database. No external services.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

Open it on a phone-sized window (or your phone on the same Wi-Fi). On desktop use the buttons or the left/right arrow keys.

**Demo tip:** 8 of the 32 profiles have already liked you (Aanya, Meera, Arjun, Sana, Aarav, Riya, Yash, Anika). Like any of them to see the "It's a match!" screen. When the deck is empty, tap "Replay demo" to reset.

## What is in the app

- **Home tab**: blank, as asked.
- **Discover tab**: a Swipe view and a Matches view.
- **Swipe**: drag a card right (like) or left (pass). A wax-seal stamp appears as you drag right, an ink stamp as you drag left. Buttons and arrow keys do the same on desktop.
- **Match screen**: appears the moment a like is mutual.
- **Matches view**: all mutual matches, newest first.
- **Empty state**: shown when no profiles are left.

## Folder map

```
app/page.js            Tab bar shell (Home blank + Discover)
app/api/feed           GET  /feed     -> profiles not yet swiped on
app/api/swipe          POST /swipe    -> save like/pass, tell if it is a match
app/api/matches        GET  /matches  -> mutual matches
app/api/reset          POST           -> demo helper (wipes swipes)
lib/db.js              ALL backend logic (read this one first)
lib/api.js             fetch wrappers for the frontend
data/seed.js           32 mock profiles
components/Discover.js State: deck, matches, modal, keyboard, saving swipes
components/SwipeCard.js Drag gesture + fly-off animation
components/MatchModal.js, Matches.js, Photo.js, Icons.js
app/globals.css        The whole design
```

`GET /feed`, `POST /swipe`, `GET /matches` also work without the `/api` prefix (see `next.config.js`).

## How the logic works

**Data.** `data/db.json` holds `profiles`, `swipes` (`{ profileId: 'like' | 'pass' }`) and `matches`. It is created from the seed on first run. Writes go to a temp file first and are then renamed, so the file cannot be half-written. Reads and writes are synchronous, so two requests can never mix up a read-modify-write.

**Feed.** Return every profile that has no entry in `swipes`. This is why a swiped profile never comes back, even after a reload or a restart.

**Swipe.** Validate input, then save the swipe. It is a match only if `direction === 'like'` AND the profile has already liked the user (`likesMe`). Swiping on the same profile twice changes nothing (safe for double taps and two tabs).

**Matches.** Read the `matches` list, join with profile data, newest first.

**Frontend.** The card is removed from the screen right after the fly-off animation, and the swipe is saved in the background. If saving fails, the card is put back and a message is shown.

## Privacy (the core promise)

Things that could leak who liked you, and how each is handled:

| Risk | Fix |
|---|---|
| API sends the `likesMe` field | Profiles leave the server only through `publicProfile()`, an allow-list. `likesMe` is never sent. |
| Feed order reveals admirers (e.g. they come first) | Feed is sorted by a hash of the id: looks random, stays stable. Admirers are mixed in. |
| Swipe response hints at the answer | A pass or a non-mutual like returns only `{ match: false }`. Same response whether or not they liked you. |
| Matches list shows more than it should | Only profiles you liked AND who liked you are listed. |

Known limit: because "like" returns `match: true` only when mutual, a user who likes everyone would learn who liked them. That is inherent to any swipe app. A real version should rate-limit likes per day.

## Deploying

- Vercel: works, but the server file system is temporary (`/tmp`), so data resets on cold starts. For a persistent deploy use Railway/Render/Fly, or swap `lib/db.js` for SQLite/Postgres. Only `lib/db.js` needs to change.
- Set `DISABLE_RESET=1` to turn off the demo reset endpoint.

## Part A

See `docs/PART_A_FEATURES.md`.
