import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import navigationService from './services/navigation.service'
import { scenes } from './constants'

import SplashScreen from './screens/splash'
import AuthScreen from './screens/auth'
import MainScreen from './screens/main'

const mainNavigator = createSwitchNavigator({
  [scenes.SPLASH]: SplashScreen,
  [scenes.AUTH]: AuthScreen,
  [scenes.MAIN]: MainScreen,
})

const AppNavigator = createAppContainer(mainNavigator)

const Navigation = () => (
  <AppNavigator ref={navigation => navigationService.set(navigation)} />
)

export default Navigation
