import type { Level, LearnLanguage, TopicUnit } from '../types';
import { getTopics } from '../data/topics';

interface GamesMenuProps {
  level: Level;
  learnLang: LearnLanguage;
  onPlayMatch: (topic: TopicUnit) => void;
  onBack: () => void;
}

// Word games: pick a topic, then play the matching game on it
export function GamesMenu({ level, learnLang, onPlayMatch, onBack }: GamesMenuProps) {
  const topics = getTopics(learnLang, level);

  return (
    <div className="course-screen">
      <div className="course-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <div className="course-header-center">
          <h2 className="course-title">🎮 Word games</h2>
        </div>
      </div>
      <p className="match-hint">Pick a topic to play the matching game.</p>

      {topics.length === 0 ? (
        <p className="course-empty">No topics for {level} yet.</p>
      ) : (
        <div className="games-list">
          {topics.map((topic) => (
            <button key={topic.id} className="games-row" onClick={() => onPlayMatch(topic)}>
              <span className="course-unit-icon">{topic.icon}</span>
              <span className="games-row-title">{topic.title}</span>
              <span className="games-row-meta">{topic.words.length} words · Match →</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
