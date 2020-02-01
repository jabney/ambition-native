import api from 'src/services/api.service'

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
 * @param {User} user
 */
export const setUser = (user) => {
  return { type: SET_USER, payload: user }
}

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
export const signin = (cred) => async (dispatch) => {
  const [signinErr] = await api.signin(cred)

  if (signinErr) {
    return console.error(signinErr)
  }

  const [userErr, user] = await api.user()

  if (userErr) {
    return console.error(userErr)
  }

  dispatch({ type: SET_USER, payload: user })
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
    return dispatch ({ type: SET_USER, payload: {} })
  }

  const [userErr, user] = await api.user()

  if (userErr) {
    return console.error(userErr)
  }

  dispatch({ type: SET_USER, payload: user })
}
