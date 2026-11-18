'use client';
import Photo from './Photo';

function ago(iso) {
  const mins = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 60000));
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const h = Math.round(mins / 60);
  return h < 24 ? `${h}h ago` : `${Math.round(h / 24)}d ago`;
}

// Grid of mutual matches. Nothing here ever shows who liked you without you liking back.
export default function Matches({ matches, onGoSwipe }) {
  if (matches.length === 0) {
    return (
      <div className="empty">
        <h2>No matches yet</h2>
        <p>When someone you like has liked you too, they land here.</p>
        <button className="btn primary" onClick={onGoSwipe}>Start swiping</button>
      </div>
    );
  }
  return (
    <ul className="grid">
      {matches.map((m) => (
        <li key={m.id} className="tile">
          <Photo name={m.name} src={m.photo} className="cover" />
          <div className="shade" />
          <div className="tile-info">
            <b>{m.name}, {m.age}</b>
            <span>{m.place}</span>
            <small>Matched {ago(m.matchedAt)}</small>
          </div>
        </li>
      ))}
    </ul>
  );
}
