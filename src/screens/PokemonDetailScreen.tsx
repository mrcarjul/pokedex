import React from 'react';

// Core
import {StyleSheet, Text, View} from 'react-native';

// Theme
import {genericStyles} from '../theme';

/**
 * @description Screen to display Pokemon detailed info
 */
function PokemonDetailScreen() {
  return (
    <View style={[styles.container, styles.centerContents]}>
      <Text>PokemonDetailScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  ...genericStyles,
});

export default PokemonDetailScreen;
