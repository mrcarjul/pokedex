import React, {useEffect, useState, memo} from 'react';

// Core
import {
  NativeModules,
  Platform,
  NativeEventEmitter,
  StatusBar,
  View,
} from 'react-native';

// External libs
import {getStatusBarHeight} from 'react-native-status-bar-height';

// Utils
import {colors} from '../theme';

interface StatusBarProps {
  height: number;
}

/**
 * @description Component in charge of status bar managment doing the right calculations
 */
function PokeStatusbar() {
  const [statusbarHeight, setStatusbarHeight] = useState(getStatusBarHeight());

  /**
   * @description effect needed for ios to detect changes in status bar due to shared hotspot(ios devices) or others
   */
  useEffect(() => {
    const {StatusBarManager} = NativeModules;
    if (Platform.OS === 'ios') {
      StatusBarManager.getHeight(
        ({height}: StatusBarProps): void => setStatusbarHeight(height),
      );
      const statusbarEmiter = new NativeEventEmitter(StatusBarManager);
      const listener = statusbarEmiter.addListener(
        'statusBarFrameWillChange',
        statusBarData => setStatusbarHeight(statusBarData.frame.height),
      );
      return () => listener.remove();
    }
  }, []);

  return (
    <View style={{height: statusbarHeight}}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={colors.backgroundAlt}
        translucent
      />
    </View>
  );
}

export default memo(PokeStatusbar);
