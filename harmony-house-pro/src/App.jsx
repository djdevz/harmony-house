import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import MenuScreen from './components/MenuScreen';
import SplashScreen from './components/SplashScreen';
import LevelCutlery from './levels/LevelCutlery';
import LevelBooks from './levels/LevelBooks';

// Level Config
const levels = [
  { id: 'cutlery', comp: LevelCutlery, title: 'Silverware' },
  { id: 'books', comp: LevelBooks, title: 'Bookshelf' },
];

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showSplash, setShowSplash] = useState(false);

  // Check if we are currently playing Daily mode
  const isDaily = location.pathname === '/daily';

  const handleWin = () => {
    setShowSplash(true);
  };

  const handleNext = () => {
    setShowSplash(false);
    
    // --- THE FIX IS HERE ---
    if (isDaily) {
      navigate('/'); // Go back to Menu
    } else {
      // Logic for Level Select (Find current level and go to next)
      const currentId = location.pathname.split('/').pop();
      const currentIdx = levels.findIndex(l => l.id === currentId);
      
      // If we are at the last level, loop to start, or go to menu
      if (currentIdx === -1 || currentIdx === levels.length - 1) {
         navigate('/'); // Done with all levels? Go menu.
      } else {
         const nextIdx = currentIdx + 1;
         navigate(`/play/${levels[nextIdx].id}`);
      }
    }
  };

  // Helper for smooth animations
  const PageWrapper = ({ children }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{ width: '100%', height: '100%' }}
    >
      {children}
    </motion.div>
  );

  return (
    <div className="app-container">
      <AnimatePresence>
        {showSplash && (
          <SplashScreen 
            // Change title/button based on mode
            title={isDaily ? "Daily Complete" : "Harmony Restored"} 
            onNext={handleNext}
            buttonText={isDaily ? "Back to Menu" : "Next Level →"} 
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageWrapper><MenuScreen /></PageWrapper>} />
          
          {/* Daily Route */}
          <Route path="/daily" element={<PageWrapper><LevelBooks onWin={handleWin} /></PageWrapper>} />

          {/* Level Routes */}
          {levels.map((lvl) => (
            <Route 
              key={lvl.id} 
              path={`/play/${lvl.id}`} 
              element={<PageWrapper><lvl.comp onWin={handleWin} /></PageWrapper>} 
            />
          ))}
          
          {/* Fallback */}
          <Route path="/levels" element={<PageWrapper><LevelCutlery onWin={handleWin} /></PageWrapper>} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}