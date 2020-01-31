import React, { useState, useEffect, useRef } from 'react'
import { View, Text, Animated, Keyboard, ScrollView, Dimensions } from 'react-native'
import { setUser } from 'src/store/actions'
import { connect } from 'react-redux'

import AmbitionLogo from 'src/components/ambition-logo'
import AuthForm from 'src/components/auth-form'

import styles from './auth.styles'

/**
 * Auth screen for signin and signup.
 */
const AuthScreen = ({ navigation, setUser }) => {
  const [logoValue, setLogoValue] = useState(1)
  const [scrollEnabled, setScrollEnabled] = useState(false)
  const [authModel, setAuthModel] = useState(() => ({ email: '', password: '' }))

  const [scrollAnim] = useState(() => new Animated.Value(0))
  const [signinAnim] = useState(() => new Animated.Value(0))
  const [signupAnim] = useState(() => new Animated.Value(0))
  const [dismissAnim] = useState(() => new Animated.Value(0))

  const scrollView = useRef(/**@type {ScrollView}*/(null))

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
    inputRange: [-width, 0, width, 2*width, 3*width, 4*width],
    outputRange: [0, 1, 0, 1, 0, 1],
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
   *
   */
  const signin = () => {
    setUser(authModel)
    // dismiss()
  }

  /**
   *
   */
  const signup = () => {
    setUser(authModel)
    dismiss()
  }

  /**
   * Scroll to a page [0, n].
   */
  const page = (num) => {
    scrollView.current.scrollTo({ x: num*width, y: 0 })
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
      showsHorizontalScrollIndicator={false}
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
            onButton={signin} onLink={() => page(1)}
            animation={signinAnim}
            animType='drop'
          />
        </View>
      </View>
      <View style={pageStyle}>
        <View style={[styles.formView]}>
          <Text style={styles.title}>Create an Account</Text>
          <AuthForm model={authModel} onChange={setAuthModel}
            buttonText='Sign Up' linkText='Have an account? Sign in...'
            onButton={signup} onLink={() => page(0)}
            animation={signupAnim}
            animType='drop'
          />
        </View>
      </View>
      <View style={pageStyle}>
      </View>
      <View style={pageStyle}>
      </View>
    </ScrollView>
  </Animated.View>
}

const mapDispatch = (dispatch) => ({
  setUser: (user) => dispatch(setUser(user))
})

export default connect(null, mapDispatch)(AuthScreen)
