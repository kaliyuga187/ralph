# Aerial Estimate Platform - Extraction Guide

This guide explains how to extract the Aerial Estimate Platform code from the Ralph repository into a standalone project.

## What is Aerial Estimate Platform?

Aerial Estimate Platform is a **production-ready two-sided marketplace** that connects homeowners with local contractors using aerial imagery. It was built as a demonstration of Ralph's capabilities - the entire platform (50+ user stories) was built autonomously in approximately 60 minutes.

### Key Features

- **Complete SaaS Application**: Auth, dashboards, job posting, bidding, messaging, reviews
- **Geo-Matching**: Haversine distance calculations to match contractors with nearby jobs
- **Aerial Imagery**: Mapbox integration for property visualization
- **Mobile Ready**: React Native configuration included
- **Production Ready**: Row Level Security, optimized indexes, deployment configs

### Tech Stack

- Next.js 16 (React 19)
- TypeScript
- Tailwind CSS v4
- Supabase (PostgreSQL + Auth)
- Mapbox GL

## Extraction Methods

There are two ways to extract the Aerial Estimate Platform code:

### Method 1: Automated Extraction Script (Recommended)

Use the provided extraction script to automatically create a standalone project:

```bash
# Extract to default location (./aerial-estimate-platform)
./bin/extract-aerial-platform.sh

# Extract to custom location
./bin/extract-aerial-platform.sh /path/to/output
```

This script will:
1. ✅ Copy all aerial-platform source code
2. ✅ Copy database migrations
3. ✅ Copy documentation (DEPLOYMENT.md, LAUNCH_GUIDE.md, BUILD_STATUS.md)
4. ✅ Create a comprehensive README.md
5. ✅ Initialize a git repository
6. ✅ Update package.json metadata

After extraction, you'll have a complete, standalone project ready to deploy.

### Method 2: Manual Extraction

If you prefer to extract manually:

```bash
# 1. Create output directory
mkdir aerial-estimate-platform
cd aerial-estimate-platform

# 2. Copy the aerial-platform directory
cp -r /path/to/ralph/aerial-platform/* .
cp /path/to/ralph/aerial-platform/.* . 2>/dev/null || true

# 3. Copy documentation
cp /path/to/ralph/DEPLOYMENT.md .
cp /path/to/ralph/LAUNCH_GUIDE.md .
cp /path/to/ralph/BUILD_STATUS.md .

# 4. Initialize git
git init
git add .
git commit -m "Initial commit: Aerial Estimate Platform"
```

## Post-Extraction Setup

After extracting the code, follow these steps to get the platform running:

### 1. Install Dependencies

```bash
cd aerial-estimate-platform
npm install
```

### 2. Database Setup

**Create Supabase Project:**
1. Go to https://supabase.com
2. Create a new project
3. Save your project URL and anon key

**Apply Migrations:**
1. Go to Supabase Dashboard → SQL Editor
2. Run each migration file in order:
   - `supabase/migrations/001_create_user_profiles.sql`
   - `supabase/migrations/002_create_jobs.sql`
   - `supabase/migrations/003_geo_matching_and_bids.sql`
   - `supabase/migrations/004_messaging_notifications_reviews.sql`
   - `supabase/migrations/005_engagement_features.sql`

### 3. Environment Configuration

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add:
- `NEXT_PUBLIC_SUPABASE_URL` - From Supabase project settings
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - From Supabase project settings
- `NEXT_PUBLIC_MAPBOX_TOKEN` - From https://account.mapbox.com/

### 4. Run Development Server

```bash
npm run dev
```

Visit http://localhost:3000

### 5. Deploy to Production

```bash
npm i -g vercel
vercel --prod
```

See `DEPLOYMENT.md` in the extracted directory for full deployment instructions.

## What's Included

The extracted platform includes:

### Application Code
- **19 Pages**: Landing, signup, login, dashboards, job flows, leaderboards
- **11 Components**: Hero, maps, forms, marketing widgets
- **2 Library Files**: Supabase client, auth helpers
- **1 API Route**: Nearby jobs endpoint

### Database
- **5 SQL Migration Files**: Complete schema with RLS
- **9 Tables**: Users, jobs, bids, messages, reviews, referrals, etc.
- **2 Functions**: Haversine distance, nearby jobs query

### Configuration
- **TypeScript**: Full type safety with database types
- **Tailwind**: Custom configuration
- **Next.js**: Production-ready config
- **Vercel**: Deployment configuration

