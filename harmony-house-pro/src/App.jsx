import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

// Components
import AudioController, { playSound } from './components/AudioController';
import MenuScreen from './components/MenuScreen';
import SplashScreen from './components/SplashScreen';
import LevelSelectScreen from './components/LevelSelectScreen';

// Levels
import LevelCutlery from './levels/LevelCutlery';
import LevelBooks from './levels/LevelBooks';
import LevelCans from './levels/LevelCans';
import LevelTea from './levels/LevelTea';
import LevelPlants from './levels/LevelPlants';
import LevelDaily from './levels/LevelDaily'; // New Import

// The Main Level List
const levels = [
  { id: 'cutlery', comp: LevelCutlery, title: 'Silverware' },
  { id: 'books', comp: LevelBooks, title: 'Bookshelf' },
  { id: 'cans', comp: LevelCans, title: 'The Pantry' },
  { id: 'tea', comp: LevelTea, title: 'Tea Time' },
  { id: 'plants', comp: LevelPlants, title: 'Pruning' },
];

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showSplash, setShowSplash] = useState(false);

  // Check mode
  const isDaily = location.pathname === '/daily';

  // --- ACTIONS ---
  
  const handleWin = () => {
    playSound('win');
    setShowSplash(true);
  };

  const goToNextLevel = () => {
    setShowSplash(false);
    const currentId = location.pathname.split('/').pop();
    const currentIdx = levels.findIndex(l => l.id === currentId);
    if (currentIdx !== -1 && currentIdx < levels.length - 1) {
       navigate(`/play/${levels[currentIdx + 1].id}`);
    } else {
       navigate('/levels'); // No next level? Go to selection.
    }
  };

  const goToMenu = () => {
    setShowSplash(false);
    navigate('/');
  };

  const goToLevelSelect = () => {
    setShowSplash(false);
    navigate('/levels');
  };

  // --- SPLASH SCREEN CONFIGURATION ---

  const getSplashProps = () => {
    if (isDaily) {
      return {
        title: "Daily Tidy Complete",
        primaryAction: { label: "Back to Menu", onClick: goToMenu },
        secondaryAction: null // Daily only goes back home
      };
    } else {
      // Standard Level Logic
      const currentId = location.pathname.split('/').pop();
      const currentIdx = levels.findIndex(l => l.id === currentId);
      const hasNext = currentIdx !== -1 && currentIdx < levels.length - 1;

      return {
        title: "Harmony Restored",
        // If there is a next level, Primary is "Next". If last level, Primary is "Level Select"
        primaryAction: hasNext 
          ? { label: "Next Level →", onClick: goToNextLevel }
          : { label: "Select Another", onClick: goToLevelSelect },
        
        // Secondary is always "Main Menu" (or Select Level if you prefer)
        secondaryAction: { label: "Main Menu", onClick: goToMenu }
      };
    }
  };

  const splashProps = getSplashProps();

  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      <AudioController />
      <AnimatePresence>
        {showSplash && (
          <SplashScreen 
            title={splashProps.title}
            primaryAction={splashProps.primaryAction}
            secondaryAction={splashProps.secondaryAction}
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          
          <Route path="/" element={<PageWrapper><MenuScreen /></PageWrapper>} />
          
          <Route path="/levels" element={<PageWrapper><LevelSelectScreen levels={levels} /></PageWrapper>} />

          {/* Daily Route uses the new Complex Level */}
          <Route path="/daily" element={<PageWrapper><LevelDaily onWin={handleWin}/></PageWrapper>} />

          {/* Standard Levels */}
          {levels.map((lvl) => (
            <Route 
              key={lvl.id} 
              path={`/play/${lvl.id}`} 
              element={<PageWrapper><lvl.comp onWin={handleWin} /></PageWrapper>} 
            />
          ))}

        </Routes>
      </AnimatePresence>
    </div>
  );
}

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