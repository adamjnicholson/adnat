import * as actionTypes from '../actions/actionTypes'

const initalState = {
  organisations: [],
  createForm: {
    loading: false,
    error: null
  }
}

const orgsStart = (state, action) => {
  return {
    ...state,
    [action.form + 'Form']: {
      ...state[action.form + 'Form'],
      loading: true
    }
  }
}

const orgsCreateJoinSuccess = (state, action) => {
  return {
    ...state,
    organisations: state.organisations.concat(action.newOrg),
    createForm: {
      ...state.createForm,
      loading: false
    }
  }
}

const orgsCreateJoinFail = (state, action) => {
  return {
    ...state,
    createForm: {
      ...state.createForm,
      loading: false,
      error: action.error
    }
  }
}

const orgsGet = (state, action) => {
  return {
    ...state,
    organisations: action.orgs
  }
}


const reducer = (state = initalState, action) => {
  switch (action.type) {
    case actionTypes.ORGS_START: return orgsStart(state, action)
    case actionTypes.ORGS_CREATE_JOIN_SUCCESS : return orgsCreateJoinSuccess(state, action)
    case actionTypes.ORGS_CREATE_JOIN_FAIL : return orgsCreateJoinFail(state, action)
    case actionTypes.ORGS_GET : return orgsGet(state, action)
    default: return state
  }
}

export default reducer