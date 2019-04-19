import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import * as actions from '../../../store/actions'

class Logout extends Component {
   componentDidMount() {
     console.log('mounted')
     this.props.onLogOut()
   }

  render() {
    return <Redirect to="login" /> 
  }
}



const mapDispatchToProps = dispatch => {
  return {
    onLogOut: () => dispatch(actions.authLogout())
  }
}

export default connect(null, mapDispatchToProps)(Logout)