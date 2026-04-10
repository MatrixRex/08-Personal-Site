import React, { Suspense, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa';
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

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Offset from center, sensitivity adjusted for "slight" movement
      const x = (e.clientX - window.innerWidth / 2) / 40;
      const y = (e.clientY - window.innerHeight / 2) / 40;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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
      <div className="bg-text-container back">
        <svg style={{ position: 'absolute', width: 0, height: 0 }}>
          <defs>
            <filter id="perfect-outline" x="-20%" y="-20%" width="140%" height="140%">
              <feMorphology in="SourceAlpha" result="expanded" operator="dilate" radius="1.2"/>
              <feComposite in="expanded" in2="SourceAlpha" operator="out" result="outline"/>
              <feFlood floodColor="white" result="color"/>
              <feComposite in="color" in2="outline" operator="in"/>
            </filter>
            <filter id="perfect-outline-thin" x="-20%" y="-20%" width="140%" height="140%">
              <feMorphology in="SourceAlpha" result="expanded" operator="dilate" radius="0.6"/>
              <feComposite in="expanded" in2="SourceAlpha" operator="out" result="outline"/>
              <feFlood floodColor="white" result="color"/>
              <feComposite in="color" in2="outline" operator="in"/>
            </filter>
          </defs>
        </svg>        <div className="bg-text-group">
          <svg className="bg-text-svg" viewBox="0 0 1000 200">
            <text x="50%" y="60%" textAnchor="middle" className="bg-text-layer layer-3" 
              style={{ transform: `translate(${-mousePos.x * 1.5}px, ${-mousePos.y * 1.5}px)` }}>COMING</text>
            <text x="50%" y="60%" textAnchor="middle" className="bg-text-layer layer-2"
              style={{ transform: `translate(${-mousePos.x * 0.8}px, ${-mousePos.y * 0.8}px)` }}>COMING</text>
            <text x="50%" y="60%" textAnchor="middle" className="bg-text-layer layer-filled">COMING</text>
          </svg>
        </div>
        <div className="bg-text-group">
          <svg className="bg-text-svg" viewBox="0 0 1000 200">
            <text x="50%" y="60%" textAnchor="middle" className="bg-text-layer layer-3"
              style={{ transform: `translate(${-mousePos.x * 1.5}px, ${-mousePos.y * 1.5}px)` }}>SOON</text>
            <text x="50%" y="60%" textAnchor="middle" className="bg-text-layer layer-2"
              style={{ transform: `translate(${-mousePos.x * 0.8}px, ${-mousePos.y * 0.8}px)` }}>SOON</text>
            <text x="50%" y="60%" textAnchor="middle" className="bg-text-layer layer-filled">SOON</text>
          </svg>
        </div>
      </div>

      {/* 3D Canvas container */}
      <div className="canvas-wrapper">
        <Suspense fallback={null}>
          <MechaHero />
        </Suspense>
      </div>

      {/* Foreground text (In front of 3D, masked by model via blend-mode) */}
      <div className="bg-text-container front">
        <div className="bg-text-group">
          <svg className="bg-text-svg" viewBox="0 0 1000 200">
            <text x="50%" y="60%" textAnchor="middle" className="bg-text-layer layer-front">COMING</text>
          </svg>
        </div>
        <div className="bg-text-group">
          <svg className="bg-text-svg" viewBox="0 0 1000 200">
            <text x="50%" y="60%" textAnchor="middle" className="bg-text-layer layer-front">SOON</text>
          </svg>
        </div>
      </div>

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
          <a href="#" className="social-link" aria-label="LinkedIn"><FaLinkedin /></a>
          <a href="#" className="social-link" aria-label="X"><FaTwitter /></a>
          <a href="#" className="social-link" aria-label="YouTube"><FaYoutube /></a>
        </div>
      </div>
    </div>
  );
}

export default App;
