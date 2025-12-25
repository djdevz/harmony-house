import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ShareButton from './ShareButton'; // Make sure you have this component created

export default function MenuScreen() {
  return (
    <div style={styles.container}>
      {/* Title */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        style={{ textAlign: 'center' }}
      >
        <h1 style={styles.title}>HARMONY</h1>
        <p style={{ opacity: 0.6, marginTop: -30, marginBottom: 40 }}>restore order</p>
      </motion.div>
      
      <div style={styles.menu}>
        {/* Daily Challenge */}
        <Link to="/daily" style={{ textDecoration: 'none' }}>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{...styles.btn, background: '#d48c96', color: 'white'}}
          >
            📅 Daily Tidy
          </motion.button>
        </Link>

        {/* Level Select */}
        <Link to="/levels" style={{ textDecoration: 'none' }}>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={styles.btn}
          >
            🧩 Level Select
          </motion.button>
        </Link>
        
        {/* Share Button for Home */}
        <div style={{ marginTop: 20 }}>
          <ShareButton />
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    height: '100%', width: '100%'
  },
  title: {
    fontSize: '3.5rem', letterSpacing: '8px', color: '#586e75', 
    textShadow: '2px 2px 0px rgba(255,255,255,0.5)'
  },
  menu: { display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center' },
  btn: {
    padding: '18px 50px', fontSize: '1.2rem', borderRadius: '50px', border: 'none',
    cursor: 'pointer', background: '#fdf6e3', color: '#586e75', fontWeight: 'bold',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)', width: '280px'
  }
};