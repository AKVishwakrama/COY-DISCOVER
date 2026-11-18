'use client';
import Photo from './Photo';

// Full-screen "It's a match!" moment. Hearts float up with pure CSS (see .rise in globals.css).
export default function MatchModal({ profile, onKeep, onView }) {
  return (
    <div className="modal" role="dialog" aria-modal="true" aria-label="It's a match">
      <div className="hearts" aria-hidden>
        {Array.from({ length: 14 }, (_, i) => (
          <i key={i} style={{ left: `${(i * 7 + 5) % 96}%`, animationDelay: `${(i % 7) * 0.25}s`, animationDuration: `${3.2 + (i % 5) * 0.5}s` }}>♥</i>
        ))}
      </div>
      <div className="match-body">
        <h1>It&apos;s a match!</h1>
        <p>You both liked each other. Nobody knew until now.</p>
        <div className="pair">
          <div className="me"><span>You</span></div>
          <Photo name={profile.name} src={profile.photo} className="them" />
        </div>
        <h3>{profile.name}, {profile.age}</h3>
        <button className="btn primary" onClick={onView}>See your matches</button>
        <button className="btn ghost" onClick={onKeep}>Keep swiping</button>
      </div>
    </div>
  );
}
