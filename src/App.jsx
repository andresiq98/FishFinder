import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BottomNav from './components/BottomNav';
import HomeScreen from './screens/HomeScreen';
import CaptureScreen from './screens/CaptureScreen';
import MapScreen from './screens/MapScreen';
import SpeciesScreen from './screens/SpeciesScreen';
import ProfileScreen from './screens/ProfileScreen';
import { APIProvider } from '@vis.gl/react-google-maps';
import AuthScreen from './screens/AuthScreen';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const renderScreen = () => {
    switch (activeTab) {
      case 0: return <HomeScreen setTab={setActiveTab} />;
      case 1: return <CaptureScreen setTab={setActiveTab} />;
      case 2: return <MapScreen />;
      case 3: return <SpeciesScreen />;
      case 4: return <ProfileScreen />;
      default: return <HomeScreen setTab={setActiveTab} />;
    }
  };

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY} onLoad={() => console.log('Maps API has loaded.')}>
      <AnimatePresence mode="wait">
        {!isAuthenticated ? (
          <motion.div
            key="auth"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            style={{ position: 'relative', zIndex: 50 }}
          >
            <AuthScreen onLogin={() => setIsAuthenticated(true)} />
          </motion.div>
        ) : (
          <motion.div
            key="app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}
          >
            {/* App Content */}
            <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', scrollBehavior: 'smooth' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  style={{ minHeight: '100%' }}
                >
                  {renderScreen()}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Global Navigation - Hidden on Capture Screen to match Figma/Mockup */}
            {activeTab !== 1 && (
              <BottomNav active={activeTab} onChange={setActiveTab} />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </APIProvider>
  );
}
