import type { Level, LearnLanguage } from '../types';

export type HubAction = 'rankings' | 'admin' | 'daily' | 'learn' | 'pictures' | 'games' | 'quiz' | 'test' | 'syllabus' | 'flashcards';

interface HubProps {
  level: Level;
  learnLang: LearnLanguage;
  isAdmin: boolean;
  onAction: (action: HubAction) => void;
  onBack: () => void;
}

const cards: { action: HubAction; icon: string; title: string; text: string; color: string; germanOnly?: boolean; adminOnly?: boolean }[] = [
  { action: 'rankings', icon: '🏆', title: 'Rankings', text: 'See who is top today, this week and this month', color: '#ffc800' },
  { action: 'admin', icon: '🛠️', title: 'Admin', text: 'Users: block or delete', color: '#333', adminOnly: true },
  { action: 'daily', icon: '🔥', title: 'Daily challenge', text: 'New set every day, one try, rankings', color: '#ff4b4b' },
  { action: 'learn', icon: '📖', title: 'Learn', text: 'Lessons, grammar and word lists', color: '#1cb0f6' },
  { action: 'pictures', icon: '🖼️', title: 'Pictures', text: 'Drag the words onto the picture', color: '#ff9600', germanOnly: true },
  { action: 'games', icon: '🎮', title: 'Word games', text: 'Match each word with its meaning', color: '#58cc02' },
  { action: 'quiz', icon: '📝', title: 'Quiz', text: 'Practice at your own pace, no timer', color: '#ce82ff' },
  { action: 'test', icon: '⏱️', title: 'Timed test', text: '20 seconds per question', color: '#ff4b4b' },
];

// Step 2: what do you want to do at this level?
export function Hub({ level, learnLang, isAdmin, onAction, onBack }: HubProps) {
  const visible = cards.filter((c) => (!c.germanOnly || learnLang === 'de') && (!c.adminOnly || isAdmin));

  return (
    <div className="course-screen">
      <div className="course-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <div className="course-header-center">
          <span className="level-badge">{level}</span>
          <h2 className="course-title">What do you want to do?</h2>
        </div>
      </div>

      <div className="hub-grid">
        {visible.map((c) => (
          <button
            key={c.action}
            className="hub-card"
            style={{ '--hub-color': c.color } as React.CSSProperties}
            onClick={() => onAction(c.action)}
          >
            <span className="hub-icon">{c.icon}</span>
            <span className="hub-title">{c.title}</span>
            <span className="hub-text">{c.text}</span>
          </button>
        ))}
      </div>

      <p className="step-label">Extra tools</p>
      <div className="hub-extras">
        <button className="action-btn secondary" onClick={() => onAction('syllabus')}>📋 Syllabus</button>
        <button className="action-btn secondary" onClick={() => onAction('flashcards')}>📚 All flashcards</button>
      </div>
    </div>
  );
}
