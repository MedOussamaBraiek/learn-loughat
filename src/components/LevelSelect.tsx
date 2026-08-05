import { levels } from '../data/questions';
import type { Level, LearnLanguage } from '../types';
import { useLang } from '../i18n/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { LearnLangSelector } from './LearnLangSelector';

interface LevelSelectProps {
  onSelect: (level: Level) => void;
  onSyllabus: (level: Level) => void;
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

export function LevelSelect({ onSelect, onSyllabus, onStudy, learnLang, onLearnLangChange, timed, onTimedChange }: LevelSelectProps) {
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

      <div className="level-cards">
        {levels.map((level) => (
          <div
            key={level.label}
            className="level-card-wrapper"
          >
            <button
              className="level-card"
              style={{ '--level-color': level.color } as React.CSSProperties}
              onClick={() => onSelect(level.label)}
            >
              <span className="level-badge">{level.label}</span>
              <span className="level-name">{t(levelNameKey[level.label] as any)}</span>
              <span className="level-desc">{t(levelDescKey[level.label] as any)}</span>
              <span className="level-arrow">→ Open Course</span>
            </button>
            <div className="level-card-links">
              <button className="level-link syllabus-link" style={{ '--level-color': level.color } as React.CSSProperties} onClick={() => onSyllabus(level.label)}>📋 Syllabus</button>
              <button className="level-link study-link" style={{ '--level-color': level.color } as React.CSSProperties} onClick={() => onStudy(level.label)}>📚 Study</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
