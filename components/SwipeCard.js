'use client';
import { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react';
import Photo from './Photo';
import { PinIcon } from './Icons';

const THRESHOLD = 110;   // px dragged before a release counts as a swipe
const FAST = 0.6;        // px/ms: a quick flick also counts, even if short
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

// One draggable card. The parent can also trigger a swipe from buttons/keyboard via ref.fling().
const SwipeCard = forwardRef(function SwipeCard({ profile, onSwiped }, ref) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [mode, setMode] = useState('idle'); // idle | drag | fly | snap
  const start = useRef(null);
  const done = useRef(false); // guards against double swipes on the same card

  const fling = useCallback(
    (dir) => {
      if (done.current) return;
      done.current = true;
      setMode('fly');
      const off = (typeof window !== 'undefined' ? window.innerWidth : 600) * 1.3;
      setPos({ x: dir === 'like' ? off : -off, y: -30 });
      setTimeout(() => onSwiped(profile, dir), 260); // wait for the fly-out animation
    },
    [onSwiped, profile]
  );
  useImperativeHandle(ref, () => ({ fling }), [fling]);

  const down = (e) => {
    if (done.current) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    start.current = { x: e.clientX, y: e.clientY, t: Date.now() };
    setMode('drag');
  };
  const move = (e) => {
    if (!start.current) return;
    setPos({ x: e.clientX - start.current.x, y: (e.clientY - start.current.y) * 0.35 });
  };
  const up = (e) => {
    if (!start.current) return;
    const dx = e.clientX - start.current.x;
    const speed = dx / Math.max(1, Date.now() - start.current.t);
    start.current = null;
    if (Math.abs(dx) > THRESHOLD || (Math.abs(speed) > FAST && Math.abs(dx) > 40)) {
      fling(dx > 0 ? 'like' : 'pass');
    } else {
      setMode('snap');
      setPos({ x: 0, y: 0 });
    }
  };

  const strength = clamp(Math.abs(pos.x) / 100, 0, 1);
  const transition =
    mode === 'drag' ? 'none' : mode === 'fly' ? 'transform .26s cubic-bezier(.5,0,.9,.6)' : 'transform .38s cubic-bezier(.2,1.5,.4,1)';

  return (
    <article
      className="card top"
      style={{ transform: `translate(${pos.x}px, ${pos.y}px) rotate(${pos.x / 18}deg)`, transition }}
      onPointerDown={down}
      onPointerMove={move}
      onPointerUp={up}
      onPointerCancel={up}
      aria-label={`${profile.name}, ${profile.age}`}
    >
      <Photo name={profile.name} src={profile.photo} className="cover" />
      <div className="shade" />

      {/* The "wax seal" stamp: the memorable bit. Liking = sealing the letter. */}
      <div className="stamp seal" style={{ opacity: pos.x > 0 ? strength : 0, transform: `scale(${0.7 + strength * 0.4}) rotate(-12deg)` }}>
        <svg viewBox="0 0 24 24" width="34" height="34" fill="#fff"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" /></svg>
        <small>Sealed</small>
      </div>
      <div className="stamp ink" style={{ opacity: pos.x < 0 ? strength : 0, transform: `scale(${0.7 + strength * 0.4}) rotate(10deg)` }}>
        <span>Not this time</span>
      </div>

      <div className="info">
        <h2>
          {profile.name} <em>{profile.age}</em>
        </h2>
        <p className="place"><PinIcon /> {profile.place}</p>
        <p className="bio">{profile.bio}</p>
        <ul className="chips">
          {profile.interests.map((i) => (<li key={i}>{i}</li>))}
        </ul>
      </div>
    </article>
  );
});

export default SwipeCard;

// The card peeking out underneath. It is not interactive.
export function BehindCard({ profile }) {
  return (
    <article className="card behind" aria-hidden>
      <Photo name={profile.name} src={profile.photo} className="cover" />
      <div className="shade" />
    </article>
  );
}
