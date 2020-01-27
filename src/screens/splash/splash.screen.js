import React, { useState, useEffect } from 'react'
import { View, Text, Animated, Easing } from 'react-native'

import AmbitionLogo from 'src/components/ambition-logo'

import styles from './splash.styles'

/**
 * Ambition splash screen.
 */
const SplashScreen = ({ navigation }) => {
  const [logoValue, setLogoValue] = useState(0)
  const [fadeInAnim] = useState(() => new Animated.Value(0))
  const [logoAnim] = useState(() => new Animated.Value(0))

  /**
   * Start the logo animation.
   */
  const start = () => {
    Animated.sequence([
      Animated.spring(fadeInAnim, { toValue: 1, bounciness: 10, useNativeDriver: true }),
      Animated.delay(250),
      Animated.timing(logoAnim, { toValue: 1, duration: 750, easing: Easing.bounce, useNativeDriver: true }),
    ]).start(() => {
      // Load signin screen when animation finishes.
      navigation.navigate('AuthScreen')
    })
  }

  useEffect(() => {
    // Start the animation.
    start()
    // Listen for animation values.
    logoAnim.addListener(({ value }) => void setLogoValue(value))
    return () => logoAnim.removeAllListeners()
  }, [])

  const zoomIn = fadeInAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 1],
  })

  const logoStyles = {
    opacity: fadeInAnim,
    transform: [
      { scale: zoomIn },
    ],
  }

  return <View style={styles.container}>
    <AmbitionLogo value={logoValue} style={logoStyles} />
  </View>
}

export default SplashScreen
