'use client';
import { useState } from 'react';

// Shows the profile photo. If the image fails to load (offline, blocked host),
// it falls back to a soft gradient with the person's initial, so the UI never looks broken.
export default function Photo({ name, src, className = '' }) {
  const [failed, setFailed] = useState(false);
  const hue = [...name].reduce((a, c) => a + c.charCodeAt(0), 0) % 360;

  if (failed || !src) {
    return (
      <div
        className={`photo fallback ${className}`}
        style={{ background: `linear-gradient(160deg, hsl(${hue} 70% 55%), hsl(${(hue + 50) % 360} 60% 28%))` }}
      >
        <span>{name[0]}</span>
      </div>
    );
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img className={`photo ${className}`} src={src} alt={name} draggable={false} onError={() => setFailed(true)} />;
}
