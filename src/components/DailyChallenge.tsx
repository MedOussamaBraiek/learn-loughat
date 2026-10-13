import { useEffect, useMemo, useState } from 'react';
import type { Answer, LearnLanguage, Question } from '../types';
import { dailyQuestions, dayKey } from '../lib/daily';
import { currentUser, myAttempt, signInWithGoogle, signOut, submitAttempt } from '../lib/rankings';
import { supabase } from '../lib/supabase';
import { Quiz } from './Quiz';
import { Leaderboard } from './Leaderboard';

interface DailyChallengeProps {
  learnLang: LearnLanguage;
  onBack: () => void;
}

type Phase = 'loading' | 'signin' | 'ready' | 'locked' | 'playing' | 'saving' | 'done';

interface Result {
  correct: number;
  total: number;
  seconds: number;
  saved: boolean;
  error?: string;
}

// One attempt per day: the score is saved when the 10 questions are finished
const startedKey = (day: string, lang: string) => `daily-started:${day}:${lang}`;

export function DailyChallenge({ learnLang, onBack }: DailyChallengeProps) {
  const today = dayKey();
  const questions: Question[] = useMemo(() => dailyQuestions(today, learnLang), [today, learnLang]);
  const [phase, setPhase] = useState<Phase>('loading');
  const [signedIn, setSignedIn] = useState(false);
  const [startedAt, setStartedAt] = useState(0);
  const [result, setResult] = useState<Result | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      // Without Supabase there is no account and no ranking, so the challenge is only a practice run
      if (!supabase) {
        if (!cancelled) setPhase(localStorage.getItem(startedKey(today, learnLang)) ? 'locked' : 'ready');
        return;
      }
      const user = await currentUser();
      if (cancelled) return;
      if (!user) {
        setPhase('signin');
        return;
      }
      setSignedIn(true);
      const attempt = await myAttempt(today);
      if (cancelled) return;
      if (attempt) {
        setResult({ correct: attempt.correct, total: attempt.total, seconds: attempt.seconds, saved: true });
        setPhase('done');
      } else {
        setPhase(localStorage.getItem(startedKey(today, learnLang)) ? 'locked' : 'ready');
      }
    })();
    return () => { cancelled = true; };
  }, [today, learnLang]);

  const start = () => {
    localStorage.setItem(startedKey(today, learnLang), '1');
    setStartedAt(Date.now());
    setPhase('playing');
  };

  const finish = async (answers: Answer[]) => {
    const correct = answers.filter((a) => a.isCorrect).length;
    const seconds = Math.round((Date.now() - startedAt) / 1000);
    const base = { correct, total: questions.length, seconds };
    setPhase('saving');
    if (!supabase || !signedIn) {
      setResult({ ...base, saved: false });
      setPhase('done');
      return;
    }
    try {
      await submitAttempt({ day: today, lang: learnLang, ...base });
      setResult({ ...base, saved: true });
    } catch (e) {
      setResult({ ...base, saved: false, error: (e as Error).message });
    }
    setPhase('done');
  };

  if (phase === 'playing') {
    return (
      <Quiz
        level="A1"
        learnLang={learnLang}
        timed
        fixedQuestions={questions}
        onComplete={(answers) => { void finish(answers); }}
        onBack={() => setPhase('locked')}
      />
    );
  }

  return (
    <div className="course-screen">
      <div className="course-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <div className="course-header-center">
          <span className="course-unit-icon big">🔥</span>
          <h2 className="course-title">Daily challenge</h2>
        </div>
      </div>

      {phase === 'loading' || phase === 'saving' ? (
        <p className="match-hint">{phase === 'saving' ? 'Saving your score…' : 'Loading…'}</p>
      ) : null}

      {phase === 'signin' && (
        <div className="daily-card">
          <p>Sign in to play today’s challenge and appear on the rankings.</p>
          <button className="action-btn primary" onClick={() => { void signInWithGoogle(); }}>Sign in with Google</button>
        </div>
      )}

      {phase === 'ready' && (
        <div className="daily-card">
          <p><strong>{questions.length} questions</strong>, the same set for everyone today.</p>
          <p className="match-hint">20 seconds per question. One attempt only: once you start, you have to finish it.</p>
          <button className="action-btn primary" onClick={start}>Start today’s challenge</button>
        </div>
      )}

      {phase === 'locked' && (
        <div className="daily-card">
          <p>You already started today’s challenge. You get one attempt per day, so come back tomorrow for a new set.</p>
        </div>
      )}

      {phase === 'done' && result && (
        <>
          <div className="daily-card daily-result">
            <p className="daily-score">{result.correct} / {result.total}</p>
            <p className="match-hint">in {result.seconds} seconds</p>
            {result.saved && <p className="scene-message ok">✅ Saved to the rankings</p>}
            {!result.saved && result.error && <p className="scene-message bad">{result.error}</p>}
            {!result.saved && !result.error && !supabase && (
              <p className="match-hint">Rankings are not set up yet, so this score is not saved.</p>
            )}
          </div>
          <h3 className="step-label">Rankings</h3>
          <Leaderboard today={today} lang={learnLang} />
          {signedIn && (
            <button className="action-btn secondary daily-signout" onClick={() => { void signOut().then(onBack); }}>Sign out</button>
          )}
        </>
      )}
    </div>
  );
}
