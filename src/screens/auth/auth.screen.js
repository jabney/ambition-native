import React, { useState, useEffect, useRef } from 'react'
import { View, Text, Animated, Keyboard, ScrollView, Dimensions } from 'react-native'
import { connect } from 'react-redux'

import { isLoggedIn } from 'src/lib/user'
import { scenes } from 'src/constants'
import { getLastLogin } from 'src/services/settings.service'

import AmbitionLogo from 'src/components/ambition-logo'
import AuthForm from 'src/components/auth-form'
import ErrorMessage from 'src/components/error-message'

import useAnimations from './use-animations'
import viewAnimations from './auth.animations'
import store from './auth.store'
import styles from './auth.styles'

/**
 * Auth screen for signin and signup.
 */
const AuthScreen = ({ navigation, signin, signup, user, error, clearErrors }) => {
  const [scrollEnabled, setScrollEnabled] = useState(false)
  const [signinModel, setSigninModel] = useState(() => ({ email: '', password: '' }))
  const [signupModel, setSignupModel] = useState(() => ({ email: '', password: '' }))

  const [viewAnim] = useState(() => new Animated.Value(0))
  const [logoAnim] = useState(() => new Animated.Value(1))
  const [viewStyles] = useState(() => viewAnimations(viewAnim))

  // Set up form and scroll animations/interpolations.
  const anims = useAnimations(logoAnim)

  const scrollView = useRef(/**@type {ScrollView}*/(null))

  /**
   * Set initial form model values.
   */
  const initModel = async () => {
    const lastLogin = await getLastLogin()
    setSigninModel({ email: lastLogin, password: '' })
  }

  // Clear any errors on unmount.
  useEffect(() => () => clearErrors(), [])

  // Perform one-time initialization.
  useEffect(() => {
    initModel()

    // Trigger start animation.
    Animated.sequence([
      Animated.delay(250),
      Animated.timing(anims.signin, { toValue: 1, duration: 750, useNativeDriver: true }),
    ]).start(() => {
      setScrollEnabled(true)
    })
  }, [])

  // Check if  user is logged in.
  useEffect(() => {
    if (isLoggedIn(user)) {
      // Animate away the signin screen.
      Keyboard.dismiss()
      Animated.timing(viewAnim, { toValue: 1, duration: 250, useNativeDriver: true }).start(() => {
        navigation.navigate(scenes.MAIN)
      })
    }
  }, [user])

  /**
   *
   */
  const onSignin = () => {
    signin(signinModel)
  }

  /**
   *
   */
  const onSignup = () => {
    signup(signupModel)
  }

  const { width } = Dimensions.get('window')

  /**
   * Scroll to a page [0, n].
   */
  const page = (num) => {
    scrollView.current.scrollTo({ x: num*width, y: 0 })
  }

  /**
   * Called when the error message component animation completes.
   */
  const onErrorComplete = () => {
    clearErrors()
  }

  const pageStyle = { width }

  return <Animated.View style={[styles.container, viewStyles]}>
    <AmbitionLogo animation={logoAnim} />
    <ScrollView ref={scrollView}
      horizontal
      pagingEnabled
      scrollEventThrottle={16}
      scrollEnabled={scrollEnabled}
      showsHorizontalScrollIndicator={false}
      onScroll={Animated.event([
        {
          nativeEvent: { contentOffset: { x: anims.scroll } }
        }
      ])}
    >
      <View style={pageStyle}>
        <View style={[styles.formView]}>
          <AuthForm model={signinModel} onChange={setSigninModel}
            buttonText='Sign In' linkText='Need an account? Sign up...'
            onButton={onSignin} onLink={() => page(1)}
            animation={anims.signin}
            animType='drop'
          />
        </View>
      </View>
      <View style={pageStyle}>
        <View style={[styles.formView]}>
          <Text style={styles.title}>Create an Account</Text>
          <AuthForm model={signupModel} onChange={setSignupModel}
            buttonText='Sign Up' linkText='Have an account? Sign in...'
            onButton={onSignup} onLink={() => page(0)}
            animation={anims.signup}
            animType='drop'
          />
        </View>
      </View>
      <View style={pageStyle}>
      </View>
      <View style={pageStyle}>
      </View>
    </ScrollView>
    <ErrorMessage error={error} onComplete={onErrorComplete} />
  </Animated.View>
}

export default connect(...store)(AuthScreen)
