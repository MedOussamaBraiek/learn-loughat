-- Learn Loughat: users, daily challenge attempts and rankings.
-- Run this once in Supabase: Dashboard > SQL Editor > New query > Run.

-- Profile = nickname shown on the leaderboard. Created automatically at first sign-in.
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  nickname text not null check (char_length(nickname) between 1 and 20),
  created_at timestamptz not null default now()
);

-- One row per person per day: the daily challenge can only be played once.
create table if not exists public.daily_attempts (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  day date not null,
  lang text not null,
  correct int not null check (correct >= 0),
  total int not null check (total > 0 and correct <= total),
  seconds int not null check (seconds >= 0),
  created_at timestamptz not null default now(),
  unique (user_id, day)
);

alter table public.profiles enable row level security;
alter table public.daily_attempts enable row level security;

drop policy if exists "profiles are readable" on public.profiles;
create policy "profiles are readable" on public.profiles for select using (true);

drop policy if exists "users change own nickname" on public.profiles;
create policy "users change own nickname" on public.profiles for update using (auth.uid() = id);

drop policy if exists "users read own attempts" on public.daily_attempts;
create policy "users read own attempts" on public.daily_attempts for select using (auth.uid() = user_id);

drop policy if exists "users add own attempt" on public.daily_attempts;
create policy "users add own attempt" on public.daily_attempts for insert with check (auth.uid() = user_id);

-- Create a profile for every new sign-in (nickname = Google name, or the part before @)
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, nickname)
  values (
    new.id,
    left(coalesce(nullif(new.raw_user_meta_data->>'full_name', ''), split_part(new.email, '@', 1), 'Learner'), 20)
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Leaderboard for a date range and language. Returns totals only, never other people's attempts.
-- Ranked by correct answers in the period, then by percent correct.
create or replace function public.leaderboard(from_day date, to_day date, lang_code text)
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
  group by p.id, p.nickname
  order by sum(a.correct) desc, round(100.0 * sum(a.correct) / nullif(sum(a.total), 0), 1) desc
  limit 50;
$$;

grant execute on function public.leaderboard(date, date, text) to anon, authenticated;
