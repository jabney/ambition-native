import { Animated } from 'react-native'
import pad from './pad'

/**
 * @param {Animated.Value} animation
 */
const animations = (animation) => {

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

  const container = {
    transform: [{ translateY: labelPos }],
  }

  const text = {
    color: labelColor,
    fontSize: labelSize,
  }

  return { container, text }
}

export default animations
