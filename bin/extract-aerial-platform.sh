#!/bin/bash
set -e

# Extract Aerial Estimate Platform Code
# This script extracts the aerial-platform directory into a standalone project

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
AERIAL_PLATFORM_DIR="$REPO_ROOT/aerial-platform"

# Default output directory
OUTPUT_DIR="${1:-./aerial-estimate-platform}"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}================================================${NC}"
echo -e "${BLUE}Aerial Estimate Platform Extraction Tool${NC}"
echo -e "${BLUE}================================================${NC}"
echo ""

# Check if aerial-platform exists
if [ ! -d "$AERIAL_PLATFORM_DIR" ]; then
    echo -e "${YELLOW}Error: aerial-platform directory not found at $AERIAL_PLATFORM_DIR${NC}"
    exit 1
fi

# Create output directory
echo -e "${GREEN}Creating output directory: $OUTPUT_DIR${NC}"
mkdir -p "$OUTPUT_DIR"

# Copy the entire aerial-platform directory
echo -e "${GREEN}Copying aerial-platform files...${NC}"
cp -r "$AERIAL_PLATFORM_DIR"/* "$OUTPUT_DIR/"
cp -r "$AERIAL_PLATFORM_DIR"/.gitignore "$OUTPUT_DIR/" 2>/dev/null || true
cp -r "$AERIAL_PLATFORM_DIR"/.env.local.example "$OUTPUT_DIR/" 2>/dev/null || true

# Copy documentation files
echo -e "${GREEN}Copying documentation...${NC}"
cp "$REPO_ROOT/DEPLOYMENT.md" "$OUTPUT_DIR/" 2>/dev/null || true
cp "$REPO_ROOT/LAUNCH_GUIDE.md" "$OUTPUT_DIR/" 2>/dev/null || true
cp "$REPO_ROOT/BUILD_STATUS.md" "$OUTPUT_DIR/" 2>/dev/null || true

# Create a comprehensive README
echo -e "${GREEN}Creating README.md...${NC}"
cat > "$OUTPUT_DIR/README.md" << 'EOF'
# Aerial Estimate Platform

A production-ready two-sided marketplace connecting homeowners with local contractors using aerial imagery.

## Overview

Aerial Estimate Platform is a complete SaaS application that allows:
- **Homeowners**: Post jobs with aerial property views and receive competitive bids from local contractors
- **Contractors**: Browse geo-matched jobs, submit bids, build reputation, and climb leaderboards

## Features

### Core Features
✅ Role-based authentication (Client vs Contractor)
✅ Onboarding flows for both user types
✅ Job posting wizard with Mapbox aerial imagery
✅ Geo-matched job browsing (Haversine distance)
✅ Bidding system with real-time updates
✅ Bid acceptance and rejection
✅ Messaging system
✅ Notifications system
✅ Review and rating system
✅ Contractor leaderboards
✅ Referral system

### Marketing Features
✅ Conversion-optimized landing page
✅ Exit intent popups
✅ Social proof components
✅ Live activity feed
✅ Featured contractors showcase
✅ Testimonials
✅ Press logos section

### Technical Features
✅ Next.js 16 with App Router
✅ TypeScript
✅ Tailwind CSS
✅ Supabase (Auth + Database)
✅ Mapbox GL for aerial imagery
✅ Row Level Security (RLS)
✅ Optimized indexes
✅ Production-ready deployment configs

## Quick Start

### Prerequisites
- Node.js 18+ installed
- Supabase account (free tier works)
- Mapbox account (free tier works)

### 1. Install Dependencies
```bash
npm install
```

### 2. Database Setup

**Create Supabase Project:**
1. Go to https://supabase.com
2. Click "New Project"
3. Save your project URL and anon key

**Apply Migrations:**
1. Navigate to Supabase Dashboard → SQL Editor
2. Run migrations in order from `supabase/migrations/`:
   - `001_create_user_profiles.sql`
   - `002_create_jobs.sql`
   - `003_geo_matching_and_bids.sql`
   - `004_messaging_notifications_reviews.sql`
   - `005_engagement_features.sql`

### 3. Environment Configuration

Copy the example environment file:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your API keys:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
```

**Get Mapbox Token:**
1. Go to https://account.mapbox.com/
2. Create account or login
3. Access Tokens → Create Token
4. Copy the token

### 4. Run Development Server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

### 5. Test the Platform

1. **Sign up** as a homeowner (Client role)
2. **Post a job** using the job creation wizard
3. **Sign up** as a contractor (Trade role) in a different browser/incognito
4. **Browse jobs** and submit a bid
5. **Accept the bid** as the homeowner
6. **Leave a review** after job completion

## File Structure

```
aerial-estimate-platform/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Landing page
│   ├── signup/            # Sign up flow
│   ├── login/             # Login flow
│   ├── onboarding/        # Role-based onboarding
│   ├── dashboard/         # Client & contractor dashboards
│   ├── jobs/              # Job posting and viewing
│   ├── leaderboard/       # Contractor leaderboard
│   └── api/               # API routes
├── components/            # React components
│   ├── Hero.tsx          # Landing page hero
│   ├── MapboxMap.tsx     # Aerial imagery map
│   ├── HowItWorks.tsx    # Feature showcase
│   └── ...               # Marketing components
├── lib/                   # Utilities
│   ├── supabase.ts       # Supabase client
│   └── auth.ts           # Auth helpers
├── supabase/
│   └── migrations/        # Database migrations
├── types/
│   └── database.ts       # TypeScript types
└── ...config files
```

## Deployment

### Deploy to Vercel (Recommended)

```bash
npm i -g vercel
vercel --prod
```

Configure environment variables in Vercel Dashboard:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_MAPBOX_TOKEN`

See `DEPLOYMENT.md` for detailed deployment instructions.

### Custom Domain

1. Add domain in Vercel Dashboard
2. Configure DNS records
3. Update `NEXT_PUBLIC_APP_URL` in environment variables

## Database Schema

The platform uses 9 tables:

1. **profiles** - User profiles with role (client/trade)
2. **trade_profiles** - Contractor-specific data
3. **jobs** - Job postings with geo-coordinates
4. **job_images** - Job images
5. **bids** - Contractor bids on jobs
6. **messages** - Direct messaging
7. **notifications** - System notifications
8. **reviews** - Ratings and reviews
9. **referrals** - Referral tracking

All tables have Row Level Security (RLS) enabled.

## Technology Stack

- **Framework**: Next.js 16 (React 19)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Maps**: Mapbox GL
- **Deployment**: Vercel
- **Type Safety**: Full TypeScript coverage

## Revenue Model

The platform is designed with these monetization strategies:

1. **Transaction Fees**: 10% fee on completed jobs
2. **Premium Subscriptions**: Enhanced contractor profiles
3. **Lead Generation**: Featured placement in search results
4. **Referral Bonuses**: Viral growth incentives

## Security

- ✅ Row Level Security (RLS) on all tables
- ✅ JWT authentication via Supabase
- ✅ HTTPS enforced
- ✅ Input validation
- ✅ Environment variables for secrets
- ✅ SQL injection prevention

## Performance

- ✅ Server-side rendering (SSR)
- ✅ Static site generation (SSG) where applicable
- ✅ Database indexes on frequently queried columns
- ✅ Image optimization
- ✅ Code splitting

## Customization

### Branding
Edit `app/layout.tsx` to change:
- Site title
- Description
- Favicon

### Styling
Edit `tailwind.config.ts` to customize:
- Colors
- Fonts
- Spacing
- Breakpoints

### Features
Enable/disable features in:
- Landing page components in `components/`
- Dashboard views in `app/dashboard/`

## Support

For issues or questions:
- Check `LAUNCH_GUIDE.md` for comprehensive setup instructions
- Check `BUILD_STATUS.md` for feature completeness details
- Review `DEPLOYMENT.md` for deployment best practices

## License

This project was generated as a template/example application. Customize and use as needed for your project.

## Credits

Built with:
- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.com/)
- [Mapbox](https://www.mapbox.com/)
- [Tailwind CSS](https://tailwindcss.com/)

---

**Ready to launch your two-sided marketplace? Follow the Quick Start guide above!**
EOF

# Create a standalone package.json with updated metadata
echo -e "${GREEN}Updating package.json metadata...${NC}"
cat > "$OUTPUT_DIR/package.json.tmp" << 'EOF'
{
  "name": "aerial-estimate-platform",
  "version": "1.0.0",
  "description": "A two-sided marketplace connecting homeowners with local contractors using aerial imagery",
  "main": "index.js",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit"
  },
  "keywords": [
    "marketplace",
    "contractors",
    "aerial-imagery",
    "nextjs",
    "supabase",
    "mapbox"
  ],
  "author": "",
  "license": "MIT",
  "dependencies": {
    "@supabase/supabase-js": "^2.91.1",
    "@tailwindcss/postcss": "^4.1.18",
    "@types/node": "^25.0.10",
    "@types/react": "^19.2.9",
    "@types/react-dom": "^19.2.3",
    "autoprefixer": "^10.4.23",
    "mapbox-gl": "^3.18.1",
    "next": "^16.1.4",
    "postcss": "^8.5.6",
    "react": "^19.2.3",
    "react-dom": "^19.2.3",
    "tailwindcss": "^4.1.18",
    "typescript": "^5.9.3"
  }
}
EOF

# Merge with existing package.json if it exists
if [ -f "$OUTPUT_DIR/package.json" ]; then
    mv "$OUTPUT_DIR/package.json.tmp" "$OUTPUT_DIR/package.json"
fi

# Initialize git repository in output directory
echo -e "${GREEN}Initializing git repository...${NC}"
cd "$OUTPUT_DIR"
if [ ! -d ".git" ]; then
    git init
    
    # Set git config if not already set (for CI/automated environments)
    if ! git config user.email > /dev/null 2>&1; then
        git config user.email "extraction@aerial-estimate.local"
        git config user.name "Aerial Platform Extraction"
    fi
    
    git add .
    git commit -m "Initial commit: Aerial Estimate Platform extraction" || {
        echo -e "${YELLOW}Note: Git commit skipped (configure git user.email and user.name if needed)${NC}"
    }
fi

echo ""
echo -e "${BLUE}================================================${NC}"
echo -e "${GREEN}✅ Extraction Complete!${NC}"
echo -e "${BLUE}================================================${NC}"
echo ""
echo -e "Output directory: ${YELLOW}$OUTPUT_DIR${NC}"
echo ""
echo "Next steps:"
echo "  1. cd $OUTPUT_DIR"
echo "  2. npm install"
echo "  3. Copy .env.local.example to .env.local and add your API keys"
echo "  4. Follow README.md for database setup"
echo "  5. npm run dev"
echo ""
echo -e "${GREEN}Happy building! 🚀${NC}"
