import { levels } from '../data/questions';
import type { Level, LearnLanguage } from '../types';
import { useLang } from '../i18n/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { LearnLangSelector } from './LearnLangSelector';
import { signOut } from '../lib/rankings';
import { supabase } from '../lib/supabase';

interface LevelSelectProps {
  onSelect: (level: Level) => void;
  learnLang: LearnLanguage;
  onLearnLangChange: (lang: LearnLanguage) => void;
}

const levelNameKey: Record<string, string> = {
  A1: 'level.beginner',
  A2: 'level.elementary',
  B1: 'level.intermediate',
  B2: 'level.upper-intermediate',
};

const levelDescKey: Record<string, string> = {
  A1: 'level.desc.a1',
  A2: 'level.desc.a2',
  B1: 'level.desc.b1',
  B2: 'level.desc.b2',
};

// Step 1 of the app: choose a language and a level. Step 2 (Hub) is what to do with it.
export function LevelSelect({ onSelect, learnLang, onLearnLangChange }: LevelSelectProps) {
  const { t } = useLang();

  return (
    <div className="level-screen">
      <LanguageSwitcher />
      <div className="level-header">
        <span className="owl-icon">🦉</span>
        <h1 className="app-title">{t('app.title')}</h1>
        <p className="app-subtitle">{t('app.subtitle')}</p>
      </div>
      <LearnLangSelector value={learnLang} onChange={onLearnLangChange} />
      {supabase && (
        <div className="signout-row">
          <span className="signout-text">You are signed in</span>
          <button className="action-btn secondary signout-btn" onClick={() => { void signOut(); }}>
            🚪 Sign out
          </button>
        </div>
      )}

      <p className="step-label">Step 1 · Choose your level</p>
      <div className="level-cards">
        {levels.map((level) => (
          <button
            key={level.label}
            className="level-card"
            style={{ '--level-color': level.color } as React.CSSProperties}
            onClick={() => onSelect(level.label)}
          >
            <span className="level-badge">{level.label}</span>
            <span className="level-name">{t(levelNameKey[level.label] as any)}</span>
            <span className="level-desc">{t(levelDescKey[level.label] as any)}</span>
            <span className="level-arrow">Choose →</span>
          </button>
        ))}
      </div>
    </div>
  );
}
