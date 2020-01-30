import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import logger from './middleware/redux-logger'

const store = createStore(rootReducer, applyMiddleware(thunk, logger))

export default store
