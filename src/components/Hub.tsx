import type { Level } from '../types';
import { useTx, type UiKey } from '../i18n/uiText';
import { Icon, type IconName } from './Icon';

export type HubAction = 'daily' | 'learn' | 'games' | 'quiz' | 'test' | 'verbs' | 'syllabus' | 'flashcards';

interface HubProps {
  level: Level;
  onAction: (action: HubAction) => void;
  onBack: () => void;
}

const cards: { action: HubAction; icon: IconName; titleKey: UiKey; textKey: UiKey; tone: string }[] = [
  { action: 'daily', icon: 'flame', titleKey: 'hub.daily', textKey: 'hub.dailyText', tone: 'coral' },
  { action: 'learn', icon: 'bookOpen', titleKey: 'hub.learn', textKey: 'hub.learnText', tone: 'blue' },
  { action: 'games', icon: 'gamepad', titleKey: 'hub.games', textKey: 'hub.gamesText', tone: 'green' },
  { action: 'verbs', icon: 'clock', titleKey: 'hub.verbs', textKey: 'hub.verbsText', tone: 'amber' },
  { action: 'quiz', icon: 'listChecks', titleKey: 'hub.quiz', textKey: 'hub.quizText', tone: 'violet' },
  { action: 'test', icon: 'timer', titleKey: 'hub.test', textKey: 'hub.testText', tone: 'coral' },
];

// Step 2: what do you want to do at this level?
export function Hub({ level, onAction, onBack }: HubProps) {
  const tx = useTx();

  return (
    <div className="course-screen">
      <div className="course-header">
        <button type="button" className="back-btn" onClick={onBack} aria-label={tx('common.back')}>
          <Icon name="arrowLeft" size={20} />
        </button>
        <div className="course-header-center">
          <span className="level-badge">{level}</span>
          <h2 className="course-title">{tx('hub.title')}</h2>
        </div>
      </div>

      <div className="hub-grid">
        {cards.map((c) => (
          <button
            key={c.action}
            type="button"
            className={`hub-card tone-${c.tone}`}
            onClick={() => onAction(c.action)}
          >
            <span className="hub-icon">
              <Icon name={c.icon} size={28} />
            </span>
            <span className="hub-title">{tx(c.titleKey)}</span>
            <span className="hub-text">{tx(c.textKey)}</span>
            <span className="hub-go">
              <Icon name="arrowRight" size={17} />
            </span>
          </button>
        ))}
      </div>

      <p className="step-label">{tx('hub.extra')}</p>
      <div className="hub-extras">
        <button type="button" className="action-btn secondary" onClick={() => onAction('syllabus')}>
          <Icon name="scroll" size={18} />
          {tx('hub.syllabus')}
        </button>
        <button type="button" className="action-btn secondary" onClick={() => onAction('flashcards')}>
          <Icon name="image" size={18} />
          {tx('hub.flashcards')}
        </button>
      </div>
    </div>
  );
}
