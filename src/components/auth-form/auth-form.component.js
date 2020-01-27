import React, { useState, useEffect } from 'react'
import { View, Text, Animated } from 'react-native'
import SlickInput from 'src/components/slick-input'
import Button from 'src/components/button'
import NavLink from 'src/components/nav-link'

import styles from './auth-form.styles'

/**
 *
 */
const AuthForm = ({ model, onChange, buttonText, linkText, onButton, onLink, animation }) => {
  const [email, setEmail] = useState(model && model.emeil || '')
  const [password, setPassword] = useState(model && model.password || '')

  useEffect(() => void onChange({ email, password }), [email, password])

  const emailAnim = animation.interpolate({
    inputRange: [0, 0.25],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  })

  const passAnim = animation.interpolate({
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

  const buttonAnim = animation.interpolate({
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

  const linkAnim = animation.interpolate({
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
    opacity: emailAnim,
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
    <Button title={buttonText} containerStyle={[styles.button, buttonStyles]} onPress={onButton} />
    <NavLink text={linkText} containerStyle={[styles.link, linkStyles]} onPress={onLink} />
  </View>
}

export default AuthForm
