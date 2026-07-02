import { useState } from 'react';
import type { Level, Question, Answer, LearnLanguage } from './types';
import { LanguageProvider, useLang } from './i18n/LanguageContext';
import { LevelSelect } from './components/LevelSelect';
import { Quiz } from './components/Quiz';
import { Results } from './components/Results';
import { FlashcardStudy } from './components/FlashcardStudy';
import './App.css';

type Screen = 'levels' | 'study' | 'quiz' | 'results';

const rtlLangs = new Set(['ar']);

function AppContent() {
  const { lang } = useLang();
  const [screen, setScreen] = useState<Screen>('levels');
  const [level, setLevel] = useState<Level>('A1');
  const [learnLang, setLearnLang] = useState<LearnLanguage>('de');
  const [timed, setTimed] = useState(false);
  const [completedQuestions, setCompletedQuestions] = useState<Question[]>([]);
  const [completedAnswers, setCompletedAnswers] = useState<Answer[]>([]);

  const handleLevelSelect = (l: Level) => {
    setLevel(l);
    setScreen('quiz');
  };

  const handleStudy = (l: Level) => {
    setLevel(l);
    setScreen('study');
  };

  const handleStudyDone = () => {
    setScreen('quiz');
  };

  const handleQuizComplete = (answers: Answer[], questions: Question[]) => {
    setCompletedAnswers(answers);
    setCompletedQuestions(questions);
    setScreen('results');
  };

  const handleRestart = () => {
    setScreen('quiz');
  };

  const handleBackToLevels = () => {
    setScreen('levels');
  };

  return (
    <div className="app-container" dir={rtlLangs.has(lang) ? 'rtl' : 'ltr'}>
      {screen === 'levels' && (
        <LevelSelect
          onSelect={handleLevelSelect}
          onStudy={handleStudy}
          learnLang={learnLang}
          onLearnLangChange={setLearnLang}
          timed={timed}
          onTimedChange={setTimed}
        />
      )}
      {screen === 'study' && (
        <FlashcardStudy learnLang={learnLang} level={level} onStartQuiz={handleStudyDone} onBack={handleBackToLevels} />
      )}
      {screen === 'quiz' && (
        <Quiz level={level} learnLang={learnLang} timed={timed} onComplete={handleQuizComplete} onBack={handleBackToLevels} />
      )}
      {screen === 'results' && (
        <Results
          questions={completedQuestions}
          answers={completedAnswers}
          level={level}
          onRestart={handleRestart}
          onBackToLevels={handleBackToLevels}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
