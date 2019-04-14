import * as actionTypes from '../actions/actionTypes'

const initalState = {
  name: null,
  orgId: null
}

const userSet = (state, action) => {
  return {
    ...state,
    name: action.name,
    orgId: action.orgId
  }
}

const userJoinOrg = (state, action) => {
  return { ...state, orgId: action.orgId }
}

const userLeaveOrg = (state, action) => {
  return { ...state, orgId: null }
}

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case actionTypes.USER_SET: return userSet(state, action)
    case actionTypes.USER_JOIN_ORG: return userJoinOrg(state, action)
    case actionTypes.USER_LEAVE_ORG: return userLeaveOrg(state, action)
    default: return state
  }
}

export default reducer