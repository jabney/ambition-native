import React from 'react'
import { View, StyleSheet } from 'react-native'
import Navigation from './Navigation'
import { Provider } from 'react-redux'
import store from './store'

const App = () => (
  <View style={styles.container}>
    <Provider store={store}>
      <Navigation />
    </Provider>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
})

export default App
