import React, { Suspense, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FaLinkedin, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { Leva } from 'leva';
import MechaHero from './components/MechaHero';
import TerminalLog from './components/TerminalLog';
import './App.css';

function App() {
  const [times, setTimes] = useState({
    dhaka: '',
    newyork: '',
    dubai: '',
    milis: ''
  });

  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      setTimes({
        dhaka: new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Dhaka', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
        }).format(now),
        newyork: new Intl.DateTimeFormat('en-US', {
          timeZone: 'America/New_York', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
        }).format(now),
        dubai: new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Dubai', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
        }).format(now),
        milis: 'ACTV'
      });
    };

    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping:50, stiffness: 15 }; // Soft, smooth momentum
  const sX = useSpring(mouseX, springConfig);
  const sY = useSpring(mouseY, springConfig);

  // 3D Rotation transforms
  const rotX = useTransform(sY, y => -y * .15);
  const rotY = useTransform(sX, x => x * .15);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set((e.clientX - window.innerWidth / 2) / 30);
      mouseY.set((e.clientY - window.innerHeight / 2) / 30);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="coming-soon-wrapper">
      <Leva collapsed />

      {/* Dynamic Gradient Background Blobs */}
      <div className="gradient-bg">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      {/* Sci-Fi SVG Decorations */}
      <div className="tech-decorations">
        <div className="corner-bracket top-left-bracket"></div>
        <div className="corner-bracket top-right-bracket"></div>
        <div className="corner-bracket bottom-left-bracket"></div>
        <div className="corner-bracket bottom-right-bracket"></div>
        <div className="crosshair"></div>
        <div className="scanner-line"></div>
      </div>

      {/* Header */}
      <header className="main-header">
        <motion.div
          className="header-content"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 1, ease: "circOut" }}
        >
          <div className="logo">
            <span className="logo-main">MATRA</span>
            <span className="logo-sub">STUDIO</span>
          </div>
          <nav className="header-nav">
            <a href="#">WORKS</a>
            <a href="#">ABOUT</a>
            <a href="#">CONTACT</a>
          </nav>
        </motion.div>
      </header>

      {/* Background text (Behind everything) */}
      <motion.div 
        className="bg-text-container back" 
        style={{ 
          x: "-50%",
          y: "-50%",
          rotateX: rotX, 
          rotateY: rotY,
          transformStyle: 'preserve-3d' 
        }}
      >
        <svg style={{ position: 'absolute', width: 0, height: 0 }}>
          <defs>
            <filter id="perfect-outline" x="-20%" y="-20%" width="140%" height="140%">
              <feMorphology in="SourceGraphic" result="dilated" operator="dilate" radius="1.2"/>
              <feComposite in="dilated" in2="SourceAlpha" operator="out"/>
            </filter>
            <filter id="perfect-outline-thin" x="-20%" y="-20%" width="140%" height="140%">
              <feMorphology in="SourceGraphic" result="dilated" operator="dilate" radius="0.6"/>
              <feComposite in="dilated" in2="SourceAlpha" operator="out"/>
            </filter>
          </defs>
        </svg>

        {/* COMING block */}
        <div className="bg-text-group">
          {/* Layer 3 (Deepest) */}
          <motion.div className="layer-3-3d" style={{ transformStyle: 'preserve-3d', translateZ: -60, position: 'absolute' }}>
            <svg className="bg-text-svg" viewBox="0 0 1000 200">
              <text x="50%" y="60%" textAnchor="middle" className="bg-text-layer layer-3">COMING</text>
            </svg>
          </motion.div>
          
          {/* Layer 2 (Middle) */}
          <motion.div className="layer-2-3d" style={{ transformStyle: 'preserve-3d', translateZ: -30, position: 'absolute' }}>
            <svg className="bg-text-svg" viewBox="0 0 1000 200">
              <text x="50%" y="60%" textAnchor="middle" className="bg-text-layer layer-2">COMING</text>
            </svg>
          </motion.div>

          {/* Layer 1 (Solid Fill) */}
          <motion.div className="layer-1-3d" style={{ transformStyle: 'preserve-3d', translateZ: 0, position: 'absolute' }}>
            <svg className="bg-text-svg" viewBox="0 0 1000 200">
              <text x="50%" y="60%" textAnchor="middle" className="bg-text-layer layer-filled">COMING</text>
            </svg>
          </motion.div>
        </div>

        {/* SOON block */}
        <div className="bg-text-group">
          <motion.div className="layer-3-3d" style={{ transformStyle: 'preserve-3d', translateZ: -60, position: 'absolute' }}>
            <svg className="bg-text-svg" viewBox="0 0 1000 200">
              <text x="50%" y="60%" textAnchor="middle" className="bg-text-layer layer-3">SOON</text>
            </svg>
          </motion.div>
          
          <motion.div className="layer-2-3d" style={{ transformStyle: 'preserve-3d', translateZ: -30, position: 'absolute' }}>
            <svg className="bg-text-svg" viewBox="0 0 1000 200">
              <text x="50%" y="60%" textAnchor="middle" className="bg-text-layer layer-2">SOON</text>
            </svg>
          </motion.div>

          <motion.div className="layer-1-3d" style={{ transformStyle: 'preserve-3d', translateZ: 0, position: 'absolute' }}>
            <svg className="bg-text-svg" viewBox="0 0 1000 200">
              <text x="50%" y="60%" textAnchor="middle" className="bg-text-layer layer-filled">SOON</text>
            </svg>
          </motion.div>
        </div>
      </motion.div>

      {/* 3D Canvas container */}
      <div className="canvas-wrapper">
        <Suspense fallback={null}>
          <MechaHero mouseX={sX} mouseY={sY} />
        </Suspense>
      </div>

      {/* Foreground text (In front of 3D, masked by model via blend-mode) */}
      <motion.div 
        className="bg-text-container front"
        style={{ 
          x: "-50%",
          y: "-50%",
          rotateX: rotX, 
          rotateY: rotY,
          transformStyle: 'preserve-3d' 
        }}
      >
        <div className="bg-text-group">
          <motion.div style={{ transformStyle: 'preserve-3d', translateZ: 0 }}>
            <svg className="bg-text-svg" viewBox="0 0 1000 200">
              <text x="50%" y="60%" textAnchor="middle" className="bg-text-layer layer-front">COMING</text>
            </svg>
          </motion.div>
        </div>
        <div className="bg-text-group">
          <motion.div style={{ transformStyle: 'preserve-3d', translateZ: 0 }}>
            <svg className="bg-text-svg" viewBox="0 0 1000 200">
              <text x="50%" y="60%" textAnchor="middle" className="bg-text-layer layer-front">SOON</text>
            </svg>
          </motion.div>
        </div>
      </motion.div>

      {/* Overlay UI */}
      <div className="overlay-ui">
        {/* Central Info Blocks */}
        <div className="info-grid">
          <motion.div
            className="info-block glass"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <span className="label">LAUNCHING SOON</span>
          </motion.div>
          <motion.div
            className="info-block glass disabled"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <span className="label muted">GLOBAL RELEASE V1.0.0</span>
          </motion.div>
        </div>

        {/* Media Control Bar */}
        <motion.div
          className="media-bar glass"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="media-left">
            <div className="media-indicator active"></div>
            <span className="media-status">EXECUTING</span>
          </div>
          <div className="media-progress">
            <div className="progress-stripe-container">
              <div className="scrolling-stripes"></div>
            </div>
          </div>
          <div className="media-right">
            <div className="timestamp-container">
              <div className="fake-milis all-reels">
                {[...Array(13)].map((_, i) => (
                  <div
                    key={i}
                    className="mili-reel"
                    style={{ animationDuration: `${0.05 * Math.pow(1.6, 12 - i)}s` }}
                  >
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n, idx) => (
                      <span key={idx}>{n}</span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <span className="sound">PRODUCTION <span className="highlight">ACTIVE</span></span>
          </div>
        </motion.div>

        {/* Footer Info Section */}
        <motion.div
          className="terminal-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <TerminalLog title="ENGINE_PIPELINE" prefix="SYS_A >" frequency={3000} />
          <TerminalLog title="RENDER_THREAD" prefix="GPU_B >" frequency={1500} />
          <TerminalLog title="ASSET_FETCHER" prefix="NET_C >" frequency={4500} />
        </motion.div>

        {/* Social Right (Floating) */}
        <div className="social-sidebar">
          <div className="social-item">
            <div className="social-bars">
              <div className="bar-thinner"></div>
              <div className="bar-thicker"></div>
            </div>
            <a href="https://www.linkedin.com/in/nazmul-islam-031446182/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
              <span className="social-label">LINKEDIN</span>
              <FaLinkedin />
            </a>
          </div>

          <div className="social-item">
            <div className="social-bars">
              <div className="bar-thinner"></div>
              <div className="bar-thicker"></div>
            </div>
            <a href="https://x.com/matrixalter05" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="X">
              <span className="social-label">X (TWITTER)</span>
              <FaXTwitter />
            </a>
          </div>

          <div className="social-item">
            <div className="social-bars">
              <div className="bar-thinner"></div>
              <div className="bar-thicker"></div>
            </div>
            <a href="https://www.youtube.com/@MatrixRex05" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="YouTube">
              <span className="social-label">YOUTUBE</span>
              <FaYoutube />
            </a>
          </div>
        </div>




      </div>
    </div>
  );
}

export default App;
