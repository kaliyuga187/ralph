# Motion Graphics Specifications
## Aerial Estimate Marketing Video - Complete Animation Guide

**Software:** Adobe After Effects 2024 (or Premiere Pro + templates)
**Project Resolution:** 1920x1080, 30fps
**Duration:** 75 seconds
**Style:** Clean, modern, tech-forward

---

## BRAND GUIDELINES

### Color Palette

**Primary Colors:**
```
Blue Primary:    #2563eb  RGB(37, 99, 235)   - Trust, technology
Green Success:   #10b981  RGB(16, 185, 129)  - Growth, completion
Amber Accent:    #f59e0b  RGB(245, 158, 11)  - Energy, attention
```

**Neutral Colors:**
```
Slate 900:       #0f172a  RGB(15, 23, 42)    - Dark backgrounds
Slate 700:       #334155  RGB(51, 65, 85)    - Secondary text
Slate 400:       #94a3b8  RGB(148, 163, 184) - Subtle elements
White:           #ffffff  RGB(255, 255, 255) - Clean backgrounds
```

**Gradients:**
```
Primary Gradient:    Linear #2563eb → #3b82f6 (45°)
Success Gradient:    Linear #10b981 → #34d399 (45°)
Dark Gradient:       Linear #0f172a → #1e293b (135°)
```

### Typography

**Primary Font: Inter**
- Download: https://fonts.google.com/specimen/Inter
- Weights: Regular (400), Medium (500), SemiBold (600), Bold (700), Black (900)
- Use: All UI text, overlays, captions

**Monospace Font: JetBrains Mono**
- Download: https://fonts.google.com/specimen/JetBrains+Mono
- Weight: Regular (400), Medium (500)
- Use: Code snippets, technical text

**Font Sizes (1080p):**
```
Hero Headlines:      48-72pt (Inter Bold/Black)
Section Headers:     32-42pt (Inter Bold)
Body Text:           18-24pt (Inter Medium)
Captions:            14-16pt (Inter Regular)
Code:                16-18pt (JetBrains Mono)
```

### Logo Specifications

**Aerial Estimate Logo:**
```
Primary Version:  Full color on white/light backgrounds
Reversed Version: White on dark backgrounds
Icon Only:        For small sizes or app icon representation

Spacing:          Minimum clear space = height of "A" in "Aerial"
Minimum Size:     120px width for readability
```

