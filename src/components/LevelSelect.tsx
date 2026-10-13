import type { LearnLanguage } from '../types';
import { useLang } from '../i18n/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { LearnLangSelector } from './LearnLangSelector';
import { signOut } from '../lib/rankings';
import { supabase } from '../lib/supabase';
import { TopThree } from './TopThree';
import { useTx } from '../i18n/uiText';

interface LevelSelectProps {
  learnLang: LearnLanguage;
  onLearnLangChange: (lang: LearnLanguage) => void;
  onCourses: () => void;
  onMemory: () => void;
  onRankings: () => void;
  onAdmin: () => void;
  isAdmin: boolean;
}

// Home: account bar, top learners, then two big entries: quick memory and courses
export function LevelSelect({ learnLang, onLearnLangChange, onCourses, onMemory, onRankings, onAdmin, isAdmin }: LevelSelectProps) {
  const { t } = useLang();
  const tx = useTx();

  return (
    <div className="level-screen">
      <div className="account-bar">
        {supabase ? (
          <button className="account-btn" onClick={() => { void signOut(); }}>{tx('home.signOut')}</button>
        ) : <span />}
        <div className="account-bar-right">
          {isAdmin && <button className="account-btn admin-entry" onClick={onAdmin}>{tx('home.admin')}</button>}
          <LanguageSwitcher />
        </div>
      </div>

      <div className="level-header">
        <span className="owl-icon">🦉</span>
        <h1 className="app-title">{t('app.title')}</h1>
        <p className="app-subtitle">{t('app.subtitle')}</p>
      </div>
      <div className="home-lang">
        <LearnLangSelector value={learnLang} onChange={onLearnLangChange} />
      </div>

      <TopThree onOpenRankings={onRankings} />

      <div className="home-entries">
        <button className="home-entry memory" onClick={onMemory}>
          <span className="home-entry-icon">⚡</span>
          <span className="home-entry-title">{tx('home.memory')}</span>
          <span className="home-entry-text">{tx('home.memoryText')}</span>
          <span className="home-entry-go">{tx('home.start')}</span>
        </button>
        <button className="home-entry courses" onClick={onCourses}>
          <span className="home-entry-icon">🎓</span>
          <span className="home-entry-title">{tx('home.courses')}</span>
          <span className="home-entry-text">{tx('home.coursesText')}</span>
          <span className="home-entry-go">{tx('home.chooseLevel')}</span>
        </button>
      </div>
    </div>
  );
}
