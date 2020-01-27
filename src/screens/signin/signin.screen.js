import React, { useState, useEffect, useRef } from 'react'
import { View, Text, Animated, Keyboard, ScrollView, Dimensions } from 'react-native'

import AmbitionLogo from 'src/components/ambition-logo'
import AuthForm from 'src/components/auth-form'

import styles from './signin.styles'

/**
 * Display a signin screen.
 */
const SigninScreen = ({ navigation }) => {
  const [logoValue, setLogoValue] = useState(1)

  const [signinFormValue, setSigninFormValue] = useState(0)
  const [signupFormValue, setSignupFormValue] = useState(0)

  const [scrollEnabled, setScrollEnabled] = useState(false)

  const [scrollAnim] = useState(() => new Animated.Value(0))
  const [formAnim] = useState(() => new Animated.Value(0))
  const [dismissAnim] = useState(() => new Animated.Value(0))

  const scrollView = useRef(/**@type {ScrollView}*/(null))

  const [authForm, setAuthForm] = useState(() => ({ email: '', password: '' }))

  const { width } = Dimensions.get('window')

  const start = () => {
    Animated.sequence([
      Animated.delay(250),
      Animated.timing(formAnim, { toValue: 1, duration: 750, useNativeDriver: true }),
    ]).start(() => {
      setScrollEnabled(true)
      formAnim.removeAllListeners()
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
  const formInterpolator = (scrollAnim.interpolate({
    inputRange: [-width, 0, width],
    outputRange: [0, 1, 0],
    extrapolate: 'clamp',
  }))

  // Set up animation listeners.
  useEffect(() => {
    scrollAnim.addListener(({ value }) => {
      setLogoValue(logoInterpolator.__getValue())
      setSigninFormValue(formInterpolator.__getValue())
      setSignupFormValue(1 - formInterpolator.__getValue())
    })

    formAnim.addListener(({ value }) => {
      setSigninFormValue(value)
    })

    return () => {
      scrollAnim.removeAllListeners()
      formAnim.removeAllListeners()
    }
  }, [])

  /**
   * Animate away the signin screen.
   */
  const dismiss = () => {
    Keyboard.dismiss()
    Animated.timing(dismissAnim, { toValue: 1, duration: 300, useNativeDriver: true })
      .start(() => {})
  }

  const page = (num) => {
    return { x: (num-1) * width, y: 0 }
  }

  const next = () => {
    scrollView.current.scrollTo(page(2))
  }

  const prev = () => {
    scrollView.current.scrollTo(page(1))
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
          nativeEvent: { contentOffset: { x: scrollAnim }}
        }
      ])}
    >
      <View style={pageStyle}>
        <View style={[styles.formView]}>
          <AuthForm model={authForm} onChange={setAuthForm}
            buttonText='Sign In' linkText='Need an account? Sign up...'
            onButton={dismiss} onLink={next}
            value={signinFormValue}
          />
        </View>
      </View>
      <View style={pageStyle}>
        <View style={[styles.formView]}>
          <Text style={styles.title}>Create an Account</Text>
          <AuthForm model={authForm} onChange={setAuthForm}
            buttonText='Sign Up' linkText='Have an account? Sign in...'
            onButton={dismiss} onLink={prev}
            value={signupFormValue}
          />
        </View>
      </View>
    </ScrollView>
  </Animated.View>
}

export default SigninScreen
