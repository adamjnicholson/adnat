import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import Layout from './hoc/Layout/Layout'
import SignUp from './containers/Auth/SignUp/SignUp'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Route path="/signup" component={SignUp} />
        </Layout>
      </div>
    )
  }
}

export default App
