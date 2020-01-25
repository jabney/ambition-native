import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Animated } from 'react-native'

import styles from './nav-link.styles'

const NavLink = ({ text, onPress, style, containerStyle }) => (
  <Animated.View style={[styles.container, containerStyle]}>
    <TouchableOpacity onPress={onPress} activeOpacity={0.5}>
      <Text style={[styles.text, style]}>{text}</Text>
    </TouchableOpacity>
  </Animated.View>
)

NavLink.defaultProps = {
  text: '',
  onPress: () => console.log('press'),
  style: {},
  containerStyle: {},
}

export default NavLink