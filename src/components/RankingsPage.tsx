import { dayKey } from '../lib/daily';
import type { LearnLanguage } from '../types';
import { Leaderboard } from './Leaderboard';

interface RankingsPageProps {
  learnLang: LearnLanguage;
  onBack: () => void;
}

// Public rankings for everyone, from the home hub
export function RankingsPage({ learnLang, onBack }: RankingsPageProps) {
  return (
    <div className="course-screen">
      <div className="course-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <div className="course-header-center">
          <span className="course-unit-icon big">🏆</span>
          <h2 className="course-title">Rankings</h2>
        </div>
      </div>
      <p className="match-hint">Daily challenge results from all learners. Blocked accounts are not shown.</p>
      <Leaderboard today={dayKey()} lang={learnLang} />
    </div>
  );
}
