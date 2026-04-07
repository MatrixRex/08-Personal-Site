# Matra Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a media-heavy, highly animated personal portfolio website with a Solarpunk-Mecha aesthetic featuring a 3D interactive hero section and horizontal "Genshin-style" slides.

**Architecture:** A Vite-powered React application using React Three Fiber for the 3D Hero and Framer Motion for the horizontal bento transitions. The persistent Solar-HUD navigation connects all sections.

**Tech Stack:** React, Vite, Three.js, @react-three/fiber, @react-three/drei, Framer Motion, Vanilla CSS.

---

### Task 1: Environment Setup & Scaffold
**Files:**
- Create: `./` (Vite scaffold)
- Modify: `package.json`
- Modify: `index.html`

- [ ] **Step 1: Initialize Vite Project**
Run: `npx -y create-vite@latest ./ --template react`
Expected: project scaffolded with React and Vite.

- [ ] **Step 2: Install dependencies**
Run: `npm install three @types/three @react-three/fiber @react-three/drei framer-motion lucide-react`
Expected: Dependencies added to node_modules.

- [ ] **Step 3: Update index.html for Solarpunk Meta**
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>MATRA | Solarpunk Mecha Portfolio</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 4: Commit**
```bash
git add .
git commit -m "chore: initial vite scaffold and dependencies"
```

### Task 2: Core Design System (CSS)
**Files:**
- Modify: `src/index.css`
- Modify: `src/App.css`

- [ ] **Step 1: Define Solarpunk Tokens**
```css
:root {
  --color-cyan: #00E5FF;
  --color-lime: #76FF03;
  --color-bg: #FAFAFA;
  --color-steel: #37474F;
  --color-hud-bg: rgba(255, 255, 255, 0.4);
  --color-hud-border: rgba(0, 229, 255, 0.3);
  
  --font-main: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  
  --hud-blur: blur(10px);
  --sharp-corner: 0px; /* Sharp corners for mecha feel */
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: var(--color-bg);
  color: var(--color-steel);
  font-family: var(--font-main);
  overflow-x: hidden; /* Controlled by horizontal scroll */
}
```

- [ ] **Step 2: Commit**
```bash
git add src/index.css
git commit -m "style: define solarpunk mecha design tokens"
```

### Task 3: The Solar-HUD Header
**Files:**
- Create: `src/components/Header.jsx`
- Create: `src/components/Header.css`

- [ ] **Step 1: Create Header component**
```javascript
import React from 'react';
import './Header.css';

export default function Header() {
  return (
    <header className="solar-hud">
      <div className="hud-id">[ MATRA_SYS_V1.0 ]</div>
      <nav className="hud-nav">
        <button onClick={() => window.scrollTo({ left: 0, behavior: 'smooth' })}>HOME</button>
        <button>3D_WORK</button>
        <button>TECH_ART</button>
        <button>TOOLS</button>
        <button>ABOUT</button>
      </nav>
      <div className="hud-status">[ STATUS: ONLINE ]</div>
    </header>
  );
}
```

- [ ] **Step 2: Style Header**
```css
.solar-hud {
  position: fixed;
  top: 1rem;
  left: 1rem;
  right: 1rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
  background: var(--color-hud-bg);
  backdrop-filter: var(--hud-blur);
  border: 1px solid var(--color-hud-border);
  z-index: 1000;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.1em;
}

.hud-nav {
  display: flex;
  gap: 2rem;
}

.hud-nav button {
  background: none;
  border: none;
  color: var(--color-steel);
  cursor: pointer;
  transition: all 0.2s;
}

.hud-nav button:hover {
  color: var(--color-cyan);
  text-shadow: 0 0 8px var(--color-cyan);
}
```

- [ ] **Step 3: Commit**
```bash
git add src/components/Header.jsx src/components/Header.css
git commit -m "feat: add persistent Solar-HUD navigation"
```

### Task 4: 3D Mecha Seed (Hero)
**Files:**
- Create: `src/components/MechaHero.jsx`
- Create: `src/components/Model.jsx`

- [ ] **Step 1: Create Scene container**
```javascript
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import Model from './Model';

export default function MechaHero() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [0, 2, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Suspense fallback={null}>
          <Model />
          <Environment preset="park" />
        </Suspense>
        <ContactShadows opacity={0.4} blur={2} />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}
```

- [ ] **Step 2: Create Placeholder Mecha Model (Blocky)**
```javascript
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export default function Model() {
  const meshRef = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.y = t * 0.2;
    meshRef.current.position.y = Math.sin(t) * 0.1;
  });

  return (
    <group ref={meshRef}>
      {/* Central Core */}
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#00E5FF" emissive="#00E5FF" emissiveIntensity={2} />
      </mesh>
      {/* Outer Shell Plates */}
      {[0, 1, 2, 3].map((i) => (
        <mesh key={i} position={[Math.cos(i * Math.PI/2) * 0.8, 0, Math.sin(i * Math.PI/2) * 0.8]} rotation={[0, -i * Math.PI/2, 0]}>
          <boxGeometry args={[0.2, 1.2, 0.8]} />
          <meshStandardMaterial color="#37474F" />
        </mesh>
      ))}
    </group>
  );
}
```

