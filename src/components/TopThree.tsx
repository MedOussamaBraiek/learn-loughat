import { useEffect, useState } from 'react';
import { topOverall, type LeaderRow } from '../lib/rankings';
import { supabase } from '../lib/supabase';

interface TopThreeProps {
  onOpenRankings: () => void;
}

const medals = ['🥇', '🥈', '🥉'];

// Home screen: the top 3 learners overall, no filters
export function TopThree({ onOpenRankings }: TopThreeProps) {
  const [rows, setRows] = useState<LeaderRow[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!supabase) return;
    topOverall(3).then(setRows).catch((e: Error) => setError(e.message));
  }, []);

  if (!supabase) return null;

  return (
    <section className="top-three">
      <div className="top-three-head">
        <h2>🏆 Top learners</h2>
        <button className="top-three-link" onClick={onOpenRankings}>See all rankings →</button>
      </div>
      {error && <p className="match-hint">{error}</p>}
      {!error && rows.length === 0 && <p className="match-hint">No scores yet. Take today’s challenge to appear here!</p>}
      <ol className="top-three-list">
        {rows.map((r, i) => (
          <li key={`${r.nickname}-${i}`} className={`top-three-row place-${i + 1}`}>
            <span className="top-three-medal">{medals[i]}</span>
            <span className="top-three-name">{r.nickname}</span>
            <span className="top-three-score">{r.correct_total} correct · {r.pct}%</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
