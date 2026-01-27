# Mobile App Setup Guide - Aerial Estimate

Quick guide to view and run the Aerial Estimate platform on iOS and Android devices.

---

## 🎯 What You Need

### Required
- ✅ **Smartphone** (iOS 13+ or Android 5+)
- ✅ **Expo Go app** (free, from App Store/Play Store)
- ✅ **Computer** with Node.js 18+ installed
- ✅ **Same WiFi network** for phone and computer (for development)

### API Keys (Same as Web Platform)
- ✅ Supabase URL and Anon Key
- ✅ Mapbox API token

---

## 🚀 Quick Start (Development Mode)

### Step 1: Install Expo Go on Your Phone

**iOS:**
1. Open App Store
2. Search "Expo Go"
3. Install the app
4. Open it and create account (or skip)

**Android:**
1. Open Google Play Store
2. Search "Expo Go"
3. Install the app
4. Open it and create account (or skip)

**Download links:**
- iOS: https://apps.apple.com/app/expo-go/id982107779
- Android: https://play.google.com/store/apps/details?id=host.exp.exponent

### Step 2: Set Up Mobile App Directory

```bash
cd /home/user/aerial-estimate-standalone/mobile

# Install dependencies
npm install
```

### Step 3: Configure Environment Variables

Create `.env` file in the mobile directory:

```bash
cd /home/user/aerial-estimate-standalone/mobile
nano .env
```

Add your configuration:

```bash
# Supabase
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Mapbox
EXPO_PUBLIC_MAPBOX_TOKEN=your-mapbox-token-here

# API Base URL
EXPO_PUBLIC_API_URL=http://localhost:3000/api
```

**Important:** Use `EXPO_PUBLIC_` prefix for Expo environment variables.

### Step 4: Start Development Server

```bash
# In the mobile directory
npx expo start
```

You'll see a QR code in the terminal.

### Step 5: Open on Your Phone

**Option A: Scan QR Code**
1. Open Expo Go app on your phone
2. Tap "Scan QR code"
3. Point camera at QR code in terminal
4. App will load and run on your phone

**Option B: Manual Connection**
1. In Expo Go, tap "Enter URL manually"
2. Type the URL shown in terminal (e.g., `exp://192.168.1.100:8081`)
3. Tap "Connect"

### ✅ Done!

The Aerial Estimate app should now be running on your phone!

---

## 📱 Development Mode Features

When running via Expo Go:

✅ **Live Reload** - Changes appear instantly
✅ **Hot Reload** - Preserves app state while editing
✅ **Debug Menu** - Shake phone to open
✅ **Console Logs** - View in terminal on computer
✅ **Fast Refresh** - Edit code and see changes immediately

### Debug Menu (Shake Phone)
- Reload app
- Toggle element inspector
- Show performance monitor
- Debug remote JS (Chrome DevTools)

---

## 🔧 Troubleshooting

### "Unable to connect to Expo"

**Solution 1: Check WiFi**
```bash
# Make sure phone and computer are on same WiFi network
# Some corporate/public WiFi blocks this - use phone hotspot instead
```

**Solution 2: Use Tunnel Mode**
```bash
# In mobile directory
npx expo start --tunnel

# This works across any network, but is slower
```

**Solution 3: Use LAN Mode**
```bash
# In mobile directory
npx expo start --lan

# Uses local IP address instead of hostname
```

### "Network request failed"

This means the app can't reach your API:

```bash
# Check EXPO_PUBLIC_API_URL in .env
# If running web app on localhost:3000, use:
EXPO_PUBLIC_API_URL=http://YOUR-COMPUTER-IP:3000/api

# Find your IP:
# Mac/Linux: ifconfig | grep "inet "
# Windows: ipconfig
# Look for something like 192.168.1.100
```

### "Supabase connection failed"

```bash
# Verify environment variables are set
cat mobile/.env

# Make sure they have EXPO_PUBLIC_ prefix
# Not NEXT_PUBLIC_ (that's for web only)
```

