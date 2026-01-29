# API Keys for Vercel Deployment - Aerial Estimate

Complete guide to set up all environment variables needed to deploy Aerial Estimate to Vercel.

---

## 🎯 Required API Keys

You need **2 required** and **2 optional** API keys to run Aerial Estimate:

| Service | Required | Free Tier | Purpose |
|---------|----------|-----------|---------|
| **Supabase** | ✅ Yes | ✅ Yes | Database, auth, storage |
| **Mapbox** | ✅ Yes | ✅ Yes | Satellite imagery, maps |
| **Upstash Redis** | ⚠️ Recommended | ✅ Yes | Rate limiting |
| **Sentry** | ⚪ Optional | ✅ Yes | Error monitoring |

---

## 📋 Step-by-Step Setup

### 1. Supabase (Required - 15 minutes)

**What it does:** Database, authentication, real-time messaging, file storage

**Free tier:** 500MB database, 50,000 monthly active users

#### Get Supabase API Keys:

1. **Go to:** https://supabase.com
2. **Sign up** (free, no credit card)
3. Click **"New Project"**
4. Fill in:
   - **Name:** aerial-estimate-prod
   - **Database Password:** [Create strong password - SAVE THIS!]
   - **Region:** [Choose closest to your users]
   - Click **"Create new project"**
5. Wait 2-3 minutes for provisioning
6. Once ready, click **"Project Settings"** (gear icon, bottom left)
7. Click **"API"** in left sidebar
8. Copy these values:

```bash
# You'll need these for Vercel:
Project URL: https://xxxxx.supabase.co
anon public key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### Apply Database Migrations:

1. In Supabase dashboard, click **"SQL Editor"** (left sidebar)
2. Click **"New query"**
3. Copy content from `supabase/migrations/001_create_user_profiles.sql`
4. Paste into SQL editor
5. Click **"Run"** button
6. **Repeat for all 6 migration files in order:**
   - `001_create_user_profiles.sql`
   - `002_create_jobs.sql`
   - `003_geo_matching_and_bids.sql`
   - `004_messaging_notifications_reviews.sql`
   - `005_engagement_features.sql`
   - `006_audit_logging_and_security.sql`

✅ **Supabase setup complete!**

---

### 2. Mapbox (Required - 5 minutes)

**What it does:** Satellite imagery, geocoding, interactive maps

**Free tier:** 50,000 map loads per month (very generous)

#### Get Mapbox API Token:

1. **Go to:** https://www.mapbox.com
2. Click **"Sign up"** or **"Get started"**
3. Create free account (no credit card required for free tier)
4. After signup, you'll see **"Access tokens"** page
5. Copy your **"Default public token"**

```bash
# Starts with pk. (public token)
Default public token: pk.eyJ1IjoieW91cnVzZXJuYW1lIiwiYSI6ImNscmFiY2RlZiJ9...
```

**Note:** The default token has all permissions needed. Don't create a new one.

✅ **Mapbox setup complete!**

---

### 3. Upstash Redis (Recommended - 10 minutes)

**What it does:** Rate limiting to prevent API abuse and brute force attacks

**Free tier:** 10,000 commands/day (plenty for most apps)

**Why recommended:** Without this, rate limiting won't work, making your app vulnerable to abuse.

#### Get Upstash Redis Keys:

1. **Go to:** https://console.upstash.com
2. **Sign up** with GitHub or email (free)
3. Click **"Create Database"**
4. Fill in:
   - **Name:** aerial-estimate-ratelimit
   - **Type:** Global (or Regional if you prefer)
   - **Region:** [Choose closest to your Vercel region]
   - Click **"Create"**
5. Once created, click on the database
6. Copy these credentials:

```bash
# REST API section:
UPSTASH_REDIS_REST_URL: https://eu2-xxxxx.upstash.io
UPSTASH_REDIS_REST_TOKEN: AYepASQgMxZmExxx...
```

**Important:** Use the **REST API** credentials, not the Redis connection string.

✅ **Upstash Redis setup complete!**

---

### 4. Sentry (Optional - 5 minutes)

**What it does:** Error tracking, performance monitoring, alerts

**Free tier:** 5,000 errors/month

**Why optional:** Nice to have for production monitoring, but not required for the app to work.

#### Get Sentry DSN:

1. **Go to:** https://sentry.io
2. **Sign up** (free, no credit card)
3. Click **"Create Project"**
4. Choose:
   - **Platform:** Next.js
   - **Project name:** aerial-estimate
   - Click **"Create Project"**
5. You'll see your **DSN** on the next screen

```bash
# Looks like:
DSN: https://abc123def456@o123456.ingest.sentry.io/7654321
```

✅ **Sentry setup complete!**

---

## 🚀 Add to Vercel

### Option 1: Vercel Dashboard (Easy)

1. **Go to:** https://vercel.com
2. **Import your GitHub repository:**
   - Click **"Add New..."** → **"Project"**
   - Select your GitHub repository
   - Click **"Import"**
3. **Configure Environment Variables:**
   - Scroll to **"Environment Variables"** section
   - Add each variable below:

```bash
# REQUIRED - Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# REQUIRED - Mapbox
NEXT_PUBLIC_MAPBOX_TOKEN=pk.eyJ1IjoieW91cnVzZXJuYW1lIiwiYSI6ImNs...

