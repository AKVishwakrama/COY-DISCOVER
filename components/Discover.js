'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { getFeed, getMatches, postSwipe, resetDemo } from '../lib/api';
import SwipeCard, { BehindCard } from './SwipeCard';
import MatchModal from './MatchModal';
import Matches from './Matches';
import { CloseIcon, HeartIcon, EnvelopeIcon, LockIcon } from './Icons';

export default function Discover() {
  const [view, setView] = useState('swipe'); // swipe | matches
  const [deck, setDeck] = useState(null);     // null = still loading
  const [matches, setMatches] = useState([]);
  const [matchModal, setMatchModal] = useState(null);
  const [toast, setToast] = useState('');
  const topRef = useRef(null);

  const load = useCallback(async () => {
    try {
      const [feed, mine] = await Promise.all([getFeed(), getMatches()]);
      setDeck(feed);
      setMatches(mine);
    } catch {
      setDeck([]);
      setToast('Could not load profiles. Check that the server is running.');
    }
  }, []);

  useEffect(() => { load(); }, [load]);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(''), 3200);
    return () => clearTimeout(t);
  }, [toast]);

  // Called once the card has finished flying off screen.
  const handleSwiped = useCallback(async (profile, direction) => {
    setDeck((d) => d.filter((p) => p.id !== profile.id)); // remove it right away: feels instant
    try {
      const res = await postSwipe(profile.id, direction);   // ...then save it on the server
      if (res.match) {
        setMatches((m) => [{ ...res.profile, matchedAt: new Date().toISOString() }, ...m]);
        setMatchModal(res.profile);
      }
    } catch {
      setDeck((d) => [profile, ...d]); // saving failed: put the card back so nothing is lost
      setToast('Could not save that swipe. Try again.');
    }
  }, []);

  // Desktop: arrow keys also swipe.
  useEffect(() => {
    const onKey = (e) => {
      if (view !== 'swipe' || matchModal) return;
      if (e.key === 'ArrowRight') topRef.current?.fling('like');
      if (e.key === 'ArrowLeft') topRef.current?.fling('pass');
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [view, matchModal]);

  const replay = async () => {
    try { await resetDemo(); await load(); setView('swipe'); } catch { setToast('Reset failed.'); }
  };

  const top = deck?.[0];
  const next = deck?.[1];

  return (
    <div className="discover">
      <header className="head">
        <div className="brand">coy</div>
        <div className="seg" role="tablist" aria-label="Discover views">
          <button role="tab" aria-selected={view === 'swipe'} className={view === 'swipe' ? 'on' : ''} onClick={() => setView('swipe')}>Swipe</button>
          <button role="tab" aria-selected={view === 'matches'} className={view === 'matches' ? 'on' : ''} onClick={() => setView('matches')}>
            Matches{matches.length > 0 && <b className="count">{matches.length}</b>}
          </button>
        </div>
      </header>

      {view === 'swipe' ? (
        <>
          <p className="promise"><LockIcon /> Your likes stay secret until it&apos;s mutual</p>

          <div className="deck">
            {deck === null && <div className="skeleton" aria-label="Loading" />}
            {deck !== null && !top && (
              <div className="empty">
                <EnvelopeIcon />
                <h2>You&apos;ve seen everyone</h2>
                <p>New people show up here as they join. Check your matches while you wait.</p>
                <button className="btn primary" onClick={() => setView('matches')}>View matches</button>
                <button className="btn ghost" onClick={replay}>Replay demo</button>
              </div>
            )}
            {next && <BehindCard key={next.id} profile={next} />}
            {top && <SwipeCard key={top.id} ref={topRef} profile={top} onSwiped={handleSwiped} />}
          </div>

          <div className="actions">
            <button className="round pass" onClick={() => topRef.current?.fling('pass')} disabled={!top} aria-label="Pass"><CloseIcon /></button>
            <button className="round like" onClick={() => topRef.current?.fling('like')} disabled={!top} aria-label="Like"><HeartIcon filled /></button>
          </div>
        </>
      ) : (
        <div className="matches-wrap">
          <Matches matches={matches} onGoSwipe={() => setView('swipe')} />
        </div>
      )}

      {matchModal && (
        <MatchModal
          profile={matchModal}
          onKeep={() => setMatchModal(null)}
          onView={() => { setMatchModal(null); setView('matches'); }}
        />
      )}
      {toast && <div className="toast" role="status">{toast}</div>}
    </div>
  );
}
