import { useState, useCallback } from 'react';
import type { Question, Answer, Level, LearnLanguage } from '../types';
import { getRandomQuestions } from '../data/questions';
import { useLang } from '../i18n/LanguageContext';
import { useTTS } from '../hooks/useTTS';
import { useTimer } from '../hooks/useTimer';

interface QuizProps {
  level: Level;
  learnLang: LearnLanguage;
  timed: boolean;
  onComplete: (answers: Answer[], questions: Question[]) => void;
  onBack: () => void;
}

const TIME_PER_QUESTION = 20;

export function Quiz({ level, learnLang, timed, onComplete, onBack }: QuizProps) {
  const { t } = useLang();
  const { speak } = useTTS();
  const [quizQuestions] = useState(() => getRandomQuestions(learnLang, level, 10));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [timedOut, setTimedOut] = useState(false);

  const current = quizQuestions[currentIndex];
  const progress = ((currentIndex + (isAnswered ? 1 : 0)) / quizQuestions.length) * 100;

  const finishQuestion = useCallback((userAnswer: string | null) => {
    const isCorrect = userAnswer === current.correctAnswer;
    const newAnswers = [...answers, { questionId: current.id, userAnswer: userAnswer || '', isCorrect }];
    setAnswers(newAnswers);

    if (currentIndex < quizQuestions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setTimedOut(false);
    } else {
      onComplete(newAnswers, quizQuestions);
    }
  }, [current, currentIndex, answers, quizQuestions, onComplete]);

  const handleTimeUp = useCallback(() => {
    if (isAnswered) return;
    setTimedOut(true);
    setIsAnswered(true);
  }, [isAnswered]);

  const timer = useTimer({
    duration: TIME_PER_QUESTION,
    onTimeUp: handleTimeUp,
    running: timed && !isAnswered,
  });

  const handleSelect = useCallback((answer: string) => {
    if (isAnswered) return;
    setSelectedAnswer(answer);
    setIsAnswered(true);
    setTimedOut(false);
  }, [isAnswered]);

  const handleNext = useCallback(() => {
    finishQuestion(selectedAnswer);
  }, [finishQuestion, selectedAnswer]);

  const handleSpeak = (text: string) => {
    speak(text, learnLang);
  };

  const timerColor = timed
    ? timer.pct > 50 ? 'var(--green)' : timer.pct > 25 ? 'var(--orange)' : 'var(--red)'
    : 'transparent';

  return (
    <div className="quiz-screen" dir="auto">
      <div className="quiz-top-bar">
        <button className="back-btn" onClick={onBack}>{t('quiz.back')}</button>
        <div className="progress-bar-bg">
          <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
        </div>
        <span className="question-counter">{currentIndex + 1}/{quizQuestions.length}</span>
      </div>

      {timed && (
        <div className="timer-bar-bg">
          <div className="timer-bar-fill" style={{ width: `${timer.pct}%`, background: timerColor }} />
          <span className="timer-text" style={{ color: timerColor }}>{timer.remaining}s</span>
        </div>
      )}

      <div className="quiz-card" key={current.id}>
        {timedOut && (
          <div className="timeout-banner">⏰ Time's up!</div>
        )}
        <div className="question-category">{current.category}</div>
        <div className="question-row">
          <p className="question-text">{current.question}</p>
          <button className="speak-btn-small" onClick={() => handleSpeak(current.question)} title="Listen">🔊</button>
        </div>

        <div className="options-grid">
          {current.options?.map((opt) => {
            let btnClass = 'option-btn';
            if (isAnswered) {
              if (opt === current.correctAnswer) btnClass += ' correct';
              else if (opt === selectedAnswer) btnClass += ' wrong';
              else btnClass += ' dimmed';
            }
            if (timedOut && opt === current.correctAnswer) btnClass += ' correct';
            return (
              <button
                key={opt}
                className={btnClass}
                onClick={() => handleSelect(opt)}
                disabled={isAnswered}
              >
                <span className="option-text">{opt}</span>
                <span className="option-speak" onClick={(e) => { e.stopPropagation(); handleSpeak(opt); }} title="Listen">🔊</span>
                {isAnswered && opt === current.correctAnswer && <span className="check-mark">✓</span>}
                {isAnswered && opt === selectedAnswer && opt !== current.correctAnswer && <span className="x-mark">✗</span>}
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <div className={`explanation-box ${selectedAnswer === current.correctAnswer ? 'correct-box' : 'wrong-box'}`}>
            <strong>{timedOut ? '⏰ Time\'s up!' : selectedAnswer === current.correctAnswer ? t('quiz.correct') : t('quiz.oops')}</strong>
            <p>{current.explanation}</p>
          </div>
        )}
      </div>

      <div className="quiz-bottom-bar">
        <button
          className={`next-btn ${isAnswered ? 'active' : ''}`}
          onClick={handleNext}
          disabled={!isAnswered}
        >
          {currentIndex < quizQuestions.length - 1 ? t('quiz.next') : t('quiz.results')}
        </button>
      </div>
    </div>
  );
}
