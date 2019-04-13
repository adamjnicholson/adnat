import React from 'react'

const input = props => {
  const classNames = ['field']
  if (props.config.required) classNames.push('required')

  let error = null
  if (props.error) {
    error = (
      <div className="ui error message">
        <p>{props.error}</p>
      </div>
    )
  }

  return (
    <div className={classNames.join(' ')}>
      <label>{props.label}</label>
      <input 
        {...props.config}
        onChange={props.changed}
      />
      {error}
    </div>
  )  
}

export default input;