import * as actionTypes from '../actions/actionTypes'

const initalState = {
  organisations: null,
  orgUsers: null,
  createForm: {
    loading: false,
    error: null
  },
  editForm: {
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

const orgsGetUsers = (state, action) => {
  return {
    ...state,
    orgUsers: action.orgUsers
  }
}

const orgsEdit = (state, action) => {
  const orgs = state.organisations.map( org => {
    if (org.id === action.id) {
      return {
        id: action.id,
        name: action.name,
        hourlyRate: action.rate
      }
    } 
    return org
  })
  return {
    ...state,
    organisations: orgs
  }
}

const orgsClearUsers = (state, action) => {
  return {
    ...state,
    orgUsers: null
  }
}

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case actionTypes.ORGS_START: return orgsStart(state, action)
    case actionTypes.ORGS_CREATE_JOIN_SUCCESS: return orgsCreateJoinSuccess(state, action)
    case actionTypes.ORGS_CREATE_JOIN_FAIL: return orgsCreateJoinFail(state, action)
    case actionTypes.ORGS_GET: return orgsGet(state, action)
    case actionTypes.ORGS_GET_USERS: return orgsGetUsers(state, action)
    case actionTypes.ORGS_EDIT: return orgsEdit(state, action)
    case actionTypes.ORGS_CLEAR_USERS: return orgsClearUsers(state, action)
    default: return state
  }
}

export default reducer