import React, { useState } from 'react'
import { TextInput, Animated } from 'react-native'
import labelAnimations from './slick-input.animations'

import styles from './slick-input.styles'

/**
 * Animated input field.
 */
const SlickInput = ({ label, value, onChangeText, containerStyle, inputStyle, ...props }) => {
  const [animation] = useState(() => new Animated.Value(0))
  const [anims] = useState(() => labelAnimations(animation))

  /**
   * Move the field label in/out of input.
   */
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

  return <Animated.View style={[styles.container, containerStyle]}>
    <TextInput style={[styles.input, inputStyle]}
      value={value}
      onChangeText={onChangeText}
      onFocus={() => moveLabel(true)}
      onBlur={() => moveLabel(false)}
      {...props}
    />
    <Animated.View style={[styles.labelContainer, anims.container]} pointerEvents='none'>
      <Animated.Text style={[styles.label, anims.text]}>{label}</Animated.Text>
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
