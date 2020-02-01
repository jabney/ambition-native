import { useState, useEffect } from 'react'
import { Animated } from 'react-native'
import { isInitialized, isLoggedIn } from 'src/lib/user'
import { scenes } from 'src/constants'

/**
 * @param {() => void} start
 * @param {*} navigation
 * @param {boolean} init
 * @param {*} user
 */
const useInitialization = (navigation, start, init, user) => {
  const [outroAnim] = useState(() => new Animated.Value(1))

  // Initialize the store.
  useEffect(start, [])

  useEffect(() => {

    if (!init) { return }

    if (isInitialized(user)) {
      if (isLoggedIn(user)) {
        Animated.timing(outroAnim, { toValue: 0, duration: 250, useNativeDriver: true }).start(() => {
          navigation.navigate(scenes.MAIN)
        })

      } else {
        navigation.navigate(scenes.AUTH)
      }
    }
  }, [init, user])


  const viewStyles = {
    transform: [
      { scale: outroAnim },
    ],
  }

  return viewStyles
}

export default useInitialization
