import React from 'react'
import { View, StyleSheet } from 'react-native'
import Navigation from './Navigation'

const App = () => (
  <View style={styles.container}>
    <Navigation />
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
})

export default App
