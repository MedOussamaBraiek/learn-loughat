import { useState, useMemo } from 'react';
import type { LearnLanguage, Level, Flashcard } from '../types';
import { vocab, shuffle, learnLangs } from '../data/vocabulary';
import { useTTS } from '../hooks/useTTS';
import { Icon } from './Icon';

interface FlashcardStudyProps {
  learnLang: LearnLanguage;
  level: Level;
  cards?: Flashcard[];
  title?: string;
  onStartQuiz: () => void;
  onBack: () => void;
}

export function FlashcardStudy({ learnLang, level, cards: customCards, title, onStartQuiz, onBack }: FlashcardStudyProps) {
  const { speak } = useTTS();
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [done, setDone] = useState(false);

  const langInfo = learnLangs.find((l) => l.code === learnLang);

  const cards: Flashcard[] = useMemo(() => {
    if (customCards && customCards.length > 0) return customCards;

    const v = vocab[learnLang];
    if (!v) return [];

    const result: Flashcard[] = [];

    v.nouns.forEach((n) => {
      result.push({
        front: `${n.article ? n.article + ' ' : ''}${n.word}`,
        back: n.translationEn,
        details: n.gender !== '-' ? `${n.gender} · plural: ${n.plural}` : `plural: ${n.plural}`,
        frontLang: learnLang,
      });
    });

    v.verbs.forEach((vb) => {
      const pronouns = Object.keys(vb.conjugations).slice(0, 3);
      const conjStr = pronouns.map((p) => `${p} ${vb.conjugations[p]}`).join(', ');
      result.push({
        front: vb.infinitive,
        back: vb.translationEn,
        details: `${conjStr} …`,
        frontLang: learnLang,
      });
    });

    v.adjectives.forEach((a) => {
      result.push({
        front: a.word,
        back: a.translationEn,
        details: 'adjective',
        frontLang: learnLang,
      });
    });

    return shuffle(result).slice(0, 20);
  }, [customCards, learnLang]);

  const card = cards[current];

  const handleNext = () => {
    if (current < cards.length - 1) {
      setCurrent((i) => i + 1);
      setFlipped(false);
    } else {
      setDone(true);
    }
  };

  const handlePrev = () => {
    if (current > 0) {
      setCurrent((i) => i - 1);
      setFlipped(false);
    }
  };

  const handleSpeak = (text: string) => {
    speak(text, learnLang);
  };

  if (done) {
    return (
      <div className="study-screen">
        <div className="study-done-card">
          <div className="state-icon success">
            <Icon name="sparkles" size={30} />
          </div>
          <h2>Review complete!</h2>
          <p>You reviewed {cards.length} words and phrases.</p>
          <button type="button" className="action-btn primary" onClick={onStartQuiz}>
            Start Quiz
            <Icon name="arrowRight" size={18} />
          </button>
          <button type="button" className="action-btn secondary" onClick={onBack} style={{ marginTop: 12 }}>
            Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="study-screen">
      <div className="study-header">
        <button type="button" className="back-btn" onClick={onBack} aria-label="Back">
          <Icon name="arrowLeft" size={20} />
        </button>
        <span className="study-progress">{current + 1} / {cards.length}</span>
        <div className="progress-bar-bg" style={{ flex: 1, marginLeft: 12 }}>
          <div className="progress-bar-fill" style={{ width: `${((current + 1) / cards.length) * 100}%` }} />
        </div>
      </div>

      <div className="study-lang-badge">
        <Icon name="globe" size={16} />
        {title ? `${title} · ${level}` : `${langInfo?.name} · ${level}`}
      </div>

      <div className="flashcard-container" onClick={() => setFlipped(!flipped)}>
        <div className={`flashcard ${flipped ? 'flipped' : ''}`}>
          <div className="flashcard-front">
            <p className="flashcard-word">{card?.front}</p>
            <p className="flashcard-hint">Tap to flip</p>
          </div>
          <div className="flashcard-back">
            <p className="flashcard-translation">{card?.back}</p>
            <p className="flashcard-details">{card?.details}</p>
            <p className="flashcard-hint">Tap to flip back</p>
          </div>
        </div>
      </div>

      <div className="study-actions">
        <button type="button" className="round-btn" onClick={handlePrev} disabled={current === 0} aria-label="Previous card">
          <Icon name="arrowLeft" size={22} />
        </button>
        <button type="button" className="round-btn speak-btn" onClick={() => card && handleSpeak(card.front)} aria-label="Listen">
          <Icon name="volume" size={22} />
        </button>
        <button type="button" className="round-btn" onClick={handleNext} aria-label={current < cards.length - 1 ? 'Next card' : 'Finish'}>
          <Icon name={current < cards.length - 1 ? 'arrowRight' : 'check'} size={22} />
        </button>
      </div>
    </div>
  );
}
