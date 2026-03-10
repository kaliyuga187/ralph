# Aerial Estimate Platform - Quick Reference

## Extract the Platform

Extract the complete Aerial Estimate Platform into a standalone project:

```bash
# From the ralph repository root
./bin/extract-aerial-platform.sh

# Extract to a specific location
./bin/extract-aerial-platform.sh /path/to/output
```

## What Gets Extracted

The extraction script creates a complete, standalone project with:

- ✅ **Full Next.js application** (19 pages, 11 components)
- ✅ **Database migrations** (5 SQL files for Supabase)
- ✅ **Documentation** (README, deployment guide, launch checklist)
- ✅ **Configuration files** (TypeScript, Tailwind, Next.js, Vercel)
- ✅ **Git repository** (initialized with initial commit)

## After Extraction

1. Navigate to extracted directory
2. Install dependencies: `npm install`
3. Configure environment: `cp .env.local.example .env.local`
4. Add API keys (Supabase, Mapbox)
5. Apply database migrations in Supabase
6. Run: `npm run dev`

## Full Documentation

See [AERIAL_EXTRACTION.md](../AERIAL_EXTRACTION.md) for complete guide including:
- Detailed setup instructions
- Database migration steps
- Deployment to production
- Customization options
- Troubleshooting

## What is Aerial Estimate Platform?

A production-ready two-sided marketplace that connects homeowners with contractors using aerial imagery. Built autonomously by Ralph in ~60 minutes with 50+ user stories.

### Tech Stack
- Next.js 16 + React 19
- TypeScript
- Tailwind CSS v4
- Supabase (PostgreSQL + Auth)
- Mapbox GL

### Features
- Role-based auth (homeowner/contractor)
- Job posting with aerial imagery
- Geo-matched job browsing
- Bidding system
- Messaging & notifications
- Reviews & ratings
- Contractor leaderboards
- Referral system

## Repository Structure

```
ralph/
├── aerial-platform/              # Source code (gets extracted)
│   ├── app/                     # Next.js pages
│   ├── components/              # React components
│   ├── lib/                     # Utilities
│   ├── supabase/migrations/     # Database schema
│   └── types/                   # TypeScript types
├── bin/
│   ├── extract-aerial-platform.sh   # Extraction script
│   └── AERIAL_README.md            # This file
├── AERIAL_EXTRACTION.md         # Full extraction guide
└── ...
```

## Support

For questions or issues:
- See `AERIAL_EXTRACTION.md` for comprehensive guide
- Check `BUILD_STATUS.md` for feature details
- Review `LAUNCH_GUIDE.md` for deployment steps
