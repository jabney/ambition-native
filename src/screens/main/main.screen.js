import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'

import { signout } from 'src/store/actions'

import Button from 'src/components/button'

import styles from './main.styles'
import { isLoggedIn } from 'src/lib/user'
import { scenes } from 'src/constants'

const MainScreen = ({ navigation, signout, user }) => {

  useEffect(() => {
    if (!isLoggedIn(user)) {
      navigation.navigate(scenes.SPLASH)
    }
  }, [user])

  return <View style={styles.container}>
    <Button title='Sign Out' onPress={signout} />
  </View>
}

const mapState = (state) => ({
  user: state.user,
})

const mapDispatch = (dispatch) => ({
  signout: () => dispatch(signout())
})

export default connect(mapState, mapDispatch)(MainScreen)
