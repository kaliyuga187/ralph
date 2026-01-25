# Database Migrations

This directory contains SQL migration files for the Aerial Estimate Platform database.

## How to Apply Migrations

### Option 1: Supabase Dashboard (Recommended for beginners)

1. Go to your [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Navigate to **SQL Editor** (left sidebar)
4. Click **New Query**
5. Copy the contents of each migration file (in order) and paste into the editor
6. Click **Run** to execute

### Option 2: Supabase CLI (For advanced users)

1. Install Supabase CLI:
   ```bash
   npm install -g supabase
   ```

2. Link to your project:
   ```bash
   supabase link --project-ref your-project-ref
   ```

3. Run migrations:
   ```bash
   supabase db push
   ```

## Migration Files

- **001_create_user_profiles.sql**: Creates user profile tables with role-based access
  - `profiles` table: Basic user info (client or trade)
  - `trade_profiles` table: Contractor-specific data
  - RLS policies for security
  - Indexes for performance

## Verification

After running migrations, verify tables exist:

1. Go to **Table Editor** in Supabase Dashboard
2. You should see:
   - `profiles`
   - `trade_profiles`

3. Test RLS policies by trying to insert a profile (should only work if authenticated)

## Rollback

If you need to undo a migration:

```sql
DROP TABLE IF EXISTS trade_profiles CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;
DROP TYPE IF EXISTS user_role CASCADE;
```

⚠️ **Warning**: This will delete all data in these tables!

## Next Steps

After applying these migrations:
- Complete US-006 to set up authentication
- Complete US-010 to create job posting tables
- See `prd.json` for full roadmap
