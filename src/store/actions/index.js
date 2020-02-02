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

/**
 * @param {Credentials} cred
 *
 * @returns {ThunkAction<User>}
 */
export const signup = (cred) => async (dispatch) => {
  const [signupErr] = await api.signup(cred)

  if (signupErr) {
    return console.error(signupErr)
  }

  await setLastLogin(cred.email)

  const [userErr, user] = await api.user()

  if (userErr) {
    return console.error(userErr)
  }

  dispatch({ type: SET_USER, payload: user })
}

/**
 * @param {Credentials} cred
 *
 * @returns {ThunkAction<User>}
 */
export const signin = ({ email, password  }) => async (dispatch) => {
  const [signinErr] = await api.signin({ email, password })

  if (signinErr) {
    return console.error(signinErr)
  }

  await setLastLogin(email)

  const [userErr, user] = await api.user()

  if (userErr) {
    return console.error(userErr)
  }

  dispatch({ type: SET_USER, payload: user })
}

/**
 * Sign the user out.
 */
export const signout = () => async (dispatch) => {
  await api.signout()

  dispatch({ type: SET_USER, payload: null })
}

/**
 * Sign the user out of all devices
 */
export const signoutAll = () => async (dispatch) => {
  const [signoutErr] = await api.signoutAll()

  if (signoutErr) {
    return console.error(signoutErr)
  }

  dispatch({ type: SET_USER, payload: null })
}

/**
 * Initialize the store.
 */
export const init = () => async (dispatch) => {
  const [tokenErr, tokenIsValid] = await api.tokenIsValid()

  if (tokenErr) {
    return console.error(tokenErr)
  }

  if (!tokenIsValid) {
    return dispatch({ type: SET_USER, payload: {} })
  }

  const [userErr, user] = await api.user()

  if (userErr) {
    return console.error(userErr)
  }

  dispatch({ type: SET_USER, payload: user })
}
