import { useEffect } from 'react'
import { isInitialized, isLoggedIn } from 'src/lib/user'
import { scenes } from 'src/constants'

/**
 * @param {() => void} start
 * @param {*} navigation
 * @param {boolean} init
 * @param {*} user
 */
const useInitialization = (navigation, start, init, user) => {
  // Initialize the store.
  useEffect(start, [])

  useEffect(() => {
    if (!init) { return }

    if (isInitialized(user)) {
      if (isLoggedIn(user)) {
        navigation.navigate(scenes.MAIN)
      } else {
        navigation.navigate(scenes.AUTH)
      }
    }
  }, [init, user])

}

export default useInitialization
