import * as actionTypes from './actionTypes'
import axios from '../../axios'

const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

const authSuccess = (sessionId, name) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    sessionId: sessionId,
    name: name
  }
}

const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  }
}

export const auth = (type, name, email, password, passwordConf) => {
  return dispatch => {
    dispatch(authStart())
    const [data, url] = getAuthData(type, name, email, password, passwordConf)
    axios.post(url, data)
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

export const authLogout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  }
}

export const authClearErrors = () => {
  return {
    type: actionTypes.AUTH_CLEAR_ERRORS
  }
}


const getAuthData = (type, name, email, password, passwordConf) => {
  let data = {}
  let url = null

  switch (type) {
    case 'signup':
      data = {
        name: name,
        email: email,
        password: password,
        passwordConfirmation: passwordConf
      }
      url = '/auth/signup/'
      break
    case 'login':
      data = {
        email: email,
        password: password
      }
      url = 'auth/login'
      break;
    default: return null
  }

  return [data, url]
}


