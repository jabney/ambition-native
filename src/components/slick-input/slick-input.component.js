import React, { useState } from 'react'
import { View, Text, TextInput, Animated, StyleSheet } from 'react-native'
import pad from './pad'

import styles from './slick-input.styles'

const SlickInput = ({ label, value, onChangeText, containerStyle, inputStyle, ...props }) => {
  const [animation] = useState(() => new Animated.Value(0))

  const labelPos = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -pad.top - pad.vertical - pad.border - 2],
  })

  const labelColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['gray', 'black'],
  })

  const labelSize = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [14, 12],
  })

  const labelContainer = {
    transform: [{ translateY: labelPos }],
  }

  const labelText = {
    color: labelColor,
    fontSize: labelSize,
  }

  const moveLabel = (focused = false) => {
    if (value.length > 0) {
      return void animation.setValue(1)
    }

    if (focused) {
      Animated.timing(animation, { toValue: 1, duration: 250 }).start()
    } else {
      Animated.timing(animation, { toValue: 0, duration: 250 }).start()
    }
  }

  /**
   *
   */
  const onText = (value) => {
    onChangeText(value)
  }

  return <Animated.View style={[styles.container, containerStyle]}>
    <TextInput style={[styles.input, inputStyle]}
      value={value}
      onChangeText={onText}
      onFocus={() => moveLabel(true)}
      onBlur={() => moveLabel(false)}
      {...props}
    />
    <Animated.View style={[styles.labelContainer, labelContainer]} pointerEvents='none'>
      <Animated.Text style={[styles.label, labelText]}>{label}</Animated.Text>
    </Animated.View>
  </Animated.View>
}

export default SlickInput

SlickInput.defaultProps = {
  label: '',
  value: '',
  containerStyle: null,
  inputStyle: null,
  onChangeText: () => console.log('slick input'),
}
