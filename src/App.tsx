import { useEffect, useRef, useState } from 'react';
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
import { LANDING_PATH, PLATFORM_PATH, navigate, usePathname } from './lib/router';
import { LevelSelect } from './components/LevelSelect';
import { Navbar } from './components/Navbar';
import { CoursesPage } from './components/CoursesPage';
import { DerDieDas } from './components/DerDieDas';
import { Hub, type HubAction } from './components/Hub';
import { GamesMenu } from './components/GamesMenu';
import { VerbLab } from './components/VerbLab';
import { DialogChat } from './components/DialogChat';
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
import './design-system.css';

// levels -> hub -> (learn | pictures | games | quiz | test | syllabus | flashcards)
type Screen = 'levels' | 'courses' | 'memory' | 'helper' | 'hub' | 'daily' | 'rankings' | 'admin' | 'topics' | 'topic' | 'dialog' | 'games' | 'match' | 'pictures' | 'curriculum' | 'study' | 'quiz' | 'results' | 'verbs';

const rtlLangs = new Set(['ar']);

function AppContent({ isAdmin, initialScreen = 'levels', onHome }: { isAdmin: boolean; initialScreen?: Screen; onHome: () => void }) {
  const { lang } = useLang();
  const [screen, setScreen] = useState<Screen>(initialScreen);
  const [prevScreen, setPrevScreen] = useState<Screen>('levels');
  const [level, setLevel] = useState<Level>('A1');
  const [learnLang, setLearnLang] = useState<LearnLanguage>('de');
  const [timed, setTimed] = useState(false);
  const [completedQuestions, setCompletedQuestions] = useState<Question[]>([]);
  const [completedAnswers, setCompletedAnswers] = useState<Answer[]>([]);
  const [activeTopicId, setActiveTopicId] = useState('');
  const [activeDialogId, setActiveDialogId] = useState('');
  const [activeIsGrammar, setActiveIsGrammar] = useState(false);
  const [studyCards, setStudyCards] = useState<Flashcard[]>([]);
  const [studyTitle, setStudyTitle] = useState('');
  const [quizUsesTopic, setQuizUsesTopic] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [screen]);

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
      case 'learn':
        goTo('topics');
        break;
      case 'games':
        goTo('games');
        break;
      case 'verbs':
        goTo('verbs');
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

  // The topic screen returns to wherever it was opened from
  const [topicBack, setTopicBack] = useState<Screen>('topics');

  const handleOpenGrammar = (grammarId: string) => {
    setActiveTopicId(grammarId);
    setActiveIsGrammar(true);
    setQuizUsesTopic(true);
    setTopicBack('topics');
    goTo('topic');
  };

  const handlePlayMatch = (topic: TopicUnit) => {
    setActiveTopicId(topic.id);
    setActiveIsGrammar(false);
    goTo('match');
  };

  const handleOpenDialog = (dialogId: string) => {
    setActiveDialogId(dialogId);
    goTo('dialog');
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
    <div className="app-root">
      <Navbar
        onHome={onHome}
        signedIn={!!supabase}
        isAdmin={isAdmin}
        onAdmin={() => goTo('admin')}
      />
      <div className="app-container" dir={rtlLangs.has(lang) ? 'rtl' : 'ltr'}>
      {screen === 'levels' && (
        <LevelSelect
          learnLang={learnLang}
          onLearnLangChange={setLearnLang}
          onCourses={() => goTo('courses')}
          onMemory={() => goTo('memory')}
          onRankings={() => goTo('rankings')}
        />
      )}
      {screen === 'courses' && (
        <CoursesPage onSelect={handleLevelSelect} onBack={() => setScreen('levels')} />
      )}
      {screen === 'hub' && (
        <Hub
          level={level}
          onAction={handleHubAction}
          onBack={() => setScreen('levels')}
        />
      )}
      {screen === 'topics' && (
        <TopicCourse
          level={level}
          learnLang={learnLang}
          onOpenGrammar={handleOpenGrammar}
          onOpenDialog={handleOpenDialog}
          onOpenHelper={() => goTo('helper')}
          onBack={handleBackToHub}
        />
      )}
      {screen === 'helper' && (
        <DerDieDas onBack={() => setScreen('topics')} />
      )}
      {screen === 'memory' && (
        <PictureLearning
          learnLang={learnLang}
          onBack={() => setScreen('levels')}
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
          onBack={() => setScreen(topicBack)}
        />
      )}
      {screen === 'rankings' && (
        <RankingsPage learnLang={learnLang} onBack={() => setScreen('levels')} />
      )}
      {screen === 'dialog' && (
        <DialogChat dialogId={activeDialogId} onBack={() => setScreen('topics')} />
      )}
      {screen === 'admin' && isAdmin && (
        <AdminUsers onBack={() => setScreen('levels')} />
      )}
      {screen === 'daily' && (
        <DailyChallenge
          learnLang={learnLang}
          level={level}
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
      {screen === 'verbs' && (
        <VerbLab onBack={handleBackToHub} />
      )}
      {screen === 'pictures' && (
        <PictureLearning
          learnLang={learnLang}
          onBack={() => setScreen('memory')}
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
    </div>
  );
}

// The landing page lives at /, the learning app at /platform.
function AppGate() {
  const auth = useAuthUser();
  const path = usePathname();
  const [entryScreen, setEntryScreen] = useState<Screen>('levels');
  const isAdmin = isAdminEmail(auth.user?.email);
  const onPlatform = path === PLATFORM_PATH || path.startsWith(`${PLATFORM_PATH}/`);
  const signedInBefore = useRef(false);

  useEffect(() => {
    if (path !== LANDING_PATH && !onPlatform) {
      navigate(LANDING_PATH, { replace: true });
    }
  }, [path, onPlatform]);

  useEffect(() => {
    if (!auth.ready) return;

    if (auth.user) {
      // A fresh sign-in (including the OAuth return) enters the platform once.
      if (!signedInBefore.current) {
        signedInBefore.current = true;
        if (!onPlatform) navigate(PLATFORM_PATH, { replace: true });
      }
      return;
    }

    signedInBefore.current = false;
    if (onPlatform && supabase) navigate(LANDING_PATH, { replace: true });
  }, [auth.ready, auth.user, onPlatform]);

  const enterApp = (screen: Screen = 'levels') => {
    setEntryScreen(screen);
    navigate(PLATFORM_PATH);
  };

  if (!auth.ready) {
    return <SignIn isAdmin={isAdmin} />;
  }

  if (onPlatform && auth.user && auth.blocked) {
    return (
      <div className="app-root">
        <Navbar onHome={() => navigate(LANDING_PATH)} signedIn isAdmin={isAdmin} />
        <div className="app-container">
          <Blocked />
        </div>
      </div>
    );
  }

  if (onPlatform && (auth.user || !supabase)) {
    return (
      <AppContent
        isAdmin={isAdmin}
        initialScreen={entryScreen}
        onHome={() => navigate(LANDING_PATH)}
      />
    );
  }

  return (
    <SignIn
      showApp={!!auth.user}
      onEnterApp={() => enterApp()}
      isAdmin={isAdmin}
      onAdmin={() => enterApp('admin')}
    />
  );
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
