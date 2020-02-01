import React, { useState, useEffect } from 'react'
import { View, Animated, Easing } from 'react-native'
import { connect } from 'react-redux'

import { scenes } from 'src/constants'
import { isInitialized, isLoggedIn } from 'src/lib/user'
import { init } from 'src/store/actions'
import useInitialization from './use-initialization'

import AmbitionLogo from 'src/components/ambition-logo'

import styles from './splash.styles'

/**
 * Ambition splash screen.
 */
const SplashScreen = ({ navigation, start, user }) => {
  const [logoValue, setLogoValue] = useState(0)
  const [init, setInit] = useState(false)
  const [fadeInAnim] = useState(() => new Animated.Value(0))
  const [logoAnim] = useState(() => new Animated.Value(0))

  useInitialization(navigation, start, init, user)

  /**
   * Start the logo animation.
   */
  const animateIn = () => {
    Animated.sequence([
      Animated.spring(fadeInAnim, { toValue: 1, bounciness: 10, useNativeDriver: true }),
      // Animated.delay(250),
      Animated.timing(logoAnim, { toValue: 1, duration: 750, easing: Easing.bounce, useNativeDriver: true }),
    ]).start(() => setInit(true))
  }

  useEffect(() => {
    // Start the animation.
    animateIn()
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

const mapState = (state) => ({
  user: state.user,
})

const mapDispatch = (dispatch) => ({
  start: () => void dispatch(init()),
})

export default connect(mapState, mapDispatch)(SplashScreen)
