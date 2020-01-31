import {
  // @ts-ignore
  API_URL as _API_URL,
  // @ts-ignore
  API_KEY as _API_KEY,
  // @ts-ignore
  DEBUG as _DEBUG,
} from 'react-native-dotenv'

export const API_KEY = _API_KEY
export const API_URL = _API_URL
export const DEBUG = typeof _DEBUG === 'string' && _DEBUG.trim().toLowerCase() === 'true'
