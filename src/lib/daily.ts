import type { Level, LearnLanguage, Question } from '../types';
import { getRandomQuestions } from '../data/questions';

// Today's challenge: 10 questions, a mix of all levels. Everyone gets the same set on the same day.
const LEVEL_MIX: { level: Level; count: number }[] = [
  { level: 'A1', count: 3 },
  { level: 'A2', count: 3 },
  { level: 'B1', count: 2 },
  { level: 'B2', count: 2 },
];

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

export function dailyQuestions(day: string, lang: LearnLanguage): Question[] {
  const original = Math.random;
  let collected: Question[] = [];
  try {
    // The question generators use Math.random, so swap in the seeded one while they run
    for (const { level, count } of LEVEL_MIX) {
      Math.random = seededRandom(seedFrom(`${day}|${lang}|${level}`));
      collected = collected.concat(getRandomQuestions(lang, level, count));
    }
  } finally {
    Math.random = original;
  }

  // Mix the levels together in a fixed order for this day, and give each question a unique id
  const mix = seededRandom(seedFrom(`${day}|${lang}|order`));
  return collected
    .map((q) => ({ q, r: mix() }))
    .sort((a, b) => a.r - b.r)
    .map(({ q }, i) => ({ ...q, id: i + 1 }));
}
