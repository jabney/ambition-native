/**
 * Create a string from playload keys with each key/val on a separate line.
 */
function jsonKeys(payload) {
  const output = Object.entries(payload || {})
    .map(([key, val]) => `${key}: ${JSON.stringify(val)} `)
  return output.join('')
}

/**
 * Get the system time right now as hh:mm:ss:mss.
 */
function now() {
  const date = new Date()
  const h = `0${date.getHours()}`.slice(-2)
  const m = `0${date.getMinutes()}`.slice(-2)
  const s = `0${date.getSeconds()}`.slice(-2)
  const ms = `00${date.getMilliseconds()}`.slice(-3)
  return `${h}:${m}:${s}:${ms}`
}

/**
 * Prune an object so that if its keys contain arrays then
 * only a description of the array contents are included.
 */
function pruneObject(obj) {
  return Object.entries(obj || {}).reduce((map, [key, value]) => {

    if (Array.isArray(value)) {
      const typeofFirst = typeof value[0]
      map[key] = value.length === 0 ? [] : `[${value.length} items (${typeofFirst})]`
    } else {
      map[key] = value
    }

    return map
  }, {})
}

/**
 * Log a redux action and the store after the action has been reduced.
 */
export default store => next => action => {
  const prevState = store.getState()
  const stack = next(action)
  const nextState = store.getState()

  const output = [
    `ACTION: ${action.type} ${now()}`,
    `\n  prev state: ${JSON.stringify(pruneObject(prevState))}`,
    `\n  payload: ${JSON.stringify(pruneObject(action.payload))}`,
    `\n  next state: ${JSON.stringify(pruneObject(nextState))}`,
    `\n\n`,
  ]

  console.log(output.join(' '))

  return stack
}
