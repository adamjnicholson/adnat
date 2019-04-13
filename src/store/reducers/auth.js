import * as actionTypes from '../actions/actionTypes'

const initalState = {
  sessionId: null,
  name: null,
  error: null,
  loading: false,
  authRedirectPath: '/'
}

const authStart = (state, action) => {
  return {...state, loading: true, error: null }
}

const authSuccess = (state, action) => {
  return {
    ...state, 
    sessionId: action.sessionId,
    name: action.name,
    loading: false
  }
}

const authFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false
  }
}

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case actionTypes.SIGNUP_START: return authStart(state, action)
    case actionTypes.SIGNUP_SUCCESS: return authSuccess(state, action)
    case actionTypes.SIGNUP_FAIL: return authFail(state, action)
    default: return state
  }
}

export default reducer
