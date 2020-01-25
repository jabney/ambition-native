import { StyleSheet } from 'react-native'
import pad from './pad'

const styles = StyleSheet.create({
  container: {
    paddingTop: pad.top,
  },
  input: {
    fontSize: 14,
    paddingVertical: pad.vertical,
    paddingHorizontal: pad.horizontal,
    borderWidth: pad.border,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  labelContainer: {
    position: 'absolute',
    top: pad.top + pad.vertical + pad.border,
    left: pad.horizontal,
  },
  label: {},
})

export default styles
