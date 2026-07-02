import { levels } from '../data/questions';
import type { Level, LearnLanguage } from '../types';
import { useLang } from '../i18n/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { LearnLangSelector } from './LearnLangSelector';

interface LevelSelectProps {
  onSelect: (level: Level) => void;
  onStudy: (level: Level) => void;
  learnLang: LearnLanguage;
  onLearnLangChange: (lang: LearnLanguage) => void;
  timed: boolean;
  onTimedChange: (v: boolean) => void;
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

export function LevelSelect({ onSelect, onStudy, learnLang, onLearnLangChange, timed, onTimedChange }: LevelSelectProps) {
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

      <div className="mode-toggles">
        <button
          className={`mode-pill ${!timed ? 'active' : ''}`}
          onClick={() => onTimedChange(false)}
        >
          🏖️ Practice
        </button>
        <button
          className={`mode-pill ${timed ? 'active exam' : ''}`}
          onClick={() => onTimedChange(true)}
        >
          ⏱️ Exam
        </button>
      </div>

      <div className="study-prompt">
        <span className="study-prompt-text">📚 Study before the quiz</span>
        <div className="study-prompt-levels">
          {levels.map((lev) => (
            <button key={lev.label} className="study-pill" style={{ '--level-color': lev.color } as React.CSSProperties} onClick={() => onStudy(lev.label)}>
              {lev.label}
            </button>
          ))}
        </div>
      </div>

      <div className="level-cards" style={{ marginTop: 20 }}>
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
            <span className="level-arrow">→ Start Quiz</span>
          </button>
        ))}
      </div>
    </div>
  );
}
