import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Twitter, Youtube } from 'lucide-react';
import MechaHero from './components/MechaHero';
import './App.css';

function App() {
  return (
    <div className="coming-soon-wrapper">
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
        {/* Top Left: Name and Skillset */}
        <motion.div 
          className="top-left"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h2 className="name">NAZMUL <span className="highlight">ISLAM</span></h2>
          <p className="skillset">[ 3D_GENERALIST | TECH_ARTIST ]</p>
        </motion.div>

        {/* Top Right: Icon Links */}
        <motion.div 
          className="top-right"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <a href="#" className="social-icon" aria-label="LinkedIn" target="_blank" rel="noreferrer">
            <Linkedin size={20} />
          </a>
          <a href="#" className="social-icon" aria-label="X (Twitter)" target="_blank" rel="noreferrer">
            <Twitter size={20} />
          </a>
          <a href="#" className="social-icon" aria-label="YouTube" target="_blank" rel="noreferrer">
            <Youtube size={20} />
          </a>
        </motion.div>
      </div>
    </div>
  );
}

export default App;
