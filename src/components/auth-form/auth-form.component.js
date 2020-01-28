import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import SlickInput from 'src/components/slick-input'
import Button from 'src/components/button'
import NavLink from 'src/components/nav-link'

import formAnimations from './auth-form.animations'

import styles from './auth-form.styles'

/**
 * Render email/pass form components with a button and link.
 */
const AuthForm = ({ model, onChange, buttonText, linkText, onButton, onLink, animation }) => {
  const [email, setEmail] = useState(model && model.emeil || '')
  const [password, setPassword] = useState(model && model.password || '')
  const [anims] = useState(() => formAnimations(animation))

  // Notify new model when email or password fields change.
  useEffect(() => void onChange({ email, password }), [email, password])

  return <View style={styles.container}>
    <SlickInput value={email} label='Email' containerStyle={anims.email} inputStyle={styles.input} onChangeText={setEmail} />
    <SlickInput value={password} label='Password' containerStyle={anims.password} inputStyle={styles.input} onChangeText={setPassword} secureTextEntry={true} />
    <Button title={buttonText} containerStyle={[styles.button, anims.button]} onPress={onButton} />
    <NavLink text={linkText} containerStyle={[styles.link, anims.link]} onPress={onLink} />
  </View>
}

export default AuthForm
