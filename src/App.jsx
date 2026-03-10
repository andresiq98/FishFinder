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
import { AuthProvider, useAuth } from './context/AuthContext';
import { COLORS as C } from './theme/colors';
import WaterBackground from './components/WaterBackground';

function AppContent() {
  const { user, loading } = useAuth();
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

  if (loading) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: C.nightRiver, position: 'relative', overflow: 'hidden' }}>
        <WaterBackground opacity={0.6} />
        <div style={{ position: 'relative', zIndex: 10, width: 40, height: 40, borderRadius: 20, border: `3px solid ${C.water}`, borderTopColor: 'transparent', animation: "spin 1s linear infinite" }} />
      </div>
    );
  }

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY} onLoad={() => console.log('Maps API has loaded.')}>
      <AnimatePresence mode="wait">
        {!user ? (
          <motion.div
            key="auth"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            style={{ position: 'relative', zIndex: 50 }}
          >
            <AuthScreen />
          </motion.div>
        ) : (
          <motion.div
            key="app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            style={{ height: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', background: C.nightRiver }}
          >
            {/* Global water background — fixed, shows through all screens */}
            <WaterBackground opacity={0.85} />

            {/* App Content */}
            <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', scrollBehavior: 'smooth', position: 'relative', zIndex: 1 }}>
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
              <div style={{ position: 'relative', zIndex: 2 }}>
                <BottomNav active={activeTab} onChange={setActiveTab} />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </APIProvider>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
