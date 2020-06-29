import React, {memo, ReactChildren} from 'react';

// Core
import {
  StyleProp,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableNativeFeedbackProps,
  TouchableOpacityProps,
  View,
  ViewStyle,
  ViewPropTypes,
  ViewProperties,
} from 'react-native';

// Theme
import {metrics} from '../theme';

// Utils
import PropTypes from 'prop-types';

interface PokeButtonProps {
  borderless: boolean;
  children: React.ReactElement<View> | Array<React.ReactElement<View>>;
  pressColor: string;
  style: StyleProp<ViewStyle>;
  onPress: () => void;
  props?: TouchableNativeFeedbackProps | TouchableOpacityProps;
}

/**
 * @description Generic button container to manage correct touchable in given platform
 */
function PokeButton({
  borderless,
  children,
  pressColor,
  style,
  onPress,
  ...props
}: PokeButtonProps) {
  if (metrics.isAndroid) {
    return (
      <TouchableNativeFeedback
        {...props}
        onPress={onPress}
        useForeground={TouchableNativeFeedback.canUseNativeForeground()}
        background={TouchableNativeFeedback.Ripple(pressColor, borderless)}>
        <View style={style}>{children}</View>
      </TouchableNativeFeedback>
    );
  }

  return (
    <TouchableOpacity style={style} onPress={onPress} {...props}>
      {children}
    </TouchableOpacity>
  );
}

PokeButton.propTypes = {
  onPress: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  ...ViewPropTypes,
};

export default memo(PokeButton);
