import React, { useState, useEffect } from 'react'
import { View, Animated, Easing } from 'react-native'
import { connect } from 'react-redux'

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
  const [introAnim] = useState(() => new Animated.Value(0))
  const [logoAnim] = useState(() => new Animated.Value(0))

  const viewStyles = useInitialization(navigation, start, init, user)

  useEffect(() => {
    Animated.sequence([
      Animated.spring(introAnim, { toValue: 1, bounciness: 10, useNativeDriver: true }),
      Animated.timing(logoAnim, { toValue: 1, duration: 750, easing: Easing.bounce, useNativeDriver: true }),
    ]).start(() => setInit(true))
  }, [])

  const zoomIn = introAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 1],
  })

  const logoStyles = {
    opacity: introAnim,
    transform: [
      { scale: zoomIn },
    ],
  }

  return <Animated.View style={[styles.container, viewStyles]}>
    <AmbitionLogo style={logoStyles} animation={logoAnim} />
  </Animated.View>
}

const mapState = (state) => ({
  user: state.user,
})

const mapDispatch = (dispatch) => ({
  start: () => void dispatch(init()),
})

export default connect(mapState, mapDispatch)(SplashScreen)