### Documentation
- **README.md**: Quick start guide
- **DEPLOYMENT.md**: Production deployment steps
- **LAUNCH_GUIDE.md**: Complete launch checklist
- **BUILD_STATUS.md**: Feature completeness details

## Use Cases

The extracted platform can be used as:

1. **Production Application**: Deploy as-is for a contractor marketplace
2. **Template/Starter**: Customize for other two-sided marketplaces
3. **Learning Resource**: Study production-ready Next.js + Supabase patterns
4. **Demo Project**: Showcase AI-generated code capabilities

## Customization

After extraction, you can customize:

### Branding
- Edit `app/layout.tsx` for site title and description
- Replace logos and images in `public/` (create this directory)
- Update colors in `tailwind.config.ts`

### Features
- Enable/disable landing page components in `app/page.tsx`
- Modify dashboard layouts in `app/dashboard/`
- Add new user roles or job categories
- Extend database schema with new migrations

### Business Logic
- Adjust bid acceptance logic in `app/jobs/[id]/page.tsx`
- Modify geo-matching radius in `app/api/jobs/nearby/route.ts`
- Change referral bonus amounts in `supabase/migrations/005_engagement_features.sql`

## File Structure After Extraction

```
aerial-estimate-platform/
├── app/                          # Next.js pages
│   ├── page.tsx                 # Landing page
│   ├── signup/page.tsx          # Sign up
│   ├── login/page.tsx           # Login
│   ├── onboarding/              # Role-based onboarding
│   ├── dashboard/               # User dashboards
│   ├── jobs/                    # Job posting & viewing
│   ├── leaderboard/page.tsx     # Contractor rankings
│   └── api/jobs/nearby/         # Geo-matching API
├── components/                   # React components
│   ├── Hero.tsx
│   ├── MapboxMap.tsx
│   ├── HowItWorks.tsx
│   └── ...
├── lib/                         # Utilities
│   ├── supabase.ts
│   └── auth.ts
├── supabase/migrations/         # Database schema
│   ├── 001_create_user_profiles.sql
│   ├── 002_create_jobs.sql
│   ├── 003_geo_matching_and_bids.sql
│   ├── 004_messaging_notifications_reviews.sql
│   └── 005_engagement_features.sql
├── types/
│   └── database.ts              # TypeScript types
├── .env.local.example           # Environment template
├── .gitignore
├── next.config.ts
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── vercel.json
├── README.md                    # Quick start guide
├── DEPLOYMENT.md                # Deployment instructions
├── LAUNCH_GUIDE.md              # Complete launch checklist
└── BUILD_STATUS.md              # Feature details
```

## Troubleshooting

### Migration Errors

If migrations fail:
1. Check that you're running them in order (001, 002, 003, 004, 005)
2. Ensure your Supabase project is on a paid plan if using advanced features
3. Check SQL error messages for specific issues

### Missing Dependencies

If `npm install` fails:
1. Ensure Node.js 18+ is installed
2. Delete `package-lock.json` and try again
3. Try `npm install --legacy-peer-deps`

### Map Not Loading

If Mapbox map doesn't appear:
1. Verify `NEXT_PUBLIC_MAPBOX_TOKEN` in `.env.local`
2. Check browser console for API errors
3. Ensure token has correct scopes in Mapbox dashboard

### Authentication Issues

If login/signup doesn't work:
1. Verify Supabase credentials in `.env.local`
2. Check that migrations created the `profiles` table
3. Verify RLS policies are enabled

## Version Information

- **Platform Version**: 1.0.0
- **Build Date**: January 2026
- **Next.js Version**: 16.1.4
- **React Version**: 19.2.3
- **Supabase JS Version**: 2.91.1

## Contributing to the Template

If you improve the extracted template and want to share:

1. Make improvements in your extracted copy
2. Document changes clearly
3. Consider sharing as a fork or new template repository

## License

The Aerial Estimate Platform code is provided as a template. You're free to:
- ✅ Use it for commercial projects
- ✅ Modify and customize it
- ✅ Remove attribution
- ✅ Redistribute

No warranty is provided. Use at your own risk.

## Support & Resources

- **Ralph Documentation**: See main repository README
- **Next.js Docs**: https://nextjs.org/docs
- **Supabase Docs**: https://supabase.com/docs
- **Mapbox Docs**: https://docs.mapbox.com/

## Credits

This platform was generated by Ralph, an autonomous AI agent system. It demonstrates:
- Production-quality code generation
- Complete feature implementation (50 user stories)
- Best practices for Next.js + Supabase
- ~60 minutes to full MVP

---

**Ready to extract and deploy?** Run `./bin/extract-aerial-platform.sh` to get started!
