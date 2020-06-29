import React from 'react';

// Personalized Components
import {PokeStatusBar} from './src/components';

// Navigation
import AppNavigation from './src/navigation';

// Redux
import {Provider} from 'react-redux';
import createStore from './src/redux/index';

export const {store} = createStore();

function App() {
  return (
    <Provider store={store}>
      <PokeStatusBar />
      <AppNavigation />
    </Provider>
  );
}

export default App;
