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

// Personalized components
import PokeButton from './PokeButton';

// Themes
import {colors, genericStyles, metrics} from '../theme';

// Utils
import PropTypes from 'prop-types';

interface PokeHeaderProps {
  goBack?: () => void;
  rightContent?: ReactElement;
  centerTxt: string;
  txtStyle?: StyleProp<TextStyle>;
  headerStyle?: StyleProp<ViewStyle>;
}

/**
 * @description Header component
 * @param {function} goBack
 * @param {element} rightContent
 * @param {string} centerTxt Title txt of the header
 * @param {object} txtStyle Title txt style
 * @param {object} headerStyle Personalized styles for component
 */
function PokeHeader({
  goBack,
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
      {goBack ? (
        <PokeButton
          style={styles.container}
          onPress={goBack}
          borderless={true}
          pressColor={colors.background}>
          <Text style={styles.goBack}> {'<'} </Text>
        </PokeButton>
      ) : (
        <View style={styles.container} />
      )}
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
    height: metrics.navBarHeight,
  },
  goBack: {
    color: colors.text,
    fontWeight: 'bold',
    fontSize: 26,
    textAlign: 'center',
  },
  title: {
    flex: 5,
    paddingVertical: 10,
    zIndex: 30,
  },
  titleTxt: {
    color: colors.text,
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
  },
});

export default memo(PokeHeader);
