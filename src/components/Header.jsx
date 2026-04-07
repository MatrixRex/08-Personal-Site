import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import './Header.css';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="solar-hud">
      <div className="hud-id">[ MATRA_SYS_V1.0 ]</div>
      
      <nav className={`hud-nav ${isOpen ? 'open' : ''}`}>
        <div className="nav-links">
          <button onClick={() => { setIsOpen(false); window.scrollTo({ left: 0, behavior: 'smooth' }); }}>HOME</button>
          <button onClick={() => setIsOpen(false)}>3D_WORK</button>
          <button onClick={() => setIsOpen(false)}>TECH_ART</button>
          <button onClick={() => setIsOpen(false)}>TOOLS</button>
          <button onClick={() => setIsOpen(false)}>ABOUT</button>
        </div>
      </nav>

      <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <div className="hud-status">[ STATUS: ONLINE ]</div>
    </header>
  );
}
