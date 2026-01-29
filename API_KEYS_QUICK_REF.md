# API Keys Quick Reference

Fast lookup guide for Vercel deployment.

---

## 🎯 Required (2 Services)

### 1. Supabase - Database & Auth
```
Sign up: https://supabase.com
Get keys: Dashboard → Settings → API
Needed: Project URL + anon public key
Free tier: 500MB database, 50K users/month
Setup time: 15 min (includes migrations)
```

### 2. Mapbox - Satellite Maps
```
Sign up: https://www.mapbox.com
Get key: Dashboard → Access tokens → Default public token
Needed: Public token (starts with pk.)
Free tier: 50,000 map loads/month
Setup time: 5 min
```

---

## ⚡ Recommended (1 Service)

### 3. Upstash Redis - Rate Limiting
```
Sign up: https://console.upstash.com
Get keys: Create Database → REST API credentials
Needed: REST URL + REST Token
Free tier: 10,000 commands/day
Setup time: 10 min
Why: Prevents API abuse & brute force attacks
```

---

## 🎨 Optional (1 Service)

### 4. Sentry - Error Tracking
```
Sign up: https://sentry.io
Get key: Create Project → Client Keys (DSN)
Needed: DSN URL
Free tier: 5,000 errors/month
Setup time: 5 min
Why: Production error monitoring
```

---

## 📋 Add to Vercel

### Dashboard Method:
1. Vercel → Project → Settings → Environment Variables
2. Add each key-value pair
3. Select "Production" environment
4. Click "Save"

### CLI Method:
```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
vercel env add NEXT_PUBLIC_MAPBOX_TOKEN production
vercel env add UPSTASH_REDIS_REST_URL production
vercel env add UPSTASH_REDIS_REST_TOKEN production
```

---

## ✅ Variable Names

Copy these exactly:

```bash
# REQUIRED
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
NEXT_PUBLIC_MAPBOX_TOKEN

# RECOMMENDED
UPSTASH_REDIS_REST_URL
UPSTASH_REDIS_REST_TOKEN

# OPTIONAL
NEXT_PUBLIC_SENTRY_DSN
```

---

## 🔍 Verification

After deployment, test:
- [ ] Visit your-app.vercel.app
- [ ] Map loads (Mapbox working)
- [ ] Sign up works (Supabase working)
- [ ] Try 6 rapid logins (Rate limiting working)

---

## 📚 Full Guide

See `VERCEL_API_KEYS.md` for:
- Detailed step-by-step setup
- Screenshots and examples
- Troubleshooting
- Cost breakdown
- Security best practices

---

## ⚡ Quick Deploy

```bash
# 1. Get all API keys (30 min)
# 2. Add to Vercel dashboard
# 3. Deploy:
vercel --prod
```

**Total time:** 40-50 minutes
**Cost:** $0 (all free tiers)

✅ **Ready!**
