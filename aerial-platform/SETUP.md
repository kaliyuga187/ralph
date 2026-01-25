# Aerial Estimate Platform - Setup Guide

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Accounts needed (free tiers available):
  - [Supabase](https://supabase.com) - Backend & Database
  - [Mapbox](https://mapbox.com) - Aerial imagery
  - [Stripe](https://stripe.com) - Payment processing
  - [SendGrid](https://sendgrid.com) - Email notifications
  - [PostHog](https://posthog.com) - Analytics (optional)

## 1. Supabase Setup

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Click "New Project"
3. Fill in project details:
   - **Name**: aerial-estimate-platform
   - **Database Password**: (save this securely)
   - **Region**: Choose closest to your users
4. Wait for project to initialize (~2 minutes)
5. Go to **Settings > API**
6. Copy these values to `.env.local`:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 2. Environment Variables

1. Copy the example file:
   ```bash
   cp .env.local.example .env.local
   ```

2. Fill in your actual values in `.env.local`

## 3. Install Dependencies

```bash
npm install
```

## 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 5. Database Migrations

Run the database migrations to create required tables:

1. Go to your [Supabase Dashboard](https://app.supabase.com)
2. Navigate to **SQL Editor** (left sidebar)
3. Click **New Query**
4. Copy the contents of `supabase/migrations/001_create_user_profiles.sql`
5. Paste into the SQL editor and click **Run**

See `supabase/migrations/README.md` for detailed instructions and alternative methods.

## Next Steps

- ✅ US-004: Supabase configured
- ✅ US-005: Database schema created
- ⏸️ US-006: Set up authentication (next)
- See `prd.json` for full implementation roadmap

## Troubleshooting

**"Missing Supabase environment variables"**
- Make sure `.env.local` exists and has valid values
- Restart the dev server after changing environment variables

**Connection errors**
- Verify your Supabase project is active
- Check that the URL and key are copied correctly
- Make sure there are no extra spaces in the values
