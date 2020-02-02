import { Animated } from 'react-native'

/**
 * @param {Animated.Value} animation
 */
const animations = (animation) => {

  const viewScale = animation.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [2, 1, 0],
  })

  const viewOpacity = animation.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, 1, 0],
  })

  const styles = {
    opacity: viewOpacity,
    transform: [{ scale: viewScale }],
  }

  return styles
}

export default animations
