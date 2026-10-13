import type { LearnLanguage } from '../types';
import { learnLangs } from '../data/questions';
import { useTx } from '../i18n/uiText';

// Only German is open for now. Add more codes here when those languages are ready.
const openLangs: LearnLanguage[] = ['de'];

interface LearnLangSelectorProps {
  value: LearnLanguage;
  onChange: (lang: LearnLanguage) => void;
}

export function LearnLangSelector({ value, onChange }: LearnLangSelectorProps) {
  const tx = useTx();
  return (
    <div className="learn-lang-selector">
      <label className="learn-lang-label">{tx('learning.label')}</label>
      <div className="learn-lang-options">
        {learnLangs.filter((l) => openLangs.includes(l.code)).map((l) => (
          <button
            key={l.code}
            className={`learn-lang-btn ${l.code === value ? 'active' : ''}`}
            onClick={() => onChange(l.code)}
          >
            <span className="learn-lang-flag">{l.flag}</span>
            <span className="learn-lang-name">{l.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
