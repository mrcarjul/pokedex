import React from 'react';

// Personalized Components
import {PokeStatusBar} from './src/components';

// Navigation
import AppNavigation from './src/navigation';

function App() {
  return (
    <>
      <PokeStatusBar />
      <AppNavigation />
    </>
  );
}

export default App;
