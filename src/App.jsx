import React, { Suspense, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FaLinkedin, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

import MechaHero from './components/MechaHero';
import TerminalLog from './components/TerminalLog';
import ComingSoonSVG from './components/ComingSoonSVG';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [times, setTimes] = useState({
    dhaka: '',
    newyork: '',
    dubai: '',
    milis: ''
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 768px)');
    const onChange = () => setIsMobile(mql.matches);
    setIsMobile(mql.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

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
    if (isMobile) return;
    const handleMouseMove = (e) => {
      mouseX.set((e.clientX - window.innerWidth / 2) / 30);
      mouseY.set((e.clientY - window.innerHeight / 2) / 30);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, isMobile]);

  return (
    <>
      {/* Dynamic Gradient Background Blobs (Global/Fixed) */}
      <div className="gradient-bg">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      {/* Sci-Fi SVG Decorations (Global/Fixed HUD) */}
      <div className="tech-decorations">
        <div className="corner-bracket top-left-bracket"></div>
        <div className="corner-bracket top-right-bracket"></div>
        <div className="corner-bracket bottom-left-bracket"></div>
        <div className="corner-bracket bottom-right-bracket"></div>
        <div className="crosshair"></div>
        <div className="scanner-line"></div>
      </div>

      <div className="coming-soon-wrapper">

      {/* Header */}
      <div className="mobile-hero-fold">
        <header className="main-header">
        <motion.div
          className="header-content"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 1, ease: "circOut" }}
        >
          <div className="logo">
            <div className="logo-hud-tag">
              <span className="tag-box">INIT</span>
              <div className="tag-line"></div>
            </div>
            <div className="logo-main-wrapper">
              <div className="logo-name-stack">
                <div className="logo-first-name-row">
                  <span className="logo-main">NAZMUL</span>
                  <div className="logo-indicators">
                    <div className="ind-box"></div>
                    <div className="custom-arrow">
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 4V20H20" stroke="currentColor" strokeWidth="4" strokeLinecap="butt" strokeLinejoin="miter"/>
                        <path d="M4 20L20 4" stroke="currentColor" strokeWidth="4" strokeLinecap="butt"/>
                      </svg>
                    </div>
                  </div>
                </div>
                <span className="logo-last-name">ISLAM</span>
              </div>
            </div>
            <div className="logo-footer">
              <div className="roles-column">
                <div className="role-item">
                  <span className="role-code">ID_01</span>
                  <span className="role-name">3D GENERALIST</span>
                </div>
                <div className="role-item">
                  <span className="role-code">ID_02</span>
                  <span className="role-name">TECH ARTIST</span>
                </div>
                <div className="role-item">
                  <span className="role-code">ID_03</span>
                  <span className="role-name">WEB APPS BUILDER</span>
                </div>
              </div>
              <div className="logo-ver">
                <span>PORTFOLIO_V1.0</span>
                <div className="ver-status"></div>
              </div>
            </div>
          </div>
        </motion.div>
      </header>

        <div className="hero-section">
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
                {/* Keeping definitions for any potential future use, but we will use CSS for performance now */}
              </defs>
            </svg>

            <div className="bg-text-group">
              <motion.div style={{ transformStyle: 'preserve-3d', translateZ: 0 }}>
                <ComingSoonSVG type="solid" text="coming" className="bg-text-svg layer-filled" />
              </motion.div>
            </div>

            <div className="bg-text-group">
              <motion.div style={{ transformStyle: 'preserve-3d', translateZ: 0 }}>
                <ComingSoonSVG type="solid" text="soon" className="bg-text-svg layer-filled" />
              </motion.div>
            </div>
          </motion.div>

          {/* 3D Canvas container */}
          <div className="canvas-wrapper">
            <Suspense fallback={null}>
              <MechaHero mouseX={sX} mouseY={sY} isMobile={isMobile} />
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
                <ComingSoonSVG type="outline" text="coming" className="bg-text-svg layer-front" />
              </motion.div>
            </div>
            <div className="bg-text-group">
              <motion.div style={{ transformStyle: 'preserve-3d', translateZ: 0 }}>
                <ComingSoonSVG type="outline" text="soon" className="bg-text-svg layer-front" />
              </motion.div>
            </div>
          </motion.div>

          {/* Scroll Indicator (Mobile only) */}
          {isMobile && (
            <motion.div
              className="scroll-indicator"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                <span className="scroll-text">SCROLL</span>
                <div className="scroll-arrow"></div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Overlay UI */}
      <div className="overlay-ui">
        {/* Central Info Blocks */}
        {isMobile ? (
          <motion.div
            className="info-block glass single-label"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <span className="label">LAUNCHING SOON v1.0.0</span>
          </motion.div>
        ) : (
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
        )}

        {/* Social Links - Reordered for Mobile */}
        {isMobile && (
          <motion.div 
            className="social-container-mobile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <a href="https://www.linkedin.com/in/nazmul-islam-031446182/" target="_blank" rel="noopener noreferrer" className="social-icon-box glass">
              <FaLinkedin />
            </a>
            <a href="https://x.com/matrixalter05" target="_blank" rel="noopener noreferrer" className="social-icon-box glass">
              <FaXTwitter />
            </a>
            <a href="https://www.youtube.com/@MatrixRex05" target="_blank" rel="noopener noreferrer" className="social-icon-box glass">
              <FaYoutube />
            </a>
          </motion.div>
        )}

        {/* Media Control Bar / Split Sections */}
        {isMobile ? (
          <div className="mobile-split-sections">
            <motion.div className="media-bar glass split-one" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
              <div className="media-left">
                <div className="media-indicator active"></div>
                <span className="media-status">SYS_RUNNING</span>
              </div>
              <div className="media-progress visible-on-mobile">
                <div className="progress-stripe-container">
                  <div className="scrolling-stripes"></div>
                </div>
              </div>
            </motion.div>

            <motion.div className="media-bar glass split-two" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
              <div className="timestamp-container">
                <div className="fake-milis all-reels">
                  {[...Array(13)].map((_, i) => (
                    <div key={i} className="mili-reel" style={{ animationDuration: `${0.05 * Math.pow(1.6, 12 - i)}s` }}>
                      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n, idx) => (
                        <span key={idx}>{n}</span>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div className="media-bar glass split-three" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
               <span className="sound">STATUS <span className="highlight">ACTIVE</span></span>
            </motion.div>
          </div>
        ) : (
          <motion.div
            className="media-bar glass"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <div className="media-left">
              <div className="media-indicator active"></div>
              <span className="media-status">SYS_RUNNING</span>
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
              <span className="sound">STATUS <span className="highlight">ACTIVE</span></span>
            </div>
          </motion.div>
        )}

        {/* Footer Info Section */}
        <motion.div
          className="terminal-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          {/* Unified Console Window */}
          <div className={`terminal-unified-window ${isMobile ? 'is-mobile' : 'is-desktop'}`}>
            <div className="terminal-window-chrome">
              <div className="chrome-dots">
                <span></span><span></span><span></span>
              </div>
            </div>

            <div className="terminal-content-inner">
              {/* Minimalist Tabs - Switches from Horizontal (Mobile) to Vertical (Desktop) in CSS */}
              <div className="terminal-tabs-container">
                <button className={`tab-btn ${activeTab === 0 ? 'active' : ''}`} onClick={() => setActiveTab(0)}>
                  <span className="tab-prefix">{activeTab === 0 ? '>' : ' '}</span> ENGINE
                </button>
                <button className={`tab-btn ${activeTab === 1 ? 'active' : ''}`} onClick={() => setActiveTab(1)}>
                  <span className="tab-prefix">{activeTab === 1 ? '>' : ' '}</span> RENDER
                </button>
                <button className={`tab-btn ${activeTab === 2 ? 'active' : ''}`} onClick={() => setActiveTab(2)}>
                  <span className="tab-prefix">{activeTab === 2 ? '>' : ' '}</span> ASSETS
                </button>
              </div>

              <div className="terminal-body">
                <div className={`terminal-col ${activeTab === 0 ? 'active' : ''}`}>
                  <TerminalLog title="ENGINE_PIPELINE" category="engine" prefix="SYS_A >" frequency={3000} />
                </div>
                <div className={`terminal-col ${activeTab === 1 ? 'active' : ''}`}>
                  <TerminalLog title="RENDER_THREAD" category="render" prefix="GPU_B >" frequency={1500} />
                </div>
                <div className={`terminal-col ${activeTab === 2 ? 'active' : ''}`}>
                  <TerminalLog title="ASSET_FETCHER" category="assets" prefix="AST_C >" frequency={4500} />
                </div>
              </div>
            </div>

            {/* Console Footer - Always full width at bottom */}
            <div className="terminal-footer">
              <span className="executing-label">EXECUTING</span>
              <span className="rotating-cursor"></span>
            </div>
          </div>
        </motion.div>

        {/* Social Right (Floating on Desktop, Hidden on Mobile as it's inline now) */}
        {!isMobile && (
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
        )}




      </div>
    </div>
  </>
  );
}

export default App;
