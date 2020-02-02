import React, { useState, useEffect } from 'react'
import { View, Text, Animated, StyleSheet } from 'react-native'

import styles from './error-message.styles'

/**
 *
 */
const ErrorMessage = ({ error, onComplete }) => {
  const [message, setMessage] = useState('')
  const [animation] = useState(() => new Animated.Value(0))

  useEffect(() => {
    /** @type {Animated.CompositeAnimation} */
    let anim = null

    if (typeof error === 'string') {
      setMessage(error)

      anim = Animated.sequence([
        Animated.timing(animation, { toValue: 1, duration: 300, useNativeDriver: true }),
        Animated.delay(2500),
        Animated.timing(animation, { toValue: 2, duration: 300, useNativeDriver: true }),
      ])

      anim.start(({ finished }) => {
        if (finished) {
          setMessage('')
          onComplete()
          anim = null
        }
      })
    }

    return () => {
      if (anim !== null) { anim.stop() }
    }
  }, [error])

  const fadeInterpolator = animation.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, 1, 0],
  })

  const translateInterpolator = animation.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [50, 0, -50],
  })

  const messageStyles = {
    opacity: fadeInterpolator,
    transform: [{ translateY: translateInterpolator }]
  }

  return <View style={[styles.container, StyleSheet.absoluteFill]} pointerEvents='none'>
    {
      message.length > 0 && <>
        <Animated.View style={[styles.subView, messageStyles]}>
          <Text style={styles.text}>{ message }</Text>
        </Animated.View>
        <View style={styles.subView}></View>
      </>
    }
  </View>
}

ErrorMessage.defaultProps = {
  onComplete: () => {},
}

export default ErrorMessage
