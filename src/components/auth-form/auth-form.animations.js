import { Animated } from 'react-native'

/**
 * @param {Animated.Value} animation
 */
const animations = (animation) => {

  /**
   * Email field is animated in the first 1/4 of the animation value.
   */

  const emailAnim = animation.interpolate({
    inputRange: [0, 0.25],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  })

  const email = {
    opacity: emailAnim,
    transform: [
      { scale: emailAnim },
    ]
  }

  /**
   * Password field is animated in the second 1/4 of the animation value.
   */

  const passAnim = animation.interpolate({
    inputRange: [0.25, 0.5],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  })

  const passOpacity = passAnim.interpolate({
    inputRange: [0, 0.35, 1],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
  })

  const passDrop = passAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-50, 0],
    extrapolate: 'clamp',
  })

  const password = {
    opacity: passOpacity,
    transform: [
      { translateY: passDrop },
    ]
  }

  /**
   * Button is animated in the third 1/4 of the animation value.
   */

  const buttonAnim = animation.interpolate({
    inputRange: [0.5, 0.75],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  })

  const buttonOpacity = buttonAnim.interpolate({
    inputRange: [0, 0.35, 1],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
  })

  const buttonDrop = buttonAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-50, 0],
    extrapolate: 'clamp',
  })

  const button  = {
    opacity: buttonOpacity,
    transform: [
      { translateY: buttonDrop }
    ]
  }

  /**
   * Link is animated in the third 1/4 of the animation value.
   */

  const linkAnim = animation.interpolate({
    inputRange: [0.75, 1],
    outputRange: [0, 1],
  })

  const linkOpacity = linkAnim.interpolate({
    inputRange: [0, 0.35, 1],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
  })

  const linkDrop = linkAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-50, 0],
    extrapolate: 'clamp',
  })

  const link  = {
    opacity: linkOpacity,
    transform: [
      { translateY: linkDrop }
    ]
  }

  return { email, password, button, link }
}

export default animations
