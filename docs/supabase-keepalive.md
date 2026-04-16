# Supabase Keepalive

This project includes a small keepalive flow to prevent the Supabase project from becoming idle for too long.

## What it does

The keepalive job writes a heartbeat row into `public.project_keepalive` on a schedule. This creates a lightweight database write that is easy to audit.

## Files

- `scripts/supabase-keepalive.ts`: writes the heartbeat row
- `.github/workflows/supabase-keepalive.yml`: runs the keepalive script every day and also supports manual runs
- `supabase/migrations/20260416000000_add_project_keepalive.sql`: creates the heartbeat table

## Setup

1. Resume the paused Supabase project in the Supabase dashboard.
2. Apply the migration:
   - Via Supabase CLI, or
   - Paste `supabase/migrations/20260416000000_add_project_keepalive.sql` into the Supabase SQL Editor and run it once.
3. Add these GitHub repository secrets:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. Manually run the `Supabase Keepalive` GitHub Actions workflow once to verify it works.

## Local run

```bash
npm run supabase:keepalive
```

The script reads `SUPABASE_URL` first, then falls back to `NEXT_PUBLIC_SUPABASE_URL`. It also requires `SUPABASE_SERVICE_ROLE_KEY`.
