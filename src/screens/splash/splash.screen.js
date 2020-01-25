import React, { useState, useEffect } from 'react'
import { View, Text, Animated, Easing } from 'react-native'

import AmbitionLogo from 'src/components/AmbitionLogo'

import styles from './splash.styles'

/**
 *
 */
const SplashScreen = ({ navigation }) => {
  const [value, setValue] = useState(0)
  const [animation] = useState(() => new Animated.Value(value))

  /**
   * Start the logo animation.
   */
  const start = () => {
    Animated.sequence([
      Animated.delay(1000),
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

  return <View style={styles.container}>
    <AmbitionLogo value={value} />
    <View>

    </View>
  </View>
}

export default SplashScreen
