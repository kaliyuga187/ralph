# Video Editing Timeline & Instructions
## Aerial Estimate Marketing Video - Complete Assembly Guide

**Software:** Adobe Premiere Pro 2024 (or DaVinci Resolve, Final Cut Pro)
**Duration:** 75 seconds (1:15)
**Export:** 1920x1080, 30fps, H.264 MP4

---

## PROJECT SETUP

### Create New Project

**Premiere Pro:**
```
File > New > Project
Name: "Aerial_Estimate_Marketing_Video"
Location: [Your working directory]/video-production/premiere/

Scratch Disks:
- Same as Project: ✓
- Or specify SSD location for better performance
```

**Sequence Settings:**
```
Right-click Project Panel > New Item > Sequence

Preset: HD 1080p 30
Or Custom:
- Frame Size: 1920×1080
- Frame Rate: 30fps
- Pixel Aspect Ratio: Square Pixels (1.0)
- Fields: No Fields (Progressive)
- Audio: 48000 Hz, Stereo
```

### Project Bins (Folders)

Create organized bins:
```
📁 Aerial_Estimate_Project
├── 📁 01_FOOTAGE
│   ├── 📁 Screen_Recordings
│   ├── 📁 Motion_Graphics (AE renders)
│   └── 📁 Stock_Media
├── 📁 02_AUDIO
│   ├── 📁 Voiceover
│   ├── 📁 Music
│   └── 📁 SFX
├── 📁 03_GRAPHICS
│   ├── 📁 Logos
│   ├── 📁 Text_Templates
│   └── 📁 Icons
└── 📁 04_SEQUENCES
    ├── Main_Edit_V1
    ├── Main_Edit_V2 (backups)
    └── Export_Finals
```

### Import Assets

**Voiceover:**
```
Import: AE_Voiceover_Final_48k_24bit.wav
Place in: 02_AUDIO/Voiceover
```

**Music:**
```
Import: Background_Music_75s.wav
- Should be exactly 75 seconds or longer
- Ensure licensed for commercial use
Place in: 02_AUDIO/Music
```

**Motion Graphics (from After Effects):**
```
Import all rendered AE comps:
- 01_Opening_Split.mov
- 02_Satellite_Zoom.mov
- 03_Logo_Reveal.mov
- ... (all 13 shots)
Place in: 01_FOOTAGE/Motion_Graphics
```

**Screen Recordings:**
```
Import all screen captures:
- Landing_Page_Scroll.mov
- Dashboard_Client.mov
- Dashboard_Trade.mov
- Job_Posting_Wizard.mov
- Mobile_Job_Feed.mov
- Etc.
Place in: 01_FOOTAGE/Screen_Recordings
```

---

## TIMELINE STRUCTURE

### Track Layout (Bottom to Top)

```
VIDEO TRACKS:
V7: Upper Graphics (overlays, final text)
V6: Text/Titles (all text overlays)
V5: Transitions & Effects
V4: Motion Graphics Layer 2 (secondary animations)
V3: Motion Graphics Layer 1 (primary animations)
V2: B-Roll / Screen Recordings
V1: Main Footage / Background

AUDIO TRACKS:
A6: Sound Effects (UI sounds, impacts)
A5: Sound Effects (ambient, whooshes)
A4: Voiceover (narration)
A3: Music (background track)
A2: (Reserved for music variations)
A1: (Reference audio / temp)
```

---

## DETAILED TIMELINE EDIT

### SEGMENT 1: OPENING HOOK (0:00 - 0:05)

**Track Layout:**

```
V3: [01_Opening_Split.mov]
V2: [Text overlay: problem statement]
A5: [Whoosh transition]
A3: [Music starts - fade in]
```

**Edit Points:**

| Time | Track | Asset | Notes |
|------|-------|-------|-------|
| 0:00.0 | V3 | 01_Opening_Split.mov | Split screen animation |
| 0:00.0 | A3 | Background_Music.wav | Fade in over 1s |
| 0:02.0 | V3 | 02_Satellite_Zoom.mov | Transition via cross-dissolve |
| 0:02.0 | A5 | Zoom_Whoosh.wav | Satellite zoom sound |
| 0:04.5 | A6 | Pin_Drop.wav | Marker drop on property |

