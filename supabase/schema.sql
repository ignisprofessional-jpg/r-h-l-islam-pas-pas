-- Rûh — schéma Supabase (déjà appliqué au projet via la migration « create_progress_table »).
-- Pour un nouveau projet : SQL Editor > New query > coller > Run.

create table if not exists public.progress (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  data       jsonb       not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

comment on table public.progress is 'Progression d''apprentissage de chaque utilisateur (une ligne par compte).';

-- Sécurité : chaque utilisateur ne voit et ne modifie que sa propre progression.
alter table public.progress enable row level security;

create policy "progress_select_own" on public.progress
  for select to authenticated using ((select auth.uid()) = user_id);
create policy "progress_insert_own" on public.progress
  for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "progress_update_own" on public.progress
  for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "progress_delete_own" on public.progress
  for delete to authenticated using ((select auth.uid()) = user_id);

grant select, insert, update, delete on public.progress to authenticated;
revoke all on public.progress from anon;