# RECOMMENDED - Upstash Redis (for rate limiting)
UPSTASH_REDIS_REST_URL=https://eu2-xxxxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=AYepASQgMxZmExxx...

# OPTIONAL - Sentry (for error monitoring)
NEXT_PUBLIC_SENTRY_DSN=https://abc123def456@o123456.ingest.sentry.io/7654321
```

4. Click **"Deploy"**
5. Wait 2-3 minutes for build
6. ✅ **Live at your-project.vercel.app!**

### Option 2: Vercel CLI (Fast)

```bash
cd /home/user/aerial-estimate-standalone

# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy (will prompt for env vars)
vercel --prod

# Or set env vars first:
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
vercel env add NEXT_PUBLIC_MAPBOX_TOKEN production
vercel env add UPSTASH_REDIS_REST_URL production
vercel env add UPSTASH_REDIS_REST_TOKEN production

# Then deploy
vercel --prod
```

---

## 📝 Complete Environment Variables Template

Copy this template to add all at once in Vercel:

```bash
# ============================================
# REQUIRED - Database & Authentication
# ============================================
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4eHh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTAwMDAwMDAsImV4cCI6MTgwMDAwMDAwMH0.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# ============================================
# REQUIRED - Maps & Geocoding
# ============================================
NEXT_PUBLIC_MAPBOX_TOKEN=pk.eyJ1IjoieW91cnVzZXJuYW1lIiwiYSI6ImNscmFiY2RlZiJ9.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# ============================================
# RECOMMENDED - Rate Limiting
# ============================================
UPSTASH_REDIS_REST_URL=https://eu2-xxxxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=AYepASQgMxZmExxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# ============================================
# OPTIONAL - Error Monitoring
# ============================================
NEXT_PUBLIC_SENTRY_DSN=https://abc123def456@o123456.ingest.sentry.io/7654321

# ============================================
# OPTIONAL - Payment Processing (for future)
# ============================================
# STRIPE_SECRET_KEY=sk_live_xxxxx
# NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx

# ============================================
# OPTIONAL - Email (for future)
# ============================================
# SENDGRID_API_KEY=SG.xxxxx
```

---

## ✅ Verification Checklist

After deployment, verify everything works:

### Test Basic Functionality:
- [ ] Visit your Vercel URL
- [ ] Landing page loads
- [ ] Map displays satellite imagery
- [ ] Sign up creates account
- [ ] Login works
- [ ] Can post a job
- [ ] Map location picker works

### Test Security Features:
- [ ] Rate limiting active (try 6 rapid logins - 6th should fail)
- [ ] Error monitoring works (check Sentry dashboard if enabled)
- [ ] Security headers present (check browser DevTools → Network)

### Check Vercel Logs:
- [ ] No environment variable errors
- [ ] No API connection errors
- [ ] Build succeeded without warnings

---

## 🔧 Troubleshooting

### "Supabase connection failed"

**Check:**
1. URL is correct (should end with .supabase.co)
2. Anon key is the **anon public** key (not service_role)
3. Database migrations were applied
4. Supabase project is not paused

**Fix:**
```bash
# Test connection
curl https://YOUR-PROJECT.supabase.co/rest/v1/ \
  -H "apikey: YOUR-ANON-KEY"

