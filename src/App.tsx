import { useState } from 'react';
import type { Level, Question, Answer, LearnLanguage } from './types';
import { LanguageProvider, useLang } from './i18n/LanguageContext';
import { LevelSelect } from './components/LevelSelect';
import { Quiz } from './components/Quiz';
import { Results } from './components/Results';
import { FlashcardStudy } from './components/FlashcardStudy';
import { Curriculum } from './components/Curriculum';
import './App.css';

type Screen = 'levels' | 'curriculum' | 'study' | 'quiz' | 'results';

const rtlLangs = new Set(['ar']);

function AppContent() {
  const { lang } = useLang();
  const [screen, setScreen] = useState<Screen>('levels');
  const [prevScreen, setPrevScreen] = useState<Screen>('levels');
  const [level, setLevel] = useState<Level>('A1');
  const [learnLang, setLearnLang] = useState<LearnLanguage>('de');
  const [timed, setTimed] = useState(false);
  const [completedQuestions, setCompletedQuestions] = useState<Question[]>([]);
  const [completedAnswers, setCompletedAnswers] = useState<Answer[]>([]);

  const goTo = (s: Screen) => {
    setPrevScreen(screen);
    setScreen(s);
  };

  const handleLevelSelect = (l: Level) => {
    setLevel(l);
    goTo('quiz');
  };

  const handleSyllabus = (l: Level) => {
    setLevel(l);
    goTo('curriculum');
  };

  const handleStudy = (l: Level) => {
    setLevel(l);
    goTo('study');
  };

  const handleStudyDone = () => {
    goTo('quiz');
  };

  const handleStudyBack = () => {
    setScreen(prevScreen);
  };

  const handleQuizComplete = (answers: Answer[], questions: Question[]) => {
    setCompletedAnswers(answers);
    setCompletedQuestions(questions);
    goTo('results');
  };

  const handleRestart = () => {
    goTo('quiz');
  };

  const handleBackToLevels = () => {
    setScreen('levels');
  };

  return (
    <div className="app-container" dir={rtlLangs.has(lang) ? 'rtl' : 'ltr'}>
      {screen === 'levels' && (
        <LevelSelect
          onSelect={handleLevelSelect}
          onSyllabus={handleSyllabus}
          onStudy={handleStudy}
          learnLang={learnLang}
          onLearnLangChange={setLearnLang}
          timed={timed}
          onTimedChange={setTimed}
        />
      )}
      {screen === 'curriculum' && (
        <Curriculum
          level={level}
          learnLang={learnLang}
          onBack={handleBackToLevels}
          onStartQuiz={() => goTo('quiz')}
          onStudy={() => goTo('study')}
        />
      )}
      {screen === 'study' && (
        <FlashcardStudy learnLang={learnLang} level={level} onStartQuiz={handleStudyDone} onBack={handleStudyBack} />
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
