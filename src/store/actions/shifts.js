import * as actionTypes from './actionTypes'
import axios from '../../axios'

export const shiftsGet = () => {
  return dispatch => {
    axios.get('/shifts')
      .then( res => {
        dispatch({
          type: actionTypes.SHIFTS_GET,
          shifts: res.data
        })
      })
  }
}

export const shiftsCreate = shift => {
  return dispatch => {
    axios.post('/shifts', shift)
      .then ( res => {
        dispatch({
          type: actionTypes.SHIFTS_CREATE,
          shift: res.data
        })
      })
      .catch( err => console.log(err.response))
  }
}

export const shiftsDelete = shiftId => {
  return dispatch => {
    axios.delete('/shifts/' + shiftId)
      .then( res => {
        console.log('done')
        dispatch({
          type: actionTypes.SHIFTS_DELETE,
          shiftId: shiftId
        })
      })
      .catch (err => console.log(err.response))
  }
}

export const shiftsUpdate = (id, shift) => {
  return dispatch => {
    axios.put('/shifts/' + id, shift)
      .then( res => {
        dispatch({
          type: actionTypes.SHIFTS_UPDATE,
          shift: shift,
          id: id
        })
      })
  }
}
