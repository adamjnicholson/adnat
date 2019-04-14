import * as actionTypes from './actionTypes'
import { orgGet } from './orgs'
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

const logout = () => {
  localStorage.removeItem('sessionId');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('name');

  return {
    type: actionTypes.AUTH_LOGOUT,
  } 
}

// Sign up or login in user
export const auth = (type, name, email, password, passwordConf) => {
  return dispatch => {
    dispatch(authStart())
    const [data, url] = getAuthData(type, name, email, password, passwordConf)
    let userName = name
    let sessionId = null

    axios.post(url, data)
      .then(res => {
        sessionId = res.data.sessionId
        axios.defaults.headers.common['Authorization'] =  sessionId // set the session id when making requests
        return axios.get('/users/me')
      })
      .then( res => {
        userName = res.data.name
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000); // sessionId expires in 1 hour
        localStorage.setItem('sessionId', sessionId);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('name', userName);

        dispatch(authSuccess(sessionId, userName))
        dispatch(orgGet())
      })
      .catch(err => {
        dispatch(authFail(err.response.data.error))
      })
  }
}

// Logs the user out
export const authLogout = () => {
  return dispatch => {
    axios.delete('/auth/logout')
      .then(res => {
        dispatch(logout())
      })
      .catch(err => {
        console.log(err.response)
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
    if (!sessionId) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const name = localStorage.getItem('name');
        axios.defaults.headers.common['Authorization'] =  sessionId // set the session id when making requests
        dispatch(authSuccess(sessionId, name));
        dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
      }   
    }
  };
}

//Log the user out after expirationTime expires
const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
      setTimeout(() => {
          dispatch(logout());
      }, expirationTime * 1000);
  };
};

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


