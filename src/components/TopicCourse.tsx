import type { Level, LearnLanguage } from '../types';
import { grammarUnits } from '../data/topics';
import { getDialogs } from '../data/dialogs';
import { useTx } from '../i18n/uiText';
import { Icon } from './Icon';
import { Pictogram } from './Pictogram';

interface TopicCourseProps {
  level: Level;
  learnLang: LearnLanguage;
  onOpenGrammar: (grammarId: string) => void;
  onOpenDialog: (dialogId: string) => void;
  onOpenHelper: () => void;
  onBack: () => void;
}

const levelColors: Record<Level, string> = {
  A1: '#58cc02',
  A2: '#1cb0f6',
  B1: '#ff9600',
  B2: '#ce82ff',
};

// Learn: dialogues, grammar as short rule cards, plus the der / die / das helper.
// Word lists are in Quick memory.
export function TopicCourse({ level, learnLang, onOpenGrammar, onOpenDialog, onOpenHelper, onBack }: TopicCourseProps) {
  const tx = useTx();
  const visibleGrammar = grammarUnits.filter((g) => !g.levels || g.levels.includes(level));
  const dialogues = getDialogs(level);
  return (
    <div className="course-screen">
      <div className="course-header">
        <button type="button" className="back-btn" onClick={onBack} aria-label={tx('common.back')}>
          <Icon name="arrowLeft" size={20} />
        </button>
        <div className="course-header-center">
          <span className="level-badge" style={{ '--level-color': levelColors[level] } as React.CSSProperties}>{level}</span>
          <h2 className="course-title">Learn</h2>
        </div>
      </div>

      <button type="button" className="helper-entry" onClick={onOpenHelper}>
        <span className="helper-entry-icon">
          <Icon name="search" size={22} />
        </span>
        <span className="helper-entry-text">
          <strong>der · die · das helper</strong>
          <span>Find the article of any word, and learn the ending rules.</span>
        </span>
        <span className="row-go">
          <Icon name="arrowRight" size={18} />
        </span>
      </button>

      {dialogues.length > 0 && (
        <>
          <h3 className="memory-section-title">
            <Icon name="message" size={18} />
            {tx('dialogues.section')}
          </h3>
          <p className="match-hint">{tx('dialogues.intro')}</p>
          <div className="rule-cards">
            {dialogues.map((d) => (
              <button type="button" key={d.id} className="rule-card" onClick={() => onOpenDialog(d.id)}>
                <span className="rule-card-icon"><Pictogram emoji={d.icon} size={20} /></span>
                <span className="rule-card-text">
                  <strong>{d.title}</strong>
                  <span>{d.lines.length} lines · {d.place}</span>
                </span>
                <span className="row-go">
                  <Icon name="arrowRight" size={17} />
                </span>
              </button>
            ))}
          </div>
        </>
      )}

      <h3 className="memory-section-title">
        <Icon name="ruler" size={18} />
        Grammar rules
      </h3>
      <p className="match-hint">{learnLang === 'de' ? 'Tap a rule to see the explanation and examples.' : 'Grammar rules are available for German.'}</p>
      <div className="rule-cards">
        {visibleGrammar.map((g, i) => (
          <button type="button" key={g.id} className="rule-card" onClick={() => onOpenGrammar(g.id)}>
            <span className="rule-card-num">{i + 1}</span>
            <span className="rule-card-icon"><Pictogram emoji={g.icon} size={20} /></span>
            <span className="rule-card-text">
              <strong>{g.title}</strong>
              <span>{g.points.length} rules · {g.examples.length} examples</span>
            </span>
            <span className="row-go">
              <Icon name="arrowRight" size={17} />
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
