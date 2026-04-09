import React, { Suspense, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa';
import { Leva } from 'leva';
import MechaHero from './components/MechaHero';
import './App.css';

function App() {
  const [times, setTimes] = useState({
    dhaka: '',
    newyork: '',
    dubai: '',
    milis: ''
  });

  useEffect(() => {
    const updateTimes = () => {
      const formatTime = (timeZone) => {
        return new Intl.DateTimeFormat('en-GB', {
          timeZone,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        }).format(new Date());
      };

      setTimes({
        dhaka: formatTime('Asia/Dhaka'),
        newyork: formatTime('America/New_York'),
        dubai: formatTime('Asia/Dubai'),
        milis: Date.now().toString()
      });
    };

    updateTimes();
    const clockInterval = setInterval(updateTimes, 1000);
    
    const milisInterval = setInterval(() => {
      setTimes(prev => ({
        ...prev,
        milis: Date.now().toString()
      }));
    }, 40);

    return () => {
      clearInterval(clockInterval);
      clearInterval(milisInterval);
    };
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

      {/* Background outlined text */}
      <div className="bg-text-container">
        <h1 className="bg-text">COMING</h1>
        <h1 className="bg-text">SOON</h1>
      </div>

      {/* 3D Canvas container */}
      <div className="canvas-wrapper">
        <Suspense fallback={null}>
          <MechaHero />
        </Suspense>
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

        {/* Bottom Clocks */}
        <div className="clock-section">
          <motion.div className="clock-item" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
            <span className="time">{times.dhaka}</span>
            <span className="city">DHAKA</span>
            <p className="address">REX HQ / BANGLADESH</p>
          </motion.div>
          <motion.div className="clock-item" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
            <span className="time">{times.newyork}</span>
            <span className="city">NEW YORK</span>
            <p className="address">TERMINAL 4 / USA</p>
          </motion.div>
          <motion.div className="clock-item" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}>
            <span className="time">{times.dubai}</span>
            <span className="city">DUBAI</span>
            <p className="address">GATEWAY / UAE</p>
          </motion.div>
        </div>

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
