'use client';
import { useState } from 'react';
import Discover from '../components/Discover';
import { HomeIcon, SparkIcon } from '../components/Icons';

// The shell: a phone-sized frame with a bottom tab bar.
// "Home" is intentionally blank (per the brief). All the work is in <Discover />.
export default function Page() {
  const [tab, setTab] = useState('discover');

  return (
    <main className="app">
      <section className="screen" aria-live="polite">
        {tab === 'home' ? <div className="home-blank" aria-label="Home (intentionally blank)" /> : <Discover />}
      </section>

      <nav className="tabbar" aria-label="Main">
        <button className={tab === 'home' ? 'tab on' : 'tab'} onClick={() => setTab('home')}>
          <HomeIcon />
          <span>Home</span>
        </button>
        <button className={tab === 'discover' ? 'tab on' : 'tab'} onClick={() => setTab('discover')}>
          <SparkIcon />
          <span>Discover</span>
        </button>
      </nav>
    </main>
  );
}
