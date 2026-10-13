import { supabase } from './supabase';
import { addDays } from './daily';

export type Period = 'today' | 'week' | 'month';

export interface LeaderRow {
  nickname: string;
  days_played: number;
  correct_total: number;
  total_questions: number;
  pct: number;
}

// Today = that day; week = last 7 days; month = last 30 days (both including today)
export function periodRange(period: Period, today: string): { from: string; to: string } {
  if (period === 'today') return { from: today, to: today };
  if (period === 'week') return { from: addDays(today, -6), to: today };
  return { from: addDays(today, -29), to: today };
}

export async function currentUser() {
  if (!supabase) return null;
  const { data } = await supabase.auth.getSession();
  return data.session?.user ?? null;
}

export async function signInWithGoogle() {
  if (!supabase) return;
  await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: window.location.origin },
  });
}

export async function signOut() {
  await supabase?.auth.signOut();
}

// This person's attempt for a day (the database only returns their own rows)
export async function myAttempt(day: string) {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('daily_attempts')
    .select('correct, total, seconds')
    .eq('day', day)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function submitAttempt(attempt: { day: string; lang: string; correct: number; total: number; seconds: number }) {
  if (!supabase) throw new Error('Online ranking is not set up yet.');
  const user = await currentUser();
  if (!user) throw new Error('Sign in to save your score.');
  const { error } = await supabase.from('daily_attempts').insert({ ...attempt, user_id: user.id });
  if (error) {
    // The unique (user, day) constraint rejects a second attempt on the same day
    if (error.code === '23505') throw new Error('You already played today’s challenge.');
    throw error;
  }
}

export async function leaderboard(period: Period, today: string, lang: string): Promise<LeaderRow[]> {
  if (!supabase) return [];
  const { from, to } = periodRange(period, today);
  const { data, error } = await supabase.rpc('leaderboard', { from_day: from, to_day: to, lang_code: lang });
  if (error) throw error;
  return (data ?? []) as LeaderRow[];
}
