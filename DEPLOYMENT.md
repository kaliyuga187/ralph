# Aerial Estimate Platform - Deployment Guide

## Web App Deployment (Vercel)

### Prerequisites
- GitHub repository
- Vercel account (free tier works)
- Environment variables configured

### Steps

1. **Connect to Vercel**
   ```bash
   npm i -g vercel
   cd aerial-platform
   vercel
   ```

2. **Configure Environment Variables**
   Go to Vercel Dashboard → Settings → Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_MAPBOX_TOKEN`
   - `STRIPE_SECRET_KEY`
   - `SENDGRID_API_KEY`

3. **Deploy**
   ```bash
   vercel --prod
   ```

   Or connect GitHub for automatic deployments.

## Mobile App Deployment

### iOS (TestFlight)

1. **Install EAS CLI**
   ```bash
   npm install -g eas-cli
   eas login
   ```

2. **Configure Project**
   ```bash
   cd mobile
   eas build:configure
   ```

3. **Build for iOS**
   ```bash
   eas build --platform ios
   ```

4. **Submit to TestFlight**
   ```bash
   eas submit --platform ios
   ```

### Android (Google Play)

1. **Build for Android**
   ```bash
   eas build --platform android
   ```

2. **Submit to Play Store**
   ```bash
   eas submit --platform android
   ```

## Database Migrations

Run all migrations in Supabase SQL Editor in order:
1. `001_create_user_profiles.sql`
2. `002_create_jobs.sql`
3. `003_geo_matching_and_bids.sql`
4. `004_messaging_notifications_reviews.sql`
5. `005_engagement_features.sql`

## Domain Configuration

1. Add custom domain in Vercel
2. Configure DNS records
3. Enable HTTPS (automatic)

## Monitoring & Analytics

- **PostHog**: Analytics dashboard
- **Vercel Analytics**: Performance monitoring
- **Supabase Logs**: Database query monitoring

## Post-Deployment Checklist

- [ ] All environment variables configured
- [ ] Database migrations applied
- [ ] Custom domain configured
- [ ] SSL certificate active
- [ ] Analytics tracking verified
- [ ] Mobile apps submitted to stores
- [ ] Error monitoring configured
- [ ] Backup strategy implemented

## Scaling Considerations

- Enable Vercel Edge Functions for API routes
- Upgrade Supabase tier as needed
- Configure CDN for static assets
- Implement rate limiting
- Set up database connection pooling

## Support

For deployment issues:
- Vercel: https://vercel.com/docs
- Expo/EAS: https://docs.expo.dev/eas/
- Supabase: https://supabase.com/docs
