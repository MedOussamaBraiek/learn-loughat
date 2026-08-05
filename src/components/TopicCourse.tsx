import type { Level, LearnLanguage } from '../types';
import { grammarUnits, getTopics } from '../data/topics';

interface TopicCourseProps {
  level: Level;
  learnLang: LearnLanguage;
  onOpenTopic: (topicId: string) => void;
  onOpenGrammar: (grammarId: string) => void;
  onBack: () => void;
}

const levelColors: Record<Level, string> = {
  A1: '#58cc02',
  A2: '#1cb0f6',
  B1: '#ff9600',
  B2: '#ce82ff',
};

export function TopicCourse({ level, learnLang, onOpenTopic, onOpenGrammar, onBack }: TopicCourseProps) {
  const topics = getTopics(learnLang, level);

  return (
    <div className="course-screen">
      <div className="course-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <div className="course-header-center">
          <span className="level-badge" style={{ '--level-color': levelColors[level] } as React.CSSProperties}>{level}</span>
          <h2 className="course-title">{level} Course</h2>
        </div>
      </div>

      <section className="course-section">
        <h3 className="course-section-title">📝 Grammar</h3>
        <div className="course-unit-grid">
          {grammarUnits.map((g) => (
            <button key={g.id} className="course-unit grammar-unit" onClick={() => onOpenGrammar(g.id)}>
              <span className="course-unit-icon">{g.icon}</span>
              <span className="course-unit-title">{g.title}</span>
              <span className="course-unit-meta">{g.points.length} key points</span>
            </button>
          ))}
        </div>
      </section>

      <section className="course-section">
        <h3 className="course-section-title">📖 Topics</h3>
        {topics.length === 0 ? (
          <p className="course-empty">Topics for {level} ({learnLang}) are coming soon!</p>
        ) : (
          <div className="course-unit-grid">
            {topics.map((topic) => (
              <button
                key={topic.id}
                className="course-unit"
                style={{ '--topic-color': topic.color } as React.CSSProperties}
                onClick={() => onOpenTopic(topic.id)}
              >
                <span className="course-unit-icon">{topic.icon}</span>
                <span className="course-unit-title">{topic.title}</span>
                <span className="course-unit-meta">{topic.words.length} words</span>
              </button>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