**Transitions:**
```
0:02.0 - Cross Dissolve between Opening Split and Satellite Zoom
- Duration: 0.3 seconds
- Ease: Standard
```

**Color Grading:**
```
Opening Split footage:
- Lumetri Color > Basic Correction
- Saturation: 70% (desaturated look)
- Shadows: Lift +15
- Add vignette: Amount: -1.0
```

**Audio Levels:**
```
A3 (Music):
- 0:00.0 = -infinity dB (silent)
- 0:01.0 = -18 dB (background level)

A5 (Zoom whoosh):
- Peak: -12 dB
- Fade in: 0.2s, Fade out: 0.3s

A6 (Pin drop):
- Peak: -9 dB
- One-shot sound
```

---

### SEGMENT 2: PLATFORM OVERVIEW (0:05 - 0:20)

**Track Layout:**

```
V6: [Text: "Connect. View. Hire."]
V3: [03_Logo_Reveal.mov]
V2: [04_Landing_Scroll.mov] [05_Dashboard_Split.mov] [06_Aerial_Map.mov]
A6: [UI sounds for interactions]
A4: [Voiceover: "Meet Aerial Estimate..."]
```

**Edit Points:**

| Time | Track | Asset | Duration | Notes |
|------|-------|-------|----------|-------|
| 0:05.0 | V3 | 03_Logo_Reveal.mov | 2s | Logo animation |
| 0:07.0 | V2 | Landing_Page_Scroll.mov | 3s | Website scroll |
| 0:07.0 | A6 | UI_Scroll.wav | - | Subtle scroll sound |
| 0:10.0 | V3 | 04_Dashboard_Split.mov | 5s | Split dashboard view |
| 0:10.0 | A6 | Panel_Slide.wav | - | Panels sliding in |
| 0:10.2 | A6 | Click.wav | - | UI interaction |
| 0:15.0 | V2 | Mapbox_Aerial_View.mov | 5s | Property with aerial imagery |
| 0:17.0 | A6 | Info_Card_Slide.wav | - | Info card appears |

**Text Overlays:**

Create Essential Graphics template for consistent styling:

```
0:10.0 - 0:15.0 (on V6)
Text: "CLIENT VIEW" | "CONTRACTOR VIEW"
- Font: Inter SemiBold, 20pt
- Color: White (#ffffff)
- Background: Dark rounded rectangle (#0f172a, 80% opacity)
- Position: Top-left and top-right above panels
- Animation: Fade in 0.3s + slide down 20px
```

**Voiceover Sync:**
```
A4 Track:
- 0:06.0: "Meet Aerial Estimate"
  (Sync with logo center frame)

- 0:08.5: "satellite imagery"
  (Sync when aerial map visible)

- 0:12.0: "See your property from above"
  (Sync with aerial view appearing)
```

**Audio Ducking:**
```
Music (A3) should duck when voiceover is active:
- Use sidechain compression
- OR manual keyframes:
  - 0:06.0: -18dB → -24dB (duck by 6dB)
  - 0:14.5: -24dB → -18dB (restore)
```

---

### SEGMENT 3: FEATURE HIGHLIGHTS (0:20 - 0:45)

**This is the longest section with multiple sub-segments**

#### 3A: Job Posting Wizard (0:20 - 0:30)

**Track Layout:**

```
V6: [Text overlays: "STEP 1", "STEP 2", "STEP 3"]
V2: [Job_Post_Step1.mov] [Job_Post_Step2.mov] [Job_Post_Step3.mov]
A6: [UI click sounds, typing, success chime]
A4: [VO: "Homeowners describe their project..."]
```

**Edit Cuts:**

| Time | Asset | Duration | Transition |
|------|-------|----------|------------|
| 0:20.0 | Job_Post_Step1.mov | 3s | Cut |
| 0:20.0 | Text: "STEP 1: JOB DETAILS" | - | Fade in |
| 0:21.0 | SFX: Dropdown.wav | - | - |
| 0:22.5 | SFX: Button_Click.wav | - | - |
| 0:23.0 | Job_Post_Step2.mov | 4s | Page transition wipe |
| 0:23.0 | Text: "STEP 2: PROPERTY LOCATION" | - | Fade in |
| 0:24.5 | SFX: Map_Zoom.wav | - | - |
| 0:26.0 | SFX: Pin_Drop.wav | - | - |
| 0:27.0 | Job_Post_Step3.mov | 3s | Page transition wipe |
| 0:27.0 | Text: "STEP 3: REVIEW & POST" | - | Fade in |
| 0:29.0 | SFX: Success_Chime.wav | - | - |
| 0:29.5 | Confetti particle effect | 0.5s | Overlay on V4 |

