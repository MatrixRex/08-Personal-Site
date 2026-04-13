import React, { useState, useEffect } from 'react';

const TerminalLog = ({ title, category = "engine", prefix = "SYS@CORE:~$", frequency = 2000 }) => {
  const [logs, setLogs] = useState([]);
  
  useEffect(() => {
    const logPool = {
      engine: [
        "INITIALIZING @react-three/fiber",
        "FETCHING dependencies [NPM]",
        "MINIFYING bundle modules...",
        "ANALYZING dependency graph",
        "ERROR: connection-timeout [504]",
        "RETRYING handshake... [1/3]",
        "COMPILING core-pipeline.js",
        "TREE-SHAKING unused assets",
        "FATAL: peer-dependency mismatch",
        "ACTIVATING production mode",
      ],
      render: [
        "ALLOCATING GPU memory...",
        "INITIALIZING RenderEngine_v4",
        "FAIL: buffer-overflow in v-ram",
        "RECONFIGURING shader-threads...",
        "RENDERING shadow-buffer [0,0]",
        "APPLYING post-process: Bloom",
        "ERROR: Frame dropped - timeout",
        "SYNCING vertical-refresh_rate",
        "CALCULATING mesh-geometry...",
        "STARTING raytrace-pipeline",
      ],
      assets: [
        "OPTIMIZING mesh geometry...",
        "COMPRESSING textures: 2048px",
        "FETCH_ERROR: textures/env.hdr",
        "RETRYING asset-download... [2/3]",
        "BUILDING welcome.glb...",
        "PARSING vertex-data buffers",
        "CHECKSUM_MISMATCH: welcome.glb",
        "MAPPING material: Chromium",
        "PACKING glb-binary-stream",
        "FETCHING remote-mesh: mecha",
      ]
    };

    const currentList = logPool[category] || logPool.engine;

    const generate = () => {
      const msg = currentList[Math.floor(Math.random() * currentList.length)];
      if (Math.random() > 0.8) {
        return { type: 'prg', pkg: msg.includes(' ') ? msg.split(' ')[1] : "SYS", val: 0 };
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
            return { ...l, val: Math.min(100, l.val + 15 + Math.random() * 10) };
          }
          return l;
        });
        if (active) return next;
        return [...next.slice(1), generate()];
      });
    }, frequency);

    return () => clearInterval(timer);
  }, [frequency, category]);

  const getLineClass = (text) => {
    const upper = text.toUpperCase();
    if (upper.includes("ERROR") || upper.includes("FAIL") || upper.includes("FATAL")) return "error";
    if (upper.includes("RETRYING")) return "warning";
    return "";
  };

  return (
    <div className="terminal-log-item">
      <div className="terminal-title">{title}</div>
      <div className="terminal-lines">
        {logs.map((l, i) => {
          const content = l.type === 'prg' 
            ? `EXECUTING ${l.pkg} [${"#".repeat(Math.floor(l.val/10)).padEnd(10, '.')}] ${Math.floor(l.val)}%`
            : l.val;
            
          return (
            <div key={i} className={`terminal-line ${getLineClass(content)}`}>
              <span className="prefix">{prefix}</span> 
              <span className="content">{content}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TerminalLog;
