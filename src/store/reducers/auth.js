import * as actionTypes from '../actions/actionTypes'

const initalState = {
  // sessionId: '3cbca703-c46b-457f-9f5a-e21030edbbc5',
  // name: 'Adam Nicholson',
  sessionId: null,
  name: null,
  error: null,
  loading: false,
}

const authStart = (state, action) => {
  return {...state, loading: true, error: null }
}

const authSuccess = (state, action) => {
  return {
    ...state, 
    sessionId: action.sessionId,
    name: action.name,
    loading: false,
  }
}

const authFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false
  }
}

const authLogout = (state, action) => {
  return {
    ...state,
    sessionId: null,
    name: null,
  }
}

const authClearErrors = (state, action) => {
  return { ...state, error: null }
}

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START: return authStart(state, action)
    case actionTypes.AUTH_SUCCESS: return authSuccess(state, action)
    case actionTypes.AUTH_FAIL: return authFail(state, action)
    case actionTypes.AUTH_LOGOUT: return authLogout(state, action)
    case actionTypes.AUTH_CLEAR_ERRORS: return authClearErrors(state, action)
    default: return state
  }
}

export default reducer
