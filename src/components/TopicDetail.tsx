import { useMemo } from 'react';
import type { Level, LearnLanguage, TopicUnit, GrammarUnit, Flashcard } from '../types';
import { grammarUnits, getTopics } from '../data/topics';
import { useTTS } from '../hooks/useTTS';

interface TopicDetailProps {
  level: Level;
  learnLang: LearnLanguage;
  topicId: string;
  isGrammar: boolean;
  onStartStudy: (cards: Flashcard[], title: string) => void;
  onStartQuiz: () => void;
  onBack: () => void;
}

const articleColor: Record<string, string> = {
  der: '#1cb0f6',
  die: '#ff4b4b',
  das: '#58cc02',
};

export function TopicDetail({ level, learnLang, topicId, isGrammar, onStartStudy, onStartQuiz, onBack }: TopicDetailProps) {
  const { speak } = useTTS();

  const topic: TopicUnit | undefined = useMemo(() => getTopics(learnLang, level).find((tp) => tp.id === topicId), [learnLang, level, topicId]);
  const grammar: GrammarUnit | undefined = isGrammar ? grammarUnits.find((g) => g.id === topicId) : undefined;

  const cards: Flashcard[] = useMemo(() => {
    if (grammar) {
      return grammar.examples.map((ex) => ({
        front: ex.de,
        back: ex.en,
        details: `${grammar.icon} ${grammar.title}`,
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
          <button className="back-btn" onClick={onBack}>←</button>
          <h2 className="course-title">Not found</h2>
        </div>
        <button className="action-btn secondary" onClick={onBack}>Back</button>
      </div>
    );
  }

  return (
    <div className="course-screen">
      <div className="course-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <div className="course-header-center">
          <span className="course-unit-icon big">{isGrammar ? grammar?.icon : topic?.icon}</span>
          <h2 className="course-title">{isGrammar ? grammar?.title : topic?.title}</h2>
        </div>
      </div>

      <div className="course-actions">
        <button className="course-action-btn flashcards-btn" onClick={() => onStartStudy(cards, isGrammar ? grammar?.title || '' : topic?.title || '')} disabled={cards.length === 0}>
          📚 Flashcards
        </button>
        <button className="course-action-btn quiz-btn" onClick={onStartQuiz}>
          ▶ Quiz
        </button>
      </div>

      {grammar ? (
        <div className="grammar-lesson">
          <div className="grammar-intro">{grammar.intro}</div>
          <ul className="grammar-points">
            {grammar.points.map((p, i) => (
              <li key={i} className="grammar-point">▸ {p}</li>
            ))}
          </ul>
          <h4 className="grammar-examples-title">Examples</h4>
          <div className="grammar-examples">
            {grammar.examples.map((ex, i) => (
              <div key={i} className="grammar-example">
                <button className="speak-btn-small" onClick={() => speak(ex.de, learnLang)}>🔊</button>
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
              <span className="topic-word-translation">{w.translation}</span>
              <button className="topic-word-speak" onClick={() => speak(`${w.article} ${w.word}`.trim(), learnLang)}>🔊</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
