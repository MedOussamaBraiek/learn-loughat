import { useEffect, useState } from 'react';
import { friendlyError, topOverall, type LeaderRow } from '../lib/rankings';
import { supabase } from '../lib/supabase';
import { useTx } from '../i18n/uiText';

interface TopThreeProps {
  onOpenRankings: () => void;
}

const medals = ['🥇', '🥈', '🥉'];

// Home screen: the top 3 learners overall, no filters
export function TopThree({ onOpenRankings }: TopThreeProps) {
  const tx = useTx();
  const [rows, setRows] = useState<LeaderRow[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!supabase) return;
    topOverall(3).then(setRows).catch((e: unknown) => setError(friendlyError(e)));
  }, []);

  if (!supabase) return null;

  return (
    <section className="top-three">
      <div className="top-three-head">
        <h2>{tx('top.title')}</h2>
        <button className="top-three-link" onClick={onOpenRankings}>{tx('top.all')}</button>
      </div>
      {error && <p className="match-hint">{error}</p>}
      {!error && rows.length === 0 && <p className="match-hint">{tx('top.empty')}</p>}
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
