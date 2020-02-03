import React from 'react'
import { View, Text, TouchableOpacity, Animated, ActivityIndicator } from 'react-native'

import styles from './button.styles'

/**
 * A simple button component.
 */
const Button = ({ title, onPress, style, containerStyle, busy, disabled }) => {
  /**
   * On button press.
   */
  const button = () => {
    if (!disabled) {
      onPress()
    }
  }

  return <Animated.View style={[styles.container, containerStyle]}>
    <TouchableOpacity onPress={button} activeOpacity={0.75} disabled={busy || disabled}>
      <View style={[styles.button, style, disabled ? styles.disabled : {}]}>
        {
          busy ? (
            <ActivityIndicator size='small' color='white' />
          ) : (
            <Text style={styles.text}>{title}</Text>
          )
        }
      </View>
    </TouchableOpacity>
  </Animated.View>
}

Button.defaultProps = {
  title: '',
  onPress: () => console.log('press'),
  style: {},
  containerStyle: {},
  busy: false,
  disabled: false,
}

export default Button
