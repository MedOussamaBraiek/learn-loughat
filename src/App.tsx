import { useState } from 'react';
import type { Level, Question, Answer, LearnLanguage, Flashcard, TopicUnit } from './types';
import { LanguageProvider, useLang } from './i18n/LanguageContext';
import { GlossProvider } from './i18n/GlossContext';
import { DailyChallenge } from './components/DailyChallenge';
import { SignIn } from './components/SignIn';
import { Blocked } from './components/Blocked';
import { RankingsPage } from './components/RankingsPage';
import { AdminUsers } from './components/AdminUsers';
import { isAdminEmail } from './lib/admin';
import { useAuthUser } from './lib/useAuthUser';
import { supabase } from './lib/supabase';
import { LevelSelect } from './components/LevelSelect';
import { Hub, type HubAction } from './components/Hub';
import { GamesMenu } from './components/GamesMenu';
import { TopicCourse } from './components/TopicCourse';
import { TopicDetail } from './components/TopicDetail';
import { Quiz } from './components/Quiz';
import { Results } from './components/Results';
import { FlashcardStudy } from './components/FlashcardStudy';
import { WordMatch } from './components/WordMatch';
import { PictureLearning } from './components/PictureLearning';
import { Curriculum } from './components/Curriculum';
import { getTopics } from './data/topics';
import './App.css';

// levels -> hub -> (learn | pictures | games | quiz | test | syllabus | flashcards)
type Screen = 'levels' | 'hub' | 'daily' | 'rankings' | 'admin' | 'topics' | 'topic' | 'games' | 'match' | 'pictures' | 'curriculum' | 'study' | 'quiz' | 'results';

const rtlLangs = new Set(['ar']);

function AppContent({ isAdmin }: { isAdmin: boolean }) {
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
    goTo('hub');
  };

  const handleHubAction = (action: HubAction) => {
    switch (action) {
      case 'daily':
        goTo('daily');
        break;
      case 'rankings':
        goTo('rankings');
        break;
      case 'admin':
        goTo('admin');
        break;
      case 'learn':
        goTo('topics');
        break;
      case 'pictures':
        goTo('pictures');
        break;
      case 'games':
        goTo('games');
        break;
      case 'quiz':
        setTimed(false);
        setQuizUsesTopic(false);
        goTo('quiz');
        break;
      case 'test':
        setTimed(true);
        setQuizUsesTopic(false);
        goTo('quiz');
        break;
      case 'syllabus':
        goTo('curriculum');
        break;
      case 'flashcards':
        setStudyCards([]);
        setStudyTitle('');
        goTo('study');
        break;
    }
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

  const handlePlayMatch = (topic: TopicUnit) => {
    setActiveTopicId(topic.id);
    setActiveIsGrammar(false);
    goTo('match');
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

  const handleBackToHub = () => {
    setScreen('hub');
  };

  const currentTopicUnit = activeTopicId && !activeIsGrammar
    ? getTopics(learnLang, level).find((tp) => tp.id === activeTopicId)
    : undefined;
  const currentTopic = currentTopicUnit?.words;

  return (
    <div className="app-container" dir={rtlLangs.has(lang) ? 'rtl' : 'ltr'}>
      {screen === 'levels' && (
        <LevelSelect
          onSelect={handleLevelSelect}
          learnLang={learnLang}
          onLearnLangChange={setLearnLang}
        />
      )}
      {screen === 'hub' && (
        <Hub
          level={level}
          learnLang={learnLang}
          isAdmin={isAdmin}
          onAction={handleHubAction}
          onBack={() => setScreen('levels')}
        />
      )}
      {screen === 'topics' && (
        <TopicCourse
          level={level}
          learnLang={learnLang}
          onOpenTopic={handleOpenTopic}
          onOpenGrammar={handleOpenGrammar}
          onBack={handleBackToHub}
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
          onStartMatch={() => goTo('match')}
          onBack={() => setScreen('topics')}
        />
      )}
      {screen === 'rankings' && (
        <RankingsPage learnLang={learnLang} onBack={handleBackToHub} />
      )}
      {screen === 'admin' && isAdmin && (
        <AdminUsers onBack={handleBackToHub} />
      )}
      {screen === 'daily' && (
        <DailyChallenge
          learnLang={learnLang}
          onBack={handleBackToHub}
        />
      )}
      {screen === 'games' && (
        <GamesMenu
          level={level}
          learnLang={learnLang}
          onPlayMatch={handlePlayMatch}
          onBack={handleBackToHub}
        />
      )}
      {screen === 'pictures' && (
        <PictureLearning
          learnLang={learnLang}
          onBack={handleBackToHub}
        />
      )}
      {screen === 'match' && currentTopicUnit && (
        <WordMatch
          topic={currentTopicUnit}
          learnLang={learnLang}
          onBack={() => setScreen(prevScreen)}
        />
      )}
      {screen === 'curriculum' && (
        <Curriculum
          level={level}
          learnLang={learnLang}
          onBack={handleBackToHub}
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
          onBack={handleBackToHub}
        />
      )}
      {screen === 'results' && (
        <Results
          questions={completedQuestions}
          answers={completedAnswers}
          level={level}
          onRestart={handleRestart}
          onBackToLevels={handleBackToHub}
        />
      )}
    </div>
  );
}

// Sign-in comes first: nobody uses the app until they are signed in (when Supabase is configured)
function AppGate() {
  const auth = useAuthUser();
  if (!auth.ready) {
    return <div className="app-container"><p className="match-hint">Loading…</p></div>;
  }
  if (supabase && !auth.user) {
    return <div className="app-container"><SignIn /></div>;
  }
  if (auth.user && auth.blocked) {
    return <div className="app-container"><Blocked /></div>;
  }
  return <AppContent isAdmin={isAdminEmail(auth.user?.email)} />;
}

export default function App() {
  return (
    <LanguageProvider>
      <GlossProvider>
        <AppGate />
      </GlossProvider>
    </LanguageProvider>
  );
}
