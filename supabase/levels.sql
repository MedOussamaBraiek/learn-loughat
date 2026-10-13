-- Learn Loughat: one daily challenge and one ranking per LEVEL (A1, A2, B1, B2).
-- Run once in Supabase: SQL Editor > New query > Run. Run it after schema.sql and admin.sql.

-- The blocked flag is created here too, so this file works even before admin.sql has run
alter table public.profiles add column if not exists blocked boolean not null default false;

-- Each attempt now records its level. Existing attempts are counted as A1.
alter table public.daily_attempts add column if not exists level text not null default 'A1';

-- One attempt per person, per day, per language and level (was: per day)
alter table public.daily_attempts drop constraint if exists daily_attempts_user_id_day_key;
alter table public.daily_attempts drop constraint if exists daily_attempts_user_day_lang_level_key;
alter table public.daily_attempts add constraint daily_attempts_user_day_lang_level_key unique (user_id, day, lang, level);

-- Leaderboard now filters by level too
drop function if exists public.leaderboard(date, date, text);

create or replace function public.leaderboard(from_day date, to_day date, lang_code text, level_code text)
returns table (nickname text, days_played int, correct_total int, total_questions int, pct numeric)
language sql
stable
security definer
set search_path = public
as $$
  select
    p.nickname,
    count(*)::int,
    sum(a.correct)::int,
    sum(a.total)::int,
    round(100.0 * sum(a.correct) / nullif(sum(a.total), 0), 1)
  from public.daily_attempts a
  join public.profiles p on p.id = a.user_id
  where a.day between from_day and to_day
    and a.lang = lang_code
    and a.level = level_code
    and not p.blocked
  group by p.id, p.nickname
  order by sum(a.correct) desc, round(100.0 * sum(a.correct) / nullif(sum(a.total), 0), 1) desc
  limit 50;
$$;

grant execute on function public.leaderboard(date, date, text, text) to anon, authenticated;

-- Tell the API to pick up the new function signature
notify pgrst, 'reload schema';
