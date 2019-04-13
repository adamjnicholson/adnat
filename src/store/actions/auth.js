import * as actionTypes from './actionTypes'
import axios from '../../axios'

export const authStart = () => {
  return {
    type: actionTypes.SIGNUP_START
  }
}

export const authSuccess = (sessionId, name) => {
  return {
    type: actionTypes.SIGNUP_SUCCESS,
    sessionId: sessionId,
    name: name
  }
}

export const authFail = error => {
  return {
    type: actionTypes.SIGNUP_FAIL,
    error: error
  }
}

export const auth = (name, email, password, passwordConf) => {
  return dispatch => {
    dispatch(authStart())
    const data = {
      name: name,
      email: email,
      password: password,
      passwordConfirmation: passwordConf
    }
    axios.post('/auth/signup/', data)
      .then(res => {
        //local storage here
        axios.defaults.headers.common['Authorization'] = res.data.sessionId // set the session id
        dispatch(authSuccess(res.data.sessionId, name))
      })
      .catch(err => {
        console.log(err.response)
        dispatch(authFail(err.response.data.error))
      })
  }
}
