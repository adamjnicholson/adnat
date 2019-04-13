import React from 'react'
import { NavLink } from 'react-router-dom'

const navigationItems = props => (
  <ul className="ui secondary menu no-list">
    <li><NavLink className="item" to="/signup">Sign Up</NavLink></li>
    <li><NavLink className="item" to="/login">Log In</NavLink></li>
  </ul>
);

export default navigationItems;