**Custom Transition (Page Wipe):**
```
0:23.0 and 0:27.0:
- Use "Wipe" transition
- Direction: Right to left
- Duration: 0.3s
- Feather: 10%
- OR use "Push" transition
```

**Text Animation:**
```
All "STEP X" titles:
- Effect: Fade in + slide from top
- Duration: 0.5s
- Ease: Ease out
- Offset: Start -30px above, end at final position
```

#### 3B: Mobile App Views (0:30 - 0:42)

**Track Layout:**

```
V4: [Mobile_Phone_Frame.png] (static frame overlay)
V3: [Mobile_Screen_Content.mov] (nested sequence with multiple clips)
V6: [Text: "📱 MOBILE APP"]
A6: [Mobile UI sounds]
```

**Edit Cuts (Nested in Mobile_Screen_Content sequence):**

| Time | Asset | Duration | Notes |
|------|-------|----------|-------|
| 0:30.0 | Mobile_Job_Feed.mov | 5s | Scrolling job list |
| 0:33.5 | Filter applied animation | - | Jobs re-order |
| 0:35.0 | Mobile_Job_Detail.mov | 3s | Detail view slides up |
| 0:38.0 | Mobile_Bid_Form.mov | 4s | Bid submission |
| 0:41.0 | Success screen | 1s | Checkmark animation |

**Mobile Frame Setup:**
```
V4: Import "iPhone_14_Pro_Frame.png"
- Position: Center screen
- Scale: Appropriate size (content area = 390×844)
- Shadow: Drop shadow effect (20px offset, 40px blur, 30% opacity)

V3: Nest all mobile recordings into "Mobile_Screen_Content" sequence
- Mask: Rounded rectangle to fit within phone screen
- Position: Aligned with frame's screen area
```

**Sound Design (Mobile UI):**
```
A6 Track - UI sounds:
- 0:31.0: Scroll.wav (loop, low volume)
- 0:33.5: Filter_Apply.wav
- 0:35.0: Slide_Up.wav
- 0:38.5: Keyboard_Type.wav (brief)
- 0:40.5: Button_Tap.wav
- 0:41.5: Success_Chime.wav
```

#### 3C: Client Bid Review (0:42 - 0:45)

**Track Layout:**

```
V2: [Client_Bid_Review.mov]
V5: [Notification animation]
A6: [Notification chime]
A4: [VO: "Competitive bidding means fair prices..."]
```

**Edit Points:**

| Time | Asset | Notes |
|------|-------|-------|
| 0:42.0 | Client_Dashboard.mov | Switch to desktop view |
| 0:42.0 | Notification_Animation.mov (V5) | Overlay on top-right |
| 0:42.0 | Notification_Chime.wav | - |
| 0:43.5 | Bid_Table_Rows.mov | Comparison table |
| 0:44.5 | Profile_Modal.mov | Contractor profile popup |

**Transition from Mobile to Desktop:**
```
0:41.8 - 0:42.0:
- Transition: Scale mobile down + fade out
- Desktop scales up from center + fade in
- Duration: 0.5s total
- Overlapping for 0.3s
```

---

### SEGMENT 4: BEHIND THE BUILD (0:45 - 0:58)

**Track Layout:**

```
V3: [07_Tech_Stack.mov] [08_Code_Typing.mov] [09_DB_Schema.mov] [10_Deployment.mov]
V6: [Text overlays for tech labels]
A5: [Tech ambient sounds, data flow sounds]
A4: [VO: "Built on modern stack..."]
```

**Edit Cuts:**

| Time | Asset | Duration | Notes |
|------|-------|----------|-------|
| 0:45.0 | 07_Tech_Stack.mov | 5s | Animated tech diagram |
| 0:45.0 | Tech_Startup_Sound.wav (A5) | - | Futuristic sound |
| 0:46.5 | Data_Flow_Loop.wav (A5) | - | Continuous ambient |
| 0:50.0 | 08_Code_Typing.mov | 3s | Haversine function |
| 0:50.0 | Keyboard_Typing.wav (A6) | - | Realistic typing |
| 0:53.0 | 09_DB_Schema.mov | 3s | Database diagram |
| 0:54.0 | Connection_Draw.wav (A5) | - | Lines drawing |
| 0:56.0 | 10_Deployment_Split.mov | 2s | Vercel + EAS builds |
| 0:57.0 | Success_Fanfare.wav (A6) | - | Deployment complete |

