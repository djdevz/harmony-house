import React from 'react';
import { motion } from 'framer-motion';

export default function SplashScreen({ title, primaryAction, secondaryAction }) {
  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
      background: 'rgba(255,255,255,0.95)', zIndex: 100,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
    }}>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1, rotate: 360 }}
        transition={{ type: 'spring', damping: 10 }}
        style={{ fontSize: '5rem', marginBottom: 20 }}
      >
        ✨
      </motion.div>
      
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ color: '#d48c96', margin: '0 0 40px 0', fontFamily: 'Quicksand' }}
      >
        {title}
      </motion.h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 15, width: 200 }}>
        {/* Primary Button (e.g., Next Level) */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={primaryAction.onClick}
          style={styles.primaryBtn}
        >
          {primaryAction.label}
        </motion.button>

        {/* Secondary Button (e.g., Menu or Level Select) */}
        {secondaryAction && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={secondaryAction.onClick}
            style={styles.secondaryBtn}
          >
            {secondaryAction.label}
          </motion.button>
        )}
      </div>
    </div>
  );
}

const styles = {
  primaryBtn: {
    padding: '15px', fontSize: '1.1rem',
    background: '#586e75', color: 'white', border: 'none', borderRadius: 50,
    cursor: 'pointer', fontWeight: 'bold'
  },
  secondaryBtn: {
    padding: '12px', fontSize: '1rem',
    background: 'transparent', color: '#586e75', border: '2px solid #586e75', borderRadius: 50,
    cursor: 'pointer', fontWeight: 'bold'
  }
};