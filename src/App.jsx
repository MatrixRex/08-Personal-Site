import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import MechaHero from './components/MechaHero';
import Header from './components/Header';
import BentoGrid from './components/BentoGrid';
import './App.css';

function App() {
  const scrollRef = useRef(null);
  
  const sections = {
    home: useRef(null),
    work: useRef(null),
    tech: useRef(null),
    tools: useRef(null),
    about: useRef(null)
  };

  const scrollToSection = (id) => {
    sections[id].current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="app-container">
      <Header onNavigate={scrollToSection} />
      <div className="horizontal-reel" ref={scrollRef}>
        {/* Slide 1: HERO */}
        <section className="slide hero-slide" ref={sections.home}>
          <MechaHero />
          <div className="hero-content">
            <motion.h1 
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              NAZMUL
            </motion.h1>
            <p className="hero-sub">[ 3D_GENERALIST | TECH_ARTIST ]</p>
          </div>
        </section>
        
        {/* Slide 2: WORK */}
        <section className="slide work-slide" ref={sections.work}>
          <BentoGrid />
        </section>
        
        <section className="slide tech-slide" ref={sections.tech}>
          <div className="center-content">
            <h2>TECH_ART & SHADERS</h2>
          </div>
        </section>

        <section className="slide tool-slide" ref={sections.tools}>
          <div className="center-content">
            <h2>TOOLS & AUTOMATION</h2>
          </div>
        </section>

        <section className="slide about-slide" ref={sections.about}>
          <div className="center-content">
            <h2>COMMAND_ORIGIN: ABOUT</h2>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App
