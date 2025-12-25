import React, { useState, useEffect } from 'react';
import { Reorder, motion } from 'framer-motion';

export default function LevelTea({ onWin }) {
  const [items, setItems] = useState([
    { id: '1', c: '#ffebee' }, // Lightest
    { id: '2', c: '#ffcdd2' },
    { id: '3', c: '#ef9a9a' },
    { id: '4', c: '#e57373' }, // Darkest
  ].sort(() => Math.random() - 0.5));

  useEffect(() => {
    const isSorted = items[0].id === '1' && items[1].id === '2' && items[2].id === '3' && items[3].id === '4';
    if (isSorted) setTimeout(onWin, 500);
  }, [items]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
      <h2>Gradient Sort</h2>
      <div style={{ padding: 20, background: '#eee', borderRadius: 10 }}>
        <Reorder.Group axis="x" values={items} onReorder={setItems} style={{ display: 'flex', gap: 5, padding: 0 }}>
          {items.map(item => (
            <Reorder.Item key={item.id} value={item} style={{ listStyle: 'none' }}>
              <motion.div style={{ width: 60, height: 80, background: item.c, borderRadius: 4, cursor: 'grab', border: '1px solid rgba(0,0,0,0.1)' }} />
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </div>
    </div>
  );
}