**Logo Elements:**
- Wordmark: "AERIAL ESTIMATE" in Inter Bold
- Icon: Stylized house/roof with aerial view lines
- Color: Primary Blue (#2563eb) for icon, Slate 900 for text

---

## MOTION GRAPHICS ASSETS

### 1. OPENING SPLIT SCREEN (Shot 1A: 0:00-0:02)

**After Effects Composition: "01_Opening_Split"**

**Setup:**
```
Comp Name: 01_Opening_Split
Duration: 2 seconds
Size: 1920x1080, 30fps
```

**Layers (top to bottom):**
```
1. Text_Problem          [Text Layer]
2. Divider_Line          [Shape Layer]
3. Vignette_Overlay      [Adjustment Layer]
4. Left_Footage          [Video]
5. Right_Footage         [Video]
6. Background_Dark       [Solid]
```

**Layer 1: Text_Problem**
```
Text: "Finding local contractors..."
Font: Inter Bold, 48pt
Color: White (#ffffff)
Position: Center (960, 540)

Animation:
- 0:00.5 - Fade in (0% → 100% opacity, 0.5s)
- 0:01.5 - Morph to: "...shouldn't be this hard."
- Color shift: White → Red (#ef4444)
- Scale pulse: 100% → 105% → 100% (0.3s)

Effects:
- Drop Shadow: 4px offset, 8px blur, 50% opacity
- Glow (subtle): 2px, 20% opacity
```

**Layer 2: Divider_Line**
```
Shape: Rectangle (4px width, 1080px height)
Color: White (#ffffff), 40% opacity
Position: Center X (960), Full height

Animation:
- 0:00 - Scale Y from 0% → 100% (0.5s, ease out)
- Position: Static at center
```

**Layer 3: Vignette_Overlay**
```
Effect: Vignette
- Amount: 30%
- Midpoint: 50%
- Roundness: 50%
```

**Layers 4-5: Video Footage**
```
Left_Footage: Frustrated homeowner (desaturated 70%)
Right_Footage: Contractor in truck (desaturated 70%)

Scale: Both zooming slowly (100% → 110% over 2s)
```

**Export:**
- Comp duration: 2 seconds
- Pre-render with alpha: No (full frame)

---

### 2. SATELLITE ZOOM (Shot 1B: 0:02-0:05)

**After Effects Composition: "02_Satellite_Zoom"**

**Setup:**
```
Comp Name: 02_Satellite_Zoom
Duration: 3 seconds
```

**Layers:**
```
1. Pin_Drop             [Shape Layer + Animation]
2. Reticle_Target       [Shape Layer]
3. Mapbox_Footage       [Video or Image Sequence]
```

**Layer 1: Pin_Drop**
```
Shape: Custom pin icon
- Head: Circle 24px
- Tail: Triangle pointing down
- Color: Red (#ef4444) with white border

Animation:
- 0:02.5 - Not visible
- 0:02.5 - Scale from 200% → 100% with bounce
          Position from Y:300 → Y:540 (bounce ease)
- 0:03.0 - Subtle pulse (100% → 110% → 100%, loop)

Effects:
- Drop Shadow: 8px offset, 12px blur
```

**Layer 2: Reticle_Target**
```
Shape: Circular targeting reticle
- Outer ring: 120px diameter, 4px stroke
- Inner crosshair: 40px, 2px stroke
- Color: Cyan (#06b6d4), 80% opacity

Animation:
- 0:02.0 - Fade in + rotate continuously (360°/2s)
- 0:02.0-0:04.0 - Scale pulse (90% → 100% → 90%)
- 0:04.0 - Lock animation: Scale snap to 100%, glow pulse

Effects:
- Glow: Cyan, 8px spread, 60% opacity
```

**Layer 3: Mapbox_Footage**
```
Source: Screen recording or Google Earth Studio
- Start: Earth view (zoom 3)
- End: Rooftop aerial (zoom 18)

Add these elements in AE:
- Slight motion blur (180° shutter)
- Sharpen filter (+20%) on final frame
```

**Export:**
- 3 seconds
- Include zoom sound cues in markers

---

### 3. LOGO REVEAL (Shot 2A: 0:05-0:07)

**After Effects Composition: "03_Logo_Reveal"**

**Layers:**
```
1. Tagline_Text         [Text Layer]
2. Logo_Icon            [Vector/Shape Layer]
3. Logo_Wordmark        [Text Layer]
4. Glow_BG              [Shape Layer]
5. White_Background     [Solid]
```

**Layer 1: Tagline_Text**
```
Text: "Connect. View. Hire."
Font: Inter Regular, 24pt
Color: Slate 700 (#334155)
Position: Below logo (960, 680)

Animation:
- 0:06.0 - Slide up from Y:720 to Y:680 (0.5s, ease out)
- 0:06.0 - Fade in 0% → 100%
```

**Layers 2-3: Logo Animation**
```
Combined animation (icon + wordmark):
- 0:05.0 - Scale: 80% → 100% (elastic ease out, 0.8s)
- 0:05.0 - Rotation: -5° → 0° (sync with scale)
- 0:05.0 - Opacity: 0% → 100% (0.5s)
- 0:05.3 - Subtle bounce at end

Anchor point: Center of logo
```

**Layer 4: Glow_BG**
```
Shape: Circle behind logo
- Radius: 300px
- Color: Blue (#2563eb), 10% opacity
- Blur: Gaussian 40px

Animation:
- 0:05.0 - Scale: 0% → 100% (1s, ease out)
- 0:05.5 - Pulse: 100% → 110% → 100% (loop)
```

**Export:**
- 2 seconds
- Alpha channel: No (white background)

---

### 4. DASHBOARD SPLIT SCREEN (Shot 2C: 0:10-0:15)

**After Effects Composition: "04_Dashboard_Split"**

**Layers:**
```
1. Label_Client          [Text]
2. Label_Contractor      [Text]
3. Glow_Left            [Shape Layer]
4. Glow_Right           [Shape Layer]
5. Divider_Line         [Shape Layer]
6. Client_Footage       [Video]
7. Contractor_Footage   [Video]
```

**Layer 5: Divider_Line**
```
Shape: Rounded rectangle
- Width: 8px
- Height: 1080px
- Color: White (#ffffff), 80% opacity
- Position: Center X (960)

Animation:
- 0:10.0 - Height from 0 → 1080px (0.3s, ease out)

Effects:
- Glow: White, 8px spread
- Drop Shadow: Both sides, 4px blur
```

**Layers 1-2: Labels**
```
CLIENT VIEW / CONTRACTOR VIEW
Font: Inter SemiBold, 20pt
Color: White with semi-transparent dark background

Animation:
- 0:10.3 - Fade in + slide down from Y:-30 to Y:60
- Background: Rounded rectangle, dark (#0f172a), 80% opacity
```

**Layers 6-7: Video Panels**
```
Client_Footage: Positioned left (0 to 952)
Contractor_Footage: Positioned right (968 to 1920)

Animation:
- 0:10.2 - Slide in from sides
  - Left panel: X:-960 → X:0 (ease out)
  - Right panel: X:1920 → X:960 (ease out)
- Duration: 0.5s

Mask: 8px rounded corners
```

**Layers 3-4: Glows**
```
Glow on active UI elements within footage
- When button clicked: Pulse effect
- Color: Blue (#2563eb), 60% opacity
- Size: 120% of element size
- Blur: 20px

Track mattes: Use masks for specific elements
```

**Export:**
- 5 seconds
- Sync with screen recordings

---

### 5. MAPBOX AERIAL PROPERTY VIEW (Shot 2D: 0:15-0:20)

**After Effects Composition: "05_Aerial_Property"**

**Layers:**
```
1. Info_Card            [Pre-comp]
2. Distance_Line        [Shape Layer + Animation]
3. Marker_Pulse         [Shape Layer]
4. Mapbox_Footage       [Video]
```

**Layer 1: Info_Card (Pre-comp)**

Create nested comp: "Info_Card_Content"
```
Size: 400px × 300px

Elements:
- Background: White rounded rectangle, shadow
- Title: "ROOFING REPAIR" (Inter Bold, 18pt)
- Budget: "$5,000" (Inter SemiBold, 24pt, Blue)
- Distance: "2.3 mi away" (Inter Medium, 16pt, Slate 700)
- Icon: Service type icon (32px)

Animation (in main comp):
- 0:17.0 - Slide from right: X:2200 → X:1600
- 0:17.0 - Fade in: 0% → 100%
- 0:17.0 - Scale: 95% → 100% (ease out)
```

**Layer 2: Distance_Line**
```
Shape: Dashed line from marker to info card
- Stroke: 3px, Blue (#2563eb)
- Dash: 10px, Gap: 5px
- Opacity: 60%

Animation:
- 0:17.5 - Draw on: Trim Paths 0% → 100% (0.5s)
- Loop: Dash offset animates (creates moving ants effect)
```

**Layer 3: Marker_Pulse**
```
Shape: Circle around property pin
- Radius: 40px → 60px
- Stroke: 4px, Blue (#2563eb)
- Fill: None
- Opacity: 60% → 0%

Animation:
- Loop (1s duration, infinite):
  - Scale: 100% → 150%
  - Opacity: 60% → 0%
  - 3 pulses at different offsets (ripple effect)
```

**Layer 4: Mapbox_Footage**
```
Video: Rotating aerial view
- Add subtle zoom: 100% → 105% over 5s

Effects to add in AE:
- Sharpen: +15%
- Color correction: +10% saturation, +5% contrast
```

**Export:**
- 5 seconds

---

### 6. MOBILE PHONE FRAME (Shots 3D-3F: 0:30-0:42)

**After Effects Composition: "06_Mobile_Frame"**

**Setup:**
- Create reusable phone mockup comp
- Device: iPhone 14 Pro (390×844 content)
- Frame: Bezels, notch, rounded corners

**Layers:**
```
1. Screen_Reflection    [Gradient Layer]
2. Phone_Frame          [PNG or Shape]
3. Screen_Content       [Pre-comp placeholder]
4. Phone_Shadow         [Shape Layer]
```

**Layer 1: Screen_Reflection**
```
Gradient overlay (simulate screen glass):
- Type: Linear
- Angle: 45°
- Colors: White 0% → Transparent 50% → White 0%
- Opacity: 5%
- Blend Mode: Screen
```

**Layer 2: Phone_Frame**
```
iPhone 14 Pro mockup:
- Bezel: Black, 8px rounded corners
- Notch: Dynamic Island cutout
- Buttons: Side volume, power (subtle detail)

Source options:
1. Use Mockuuups Studio (free)
2. Facebook Design Devices
3. Custom shape layers
```

**Layer 4: Phone_Shadow**
```
Drop shadow beneath phone:
- Offset: Y: +20px
- Blur: 40px
- Opacity: 30%
- Color: Black
```

**Animation (when phone appears):**
```
- 0:30.0 - Scale: 0% → 100% (0.5s, back ease out)
- 0:30.0 - Rotation Y: 10° → 0° (3D layer, subtle)
- 0:30.0 - Opacity: 0% → 100%
```

**Screen_Content Placeholder:**
- Drag screen recording footage here
- Size: 390×844 (exact iPhone screen)
- Mask: Rounded corners to match frame

**Export:**
- Reusable template
- Replace Screen_Content for each shot

---

### 7. TECH STACK VISUALIZATION (Shot 4A: 0:45-0:50)

**After Effects Composition: "07_Tech_Stack"**

**Complex animation - Detailed breakdown:**

**Setup:**
```
Comp Name: 07_Tech_Stack
Duration: 5 seconds
Background: Dark Gradient (#0f172a → #1e293b)
```

**Background Grid:**
```
Layer: Grid_Lines [Shape Layer]
- Lines: 40px spacing, both horizontal and vertical
- Color: White, 5% opacity
- Animation: Subtle scrolling (slow parallax)
```

**Main Layers:**
```
1. Labels_Text          [Text layers for each tech]
2. Particles_Flow       [Particle system or shape emitters]
3. Connections_Lines    [Shape layers - animated strokes]
4. Tech_Logos_Tier2     [Image/Vector layers]
5. Tech_Logos_Tier1     [Image/Vector layers]
6. NextJS_Center        [Image/Vector - main hub]
7. Glow_Effects         [Adjustment layers]
8. Grid_Background      [Shape layer]
9. Dark_BG              [Solid gradient]
```

**Layer 6: NextJS_Center (Hub)**
```
Logo: Next.js icon (SVG)
Size: 120px × 120px
Position: Center (960, 540)

Animation:
- 0:45.0 - Scale: 0% → 100% (elastic ease, 0.8s)
- 0:45.5 - Glow pulse appears
- 0:45.0-0:50.0 - Rotate: 0° → 360° (slow continuous)

Effects:
- Glow: Blue (#2563eb), 20px spread, 60% opacity, pulse
- Drop Shadow: 8px blur, 40% opacity
```

**Layer 5: Tech_Logos_Tier1**
```
Four logos positioned around Next.js:
1. Supabase (Right, 300px from center)
2. Mapbox (Left, 300px from center)
3. React Native (Top, 300px from center)
4. Vercel (Bottom, 300px from center)

Size: 80px × 80px each

Animation (each with 0.1s stagger):
- 0:46.0 - Fade in 0% → 100%
- 0:46.0 - Scale: 0% → 100% (back ease out)
- 0:46.0 - Slide from Next.js position to final position

Effects: Each logo has subtle glow in brand color
```

**Layer 4: Tech_Logos_Tier2**
```
Secondary logos connected to Tier 1:
- PostgreSQL (from Supabase)
- Satellite icon (from Mapbox)
- iOS + Android icons (from React Native)
- Globe icon (from Vercel)

Size: 60px × 60px

Animation:
- 0:48.0 - Appear with same scale/fade pattern
- Position: 200px from parent logo
```

**Layer 3: Connections_Lines**
```
Animated strokes connecting all logos:

Stroke settings:
- Width: 3px
- Color: Blue (#2563eb) to Green (#10b981) gradient
- Opacity: 60%

Animation:
- 0:46.5 - Trim Paths: 0% → 100% (0.5s, ease in-out)
- Draw from center (Next.js) outward to each Tier 1
- Then from Tier 1 to Tier 2

Add arrow heads:
- Shape: Triangle, 12px
- Animate along path with line
```

**Layer 2: Particles_Flow**
```
Method: Shape Layer with Repeater

Particle specs:
- Shape: Circle, 6px diameter
- Color: White to Blue gradient
- Opacity: 80% → 0% (fade out)

Animation:
- 0:47.0 - Start spawning particles
- Follow connection paths using expression:

  // Pseudo-code for particle path
  startPoint = [960, 540]; // Next.js position
  endPoint = [1260, 540];  // Supabase position

  progress = linear(time, 0, 1, 0, 100);
  x = linear(progress, 0, 100, startPoint[0], endPoint[0]);
  y = linear(progress, 0, 100, startPoint[1], endPoint[1]);

- Speed: 1 second per path
- Frequency: 3 particles/second per connection

Alternative: Use Particular plugin for easier particle control
```

**Layer 1: Labels_Text**
```
Text appears beside each logo:

Tier 1 Labels:
- "Full-Stack Framework" (Next.js)
- "Backend & Auth" (Supabase)
- "Aerial Imagery" (Mapbox)
- "Mobile Apps" (React Native)

Font: JetBrains Mono, 14pt
Color: Slate 400 (#94a3b8)

Animation:
- 0:49.0 - Fade + slide from logo position
- Type-on effect: Use expression or text animator
```

**Glow Pulse (0:49.0):**
```
All logos and connections pulse simultaneously:
- Glow increases: 20px → 30px (0.5s)
- Opacity: 60% → 100% → 60%
- Color shifts slightly brighter
- All elements in sync
```

**Expressions to use:**

```javascript
// Continuous rotation for Next.js
rotation = time * 20; // 20 degrees per second

// Glow pulse
freq = 2; // 2 pulses per second
amplitude = 10; // 10px variation
baseline = 20; // 20px base glow
baseline + Math.sin(time * freq * Math.PI * 2) * amplitude;

// Particle position along path (Bezier)
function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

progress = (time % 1); // Loop every 1 second
easedProgress = easeInOutCubic(progress);
// Apply to position
```

**Export:**
- 5 seconds
- Pre-render for smoother playback
- Alpha channel: No (dark background integrated)

---

### 8. CODE TYPING ANIMATION (Shot 4B: 0:50-0:53)

**After Effects Composition: "08_Code_Typing"**

**Layers:**
```
1. Function_Highlight   [Shape Layer - yellow box]
2. Cursor_Blink         [Shape Layer - white rectangle]
3. Code_Text            [Text Layer with animator]
4. Line_Numbers         [Text Layer]
5. Code_BG              [Shape Layer - editor background]
```

**Layer 5: Code_BG**
```
Shape: Rounded rectangle
- Size: 1600px × 900px
- Color: #1e1e1e (VS Code dark theme)
- Rounded corners: 12px
- Position: Centered

Effects:
- Drop Shadow: 20px blur, 60% opacity
- Inner glow: Subtle blue tint on edges
```

**Layer 4: Line_Numbers**
```
Text: "1\n2\n3\n4\n5\n6\n7\n8\n9"
Font: JetBrains Mono, 16pt
Color: #858585 (VS Code line number gray)
Position: Left aligned, 40px from BG left edge

Animation:
- Appear with code (no typing, instant)
- Active line highlights: Background color change
```

**Layer 3: Code_Text**
```
Full text content:
CREATE OR REPLACE FUNCTION calculate_distance(
  lat1 DECIMAL, lng1 DECIMAL,
  lat2 DECIMAL, lng2 DECIMAL
) RETURNS DECIMAL AS $$
DECLARE
  r DECIMAL := 3959; -- Earth radius
BEGIN
  RETURN (r * ACOS(...))
END;
$$ LANGUAGE plpgsql;

Font: JetBrains Mono, 16pt
Syntax highlighting colors:
- Keywords (CREATE, FUNCTION, RETURNS): #C586C0 (purple)
- Data types (DECIMAL): #4EC9B0 (teal)
- Strings: #CE9178 (orange)
- Comments: #6A9955 (green)
- Numbers: #B5CEA8 (light green)

Method 1 - Text Animator (easier):
1. Add Text Animator to layer
2. Animator 1 > Range Selector > Advanced
3. Keyframe Start: 0% at 0:50.0, 100% at 0:52.5
4. Animator Properties > Opacity: 0%
   (Reveals text by animating opacity from 0 to 100)

Method 2 - Expression (more control):
Use per-character delay:

In Source Text, use expression:
```javascript
// Type-on effect
charsPerFrame = 3; // Speed: 3 characters per frame at 30fps
totalChars = Math.floor(time * 30 * charsPerFrame);

text.substring(0, totalChars);
```

**Layer 2: Cursor_Blink**
```
Shape: Rectangle
- Size: 2px × 20px (vertical line)
- Color: White (#ffffff)
- Position: End of typed text

Animation:
- 0:50.0-0:52.5 - Position follows typing (expression to track text length)
- 0:52.5-0:53.0 - Blink animation: Opacity 100% → 0% → 100% (0.5s loop)

Expression for cursor position:
```javascript
// Pseudo-code: Track text width
textLayer = thisComp.layer("Code_Text");
textWidth = textLayer.sourceRectAtTime().width;
[40 + textWidth + 5, 450]; // X follows text width, Y static
```

**Layer 1: Function_Highlight**
```
Shape: Rounded rectangle behind function name
- Color: Yellow (#ffff00), 20% opacity
- Size: Fits "calculate_distance" text
- Rounded corners: 4px

Animation:
- 0:52.5 - Fade in (0% → 20% opacity, 0.3s)
- 0:53.0 - Fade out
```

**Additional Effects:**
- Scanline overlay (optional retro effect): 1px horizontal lines, 5% opacity, slow scroll
- Vignette: Darken edges slightly

**Export:**
- 3 seconds
- Ensure syntax colors are accurate

---

### 9. DATABASE SCHEMA DIAGRAM (Shot 4C: 0:53-0:56)

**After Effects Composition: "09_Database_Schema"**

**Layers:**
```
1. Shield_Icon          [Vector/Shape - security symbol]
2. Security_Text        [Text]
3. Relationship_Lines   [Multiple shape layers]
4. Table_Boxes          [Pre-comps for each table]
5. Grid_BG              [Shape layer]
```

**Layer 5: Grid_BG**
```
Same as tech stack background:
- Dark gradient
- Subtle grid lines
```

**Layer 4: Table_Boxes (9 pre-comps)**

Create pre-comp template: "Table_Box_Template"
```
Size: 280px × 120px

Elements:
- Background: White rounded rectangle, 12px corners
- Table name: Inter SemiBold, 20pt, top
- Key icon: Small key symbol if primary table
- Field list: Top 3 fields shown (12pt, gray)

Example for "profiles":
  ┌────────────────────┐
  │ 🔑 profiles        │
  │ ────────────────── │
  │ • id (UUID)        │
  │ • email (TEXT)     │
  │ • role (ENUM)      │
  └────────────────────┘

Shadow: 8px blur, 20% opacity
```

Duplicate and customize for each table:
- profiles
- trade_profiles
- jobs
- bids
- messages
- notifications
- reviews
- referrals
- job_images

**Positioning (node graph layout):**
```
profiles:        Center-left (500, 400)
trade_profiles:  Right of profiles (850, 400)
jobs:            Below profiles (500, 680)
bids:            Right of jobs (850, 680)
messages:        Bottom-left (300, 880)
notifications:   Bottom-center-left (550, 880)
reviews:         Bottom-center-right (800, 880)
referrals:       Bottom-right (1050, 880)
job_images:      Above jobs (500, 540)
```

**Animation for tables:**
```
Staggered appearance (0.1s between each):
- 0:53.0 - profiles (scale + fade)
- 0:53.1 - trade_profiles
- 0:53.2 - jobs
- 0:53.3 - job_images
- 0:53.4 - bids
- 0:53.5 - messages
- 0:53.6 - notifications
- 0:53.7 - reviews
- 0:53.8 - referrals

Each animation:
- Scale: 0% → 100% (back ease out, 0.3s)
- Opacity: 0% → 100%
- Slight rotation: -5° → 0°
```

**Layer 3: Relationship_Lines**

Create line for each foreign key relationship:
```
profiles → trade_profiles
profiles → jobs
jobs → bids
trade_profiles → bids
jobs → messages
profiles → notifications
jobs → reviews
profiles → referrals
jobs → job_images

Line style:
- Stroke: 3px, Blue (#2563eb)
- Arrow heads: Triangle, 16px at end
- Bezier curves (not straight lines)
```

**Animation:**
```
- 0:54.0 - Start drawing lines
- Trim Paths: 0% → 100% (0.5s per line)
- Stagger: 0.05s between each line
- Draw from parent to child table
```

**Data flow particles (optional):**
```
Small dots that travel along relationship lines:
- Size: 4px circles
- Color: Blue (#2563eb), 80% opacity
- Speed: 1 second per path
- Loop continuously from 0:54.5 onward
```

**Layer 1-2: Security Shield**
```
Shield_Icon:
- Vector shield symbol (SVG)
- Size: 80px × 80px
- Color: Green (#10b981)
- Position: Center (960, 540) - overlays schema

Security_Text:
- "🛡️ Row Level Security"
- Font: Inter Bold, 22pt
- Below shield

Animation:
- 0:55.5 - Scale from 0% → 100% (back ease, 0.5s)
- Glow pulse effect
- Shield "shimmers" (gradient sweep across surface)
```

**Export:**
- 3 seconds
- Pre-render for performance

---

### 10. METRICS DASHBOARD (Shot 5A: 0:58-1:04)

**After Effects Composition: "10_Metrics_Dashboard"**

**Grid Layout (2×2):**

```
┌──────────────────┬──────────────────┐
│   Card_Stories   │   Card_Time      │
│    (0, 0)        │    (960, 0)      │
├──────────────────┼──────────────────┘
│   Card_Tech      │   Card_Value     │
│    (0, 540)      │    (960, 540)    │
└──────────────────┴──────────────────┘
```

**Pre-comp for each card: "Metric_Card"**
```
Size: 920px × 500px (with 20px margin)

Structure:
- Background: White rounded rectangle
- Icon: 64px, top-center
- Number: Large (72pt, Inter Black)
- Label: Below number (20pt, Inter Medium)
- Progress bar or animation element
```

**Card 1: User Stories**
```
Icon: Checkmark circle (Green)
Number: Counts 0 → 50
Label: "User Stories"
Sub: "100% Complete ✅"

Animation:
- 0:59.0 - Number counter with expression:

  Math.floor(linear(time, 0.5, 2, 0, 50));

- Progress bar below:
  - Width: 0% → 100% (synced with counter)
  - Color: Orange (#f59e0b) → Green (#10b981) gradient
  - Height: 12px, rounded

- Checkmark appears at 100%:
  - Draw animation (SVG path)
  - Scale bounce
```

**Card 2: Build Time**
```
Icon: Clock/stopwatch
Number: Counts 0 → 60
Label: "Minutes"
Sub: "Build Time ⏱️"

Animation:
- 1:00.0 - Number counter (same expression, different target)
- Clock hands rotate (visual metaphor)
- Speedometer needle sweeps to "Fast" zone
```

**Card 3: Technologies**
```
Icon: Code brackets
Number: 9+
Label: "Technologies"
Sub: "Modern Stack"

Animation:
- 1:01.0 - Tech icons appear in circle formation:
  - 9 small icons (32px each)
  - Rotate into position
  - Each icon pops in with bounce (0.05s stagger)

Icons include: Next.js, React, TypeScript, Supabase,
               Mapbox, Stripe, Tailwind, PostgreSQL, Vercel
```

**Card 4: Total Value**
```
Icon: Dollar sign
Number: $50K-100K
Label: "Development Value"
Sub: "Market Equivalent"

Animation:
- 1:02.0 - Dollar signs "rain" from top (particle effect)
  - 20-30 "$" symbols
  - Fade in at top, fall with gravity
  - Opacity fades as they fall

- Number counter:
  - $0 → $50,000 → $100,000
  - Show range: "$50K - $100K"
  - Gold color (#f59e0b)

- Sparkles around number (small stars, random positions)
```

**Simultaneous Pulse (1:03.0):**
```
All 4 cards pulse together:
- Glow effect increases
- Slight scale: 100% → 102% → 100%
- Color brightness +10%
- Duration: 0.5s
- Creates "completion" feeling
```

**Shared animations across all cards:**
```
Card appearance:
- 0:58.5 - Stagger: 0.1s per card
- Scale: 95% → 100% (ease out)
- Opacity: 0% → 100%
- Slide from different directions:
  - Top-left: from top-left
  - Top-right: from top-right
  - Bottom-left: from bottom-left
  - Bottom-right: from bottom-right
```

**Expressions for counters:**

```javascript
// Counter expression for numbers
n = 0; // Change to target number
if (time < 0.5) {
  0
} else {
  Math.floor(linear(time, 0.5, 2.5, 0, n))
}

// For currency formatting
function formatCurrency(num) {
  if (num >= 1000) {
    return "$" + (num / 1000).toFixed(0) + "K";
  }
  return "$" + num;
}

// Apply to text source
n = Math.floor(linear(time, 0.5, 2.5, 0, 100000));
formatCurrency(n);
```

**Export:**
- 6 seconds
- Pre-render if particle effects are heavy

---

### 11. FEATURE CHECKLIST (Shot 5B: 1:04-1:08)

**After Effects Composition: "11_Feature_Checklist"**

**Layers:**
```
1. Checkmark_Animations [Shape layers for each ✓]
2. Text_Items            [Text layers for each feature]
3. Highlight_Flash       [Shape layer - green background]
4. List_Container        [Shape layer - white card]
```

**Layer 4: List_Container**
```
Shape: Rounded rectangle
- Size: 800px × auto (fits 12 items)
- Color: White with transparency (90%)
- Shadow: 16px blur, 30% opacity
- Rounded corners: 16px
- Position: Slightly right of center

Animation:
- 1:04.0 - Slide from right: X:2000 → X:1100 (0.5s, ease out)
```

**Layer 2: Text_Items**

12 feature lines:
```
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
```

Font: Inter Medium, 18pt
Color: Slate 900 (#0f172a)
Line height: 40px spacing

**Staggered animation (each line):**
```
Timing: 0.15s per item (12 items over 1.8s)

For each item (example Item 1):
- 1:04.2 - Text opacity: 0% → 100% (0.2s)
- 1:04.2 - Text slide: X:-20 → X:0 (0.2s)
```

**Layer 1: Checkmark_Animations**

For each checkbox:
```
Shape: Checkmark path (SVG)
- Color: Green (#10b981)
- Stroke: 3px
- Position: Left of each text item

Animation:
- Appears with text item
- Draw on: Trim Paths 0% → 100% (0.3s, ease in-out)
- Slight bounce at end: Scale 100% → 110% → 100%

Path coordinates for checkmark:
M 4 12 L 8 16 L 16 6
(Simple V-shaped check)
```

**Layer 3: Highlight_Flash**
```
Shape: Rounded rectangle behind current item
- Color: Green (#10b981), 15% opacity
- Size: Matches list item dimensions
- Rounded corners: 8px

Animation:
- Follows active item being checked
- Moves down list (Y position changes)
- When item checks: Brief flash (opacity 15% → 30% → 15%, 0.3s)
```

**Final state (1:07.5):**
```
- All items checked and visible
- Container scales to fit: Zoom out slightly (105% → 100%)
- Subtle pulse effect on entire list
```

**Export:**
- 4 seconds

---

### 12. NETWORK EFFECT MAP (Shot 6A: 1:08-1:11)

**After Effects Composition: "12_Network_Map"**

**Layers:**
```
1. Stats_Overlay        [Text layers with counters]
2. Data_Flow_Lines      [Shape layers with animated strokes]
3. Contractor_Pins      [Shape layers - green markers]
4. Property_Pins        [Shape layers - blue markers]
5. Mapbox_Base          [Image or video - aerial map]
```

**Layer 5: Mapbox_Base**
```
Source: Static satellite image or slow-pan video
- Area: Suburban neighborhood, 2-3 mile radius
- Zoom level: 14 (neighborhood scale)

Camera animation:
- 1:08.0-1:11.0 - Slow zoom out: Scale 100% → 80%
- 1:08.0-1:11.0 - Rotate: 0° → 15° (slight tilt)
```

**Layer 4: Property_Pins (10-15 pins)**
```
Shape: Map marker pin
- Color: Blue (#2563eb)
- Size: 32px height
- Icon: Small house symbol inside

Positions: Random but clustered in neighborhoods

Animation:
- 1:08.2 - Drop from top with stagger:
  - Start: Y position -100 (off-screen)
  - End: Y position on map
  - Bounce ease
  - 0.05s stagger between pins
  - Duration: 0.5s per pin

- After landing: Subtle float animation
  - Y position: ±3px sine wave
```

**Layer 3: Contractor_Pins (20-25 pins)**
```
Shape: Map marker pin
- Color: Green (#10b981)
- Size: 28px height
- Icon: Wrench/tool symbol inside

Positions: Spread throughout, some clustered

Animation:
- 1:08.5 - Fade in with pulse:
  - Opacity: 0% → 100%
  - Scale: 120% → 100% (ease out)
  - 0.04s stagger

- After appearing: Pulse effect
  - Scale: 100% → 110% → 100% (1s loop)
  - Glow: Green, 8px spread, pulse with scale
```

**Layer 2: Data_Flow_Lines**
```
Connections between contractor pins and nearby property pins:
- Total lines: 30-40 (multiple contractors → multiple properties)

Line styling:
- Stroke: 2px
- Color: Gradient from green (contractor) to blue (property)
- Opacity: 40%
- Slight glow: 2px blur

Animation:
- 1:09.0 - Draw lines:
  - Trim Paths: 0% → 100% (0.5s per line)
  - Stagger: 0.02s between lines
  - Creates "network connecting" effect

- 1:09.5 - Data flow particles:
  - Small circles (6px) travel along lines
  - Color: White, 80% opacity
  - Speed: 1s per path
  - 3 particles per line at different offsets (continuous flow)
  - Motion blur: Enabled

Expression for particle position along path:
```javascript
// Follow path from contractor to property
pathPoints = [contractorPos, propertyPos];
progress = (time % 1); // Loop every 1 second
linear(progress, 0, 1, pathPoints[0], pathPoints[1]);
```

**Layer 1: Stats_Overlay**
```
Three stat boxes appear at 1:10.0:

Box positions:
- Top-right: "25 Active Contractors"
- Top-left: "47 Open Jobs"
- Bottom-center: "124 Bids Submitted"

Style:
- Background: Semi-transparent dark (#0f172a, 80%)
- Text: White, Inter SemiBold, 20pt
- Number: Larger, 28pt, colored (green/blue/amber)
- Rounded corners: 12px
- Padding: 16px

Animation:
- 1:10.0 - Fade + scale in (stagger 0.1s)
- Numbers count up from 0:

  Math.floor(linear(time, 1, 2, 0, targetNumber));
```

**Additional effects:**
```
- Vignette on edges (darken outer areas)
- Slight color grading: Increase saturation +15%
- Depth: Blur contractor pins slightly if far from focus
```

**Export:**
- 3 seconds
- High particle count - may need pre-render

---

### 13. END SCREEN / CALL TO ACTION (Shot 6B: 1:11-1:15)

**After Effects Composition: "13_End_Screen"**

**Layers:**
```
1. Social_Icons         [Vector icons - optional]
2. Checkmarks_List      [Text with checkmarks]
3. Attribution_Text     [Text - "Built with..."]
4. GitHub_Link          [Text with typewriter effect]
5. CTA_Button           [Shape + text - main button]
6. Tagline_Text         [Text]
7. Logo_Main            [Vector/PNG - Aerial Estimate logo]
8. Background_Gradient  [Solid gradient]
```

**Layer 8: Background_Gradient**
```
Type: Gradient solid
- Color 1: White (#ffffff) at top
- Color 2: Light blue (#eff6ff) at bottom
- Angle: 135°
- Clean, bright, professional feel
```

**Layer 7: Logo_Main**
```
Logo: Full Aerial Estimate logo
- Size: 400px width
- Position: Upper-center (960, 280)

Animation:
- 1:11.0 - Scale: 0% → 100% (elastic ease, 0.8s)
- 1:11.0 - Rotation: -15° → 0° (sync with scale)
- 1:11.5 - Slight float: Y position ±5px (subtle sine wave loop)
```

**Layer 6: Tagline_Text**
```
Text: "Launch Your Local Marketplace"
Font: Inter Bold, 36pt
Color: Slate 900 (#0f172a)
Position: Below logo (960, 400)

Animation:
- 1:12.0 - Slide up: Y:420 → Y:400 (0.5s, ease out)
- 1:12.0 - Fade in: 0% → 100%
```

**Layer 5: CTA_Button**
```
Button shape:
- Rounded rectangle: 480px × 80px
- Color: Blue (#2563eb)
- Rounded corners: 40px (pill shape)
- Position: (960, 540)

Button text:
- "View the Complete Code"
- Font: Inter SemiBold, 22pt
- Color: White

Animation:
- 1:12.5 - Scale: 0% → 100% (back ease out, 0.5s)
- 1:12.5 - Glow appears: Blue, 12px spread
- 1:13.0-1:15.0 - Pulse loop:
  - Scale: 100% → 105% → 100% (1s)
  - Glow: 12px → 16px → 12px
  - Creates "click me" attention

Hover state (if interactive):
- Scale: 105%
- Glow: 16px
- Cursor: Pointer
```

**Layer 4: GitHub_Link**
```
Text: "github.com/username/ralph"
Font: JetBrains Mono, 20pt
Color: Blue (#2563eb)
Position: Below button (960, 640)

Animation:
- 1:13.0 - Typewriter effect:
  - Characters appear one by one (0.05s each)
  - Blinking cursor at end

Expression for typewriter:
```javascript
text = "github.com/username/ralph";
charsToShow = Math.min(Math.floor((time - 1) * 20), text.length);
text.substr(0, charsToShow);
```

- Underline appears (link styling):
  - Draw on from left to right (0.5s)
```

**Layer 3: Attribution_Text**
```
Text: "Built with Claude Code + Ralph AI Agent"
Font: Inter Regular, 16pt
Color: Slate 600 (#475569)
Position: Below GitHub link (960, 700)

Optional logos: Small Claude + Ralph icons beside text

Animation:
- 1:13.5 - Fade in: 0% → 100% (0.5s)
```

**Layer 2: Checkmarks_List**
```
Three key features:
✅ 50 User Stories Implemented
✅ Web + Mobile Apps
✅ Production-Ready Deployment

Font: Inter Medium, 18pt
Color: Slate 700
Position: Lower section (960, 800)
Layout: Vertical stack, 12px spacing

Animation:
- 1:14.0 - Items appear with stagger:
  - Each item: Fade in + slide from left
  - Checkmark draws on (same as Shot 5B)
  - 0.1s stagger between items
```

**Layer 1: Social_Icons (Optional)**
```
Small icons for sharing:
- GitHub
- Twitter/X
- LinkedIn
- Product Hunt

Size: 32px each
Position: Bottom-right corner
Color: Slate 400 (subdued)

Animation:
- 1:14.5 - Fade in together
- Hover states: Color shift to brand colors
```

**Final hold:**
```
- 1:15.0 - All elements visible
- Hold static for 3 seconds (total end screen: 7s)
- CTA button continues pulsing (draw attention)
```

**Optional animation for extended version:**
```
- Confetti burst at 1:14.0 (celebration)
- Particles fall from top (subtle)
- Color: Blue and green mix
- Opacity: 60%, fades as falls
```

**Export:**
- 4 seconds (animation)
- + 3 seconds (static hold)
- Total: 7 seconds
- Alpha channel: No (background integrated)

---

## GLOBAL SETTINGS & PREFERENCES

### After Effects Project Settings

**Project Structure:**
```
Project
├── 01_FOOTAGE
│   ├── Screen Recordings
│   ├── Stock Media
│   └── Logo Assets
├── 02_COMPS
│   ├── Main Compositions (Shots 1-13)
│   └── Sub-comps (Cards, Elements)
├── 03_PRE-RENDERS
│   └── Heavy compositions (particles, etc.)
└── 04_EXPORTS
    └── Final renders
```

**Composition Settings (Template):**
```
Resolution: 1920x1080
Frame Rate: 30fps
Duration: Variable per shot
Pixel Aspect Ratio: Square Pixels
Background: Black (unless specified)
```

**Preferences:**
```
Edit > Preferences > Previews:
- Resolution: Full
- Quality: Best
- Frame rate skip: 1 (preview every frame)

Edit > Preferences > Auto-Save:
- Save every 10 minutes
- Maximum projects: 20
```

### Rendering Settings

**Render Queue Settings:**
```
Format: QuickTime or PNG Sequence (for quality)
Codec: ProRes 422 or 4444 (if alpha needed)
Quality: 100%
Resolution: 1920x1080
Frame Rate: 30fps

Audio (if included):
- Codec: Linear PCM
- Sample Rate: 48kHz
- Bit Depth: 24-bit
```

**Export for Video Editor:**
```
If exporting individual shots:
- Format: QuickTime ProRes 422
- Include alpha if needed
- Label files: "AE_Shot01_Split_Screen.mov"

If exporting full video:
- Format: H.264 MP4
- Bitrate: 10 Mbps (high quality)
- Suitable for web and sharing
```

---

## MOTION GRAPHICS PLUGINS (Optional but Recommended)

**Essential Plugins:**

1. **Trapcode Particular** (Particles)
   - Better particle control for tech stack and network map
   - Price: $399 (or suite $999)
   - Alternative: Use native CC Particle World

2. **Element 3D** (3D Objects)
   - If you want to add 3D logo animations
   - Price: $199
   - Alternative: Native AE 3D layers

3. **Saber** (Light Effects) - FREE
   - Energy lines, glows, light streaks
   - Download: Video Copilot

4. **Optical Flares** (Lens Flares)
   - Professional glows and lens effects
   - Price: $125
   - Alternative: Native "Lens Flare" effect

**Helpful Freebies:**

- **Motion Bro** - Free preset browser
- **Flow** - Easy graph editor
- **Animation Composer** - Free presets
- **Bodymovin** - Export to Lottie (web animations)

---

## TEMPLATES & RESOURCES

**Where to Find Assets:**

**Icons:**
- https://heroicons.com/ (Free, matches style)
- https://fontawesome.com/ (Comprehensive)
- https://iconscout.com/ (Premium quality)

**Tech Logos:**
- Official brand asset pages:
  - Next.js: https://nextjs.org/brand
  - Supabase: https://supabase.com/brand-assets
  - Vercel: https://vercel.com/design
- Use official logos for accuracy

**Mockups:**
- iPhone frames: https://facebook.design/devices
- Mockuuups.studio (browser, phone mockups)
- Figma Community (free templates)

**Textures & Backgrounds:**
- Subtle Patterns: https://www.toptal.com/designers/subtlepatterns/
- CSS Gradient: https://cssgradient.io/
- Generate grids: Custom in AE with shape layers

---

## TROUBLESHOOTING COMMON ISSUES

**Issue: Previews are slow**
- Solution: Lower preview resolution to Half or Quarter
- Pre-render heavy comps (particles, many layers)
- Purge cache: Edit > Purge > All Memory & Disk Cache

**Issue: Colors look different after export**
- Solution: Ensure color management is consistent
  - File > Project Settings > Color: sRGB
  - Match video editor color space

**Issue: Text looks blurry**
- Solution:
  - Ensure comp resolution is 1920x1080
  - Continuously rasterize text layers
  - Don't scale text layers >100% in final comp

**Issue: Export file size is huge**
- Solution:
  - Use H.264 codec for final export (not ProRes)
  - Bitrate: 8-10 Mbps is sufficient for 1080p web
  - Audio: AAC 256kbps

**Issue: Particles/effects look choppy**
- Solution:
  - Increase frame rate to 60fps (export at 30fps)
  - Enable motion blur on fast-moving elements
  - Use "Pixel Motion Blur" effect for extreme smoothness

---

## FINAL CHECKLIST

**Before Starting:**
- [ ] Install fonts (Inter, JetBrains Mono)
- [ ] Download all logo assets
- [ ] Organize footage in project folders
- [ ] Create color swatch layer for easy reference

**During Production:**
- [ ] Save frequently (auto-save enabled)
- [ ] Preview at full resolution periodically
- [ ] Check alignment on pixel grid (avoid sub-pixel rendering)
- [ ] Test on both dark and light backgrounds

**Before Export:**
- [ ] Verify all timing markers sync with audio
- [ ] Check for typos in all text
- [ ] Ensure brand colors are accurate (use color picker)
- [ ] Preview entire comp at full quality
- [ ] Verify comp duration matches shot list

**After Export:**
- [ ] Watch exported video on different devices
- [ ] Check audio sync (if included)
- [ ] Verify colors match (especially on phone screens)
- [ ] Get feedback before finalizing

---

**These motion graphics specifications provide complete instructions for every animated element in the marketing video. Use this as a blueprint for After Effects production.**
