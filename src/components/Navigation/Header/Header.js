import React from 'react'
import { NavLink } from 'react-router-dom'
import Logo from '../../UI/Logo/Logo'
import classes from './Header.module.css'

const header = props => {

  const innerClasses = ['container', classes.HeaderInner]
  const navClasses = [classes.Nav]

  let links = (
    <ul className="ui secondary menu no-list">
      <li><NavLink className="item" to="/signup">Sign Up</NavLink></li>
      <li><NavLink className="item" to="/login">Log In</NavLink></li>
    </ul>
  )

  if (props.isLoggedIn  ) {
    navClasses.push(classes.Spread)

    links = (
      <ul className="ui secondary menu no-list">
        <li><NavLink className="item" to="/" exact>Dashboard</NavLink></li>
        <li><NavLink className="item" to="/logout">Log Out</NavLink></li>
      </ul>
    )
  }

  return (
    <header className={classes.Header}>
      <div className={innerClasses.join(' ')}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav className={navClasses.join(' ')}>
          { links }
        </nav>
      </div>
    </header>
  )
}



export default header