create table if not exists public.student_states (
  device_id uuid primary key,
  state jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.student_states enable row level security;

revoke all on public.student_states from anon, authenticated;