**Color Grading (this section):**
```
All tech visualization clips:
- Lumetri Color > Creative
- Look: Cinematic (slight teal and orange)
- Intensity: 30%
- Sharpening: +20

Code typing scene:
- Keep authentic (no color grade)
- Add slight vignette
```

**Text Overlays:**
```
0:46.0 (V6): "Next.js, Supabase, Mapbox"
- Font: JetBrains Mono, 18pt
- Color: #10b981 (Green - tech credibility)
- Position: Lower-third
- Animation: Type-on effect (5 characters per frame)

0:50.5 (V6): "Geospatial Matching Algorithm"
- Same styling

0:53.5 (V6): "9 Tables, Row Level Security"
- Same styling

0:56.5 (V6): "Production Ready in 60 Minutes"
- Font: Inter Bold, 24pt
- Color: #10b981
- Glow effect
- Position: Center bottom
```

**Audio Atmosphere:**
```
Create "tech" ambiance by layering:
- Data_Flow_Loop.wav (-24dB, continuous 0:45-0:58)
- Keyboard_Typing.wav (-18dB, 0:50-0:53)
- Connection_Sounds.wav (-20dB, 0:54-0:56)

Add reverb to voiceover in this section:
- Reverb: Small room
- Mix: 15%
- Creates "presentation" feel
```

---

### SEGMENT 5: RESULTS & VALUE (0:58 - 1:08)

**Track Layout:**

```
V3: [11_Metrics_Dashboard.mov]
V2: [12_Feature_Checklist.mov]
A6: [Counter sounds, checkbox sounds]
A4: [VO: "All fifty user stories complete..."]
```

**Edit Cuts:**

| Time | Asset | Duration | Notes |
|------|-------|----------|-------|
| 0:58.0 | 11_Metrics_Dashboard.mov | 6s | 2x2 grid metrics |
| 0:58.0 | Cards_Appear.wav (A5) | - | Whoosh sound |
| 0:59.0 | Counter_Tick.wav (A6) | - | Loop while counting |
| 1:03.0 | Success_Pulse.wav (A6) | - | All metrics complete |
| 1:04.0 | 12_Feature_Checklist.mov | 4s | Scrolling checklist |
| 1:04.0 | List_Slide.wav (A5) | - | List appears |
| 1:04.2 | Checkbox_Check.wav (A6) | - | Loop for each item |
| 1:07.5 | Completion_Chime.wav (A6) | - | All items checked |

**Timing Sync (Critical):**
```
Voiceover must sync with animations:

1:02.0: "Ready to launch today"
- Sync with: "Ready to Launch" metric appearing
- Visual: Text scales up with emphasis

1:05.0: "Web and mobile"
- Sync with: Checklist item "Mobile Apps" checking

1:06.5: "Today"
- Sync with: Final checklist item checking
```

**Sound Design:**
```
Counter_Tick.wav:
- Play rapidly as numbers count up (0:59-1:02)
- Pan: Slightly left for left metrics, right for right metrics (stereo effect)
- Volume: Soft (-24dB), rapid fire

Checkbox_Check.wav:
- One sound per checklist item (12 items)
- Timing: Every 0.15s from 1:04.2 to 1:06.0
- Add slight pitch variation: +5% to -5% randomly
```

---

### SEGMENT 6: CALL TO ACTION (1:08 - 1:15)

**Track Layout:**

```
V3: [13_Network_Map.mov]
V2: [14_End_Screen.mov]
V6: [Text: "This is the future of local trades"]
A5: [Network ambient sound]
A4: [VO: "This is the future of local trades..."]
A3: [Music builds to climax]
```

**Edit Cuts:**

