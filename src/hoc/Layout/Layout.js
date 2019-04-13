import React, { Fragment } from 'react'
import Header from '../../components/Navigation/Header/Header'

const layout = props => (
  <Fragment>
    <Header />
    <main className="container">
      {props.children}
    </main>
  </Fragment>

);

export default layout