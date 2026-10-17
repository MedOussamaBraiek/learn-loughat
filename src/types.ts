export type Level = 'A1' | 'A2' | 'B1' | 'B2';
export type QuestionType = 'multiple-choice' | 'fill-blank';
export type Language = 'en' | 'ar' | 'fr' | 'de';
export type LearnLanguage = 'de' | 'fr' | 'es' | 'en' | 'ar';

export interface Question {
  id: number;
  type: QuestionType;
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  category: string;
}

export interface Answer {
  questionId: number;
  userAnswer: string;
  isCorrect: boolean;
}

export interface LevelInfo {
  label: Level;
  name: string;
  description: string;
  color: string;
}

export interface LearnLangInfo {
  code: LearnLanguage;
  name: string;
  flag: string;
}

export interface TopicWord {
  word: string;
  article: string;
  plural: string;
  translation: string;
  ar?: string;
}

export interface TopicUnit {
  id: string;
  title: string;
  icon: string;
  color: string;
  words: TopicWord[];
}

export interface GrammarExample {
  de: string;
  en: string;
}

export interface GrammarUnit {
  id: string;
  title: string;
  icon: string;
  intro: string;
  points: string[];
  examples: GrammarExample[];
  // When set, the unit only shows at these levels (undefined = all levels)
  levels?: Level[];
}

// One important verb with everything you need to use it in the past and the imperative
export interface PastVerb {
  infinitive: string;
  translation: string;
  partizip: string;
  auxiliary: 'haben' | 'sein';
  praeteritum: string;
  imperative: { du: string; ihr: string; sie: string };
  example: { de: string; en: string };
}

// A short, friendly tip shown at the top of a tense section
export interface AdviceCard {
  icon: string;
  title: string;
  text: string;
}

export interface Flashcard {
  front: string;
  back: string;
  details: string;
  frontLang: string;
}
