import { useState } from 'react';
import type { Level, Question, Answer, LearnLanguage, Flashcard } from './types';
import { LanguageProvider, useLang } from './i18n/LanguageContext';
import { LevelSelect } from './components/LevelSelect';
import { TopicCourse } from './components/TopicCourse';
import { TopicDetail } from './components/TopicDetail';
import { Quiz } from './components/Quiz';
import { Results } from './components/Results';
import { FlashcardStudy } from './components/FlashcardStudy';
import { Curriculum } from './components/Curriculum';
import { getTopics } from './data/topics';
import './App.css';

type Screen = 'levels' | 'topics' | 'topic' | 'curriculum' | 'study' | 'quiz' | 'results';

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
  const [activeTopicId, setActiveTopicId] = useState('');
  const [activeIsGrammar, setActiveIsGrammar] = useState(false);
  const [studyCards, setStudyCards] = useState<Flashcard[]>([]);
  const [studyTitle, setStudyTitle] = useState('');
  const [quizUsesTopic, setQuizUsesTopic] = useState(false);

  const goTo = (s: Screen) => {
    setPrevScreen(screen);
    setScreen(s);
  };

  const handleLevelSelect = (l: Level) => {
    setLevel(l);
    goTo('topics');
  };

  const handleSyllabus = (l: Level) => {
    setLevel(l);
    goTo('curriculum');
  };

  const handleStudy = (l: Level) => {
    setLevel(l);
    setStudyCards([]);
    setStudyTitle('');
    goTo('study');
  };

  const handleOpenTopic = (topicId: string) => {
    setActiveTopicId(topicId);
    setActiveIsGrammar(false);
    setQuizUsesTopic(true);
    goTo('topic');
  };

  const handleOpenGrammar = (grammarId: string) => {
    setActiveTopicId(grammarId);
    setActiveIsGrammar(true);
    setQuizUsesTopic(true);
    goTo('topic');
  };

  const handleStartTopicStudy = (cards: Flashcard[], title: string) => {
    setStudyCards(cards);
    setStudyTitle(title);
    setQuizUsesTopic(true);
    goTo('study');
  };

  const handleStudyDone = () => {
    setQuizUsesTopic(true);
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

  const currentTopic = activeTopicId && !activeIsGrammar
    ? getTopics(learnLang, level).find((tp) => tp.id === activeTopicId)?.words
    : undefined;

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
      {screen === 'topics' && (
        <TopicCourse
          level={level}
          learnLang={learnLang}
          onOpenTopic={handleOpenTopic}
          onOpenGrammar={handleOpenGrammar}
          onBack={handleBackToLevels}
        />
      )}
      {screen === 'topic' && (
        <TopicDetail
          level={level}
          learnLang={learnLang}
          topicId={activeTopicId}
          isGrammar={activeIsGrammar}
          onStartStudy={handleStartTopicStudy}
          onStartQuiz={() => goTo('quiz')}
          onBack={() => setScreen('topics')}
        />
      )}
      {screen === 'curriculum' && (
        <Curriculum
          level={level}
          learnLang={learnLang}
          onBack={handleBackToLevels}
          onStartQuiz={() => { setQuizUsesTopic(false); goTo('quiz'); }}
          onStudy={() => { setStudyCards([]); setStudyTitle(''); goTo('study'); }}
        />
      )}
      {screen === 'study' && (
        <FlashcardStudy
          learnLang={learnLang}
          level={level}
          cards={studyCards}
          title={studyTitle}
          onStartQuiz={handleStudyDone}
          onBack={handleStudyBack}
        />
      )}
      {screen === 'quiz' && (
        <Quiz
          level={level}
          learnLang={learnLang}
          timed={timed}
          topicWords={quizUsesTopic ? currentTopic : undefined}
          onComplete={handleQuizComplete}
          onBack={handleBackToLevels}
        />
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
