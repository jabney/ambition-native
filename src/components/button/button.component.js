import React from 'react'
import { Text, TouchableOpacity, Animated } from 'react-native'

import styles from './button.styles'

/**
 * A simple button component.
 */
const Button = ({ title, onPress, style, containerStyle }) => (
  <Animated.View style={[styles.container, containerStyle]}>
    <TouchableOpacity onPress={onPress} activeOpacity={0.5}>
      <Text style={[styles.text, style]}>{title}</Text>
    </TouchableOpacity>
  </Animated.View>
)

Button.defaultProps = {
  title: '',
  onPress: () => console.log('press'),
  style: {},
  containerStyle: {},
}

export default Button
