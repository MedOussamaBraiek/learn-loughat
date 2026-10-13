-- Learn Loughat: top learners overall (all levels, all languages, all time), for the home screen.
-- Run once in Supabase: SQL Editor > New query > Run. Blocked users are left out.

create or replace function public.top_overall(top_n int default 3)
returns table (nickname text, correct_total int, total_questions int, pct numeric)
language sql
stable
security definer
set search_path = public
as $$
  select
    p.nickname,
    sum(a.correct)::int,
    sum(a.total)::int,
    round(100.0 * sum(a.correct) / nullif(sum(a.total), 0), 1)
  from public.daily_attempts a
  join public.profiles p on p.id = a.user_id
  where not p.blocked
  group by p.id, p.nickname
  order by sum(a.correct) desc, round(100.0 * sum(a.correct) / nullif(sum(a.total), 0), 1) desc
  limit top_n;
$$;

grant execute on function public.top_overall(int) to anon, authenticated;

notify pgrst, 'reload schema';
