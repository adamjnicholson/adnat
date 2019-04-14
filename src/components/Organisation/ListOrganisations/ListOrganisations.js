import React from 'react'
import classes from './ListOrganisations.module.css'

const listOrganisations = props => {
  const orgs = props.organisations.map( org => (
    <div key={org.id} className="card">
      <div className="content">
        <div className="header">{org.name}</div>
      </div>
      <div className="extra content">
        <div className="ui two buttons">
          <div 
              className="ui basic green button"
              onClick={() => props.join(org.id)}>Join</div>
          <div 
            className="ui basic blue button"
            onClick={() => props.edit(org.id)}>Edit</div>
        </div>
      </div>
    </div>
  ))

  return (
     <div>
      <h2>Organisations</h2>
      <div className="ui cards">
        { orgs }
        <div onClick={props.new} className="card">
          <div className={['content', classes.Content].join(' ')}>
            <i className={['plus square icon', classes.Icon].join(' ')}></i>
          </div>
        </div>
      </div>
    </div>
  )
}
 


export default listOrganisations;