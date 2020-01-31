import { useState, useEffect } from 'react'
import { Animated, Dimensions } from 'react-native'

const useAnimations = (setLogoValue) => {
  // const [logoValue, setLogoValue] = useState(1)

  const [scroll] = useState(() => new Animated.Value(0))
  const [signin] = useState(() => new Animated.Value(0))
  const [signup] = useState(() => new Animated.Value(0))

  const { width } = Dimensions.get('window')

  /**
   * @type {Animated.AnimatedInterpolation & {__getValue: () => number}}
   */
  const logoInterpolator = (scroll.interpolate({
    inputRange: [-width, 0, width, 2*width, 3*width, 4*width],
    outputRange: [0, 1, 0, 1, 0, 1],
    extrapolate: 'clamp',
  }))

  /**
   * @type {Animated.AnimatedInterpolation & {__getValue: () => number}}
   */
  const signinInterpolator = (scroll.interpolate({
    inputRange: [-width, 0, width],
    outputRange: [0, 1, 0],
    extrapolate: 'clamp',
  }))

  /**
   * @type {Animated.AnimatedInterpolation & {__getValue: () => number}}
   */
  const signupInterpolator = (scroll.interpolate({
    inputRange: [0, width, 2*width],
    outputRange: [0, 1, 0],
    extrapolate: 'clamp',
  }))

  // Set up animation listeners.
  useEffect(() => {
    scroll.addListener(({ value }) => {
      setLogoValue(logoInterpolator.__getValue())
      signin.setValue(signinInterpolator.__getValue())
      signup.setValue(signupInterpolator.__getValue())
    })

    return () => scroll.removeAllListeners()
  }, [])

  return { scroll, signin, signup }
}

export default useAnimations
