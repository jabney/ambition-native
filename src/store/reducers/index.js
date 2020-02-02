import { combineReducers } from 'redux'
import user from './user'
import errors from './errors'

const root = combineReducers({
  user,
  errors,
})

export default root
