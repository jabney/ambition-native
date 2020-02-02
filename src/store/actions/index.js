import api from 'src/services/api.service'
import { setLastLogin } from 'src/services/settings.service'

/**
 * @template T
 * @typedef {import('../../models/store').IAction<T>} Action
 */

/**
 * @typedef {import('src/models/store').IStore} Store
 * @typedef {import('src/models/user').IUser} User
 * @typedef {import('src/models/user').ICredentials} Credentials
 */

/**
 * @template T
 * @typedef {import('redux-thunk').ThunkAction<void, Store, void, Action<T>>} ThunkAction
 */

/**
 * @template T
 * @typedef {import('redux-thunk').ThunkDispatch<Store, void, Action<T>>} ThunkDispatch
 */

export const SET_USER = 'set-user'
export const APP_ERROR = 'app-error'
export const CLEAR_ERROR = 'clear-error'

/**
 * @param {import('src/models/api').ApiError} error
 */
const getErrorMessage = (error) => {
  const { message, errors } = error
  return Array.isArray(errors) ? errors.join(', ') : message
}

/**
 * @param {Credentials} cred
 *
 * @returns {ThunkAction<any>}
 */
export const signup = (cred) => async (dispatch) => {
  const [signupErr] = await api.signup(cred)

  if (signupErr) {
    const message = getErrorMessage(signupErr)
    return dispatch({ type: APP_ERROR, payload: { domain: 'signup', message }})
  }

  await setLastLogin(cred.email)

  const [userErr, user] = await api.user()

  if (userErr) {
    const message = getErrorMessage(userErr)
    return dispatch({ type: APP_ERROR, payload: { domain: 'signup', message }})
  }

  dispatch({ type: SET_USER, payload: user })
}

/**
 * @param {Credentials} cred
 *
 * @returns {ThunkAction<any>}
 */
export const signin = ({ email, password }) => async (dispatch) => {
  const [signinErr] = await api.signin({ email, password })

  if (signinErr) {
    const message = getErrorMessage(signinErr)
    return dispatch({ type: APP_ERROR, payload: { domain: 'signin', message }})
  }

  await setLastLogin(email)

  const [userErr, user] = await api.user()

  if (userErr) {
    const message = getErrorMessage(userErr)
    return dispatch({ type: APP_ERROR, payload: { domain: 'signin', message }})
  }

  dispatch({ type: SET_USER, payload: user })
}

/**
 * Sign the user out.
 *
 * @returns {ThunkAction<User>}
 */
export const signout = () => async (dispatch) => {
  await api.signout()

  dispatch({ type: SET_USER, payload: null })
}

/**
 * Sign the user out of all devices
 *
 * @returns {ThunkAction<any>}
 */
export const signoutAll = () => async (dispatch) => {
  const [signoutErr] = await api.signoutAll()

  if (signoutErr) {
    const message = getErrorMessage(signoutErr)
    return dispatch({ type: APP_ERROR, payload: { domain: 'signout', message }})
  }

  dispatch({ type: SET_USER, payload: null })
}

/**
 * @param {string} domain
 * @param {string} message
 *
 * @returns {Action<{domain: string, message: string}>}
 */
export const appError = (domain, message) => ({
  type: APP_ERROR, payload: { domain, message }
})

/**
 * @param {string} domain
 *
 * @returns {ThunkAction<{domain: string}>}
 */
export const clearError = (domain) => (dispatch, getState) => {
  const { errors } = getState()
  if (typeof errors[domain] === 'string') {
    dispatch({ type: CLEAR_ERROR, payload: { domain } })
  }
}

/**
 * Initialize the store.
 *
 * @returns {ThunkAction<any>}
 */
export const init = () => async (dispatch) => {
  const [tokenErr, tokenIsValid] = await api.tokenIsValid()

  if (tokenErr) {
    const message = getErrorMessage(tokenErr)
    return dispatch({ type: APP_ERROR, payload: { domain: 'init', message }})
  }

  if (!tokenIsValid) {
    return dispatch({ type: SET_USER, payload: {} })
  }

  const [userErr, user] = await api.user()

  if (userErr) {
    const message = getErrorMessage(userErr)
    return dispatch({ type: APP_ERROR, payload: { domain: 'init', message }})
  }

  dispatch({ type: SET_USER, payload: user })
}
