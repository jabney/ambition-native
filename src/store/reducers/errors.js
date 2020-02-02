import { APP_ERROR, CLEAR_ERROR } from '../actions'

/**
 * @typedef {{[key: string]: string}} Errors
 */

/**
 * @typedef {import('../actions').Action<{domain: string, message: string}>} Action
 */

/**
 * @param {Errors} state
 * @param {Action} action
 */
const errors = (state = {}, action) => {
  switch (action.type) {
    case APP_ERROR: {
      const { domain, message } = action.payload
      return { ...state, [domain]: message }
    }
    case CLEAR_ERROR: {
      const { domain } = action.payload
      const newState = { ...state }
      delete newState[domain]
      return newState
    }
    default: {
      return state
    }
  }
}

export default errors
