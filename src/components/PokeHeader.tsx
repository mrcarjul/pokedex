import React, {ReactElement, memo} from 'react';

// Core
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

// Themes
import {colors, genericStyles, metrics} from '../theme';

// Utils
import PropTypes from 'prop-types';

interface PokeHeaderProps {
  leftContent: ReactElement;
  rightContent?: ReactElement;
  centerTxt: string;
  txtStyle?: StyleProp<TextStyle>;
  headerStyle?: StyleProp<ViewStyle>;
}

/**
 * @description Header component
 * @param {element} leftContent
 * @param {element} rightContent
 * @param {string} centerTxt Title txt of the header
 * @param {object} txtStyle Title txt style
 * @param {object} headerStyle Personalized styles for component
 */
function PokeHeader({
  leftContent,
  centerTxt,
  rightContent,
  txtStyle,
  headerStyle,
}: PokeHeaderProps) {
  return (
    <View
      style={[
        styles.alignItemsCenter,
        styles.row,
        styles.pokeHeader,
        headerStyle,
      ]}>
      <View style={styles.container}>{leftContent}</View>
      <View style={styles.title}>
        <Text style={[styles.titleTxt, txtStyle]}>{centerTxt}</Text>
      </View>
      <View style={styles.container}>{rightContent}</View>
    </View>
  );
}

PokeHeader.propTypes = {
  centerTxt: PropTypes.string.isRequired,
  leftContent: PropTypes.element,
  rightContent: PropTypes.element,
  headerStyle: PropTypes.object,
  txtStyle: PropTypes.object,
};

const styles = StyleSheet.create({
  ...genericStyles,
  pokeHeader: {
    height: 54,
  },
  title: {
    height: metrics.navBarHeight,
    paddingVertical: 10,
    zIndex: 30,
  },
  titleTxt: {
    color: colors.primary,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default memo(PokeHeader);
