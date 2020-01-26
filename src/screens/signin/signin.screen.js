import React, { useState, useEffect } from 'react'
import { View, Animated, Keyboard } from 'react-native'

import AmbitionLogo from 'src/components/ambition-logo'
import SigninForm from 'src/components/signin-form/signin-form.component'

import styles from './signin.styles'

/**
 * Display a signin screen.
 */
const SigninScreen = ({ navigation }) => {
  const [logoValue, setLogoValue] = useState(1)
  const [logoAnim] = useState(() => new Animated.Value(1))
  const [dismissAnim] = useState(() => new Animated.Value(0))

  const [form, setForm] = useState(() => ({ email: '', password: '' }))

  /**
   * Animate away the signin screen.
   */
  const dismiss = () => {
    Keyboard.dismiss()
    Animated.timing(dismissAnim, { toValue: 1, duration: 300, useNativeDriver: true })
      .start(() => {})
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

  return <Animated.View style={[styles.container, viewStyles]}>
    <AmbitionLogo value={logoValue} />
    <View style={styles.formView}>
      <SigninForm model={form} onChange={setForm} onSignin={dismiss} onSignup={() => console.log('sign up')} />
    </View>
  </Animated.View>
}

export default SigninScreen
