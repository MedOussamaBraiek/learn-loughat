import { useMemo } from 'react';
import type { Level, LearnLanguage, TopicUnit, GrammarUnit, Flashcard } from '../types';
import { grammarUnits, getTopics } from '../data/topics';
import { useTTS } from '../hooks/useTTS';
import { useGloss } from '../i18n/GlossContext';
import { GlossToggle } from './GlossToggle';
import { Icon } from './Icon';
import { Pictogram } from './Pictogram';

interface TopicDetailProps {
  level: Level;
  learnLang: LearnLanguage;
  topicId: string;
  isGrammar: boolean;
  onStartStudy: (cards: Flashcard[], title: string) => void;
  onStartQuiz: () => void;
  onStartMatch: () => void;
  onBack: () => void;
}

const articleColor: Record<string, string> = {
  der: '#1cb0f6',
  die: '#ff4b4b',
  das: '#58cc02',
};

export function TopicDetail({ level, learnLang, topicId, isGrammar, onStartStudy, onStartQuiz, onStartMatch, onBack }: TopicDetailProps) {
  const { speak } = useTTS();
  const { gloss } = useGloss();

  const topic: TopicUnit | undefined = useMemo(() => getTopics(learnLang, level).find((tp) => tp.id === topicId), [learnLang, level, topicId]);
  const grammar: GrammarUnit | undefined = isGrammar ? grammarUnits.find((g) => g.id === topicId) : undefined;

  const cards: Flashcard[] = useMemo(() => {
    if (grammar) {
      return grammar.examples.map((ex) => ({
        front: ex.de,
        back: ex.en,
        details: grammar.title,
        frontLang: learnLang,
      }));
    }
    if (!topic) return [];
    return topic.words.map((w) => ({
      front: w.article ? `${w.article} ${w.word}` : w.word,
      back: w.translation,
      details: w.article ? `${w.article === 'der' ? 'masculine' : w.article === 'die' ? 'feminine' : 'neuter'}${w.plural ? ' · plural: ' + w.plural : ''}` : w.plural || 'word',
      frontLang: learnLang,
    }));
  }, [topic, grammar, learnLang]);

  if (!topic && !grammar) {
    return (
      <div className="course-screen">
        <div className="course-header">
          <button type="button" className="back-btn" onClick={onBack} aria-label="Back">
            <Icon name="arrowLeft" size={20} />
          </button>
          <h2 className="course-title">Not found</h2>
        </div>
        <button className="action-btn secondary" onClick={onBack}>Back</button>
      </div>
    );
  }

  return (
    <div className="course-screen">
      <div className="course-header">
        <button type="button" className="back-btn" onClick={onBack} aria-label="Back">
          <Icon name="arrowLeft" size={20} />
        </button>
        <div className="course-header-center">
          <span className="course-unit-icon big">
            {isGrammar ? <Pictogram emoji={grammar?.icon ?? ''} size={26} /> : <Pictogram emoji={topic?.icon ?? ''} size={26} />}
          </span>
          <h2 className="course-title">{isGrammar ? grammar?.title : topic?.title}</h2>
        </div>
      </div>

      <GlossToggle />

      <div className="course-actions">
        <button type="button" className="course-action-btn flashcards-btn" onClick={() => onStartStudy(cards, isGrammar ? grammar?.title || '' : topic?.title || '')} disabled={cards.length === 0}>
          <Icon name="bookOpen" size={18} />
          Flashcards
        </button>
        <button type="button" className="course-action-btn quiz-btn" onClick={onStartQuiz}>
          <Icon name="play" size={17} />
          Quiz
        </button>
        {topic && (
          <button type="button" className="course-action-btn match-btn" onClick={onStartMatch} disabled={topic.words.length === 0}>
            <Icon name="gamepad" size={18} />
            Match
          </button>
        )}
      </div>

      {grammar ? (
        <div className="grammar-lesson">
          <div className="grammar-intro">{grammar.intro}</div>
          <ul className="grammar-points">
            {grammar.points.map((p, i) => (
              <li key={i} className="grammar-point">{p}</li>
            ))}
          </ul>
          <h4 className="grammar-examples-title">Examples</h4>
          <div className="grammar-examples">
            {grammar.examples.map((ex, i) => (
              <div key={i} className="grammar-example">
                <button type="button" className="speak-btn-small" onClick={() => speak(ex.de, learnLang)} aria-label={`Listen: ${ex.de}`}>
                  <Icon name="volume" size={16} />
                </button>
                <div>
                  <p className="grammar-example-de">{ex.de}</p>
                  <p className="grammar-example-en">{ex.en}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="topic-words">
          {topic?.words.map((w) => (
            <div key={w.word} className="topic-word-card" style={{ '--word-article-color': articleColor[w.article] || '#999' } as React.CSSProperties}>
              <span className="topic-word-article">{w.article}</span>
              <span className="topic-word-text">{w.word}</span>
              <span className="topic-word-plural">{w.plural}</span>
              <span className="topic-word-translation" dir={gloss === 'ar' && w.ar ? 'rtl' : undefined}>{gloss === 'ar' && w.ar ? w.ar : w.translation}</span>
              <button type="button" className="topic-word-speak" onClick={() => speak(`${w.article} ${w.word}`.trim(), learnLang)} aria-label={`Listen: ${w.word}`}>
                <Icon name="volume" size={17} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
