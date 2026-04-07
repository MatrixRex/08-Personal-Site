import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Download, X } from 'lucide-react';
import './BentoGrid.css';

const portfolioItems = [
  { 
    id: 1, 
    title: 'VALKYRIE MECHA', 
    type: '3D Render', 
    size: 'large', 
    color: '#00E5FF1a',
    image: 'https://images.unsplash.com/photo-1542332213-31f87348057f?q=80&w=2070&auto=format&fit=crop',
    stats: { poly: '150k', tex: '4k PBR' }
  },
  { 
    id: 2, 
    title: 'SOLAR_WATER_SHADER', 
    type: 'Tech Art', 
    size: 'small', 
    color: '#76FF031a',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1932&auto=format&fit=crop',
    stats: { engine: 'Unity URP', passes: 3 }
  },
  { 
    id: 3, 
    title: 'NEXUS_UI_SYSTEM', 
    type: 'Web Dev', 
    size: 'medium', 
    color: '#37474F1a',
    image: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=1974&auto=format&fit=crop',
    link: 'https://example.com'
  },
  { 
    id: 4, 
    title: 'AUTO_RETOPO_BLENDER', 
    type: 'Automation', 
    size: 'wide', 
    color: '#00E5FF1a',
    image: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2070&auto=format&fit=crop',
    download: '#'
  }
];

export default function BentoGrid() {
  const [selected, setSelected] = useState(null);

  // Lock scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = selected ? 'hidden' : 'auto';
  }, [selected]);

  return (
    <div className="bento-container">
      <div className="bento-grid">
        {portfolioItems.map(item => (
          <motion.div 
            key={item.id} 
            layoutId={`tile-${item.id}`}
            className={`bento-tile ${item.size}`}
            style={{ backgroundColor: item.color }}
            onClick={() => setSelected(item)}
            whileHover={{ scale: 0.98 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="tile-image" style={{ backgroundImage: `url(${item.image})` }} />
            <div className="tile-info">
              <span className="label">{item.type}</span>
              <h3>{item.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <div className="overlay-container">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="backdrop" 
              onClick={() => setSelected(null)} 
            />
            
            <motion.div 
              layoutId={`tile-${selected.id}`}
              className="expanded-modal"
            >
              <div className="media-side">
                <div className="modal-image" style={{ backgroundImage: `url(${selected.image})` }} />
              </div>
              
              <div className="info-side">
                <header className="modal-header">
                  <span className="label">{selected.type}</span>
                  <h2>{selected.title}</h2>
                </header>
                
                <div className="modal-body">
                  <p>Comprehensive breakdown of technical pipeline and workflow details for this project.</p>
                  
                  {selected.stats && (
                    <div className="stats-box">
                      {Object.entries(selected.stats).map(([k, v]) => (
                        <div key={k} className="stat">
                          <span className="stat-label">{k.toUpperCase()}</span>
                          <span className="stat-value">{v}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="modal-actions">
                    {selected.download && (
                      <button className="action-btn primary"><Download size={16} /> DOWNLOAD_TOOL</button>
                    )}
                    {selected.link && (
                      <button className="action-btn secondary"><ExternalLink size={16} /> VIEW_SITE</button>
                    )}
                  </div>
                </div>

                <button className="close-btn" onClick={() => setSelected(null)}>
                  <X size={20} /> [ ESC ]
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
