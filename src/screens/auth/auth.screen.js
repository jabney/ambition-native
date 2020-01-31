import React, { useState, useEffect, useRef } from 'react'
import { View, Text, Animated, Keyboard, ScrollView, Dimensions } from 'react-native'
import { setUser } from 'src/store/actions'
import { connect } from 'react-redux'

import AmbitionLogo from 'src/components/ambition-logo'
import AuthForm from 'src/components/auth-form'
import useAnimations from './use-animations'
import viewAnimations from './auth.animations'
import styles from './auth.styles'

/**
 * Auth screen for signin and signup.
 */
const AuthScreen = ({ navigation, setUser }) => {
  const [logoValue, setLogoValue] = useState(1)
  const [scrollEnabled, setScrollEnabled] = useState(false)
  const [authModel, setAuthModel] = useState(() => ({ email: '', password: '' }))

  const [animation] = useState(() => new Animated.Value(0))
  const [viewStyles] = useState(() => viewAnimations(animation))

  // Set up form and scroll animations/interpolations.
  const anims = useAnimations(setLogoValue)

  const scrollView = useRef(/**@type {ScrollView}*/(null))

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
   * Animate away the signin screen.
   */
  const dismiss = () => {
    Keyboard.dismiss()
    Animated.timing(animation, { toValue: 1, duration: 300, useNativeDriver: true })
      .start(() => {})
  }

  /**
   *
   */
  const signin = () => {
    setUser(authModel)
    dismiss()
  }

  /**
   *
   */
  const signup = () => {
    setUser(authModel)
    dismiss()
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
          <AuthForm model={authModel} onChange={setAuthModel}
            buttonText='Sign In' linkText='Need an account? Sign up...'
            onButton={signin} onLink={() => page(1)}
            animation={anims.signin}
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

const mapDispatch = (dispatch) => ({
  setUser: (user) => dispatch(setUser(user))
})

export default connect(null, mapDispatch)(AuthScreen)
