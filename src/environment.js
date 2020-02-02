import {
  // @ts-ignore
  API_URL as _API_URL,
  // @ts-ignore
  API_KEY as _API_KEY,
  // @ts-ignore
  TOKEN_WILL_EXPIRE_HOURS as _TOKEN_WILL_EXPIRE_HOURS,
  // @ts-ignore
  DEBUG as _DEBUG,
} from 'react-native-dotenv'

export const API_KEY = _API_KEY
export const API_URL = _API_URL
export const TOKEN_WILL_EXPIRE_HOURS = _TOKEN_WILL_EXPIRE_HOURS
export const DEBUG = typeof _DEBUG === 'string' && _DEBUG.trim().toLowerCase() === 'true'
