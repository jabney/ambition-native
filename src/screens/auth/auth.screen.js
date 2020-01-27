import React, { useState, useEffect, useRef } from 'react'
import { View, Text, Animated, Keyboard, ScrollView, Dimensions } from 'react-native'

import AmbitionLogo from 'src/components/ambition-logo'
import AuthForm from 'src/components/auth-form'

import styles from './auth.styles'

/**
 * Display a signin screen.
 */
const AuthScreen = ({ navigation }) => {
  const [logoValue, setLogoValue] = useState(1)

  const [scrollEnabled, setScrollEnabled] = useState(false)

  const [scrollAnim] = useState(() => new Animated.Value(0))
  const [signinAnim] = useState(() => new Animated.Value(0))
  const [signupAnim] = useState(() => new Animated.Value(0))
  const [dismissAnim] = useState(() => new Animated.Value(0))

  const scrollView = useRef(/**@type {ScrollView}*/(null))

  const [authModel, setAuthModel] = useState(() => ({ email: '', password: '' }))

  const { width } = Dimensions.get('window')

  const start = () => {
    Animated.sequence([
      Animated.delay(250),
      Animated.timing(signinAnim, { toValue: 1, duration: 750, useNativeDriver: true }),
    ]).start(() => {
      setScrollEnabled(true)
    })
  }

  useEffect(() => void start(), [])

  /**
   * @type {Animated.AnimatedInterpolation & {__getValue: () => number}}
   */
  const logoInterpolator = (scrollAnim.interpolate({
    inputRange: [-width, 0, width, 2*width, 3*width],
    outputRange: [0, 1, 0, 1, 0],
    extrapolate: 'clamp',
  }))

  /**
   * @type {Animated.AnimatedInterpolation & {__getValue: () => number}}
   */
  const signinInterpolator = (scrollAnim.interpolate({
    inputRange: [-width, 0, width],
    outputRange: [0, 1, 0],
    extrapolate: 'clamp',
  }))

  /**
   * @type {Animated.AnimatedInterpolation & {__getValue: () => number}}
   */
  const signupInterpolator = (scrollAnim.interpolate({
    inputRange: [0, width, 2*width],
    outputRange: [0, 1, 0],
    extrapolate: 'clamp',
  }))

  // Set up animation listeners.
  useEffect(() => {
    scrollAnim.addListener(({ value }) => {
      setLogoValue(logoInterpolator.__getValue())
      signinAnim.setValue(signinInterpolator.__getValue())
      signupAnim.setValue(signupInterpolator.__getValue())
    })

    return () => scrollAnim.removeAllListeners()
  }, [])

  /**
   * Animate away the signin screen.
   */
  const dismiss = () => {
    Keyboard.dismiss()
    Animated.timing(dismissAnim, { toValue: 1, duration: 300, useNativeDriver: true })
      .start(() => {})
  }

  /**
   * Scroll to page 2.
   */
  const page2 = () => {
    scrollView.current.scrollTo({ x: width, y: 0 })
  }

  /**
   * Scroll to page 1.
   */
  const page1 = () => {
    scrollView.current.scrollTo({ x: 0, y: 0 })
  }

  const viewScale = dismissAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  })

  const viewOpacity = dismissAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  })

  const viewStyles = {
    opacity: viewOpacity,
    transform: [
      { scale: viewScale },
    ]
  }

  const pageStyle = { width }

  return <Animated.View style={[styles.container, viewStyles]}>
    <AmbitionLogo value={logoValue} />
    <ScrollView ref={scrollView}
      horizontal
      pagingEnabled
      scrollEventThrottle={16}
      scrollEnabled={scrollEnabled}
      onScroll={Animated.event([
        {
          nativeEvent: { contentOffset: { x: scrollAnim } }
        }
      ])}
    >
      <View style={pageStyle}>
        <View style={[styles.formView]}>
          <AuthForm model={authModel} onChange={setAuthModel}
            buttonText='Sign In' linkText='Need an account? Sign up...'
            onButton={dismiss} onLink={page2}
            animation={signinAnim}
          />
        </View>
      </View>
      <View style={pageStyle}>
        <View style={[styles.formView]}>
          <Text style={styles.title}>Create an Account</Text>
          <AuthForm model={authModel} onChange={setAuthModel}
            buttonText='Sign Up' linkText='Have an account? Sign in...'
            onButton={dismiss} onLink={page1}
            animation={signupAnim}
          />
        </View>
      </View>
    </ScrollView>
  </Animated.View>
}

export default AuthScreen
