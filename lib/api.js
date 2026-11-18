// Thin fetch wrappers so components never deal with URLs or error handling directly.
async function request(url, options) {
  const res = await fetch(url, { cache: 'no-store', ...options });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}

export const getFeed = () => request('/api/feed').then((d) => d.profiles);
export const getMatches = () => request('/api/matches').then((d) => d.matches);
export const postSwipe = (profileId, direction) =>
  request('/api/swipe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ profileId, direction }),
  });
export const resetDemo = () => request('/api/reset', { method: 'POST' });
