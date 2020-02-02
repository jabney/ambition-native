import React, { useEffect, useRef } from 'react'
import { StyleSheet, Animated } from 'react-native'
import Svg, { Path } from 'react-native-svg'

import { groups, interpolators, ambition } from './logo'

import styles from './ambition-logo.styles'

/**
 * @typedef {Object} LogoProps
 * @property {Animated.Value & { __getValue?: () => number }} animation
 * @property {any} [style]
 * @property {string} [color]
 * @property {string} [aColor]
 */

/**
 * Ambition animated logo.
 *
 * @type {React.FunctionComponent<LogoProps>}
 */
const AmbitionLogo = ({ animation, aColor, color, style }) => {
  const refs = interpolators.map(() => useRef(null))

  useEffect(() => {
    if (animation == null) { return }

    // Initialize the paths with the current animation value.
    refs.forEach((ref, i) => {
      ref.current.setNativeProps({ d: interpolators[i](animation.__getValue()) })
    })

    // Update the paths when the animation changes.
    animation.addListener(({ value }) => {
      refs.forEach((ref, i) => {
        ref.current.setNativeProps({ d: interpolators[i](value) })
      })
    })

    return () => animation.removeAllListeners()
  }, [])

  return <Animated.View style={[StyleSheet.absoluteFill, styles.container, style]}>
    <Svg style={styles.svg} viewBox='0 0 600 600'>
      {
        groups.map((group, i) => <Path key={i} d={group.orchid} fill={color} ref={refs[i]} />)
      }
      <Path d={ambition} fill={aColor} />
    </Svg>
  </Animated.View>
}

AmbitionLogo.defaultProps = {
  aColor: '#ddd',
  color: '#eee',
  style: {},
}

export default AmbitionLogo
