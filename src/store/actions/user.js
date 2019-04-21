import * as actionTypes from '../actions/actionTypes'
import axios from '../../axios';

 export const userSet = orgs => {
   return dispatch => {
     return axios.get('/users/me')
      .then( res => {
        const data = {
          type: actionTypes.USER_SET,
          name: res.data.name,
          orgId: res.data.organisationId
        }     
        dispatch(data)
      })
      .catch( err => console.log(err.response))
   }
 }

 export const userLeaveOrg = () => {
   return dispatch => {
     axios.post('/organisations/leave')
      .then( res => {
        dispatch({
          type: actionTypes.USER_LEAVE_ORG
        })
      })
      .catch( err => console.log(err.response))
   }
 }

 export const userJoinOrg = id => {
  return dispatch => {
    const data = {
      organisationId: id
    }
    return axios.post('/organisations/join', data)
     .then( res => {
       dispatch({
         type: actionTypes.USER_JOIN_ORG,
         orgId: res.data.id
       })
     })
     .catch( err => console.log(err.response))
  }
}