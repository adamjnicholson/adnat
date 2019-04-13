import React from 'react'
import Logo from '../../UI/Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './Header.module.css'

const header = () => {

  const innerClasses = ['container', classes.HeaderInner]

  return (
    <header className={classes.Header}>
      <div className={innerClasses.join(' ')}>
        <Logo />
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </header>
  )
}



export default header