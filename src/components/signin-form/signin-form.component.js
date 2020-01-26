import React, { useState, useEffect } from 'react'
import { View, Text, Animated } from 'react-native'
import SlickInput from 'src/components/slick-input/slick-input.component'
import Button from 'src/components/button/button.component'
import NavLink from 'src/components/nav-link/nav-link.component'

import styles from './signin-form.styles'

/**
 *
 */
const SigninForm = ({ model, onChange, onSignin, onSignup }) => {
  const [email, setEmail] = useState(model && model.emeil || '')
  const [password, setPassword] = useState(model && model.password || '')
  const [formAnim] = useState(() => new Animated.Value(0))

  useEffect(() => void onChange({ email, password }), [email, password])

  const start = () => {
    Animated.sequence([
      Animated.delay(250),
      Animated.parallel([
        // Animated.timing(logoAnim, { toValue: 0, duration: 3000, useNativeDriver: true }),
        Animated.timing(formAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
      ])
    ]).start(() => {})
  }

  useEffect(() => void start(), [])

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

  return <View style={styles.container}>
    <SlickInput value={email} label='Email' containerStyle={emailStyles} inputStyle={styles.input} onChangeText={setEmail} />
    <SlickInput value={password} label='Password' containerStyle={passStyles} inputStyle={styles.input} onChangeText={setPassword} secureTextEntry={true} />
    <Button title='Sign In' containerStyle={[styles.button, buttonStyles]} onPress={onSignin} />
    <NavLink text='Need an account? Sign up...' containerStyle={[styles.link, linkStyles]} onPress={onSignup} />
  </View>

}

export default SigninForm
