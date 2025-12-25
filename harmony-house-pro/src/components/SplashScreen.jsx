import React from 'react';
import { motion } from 'framer-motion';

export default function SplashScreen({ title, onNext }) {
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
        ⭐
      </motion.div>
      
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ color: '#d48c96', margin: 0 }}
      >
        {title}
      </motion.h1>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onNext}
        style={{
          marginTop: 40, padding: '15px 40px', fontSize: '1.2rem',
          background: '#586e75', color: 'white', border: 'none', borderRadius: 50,
          cursor: 'pointer'
        }}
      >
        Next Level →
      </motion.button>
    </div>
  );
}