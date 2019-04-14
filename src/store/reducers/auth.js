import * as actionTypes from '../actions/actionTypes'

const initalState = {
  sessionId: null,
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
    orgId: action.orgId,
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
    orgId: null
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
