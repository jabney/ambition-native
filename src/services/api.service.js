import superagent from 'superagent'
import tokenSvc from './token.service'
import urlPrefix from 'src/lib/middleware/url-prefix.superagent'
import { TOKEN_WILL_EXPIRE_HOURS } from 'src/config/environment'
import { API_KEY, API_URL } from 'src/config/environment'

/**
 * @typedef {import('src/models/user').ICredentials} Credentials
 */

/**
 * @typedef {import('src/models/api').ApiError} ApiError
 */

/**
 * @template T
 * @typedef {import('src/models/api').ApiResponse<T>} ApiResponse
 */

/**
 * Api key authorization header components.
 *
 * @type {[string, string]}
 */
const apiKeyHeader = ['Authorization', `Bearer ${API_KEY}`]

/**
 * Return token authorization header components.
 *
 * @returns {[string, string]}
 */
const tokenHeader = (token) => ['Authorization', `Bearer ${token}`]

// The superagent http request module instance.
const agent = superagent.agent().use(urlPrefix(API_URL))

class ApiService {
  /**
   * @param {Credentials} user
   *
   * @return {Promise<ApiResponse<void>>}
   */
  signup = async (user) => {
    try {
      const { body: { token } } = await agent.post('/auth/signup')
        .set(...apiKeyHeader)
        .send(user)

      await tokenSvc.set(token)
      return [null]

    } catch (error) {
      const { body } = error.response
      return [body]
    }
  }

  /**
   * @param {Credentials} user
   *
   * @return {Promise<ApiResponse<null>>}
   */
  signin = async (user) => {
    try {
      const { body: { token } } = await agent.post('/auth/signin')
        .set(...apiKeyHeader)
        .send(user)

      await tokenSvc.set(token)
      return [null]

    } catch (error) {
      const { body } = error.response
      return [body]
    }
  }

  /**
   * Sign out with the current token.
   *
   * @return {Promise<ApiResponse<null>>}
   */
  signout = async () => {
    try {
      const token = await tokenSvc.get()

      await agent.get('/auth/signout')
        .set(...tokenHeader(token))
        .send()

      await tokenSvc.clear()
      return [null]

    } catch (error) {
      // Fail signout silently.
      return [null]
    }
  }

  /**
   * Sign out of all devices.
   *
   * @return {Promise<ApiResponse<null>>}
   */
  signoutAll = async () => {
    try {
      const token = await tokenSvc.get()

      await agent.get('/auth/signout/all')
        .set(...tokenHeader(token))
        .send()

      await tokenSvc.clear()
      return [null]

    } catch (error) {
      const { body } = error.response
      return [body]
    }
  }

  /**
   * Determine if the current token is valid or about to expire.
   *
   * @returns {Promise<ApiResponse<boolean>>}
   */
  tokenIsValid = async () => {
    try {
      const token = await tokenSvc.get()

      // If there is no token, consider it invalid.
      if (!token) {
        return [null, false]
      }

      // Get the token info object.
      const { body: { expires } } = await agent.get('/auth/token/info')
        .set(...tokenHeader(token))
        .send()

      // If the token will expire soon, consider it invalid.
      if (expires.hours < TOKEN_WILL_EXPIRE_HOURS) {
        return [null, false]
      }

      return [null, true]

    } catch (error) {
      const { body } = error.response

      if (body.status === 401) {
        return [null, false]
      }

      return [body]
    }
  }
}

export default Object.freeze(new ApiService())
