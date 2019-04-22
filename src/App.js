import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom'

import Layout from './hoc/Layout/Layout'
import SignUp from './containers/Auth/SignUp/SignUp'
import LogIn from './containers/Auth/LogIn/LogIn'
import LogOut from './containers/Auth/Logout/Logout'
import Dashboard from './containers/Dashboard/Dashboard'
import Shifts from './containers/Shifts/Shifts'

import * as actions from './store/actions'


class App extends Component {

  componentDidMount() {
    this.props.onAutoLogin()
  }

  async componentDidUpdate(prevState) {
    if (this.props.sessionId && this.props.sessionId !== prevState.sessionId) {
      await this.props.onOrgsGet()
      await this.props.onUserSet()
      if (this.props.orgId) {
        this.props.onOrgsGetUsers()
        this.props.onShiftsGet()
      }
      // get shifts
    }
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={LogIn} />
        <Redirect to="/login" />
      </Switch>
    )

    if (this.props.sessionId) {
      routes = (
        <Switch>
          <Route path="/logout" component={LogOut} />
          <Route path="/shifts" component={Shifts} />
          <Route path="/" exact component={Dashboard} />
          <Redirect to="/" />
        </Switch>
      )
    }

    return (
      <div className="App">
        <Layout>
          { routes }
        </Layout>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    sessionId: state.auth.sessionId,
    orgId: state.user.orgId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAutoLogin: () => dispatch(actions.authAutoLogin()),
    onOrgsGet: () => dispatch(actions.orgGet()),
    onOrgsGetUsers: () => dispatch(actions.orgGetUsers()),
    onUserSet: () => dispatch(actions.userSet()),
    onShiftsGet: () => dispatch(actions.shiftsGet())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