### QR Code Not Working

```bash
# Alternative: Use manual URL entry
# 1. In Expo Go, tap "Enter URL manually"
# 2. Type the exp:// URL from terminal
# 3. Or use tunnel mode: npx expo start --tunnel
```

---

## 🏗️ Production Builds (Standalone Apps)

To create actual installable apps (not just Expo Go development):

### Prerequisites

1. **EAS CLI** (Expo Application Services):
```bash
npm install -g eas-cli
eas login
```

2. **Apple Developer Account** (for iOS - $99/year)
3. **Google Play Console Account** (for Android - $25 one-time)

### Build iOS App

```bash
cd /home/user/aerial-estimate-standalone/mobile

# Configure project
eas build:configure

# Build for iOS
eas build --platform ios

# This creates an .ipa file you can submit to App Store
```

**Steps:**
1. Run `eas build --platform ios`
2. Wait ~15-20 minutes for build
3. Download .ipa file
4. Upload to App Store Connect
5. Submit for review

### Build Android App

```bash
cd /home/user/aerial-estimate-standalone/mobile

# Build for Android
eas build --platform android

# This creates an .aab file for Play Store
# Or .apk for direct install
```

**Steps:**
1. Run `eas build --platform android`
2. Wait ~15-20 minutes for build
3. Download .aab or .apk file
4. Upload to Google Play Console
5. Submit for review

### Install APK Directly (Android Only)

For testing without Play Store:

```bash
# Build APK
eas build --platform android --profile preview

# Download .apk file
# Transfer to phone
# Install directly (enable "Install from unknown sources")
```

---

## 📝 Mobile App Configuration Files

### app.json

Located at `mobile/app.json` - main configuration:

```json
{
  "expo": {
    "name": "Aerial Estimate",
    "slug": "aerial-estimate",
    "version": "1.0.0",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "backgroundColor": "#2563eb"
    },
    "ios": {
      "bundleIdentifier": "com.aerialestimate.app",
      "buildNumber": "1.0.0"
    },
    "android": {
      "package": "com.aerialestimate.app",
      "versionCode": 1
    }
  }
}
```

### eas.json

Located at `mobile/eas.json` - build configuration:

```json
{
  "cli": {
    "version": ">= 5.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    },
    "production": {}
  }
}
```

---

## 🎨 App Features on Mobile

The mobile app includes:

### For Homeowners
✅ Browse aerial map of property
✅ Post jobs with location picker
✅ View contractor bids
✅ Message contractors
✅ Leave reviews
✅ Track job status

### For Contractors
✅ Browse nearby jobs (geo-matched)
✅ View job details with aerial imagery
✅ Submit competitive bids
✅ Message homeowners
✅ Manage bid status
✅ View earnings

### Shared Features
✅ Real-time notifications
✅ In-app messaging
✅ Profile management
✅ Payment history (when integrated)
✅ Search and filters

---

## 📊 Performance Tips

### Optimize for Mobile

```javascript
// In your React Native code:

// 1. Use FlatList for long lists (not ScrollView)
<FlatList
  data={jobs}
  renderItem={({item}) => <JobCard job={item} />}
  maxToRenderPerBatch={10}
  windowSize={5}
/>

// 2. Optimize images
<Image
  source={{uri: imageUrl}}
  resizeMode="cover"
  style={{width: 300, height: 200}}
/>

// 3. Use React.memo for expensive components
const JobCard = React.memo(({job}) => {
  // Component code
});
```

---

## 🔐 Security on Mobile

The mobile app inherits all security features:

✅ **Rate limiting** (enforced by API)
✅ **Input validation** (enforced by API)
✅ **Secure auth tokens** (stored in secure storage)
✅ **HTTPS only** (enforced)
✅ **Audit logging** (server-side)

### Mobile-Specific Security

```javascript
// Secure storage for tokens
import * as SecureStore from 'expo-secure-store';

// Store token
await SecureStore.setItemAsync('auth_token', token);

// Retrieve token
const token = await SecureStore.getItemAsync('auth_token');
```

