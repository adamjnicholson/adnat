import React, { Fragment } from 'react'

const pageContent = props => (
  <Fragment>
    <h1 className="header">{props.pageTitle}</h1>
    {props.children}
  </Fragment>
);

export default pageContent;