| Time | Asset | Duration | Notes |
|------|-------|----------|-------|
| 1:08.0 | 13_Network_Map.mov | 3s | Aerial view with connections |
| 1:08.2 | Pins_Dropping.wav (A6) | - | Staggered pin sounds |
| 1:09.5 | Network_Hum.wav (A5) | - | Data flowing ambient |
| 1:10.5 | Counter_Tick.wav (A6) | - | Stats counting |
| 1:11.0 | 14_End_Screen.mov | 4s | CTA with logo |
| 1:11.0 | Logo_Whoosh.wav (A5) | - | Logo appears |
| 1:13.0 | Typewriter.wav (A6) | - | GitHub link typing |
| 1:14.0 | Checkbox_Check.wav (A6) | - | Feature checkmarks |
| 1:15.0 | Final_Chime.wav (A6) | - | Resolution sound |

**Music Build:**
```
Background music should peak at end:

A3 Track (Music):
- 1:08.0: -18dB (building)
- 1:11.0: -15dB (keyframe ramp up)
- 1:13.0: -12dB (climax)
- 1:14.5: -12dB (sustain)
- 1:15.0: -12dB (hold)
- 1:15.5: -12dB → -infinity dB (fade out over 2s)

Voiceover ducking:
- 1:09.0-1:14.5: Duck music to -20dB when VO active
- Use sidechain or keyframes
```

**End Screen Hold:**
```
After main 75s video:
- Hold end screen static for 3 additional seconds
- Music fades out gently
- CTA button continues pulsing
- Total video length: 78 seconds (with outro)
```

**Text Overlays (Final Messages):**
```
1:11.5 (V6): "Launch Your Local Marketplace"
- Font: Inter Bold, 36pt
- Position: Below logo
- Animation: Slide up + fade

1:12.5 (V6): "View the Complete Code"
- On CTA button
- Font: Inter SemiBold, 22pt

1:13.0 (V6): "github.com/username/ralph"
- Font: JetBrains Mono, 20pt
- Animation: Typewriter effect (synced with sound)

1:13.5 (V6): "Built with Claude Code + Ralph AI Agent"
- Font: Inter Regular, 16pt
- Position: Below GitHub link
```

---

## GLOBAL VIDEO EFFECTS

### Color Grading (Entire Timeline)

**Adjustment Layer (V7) spanning 0:00-1:15:**

```
Lumetri Color Settings:

Basic Correction:
- Temperature: +5 (slightly warmer)
- Tint: 0
- Exposure: 0
- Contrast: +10
- Highlights: -5
- Shadows: +10
- Whites: 0
- Blacks: -5

Creative:
- Look: None (or subtle "Cinematic")
- Intensity: 20%
- Faded Film: 5 (slight vintage feel)
- Saturation: +5

Vignette:
- Amount: -0.3
- Midpoint: 50%
- Roundness: 50%
- Feather: 50%

Sharpening: +15 (for screen recordings)
```

**Sections with Different Grading:**

```
Tech Stack Section (0:45-0:58):
- Separate adjustment layer
- Teal and Orange look (cinematic)
- Creative > Look: "Teal Orange Plus Contrast"
- Intensity: 30%

End Screen (1:11-1:15):
- Brighter, cleaner look
- Remove vignette
- Increase exposure +5
- Saturation +10
```

### Audio Mixing

**Master Audio Track Levels:**

```
A1-A2: (Not used, or reference tracks muted)

A3 (Background Music):
- Overall range: -24dB to -12dB
- Varies based on voiceover presence
- Fade in: 0:00-0:01 (silent to -18dB)
- Duck during VO: -24dB
- Build at end: -15dB to -12dB
- Fade out: 1:15-1:17 (-12dB to silent)

A4 (Voiceover):
- Consistent: -6dB to -3dB
- No variation (already processed in recording)
- Hard limiter at -1dB (prevent clipping)

A5 (SFX Ambient):
- Background atmosphere: -24dB to -18dB
- Whooshes and transitions: -15dB to -12dB
- Data flow sounds: -22dB (subtle)

A6 (SFX One-shots):
- UI clicks: -18dB
- Success chimes: -9dB (prominent)
- Notifications: -12dB
- Keyboard typing: -20dB (subtle)
```

**Audio Effects Chain (on Master Out):**

