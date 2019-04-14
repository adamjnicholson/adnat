import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Header from '../../components/Navigation/Header/Header'


class Layout extends Component {
  render() {
    return (
       <Fragment>
        <Header isLoggedIn={this.props.isLoggedIn} />
        <main className="container">
          {this.props.children}
        </main>
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.sessionId
  }
}


export default connect(mapStateToProps)(Layout)