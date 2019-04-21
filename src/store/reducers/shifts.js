import * as actionTypes from '../actions/actionTypes'

const initalState = {
  shifts: null
}

const shiftsGet = (state, action) => {
  return {
    ...state,
    shifts: action.shifts
  }
}

const shiftsCreate = (state, action) => {
  return {
    ...state,
    shifts: state.shifts.concat(action.shift)
  }
}

const shiftsDelete = (state, action) => {
  return {
    ...state,
    shifts: state.shifts.filter( shift => shift.id !== action.shiftId)
  }
}

const shiftsUpdate = (state, action) => {
  return {
    ...state,
    shifts: state.shifts.map( shift => {
      if (shift.id === action.id) {
        return {
          ...shift,
          ...action.shift
        }
      }

      return shift
    })
  }
}

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case actionTypes.SHIFTS_GET: return shiftsGet(state, action)
    case actionTypes.SHIFTS_CREATE: return shiftsCreate(state, action)
    case actionTypes.SHIFTS_DELETE: return shiftsDelete(state, action)
    case actionTypes.SHIFTS_UPDATE: return shiftsUpdate(state, action)
    default: return state
  }
}

export default reducer