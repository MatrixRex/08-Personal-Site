# Design Specification: Matra Solarpunk-Mecha Portfolio

Highly animated, media-heavy, "Game UI" style personal portfolio for a 3D Generalist.

## 1. Visual Direction & Aesthetic
- **Theme**: "Solar-HUD" — A fusion of Solarpunk (lush greenery, bright skies) and blocky, sharp-edged Mecha (Gundam/Code Geass inspired).
- **Core Aesthetic**: Contrast between "soft" environment (grasslands, vast horizons) and "sharp" technology (Mecha Seed, persistent HUD).
- **Colors**:
  - `primary`: `#00E5FF` (Neon Cyan — Panel lines, Active states)
  - `secondary`: `#76FF03` (Lime Green — Nature, Growth)
  - `background`: `#FAFAFA` (Paper White — Clean, daylight feel)
  - `accent`: `#37474F` (Steel Grey — Mechanical structure)
- **Typography**:
  - `headers`: Sleek, modern Sans-serif (like Roboto or Inter).
  - `HUD`: Monospace (like JetBrains Mono or Fira Code) for technical elements.

## 2. Interaction Model
- **Layout**: Single-page horizontal slide-based flow (PowerPoint style).
- **Input**: Support for both horizontal scroll-trigger (snapping) AND deliberate click buttons on the HUD.
- **Micro-Animations**: "Genshin Impact Event UI" feel. Every button hover triggers a glint/scale/pulse. Transitions between slides use a cinematic "camera fly" feel or a sliding shutter effect.
- **Mobile**: Dynamic transition from horizontal slides to a vertical stacked bento layout.

## 3. Core Components

### A. The Mecha Seed (Hero)
- **Format**: Interactive 3D (React Three Fiber).
- **Visual**: A centerpiece diorama of a blocky, sharp-edged seed asset sitting in a field of Unity-style lush grass.
- **Animation**: 
  - Mouse-follow rotation for depth perception.
  - Scroll-triggered unfolding (panels open up as the user moves to the next slide).

### B. The Bento Portfolio Grid
- **Layout**: 4-column adaptive grid (Bento style).
- **Content Types**:
  - **3D Assets**: Renders/Videos with technical sidebars (polycount, pipe stats).
  - **Tech Tools**: Blender/Unity plugin clips + Download buttons.
  - **Web Sites**: High-res mockup renders + "Open Link" buttons.
- **Interaction**: "Zoom-to-Full" overlay with a detailed sidebar.

### C. The Solar-HUD (Header)
- **Format**: `position: fixed` top bar.
- **Attributes**: `backdrop-filter: blur(10px)`, 1px border, minimalist diagnostic text (e.g., `[ STATUS: READY ]`).
- **Navigation**: Quick-jump links to sections: `HOME`, `WORK`, `TECH_ART`, `TOOLS`, `ABOUT`.

## 4. Technical Stack
- **Framework**: Vite + React
- **3D Engine**: React Three Fiber (R3F) + Drei
- **Animation Engine**: Framer Motion (for UI and Layout transitions)
- **Styling**: Vanilla CSS (modular or global tokens)
- **Asset Optimization**: WebP/AVIF for images, compressed MP4 for videos, lazy loading for below-the-fold tiles.

## 5. UI/UX Rules (Pro Max Alignment)
- **Performance**: Stay within 100ms for interaction feedback.
- **Accessibility**: 
  - Ensure all colors meet 4.5:1 contrast (cyan on white might need careful tweaking or a dark stroke).
  - ARIA-labels for all HUD buttons.
  - Focus indicators for keyboard navigation.
- **Mobile-First**: The Bento grid must be perfectly readable and tappable (min 44x44px).

---
## Review Gate
- [x] Design approved by user in session `2026-04-07`.
- [ ] Technical implementation plan written.
- [ ] Coding commencement.
