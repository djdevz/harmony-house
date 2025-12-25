import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ShareButton from '../components/ShareButton'; // Ensure path is correct
import { playSound } from '../components/AudioController';

// --- RESPONSIVE CSS ART ---
// We use viewBox to make them scale perfectly to any size
const Fork = () => (
  <svg viewBox="0 0 40 100" style={{ width: '100%', height: '100%', dropShadow: '2px 2px 2px rgba(0,0,0,0.2)' }}>
    <path d="M5 0 V40 Q5 50 20 50 Q35 50 35 40 V0 M12 0 V35 M20 0 V35 M28 0 V35 M20 50 V95 Q20 100 24 100 H16 Q20 100 20 95" 
          fill="none" stroke="#999" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

const Knife = () => (
  <svg viewBox="0 0 25 100" style={{ width: '100%', height: '100%' }}>
    <path d="M5 0 H15 Q20 0 20 10 V50 H5 V0 Z" fill="#bbb" />
    <path d="M8 50 H17 V95 Q17 100 12.5 100 Q8 100 8 95 Z" fill="#888" />
  </svg>
);

const Spoon = () => (
  <svg viewBox="0 0 40 100" style={{ width: '100%', height: '100%' }}>
    <path d="M5 20 Q5 0 20 0 Q35 0 35 20 Q35 50 20 50 Q5 50 5 20" fill="#bbb" />
    <path d="M18 50 V95 Q18 100 22 100 H18 Q16 100 16 95 V50" stroke="#bbb" strokeWidth="6" />
  </svg>
);

export default function LevelCutlery({ onWin }) {
  const containerRef = useRef(null);
  
  const [items, setItems] = useState([
    { id: 'f1', type: 'fork', comp: <Fork /> },
    { id: 'k1', type: 'knife', comp: <Knife /> },
    { id: 's1', type: 'spoon', comp: <Spoon /> },
    { id: 'f2', type: 'fork', comp: <Fork /> },
    { id: 'k2', type: 'knife', comp: <Knife /> },
    { id: 's2', type: 'spoon', comp: <Spoon /> },
    { id: 'f3', type: 'fork', comp: <Fork /> },
  ]);

  const [matches, setMatches] = useState(0);

  useEffect(() => {
    if (matches === 7) setTimeout(onWin, 500);
  }, [matches]);

  const handleDragEnd = (e, info, item) => {
    // We calculate drop position relative to the screen width
    const droppedX = info.point.x;
    const droppedY = info.point.y;
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    // Drawer is the top 75% of the screen
    const drawerBottom = height * 0.40;

    if (droppedY < drawerBottom) {
      let isCorrect = false;
      // Fork (Left 33%), Knife (Mid 33%), Spoon (Right 33%)
      if (item.type === 'fork' && droppedX < width / 3) isCorrect = true;
      if (item.type === 'knife' && droppedX > width / 3 && droppedX < (width/3)*2) isCorrect = true;
      if (item.type === 'spoon' && droppedX > (width/3)*2) isCorrect = true;

      if (isCorrect) {
        setItems(prev => prev.filter(i => i.id !== item.id));
        setMatches(m => m + 1);
      }
    }
  };

  return (
    <div ref={containerRef} style={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      
      {/* HEADER: Back & Share Buttons */}
      <div style={styles.header}>
        <Link to="/" style={{ textDecoration: 'none' }}>
            <button style={styles.navBtn}>← Menu</button>
        </Link>
        <ShareButton />
      </div>

      {/* DRAWER (75% of Screen) */}
      <div style={styles.drawerContainer}>
        {/* Fork Slot */}
        <div style={styles.slot}>
           <div style={styles.ghostIcon}><Fork /></div>
        </div>
        {/* Knife Slot */}
        <div style={{...styles.slot, borderLeft:'2px solid rgba(0,0,0,0.1)', borderRight:'2px solid rgba(0,0,0,0.1)'}}>
           <div style={{...styles.ghostIcon, width: '30%'}}><Knife /></div>
        </div>
        {/* Spoon Slot */}
        <div style={styles.slot}>
           <div style={styles.ghostIcon}><Spoon /></div>
        </div>
      </div>

      {/* THE PILE (Bottom 25%) */}
      <div style={styles.pileContainer}>
        {items.map((item, i) => (
          <motion.div
            key={item.id}
            drag
            onDragStart={() => playSound('pop')}
            dragConstraints={containerRef}
            dragElastic={0.1}
            whileDrag={{ scale: 1.2, zIndex: 100 }}
            onDragEnd={(e, info) => handleDragEnd(e, info, item)}
            initial={{ 
              x: (Math.random() * 100) - 50, // Scatter horizontally
              y: (Math.random() * 20)        // Slight vertical scatter
            }}
            style={{
              position: 'absolute',
              // Center the pile in the bottom area
              left: '50%', 
              top: '20%',
              width: item.type === 'knife' ? 40 : 60, // Sizing
              height: 120,
              cursor: 'grab',
              filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.2))'
            }}
          >
            {item.comp}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  header: {
    position: 'absolute', top: 10, left: 0, width: '100%', 
    padding: '0 20px', display: 'flex', justifyContent: 'space-between', zIndex: 50
  },
  navBtn: {
    background: 'rgba(255,255,255,0.8)', border: 'none', padding: '8px 15px', 
    borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold', color: '#555'
  },
  drawerContainer: {
    height: '40vh', // <--- Force it to be smaller (40% of viewport)
    background: '#f4f4f4',
    margin: '60px 20px 0 20px', 
    borderRadius: '15px 15px 0 0',
    display: 'flex',
    boxShadow: 'inset 0 5px 20px rgba(0,0,0,0.05)',
    border: '1px solid #ddd'
  },
  slot: {
    flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: 'rgba(255,255,255,0.4)'
  },
  ghostIcon: {
    opacity: 0.15, width: '50%', height: '50%'
  },
  pileContainer: {
    flex: 1, 
    height: '50vh', // <--- Explicitly give the pile space
    background: 'rgba(255,255,255,0.3)', // Lighter background to see items
    position: 'relative',
    margin: '0 20px 20px 20px',
    borderRadius: '0 0 15px 15px'
  }
};