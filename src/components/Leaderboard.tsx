import { useEffect, useState } from 'react';
import type { Level } from '../types';
import { leaderboard, type LeaderRow, type Period } from '../lib/rankings';
import { supabase } from '../lib/supabase';

interface LeaderboardProps {
  today: string;
  lang: string;
  initialLevel?: Level;
}

const periods: { value: Period; label: string }[] = [
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'This week' },
  { value: 'month', label: 'This month' },
];

const levels: Level[] = ['A1', 'A2', 'B1', 'B2'];

// Rankings for one level at a time, with Today / This week / This month
export function Leaderboard({ today, lang, initialLevel = 'A1' }: LeaderboardProps) {
  const [level, setLevel] = useState<Level>(initialLevel);
  const [period, setPeriod] = useState<Period>('today');
  const [rows, setRows] = useState<LeaderRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!supabase) return;
    let cancelled = false;
    setLoading(true);
    setError(null);
    leaderboard(period, today, lang, level)
      .then((data) => { if (!cancelled) setRows(data); })
      .catch((e: Error) => { if (!cancelled) setError(e.message); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [period, today, lang, level]);

  if (!supabase) {
    return <p className="match-hint">Rankings are not set up yet.</p>;
  }

  return (
    <div className="leaderboard">
      <div className="gloss-toggle leaderboard-tabs" role="group" aria-label="Level">
        {levels.map((l) => (
          <button
            key={l}
            className={`gloss-btn${level === l ? ' active' : ''}`}
            aria-pressed={level === l}
            onClick={() => setLevel(l)}
          >
            {l}
          </button>
        ))}
      </div>

      <div className="gloss-toggle leaderboard-tabs" role="group" aria-label="Ranking period">
        {periods.map((p) => (
          <button
            key={p.value}
            className={`gloss-btn${period === p.value ? ' active' : ''}`}
            aria-pressed={period === p.value}
            onClick={() => setPeriod(p.value)}
          >
            {p.label}
          </button>
        ))}
      </div>

      {loading && <p className="match-hint">Loading…</p>}
      {error && <p className="scene-message bad">{error}</p>}
      {!loading && !error && rows.length === 0 && (
        <p className="match-hint">No {level} scores yet for this period. Be the first!</p>
      )}

      {rows.length > 0 && (
        <ol className="leaderboard-list">
          {rows.map((r, i) => (
            <li key={`${r.nickname}-${i}`} className="leaderboard-row">
              <span className="leaderboard-rank">{i + 1}</span>
              <span className="leaderboard-name">{r.nickname}</span>
              <span className="leaderboard-score">{r.correct_total}/{r.total_questions} · {r.pct}%</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
