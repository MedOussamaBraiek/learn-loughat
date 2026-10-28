import { useMemo, useState, useEffect } from 'react';
import type { Question, Answer, Level, LevelInfo } from '../types';
import { levels, getImprovementTips, getAiAnalysis } from '../data/questions';
import { useLang } from '../i18n/LanguageContext';
import { Icon, type IconName } from './Icon';

interface ResultsProps {
  questions: Question[];
  answers: Answer[];
  level: Level;
  onRestart: () => void;
  onBackToLevels: () => void;
}

function StarRating({ score, total }: { score: number; total: number }) {
  const pct = score / total;
  const stars = pct >= 0.9 ? 3 : pct >= 0.7 ? 2 : pct >= 0.4 ? 1 : 0;
  return (
    <div className="stars-row" aria-label={`${stars} of 3 stars`}>
      {[1, 2, 3].map((s) => (
        <span key={s} className={`star ${s <= stars ? 'filled' : ''}`}>
          <Icon name="star" size={26} />
        </span>
      ))}
    </div>
  );
}

function useResultTexts(score: number, total: number): { title: string; subtitle: string; icon: IconName; tone: string } {
  const { t } = useLang();
  const pct = score / total;
  if (pct >= 0.9) return { title: t('results.title.ausgezeichnet'), subtitle: t('results.subtitle.ausgezeichnet'), icon: 'trophy', tone: 'gold' };
  if (pct >= 0.7) return { title: t('results.title.gutgemacht'), subtitle: t('results.subtitle.gutgemacht'), icon: 'medal', tone: 'silver' };
  if (pct >= 0.4) return { title: t('results.title.nichtschlecht'), subtitle: t('results.subtitle.nichtschlecht'), icon: 'target', tone: 'blue' };
  return { title: t('results.title.weiteruben'), subtitle: t('results.subtitle.weiteruben'), icon: 'bookOpen', tone: 'violet' };
}

export function Results({ questions, answers, level, onRestart, onBackToLevels }: ResultsProps) {
  const { t } = useLang();
  const [showCorrections, setShowCorrections] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const [showAiAnalysis, setShowAiAnalysis] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimateIn(true), 100);
    return () => clearTimeout(t);
  }, []);

  const levelInfo = levels.find((l) => l.label === level) as LevelInfo;

  const { score, categoryStats, wrongAnswers, aiAnalysis } = useMemo(() => {
    let score = 0;
    const categoryStats: Record<string, { correct: number; total: number }> = {};
    const wrongAnswers: { question: Question; answer: Answer }[] = [];

    questions.forEach((q) => {
      const answer = answers.find((a) => a.questionId === q.id);
      if (!answer) return;

      if (!categoryStats[q.category]) {
        categoryStats[q.category] = { correct: 0, total: 0 };
      }
      categoryStats[q.category].total += 1;

      if (answer.isCorrect) {
        score += 1;
        categoryStats[q.category].correct += 1;
      } else {
        wrongAnswers.push({ question: q, answer });
      }
    });

    const aiAnalysis = getAiAnalysis(categoryStats);

    return { score, categoryStats, wrongAnswers, aiAnalysis };
  }, [questions, answers]);

  const tips = useMemo(() => getImprovementTips(categoryStats), [categoryStats]);
  const result = useResultTexts(score, questions.length);
  const passed = score / questions.length >= 0.7;

  return (
    <div className={`results-screen ${animateIn ? 'animate-in' : ''}`}>
      <div className="results-card">
        <div className="result-badge" style={{ background: levelInfo.color }}>
          {level}
        </div>

        <div className={`result-emoji tone-${result.tone}`}>
          <Icon name={result.icon} size={40} />
        </div>
        <h2 className="result-title">{result.title}</h2>
        <StarRating score={score} total={questions.length} />

        <div className="score-circle" style={{ borderColor: levelInfo.color }}>
          <span className="score-number">{score}</span>
          <span className="score-total">/ {questions.length}</span>
        </div>

        <p className="score-pct">{Math.round((score / questions.length) * 100)}{t('results.pct_correct')}</p>

        {passed && <div className="next-level-hint">{t('results.try_next')}</div>}

        <div className="category-breakdown">
          <h3>{t('results.category')}</h3>
          {Object.entries(categoryStats).map(([cat, st]) => (
            <div key={cat} className="category-row">
              <span className="cat-name">{cat}</span>
              <div className="cat-bar-bg">
                <div
                  className="cat-bar-fill"
                  style={{ width: `${(st.correct / st.total) * 100}%`, background: levelInfo.color }}
                />
              </div>
              <span className="cat-score">{st.correct}/{st.total}</span>
            </div>
          ))}
        </div>

        {!showAiAnalysis && (
          <button type="button" className="show-corrections-btn ai-btn" onClick={() => setShowAiAnalysis(true)}>
            <Icon name="sparkles" size={17} />
            AI Analysis
          </button>
        )}

        {showAiAnalysis && (
          <div className="ai-analysis-section">
            <h3>
              <Icon name="sparkles" size={18} />
              AI Analysis
            </h3>
            <div className="ai-analysis-box">
              <p>{aiAnalysis}</p>
            </div>
          </div>
        )}

        {!showCorrections ? (
          <button type="button" className="show-corrections-btn" onClick={() => setShowCorrections(true)}>
            {t('results.review')}
          </button>
        ) : (
          <div className="corrections-section">
            <h3>{t('results.corrections')}</h3>
            {wrongAnswers.length === 0 ? (
              <p className="perfect-msg">{t('results.perfect')}</p>
            ) : (
              wrongAnswers.map(({ question, answer }) => (
                <div key={question.id} className="correction-card">
                  <p className="correction-question">{question.question}</p>
                  <p className="correction-your">{t('results.your_answer')} <span className="wrong-text">{answer.userAnswer}</span></p>
                  <p className="correction-correct">{t('results.correct_answer')} <span className="correct-text">{question.correctAnswer}</span></p>
                  <p className="correction-explain">{question.explanation}</p>
                </div>
              ))
            )}
          </div>
        )}

        <div className="improvement-section">
          <h3>
            <Icon name="lightbulb" size={18} />
            {t('results.improve')}
          </h3>
          <ul className="tips-list">
            {tips.map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>
        </div>

        <div className="results-actions">
          <button type="button" className="action-btn primary" onClick={onRestart}>
            {t('results.try_again')}
          </button>
          <button type="button" className="action-btn secondary" onClick={onBackToLevels}>
            {t('results.choose_level')}
          </button>
        </div>
      </div>
    </div>
  );
}
