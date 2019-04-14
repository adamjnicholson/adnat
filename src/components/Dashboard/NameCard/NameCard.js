import React from 'react'
import { Link } from 'react-router-dom'

const nameCard = props => (
  <p>Logged in as {props.name} <Link to="/logout" >Log Out</Link></p>
)

export default nameCard;