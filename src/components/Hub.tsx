import type { Level } from '../types';
import { useTx, type UiKey } from '../i18n/uiText';

export type HubAction = 'daily' | 'learn' | 'games' | 'quiz' | 'test' | 'syllabus' | 'flashcards';

interface HubProps {
  level: Level;
  onAction: (action: HubAction) => void;
  onBack: () => void;
}

const cards: { action: HubAction; icon: string; titleKey: UiKey; textKey: UiKey; color: string; germanOnly?: boolean; adminOnly?: boolean }[] = [
  { action: 'daily', icon: '🔥', titleKey: 'hub.daily', textKey: 'hub.dailyText', color: '#ff4b4b' },
  { action: 'learn', icon: '📖', titleKey: 'hub.learn', textKey: 'hub.learnText', color: '#1cb0f6' },
  { action: 'games', icon: '🎮', titleKey: 'hub.games', textKey: 'hub.gamesText', color: '#58cc02' },
  { action: 'quiz', icon: '📝', titleKey: 'hub.quiz', textKey: 'hub.quizText', color: '#ce82ff' },
  { action: 'test', icon: '⏱️', titleKey: 'hub.test', textKey: 'hub.testText', color: '#ff4b4b' },
];

// Step 2: what do you want to do at this level?
export function Hub({ level, onAction, onBack }: HubProps) {
  const tx = useTx();
  const visible = cards;

  return (
    <div className="course-screen">
      <div className="course-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <div className="course-header-center">
          <span className="level-badge">{level}</span>
          <h2 className="course-title">{tx('hub.title')}</h2>
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
            <span className="hub-title">{tx(c.titleKey)}</span>
            <span className="hub-text">{tx(c.textKey)}</span>
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
