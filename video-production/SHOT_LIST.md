# Aerial Estimate Marketing Video - Shot List
## 75-Second High-Energy Production

**Video ID:** AE_Marketing_V1
**Total Duration:** 75 seconds
**Frame Rate:** 30fps
**Resolution:** 1920x1080 (Export 4K for downscaling)
**Aspect Ratios:** 16:9 (primary), 9:16 (vertical), 1:1 (square)

---

## SHOT-BY-SHOT BREAKDOWN

### SEGMENT 1: OPENING HOOK (0:00 - 0:05) - 5 seconds

#### Shot 1A: Problem Statement (0:00 - 0:02) - 2 seconds
**Visual Description:**
- Black screen fade in
- Split screen animation slides in from center
- LEFT side: Stock footage or illustration of frustrated homeowner on phone with contractor listings open on laptop, looking confused
- RIGHT side: Contractor in truck with GPS, driving aimlessly, frustrated expression
- Both scenes have slight desaturation (70% color)

**Motion Graphics:**
- At 0.5s: Text fades in center divider line
  - Font: Inter Bold, 48pt
  - Text: "Finding local contractors..."
  - Color: White with subtle glow
- At 1.5s: Text morphs to:
  - "...shouldn't be this hard."
  - Color: Red (#ef4444) with pulse effect

**Screen Recording:** N/A (stock footage or illustrations)

**Camera Movement:** Subtle slow zoom into split screen (110% scale over 2 seconds)

**Transitions:** Fade in from black (0.5s duration)

---

#### Shot 1B: Satellite Zoom (0:02 - 0:05) - 3 seconds
**Visual Description:**
- Full screen transition to satellite view
- Start with Earth view (Google Earth style)
- Rapid zoom sequence into suburban neighborhood
- Final frame: Rooftop aerial view of residential property

**Motion Graphics:**
- At 2.5s: Targeting reticle appears, tracking the zooming motion
- At 4s: Reticle locks onto property, brief pulse effect
- At 4.5s: Marker pin drops onto property with bounce animation

**Screen Recording Instructions:**
```
TOOL: Mapbox GL JS or Google Earth Studio
1. Start view: Coordinates (40.7128, -74.0060) at zoom level 3
2. Animate zoom: 3 → 18 over 2.5 seconds (smooth easing)
3. Final frame: Satellite imagery, clear rooftop visible
4. Export: 2.5 second clip, 1920x1080, 30fps
```

**Sound Effects:**
- 0:02 - Whoosh sound (zoom initiation)
- 0:04 - Target lock beep
- 0:04.5 - Pin drop sound

**Transitions:** Cross-dissolve from split screen (0.3s)

---

### SEGMENT 2: PLATFORM OVERVIEW (0:05 - 0:20) - 15 seconds

#### Shot 2A: Logo Reveal (0:05 - 0:07) - 2 seconds
**Visual Description:**
- Clean white background
- Aerial Estimate logo fades in from center
- Logo: Modern sans-serif with subtle home/roof icon
- Tagline appears below: "Connect. View. Hire."

**Motion Graphics:**
- Logo scale animation: 80% → 100% with elastic easing
- Subtle rotation: -5° → 0° during scale
- Tagline: Slide up from bottom with fade (0.5s delay)

**Text Overlay:**
```
Logo text: "AERIAL ESTIMATE"
Font: Inter Black, 72pt
Color: #2563eb (Primary Blue)

Tagline: "Connect. View. Hire."
Font: Inter Regular, 24pt
Color: #64748b (Slate)
```

**Transitions:** Fade in (0.5s), Hold for 1.5s, Fade out (0.5s)

---

#### Shot 2B: Landing Page Scroll (0:07 - 0:10) - 3 seconds
**Visual Description:**
- Browser mockup (Chrome-style frame)
- URL bar shows: "aerialestimate.com"
- Smooth scroll through landing page hero section

**Screen Recording Instructions:**
```
FILE: aerial-platform/app/page.tsx (running locally)
URL: http://localhost:3000

RECORDING STEPS:
1. Open browser at 1920x1080 full screen
2. Navigate to landing page
3. Start recording at hero section (top of page)
4. Smooth scroll down over 3 seconds showing:
   - Hero headline: "Find Local Contractors Using Aerial Imagery"
   - Feature icons: Geo-matching, Competitive Bids, Ratings
   - CTA button: "Post a Job" and "Find Work"
5. Stop at "How It Works" section

CURSOR: Hide cursor during recording
BROWSER: Hide bookmarks bar, use clean profile
EXPORT: 3 seconds, 1920x1080, 60fps (will conform to 30fps)
```

**Motion Graphics:**
- Subtle spotlight effect following scroll
- Feature icons: Scale up slightly as they enter viewport

**Sound Effects:** Smooth UI scroll sound (subtle)

---

#### Shot 2C: Dashboard Split Screen (0:10 - 0:15) - 5 seconds
**Visual Description:**
- Screen splits vertically into two panels
- LEFT: Client dashboard showing "My Jobs" view
- RIGHT: Contractor dashboard showing "Browse Jobs" feed
- Both panels animate simultaneously

**Screen Recording Instructions:**
```
LEFT PANEL - CLIENT DASHBOARD:
1. Login as: client@test.com
2. Navigate to: http://localhost:3000/dashboard/client
3. Record 5-second sequence:
   - 0-2s: Dashboard overview (shows "Post a Job" button)
   - 2-3s: Click "My Jobs" tab
   - 3-5s: Show 2-3 active jobs with status badges

RIGHT PANEL - CONTRACTOR DASHBOARD:
1. Login as: contractor@test.com (separate browser/incognito)
2. Navigate to: http://localhost:3000/dashboard/trade
3. Record same 5-second sequence:
   - 0-2s: Dashboard overview (shows "Browse Jobs")
   - 2-3s: Click "Browse Jobs"
   - 3-5s: Scroll through job feed (3-4 job cards visible)

SYNC: Both recordings must be perfectly timed
EXPORT: Two separate 5-second clips, same resolution
```

**Motion Graphics:**
- At 0:10 - Split line animates in from top to bottom (0.3s)
- At 0:11 - LEFT panel slides in from left
- At 0:11 - RIGHT panel slides in from right
- During playback: Subtle glow on active elements
- Labels appear:
  - "CLIENT VIEW" above left panel (Inter Bold, 18pt)
  - "CONTRACTOR VIEW" above right panel

**Sound Effects:**
- 0:10 - Split whoosh
- 0:11 - Panel slide sound (left and right, stereo)

---

#### Shot 2D: Mapbox Aerial View (0:15 - 0:20) - 5 seconds
**Visual Description:**
- Full screen Mapbox map with satellite imagery
- Property marker pulsing on location
- Smooth rotation around property (orbital camera)
- Info card slides in showing job details

**Screen Recording Instructions:**
```
FILE: aerial-platform/components/MapboxMap.tsx
URL: http://localhost:3000/jobs/[job-id] (use real job ID)

RECORDING STEPS:
1. Navigate to job detail page with map
2. Map should be centered on property at zoom 18 (satellite)
3. Use Mapbox GL JS to animate:

   mapboxgl.map.easeTo({
     center: [lng, lat],
     zoom: 18,
     bearing: 0,
     pitch: 45,
     duration: 2000
   });

   setTimeout(() => {
     map.rotateTo(360, { duration: 3000 });
   }, 2000);

4. Marker should pulse (CSS animation)
5. At 2s: Info card fades in from right showing:
   - Service Type: "Roofing Repair"
   - Budget: "$5,000"
   - Distance: "2.3 miles away"

EXPORT: 5 seconds, 1920x1080, 60fps
```

**Motion Graphics:**
- Marker: Continuous pulse (scale 1.0 → 1.2 → 1.0, 1s cycle)
- Info card: Slide from right with fade (0.5s animation)
- Distance indicator: Animated line from marker to edge

**Text Overlay on Info Card:**
```
Service: "ROOFING REPAIR"
Budget: "$5,000"
Distance: "2.3 mi away"
Font: Inter Medium, 16pt
Background: White with shadow
```

**Sound Effects:**
- 0:15 - Map transition whoosh
- 0:17 - Info card slide sound
- 0:17.5 - Marker pulse beep (subtle)

---

### SEGMENT 3: FEATURE HIGHLIGHTS (0:20 - 0:45) - 25 seconds

#### Shot 3A: Job Posting Wizard - Step 1 (0:20 - 0:23) - 3 seconds
**Visual Description:**
- Browser view of job posting wizard
- Step 1: Service type selection
- User selects "Roofing" from service type dropdown
- Smooth transition to step indicator updating

**Screen Recording Instructions:**
```
URL: http://localhost:3000/jobs/new

RECORDING:
1. Start at Step 1 (Service Details)
2. Show service type dropdown:
   - Options visible: Roofing, Plumbing, Electrical, HVAC, etc.
3. Cursor moves to "Roofing" option (smooth, natural movement)
4. Click "Roofing" - option highlights
5. Show form fields populate:
   - Title: "Roof Repair - Shingle Replacement"
   - Description: "Need to replace damaged shingles..."
   - Budget slider: Move to $5,000
6. Cursor moves to "Next" button
7. Hover effect on button (slight scale)
8. Click "Next" - fade transition

TIMING: 3 seconds total, natural pacing
CURSOR: Visible, natural movements (not too fast)
EXPORT: 3 seconds, 1920x1080, 60fps
```

**Motion Graphics:**
- Step indicator at top: "1 of 3" → Highlight step 1
- Form fields: Subtle fade-in as they're filled
- Budget slider: Smooth animated slide to $5,000 with value counter

**Text Overlays:**
```
At 0:20 - Top left corner:
"STEP 1: JOB DETAILS"
Font: Inter SemiBold, 20pt
Color: #2563eb

At 0:22 - Above form:
"Quick 3-step process"
Font: Inter Regular, 14pt
Color: #64748b
Fade in/out: 0.3s
```

**Sound Effects:**
- 0:20.5 - Dropdown open sound
- 0:21 - Click sound (selection)
- 0:22 - Form field typing sounds (subtle)
- 0:22.5 - Slider movement sound
- 0:22.8 - Button hover sound

---

#### Shot 3B: Job Posting Wizard - Step 2 (0:23 - 0:27) - 4 seconds
**Visual Description:**
- Step 2: Interactive map for location selection
- User drops pin on property
- Map zooms to satellite view showing rooftop clearly

**Screen Recording Instructions:**
```
CONTINUATION FROM Shot 3A

RECORDING:
1. Page transition to Step 2 (Location)
2. Map loads at city level (zoom 11)
   - Shows search box: "Enter your address"
3. User types in search: "123 Main St, Anytown, USA"
   - Show typing animation with cursor
4. Autocomplete suggestions appear
5. Click first suggestion
6. Map animates:
   - Zoom: 11 → 18 (2 seconds)
   - Style: Streets → Satellite
7. Pin drops on property with bounce
8. Satellite imagery clearly shows rooftop
9. Confirmation message: "Location set ✓"
10. "Next" button pulses (call to action)

TIMING: 4 seconds (smooth, not rushed)
MAP: Ensure satellite imagery is high quality
EXPORT: 4 seconds, 1920x1080, 60fps
```

**Motion Graphics:**
- Step indicator: Step 1 → Step 2 transition (checkmark on step 1)
- Search box: Glow effect on focus
- Autocomplete: Slide down animation
- Pin drop: Bounce animation (ease-out) + ripple effect
- Checkmark: Draw animation (SVG path)

**Text Overlays:**
```
At 0:23 - Top:
"STEP 2: PROPERTY LOCATION"

At 0:25.5 - Above map:
"Aerial view helps contractors understand the job"
Font: Inter Medium, 14pt
Color: White with shadow
Fade in: 0.3s, Hold: 1.5s
```

**Sound Effects:**
- 0:23 - Page transition whoosh
- 0:23.5 - Keyboard typing (subtle)
- 0:24 - Autocomplete dropdown
- 0:24.5 - Map zoom whoosh
- 0:26 - Pin drop sound + bounce
- 0:26.5 - Success chime

---

#### Shot 3C: Job Posting Wizard - Step 3 (0:27 - 0:30) - 3 seconds
**Visual Description:**
- Step 3: Review and submit
- Job summary card with all details
- User clicks "Post Job" button
- Success animation with confetti

**Screen Recording Instructions:**
```
CONTINUATION FROM Shot 3B

RECORDING:
1. Transition to Step 3 (Review)
2. Show job summary card:
   ┌─────────────────────────────┐
   │ Roofing Repair              │
   │ $5,000 budget               │
   │ 📍 123 Main St              │
   │ [Satellite thumbnail]       │
   │                             │
   │ "Need to replace..."        │
   └─────────────────────────────┘
3. Small map thumbnail showing location
4. Cursor moves to "Post Job" button (green, prominent)
5. Hover effect: Button scales 1.0 → 1.05
6. Click button
7. Loading spinner (0.5s)
8. Success screen:
   - Checkmark animation (draw + scale)
   - "Job Posted Successfully! 🎉"
   - "You'll receive bids within 24 hours"
   - "View Job" button appears

TIMING: 3 seconds
EXPORT: 3 seconds, 1920x1080, 60fps
```

**Motion Graphics:**
- Step indicator: All steps show checkmarks
- Summary card: Subtle shadow + scale animation on load
- Button: Glow effect on hover
- Loading spinner: Smooth rotation
- Success checkmark: Draw path animation (0.5s)
- Confetti: Particles fall from top (canvas animation)

**Text Overlays:**
```
At 0:27 - Top:
"STEP 3: REVIEW & POST"

At 0:29 (success screen):
"JOB POSTED! 🎉"
Font: Inter Bold, 32pt
Color: #10b981 (Green)
Scale animation: 0 → 100% with bounce
```

**Sound Effects:**
- 0:27 - Page transition
- 0:28 - Hover sound
- 0:28.5 - Click sound
- 0:29 - Loading sound (brief)
- 0:29.5 - Success chime + confetti pop

---

#### Shot 3D: Contractor Mobile App - Job Feed (0:30 - 0:35) - 5 seconds
**Visual Description:**
- Switch to mobile device frame (iPhone 14 Pro mockup)
- Portrait orientation
- Contractor browsing jobs on mobile app
- Scroll through feed showing distance indicators

**Screen Recording Instructions:**
```
DEVICE: iOS Simulator (iPhone 14 Pro - 390x844)
FILE: mobile/app/(tabs)/jobs.tsx

RECORDING:
1. Open mobile app in iOS Simulator
2. Login as contractor@test.com
3. Navigate to Jobs tab
4. Start recording at Jobs feed:

   Feed shows 4-5 job cards:
   ┌────────────────────┐
   │ 🏠 Roofing Repair  │
   │ $5,000             │
   │ 📍 2.3 miles away  │
   │ Posted 1 hour ago  │
   └────────────────────┘

5. Scroll down smoothly (show 3-4 jobs)
6. Each job card has:
   - Service icon
   - Title
   - Budget
   - Distance (varies: 0.8 mi, 2.3 mi, 5.1 mi)
   - Time posted
   - Small thumbnail of aerial view

7. Apply filter: Tap "Filters" button
8. Select "Roofing" and "Sort by: Closest First"
9. Jobs re-order with animation

TIMING: 5 seconds
GESTURES: Natural thumb scrolling (not too fast)
EXPORT: 5 seconds, 390x844, 60fps
```

**Motion Graphics:**
- Mobile frame: iPhone 14 Pro mockup (black frame)
- Position: Center screen with subtle shadow
- Distance badges: Pulse animation on closest jobs
- Filter button: Badge count indicator
- Sort animation: Jobs fade out → re-order → fade in (0.5s)

**Text Overlays:**
```
At 0:30 - Left side of frame:
"📱 MOBILE APP"
Font: Inter Bold, 24pt

At 0:32 - Right side:
"Jobs matched by location"
Font: Inter Regular, 16pt
Arrow pointing to distance indicators

At 0:34 - Bottom:
"iOS & Android"
Font: Inter Medium, 14pt
```

**Sound Effects:**
- 0:30 - App transition sound
- 0:31 - Scroll sound (subtle)
- 0:33 - Filter tap
- 0:33.5 - Filter apply sound
- 0:34 - Re-order animation sound

---

#### Shot 3E: Job Detail View (0:35 - 0:38) - 3 seconds
**Visual Description:**
- Contractor taps on job card
- Detail view slides up from bottom
- Shows full aerial imagery, job details, and bid form

**Screen Recording Instructions:**
```
CONTINUATION FROM Shot 3D (Same simulator)

RECORDING:
1. User taps on first job card ("Roofing Repair - 2.3 mi")
2. Card highlights briefly (press animation)
3. Detail view slides up from bottom:

   JOB DETAIL VIEW:
   ┌────────────────────────┐
   │ [Large aerial image]   │
   │                        │
   │ Roofing Repair         │
   │ Budget: $5,000         │
   │ Distance: 2.3 miles    │
   │                        │
   │ Description...         │
   │                        │
   │ 📍 View on Map         │
   │                        │
   │ [Submit Bid button]    │
   └────────────────────────┘

4. User scrolls to see full details
5. Aerial image zooms slightly on load (120% → 100%)
6. "Submit Bid" button pulses at bottom

TIMING: 3 seconds
ANIMATION: Smooth slide-up modal
EXPORT: 3 seconds, 390x844, 60fps
```

**Motion Graphics:**
- Slide-up animation: Ease-out, 0.3s duration
- Aerial image: Ken Burns effect (subtle zoom + pan)
- Distance indicator: Animated line from user location to job
- "Submit Bid" button: Pulsing glow effect

**Text Overlays:**
```
At 0:36 - Above mobile frame:
"See property before driving"
Font: Inter Medium, 18pt
Color: White
Background: Semi-transparent black bar
```

**Sound Effects:**
- 0:35 - Card tap sound
- 0:35.2 - Slide up sound
- 0:36 - Image zoom sound (subtle)
- 0:37.5 - Button pulse sound

---

#### Shot 3F: Bid Submission (0:38 - 0:42) - 4 seconds
**Visual Description:**
- Contractor submits bid
- Form fills out with bid details
- Success confirmation

**Screen Recording Instructions:**
```
CONTINUATION FROM Shot 3E

RECORDING:
1. User scrolls to "Submit Bid" section
2. Tap "Submit Bid" button
3. Bid form slides up:

   BID FORM:
   ┌────────────────────────┐
   │ Your Bid Amount        │
   │ $ [4,500]              │
   │                        │
   │ Timeline               │
   │ [2 weeks] ▼            │
   │                        │
   │ Message to Client      │
   │ "I have 10 years..."   │
   │                        │
   │ [Submit Bid] button    │
   └────────────────────────┘

4. Fields populate with values (typing animation):
   - Amount: $4,500 (typed)
   - Timeline: Select "2 weeks" from dropdown
   - Message: "I have 10 years experience..."

5. Tap "Submit Bid"
6. Loading spinner (0.5s)
7. Success screen:
   - Checkmark animation
   - "Bid Submitted! ✓"
   - "Client will be notified"
   - "View My Bids" button

TIMING: 4 seconds
EXPORT: 4 seconds, 390x844, 60fps
```

**Motion Graphics:**
- Form slide up: Bottom sheet animation
- Input focus: Glow border effect
- Typing animation: Cursor blinks, numbers count up
- Dropdown: Smooth expand/collapse
- Submit button: Scale on tap
- Success checkmark: Draw + bounce animation

**Text Overlays:**
```
At 0:39 - Top of mobile frame:
"Competitive bidding = fair prices"
Font: Inter Medium, 16pt

At 0:41 - Success screen overlay:
"BID SUBMITTED ✓"
Font: Inter Bold, 28pt
Color: #10b981
```

**Sound Effects:**
- 0:38 - Button tap
- 0:38.5 - Form slide up
- 0:39 - Keyboard typing
- 0:39.5 - Dropdown open
- 0:40 - Selection sound
- 0:41 - Submit tap
- 0:41.5 - Success chime

---

#### Shot 3G: Client Bid Review (0:42 - 0:45) - 3 seconds
**Visual Description:**
- Switch back to desktop/web view
- Client receives notification
- Reviews bids in comparison table

**Screen Recording Instructions:**
```
DEVICE: Desktop browser (1920x1080)
URL: http://localhost:3000/client/jobs/[job-id]

RECORDING:
1. Client dashboard showing job
2. Notification appears (top-right):
   "New bid received! 🔔"
   Slide in from right with bounce
3. User clicks notification
4. Navigate to job bids page
5. Show bid comparison table:

   BIDS TABLE:
   ┌──────────────────────────────────────┐
   │ Contractor | Amount | Timeline | ... │
   ├──────────────────────────────────────┤
   │ John's Roofing | $4,500 | 2 weeks | ⭐4.8 │
   │ ABC Contractors | $5,200 | 1 week | ⭐4.6 │
   │ Elite Roofing | $4,800 | 10 days | ⭐4.9 │
   └──────────────────────────────────────┘

6. Hover over first bid (highlights row)
7. Click "View Profile" on John's Roofing
8. Quick preview modal shows:
   - Profile photo
   - Rating: 4.8 stars (127 reviews)
   - Verified badge
   - "Accept Bid" button

TIMING: 3 seconds (fast-paced)
EXPORT: 3 seconds, 1920x1080, 60fps
```

**Motion Graphics:**
- Notification: Slide from right + bounce + pulse
- Badge indicator: "1" appears with scale animation
- Table rows: Fade in sequentially (0.1s stagger)
- Hover effect: Row highlights with subtle scale
- Profile modal: Fade + scale from center
- Stars: Fill animation (gold color)

**Text Overlays:**
```
At 0:42 - Top right:
"Instant notifications"
Font: Inter Medium, 16pt

At 0:43 - Above table:
"Compare bids side-by-side"
Font: Inter SemiBold, 18pt

At 0:44 - Above stars:
"Ratings build trust"
Font: Inter Regular, 14pt
```

**Sound Effects:**
- 0:42 - Notification chime
- 0:42.5 - Click sound
- 0:43 - Table load sound
- 0:44 - Hover sound
- 0:44.5 - Modal open sound
- 0:44.8 - Star fill sound

---

### SEGMENT 4: BEHIND THE BUILD (0:45 - 0:58) - 13 seconds

#### Shot 4A: Tech Stack Visualization (0:45 - 0:50) - 5 seconds
**Visual Description:**
- Abstract technology visualization
- Animated flow of tech stack icons
- Data flowing between components
- Modern, futuristic aesthetic

**Motion Graphics Instructions:**
```
COMPOSITION: After Effects or similar

SCENE SETUP:
- Dark background: #0f172a (Slate 900)
- Grid overlay: Subtle animated grid lines

ANIMATION SEQUENCE:
1. (0:45) Next.js logo appears center
   - Scale: 0 → 100% with elastic bounce
   - Glow: Blue (#2563eb) pulsing aura

2. (0:46) Arrows extend from Next.js to:
   - RIGHT: Supabase logo (database)
   - LEFT: Mapbox logo (maps)
   - TOP: React Native logo (mobile)
   - BOTTOM: Vercel logo (deployment)

   Arrows: Animated stroke (draw effect)
   Logos: Fade in + scale

3. (0:47) Data particles flow along arrows:
   - Small glowing dots travel from Next.js to each service
   - Speed: 1 second per path
   - Color: Gradient (blue to green)

4. (0:48) Second tier of logos appears:
   - From Supabase → PostgreSQL icon
   - From Mapbox → Satellite imagery thumbnail
   - From React Native → iOS + Android icons
   - From Vercel → Globe icon (CDN)

5. (0:49) All connections glow simultaneously
   - Pulse effect: All arrows and logos
   - Duration: 0.5s
   - Color: White → Brand colors

6. (0:50) Camera slowly zooms out (110% → 100%)
   - Reveals full architecture diagram
   - Text labels appear beside each service

EXPORT: 5 seconds, 1920x1080, 30fps, Alpha channel
```

**Text Labels (Appear at 0:49):**
```
Next.js: "Full-Stack Framework"
Supabase: "Backend & Auth"
Mapbox: "Aerial Imagery"
React Native: "Mobile Apps"
Vercel: "Edge Deployment"
PostgreSQL: "Geospatial Database"

Font: JetBrains Mono, 14pt
Color: #94a3b8 (Slate 400)
Animation: Fade + slide from logo
```

**Sound Effects:**
- 0:45 - Tech startup sound
- 0:46 - Connection sounds (each arrow)
- 0:47 - Data flow sound (continuous)
- 0:49 - Sync pulse sound
- 0:50 - Ambient tech hum (fade out)

---

#### Shot 4B: Code Visualization (0:50 - 0:53) - 3 seconds
**Visual Description:**
- VS Code editor interface
- Haversine distance calculation function
- Code typing animation
- Syntax highlighting

**Screen Recording Instructions:**
```
FILE: aerial-platform/supabase/migrations/003_geo_matching_and_bids.sql

RECORDING SETUP:
1. Open VS Code with file
2. Set theme: "One Dark Pro" or similar dark theme
3. Font: JetBrains Mono, 16pt
4. Window: 1600x900 (centered in 1920x1080 frame)

ANIMATION:
Use VS Code extension "TypeIt" or edit in post:

1. (0:50) Show function signature:
   CREATE OR REPLACE FUNCTION calculate_distance(

2. (0:50.5) Parameters appear line by line:
     lat1 DECIMAL, lng1 DECIMAL,
     lat2 DECIMAL, lng2 DECIMAL
   ) RETURNS DECIMAL AS $$

3. (0:51) Comment appears:
   -- Haversine formula for geo-distance

4. (0:51.5) Core calculation appears:
   DECLARE
     r DECIMAL := 3959; -- Earth radius in miles
   BEGIN
     RETURN (r * ACOS(...))
   END;
   $$ LANGUAGE plpgsql;

5. (0:52) Cursor blinks at end
6. (0:52.5) Function name highlights (select effect)
7. (0:53) Zoom to fit entire function

CURSOR: Blinking cursor during typing
SYNTAX: SQL syntax highlighting active
EXPORT: 3 seconds, 1600x900, 60fps
```

**Motion Graphics:**
- Editor frame: Slight shadow and rounded corners
- Line numbers: Subtle glow on active line
- Typing: Natural speed (3 chars per 0.1s)
- Highlight: Yellow background fade in/out

**Text Overlays:**
```
At 0:50 - Top left corner:
"Geospatial Matching Algorithm"
Font: JetBrains Mono, 18pt
Color: #10b981

At 0:52 - Bottom:
"PostgreSQL + PostGIS"
Font: Inter Regular, 14pt
Color: #94a3b8
```

**Sound Effects:**
- 0:50 - Keyboard typing sounds (realistic)
- 0:52 - Selection sound
- 0:52.5 - Highlight sound

---

#### Shot 4C: Database Schema Diagram (0:53 - 0:56) - 3 seconds
**Visual Description:**
- Animated database schema
- 9 tables with relationships
- Lines showing foreign key connections

**Motion Graphics Instructions:**
```
TOOL: After Effects or Figma with animation

SCHEMA VISUALIZATION:
Layout: Node-graph style (like dbdiagram.io)

TABLES (rectangles with rounded corners):
┌─────────────┐    ┌─────────────┐
│  profiles   │────│trade_profiles│
└─────────────┘    └─────────────┘
       │                  │
       ├──────────────────┤
       │                  │
┌─────────────┐    ┌─────────────┐
│    jobs     │────│    bids     │
└─────────────┘    └─────────────┘
       │
       ├─── messages
       ├─── notifications
       ├─── reviews
       └─── referrals

ANIMATION:
1. (0:53) Tables appear one by one (center → outward)
   - profiles (center)
   - trade_profiles (right)
   - jobs (bottom-left)
   - bids (bottom-right)
   - Other tables around edges

2. (0:54) Relationship lines draw between tables
   - Animated stroke (0 → 100% length)
   - Color: #3b82f6 (Blue)
   - Arrow heads appear at ends

3. (0:55) Data flow animation
   - Glowing dots travel along relationship lines
   - Loop 2-3 times

4. (0:56) Security shield icon appears center
   - Scale animation with glow
   - Text: "Row Level Security" appears below

STYLING:
- Background: Dark gradient (#0f172a → #1e293b)
- Tables: White background, shadow
- Text: Inter font, 12pt for table names
- Lines: 2px stroke, animated

EXPORT: 3 seconds, 1920x1080, 30fps
```

**Text Overlays:**
```
At 0:53 - Top:
"9 Tables, Fully Relational"
Font: Inter SemiBold, 20pt

At 0:55 - Center (with shield):
"🛡️ Row Level Security"
Font: Inter Bold, 18pt
Color: #10b981

At 0:55.5 - Bottom:
"PostgreSQL + Auth Policies"
Font: Inter Regular, 14pt
Color: #94a3b8
```

**Sound Effects:**
- 0:53 - Table pop sounds (staggered)
- 0:54 - Connection draw sounds
- 0:55 - Data flow hum
- 0:55.5 - Shield appear sound

---

#### Shot 4D: Deployment Visualization (0:56 - 0:58) - 2 seconds
**Visual Description:**
- Split screen showing deployments
- Left: Vercel deployment success
- Right: Mobile app builds (iOS + Android)

**Screen Recording Instructions:**
```
LEFT SIDE - VERCEL DASHBOARD:
URL: https://vercel.com/dashboard (your account)

RECORDING:
1. Show deployment success screen:
   ✓ Production deployment successful
   Domain: aerial-estimate.vercel.app
   Build time: 45s
   Status: All checks passed

2. Show deployment graph (traffic/performance)
3. "Visit" button hover effect

RIGHT SIDE - EXPO DASHBOARD:
URL: https://expo.dev/accounts/[you]/projects/aerial-estimate/builds

RECORDING:
1. Show two builds:
   iOS Build:
     ✓ Build successful (15m 32s)
     [Download IPA button]

   Android Build:
     ✓ Build successful (12m 18s)
     [Download APK button]

2. Show app icons for both platforms

TIMING: 2 seconds each side
EXPORT: Two separate 2-second clips
```

**Motion Graphics:**
- Split screen: Vertical divider line
- Checkmarks: Draw animation + green glow
- Status badges: Pulse effect
- App icons: 3D rotation effect

**Text Overlays:**
```
At 0:56 - Left side top:
"Web Deploy: Vercel"
Font: Inter SemiBold, 16pt

At 0:56 - Right side top:
"Mobile: iOS + Android"
Font: Inter SemiBold, 16pt

At 0:57 - Bottom center:
"Production Ready in 60 Minutes"
Font: Inter Bold, 20pt
Color: #10b981
Glow effect
```

**Sound Effects:**
- 0:56 - Deployment success chimes (stereo)
- 0:57 - Build complete sounds
- 0:57.5 - Success fanfare

---

### SEGMENT 5: RESULTS & VALUE (0:58 - 1:08) - 10 seconds

#### Shot 5A: Metrics Dashboard (0:58 - 1:04) - 6 seconds
**Visual Description:**
- Animated metrics dashboard
- Numbers counting up
- Progress bars filling
- Checkmarks appearing

**Motion Graphics Instructions:**
```
COMPOSITION: After Effects or similar

DASHBOARD LAYOUT (2x2 grid):

┌────────────────┬────────────────┐
│  User Stories  │   Build Time   │
│   50/50 ✅     │   60 Minutes   │
└────────────────┴────────────────┘
┌────────────────┬────────────────┐
│  Technologies  │  Total Value   │
│      9+        │  $50K-100K     │
└────────────────┴────────────────┘

ANIMATION SEQUENCE:

1. (0:58) Grid layout fades in
   - Each card appears with stagger (0.1s delay)
   - Subtle scale + fade effect

2. (0:59) User Stories counter:
   - Number counts: 0 → 50 (1.5s duration)
   - Progress bar fills: 0% → 100%
   - Color: gradient (orange → green)
   - At 100%: Checkmark appears with bounce

3. (1:00) Build Time:
   - Clock icon rotates
   - Number counts: 0 → 60
   - "Minutes" appears
   - Speedometer needle sweeps to "Fast"

4. (1:01) Technologies:
   - Icons appear in circle formation:
     Next.js, React, TypeScript, Supabase,
     Mapbox, Stripe, etc.
   - Each icon pops in with scale
   - Counter: 0 → 9+

5. (1:02) Total Value:
   - Dollar signs rain from top (particle effect)
   - Number counts: $0 → $50,000 → $100,000
   - Range indicator: "$50K-100K"
   - Sparkle effects

6. (1:03) All metrics pulse simultaneously
   - Glow effect on all cards
   - Duration: 0.5s

STYLING:
- Background: Dark gradient
- Cards: White background, shadow, rounded corners
- Numbers: Inter Black, 48pt
- Labels: Inter Medium, 18pt
- Icons: 32px, brand colors
- Glow: Subtle outer glow on active elements

EXPORT: 6 seconds, 1920x1080, 30fps
```

**Text Overlays:**
```
At 0:58 - Top center:
"📊 COMPLETE BUILD METRICS"
Font: Inter Bold, 24pt
Color: White

At 1:03 - Bottom:
"Fully Functional Two-Sided Marketplace"
Font: Inter SemiBold, 18pt
Color: #10b981
```

**Sound Effects:**
- 0:58 - Cards appear (whoosh)
- 0:59 - Counter sounds (rapid ticks)
- 1:00 - Clock tick sounds
- 1:01 - Icon pop sounds (staggered)
- 1:02 - Cash register / coin sounds
- 1:03 - Success chime

---

#### Shot 5B: Feature Checklist (1:04 - 1:08) - 4 seconds
**Visual Description:**
- Scrolling checklist of completed features
- Each item checks off with animation
- Fast-paced, satisfying

**Motion Graphics Instructions:**
```
COMPOSITION: Simple vertical list

CHECKLIST (appears line by line):
✅ User Authentication & Profiles
✅ Job Posting with Aerial Imagery
✅ Geo-Matched Job Discovery
✅ Competitive Bidding System
✅ Real-Time Messaging
✅ Rating & Review System
✅ Payment Processing (Stripe)
✅ Mobile Apps (iOS + Android)
✅ Push Notifications
✅ Referral Program
✅ Admin Analytics Dashboard
✅ Production Deployment

ANIMATION:
1. (1:04) List container slides in from right
2. Items appear sequentially (0.15s each):
   - Text fades in
   - Checkbox appears empty
   - Checkmark draws inside (SVG path animation)
   - Item highlights briefly (green background flash)
3. (1:07) All items visible
4. (1:07.5) Container scales to fit all items
5. (1:08) Fade out

STYLING:
- Background: Semi-transparent white card
- Text: Inter Medium, 16pt
- Checkmarks: Green (#10b981)
- Hover effect: Subtle scale on each item
- Spacing: 8px between items

EXPORT: 4 seconds, 1920x1080, 30fps
```

**Text Overlays:**
```
At 1:04 - Top left:
"✅ FEATURES DELIVERED"
Font: Inter Bold, 22pt
Color: #10b981

At 1:07 - Bottom right:
"All 50 User Stories Complete"
Font: Inter SemiBold, 14pt
Color: #64748b
```

**Sound Effects:**
- 1:04 - List slide in
- 1:04-1:07 - Checkbox sounds (each item, rapid)
- 1:07 - Completion chime

---

### SEGMENT 6: CALL TO ACTION (1:08 - 1:15) - 7 seconds

#### Shot 6A: Network Effect Visualization (1:08 - 1:11) - 3 seconds
**Visual Description:**
- Aerial view map showing multiple properties
- Contractor locations
- Connection lines appearing

**Motion Graphics Instructions:**
```
COMPOSITION: Mapbox-style visualization

SCENE SETUP:
1. Start with aerial/satellite view of city/suburban area
2. Multiple property markers appear (10-15 pins)
   - Color: Blue (#2563eb)
   - Animation: Drop from top with bounce

3. Contractor markers appear (20-25 pins)
   - Color: Green (#10b981)
   - Icon: Wrench or tool icon
   - Animation: Fade in + pulse

4. Connection lines draw between contractors and nearby properties
   - Animated stroke (draw effect)
   - Color: Gradient (blue to green)
   - Thickness: 2px, slight glow

5. Data flowing along lines:
   - Small dots travel from contractors to properties
   - Speed: 1 second per path
   - Multiple dots on each path

6. Camera slowly zooms out to reveal network
   - Scale: 100% → 80% over 3 seconds
   - Rotation: 0° → 15° (slight tilt)

OVERLAY STATS (appear at 1:10):
"25 Active Contractors"
"47 Open Jobs"
"124 Bids Submitted"

EXPORT: 3 seconds, 1920x1080, 30fps
```

**Text Overlays:**
```
At 1:08 - Center top:
"Connecting Local Communities"
Font: Inter Bold, 28pt
Color: White with shadow

At 1:10 - Stats counters:
Font: Inter SemiBold, 18pt
Color: White
Background: Semi-transparent dark
Animation: Count up from 0
```

**Sound Effects:**
- 1:08 - Pins dropping (staggered)
- 1:09 - Connection draw sounds
- 1:10 - Data flow ambient sound
- 1:10.5 - Counter tick sounds

---

#### Shot 6B: Logo + Final Message (1:11 - 1:15) - 4 seconds
**Visual Description:**
- Clean fade to branded end screen
- Logo, tagline, call to action
- GitHub link and attribution

**Motion Graphics Instructions:**
```
END SCREEN LAYOUT:

┌─────────────────────────────────────┐
│                                     │
│        [AERIAL ESTIMATE LOGO]       │
│                                     │
│     "Launch Your Local Marketplace" │
│                                     │
│   ┌───────────────────────────┐   │
│   │  View the Complete Code   │   │
│   │  github.com/user/ralph    │   │
│   └───────────────────────────┘   │
│                                     │
│   Built with Claude Code + Ralph   │
│                                     │
│   ✅ 50 User Stories                │
│   ✅ Web + Mobile Apps              │
│   ✅ Production Ready               │
│                                     │
└─────────────────────────────────────┘

ANIMATION:
1. (1:11) Fade from network visualization
   - Cross-dissolve: 0.5s
   - Background: Clean white or gradient

2. (1:11.5) Logo appears:
   - Scale: 0 → 100% with elastic ease
   - Rotation: -15° → 0°
   - Position: Upper center

3. (1:12) Tagline fades in:
   - "Launch Your Local Marketplace"
   - Slide up from below logo

4. (1:12.5) CTA button appears:
   - Scale + glow animation
   - "View the Complete Code"
   - Pulse effect (continuous)

5. (1:13) GitHub link types in:
   - Cursor blinks
   - URL appears character by character
   - Becomes clickable link (underline)

6. (1:13.5) Attribution line fades in:
   - "Built with Claude Code + Ralph"
   - Claude logo + Ralph logo appear

7. (1:14) Checkmarks list animates:
   - Items appear with stagger
   - Checkmark draw animation

8. (1:15) Hold final frame

STYLING:
- Background: White to light gradient
- Logo: Full color, high resolution
- Tagline: Inter Bold, 32pt, #1e293b
- CTA: Blue button (#2563eb), white text
- Link: Inter Medium, 18pt, blue
- Attribution: Inter Regular, 14pt, gray
- Checkmarks: Green, Inter Medium, 16pt

EXPORT: 4 seconds, 1920x1080, 30fps
HOLD: Add 3-second static hold for platforms
```

**Text Content:**
```
Logo: AERIAL ESTIMATE (with icon)

Tagline: "Launch Your Local Marketplace"

CTA Button: "View the Complete Code"

Link: "github.com/[username]/ralph"

Attribution: "Built with Claude Code + Ralph AI Agent"

Features:
✅ 50 User Stories Implemented
✅ Web + Mobile Apps
✅ Production-Ready Deployment

Optional: "Available for fork and customization"
```

**Sound Effects:**
- 1:11 - Transition sound
- 1:11.5 - Logo appear sound
- 1:12 - Text fade sounds
- 1:12.5 - Button appear sound
- 1:13 - Typing sounds
- 1:13.5 - Attribution fade in
- 1:14 - Checkbox sounds
- 1:15 - Final success chime

---

## TECHNICAL NOTES

### Video Export Settings

**Master Export (Primary):**
- Resolution: 1920x1080 (Full HD)
- Frame Rate: 30fps
- Codec: H.264
- Bitrate: 10 Mbps (CBR)
- Audio: AAC, 320kbps, Stereo
- Color Space: sRGB
- Format: MP4

**4K Export (Optional for quality):**
- Resolution: 3840x2160
- Frame Rate: 30fps
- Downscale for final delivery

**Social Media Variants:**

1. **Vertical (Instagram/TikTok):**
   - Resolution: 1080x1920 (9:16)
   - Reframe compositions for vertical
   - Duration: 60 seconds (trim to fit)

2. **Square (LinkedIn/Twitter):**
   - Resolution: 1080x1080 (1:1)
   - Center-crop main content
   - Duration: 60 seconds

3. **YouTube:**
   - Resolution: 1920x1080
   - Duration: 90 seconds (add 15s outro)

### Color Grading

**LUT / Color Correction:**
- Slight increase in saturation (+10%)
- Contrast: +15%
- Shadows: Lift slightly for visibility
- Highlights: Protect from blowing out

**Brand Colors (ensure consistency):**
- Primary Blue: #2563eb
- Success Green: #10b981
- Warning Amber: #f59e0b
- Neutral Slate: #64748b

### Audio Mixing

**Levels:**
- Music: -18dB to -12dB (background)
- Voiceover: -6dB to -3dB (clear, prominent)
- Sound FX: -15dB to -9dB (subtle accents)

**Ducking:**
- Music ducks -10dB when voiceover active
- Use sidechain compression

**Master Output:**
- Limiter at -0.5dB (prevent clipping)
- Light compression for consistency

### Transitions

**Standard Transitions:**
- Cross Dissolve: 0.3s to 0.5s
- Fade to Black: 0.5s (between segments)
- Cut: For fast-paced sequences

**Special Transitions:**
- Whoosh: Between major sections
- Swipe: For mobile screen changes
- Zoom: For emphasis moments

### Text Animation Presets

**Fade In:**
- Duration: 0.3s
- Easing: Ease Out

**Slide + Fade:**
- Offset: 30px
- Duration: 0.5s
- Easing: Ease Out Cubic

**Scale + Fade:**
- Scale: 80% → 100%
- Duration: 0.4s
- Easing: Back Ease Out

**Typewriter:**
- Speed: 0.05s per character
- Cursor blink: 0.5s interval

---

## PRODUCTION CHECKLIST

### Pre-Production
- [ ] Install and configure screen recording software
- [ ] Set up local development environment (npm run dev)
- [ ] Create test accounts (client + contractor)
- [ ] Seed database with sample data
- [ ] Prepare mobile simulator (iOS/Android)
- [ ] Download stock footage (if using any)
- [ ] Create motion graphics templates

### Screen Recording
- [ ] Shot 1B: Satellite zoom
- [ ] Shot 2B: Landing page scroll
- [ ] Shot 2C: Dashboard split (client + contractor)
- [ ] Shot 2D: Mapbox aerial view
- [ ] Shot 3A: Job posting step 1
- [ ] Shot 3B: Job posting step 2 (map)
- [ ] Shot 3C: Job posting step 3 (submit)
- [ ] Shot 3D: Mobile job feed
- [ ] Shot 3E: Mobile job detail
- [ ] Shot 3F: Mobile bid submission
- [ ] Shot 3G: Client bid review
- [ ] Shot 4D: Vercel + Expo dashboards

### Motion Graphics
- [ ] Shot 1A: Problem split screen
- [ ] Shot 2A: Logo reveal
- [ ] Shot 4A: Tech stack visualization
- [ ] Shot 4B: Code typing animation
- [ ] Shot 4C: Database schema diagram
- [ ] Shot 5A: Metrics dashboard
- [ ] Shot 5B: Feature checklist
- [ ] Shot 6A: Network effect map
- [ ] Shot 6B: End screen with CTA

### Audio
- [ ] Record voiceover narration
- [ ] License background music
- [ ] Collect sound effects library
- [ ] Edit and clean audio tracks

### Editing
- [ ] Import all footage to timeline
- [ ] Apply color grading LUT
- [ ] Sync voiceover to visuals
- [ ] Add background music
- [ ] Add sound effects
- [ ] Create smooth transitions
- [ ] Add all text overlays
- [ ] Apply motion graphics
- [ ] Final color correction
- [ ] Audio mixing and mastering

### Export & Delivery
- [ ] Export master 1080p version
- [ ] Export vertical variant (9:16)
- [ ] Export square variant (1:1)
- [ ] Export YouTube version with outro
- [ ] Generate thumbnail images (5-10 options)
- [ ] Create subtitle/caption file (SRT)
- [ ] Upload to hosting (Vimeo, YouTube)

---

## ESTIMATED PRODUCTION TIME

**Breakdown:**
- Screen recordings: 2-3 hours
- Motion graphics: 4-5 hours
- Voiceover recording: 1 hour
- Video editing: 3-4 hours
- Audio mixing: 1-2 hours
- Revisions: 2-3 hours

**Total: 13-18 hours**

**Recommended workflow:**
- Day 1: Screen recordings + motion graphics templates
- Day 2: Complete motion graphics + voiceover
- Day 3: Edit and mix
- Day 4: Final touches and export

---

## ALTERNATIVE: AI VIDEO TOOLS

If you want to expedite production, consider:

**Pictory.ai:**
- Input: This shot list as script
- Auto-generates video from text + stock footage
- Time: 2-3 hours

**Synthesia:**
- AI avatar for narration
- Screen recordings as B-roll
- Time: 3-4 hours

**Runway ML:**
- AI-powered motion graphics
- Text-to-video for abstract shots
- Time: 4-6 hours

---

**This shot list is ready for production. Provide to video editor or follow step-by-step to create yourself.**
