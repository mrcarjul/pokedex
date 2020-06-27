import React from 'react';
import {StatusBar} from 'react-native';

// Navigation
import AppNavigation from './src/navigation';

function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <AppNavigation />
    </>
  );
}

export default App;
