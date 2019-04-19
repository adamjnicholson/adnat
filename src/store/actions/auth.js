import * as actionTypes from './actionTypes'
import axios from '../../axios'

const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

const authSuccess = (sessionId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    sessionId: sessionId, 
  }
}

const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  }
}

const authLogIn = (sessionId, dispatch, setLocalData) => {
  if (setLocalData) {
    localStorage.setItem('sessionId', sessionId);
  }
  axios.defaults.headers.common['Authorization'] =  sessionId // set the session id when making requests
  dispatch(authSuccess(sessionId))
}

// Logs the user out
export const authLogout = () => {
  return dispatch => {
    axios.delete('/auth/logout')
      .then(res => {
        localStorage.removeItem('sessionId');
        dispatch({
          type: actionTypes.AUTH_LOGOUT,
        })
      })
      .catch(err => {
        console.log(err.response)
      })
  }
}

// Sign up or login in user
export const auth = (type, name, email, password, passwordConf) => {
  return dispatch => {
    dispatch(authStart())
    const [data, url] = getAuthData(type, name, email, password, passwordConf)
    axios.post(url, data)
      .then(res => {
        authLogIn(res.data.sessionId, dispatch, true)
      })
      .catch(err => {
        console.log(err.response)
        dispatch(authFail(err.response.data.error))
      })
  }
}

// Clears auth errors when form mounts
export const authClearErrors = () => {
  return {
    type: actionTypes.AUTH_CLEAR_ERRORS
  }
}

// Log user in if they have session id in local storage
export const authAutoLogin = () => {
  return dispatch => {
    const sessionId = localStorage.getItem('sessionId');
      if (sessionId) {
        authLogIn(sessionId, dispatch)
      } else {
        console.log('out')
        dispatch({
          type: actionTypes.AUTH_LOGOUT,
        })
      }
  };
}



// return object for post request depending on it was signup or login
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


