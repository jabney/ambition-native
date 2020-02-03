import { Animated } from 'react-native'
import pad from './pad'

/**
 * @param {Animated.Value} animation
 */
const animations = (animation) => {

  const labelY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -pad.top - pad.vertical - pad.border - 3],
  })

  const labelX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -4],
  })

  const labelColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['gray', 'black'],
  })

  const labelSize = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.9],
  })

  const container = {
    transform: [
      { translateY: labelY },
      { translateX: labelX },
    ],
  }

  const text = {
    color: labelColor,
    transform: [{ scale: labelSize }],
  }

  return { container, text }
}

export default animations
