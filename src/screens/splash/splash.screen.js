import React, { useState, useEffect } from 'react'
import { View, Text, Animated, Easing } from 'react-native'

import AmbitionLogo from 'src/components/AmbitionLogo'

import styles from './splash.styles'

/**
 *
 */
const SplashScreen = ({ navigation }) => {
  const [value, setValue] = useState(0)
  const [fadeIn] = useState(() => new Animated.Value(0))
  const [animation] = useState(() => new Animated.Value(0))

  /**
   * Start the logo animation.
   */
  const start = () => {
    Animated.sequence([
      Animated.timing(fadeIn, { toValue: 1, duration: 750, easing: Easing.bounce, useNativeDriver: true }),
      Animated.delay(250),
      Animated.timing(animation, { toValue: 1, duration: 750, easing: Easing.bounce, useNativeDriver: true }),
    ]).start(() => {
      // Load signin screen when animation finishes.
      navigation.navigate('SigninScreen')
    })
  }

  useEffect(() => {
    // Start the animation.
    start()
    // Listen for animation values.
    animation.addListener(({ value }) => void setValue(value))
    return () => animation.removeAllListeners()
  }, [])

  const zoomIn = fadeIn.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 1],
  })

  const logoStyles = {
    opacity: fadeIn,
    transform: [
      { scale: zoomIn },
    ],
  }

  return <View style={styles.container}>
    <AmbitionLogo value={value} style={logoStyles} />
    <View>

    </View>
  </View>
}

export default SplashScreen
