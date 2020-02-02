import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
  },
  subView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    width: '80%',
    textAlign: 'center',
    paddingVertical: 18,
    paddingHorizontal: 12,
    backgroundColor: '#c33',
    borderWidth: 2,
    borderColor: '#aaa',
    color: 'white',
    borderRadius: 5,
    overflow: 'hidden',
  }
})

export default styles
