import { useState } from 'react';
import type { Question } from '../types';
import { generateVerbQuestions } from '../data/generators';
import type { VerbGameKind } from '../data/verbs';
import { useTx } from '../i18n/uiText';
import { useTTS } from '../hooks/useTTS';

const TOTAL = 10;

interface VerbGameProps {
  kind: VerbGameKind;
  title: string;
  onBack: () => void;
}

// A quick, self-contained multiple-choice game for one verb skill.
export function VerbGame({ kind, title, onBack }: VerbGameProps) {
  const { speak } = useTTS();
  const tx = useTx();
  const [questions, setQuestions] = useState<Question[]>(() => generateVerbQuestions(kind, TOTAL));
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
    setQuestions(generateVerbQuestions(kind, TOTAL));
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
        <button className="back-btn" onClick={onBack}>←</button>
        <p className="match-hint">{tx('verbs.noQuestions')}</p>
      </div>
    );
  }

  if (done) {
    const pct = Math.round((score / questions.length) * 100);
    const emoji = pct >= 90 ? '🏆' : pct >= 70 ? '🎉' : pct >= 50 ? '👍' : '💪';
    const message = pct >= 90 ? tx('verbs.resultGreat') : pct >= 70 ? tx('verbs.resultGood') : pct >= 50 ? tx('verbs.resultOk') : tx('verbs.resultKeep');
    return (
      <div className="game-screen">
        <div className="game-result">
          <div className="game-result-emoji">{emoji}</div>
          <h2 className="game-result-score">{score} / {questions.length}</h2>
          <p className="game-result-msg">{message}</p>
          <p className="game-result-streak">🔥 {tx('verbs.bestStreak')}: {bestStreak}</p>
          <div className="game-result-actions">
            <button className="action-btn" onClick={playAgain}>{tx('verbs.playAgain')}</button>
            <button className="action-btn secondary" onClick={onBack}>{tx('common.back')}</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="game-screen" dir="auto">
      <div className="quiz-top-bar">
        <button className="back-btn" onClick={onBack}>←</button>
        <div className="game-pill game-pill-score">⭐ {score}</div>
        <div className="game-pill game-pill-streak">🔥 {streak}</div>
        <span className="question-counter">{index + 1}/{questions.length}</span>
      </div>

      <p className="game-title">{title}</p>

      <div className="quiz-card" key={current.id}>
        <div className="question-category">{current.category}</div>
        <div className="question-row">
          <p className="question-text">{current.question}</p>
          <button className="speak-btn-small" onClick={() => speak(current.question, 'de')} title={tx('verbs.listen')}>🔊</button>
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
              <button key={opt} className={btnClass} onClick={() => choose(opt)} disabled={answered}>
                <span className="option-text">{opt}</span>
                {answered && opt === current.correctAnswer && <span className="check-mark">✓</span>}
                {answered && opt === selected && opt !== current.correctAnswer && <span className="x-mark">✗</span>}
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
        <button className={`next-btn ${answered ? 'active' : ''}`} onClick={next} disabled={!answered}>
          {index < questions.length - 1 ? tx('verbs.next') : tx('verbs.finish')}
        </button>
      </div>
    </div>
  );
}
