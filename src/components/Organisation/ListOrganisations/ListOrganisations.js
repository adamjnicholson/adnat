import React from 'react'

const listOrganisations = props => {
  const orgs = props.organisations.map( org => (
    <li key={org.id}>
      {org.name}
      <button onClick={() => props.edit(org.id)}>Edit</button>
      <button onClick={() => props.join(org.id)}>Join</button>
    </li>
  ))

  return (
     <div>
      <h2>Organisations</h2>
      <ul>
        {orgs}
      </ul>
    </div>
  )
}
 


export default listOrganisations;