import React, { useState, useEffect, useRef } from 'react'
import { View, Text, Animated, Keyboard, ScrollView, Dimensions } from 'react-native'
import { signin, signup } from 'src/store/actions'
import { connect } from 'react-redux'

import { isLoggedIn } from 'src/lib/user'
import { scenes } from 'src/constants'
import { getLastLogin } from 'src/services/settings.service'

import AmbitionLogo from 'src/components/ambition-logo'
import AuthForm from 'src/components/auth-form'

import useAnimations from './use-animations'
import viewAnimations from './auth.animations'
import styles from './auth.styles'

/**
 * Auth screen for signin and signup.
 */
const AuthScreen = ({ navigation, signin, signup, user }) => {
  const [logoValue, setLogoValue] = useState(1)
  const [scrollEnabled, setScrollEnabled] = useState(false)
  const [signinModel, setSigninModel] = useState(() => ({ email: '', password: '' }))
  const [signupModel, setSignupModel] = useState(() => ({ email: '', password: '' }))

  const [animation] = useState(() => new Animated.Value(0))
  const [viewStyles] = useState(() => viewAnimations(animation))

  // Set up form and scroll animations/interpolations.
  const anims = useAnimations(setLogoValue)

  const scrollView = useRef(/**@type {ScrollView}*/(null))

  /**
   *
   */
  const initialize = async () => {
    const lastLogin = await getLastLogin()
    setSigninModel({ email: lastLogin, password: '' })
  }

  useEffect(() => void initialize(), [])

  /**
   * Animate away the signin screen.
   */
  const dismiss = () => {
    Keyboard.dismiss()
    Animated.timing(animation, { toValue: 1, duration: 250, useNativeDriver: true })
      .start(() => {
        navigation.navigate(scenes.MAIN)
      })
  }

  useEffect(() => {
    if (isLoggedIn(user)) {
      dismiss()
    }
  }, [user])

  /**
   * Start the form intro animation.
   */
  const start = () => {
    Animated.sequence([
      Animated.delay(250),
      Animated.timing(anims.signin, { toValue: 1, duration: 750, useNativeDriver: true }),
    ]).start(() => {
      setScrollEnabled(true)
    })
  }

  // Trigger start animation.
  useEffect(() => void start(), [])

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
  </Animated.View>
}

const mapState = (state) => ({
  user: state.user,
})

const mapDispatch = (dispatch) => ({
  signin: (cred) => dispatch(signin(cred)),
  signup: (cred) => dispatch(signup(cred)),
})

export default connect(mapState, mapDispatch)(AuthScreen)
