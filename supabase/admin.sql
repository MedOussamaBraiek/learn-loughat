-- Learn Loughat: admin tools (block / delete users) and public rankings.
-- Run this once in Supabase: SQL Editor > New query > Run. Run it after schema.sql.

-- Blocked users cannot save daily scores and are hidden from the rankings.
alter table public.profiles add column if not exists blocked boolean not null default false;

-- The one admin account. This check runs in the database, so it cannot be faked from the app.
create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
  select coalesce(auth.jwt() ->> 'email', '') = 'oussemabraiek@gmail.com';
$$;

-- Is the signed-in user blocked?
create or replace function public.am_i_blocked()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce((select p.blocked from public.profiles p where p.id = auth.uid()), false);
$$;

-- Blocked users cannot add new attempts
drop policy if exists "users add own attempt" on public.daily_attempts;
create policy "users add own attempt" on public.daily_attempts for insert
  with check (auth.uid() = user_id and not public.am_i_blocked());

-- Rankings: same as before, but blocked users are left out
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
    and not p.blocked
  group by p.id, p.nickname
  order by sum(a.correct) desc, round(100.0 * sum(a.correct) / nullif(sum(a.total), 0), 1) desc
  limit 50;
$$;

-- Admin: list all users with their activity
create or replace function public.admin_list_users()
returns table (
  user_id uuid,
  user_email text,
  user_nickname text,
  is_blocked boolean,
  joined_at timestamptz,
  attempts int,
  last_played date
)
language plpgsql
security definer
set search_path = public, auth
as $$
begin
  if not public.is_admin() then
    raise exception 'Not allowed';
  end if;
  return query
    select
      u.id,
      u.email::text,
      p.nickname,
      coalesce(p.blocked, false),
      u.created_at,
      count(a.id)::int,
      max(a.day)
    from auth.users u
    left join public.profiles p on p.id = u.id
    left join public.daily_attempts a on a.user_id = u.id
    group by u.id, u.email, p.nickname, p.blocked, u.created_at
    order by u.created_at desc;
end;
$$;

-- Admin: block or unblock a user (you cannot block yourself)
create or replace function public.admin_set_blocked(target uuid, value boolean)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_admin() then
    raise exception 'Not allowed';
  end if;
  if target = auth.uid() then
    raise exception 'You cannot block yourself';
  end if;
  update public.profiles set blocked = value where id = target;
end;
$$;

-- Admin: delete a user completely (their profile and scores go with them)
create or replace function public.admin_delete_user(target uuid)
returns void
language plpgsql
security definer
set search_path = public, auth
as $$
begin
  if not public.is_admin() then
    raise exception 'Not allowed';
  end if;
  if target = auth.uid() then
    raise exception 'You cannot delete yourself';
  end if;
  delete from auth.users where id = target;
end;
$$;

-- Only signed-in users may call the admin functions; the checks above keep it to you
revoke execute on function public.admin_list_users() from public, anon;
revoke execute on function public.admin_set_blocked(uuid, boolean) from public, anon;
revoke execute on function public.admin_delete_user(uuid) from public, anon;
revoke execute on function public.am_i_blocked() from public, anon;
grant execute on function public.admin_list_users() to authenticated;
grant execute on function public.admin_set_blocked(uuid, boolean) to authenticated;
grant execute on function public.admin_delete_user(uuid) to authenticated;
grant execute on function public.am_i_blocked() to authenticated;
