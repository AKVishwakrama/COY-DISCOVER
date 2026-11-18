// Tiny JSON-file "database". Everything the backend knows lives in data/db.json.
//
// Shape:
//   { profiles: [...], swipes: { [profileId]: 'like' | 'pass' }, matches: [{ profileId, at }] }
//
// Why a JSON file? Zero setup for reviewers, and it survives page reloads + server restarts.
// Why is it safe? Every function below reads and writes SYNCHRONOUSLY (no await in between),
// so two requests can never interleave in the middle of a read-modify-write.
const fs = require('fs');
const path = require('path');
const seed = require('../data/seed');

// Serverless hosts (Vercel) only allow writes in /tmp. Locally we use ./data.
const DIR = process.env.VERCEL ? '/tmp' : path.join(process.cwd(), 'data');
const FILE = path.join(DIR, 'db.json');

const fresh = () => ({ profiles: seed, swipes: {}, matches: [] });

function save(db) {
  fs.mkdirSync(DIR, { recursive: true });
  const tmp = FILE + '.tmp';
  fs.writeFileSync(tmp, JSON.stringify(db, null, 2));
  fs.renameSync(tmp, FILE); // atomic swap: a crash can never leave a half-written file
}

function load() {
  try {
    return JSON.parse(fs.readFileSync(FILE, 'utf8'));
  } catch {
    const db = fresh();
    save(db);
    return db;
  }
}

// PRIVACY: the ONLY way a profile leaves the server. It is an allow-list, so a field like
// `likesMe` can never leak by accident, even if someone adds more fields to the seed later.
function publicProfile(p) {
  return { id: p.id, name: p.name, age: p.age, place: p.place, bio: p.bio, interests: p.interests, photo: p.photo };
}

// Stable pseudo-random order. If we showed "people who like you" first, the order itself would
// leak who likes you. A hash of the id looks random but is the same on every reload.
function hash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) h = Math.imul(h ^ str.charCodeAt(i), 16777619);
  // final "avalanche" mix so ids that differ by one character still land far apart
  h ^= h >>> 16; h = Math.imul(h, 2246822507);
  h ^= h >>> 13; h = Math.imul(h, 3266489909);
  h ^= h >>> 16;
  return h >>> 0;
}

function getFeed() {
  const db = load();
  return db.profiles
    .filter((p) => !db.swipes[p.id]) // never show anyone already swiped on
    .sort((a, b) => hash('coy:' + a.id) - hash('coy:' + b.id))
    .map(publicProfile);
}

function swipe(profileId, direction) {
  if (typeof profileId !== 'string' || !['like', 'pass'].includes(direction)) {
    return { status: 400, body: { error: 'Send { profileId: string, direction: "like" | "pass" }.' } };
  }
  const db = load();
  const profile = db.profiles.find((p) => p.id === profileId);
  if (!profile) return { status: 404, body: { error: 'Profile not found.' } };

  // Swiping twice on the same person must not change anything (double taps, retries, two tabs).
  if (db.swipes[profileId]) {
    return { status: 200, body: { alreadySwiped: true, match: false } };
  }

  db.swipes[profileId] = direction;

  // A match needs BOTH sides: I liked them (now) AND they liked me (seeded).
  const isMatch = direction === 'like' && profile.likesMe === true;
  if (isMatch) db.matches.push({ profileId, at: new Date().toISOString() });

  save(db);
  return {
    status: 200,
    // The profile is only returned on a match, so a non-match reveals nothing about them.
    body: isMatch ? { match: true, profile: publicProfile(profile) } : { match: false },
  };
}

function getMatches() {
  const db = load();
  return db.matches
    .map((m) => {
      const p = db.profiles.find((x) => x.id === m.profileId);
      return p ? { ...publicProfile(p), matchedAt: m.at } : null;
    })
    .filter(Boolean)
    .sort((a, b) => b.matchedAt.localeCompare(a.matchedAt));
}

function reset() {
  save(fresh());
}

module.exports = { getFeed, swipe, getMatches, reset };
