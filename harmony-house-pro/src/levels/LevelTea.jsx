import React, { useState, useEffect } from 'react';
import { Reorder, motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function LevelTea({ onWin }) {
  // Correct order is ID 1 -> 4
  const [items, setItems] = useState([
    { id: '1', c: '#ffebee' }, // Lightest
    { id: '2', c: '#ffcdd2' },
    { id: '3', c: '#ef9a9a' },
    { id: '4', c: '#e57373' }, // Darkest
  ].sort(() => Math.random() - 0.5));

  useEffect(() => {
    // Check if IDs are in order 1,2,3,4
    const ids = items.map(i => i.id).join('');
    if (ids === '1234') setTimeout(onWin, 500);
  }, [items]);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ position:'absolute', top:10, left:20 }}><Link to="/" style={{textDecoration:'none'}}>← Menu</Link></div>
      
      <h2 style={{ marginBottom: 40, color:'#555' }}>Gradient Sort</h2>
      
      <div style={{ padding: 30, background: 'rgba(255,255,255,0.5)', borderRadius: 20 }}>
        <Reorder.Group axis="x" values={items} onReorder={setItems} style={{ display: 'flex', gap: 0, padding: 0, listStyle:'none' }}>
          {items.map(item => (
            <Reorder.Item key={item.id} value={item} style={{ listStyle:'none' }}>
              <motion.div 
                style={{ 
                  width: 60, height: 80, background: item.c, 
                  cursor: 'grab', position: 'relative'
                }} 
              >
                {/* String and Tag */}
                <div style={{ position:'absolute', top:-20, left:28, width:2, height:20, background:'#bbb'}}></div>
                <div style={{ position:'absolute', top:-25, left:23, width:12, height:12, background:'#d48c96'}}></div>
              </motion.div>
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </div>
    </div>
  );
}