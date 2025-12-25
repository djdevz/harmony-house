import React, { useEffect, useState } from 'react';

// Helper to get correct path
const getPath = (filename) => {
  const base = import.meta.env.BASE_URL;
  const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base;
  return `${cleanBase}/audio/${filename}`;
};

// 1. Pre-load sounds into memory (Fixes the Lag)
const sounds = {
  bgm: new Audio(getPath('bgm.mp3')),
  pop: new Audio(getPath('pop.mp3')),
  click: new Audio(getPath('click.mp3')),
  win: new Audio(getPath('win.mp3')),
};

// Configure Music
sounds.bgm.loop = true;
sounds.bgm.volume = 0.1; // <--- Lowered Volume (was 0.3)

// Configure SFX Volumes
sounds.pop.volume = 0.4;
sounds.click.volume = 0.4;
sounds.win.volume = 0.4;

// Global State
let isMuted = false;

export const playSound = (name) => {
  if (isMuted) return;
  
  try {
    // 2. Clone the node to allow overlapping sounds (e.g. rapid clicking)
    // This plays instantly because the buffer is already loaded.
    const soundClone = sounds[name].cloneNode();
    soundClone.volume = sounds[name].volume; 
    soundClone.play().catch(e => {}); // Ignore interaction errors
  } catch (e) {
    console.error("Audio missing:", name);
  }
};

export default function AudioController() {
  const [hasStarted, setHasStarted] = useState(false);
  const [muted, setMuted] = useState(false);

  const toggleAudio = () => {
    if (!hasStarted) {
      // First click: Start Music
      sounds.bgm.play().then(() => {
        setHasStarted(true);
      }).catch(e => console.log("Interaction needed", e));
    } else {
      // Subsequent clicks: Toggle Mute
      if (muted) {
        sounds.bgm.play();
        isMuted = false;
        setMuted(false);
      } else {
        sounds.bgm.pause();
        isMuted = true;
        setMuted(true);
      }
    }
  };

  return (
    <div 
      onClick={toggleAudio}
      style={{
        position: 'fixed', bottom: 20, left: 20, zIndex: 9999,
        background: 'rgba(255,255,255,0.8)', padding: '10px', borderRadius: '50%',
        cursor: 'pointer', boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1.2rem', userSelect: 'none'
      }}
      title={hasStarted ? (muted ? "Unmute" : "Mute") : "Start Audio"}
    >
      {!hasStarted ? "🎵" : (muted ? "🔇" : "🔊")}
    </div>
  );
}