# Should return: {"hint":null,"details":null,"code":"PGRST000","message":"no route"}
# This is good! It means connection works.
```

### "Map not loading"

**Check:**
1. Token starts with `pk.` (public token)
2. Token is valid at https://account.mapbox.com/access-tokens/
3. No extra spaces in environment variable

**Fix:**
```bash
# Test token
curl "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=YOUR_TOKEN"

# Should return JSON with coordinates
```

### "Rate limiting not working"

**Check:**
1. Upstash Redis credentials are correct
2. Using REST API credentials (not Redis protocol)
3. Database is active (not paused)

**Fix:**
- Rate limiting is optional - app will work without it
- But you'll be vulnerable to abuse
- Set up Upstash to enable protection

### "Build failed in Vercel"

**Common causes:**
1. Missing required env vars (Supabase, Mapbox)
2. TypeScript errors in code
3. Missing dependencies

**Fix:**
```bash
# Test build locally first:
npm run prod:build

# If it works locally, check Vercel build logs
```

---

## 💰 Cost Breakdown

All services have **generous free tiers**:

| Service | Free Tier | Cost After | Likely Usage |
|---------|-----------|------------|--------------|
| **Vercel** | Hobby plan | $20/month | Free tier sufficient |
| **Supabase** | 500MB DB | $25/month | Free tier sufficient |
| **Mapbox** | 50K loads/mo | $5/1K loads | ~1,000/month typical |
| **Upstash** | 10K cmds/day | $0.20/100K | Free tier sufficient |
| **Sentry** | 5K errors/mo | $26/month | Free tier sufficient |

**Expected monthly cost:** **$0** for most projects

**At scale (10K users):** ~$25-75/month

---

## 🔐 Security Best Practices

### Never Commit API Keys

```bash
# Add to .gitignore (already included):
.env
.env.local
.env.*.local
```

### Use Environment-Specific Keys

```bash
# Development (local)
NEXT_PUBLIC_SUPABASE_URL=https://dev-project.supabase.co

# Production (Vercel)
NEXT_PUBLIC_SUPABASE_URL=https://prod-project.supabase.co
```

### Rotate Keys Regularly

- Supabase: Settings → API → "Generate new anon key"
- Mapbox: Access tokens → "Rotate token"
- Upstash: Database → "Regenerate token"

---

## 📚 Quick Reference

### Where to Get Keys:

| Service | URL | What to Copy |
|---------|-----|--------------|
| Supabase | https://supabase.com/dashboard | Project Settings → API → URL & anon key |
| Mapbox | https://account.mapbox.com/access-tokens/ | Default public token |
| Upstash | https://console.upstash.com | Database → REST API → URL & Token |
| Sentry | https://sentry.io/settings/projects/ | Project Settings → Client Keys (DSN) |

### Where to Add in Vercel:

1. **Dashboard:** Project → Settings → Environment Variables
2. **CLI:** `vercel env add VARIABLE_NAME production`

---

## ✅ Summary

### Minimum Required (2 keys):
```bash
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
NEXT_PUBLIC_MAPBOX_TOKEN
```

### Recommended (add rate limiting):
```bash
+ UPSTASH_REDIS_REST_URL
+ UPSTASH_REDIS_REST_TOKEN
```

### Optional (nice to have):
```bash
+ NEXT_PUBLIC_SENTRY_DSN
```

**Total setup time:** 30-40 minutes
**Monthly cost:** $0 (free tiers)

---

## 🚀 Quick Deploy Command

Once you have all keys:

```bash
cd /home/user/aerial-estimate-standalone

# Set environment variables in Vercel dashboard
# Then deploy:
vercel --prod

# Your app will be live at:
# https://your-project.vercel.app
```

✅ **You're ready to deploy!**

---

**Need help?**
- Supabase docs: https://supabase.com/docs
- Mapbox docs: https://docs.mapbox.com
- Vercel docs: https://vercel.com/docs
- Upstash docs: https://docs.upstash.com

---

*All services have free tiers. Zero credit card required to start.* 💳❌
