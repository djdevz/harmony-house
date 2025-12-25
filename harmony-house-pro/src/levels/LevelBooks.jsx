import React, { useState, useEffect } from 'react';
import { Reorder, motion } from 'framer-motion';
import { playSound } from '../components/AudioController';

export default function LevelBooks({ onWin }) {
  const [items, setItems] = useState([
    { id: '1', h: 140, color: '#2c3e50' },
    { id: '2', h: 160, color: '#34495e' },
    { id: '3', h: 180, color: '#5d6d7e' },
    { id: '4', h: 200, color: '#85929e' },
    { id: '5', h: 220, color: '#aeb6bf' },
  ].sort(() => Math.random() - 0.5));

  useEffect(() => {
    // Check if sorted (Small to Tall)
    const isSorted = items.every((val, i, arr) => !i || (val.h >= arr[i - 1].h));
    if (isSorted) setTimeout(onWin, 500);
  }, [items]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'center' }}>
      <h2 style={{ marginBottom: 40, color: '#586e75' }}>Order by Height</h2>
      
      {/* Shelf Container */}
      <div style={{ 
        height: 250, 
        borderBottom: '15px solid #5d4037', 
        padding: '0 40px',
        display: 'flex',
        alignItems: 'flex-end' 
      }}>
        <Reorder.Group 
          axis="x" 
          values={items} 
          onReorder={setItems} 
          style={{ display: 'flex', gap: 10, listStyle: 'none', padding: 0, margin: 0, alignItems: 'flex-end' }}
        >
          {items.map((item) => (
            <Reorder.Item key={item.id} value={item} style={{ listStyle: 'none' }}>
              <motion.div
                layout
                onPointerDown={() => playSound('pop')}
                style={{
                  width: 45,
                  height: item.h,
                  backgroundColor: item.color,
                  borderRadius: '4px 4px 0 0',
                  boxShadow: 'inset 3px 0 10px rgba(0,0,0,0.2)',
                  cursor: 'grab'
                }}
                whileDrag={{ scale: 1.1, zIndex: 10 }}
              />
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </div>
    </div>
  );
}