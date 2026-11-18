/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  // The assignment names the endpoints GET /feed, POST /swipe, GET /matches.
  // Real handlers live under /api/*; these rewrites make the short paths work too.
  async rewrites() {
    return [
      { source: '/feed', destination: '/api/feed' },
      { source: '/swipe', destination: '/api/swipe' },
      { source: '/matches', destination: '/api/matches' },
    ];
  },
};
