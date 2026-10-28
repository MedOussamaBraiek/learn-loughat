import type { LearnLanguage } from '../types';
import { LearnLangSelector } from './LearnLangSelector';
import { TopThree } from './TopThree';
import { useTx } from '../i18n/uiText';
import { Icon } from './Icon';

interface LevelSelectProps {
  learnLang: LearnLanguage;
  onLearnLangChange: (lang: LearnLanguage) => void;
  onCourses: () => void;
  onMemory: () => void;
  onRankings: () => void;
}

// Home: top learners, then two big entries: quick memory and courses
export function LevelSelect({ learnLang, onLearnLangChange, onCourses, onMemory, onRankings }: LevelSelectProps) {
  const tx = useTx();

  return (
    <div className="level-screen">
      <div className="level-header">
        <div className="level-header-badge">
          <Icon name="flag" size={14} />
          Learn German · A1–B2
        </div>
        <span className="level-mark">
          <Icon name="bookOpen" size={34} />
        </span>
        <h1 className="app-title">Learn Loughat</h1>
        <p className="app-subtitle">Your journey to German fluency starts here</p>
      </div>

      <div className="home-lang">
        <LearnLangSelector value={learnLang} onChange={onLearnLangChange} />
      </div>

      <TopThree onOpenRankings={onRankings} />

      <div className="home-entries">
        <button type="button" className="home-entry memory" onClick={onMemory}>
          <span className="home-entry-icon">
            <Icon name="image" size={24} />
          </span>
          <span className="home-entry-title">{tx('home.memory')}</span>
          <span className="home-entry-text">{tx('home.memoryText')}</span>
          <span className="home-entry-go">
            {tx('home.start')}
            <Icon name="arrowRight" size={16} />
          </span>
        </button>
        <button type="button" className="home-entry courses" onClick={onCourses}>
          <span className="home-entry-icon">
            <Icon name="graduation" size={24} />
          </span>
          <span className="home-entry-title">{tx('home.courses')}</span>
          <span className="home-entry-text">{tx('home.coursesText')}</span>
          <span className="home-entry-go">
            {tx('home.chooseLevel')}
            <Icon name="arrowRight" size={16} />
          </span>
        </button>
      </div>
    </div>
  );
}
