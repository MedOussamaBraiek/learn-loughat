import { levels } from '../data/questions';
import type { Level } from '../types';
import { useLang } from '../i18n/LanguageContext';
import { useTx } from '../i18n/uiText';

interface CoursesPageProps {
  onSelect: (level: Level) => void;
  onBack: () => void;
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

// Courses page: pick a level. Inside a level: lessons, daily challenge, quizzes and word games.
export function CoursesPage({ onSelect, onBack }: CoursesPageProps) {
  const { t } = useLang();
  const tx = useTx();

  return (
    <div className="course-screen">
      <div className="course-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <div className="course-header-center">
          <h2 className="course-title">{tx('courses.title')}</h2>
        </div>
      </div>
      <p className="match-hint">{tx('courses.hint')}</p>

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
            <span className="level-arrow">Open →</span>
          </button>
        ))}
      </div>
    </div>
  );
}
