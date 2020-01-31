import { Animated } from 'react-native'

/**
 * @param {Animated.Value} animation
 */
const baseAnims = (animation) => {
  /**
   * Email field is animated in the first 1/4 of the animation value.
   */

  const email = animation.interpolate({
    inputRange: [0, 0.25],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  })

  /**
   * Password field is animated in the second 1/4 of the animation value.
   */

  const pass = animation.interpolate({
    inputRange: [0.25, 0.5],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  })

  /**
   * Button is animated in the third 1/4 of the animation value.
   */

  const button = animation.interpolate({
    inputRange: [0.5, 0.75],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  })

  /**
   * Link is animated in the third 1/4 of the animation value.
   */

  const link = animation.interpolate({
    inputRange: [0.75, 1],
    outputRange: [0, 1],
  })

  return { email, pass, button, link }
}

/**
 * @param {Animated.Value} animation
 *
 * @returns {any}
 */
const drop = (animation) => {
  /**
   * Email
   */

   const base = baseAnims(animation)

  const email = {
    opacity: base.email,
    transform: [
      { scale: base.email },
    ]
  }

  /**
   * Password
   */

  const passOpacity = base.pass.interpolate({
    inputRange: [0, 0.35, 1],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
  })

  const passDrop = base.pass.interpolate({
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
   * Button
   */

  const buttonOpacity = base.button.interpolate({
    inputRange: [0, 0.35, 1],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
  })

  const buttonDrop = base.button.interpolate({
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
   * Link
   */

  const linkOpacity = base.link.interpolate({
    inputRange: [0, 0.35, 1],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
  })

  const linkDrop = base.link.interpolate({
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

/**
 * @param {Animated.Value} animation
 *
 * @returns {any}
 */
const zoom = (animation) => {
  /**
   * Email
   */

   const base = baseAnims(animation)

  const email = {
    opacity: base.email,
    transform: [
      { scale: base.email },
    ]
  }

  /**
   * Password
   */

  const password = {
    opacity: base.pass,
    transform: [
      { scale: base.pass },
    ]
  }

  /**
   * Button
   */

  const button  = {
    opacity: base.button,
    transform: [
      { scale: base.button }
    ]
  }

  /**
   * Link
   */

  const link  = {
    opacity: base.link,
    transform: [
      { scale: base.link }
    ]
  }

  return { email, password, button, link }
}

/**
 * @type {Map<string, any>}
 */
const map = new Map([
  ['drop', drop],
  ['zoom', zoom],
])

/**
 * @param {Animated.Value} animation
 * @param {'drop'|'zoom'} animation
 */
const animations = (animation, type) => {
  const anims = map.get(type) || drop
  return anims(animation)
}

export default animations
