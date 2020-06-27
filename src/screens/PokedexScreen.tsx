import React from 'react';

// Core
import {StyleSheet, Text, View} from 'react-native';

// Theme
import {genericStyles} from '../theme';

/**
 * @description Screen to display Pokedex
 */
function PokedexScreen() {
  return (
    <View style={[styles.container, styles.centerContents]}>
      <Text>PokedexScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  ...genericStyles,
});

export default PokedexScreen;
