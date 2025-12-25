import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reorder } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function LevelDaily({ onWin }) {
  // --- STATE FOR 3 MINI GAMES ---
  
  // 1. PICTURE FRAME (Rotated)
  const [rotation, setRotation] = useState(15); // Start crooked
  
  // 2. MINI BOOKS (Unsorted)
  const [books, setBooks] = useState([
    { id: 'b3', h: 50, c: '#85929e' },
    { id: 'b1', h: 30, c: '#2c3e50' },
    { id: 'b2', h: 40, c: '#5d6d7e' },
  ]);

  // 3. DEAD LEAF (Click to remove)
  const [leafDead, setLeafDead] = useState(true);

  // --- WIN CHECKER ---
  useEffect(() => {
    // Check Picture (Must be 0)
    const picDone = rotation === 0;
    
    // Check Books (Small to Tall: b1, b2, b3)
    const booksIds = books.map(b => b.id).join('');
    const booksDone = booksIds === 'b1b2b3';
    
    // Check Leaf (Must be false/gone)
    const leafDone = !leafDead;

    if (picDone && booksDone && leafDone) {
      setTimeout(onWin, 600);
    }
  }, [rotation, books, leafDead]);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      
      <div style={{ position:'absolute', top:10, left:20 }}>
        <Link to="/" style={{textDecoration:'none', color:'#555', fontWeight:'bold'}}>← Give Up</Link>
      </div>
      
      <h2 style={{ color: '#555', marginBottom: 40 }}>The Morning Room</h2>

      {/* THE ROOM CONTAINER */}
      <div style={{ 
        width: 300, height: 400, background: '#fdf6e3', 
        borderRadius: 20, boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        position: 'relative', overflow: 'hidden', border: '8px solid white'
      }}>
        
        {/* TASK 1: THE PICTURE FRAME (On Wall) */}
        <div style={{ position: 'absolute', top: 50, left: '50%', transform: 'translateX(-50%)' }}>
          <motion.div
            animate={{ rotate: rotation }}
            onClick={() => setRotation(r => (r === 0 ? 15 : 0))} // Toggle for interaction
            style={{ 
              width: 100, height: 80, background: '#fff', 
              border: '4px solid #d48c96', boxShadow: '0 5px 10px rgba(0,0,0,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
            }}
          >
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#ffebee' }}></div>
          </motion.div>
        </div>

        {/* TASK 2: THE BOOKSHELF (Bottom Left) */}
        <div style={{ position: 'absolute', bottom: 100, left: 20 }}>
          <div style={{ width: 120, height: 10, background: '#8d6e63', marginBottom: 0 }}></div>
          <Reorder.Group axis="x" values={books} onReorder={setBooks} style={{ display: 'flex', gap: 2, padding: 0, listStyle:'none', position:'absolute', bottom: 10 }}>
            {books.map(b => (
              <Reorder.Item key={b.id} value={b} style={{ listStyle:'none' }}>
                <div style={{ width: 25, height: b.h, background: b.c, borderRadius: '2px 2px 0 0', cursor: 'grab' }}></div>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </div>

        {/* TASK 3: THE PLANT (Bottom Right) */}
        <div style={{ position: 'absolute', bottom: 30, right: 30 }}>
          {/* Pot */}
          <div style={{ width: 60, height: 50, background: '#e0e0e0', borderRadius: '0 0 10px 10px' }}></div>
          {/* Stem */}
          <div style={{ width: 4, height: 100, background: '#558b2f', position: 'absolute', bottom: 50, left: 28 }}></div>
          
          {/* Living Leaf */}
          <div style={{ width: 30, height: 30, background: '#81c784', borderRadius: '0 50% 0 50%', position: 'absolute', bottom: 90, left: 0 }}></div>
          
          {/* DEAD LEAF (Click to prune) */}
          <AnimatePresence>
            {leafDead && (
              <motion.div
                exit={{ y: 50, opacity: 0, rotate: 90 }}
                onClick={() => setLeafDead(false)}
                style={{ 
                  width: 30, height: 30, background: '#8d6e63', 
                  borderRadius: '0 50% 0 50%', position: 'absolute', bottom: 70, right: -10,
                  cursor: 'pointer', transform: 'scaleX(-1)'
                }}
              />
            )}
          </AnimatePresence>
        </div>

      </div>
      
      <p style={{ marginTop: 20, opacity: 0.6, fontSize: '0.9rem' }}>Fix the picture, Sort books, Prune plant</p>
    </div>
  );
}