```
1. Parametric Equalizer:
   - Low cut: 60Hz (remove rumble)
   - High shelf: +2dB at 10kHz (add air)

2. Multiband Compressor:
   - Low (0-120Hz): Ratio 3:1, Threshold -12dB
   - Mid (120Hz-5kHz): Ratio 2:1, Threshold -8dB
   - High (5kHz+): Ratio 1.5:1, Threshold -6dB

3. Limiter:
   - Ceiling: -0.5dB
   - Release: 100ms
   - Prevents any clipping

4. Loudness Radar:
   - Target: -14 LUFS (for web video)
   - Monitor throughout edit
```

**Voiceover Processing (if not done in recording):**

```
On A4 Track:
1. Parametric EQ:
   - High pass: 100Hz
   - Boost: +3dB at 3-5kHz (clarity)
   - De-ess: -4dB at 6-8kHz

2. Compressor:
   - Ratio: 3:1
   - Threshold: -18dB
   - Attack: 10ms
   - Release: 100ms
   - Makeup gain: +3dB

3. De-esser:
   - Frequency: 6-9kHz
   - Reduction: 6dB

4. Reverb (optional, subtle):
   - Small room preset
   - Mix: 8-10%
```

---

## TRANSITIONS & EFFECTS

### Standard Transitions Used

**Cross Dissolve (Most Common):**
```
Used between:
- Opening split → Satellite zoom (0:02.0)
- Logo → Landing page (0:07.0)
- Most scene changes in tech section

Settings:
- Duration: 0.3-0.5 seconds
- Alignment: Center at cut
- Ease: Standard (or ease in/out for smoother feel)
```

**Page Wipe (For UI Steps):**
```
Used between job posting steps (0:23.0, 0:27.0)

Settings:
- Direction: Left to right
- Duration: 0.3s
- Feather: 10%
- OR use custom gradient wipe
```

**Scale Transition (Mobile ↔ Desktop):**
```
0:30.0 (Desktop → Mobile):
- Previous clip: Scale down to 50% + fade out
- New clip: Scale up from 80% + fade in
- Overlap: 0.3s
- Creates focus shift effect

0:42.0 (Mobile → Desktop):
- Reverse of above
```

**Zoom Blur Transition (Optional):**
```
Between major sections (e.g., Features → Tech):
0:44.5-0:45.0:
- Use directional blur increasing
- Scale up outgoing clip (100% → 110%)
- Scale down incoming clip (110% → 100%)
- Blur: 0 → 50 → 0
- Creates "whoosh" effect
```

### Special Effects

**Screen Glows (Interactive Elements):**
```
When buttons are clicked or UI elements activated:
- Add small ellipse shape on V5
- Gaussian blur: 20-30px
- Color: Blue (#2563eb) or Green (#10b981)
- Opacity: 60%
- Scale animation: 100% → 120% → 100% (0.3s)
- Position: Track button location
```

**Text Animation Presets:**
```
Create reusable Essential Graphics template:

"Lower Third - Tech Style":
- Background: Rounded rectangle (#0f172a, 80% opacity)
- Text: Inter SemiBold, 20pt, White
- Animation in: Slide from left + fade (0.5s)
- Animation out: Fade only (0.3s)
- Save as Motion Graphics Template
```

**Confetti Particle Overlay:**
```
When job posts successfully (0:29.5):
- Overlay particle footage or generate in AE
- Place on V5
- Duration: 1 second
- Blend mode: Add or Screen
- Opacity: 70%
```

---

## RENDERING & EXPORT

### Export Settings (Primary - Web/Social Media)

**Adobe Premiere Pro:**
```
File > Export > Media (Cmd+M / Ctrl+M)

Format: H.264
Preset: YouTube 1080p Full HD

Video Settings:
- Resolution: 1920×1080
- Frame Rate: 30fps
- Field Order: Progressive
- Aspect: Square Pixels (1.0)
- Profile: High
- Level: 4.2
- Bitrate Encoding: VBR, 1 pass
- Target Bitrate: 10 Mbps
- Maximum Bitrate: 12 Mbps

Audio Settings:
- Format: AAC
- Sample Rate: 48000 Hz
- Channels: Stereo
- Bitrate: 320 kbps

Effects:
- Use Maximum Render Quality: ✓
- Render at Maximum Depth: ✓

Output Name: Aerial_Estimate_Marketing_Video_1080p.mp4
```

**Quality Check Settings:**
```
Use previews: Unchecked (force full re-render)
Use Maximum Render Quality: Checked (better scaling)
Render at Maximum Depth: Checked (better color)
```

