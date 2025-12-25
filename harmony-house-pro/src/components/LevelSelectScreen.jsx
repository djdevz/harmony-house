import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function LevelSelectScreen({ levels }) {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <button style={styles.navBtn}>← Back</button>
        </Link>
        <h2 style={{ color: '#586e75', margin: 0 }}>Select a Puzzle</h2>
        <div style={{ width: 50 }}></div> {/* Spacer for centering */}
      </div>

      <div style={styles.grid}>
        {levels.map((level, index) => (
          <Link 
            key={level.id} 
            to={`/play/${level.id}`} 
            style={{ textDecoration: 'none' }}
          >
            <motion.div 
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              style={styles.card}
            >
              <div style={styles.icon}>{getLevelIcon(level.id)}</div>
              <div style={styles.title}>{level.title}</div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}

// Helper to give each level a visual emoji (optional)
const getLevelIcon = (id) => {
  if (id === 'cutlery') return '🍴';
  if (id === 'books') return '📚';
  if (id === 'cans') return '🥫';
  if (id === 'tea') return '🍵';
  if (id === 'plants') return '🌿';
  return '🧩';
};

const styles = {
  container: {
    height: '100%', display: 'flex', flexDirection: 'column', 
    padding: '20px', overflowY: 'auto'
  },
  header: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: '30px'
  },
  navBtn: {
    background: 'rgba(255,255,255,0.8)', border: 'none', padding: '10px 20px', 
    borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold', color: '#555',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
  },
  grid: {
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', 
    gap: '20px',
    paddingBottom: '40px'
  },
  card: {
    background: '#fdf6e3', borderRadius: '15px', padding: '20px',
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    boxShadow: '0 5px 15px rgba(0,0,0,0.05)', height: '120px',
    cursor: 'pointer'
  },
  icon: { fontSize: '3rem', marginBottom: '10px' },
  title: { color: '#586e75', fontWeight: 'bold', fontSize: '1rem', textAlign: 'center' }
};