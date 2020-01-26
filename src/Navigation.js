import React, { useState, useEffect, useRef } from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
// import { createBottomTabNavigator } from 'react-navigation-tabs'
import navigationService from './services/navigation.service'

import SplashScreen from './screens/splash'
import SigninScreen from './screens/signin'

const mainNavigator = createSwitchNavigator({
  SplashScreen: SplashScreen,
  SigninScreen: SigninScreen,
})

const AppNavigator = createAppContainer(mainNavigator)

const Navigation = () => (
  <AppNavigator ref={navigation => navigationService.set(navigation)} />
)

export default Navigation
