import React from 'react';
import classes from './Logo.module.css'

const logo = () => {
  const logoClasses = ['header', classes.Logo]

  return  <h1 className={logoClasses.join(' ')}>Adnat</h1>
}
 


export default logo;