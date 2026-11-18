// 32 mock profiles. `likesMe: true` means this person already liked the logged-in user.
// That flag is SERVER-ONLY. It is never sent to the browser (see lib/db.js -> publicProfile).
const w = (n) => `https://randomuser.me/api/portraits/women/${n}.jpg`;
const m = (n) => `https://randomuser.me/api/portraits/men/${n}.jpg`;

// [name, age, place, bio, interests, photo, likesMe]
const rows = [
  ['Aanya', 21, 'Delhi University', 'Chai snob. Will rate your playlist honestly.', ['Indie music', 'Chai', 'Poetry'], w(44), true],
  ['Kabir', 23, 'Bengaluru', 'Weekend trekker, weekday spreadsheet person.', ['Trekking', 'Cricket', 'Coffee'], m(32), false],
  ['Meera', 22, 'IIT Bombay', 'Building robots, losing at chess.', ['Robotics', 'Chess', 'Sketching'], w(65), true],
  ['Rohan', 24, 'Mumbai', 'Street food is a love language.', ['Food walks', 'Football', 'Stand-up'], m(75), false],
  ['Ishita', 20, 'Christ University', 'Dancer. Overthinker. Great at parallel parking.', ['Kathak', 'Road trips', 'Journaling'], w(12), false],
  ['Arjun', 25, 'Hyderabad', 'Startup by day, guitar by night.', ['Guitar', 'Startups', 'Biryani'], m(12), true],
  ['Tara', 22, 'Pune', 'Cat person. Bookstore regular.', ['Books', 'Cats', 'Pottery'], w(33), false],
  ['Vihaan', 21, 'BITS Pilani', 'Will beat you at table tennis.', ['Table tennis', 'Anime', 'Coding'], m(45), false],
  ['Sana', 23, 'Jaipur', 'Photographer chasing golden hour.', ['Photography', 'Travel', 'Thrift'], w(21), true],
  ['Dev', 26, 'Gurugram', 'Runs half marathons, eats full pizzas.', ['Running', 'Pizza', 'Podcasts'], m(5), false],
  ['Nisha', 21, 'Lady Shri Ram College', 'Debate team. Yes, I will argue about pineapple.', ['Debate', 'Cinema', 'Baking'], w(8), false],
  ['Aarav', 22, 'NIT Trichy', 'Sunrise person. Rare, I know.', ['Cycling', 'Chess', 'Tea'], m(22), true],
  ['Zoya', 24, 'Lucknow', 'Poetry nights and late-night biryani.', ['Urdu poetry', 'Biryani', 'Film photography'], w(52), false],
  ['Kunal', 27, 'Chennai', 'Marine biologist. Ask me about octopuses.', ['Diving', 'Marine life', 'Filter coffee'], m(60), false],
  ['Riya', 20, 'Symbiosis Pune', 'Fashion design student. Pins everything.', ['Fashion', 'Sketching', 'K-dramas'], w(28), true],
  ['Advait', 23, 'Kolkata', 'Football, adda, and bad puns.', ['Football', 'Adda', 'Photography'], m(18), false],
  ['Mira', 25, 'Goa', 'Surf instructor. Terrible at replying fast.', ['Surfing', 'Sunsets', 'Vinyl'], w(75), false],
  ['Yash', 22, 'IIM Indore', 'Case-study nerd. Fun at parties, allegedly.', ['Cases', 'Cricket', 'Board games'], m(41), true],
  ['Pooja', 24, 'Ahmedabad', 'Garba champion three years running.', ['Garba', 'Cooking', 'Yoga'], w(17), false],
  ['Neil', 21, 'Manipal', 'Drummer in an average band.', ['Drums', 'Gaming', 'Maggi'], m(66), false],
  ['Kavya', 23, 'Chandigarh', 'Stargazing and strong opinions on sequels.', ['Astronomy', 'Movies', 'Cycling'], w(3), false],
  ['Samar', 26, 'Delhi', 'Product designer. Fonts are my personality.', ['Design', 'Typography', 'Jazz'], m(28), false],
  ['Anika', 22, 'Ashoka University', 'Philosophy major, snack minimalist.', ['Philosophy', 'Writing', 'Hiking'], w(39), true],
  ['Rehan', 24, 'Bhopal', 'Cooks better than I dress.', ['Cooking', 'Stand-up', 'Gym'], m(52), false],
  ['Diya', 21, 'VIT Vellore', 'Plant mom to 14 and counting.', ['Plants', 'Baking', 'Pop music'], w(60), false],
  ['Ayaan', 25, 'Noida', 'Weekend mechanic, full-time dreamer.', ['Bikes', 'Road trips', 'Rock'], m(85), false],
  ['Shreya', 23, 'Kochi', 'Backwater mornings, bad Wi-Fi evenings.', ['Kayaking', 'Seafood', 'Reading'], w(47), false],
  ['Ishaan', 20, 'SRCC Delhi', 'Stock market memes and real friendships.', ['Finance', 'Memes', 'Badminton'], m(9), false],
  ['Naina', 24, 'Indore', 'Poha evangelist.', ['Street food', 'Dance', 'Travel'], w(26), false],
  ['Veer', 22, 'IIT Madras', 'Debugging life one commit at a time.', ['Open source', 'Chess', 'Sci-fi'], m(70), false],
  ['Larissa', 23, 'Shillong', 'Folk guitar and a lot of rain.', ['Folk music', 'Hiking', 'Coffee'], w(56), false],
  ['Madhav', 27, 'Varanasi', 'Boat rides, bansuri, and bad jokes.', ['Flute', 'History', 'Photography'], m(36), false],
];

const seed = rows.map(([name, age, place, bio, interests, photo, likesMe], i) => ({
  id: `p${String(i + 1).padStart(2, '0')}`,
  name, age, place, bio, interests, photo,
  likesMe, // server-only
}));

module.exports = seed;