### Alternative Export Formats

**High-Quality Master (for archival):**
```
Format: QuickTime
Codec: ProRes 422 HQ
Resolution: 1920×1080
Frame Rate: 30fps
Audio: Linear PCM, 48kHz, 24-bit

File size: ~5-8 GB
Use for: Future re-edits, quality preservation
```

**Vertical Version (Instagram/TikTok):**
```
New Sequence:
- Resolution: 1080×1920 (9:16)
- Reframe all shots for vertical
- Use "Auto Reframe" sequence in Premiere

Export:
- Same H.264 settings as primary
- Resolution: 1080×1920
- Bitrate: 8 Mbps (slightly lower for mobile)

Output: Aerial_Estimate_Vertical_1080x1920.mp4
```

**Square Version (Twitter/LinkedIn):**
```
New Sequence:
- Resolution: 1080×1080 (1:1)
- Center-crop main content
- Adjust text positions for square frame

Export:
- Same H.264 settings
- Resolution: 1080×1080

Output: Aerial_Estimate_Square_1080x1080.mp4
```

**YouTube Extended Version (with outro):**
```
Add 15-second end screen to timeline:
- Total duration: 90 seconds
- Last 15s: Static end screen with YouTube elements
- Add end screen template elements

Export: Same as primary settings
Duration: 1:30 (90 seconds)
```

---

## DELIVERY CHECKLIST

### Pre-Export Checks

**Video:**
- [ ] All clips are at maximum quality (no proxies)
- [ ] No missing media warnings
- [ ] Color grading applied consistently
- [ ] No unintended gaps in timeline
- [ ] All transitions render smoothly
- [ ] Text is readable at all sizes
- [ ] Logo is high resolution and clear

