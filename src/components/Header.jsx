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
