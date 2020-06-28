import React, {memo} from 'react';

// Core
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedbackProps,
  TouchableOpacityProps,
  View,
  ViewStyle,
  ViewPropTypes,
  Text,
} from 'react-native';

// Personalized components
import PokeButton from './PokeButton';

// Theme
import {colors, genericStyles, metrics} from '../theme';

// Utils
import PropTypes from 'prop-types';

interface PokeSectionProps {
  name: string;
  pokemonId: string;
  onPress: () => void;
}

/**
 * @description Generic button container to manage correct touchable in given platform
 */
function PokeSection({name, pokemonId, onPress}: PokeSectionProps) {
  console.log(pokemonId);
  return (
    <PokeButton
      style={styles.section}
      onPress={onPress}
      borderless={true}
      pressColor={colors.background}>
      <View style={styles.container}>
        <View style={styles.top}>
          <Text>{pokemonId}</Text>
        </View>
        <View style={[styles.centerContents, styles.container]}>
          <Image
            source={{
              uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${pokemonId}.png`,
            }}
            style={styles.image}
          />
        </View>
        <View style={styles.bottomContainer}>
          <Text>{name}</Text>
        </View>
      </View>
    </PokeButton>
  );
}

const styles = StyleSheet.create({
  ...genericStyles,
  bottomContainer: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width: metrics.width / 3 - 80,
    height: metrics.width / 3 - 80,
  },
  section: {
    backgroundColor: colors.background,
    borderRadius: 15,
    height: metrics.width / 3 - 20,
    margin: 10,
    padding: 20,
    width: metrics.width / 3 - 20,
  },
  top: {
    flex: 1,
  },
});

PokeSection.propTypes = {
  onPress: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  ...ViewPropTypes,
};

export default memo(PokeSection);
