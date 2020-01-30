
/**
 * @template T
 * @typedef {import('../../models/store').IAction<T>} Action
 */

/**
 * @typedef {import('../../models/store').IStore} Store
 * @typedef {import('src/models/user').IUser} User
 */

/**
 * @template A
 * @typedef {import('redux-thunk').ThunkAction<void, Store, void, A>} ThunkAction
 */

/**
 * @template A
 * @typedef {import('redux-thunk').ThunkDispatch<Store, void, A>} ThunkDispatch
 */

export const SET_USER = 'set-user'

/**
 * @param {User} user
 */
export const setUser = (user) => {
  return { type: SET_USER, payload: user }
}
