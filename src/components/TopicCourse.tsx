import type { Level, LearnLanguage } from '../types';
import { grammarUnits } from '../data/topics';

interface TopicCourseProps {
  level: Level;
  learnLang: LearnLanguage;
  onOpenGrammar: (grammarId: string) => void;
  onOpenHelper: () => void;
  onBack: () => void;
}

const levelColors: Record<Level, string> = {
  A1: '#58cc02',
  A2: '#1cb0f6',
  B1: '#ff9600',
  B2: '#ce82ff',
};

// Learn: grammar as short rule cards, plus the der / die / das helper.
// Word lists are in Quick memory.
export function TopicCourse({ level, learnLang, onOpenGrammar, onOpenHelper, onBack }: TopicCourseProps) {
  return (
    <div className="course-screen">
      <div className="course-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <div className="course-header-center">
          <span className="level-badge" style={{ '--level-color': levelColors[level] } as React.CSSProperties}>{level}</span>
          <h2 className="course-title">📖 Learn</h2>
        </div>
      </div>

      <button className="helper-entry" onClick={onOpenHelper}>
        <span className="helper-entry-icon">🔍</span>
        <span className="helper-entry-text">
          <strong>der · die · das helper</strong>
          <span>Find the article of any word, and learn the ending rules.</span>
        </span>
        <span>→</span>
      </button>

      <h3 className="memory-section-title">📏 Grammar rules</h3>
      <p className="match-hint">{learnLang === 'de' ? 'Tap a rule to see the explanation and examples.' : 'Grammar rules are available for German.'}</p>
      <div className="rule-cards">
        {grammarUnits.map((g, i) => (
          <button key={g.id} className="rule-card" onClick={() => onOpenGrammar(g.id)}>
            <span className="rule-card-num">{i + 1}</span>
            <span className="rule-card-icon">{g.icon}</span>
            <span className="rule-card-text">
              <strong>{g.title}</strong>
              <span>{g.points.length} rules · {g.examples.length} examples</span>
            </span>
            <span>→</span>
          </button>
        ))}
      </div>
    </div>
  );
}
