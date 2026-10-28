import { useState } from 'react';
import type { Question } from '../types';
import { useTx } from '../i18n/uiText';
import { useTTS } from '../hooks/useTTS';
import { Icon, type IconName } from './Icon';

interface McqGameProps {
  title: string;
  questions: Question[];
  onBack: () => void;
  onReplay: () => Question[];
}

// A quick, self-contained multiple-choice game (shared by the verb and dialogue games).
export function McqGame({ title, questions: initialQuestions, onBack, onReplay }: McqGameProps) {
  const { speak } = useTTS();
  const tx = useTx();
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [done, setDone] = useState(false);

  const current = questions[index];

  const choose = (opt: string) => {
    if (answered || !current) return;
    setSelected(opt);
    setAnswered(true);
    if (opt === current.correctAnswer) {
      const n = streak + 1;
      setScore(score + 1);
      setStreak(n);
      setBestStreak(Math.max(bestStreak, n));
    } else {
      setStreak(0);
    }
  };

  const next = () => {
    if (index < questions.length - 1) {
      setIndex((i) => i + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setDone(true);
    }
  };

  const playAgain = () => {
    setQuestions(onReplay());
    setIndex(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setDone(false);
  };

  if (questions.length === 0) {
    return (
      <div className="game-screen">
        <button type="button" className="back-btn" onClick={onBack} aria-label={tx('common.back')}>
          <Icon name="arrowLeft" size={20} />
        </button>
        <p className="match-hint">{tx('verbs.noQuestions')}</p>
      </div>
    );
  }

  if (done) {
    const pct = Math.round((score / questions.length) * 100);
    const resultIcon: IconName = pct >= 90 ? 'trophy' : pct >= 70 ? 'medal' : pct >= 50 ? 'target' : 'bookOpen';
    const message = pct >= 90 ? tx('verbs.resultGreat') : pct >= 70 ? tx('verbs.resultGood') : pct >= 50 ? tx('verbs.resultOk') : tx('verbs.resultKeep');
    return (
      <div className="game-screen">
        <div className="game-result">
          <div className="state-icon success">
            <Icon name={resultIcon} size={34} />
          </div>
          <h2 className="game-result-score">{score} / {questions.length}</h2>
          <p className="game-result-msg">{message}</p>
          <p className="game-result-streak">
            <Icon name="flame" size={17} />
            {tx('verbs.bestStreak')}: {bestStreak}
          </p>
          <div className="game-result-actions">
            <button type="button" className="action-btn" onClick={playAgain}>{tx('verbs.playAgain')}</button>
            <button type="button" className="action-btn secondary" onClick={onBack}>{tx('common.back')}</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="game-screen" dir="auto">
      <div className="quiz-top-bar">
        <button type="button" className="back-btn" onClick={onBack} aria-label={tx('common.back')}>
          <Icon name="arrowLeft" size={20} />
        </button>
        <div className="game-pill game-pill-score">
          <Icon name="star" size={15} />
          {score}
        </div>
        <div className="game-pill game-pill-streak">
          <Icon name="flame" size={15} />
          {streak}
        </div>
        <span className="question-counter">{index + 1}/{questions.length}</span>
      </div>

      <p className="game-title">{title}</p>

      <div className="quiz-card" key={current.id}>
        <div className="question-category">{current.category}</div>
        <div className="question-row">
          <p className="question-text">{current.question}</p>
          <button type="button" className="speak-btn-small" onClick={() => speak(current.question, 'de')} aria-label={tx('verbs.listen')}>
            <Icon name="volume" size={16} />
          </button>
        </div>

        <div className="options-grid">
          {current.options?.map((opt) => {
            let btnClass = 'option-btn';
            if (answered) {
              if (opt === current.correctAnswer) btnClass += ' correct';
              else if (opt === selected) btnClass += ' wrong';
              else btnClass += ' dimmed';
            }
            return (
              <button type="button" key={opt} className={btnClass} onClick={() => choose(opt)} disabled={answered}>
                <span className="option-text">{opt}</span>
                {answered && opt === current.correctAnswer && <span className="check-mark"><Icon name="check" size={16} /></span>}
                {answered && opt === selected && opt !== current.correctAnswer && <span className="x-mark"><Icon name="x" size={16} /></span>}
              </button>
            );
          })}
        </div>

        {answered && (
          <div className={`explanation-box ${selected === current.correctAnswer ? 'correct-box' : 'wrong-box'}`}>
            <strong>{selected === current.correctAnswer ? tx('verbs.correct') : tx('verbs.oops')}</strong>
            <p>{current.explanation}</p>
          </div>
        )}
      </div>

      <div className="quiz-bottom-bar">
        <button type="button" className={`next-btn ${answered ? 'active' : ''}`} onClick={next} disabled={!answered}>
          {index < questions.length - 1 ? tx('verbs.next') : tx('verbs.finish')}
          <Icon name="arrowRight" size={18} />
        </button>
      </div>
    </div>
  );
}
