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
}

export interface Flashcard {
  front: string;
  back: string;
  details: string;
  frontLang: string;
}
