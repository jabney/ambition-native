import AsyncStorage from '@react-native-community/async-storage'

const SETTINGS_KEY = 'local-settings'

const reSettings = /^\{.*\}$/

/**
 * @type {any}
 */
let __settings = null

const initSettings = async () => {
  if (__settings === null) {
    const settings = await AsyncStorage.getItem(SETTINGS_KEY)
    if (reSettings.test(settings)) {
      __settings = JSON.parse(settings)
    } else {
      __settings = {}
    }
  }
}

const saveSettings = async () => {
  if (__settings === null) {
    __settings = {}
  }

  await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(__settings))
}

class Settings {
  /**
   * Get a setting from the store.
   *
   * @param {string} key
   * @param {any} [_default]
   */
  async get(key, _default = null) {
    await initSettings()

    const value = __settings[key]
    return value == null ? _default : value
  }

  /**
   * Save a setting to the store.
   *
   * @param {string} key
   * @param {any} [value]
   */
  async set(key, value) {
    await initSettings()

    if (value == null) {
      delete __settings[key]
    } else {
      __settings[key] = value
    }

    await saveSettings()
  }

  /**
   * Get a copy of the entire settings object.
   */
  async getAll() {
    await initSettings()

    return JSON.parse(JSON.stringify(__settings || {}))
  }

  /**
   * @returns {Promise<void>}
   */
  async clear() {
    __settings = {}
    await saveSettings()
  }

  /**
   * Push a value into a setting that is an array.
   *
   * @param {string} key
   * @param {number} last how many of the most recent items to keep
   * @param {any} value
   *
   * @returns {Promise<void>}
   */
  async push(key, value, last = 10) {
    const list = await this.get(key, [])
    if (Array.isArray(list)) {
      list.push(value)
      await this.set(key, list.slice(-last))
    }
  }

  /**
   * Add a unique value to a setting that is a list of items.
   *
   * @param {string} key
   * @param {number} last how many of the most recent items to keep
   * @param {any} value
   *
   * @returns {Promise<void>}
   */
  async addToSet(key, last, value) {
    const list = await this.get(key, [])
    if (Array.isArray(list)) {
      const index = list.indexOf(value)
      if (index < 0) {
        list.push(value)
      }
      await this.set(key, list.slice(-last))
    }
  }

  /**
   * Pull the first occurrence of value from a list.
   *
   * @param {string} key
   * @param {any} value
   *
   * @returns {Promise<void>}
   */
  async pull(key, value) {
    const list = await this.get(key, [])
    await this.set(key, list.filter(x => x !== value))
  }

  /**
   * Return true if the list includes the value.
   *
   * @param {string} key
   * @param {any} value
   *
   * @returns {Promise<boolean>}
   */
  async includes(key, value) {
    const list = await this.get(key, [])
    if (Array.isArray(list)) {
      return list.indexOf(value) >= 0
    }
    return false
  }

  /**
   * Return true if the stored value matches the given one.
   *
   * @param {string} key
   * @param {any} value
   *
   * @returns {Promise<boolean>}
   */
  async is(key, value) {
    if (value == null) { return false }
    return value === await this.get(key)
  }
}

// Creae an instance of the settings service.
const settingsSvc = Object.freeze(new Settings())
export default settingsSvc

const LAST_LOGIN = 'last-login'
const RECENT_LOGINS = 'recent-logins'

/**
 * @type {(email: string) => Promise<void>}
 */
export const setLastLogin = settingsSvc.set.bind(settingsSvc, LAST_LOGIN)
/**
 * @type {() => Promise<string>}
 */
export const getLastLogin = settingsSvc.get.bind(settingsSvc, LAST_LOGIN)
/**
 * @type {(email: string) => Promise<boolean>}
 */
export const isLastLogin = settingsSvc.is.bind(settingsSvc, LAST_LOGIN)

/**
 * @type {(email: string) => Promise<void>}
 */
export const setRecentLogin = settingsSvc.addToSet.bind(settingsSvc, RECENT_LOGINS, 3)
/**
 * @type {(email: string) => Promise<boolean>}
 */
export const isRecentLogin = settingsSvc.includes.bind(settingsSvc, RECENT_LOGINS)
