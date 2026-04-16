create table if not exists public.project_keepalive (
    id text primary key,
    source text not null,
    last_seen_at timestamp with time zone default timezone('utc'::text, now()) not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    metadata jsonb default '{}'::jsonb not null
);

create or replace function public.handle_project_keepalive_updated_at()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
    new.updated_at = timezone('utc'::text, now());
    return new;
end;
$$;

drop trigger if exists handle_project_keepalive_updated_at on public.project_keepalive;
create trigger handle_project_keepalive_updated_at
    before update on public.project_keepalive
    for each row
    execute function public.handle_project_keepalive_updated_at();

alter table public.project_keepalive enable row level security;

drop policy if exists "Service role can manage keepalive rows" on public.project_keepalive;
create policy "Service role can manage keepalive rows"
    on public.project_keepalive
    for all
    using (auth.role() = 'service_role')
    with check (auth.role() = 'service_role');

grant all on public.project_keepalive to service_role;

comment on table public.project_keepalive is 'External keepalive heartbeats used to prevent Supabase inactivity pauses.';
