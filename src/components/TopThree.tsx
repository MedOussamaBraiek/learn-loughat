import { useEffect, useState } from 'react';
import { friendlyError, topOverall, type LeaderRow } from '../lib/rankings';
import { supabase } from '../lib/supabase';
import { useTx } from '../i18n/uiText';
import { Icon } from './Icon';
import { Avatar } from './Avatar';

interface TopThreeProps {
  onOpenRankings: () => void;
}

// Home screen: the top 3 learners overall, no filters
export function TopThree({ onOpenRankings }: TopThreeProps) {
  const tx = useTx();
  const [rows, setRows] = useState<LeaderRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    topOverall(3)
      .then(setRows)
      .catch((e: unknown) => setError(friendlyError(e)))
      .finally(() => setLoading(false));
  }, []);

  if (!supabase) return null;

  return (
    <section className="top-three">
      <div className="top-three-head">
        <div className="top-three-title">
          <span className="top-three-title-icon">
            <Icon name="trophy" size={20} />
          </span>
          <h2>{tx('top.title')}</h2>
        </div>
        <button type="button" className="top-three-link" onClick={onOpenRankings}>
          {tx('top.all')}
          <Icon name="arrowRight" size={16} />
        </button>
      </div>

      {error && <p className="match-hint">{error}</p>}
      {!error && loading && (
        <div className="top-three-list" aria-hidden="true">
          {[0, 1, 2].map((i) => <span key={i} className="sk sk-row" />)}
        </div>
      )}
      {!error && !loading && rows.length === 0 && (
        <div className="lb-empty small">
          <span className="lb-empty-icon"><Icon name="users" size={22} /></span>
          <p>{tx('top.empty')}</p>
        </div>
      )}
      {!error && rows.length > 0 && (
        <ol className="top-three-list">
          {rows.map((r, i) => (
            <li key={`${r.nickname}-${i}`} className={`top-three-row place-${i + 1}`}>
              <span className={`top-three-medal place-${i + 1}`}>
                <Icon name={i === 0 ? 'trophy' : 'medal'} size={16} />
              </span>
              <Avatar name={r.nickname} size={40} />
              <div className="top-three-who">
                <span className="top-three-name">{r.nickname}</span>
                <span className="top-three-sub">{r.correct_total} correct answers</span>
              </div>
              <span className="top-three-pct">{r.pct}%</span>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
