import { useEffect, useState } from 'react';
import type { Level } from '../types';
import { friendlyError, leaderboard, type LeaderRow, type Period } from '../lib/rankings';
import { supabase } from '../lib/supabase';
import { Icon } from './Icon';
import { Avatar } from './Avatar';

interface LeaderboardProps {
  today: string;
  lang: string;
  initialLevel?: Level;
}

const periods: { value: Period; label: string }[] = [
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'Week' },
  { value: 'month', label: 'Month' },
];

const levels: Level[] = ['A1', 'A2', 'B1', 'B2'];

function Skeleton() {
  return (
    <div className="lb-skeleton" aria-hidden="true">
      <div className="lb-skeleton-podium">
        <span className="sk sk-podium" />
        <span className="sk sk-podium tall" />
        <span className="sk sk-podium" />
      </div>
      {[0, 1, 2, 3].map((i) => (
        <span key={i} className="sk sk-row" />
      ))}
    </div>
  );
}

// Rankings for one level at a time: a podium for the top 3, then the rest of the list
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
      .catch((e: unknown) => { if (!cancelled) setError(friendlyError(e)); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [period, today, lang, level]);

  if (!supabase) {
    return (
      <div className="lb-empty">
        <span className="lb-empty-icon">
          <Icon name="trophy" size={26} />
        </span>
        <p>Rankings are not set up yet.</p>
      </div>
    );
  }

  const periodLabel = periods.find((p) => p.value === period)?.label ?? '';
  const podium = rows.slice(0, 3);
  const rest = rows.slice(3);
  const podiumOrder: { row: LeaderRow; place: number }[] = [];
  if (podium[1]) podiumOrder.push({ row: podium[1], place: 2 });
  if (podium[0]) podiumOrder.push({ row: podium[0], place: 1 });
  if (podium[2]) podiumOrder.push({ row: podium[2], place: 3 });

  return (
    <div className="lb">
      <div className="lb-toolbar">
        <div className="segmented" role="group" aria-label="Level">
          {levels.map((l) => (
            <button type="button" key={l} className={`segmented-btn${level === l ? ' active' : ''}`} aria-pressed={level === l} onClick={() => setLevel(l)}>
              {l}
            </button>
          ))}
        </div>
        <div className="segmented" role="group" aria-label="Ranking period">
          {periods.map((p) => (
            <button type="button" key={p.value} className={`segmented-btn${period === p.value ? ' active' : ''}`} aria-pressed={period === p.value} onClick={() => setPeriod(p.value)}>
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {loading && <Skeleton />}
      {error && <p className="scene-message bad"><Icon name="alert" size={16} />{error}</p>}

      {!loading && !error && rows.length === 0 && (
        <div className="lb-empty">
          <span className="lb-empty-icon">
            <Icon name="target" size={26} />
          </span>
          <p>No {level} scores {periodLabel.toLowerCase()} yet.</p>
          <span>Play the daily challenge to be the first on the board.</span>
        </div>
      )}

      {!loading && !error && podium.length > 0 && (
        <div className={`lb-podium${podium.length === 1 ? ' single' : ''}`}>
          {podiumOrder.map(({ row, place }) => (
            <div key={place} className={`lb-podium-slot place-${place}`}>
              <div className="lb-podium-person">
                <span className={`lb-medal place-${place}`}>
                  <Icon name={place === 1 ? 'trophy' : 'medal'} size={place === 1 ? 20 : 17} />
                </span>
                <Avatar name={row.nickname} size={place === 1 ? 64 : 52} />
                <span className="lb-podium-name">{row.nickname}</span>
                <span className="lb-podium-pct">{row.pct}%</span>
                <span className="lb-podium-sub">{row.correct_total} correct · {row.days_played} {row.days_played === 1 ? 'day' : 'days'}</span>
              </div>
              <div className="lb-podium-block">{place}</div>
            </div>
          ))}
        </div>
      )}

      {!loading && !error && rest.length > 0 && (
        <ol className="lb-list">
          {rest.map((r, i) => (
            <li key={`${r.nickname}-${i}`} className="lb-row">
              <span className="lb-rank">{i + 4}</span>
              <Avatar name={r.nickname} size={36} />
              <div className="lb-who">
                <span className="lb-name">{r.nickname}</span>
                <div className="lb-meter">
                  <span style={{ width: `${Math.min(100, Math.max(0, r.pct))}%` }} />
                </div>
              </div>
              <div className="lb-score">
                <strong>{r.pct}%</strong>
                <span>{r.correct_total}/{r.total_questions}</span>
              </div>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
