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

  async componentDidMount() {
    this.props.onAutoLogin()
  }

  async componentDidUpdate(prevState) {
    if (this.props.sessionId && this.props.sessionId !== prevState.sessionId) {
      await this.props.getAllOrgs()
      await this.props.onUserSet()
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
    name: state.user.name,
    userOrg: (state.orgs.organisations || []).find( org => org.id === state.user.orgId),
    organisations: state.orgs.organisations
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAutoLogin: () => dispatch(actions.authAutoLogin()),
    getAllOrgs: () => dispatch(actions.orgGet()),
    onUserSet: orgs => dispatch(actions.userSet(orgs))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
