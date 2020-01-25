import { NavigationActions } from 'react-navigation'

/**
 * @typedef {import('react-navigation').NavigationContainerComponent} NavigationContainerComponent
 */

/**
 * @typedef {import('react-navigation').NavigationAction} NavigationAction
 */

/**
 *
 */
class NavigationService {
  constructor() {
    /**
     * @type {NavigationContainerComponent}
     */
    let _navigation = null

    /**
     * Set the navigator.
     *
     * @param {NavigationContainerComponent} nav
     */
    this.set = (nav) => {
      _navigation = nav
    }

    /**
     * Get the navigator.
     *
     * @returns {NavigationContainerComponent}
     */
    this.get = () => {
      if (_navigation == null) {
        throw new Error('navigator is not set')
      }
      return _navigation
    }

    /**
     * Navigate to a route.
     *
     * @param {string} routeName
     * @param {{[key: string]: any}} params
     */
    this.navigate = (routeName, params) => {
      _navigation.dispatch(
        NavigationActions.navigate({ routeName, params })
      )
    }

    /**
     * @param {NavigationAction} action
     */
    this.dispatch = (action) => {
      _navigation.dispatch(action)
    }
  }
}

export default Object.freeze(new NavigationService())
