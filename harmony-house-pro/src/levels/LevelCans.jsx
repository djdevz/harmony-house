import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function LevelCans({ onWin }) {
  // 0 = Front, 1 = Side, 2 = Back
  const [cans, setCans] = useState([1, 2, 1, 2, 1]); 

  const rotateCan = (index) => {
    setCans(prev => {
      const newCans = [...prev];
      newCans[index] = (newCans[index] + 1) % 3;
      
      if (newCans.every(face => face === 0)) setTimeout(onWin, 500);
      return newCans;
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
      <h2>Face Forward</h2>
      <div style={{ display: 'flex', gap: 15, alignItems: 'flex-end', borderBottom: '10px solid #eee', paddingBottom: 10 }}>
        {cans.map((face, i) => (
          <motion.div
            key={i}
            onClick={() => rotateCan(i)}
            style={{
              width: 60, height: 100, borderRadius: 5, cursor: 'pointer',
              background: 'linear-gradient(90deg, #ddd, #fff, #ddd)',
              position: 'relative', overflow: 'hidden', border: '1px solid #ccc'
            }}
            whileTap={{ scale: 0.95 }}
          >
            {/* The Label */}
            <motion.div 
              animate={{ 
                left: face === 0 ? '0%' : face === 1 ? '50%' : '100%',
                opacity: face === 2 ? 0 : 1,
                width: face === 1 ? '50%' : '100%'
              }}
              style={{
                position: 'absolute', top: 20, height: 60, width: '100%',
                background: '#ffab91', display: 'flex', justifyContent: 'center', alignItems: 'center',
                fontWeight: 'bold', color: 'white', fontSize: '0.8rem'
              }}
            >
              SOUP
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}