---

## 📱 Testing on Real Devices

### Test Checklist

- [ ] User registration works
- [ ] Login/logout works
- [ ] Map loads with aerial imagery
- [ ] Job posting wizard works
- [ ] Location picker accurate
- [ ] Bidding system functions
- [ ] Messaging real-time
- [ ] Notifications appear
- [ ] Images upload correctly
- [ ] App responsive (no lag)

### Device Coverage

**Recommended test devices:**
- iPhone 12+ (iOS 15+)
- Samsung Galaxy S20+ (Android 11+)
- One older device (iOS 13 / Android 9)

---

## 🚀 Deploy to App Stores

### iOS App Store

**Requirements:**
- Apple Developer Account ($99/year)
- App Store Connect access
- App icons (1024x1024)
- Screenshots (various sizes)
- Privacy policy URL
- App description

**Steps:**
1. Build with EAS: `eas build --platform ios`
2. Download .ipa
3. Upload to App Store Connect via Transporter
4. Fill in app metadata
5. Submit for review
6. Wait 1-3 days for approval

### Google Play Store

**Requirements:**
- Google Play Console account ($25 one-time)
- App icons (512x512)
- Screenshots (phone + tablet)
- Privacy policy URL
- App description

**Steps:**
1. Build with EAS: `eas build --platform android`
2. Download .aab
3. Upload to Google Play Console
4. Fill in store listing
5. Submit for review
6. Wait 1-3 days for approval

---

## 💡 Quick Commands Reference

```bash
# Install dependencies
cd mobile && npm install

# Start development server
npx expo start

# Start with tunnel (works across networks)
npx expo start --tunnel

# Start with LAN mode
npx expo start --lan

# Clear cache and restart
npx expo start -c

# Check for updates
npx expo-cli@latest update

# Build iOS
eas build --platform ios

# Build Android
eas build --platform android

# Build both
eas build --platform all

# Submit to App Store
eas submit --platform ios

# Submit to Play Store
eas submit --platform android
```

---

## 📚 Additional Resources

### Documentation
- Expo Docs: https://docs.expo.dev
- React Native Docs: https://reactnative.dev
- EAS Build: https://docs.expo.dev/build/introduction/

### Expo Go App
- iOS: https://apps.apple.com/app/expo-go/id982107779
- Android: https://play.google.com/store/apps/details?id=host.exp.exponent

### Publishing
- App Store Guidelines: https://developer.apple.com/app-store/review/guidelines/
- Play Store Policies: https://play.google.com/about/developer-content-policy/

---

## ✅ Success Checklist

### Development Mode
- [ ] Expo Go installed on phone
- [ ] Mobile dependencies installed (`npm install`)
- [ ] Environment variables configured (`.env`)
- [ ] Development server started (`npx expo start`)
- [ ] QR code scanned / app loaded on phone
- [ ] App connects to API successfully
- [ ] Can register/login
- [ ] Map displays with aerial imagery

### Production Mode
- [ ] EAS CLI installed
- [ ] Apple Developer / Play Console account
- [ ] App icons prepared
- [ ] Screenshots captured
- [ ] Privacy policy published
- [ ] Builds successful
- [ ] Apps submitted to stores
- [ ] Approved and published

---

## 🎯 Summary

### To View on Mobile (Development)

**Quick version:**
1. Install Expo Go on your phone
2. `cd mobile && npm install`
3. Create `.env` with API keys
4. `npx expo start`
5. Scan QR code with Expo Go
6. ✅ App runs on your phone!

**Takes ~10 minutes**

### To Publish to App Stores

**Quick version:**
1. `eas build --platform all`
2. Wait for builds (~20 min)
3. Submit to App Store and Play Store
4. Wait for approval (1-3 days)
5. ✅ Published!

**Takes ~1 week total**

---

**Need help?** Check the troubleshooting section above or see Expo documentation at https://docs.expo.dev

**Your mobile app is ready to run!** 📱🚀
