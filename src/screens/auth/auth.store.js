import { signin, signup, clearErrors } from 'src/store/actions'

const mapState = (state) => ({
  user: state.user,
  error: state.errors.signin || state.errors.signup
})

const mapDispatch = (dispatch) => ({
  signin: (cred) => dispatch(signin(cred)),
  signup: (cred) => dispatch(signup(cred)),
  clearErrors: () => dispatch(clearErrors(['signup', 'signin']))
})

/**
 * @type {[typeof mapState, typeof mapDispatch]}
 */
const store = [mapState, mapDispatch]

export default store
