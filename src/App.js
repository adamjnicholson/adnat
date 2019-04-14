import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom'

import Layout from './hoc/Layout/Layout'
import SignUp from './containers/Auth/SignUp/SignUp'
import LogIn from './containers/Auth/LogIn/LogIn'
import LogOut from './containers/Auth/Logout/Logout'
import Dashboard from './containers/Dashboard/Dashboard'


class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={LogIn} />
        <Redirect to="/login" />
      </Switch>
    )

    if (this.props.isLoggedIn) {
      routes = (
        <Switch>
          <Route path="/logout" component={LogOut} />
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
    isLoggedIn: state.auth.sessionId
  }
}

export default connect(mapStateToProps)(App)
