import React, { useState, useEffect } from 'react';

const TerminalLog = ({ title, prefix = "USR@NAZMUL:~$", frequency = 2000 }) => {
  const [logs, setLogs] = useState([]);
  
  useEffect(() => {
    const list = [
      "INSTALLING @react-three/fiber...",
      "FETCHING three@0.183.2",
      "COMPILING framer-motion",
      "INITIALIZING postprocessing shaders",
      "BUILDING assets/models/mecha.glb",
      "SYNCING terminal-alpha.nazmul.core",
      "CHECKING leva@0.10.1",
      "DOWNLOADING dependencies...",
      "RESOLVING @react-three/drei",
      "OPTIMIZING mesh data...",
      "READY [OK]",
      "EXEC task_id: 0x44F2",
    ];

    const generate = () => {
      const msg = list[Math.floor(Math.random() * list.length)];
      if (Math.random() > 0.7) {
        return { type: 'prg', pkg: msg.split(' ')[1] || "asset", val: 0 };
      }
      return { type: 'txt', val: msg };
    };

    setLogs([generate(), generate(), generate()]);

    const timer = setInterval(() => {
      setLogs(prev => {
        let active = false;
        const next = prev.map(l => {
          if (l.type === 'prg' && l.val < 100) {
            active = true;
            return { ...l, val: Math.min(100, l.val + 10 + Math.random() * 10) };
          }
          return l;
        });
        if (active) return next;
        return [...next.slice(1), generate()];
      });
    }, frequency);

    return () => clearInterval(timer);
  }, [frequency]);

  return (
    <div className="terminal-log-item">
      <div className="terminal-title">{title}</div>
      <div className="terminal-lines">
        {logs.map((l, i) => (
          <div key={i} className="terminal-line">
            <span className="prefix">{prefix}</span> 
            <span className="content">
              {l.type === 'prg' 
                ? `FETCHING ${l.pkg} [${"#".repeat(Math.floor(l.val/10)).padEnd(10, '.')}] ${Math.floor(l.val)}%`
                : l.val
              }
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TerminalLog;
