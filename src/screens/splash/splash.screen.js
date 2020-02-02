import React, { useState, useEffect } from 'react'
import { Animated, Easing } from 'react-native'
import { connect } from 'react-redux'

import { init } from 'src/store/actions'
import { isInitialized, isLoggedIn } from 'src/lib/user'
import { scenes } from 'src/constants'

import AmbitionLogo from 'src/components/ambition-logo'

import splashAnimations from './splash.animations'

import styles from './splash.styles'

/**
 * Ambition splash screen.
 */
const SplashScreen = ({ navigation, init, user }) => {
  const [ready, setReady] = useState(false)
  const [viewAnim] = useState(() => new Animated.Value(0))
  const [logoAnim] = useState(() => new Animated.Value(0))
  const viewStyles = useState(() => splashAnimations(viewAnim))

  useEffect(() => {
    // Initialize the store.
    init()

    Animated.sequence([
      Animated.spring(viewAnim, { toValue: 1, bounciness: 10, useNativeDriver: true }),
      Animated.timing(logoAnim, { toValue: 1, duration: 750, easing: Easing.bounce, useNativeDriver: true }),
    ]).start(() => setReady(true))
  }, [])

  useEffect(() => {
    if (!ready) { return }

    if (isInitialized(user)) {
      if (isLoggedIn(user)) {
        Animated.timing(viewAnim, { toValue: 2, duration: 250, useNativeDriver: true }).start(() => {
          navigation.navigate(scenes.MAIN)
        })
      } else {
        navigation.navigate(scenes.AUTH)
      }
    }
  }, [ready, user])

  return <Animated.View style={[styles.container, viewStyles]}>
    <AmbitionLogo animation={logoAnim} />
  </Animated.View>
}

const mapState = (state) => ({
  user: state.user,
})

const mapDispatch = (dispatch) => ({
  init: () => void dispatch(init()),
})

export default connect(mapState, mapDispatch)(SplashScreen)
