import { dayKey } from '../lib/daily';
import type { LearnLanguage } from '../types';
import { Leaderboard } from './Leaderboard';
import { Icon } from './Icon';

interface RankingsPageProps {
  learnLang: LearnLanguage;
  onBack: () => void;
}

// Public rankings for everyone, from the home hub
export function RankingsPage({ learnLang, onBack }: RankingsPageProps) {
  return (
    <div className="course-screen">
      <div className="course-header">
        <button type="button" className="back-btn" onClick={onBack} aria-label="Back">
          <Icon name="arrowLeft" size={20} />
        </button>
        <div className="course-header-center">
          <span className="course-unit-icon big"><Icon name="trophy" size={26} /></span>
          <h2 className="course-title">Rankings</h2>
        </div>
      </div>

      <div className="page-intro">
        <p>Daily challenge results from all learners. Pick a level, then today, this week or this month.</p>
      </div>

      <Leaderboard today={dayKey()} lang={learnLang} />
    </div>
  );
}
