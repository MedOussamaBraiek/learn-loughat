import type { Level, LearnLanguage, Question } from '../types';
import { getRandomQuestions } from '../data/questions';

// Local calendar day as YYYY-MM-DD
export function dayKey(date: Date = new Date()): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function addDays(key: string, n: number): string {
  const [y, m, d] = key.split('-').map(Number);
  return dayKey(new Date(y, m - 1, d + n));
}

function seedFrom(text: string): number {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

// Small seeded random generator (mulberry32), so the same seed always gives the same sequence
function seededRandom(seed: number): () => number {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Today's challenge for one level: 10 questions, the same set for everyone on that day
export function dailyQuestions(day: string, lang: LearnLanguage, level: Level): Question[] {
  const original = Math.random;
  let questions: Question[];
  try {
    // The question generators use Math.random, so swap in the seeded one while they run
    Math.random = seededRandom(seedFrom(`${day}|${lang}|${level}`));
    questions = getRandomQuestions(lang, level, 10);
  } finally {
    Math.random = original;
  }
  return questions.map((q, i) => ({ ...q, id: i + 1 }));
}
