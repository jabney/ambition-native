import React, { useState, useEffect, useRef } from 'react'
import { View, Animated, Keyboard, ScrollView, Dimensions } from 'react-native'

import AmbitionLogo from 'src/components/ambition-logo'
import SigninForm from 'src/components/signin-form'

import styles from './signin.styles'

/**
 * Display a signin screen.
 */
const SigninScreen = ({ navigation }) => {
  const [logoValue, setLogoValue] = useState(1)
  const [scrollAnim] = useState(() => new Animated.Value(0))
  const [dismissAnim] = useState(() => new Animated.Value(0))
  const scrollView = useRef(/**@type {ScrollView}*/(null))

  const [form, setForm] = useState(() => ({ email: '', password: '' }))

  const { width } = Dimensions.get('window')

  /**
   * @type {Animated.AnimatedInterpolation & {__getValue: () => number}}
   */
  const logoInterpolator = (scrollAnim.interpolate({
    inputRange: [-width, 0, width, 2*width, 3*width],
    outputRange: [0, 1, 0, 1, 0],
    extrapolate: 'clamp',
  }))

  // Set up animation listeners.
  useEffect(() => {
    scrollAnim.addListener(({ value }) => {
      setLogoValue(logoInterpolator.__getValue())
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

  const next = () => {
    scrollView.current.scrollTo({ x: width, y: 0 })
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
      // style={{ borderWidth: 5 }}
      onScroll={Animated.event([
        {
          nativeEvent: { contentOffset: { x: scrollAnim }}
        }
      ])}
    >
      <View style={pageStyle}>
        <View style={[styles.formView]}>
          <SigninForm model={form} onChange={setForm} onSignin={dismiss} onSignup={next} />
        </View>
      </View>
      <View style={pageStyle}>
        <View style={[styles.formView]}>
          <SigninForm model={form} onChange={setForm} onSignin={dismiss} onSignup={() => console.log('sign up')} />
        </View>
      </View>
      <View style={pageStyle}>
        <View style={[styles.formView]}>
          <SigninForm model={form} onChange={setForm} onSignin={dismiss} onSignup={() => console.log('sign up')} />
        </View>
      </View>
    </ScrollView>
  </Animated.View>
}

export default SigninScreen
