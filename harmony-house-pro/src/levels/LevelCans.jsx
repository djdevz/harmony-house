import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ShareButton from '../components/ShareButton';

export default function LevelCans({ onWin }) {
  // 0=Front, 1=Side, 2=Back. We start them scrambled.
  const [cans, setCans] = useState([1, 2, 1, 2, 1]);

  const rotateCan = (index) => {
    setCans(prev => {
      const newCans = [...prev];
      // Cycle through 0 -> 1 -> 2 -> 0
      newCans[index] = (newCans[index] + 1) % 3;
      return newCans;
    });
  };

  useEffect(() => {
    // Win if all are 0 (Front)
    if (cans.every(c => c === 0)) setTimeout(onWin, 500);
  }, [cans]);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ position:'absolute', top:10, left:20 }}><Link to="/" style={{textDecoration:'none'}}>← Menu</Link></div>
      <div style={{ position:'absolute', top:10, right:20 }}><ShareButton /></div>

      <h2 style={{ textAlign: 'center', marginTop: 60, color:'#555' }}>Labels Forward</h2>

      <div style={{ 
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', 
        gap: 15, paddingBottom: 100 
      }}>
        {cans.map((face, i) => (
          <motion.div
            key={i}
            onClick={() => rotateCan(i)}
            whileTap={{ scale: 0.95 }}
            style={{
              width: 60, height: 100, borderRadius: 5, cursor: 'pointer',
              // Cylinder effect gradient
              background: 'linear-gradient(90deg, #ccc 0%, #fff 50%, #ccc 100%)',
              position: 'relative', overflow: 'hidden', border: '1px solid #999',
              boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
            }}
          >
            {/* The Label */}
            <motion.div 
              animate={{ 
                left: face === 0 ? '0%' : face === 1 ? '50%' : '100%',
                opacity: face === 2 ? 0 : 1,
                width: face === 1 ? '50%' : '100%'
              }}
              style={{
                position: 'absolute', top: 25, height: 50, width: '100%',
                background: '#ffab91', // Peach label
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
              }}
            >
              <span style={{ fontSize: 10, fontWeight: 'bold', color: '#fff', letterSpacing: 1 }}>TOMATO</span>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}