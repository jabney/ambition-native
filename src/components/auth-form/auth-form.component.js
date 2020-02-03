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
const AuthForm = ({ model, onChange, buttonText, linkText, onButton, onLink, animation, animType, busy }) => {
  const [anims] = useState(() => formAnimations(animation, animType))

  const setEmail = (email) => onChange({ ...model, email })
  const setPassword = (password) => onChange({ ...model, password })

  const email = model && model.email || ''
  const password = model && model.password || ''

  const disabled = email.length === 0 || password.length === 0

  return <View style={styles.container}>
    <SlickInput value={email} label='Email' containerStyle={anims.email} inputStyle={styles.input} onChangeText={setEmail} autoCapitalize='none' autoCorrect={false} autoCompleteType='email' keyboardType='email-address' textContentType='emailAddress' />
    <SlickInput value={password} label='Password' containerStyle={anims.password} inputStyle={styles.input} onChangeText={setPassword} secureTextEntry={true} />
    <Button title={buttonText} containerStyle={[styles.button, anims.button]} onPress={onButton} disabled={busy || disabled} busy={busy} />
    <NavLink text={linkText} containerStyle={[styles.link, anims.link]} onPress={onLink} />
  </View>
}

AuthForm.defaultProps = {
  busy: false,
}

export default AuthForm
