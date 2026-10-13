import { useEffect, useState } from 'react';
import type { Level } from '../types';
import { friendlyError, leaderboard, type LeaderRow, type Period } from '../lib/rankings';
import { shareRankCard } from '../lib/shareImage';
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
const medals = ['🥇', '🥈', '🥉'];

// Rankings for one level at a time: podium for the top 3, list below, and a shareable card
export function Leaderboard({ today, lang, initialLevel = 'A1' }: LeaderboardProps) {
  const [level, setLevel] = useState<Level>(initialLevel);
  const [period, setPeriod] = useState<Period>('today');
  const [rows, setRows] = useState<LeaderRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shareNote, setShareNote] = useState<string | null>(null);
  const [sharing, setSharing] = useState(false);

  useEffect(() => {
    if (!supabase) return;
    let cancelled = false;
    setLoading(true);
    setError(null);
    leaderboard(period, today, lang, level)
      .then((data) => { if (!cancelled) setRows(data); })
      .catch((e: unknown) => { if (!cancelled) setError(friendlyError(e)); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [period, today, lang, level]);

  if (!supabase) {
    return <p className="match-hint">Rankings are not set up yet.</p>;
  }

  const periodLabel = periods.find((p) => p.value === period)?.label ?? '';
  const podium = rows.slice(0, 3);
  const rest = rows.slice(3);

  const share = async () => {
    // One share at a time: a second tap while the share sheet is open would fail
    if (sharing) return;
    setSharing(true);
    try {
      const result = await shareRankCard({ title: `${level} · ${periodLabel}`, rows });
      setShareNote(result === 'shared' ? 'Shared!' : 'Image saved. Post it anywhere!');
    } catch (e) {
      setShareNote((e as Error).message);
    } finally {
      setSharing(false);
    }
  };

  return (
    <div className="leaderboard">
      <div className="lb-filters">
        <div className="gloss-toggle leaderboard-tabs" role="group" aria-label="Level">
          {levels.map((l) => (
            <button key={l} className={`gloss-btn${level === l ? ' active' : ''}`} aria-pressed={level === l} onClick={() => setLevel(l)}>
              {l}
            </button>
          ))}
        </div>
        <div className="gloss-toggle leaderboard-tabs" role="group" aria-label="Ranking period">
          {periods.map((p) => (
            <button key={p.value} className={`gloss-btn${period === p.value ? ' active' : ''}`} aria-pressed={period === p.value} onClick={() => setPeriod(p.value)}>
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {loading && <p className="match-hint">Loading…</p>}
      {error && <p className="scene-message bad">{error}</p>}

      {!loading && !error && rows.length === 0 && (
        <div className="lb-empty">No {level} scores {periodLabel.toLowerCase()} yet. Be the first!</div>
      )}

      {podium.length > 0 && (
        <div className="podium">
          {[1, 0, 2].map((idx) => {
            const r = podium[idx];
            if (!r) return <div key={idx} className="podium-slot empty" />;
            return (
              <div key={idx} className={`podium-slot place-${idx + 1}`}>
                <span className="podium-medal">{medals[idx]}</span>
                <span className="podium-name">{r.nickname}</span>
                <span className="podium-score">{r.correct_total} · {r.pct}%</span>
                <div className="podium-block">{idx + 1}</div>
              </div>
            );
          })}
        </div>
      )}

      {rest.length > 0 && (
        <ol className="leaderboard-list" start={4}>
          {rest.map((r, i) => (
            <li key={`${r.nickname}-${i}`} className="leaderboard-row">
              <span className="leaderboard-rank">{i + 4}</span>
              <span className="leaderboard-name">{r.nickname}</span>
              <span className="leaderboard-score">{r.correct_total}/{r.total_questions} · {r.pct}%</span>
            </li>
          ))}
        </ol>
      )}

      {rows.length > 0 && (
        <div className="lb-share">
          <button className="action-btn primary lb-share-btn" disabled={sharing} onClick={() => { void share(); }}>
            📸 Share this ranking
          </button>
          {shareNote && <p className="match-hint">{shareNote}</p>}
        </div>
      )}
    </div>
  );
}