- [ ] **Step 3: Commit**
```bash
git add src/components/MechaHero.jsx src/components/Model.jsx
git commit -m "feat: add 3D Mecha Seed hero centerpiece"
```

### Task 5: Horizontal Slide Engine & App Assembly
**Files:**
- Modify: `src/App.jsx`
- Create: `src/components/SlideContainer.jsx`

- [ ] **Step 1: Set up Horizontal Container**
```javascript
import React from 'react';
import { motion } from 'framer-motion';
import MechaHero from './components/MechaHero';
import Header from './components/Header';
import './App.css';

export default function App() {
  return (
    <div className="app-container">
      <Header />
      <div className="horizontal-reel">
        <section className="slide hero-slide">
          <MechaHero />
          <div className="hero-content">
            <motion.h1 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              MATRA
            </motion.h1>
            <p>3D GENERALIST | TECH ARTIST</p>
          </div>
        </section>
        
        {/* Placeholders for Task 6/7 */}
        <section className="slide work-slide">
          <div className="bento-grid">
            {/* Bento tiles go here */}
          </div>
        </section>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Add essential horizontal CSS**
```css
.app-container {
  height: 100vh;
  overflow: hidden;
}

.horizontal-reel {
  display: flex;
  width: 500vw; /* 5 sections */
  height: 100vh;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
}

.slide {
  flex-shrink: 0;
  width: 100vw;
  height: 100vh;
  scroll-snap-align: start;
  position: relative;
}

.hero-content {
  position: absolute;
  bottom: 10%;
  left: 5%;
  pointer-events: none;
}

.hero-content h1 {
  font-size: 8rem;
  color: var(--color-cyan);
  line-height: 0.8;
}
```

- [ ] **Step 3: Commit**
```bash
git add src/App.jsx src/App.css
git commit -m "feat: implement horizontal slide engine"
```

### Task 6: The Bento Portfolio Component
**Files:**
- Create: `src/components/BentoGrid.jsx`
- Create: `src/components/BentoGrid.css`

- [ ] **Step 1: Implement Grid with Framer Motion Layout**
```javascript
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './BentoGrid.css';

const items = [
  { id: 1, title: 'Weapon Model', type: '3D Render', size: 'large' },
  { id: 2, title: 'Unity Tool', type: 'Automation', size: 'small' },
  { id: 3, title: 'Personal Site', type: 'Web', size: 'medium' },
  // ... more items
];

export default function BentoGrid() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="bento-container">
      <div className="grid">
        {items.map(item => (
          <motion.div 
            key={item.id} 
            layoutId={item.id}
            className={`tile ${item.size}`}
            onClick={() => setSelected(item)}
          >
            <h3>{item.title}</h3>
            <span>{item.type}</span>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div 
            layoutId={selected.id}
            className="fullscreen-overlay"
          >
            <div className="expanded-content">
              <div className="media-preview">
                {/* Large Video/Image Placeholder */}
                <div className="placeholder-media" />
              </div>
              <div className="sidebar">
                <h2>{selected.title}</h2>
                <p className="type">{selected.type}</p>
                <div className="technical-stats">
                  <span>Polycount: 12k</span>
                  <span>Textures: 2k PBR</span>
                </div>
                <div className="actions">
                  <button className="download-btn">Download Tool</button>
                  <a href="#" target="_blank" className="site-link">Open Site 🔗</a>
                </div>
                <button className="close-btn" onClick={() => setSelected(null)}>BACK</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
```

- [ ] **Step 2: Commit**
```bash
git add src/components/BentoGrid.jsx src/components/BentoGrid.css
git commit -m "feat: add bento grid with zoom-to-fullscreen logic"
```

### Task 7: Mobile Responsiveness & Polish
**Files:**
- Modify: `src/App.css`

- [ ] **Step 1: Add media queries for vertical stacking**
```css
@media (max-width: 768px) {
  .horizontal-reel {
    flex-direction: column;
    width: 100vw;
    height: auto;
    overflow-y: auto;
    scroll-snap-type: y mandatory;
  }
  
  .slide {
    scroll-snap-align: start;
    height: 100vh;
  }
  
  .hero-content h1 {
    font-size: 4rem;
  }
}
```

- [ ] **Step 2: Commit**
```bash
git add src/App.css
git commit -m "style: add mobile-responsive vertical stacking"
```
