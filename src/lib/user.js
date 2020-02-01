/**
 * Return true if the user has been initialized as
 * logged in or logged out.
 *
 * @param {any} user
 *
 * @returns {boolean}
 */
export function isInitialized(user) {
  return user !== null
}

/**
 * Return true if the user has been initialized and is logged in.
 *
 * @param {any} user
 *
 * @returns {boolean}
 */
export function isLoggedIn(user) {
  return user != null && typeof user.id === 'string'
}
