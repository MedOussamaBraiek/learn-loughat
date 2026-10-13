-- Learn Loughat: allow longer names on the rankings (up to 40 characters).
-- Run once in Supabase: SQL Editor > New query > Run.

alter table public.profiles drop constraint if exists profiles_nickname_check;
alter table public.profiles add constraint profiles_nickname_check check (char_length(nickname) between 1 and 40);

-- New sign-ins: keep up to 40 characters of the Google name
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
    left(coalesce(nullif(new.raw_user_meta_data->>'full_name', ''), split_part(new.email, '@', 1), 'Learner'), 40)
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

-- People who already signed in: restore their full name
update public.profiles p
set nickname = left(u.raw_user_meta_data->>'full_name', 40)
from auth.users u
where u.id = p.id
  and nullif(u.raw_user_meta_data->>'full_name', '') is not null;

notify pgrst, 'reload schema';
