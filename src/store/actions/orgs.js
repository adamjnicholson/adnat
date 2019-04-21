import * as actionTypes from './actionTypes'
import axios from '../../axios';
import { userSet } from './user';

const orgStart = form => {
  return {
    type: actionTypes.ORGS_START,
    form: form
  }
}

const orgCreateJoinSuccess = org => {
  return {
    type: actionTypes.ORGS_CREATE_JOIN_SUCCESS,
    newOrg: org
  }
}

const orgCreateJoinFail = error => {
  return {
    type: actionTypes.ORGS_CREATE_JOIN_FAIL,
    error: error
  }
}


export const orgCreateJoin = (name, rate)  => {
  return dispatch => {
    dispatch(orgStart('create'))
    const data = {
      name: name,
      hourlyRate: rate
    }

    axios.post('/organisations/create_join', data)
    .then(res => {
      dispatch(orgCreateJoinSuccess(res.data))
      dispatch(userSet())
    })
    .catch(err => {
      console.log(err.response)
      dispatch(orgCreateJoinFail(err.response.data.error))
    })
  }
}

export const orgGet = () => {
  return dispatch => {
    return axios.get('/organisations')
      .then(res => {
        dispatch({
          type: actionTypes.ORGS_GET,
          orgs: res.data
        })
      })
  }
}

export const orgGetUsers = () => {
  return dispatch => {
    return axios.get('/users')
      .then (res => {
        dispatch({
          type: actionTypes.ORGS_GET_USERS,
          orgUsers: res.data
        })
      })
  }
}

export const orgClearUsers = () => {
  return dispatch => {
    dispatch({
      type: actionTypes.ORGS_CLEAR_USERS
    })
  }
}

export const orgEdit = (id, name, rate) => {
  return dispatch => {
    const data ={
      name: name,
      hourlyRate: rate
    }

    axios.put('/organisations/' + id, data)
      .then( res => {
        dispatch({
          type: actionTypes.ORGS_EDIT,
          id: id,
          name: name,
          rate: rate
        })
      })

  }
}



