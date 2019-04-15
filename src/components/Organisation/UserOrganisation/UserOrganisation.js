import React from 'react'

const userOrganisation = props => (
  <div className="ui fluid card">
    <div className="content">
      <div className="header">{props.org.name}</div>
    </div>
    <div className="extra content">
      <div className="three buttons">
        <div className="ui basic green button" onClick={props.shifts}>View Shifts</div>
        <div className="ui basic blue button" onClick={() => props.edit(props.org.id)}>Edit</div>
        <div className="ui basic red button" onClick={props.leave}>Leave</div>
      </div>
    </div>
  </div>
)

export default userOrganisation;