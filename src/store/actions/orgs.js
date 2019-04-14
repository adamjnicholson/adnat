import * as actionTypes from './actionTypes'
import axios from '../../axios';

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

const orgGetAll = orgs => {
  return {
    type: actionTypes.ORGS_GET,
    orgs: orgs
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
      console.log(res.data)
      dispatch(orgCreateJoinSuccess(res.data))
    })
    .catch(err => {
      console.log(err.response)
      dispatch(orgCreateJoinFail(err.response.data.error))
    })
  }
}

export const orgGet = () => {
  return dispatch => {
    axios.get('/organisations')
      .then(res => {
        dispatch(orgGetAll(res.data))
      })
  }
}