import type { Level, LearnLanguage, TopicUnit } from '../types';
import { getTopics } from '../data/topics';
import { Icon } from './Icon';
import { Pictogram } from './Pictogram';

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
        <button type="button" className="back-btn" onClick={onBack} aria-label="Back">
          <Icon name="arrowLeft" size={20} />
        </button>
        <div className="course-header-center">
          <span className="course-unit-icon big"><Icon name="gamepad" size={26} /></span>
          <h2 className="course-title">Word games</h2>
        </div>
      </div>
      <p className="match-hint">Pick a topic to play the matching game.</p>

      {topics.length === 0 ? (
        <p className="course-empty">No topics for {level} yet.</p>
      ) : (
        <div className="games-list">
          {topics.map((topic) => (
            <button type="button" key={topic.id} className="games-row" onClick={() => onPlayMatch(topic)}>
              <span className="course-unit-icon">
                <Pictogram emoji={topic.icon} size={20} />
              </span>
              <span className="games-row-title">{topic.title}</span>
              <span className="games-row-meta">{topic.words.length} words</span>
              <span className="games-row-go">
                <Icon name="arrowRight" size={17} />
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
