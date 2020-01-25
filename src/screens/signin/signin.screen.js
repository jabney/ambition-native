import React, { useState, useEffect } from 'react'
import { View, Animated, Keyboard } from 'react-native'

import AmbitionLogo from 'src/components/AmbitionLogo'

import styles from './signin.styles'
import SlickInput from 'src/components/slick-input/slick-input.component'
import Button from 'src/components/button/button.component'
import NavLink from 'src/components/nav-link/nav-link.component'

/**
 * Display a signin form.
 */
const SigninScreen = ({ navigation }) => {
  const [logoValue, setLogoValue] = useState(1)
  const [logoAnim] = useState(() => new Animated.Value(logoValue))
  const [formAnim] = useState(() => new Animated.Value(0))
  const [dismissAnim] = useState(() => new Animated.Value(0))

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const start = () => {
    Animated.sequence([
      Animated.delay(250),
      Animated.parallel([
        // Animated.timing(logoAnim, { toValue: 0, duration: 3000, useNativeDriver: true }),
        Animated.timing(formAnim, { toValue: 1, duration: 750, useNativeDriver: true }),
      ])
    ]).start(() => {})
  }

  const dismiss = () => {
    Keyboard.dismiss()
    Animated.timing(dismissAnim, { toValue: 1, duration: 300, useNativeDriver: true })
      .start(() => {})
  }

  useEffect(() => {
    start()
    // logoAnim.addListener(({ value }) => void setLogoValue(value))
    return () => {
      // logoAnim.removeAllListeners()
    }
  }, [])

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

  const emailAnim = formAnim.interpolate({
    inputRange: [0, 0.25],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  })

  const passAnim = formAnim.interpolate({
    inputRange: [0.25, 0.5],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  })

  const passOpacity = passAnim.interpolate({
    inputRange: [0, 0.35, 1],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
  })

  const passDrop = passAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-50, 0],
    extrapolate: 'clamp',
  })

  const buttonAnim = formAnim.interpolate({
    inputRange: [0.5, 0.75],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  })

  const buttonOpacity = buttonAnim.interpolate({
    inputRange: [0, 0.35, 1],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
  })

  const buttonDrop = buttonAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-50, 0],
    extrapolate: 'clamp',
  })

  const linkAnim = formAnim.interpolate({
    inputRange: [0.75, 1],
    outputRange: [0, 1],
  })

  const linkOpacity = linkAnim.interpolate({
    inputRange: [0, 0.35, 1],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
  })

  const linkDrop = linkAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-50, 0],
    extrapolate: 'clamp',
  })

  const emailStyles = {
    transform: [
      { scale: emailAnim },
    ]
  }

  const passStyles = {
    opacity: passOpacity,
    transform: [
      { translateY: passDrop },
    ]
  }

  const buttonStyles  = {
    opacity: buttonOpacity,
    transform: [
      { translateY: buttonDrop }
    ]
  }

  const linkStyles  = {
    opacity: linkOpacity,
    transform: [
      { translateY: linkDrop }
    ]
  }

  return <Animated.View style={[styles.container, viewStyles]}>
    <AmbitionLogo value={logoValue} />
    <Animated.View style={styles.formView}>
      <SlickInput value={email} label='Email' containerStyle={emailStyles} inputStyle={styles.input} onChangeText={setEmail} />
      <SlickInput value={password} label='Password' containerStyle={passStyles} inputStyle={styles.input} onChangeText={setPassword} />
      <Button title='Sign In' containerStyle={[styles.button, buttonStyles]} onPress={dismiss} />
      <NavLink text='Need an account? Sign up...' containerStyle={[styles.link, linkStyles]} onPress={() => console.log('nav link')} />
    </Animated.View>
  </Animated.View>
}

export default SigninScreen
