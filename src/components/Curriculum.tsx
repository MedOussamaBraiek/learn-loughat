import type { Level, LearnLanguage } from '../types';
import type { LevelCurriculum } from '../data/curriculum';
import { getCurriculum } from '../data/curriculum';
import { useLang } from '../i18n/LanguageContext';
import { useTTS } from '../hooks/useTTS';
import { Icon } from './Icon';
import { Pictogram } from './Pictogram';

interface CurriculumProps {
  level: Level;
  learnLang: LearnLanguage;
  onBack: () => void;
  onStartQuiz: () => void;
  onStudy: () => void;
}

export function Curriculum({ level, learnLang, onBack, onStartQuiz, onStudy }: CurriculumProps) {
  const { t } = useLang();
  const { speak } = useTTS();
  const data: LevelCurriculum = getCurriculum(learnLang, level);

  return (
    <div className="curriculum-screen">
      <div className="curriculum-header">
        <button type="button" className="back-btn" onClick={onBack} style={{ position: 'absolute', left: 0, alignSelf: 'flex-start' }} aria-label={t('quiz.back')}>
          <Icon name="arrowLeft" size={20} />
        </button>
        <span className="level-badge curriculum-level-badge" style={{ '--level-color': '#58cc02' } as React.CSSProperties}>{level}</span>
        <h2 className="curriculum-title">Syllabus</h2>
      </div>

      <div className="curriculum-overview">
        <p className="curriculum-overview-text">{data.overview}</p>
      </div>

      <div className="curriculum-actions">
        <button type="button" className="curriculum-action-btn study-btn" onClick={onStudy}>
          <Icon name="bookOpen" size={18} />
          Study Flashcards
        </button>
        <button type="button" className="curriculum-action-btn quiz-btn" onClick={onStartQuiz}>
          <Icon name="play" size={17} />
          Start Quiz
        </button>
      </div>

      <div className="curriculum-topics">
        {data.topics.map((topic) => (
          <div key={topic.id} className="curriculum-topic">
            <div className="curriculum-topic-head">
              <span className="curriculum-topic-icon"><Pictogram emoji={topic.icon} size={20} /></span>
              <h3 className="curriculum-topic-title">{topic.title}</h3>
            </div>
            <ul className="curriculum-topic-items">
              {topic.items.map((item, i) => (
                <li key={i} className="curriculum-topic-item">
                  <span className="curriculum-item-bullet" aria-hidden="true"></span>
                  <span>{item}</span>
                  <button
                    type="button"
                    className="curriculum-speak-btn"
                    onClick={() => speak(item.split('(')[0].trim(), learnLang)}
                    aria-label={`Listen: ${item}`}
                  >
                    <Icon name="volume" size={15} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {data.dialog && (
        <div className="curriculum-dialog">
          <h3 className="curriculum-dialog-title">
            <Icon name="message" size={18} />
            Example dialogue
          </h3>
          <div className="curriculum-dialog-box">
            {data.dialog.split('\n').map((line, i) => (
              <p key={i} className="curriculum-dialog-line">
                <button type="button" className="curriculum-speak-btn" onClick={() => speak(line.replace(/^[A-Z]:\s*/, ''), learnLang)} aria-label="Listen">
                  <Icon name="volume" size={15} />
                </button>
                <span>{line}</span>
              </p>
            ))}
          </div>
        </div>
      )}

      <div className="curriculum-bottom" style={{ textAlign: 'center', padding: '16px 0' }}>
        <button type="button" className="curriculum-action-btn quiz-btn" onClick={onStartQuiz} style={{ display: 'inline-flex' }}>
          <Icon name="play" size={17} />
          Start Quiz
        </button>
      </div>
    </div>
  );
}
