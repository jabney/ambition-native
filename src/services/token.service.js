import AsyncStorage from '@react-native-community/async-storage'

const TOKEN_KEY = 'access-token'

class TokenStorage {
  get = () => AsyncStorage.getItem(TOKEN_KEY)
  set = (token) => AsyncStorage.setItem(TOKEN_KEY, token)
  clear = () => AsyncStorage.removeItem(TOKEN_KEY)
}

export default Object.freeze(new TokenStorage())
