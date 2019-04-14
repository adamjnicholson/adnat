import React from 'react'

const userOrganisation = props => (
  <div>
    <h2>{props.org.name}</h2>
    <button onClick={props.shifts}>View Shifts</button>
    <button onClick={() => props.edit(props.org.id)}>Edit</button>
    <button onClick={props.leave}>Leave</button>
  </div>
)

export default userOrganisation;