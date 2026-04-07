import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import './Header.css';

export default function Header({ onNavigate }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="solar-hud">
      <div className="hud-id">[ NAZMUL_ISLAM_V1.0 ]</div>
      
      <nav className={`hud-nav ${isOpen ? 'open' : ''}`}>
        <div className="nav-links">
          <button onClick={() => { setIsOpen(false); onNavigate('home'); }}>HOME</button>
          <button onClick={() => { setIsOpen(false); onNavigate('work'); }}>3D_WORK</button>
          <button onClick={() => { setIsOpen(false); onNavigate('tech'); }}>TECH_ART</button>
          <button onClick={() => { setIsOpen(false); onNavigate('tools'); }}>TOOLS</button>
          <button onClick={() => { setIsOpen(false); onNavigate('about'); }}>ABOUT</button>
        </div>
      </nav>

      <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <div className="hud-status">[ STATUS: ONLINE ]</div>
    </header>
  );
}