**Audio:**
- [ ] Voiceover is clear and intelligible
- [ ] Music is not too loud (doesn't overpower VO)
- [ ] No audio clipping (check waveforms)
- [ ] All sound effects are present
- [ ] Audio sync is perfect throughout
- [ ] Final loudness: -14 LUFS ±1

**Timing:**
- [ ] Total duration: 75 seconds (1:15)
- [ ] Voiceover syncs with visuals
- [ ] All animations complete before cuts
- [ ] Pacing feels natural (not rushed or slow)

### Post-Export Checks

**Technical Quality:**
- [ ] File plays without errors
- [ ] No visual artifacts or compression issues
- [ ] Colors appear accurate on multiple screens
- [ ] Audio is synchronized throughout
- [ ] File size is reasonable (<200 MB for 1080p)

**Content Review:**
- [ ] All text is spelled correctly
- [ ] Brand colors match guidelines
- [ ] Logo is current version
- [ ] GitHub URL is correct
- [ ] No placeholder text left in
- [ ] All required elements present

**Platform Testing:**
- [ ] Plays on YouTube
- [ ] Plays on LinkedIn
- [ ] Plays on Twitter/X
- [ ] Plays on mobile devices
- [ ] Thumbnail displays correctly
- [ ] Captions/subtitles work (if added)

---

## ALTERNATIVE WORKFLOWS

### DaVinci Resolve Timeline

**If using Resolve instead of Premiere:**

```
Same timeline structure applies

Key differences:
- Color grading: Use Color page instead of Lumetri
- Text: Use Fusion for advanced text animations
- Audio: Fairlight page for mixing

Export (Deliver page):
- Format: MP4
- Codec: H.264
- Resolution: 1920×1080
- Frame rate: 30
- Quality: Automatic or 10,000 kb/s
```

### Final Cut Pro Timeline

**If using FCPX:**

```
Create Compound Clips for each segment
Use Multicam for alternative takes
Color grading: Use Color Board or Color Curves

Export:
- Share > Master File (ProRes)
- Then compress to H.264 with Compressor app

Or direct export:
- Share > Apple Devices 1080p
- Custom settings for bitrate
```

---

## BACKUP & PROJECT MANAGEMENT

### Save Project Versions

```
Save incremental versions throughout edit:
- Aerial_Estimate_V1_Rough_Cut.prproj
- Aerial_Estimate_V2_With_Audio.prproj
- Aerial_Estimate_V3_Color_Graded.prproj
- Aerial_Estimate_V4_Final.prproj

Keep all versions until delivery confirmed
```

### Project Archive

**After final delivery:**
```
File > Project Manager (Premiere)

Options:
- Collect Files and Copy to New Location: ✓
- Include Handles: 30 frames
- Rename Media Files to Match Clip Names: ✓
- Convert Image Sequences to Clips: ✓
- Exclude Unused Clips: ✓ (if confident)

Result: Self-contained project folder
Size: ~50-100 GB (with all media)
Archive: Zip and upload to cloud storage
```

---

## FINAL OUTPUT FILES

### Deliverables Package

```
📁 DELIVERY_PACKAGE/
├── 📄 Aerial_Estimate_Marketing_Video_1080p.mp4 (Primary - 16:9)
├── 📄 Aerial_Estimate_Vertical_1080x1920.mp4 (Instagram/TikTok)
├── 📄 Aerial_Estimate_Square_1080x1080.mp4 (Twitter/LinkedIn)
├── 📄 Aerial_Estimate_Extended_90s.mp4 (YouTube with outro)
├── 📄 Aerial_Estimate_Master_ProRes.mov (Archival master)
├── 📄 Aerial_Estimate_Thumbnail_1920x1080.jpg (5 variations)
├── 📄 Aerial_Estimate_Thumbnail_1080x1920.jpg (Vertical)
└── 📄 Aerial_Estimate_Captions.srt (Subtitles file)
```

### Thumbnail Images

**Export 5 frames as JPG for thumbnail options:**
```
Timestamps to export:
- 0:05 (Logo reveal)
- 0:15 (Aerial map view)
- 0:30 (Mobile app)
- 0:58 (Metrics dashboard)
- 1:11 (End screen with CTA)

Settings:
- Format: JPEG
- Quality: Maximum (100%)
- Resolution: 1920×1080
- Add slight vignette and increase saturation +10%
```

---

## TROUBLESHOOTING COMMON ISSUES

**Issue: Playback is laggy/choppy**
```
Solution:
- Create proxies for high-res screen recordings
- Lower playback resolution to 1/2 or 1/4
- Render preview files for complex sections
- Close other applications
```

**Issue: Audio is out of sync**
```
Solution:
- Ensure sequence frame rate matches source footage
- Check for variable frame rate footage (re-encode to CFR)
- Unlink and manually adjust audio position
- Use "Synchronize" feature if available
```

**Issue: Colors look different after export**
```
Solution:
- Match sequence color space to export settings
- Use sRGB color space throughout
- Check "Use Maximum Render Quality" is enabled
- View export on same monitor as editing
```

**Issue: File size is too large**
```
Solution:
- Reduce bitrate to 8 Mbps (acceptable quality)
- Use 2-pass encoding for better compression
- Ensure frame rate is 30fps (not 60fps)
- Check audio bitrate isn't excessive (320 kbps max)
```

**Issue: Text is blurry**
```
Solution:
- Ensure text layers are at sequence resolution
- Don't scale text >100% in timeline
- Use "Continuous Rasterization" if available
- Export at native 1920×1080 (don't upscale)
```

---

## POST-PRODUCTION CHECKLIST

**Final Steps Before Delivery:**

- [ ] Watch entire video 3 times on different devices
- [ ] Check audio on headphones, laptop speakers, and phone
- [ ] Verify all text is readable on mobile screen
- [ ] Confirm brand colors match guidelines
- [ ] Test video on target platforms (YouTube, LinkedIn, etc.)
- [ ] Get feedback from 2-3 people
- [ ] Make any final minor adjustments
- [ ] Export all required formats
- [ ] Upload to cloud storage for client/team access
- [ ] Create backup of entire project
- [ ] Archive source files

**Delivery Assets:**
- [ ] Primary video (1080p 16:9)
- [ ] Vertical variant (1080x1920)
- [ ] Square variant (1080x1080)
- [ ] Master ProRes file
- [ ] 5 thumbnail options
- [ ] Caption/subtitle file (SRT)
- [ ] Project file (for future edits)

---

**This editing timeline provides complete assembly instructions for the 75-second marketing video. Follow section by section for professional results.**

**Estimated editing time: 8-12 hours (not including rendering)**

**Total project time (including motion graphics): 20-25 hours**

**Result: Broadcast-quality marketing video showcasing the complete Aerial Estimate platform.**
