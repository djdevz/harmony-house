import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function LevelPlants({ onWin }) {
  // 5 leaves, some are dead (status: 'dead')
  const [leaves, setLeaves] = useState([
    { id: 1, status: 'good', x: -40, y: 20, r: -45 },
    { id: 2, status: 'dead', x: 40, y: 10, r: 45 },
    { id: 3, status: 'good', x: 0, y: -50, r: 0 },
    { id: 4, status: 'dead', x: -30, y: -20, r: -20 },
    { id: 5, status: 'good', x: 30, y: -30, r: 20 },
  ]);

  const handleTap = (id, status) => {
    if (status === 'dead') {
      setLeaves(prev => prev.filter(l => l.id !== id));
    }
  };

  useEffect(() => {
    // Win if no dead leaves remain
    if (!leaves.some(l => l.status === 'dead')) setTimeout(onWin, 500);
  }, [leaves]);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ position:'absolute', top:10, left:20 }}><Link to="/" style={{textDecoration:'none'}}>← Menu</Link></div>
      
      <h2 style={{ marginBottom: 20, color:'#555' }}>Prune the Dead Leaves</h2>

      <div style={{ position: 'relative', width: 200, height: 300 }}>
        {/* Stem */}
        <div style={{ position: 'absolute', bottom: 0, left: 95, width: 10, height: 200, background: '#5d4037', borderRadius: 10 }}></div>
        
        <AnimatePresence>
          {leaves.map(leaf => (
            <motion.div
              key={leaf.id}
              onClick={() => handleTap(leaf.id, leaf.status)}
              exit={{ scale: 0, opacity: 0, y: 50 }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              style={{
                position: 'absolute',
                bottom: 150 + leaf.y,
                left: 100 + leaf.x,
                width: 40, height: 40,
                borderRadius: '0 50% 0 50%',
                background: leaf.status === 'good' ? '#81c784' : '#8d6e63', // Green or Brown
                transform: `rotate(${leaf.r}deg)`,
                cursor: 'pointer',
                border: '1px solid rgba(0,0,0,0.1)'
              }}
            />
          ))}
        </AnimatePresence>
        
        {/* Pot */}
        <div style={{ position: 'absolute', bottom: -50, left: 50, width: 100, height: 80, background: '#d48c96', borderRadius: '0 0 20px 20px' }}></div>
      </div>
    </div>
  );
}