import { useState } from 'react';
import BottomNav from './components/BottomNav';
import HomeScreen from './screens/HomeScreen';
import CaptureScreen from './screens/CaptureScreen';
import MapScreen from './screens/MapScreen';
import SpeciesScreen from './screens/SpeciesScreen';
import ProfileScreen from './screens/ProfileScreen';
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

  if (!isAuthenticated) {
    return <AuthScreen onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <>
      {/* App Content */}
      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', scrollBehavior: 'smooth' }}>
        {renderScreen()}
      </div>

      {/* Global Navigation - Hidden on Capture Screen to match Figma/Mockup */}
      {activeTab !== 1 && (
        <BottomNav active={activeTab} onChange={setActiveTab} />
      )}
    </>
  );
}
