import React from 'react';
import { motion } from 'framer-motion';
import MechaHero from './components/MechaHero';
import Header from './components/Header';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Header />
      <div className="horizontal-reel">
        {/* Slide 1: HERO */}
        <section className="slide hero-slide">
          <MechaHero />
          <div className="hero-content">
            <motion.h1 
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              MATRA
            </motion.h1>
            <p className="hero-sub">[ 3D_GENERALIST | TECH_ARTIST ]</p>
          </div>
        </section>
        
        {/* Slide 2: WORK (Bento Component to follow in Task 6) */}
        <section className="slide work-slide">
          <div className="bento-placeholder">
            <h2>3D_PORTFOLIO / BENTO_GRID</h2>
            <div className="loading-line" />
          </div>
        </section>
        
        <section className="slide tech-slide">
          <div className="center-content">
            <h2>TECH_ART & SHADERS</h2>
          </div>
        </section>

        <section className="slide tool-slide">
          <div className="center-content">
            <h2>TOOLS & AUTOMATION</h2>
          </div>
        </section>

        <section className="slide about-slide">
          <div className="center-content">
            <h2>COMMAND_ORIGIN: ABOUT</h2>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App
