import * as actionTypes from '../actions/actionTypes'
import axios from '../../axios';

 export const userSet = () => {
   return dispatch => {
     axios.get('/users/me')
      .then( res => {
        dispatch({
          type: actionTypes.USER_SET,
          name: res.data.name,
          orgId: res.data.organisationId
        })
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
    axios.post('/organisations/join', data)
     .then( res => {
       dispatch({
         type: actionTypes.USER_JOIN_ORG,
         orgId: res.data.id
       })
     })
     .catch( err => console.log(err.response))
  }
}