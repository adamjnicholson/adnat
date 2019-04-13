import React from 'react'
import Input from './Input/Input'

const Form = props => {
  const inputs = Object.entries(props.inputs).map(([name, input]) => {
    return <Input
      key={name}
      label={input.label}
      type={input.inputType}
      config={input.config}
      error={input.error}
      required={input.required}
      changed={ e => props.changed(e, name)}
    />
  })

  const formClasses = ['ui', 'form'];
  if (props.loading) formClasses.push('loading')
  if (!props.canSubmit || props.error) formClasses.push('error')

  let formError = null;
  if (props.error) {
    formError = (
      <div className="ui error message">
        <p>{props.error}</p>
      </div>
    )
  }

  return (
  <form onSubmit={ e => props.submit(e)} className={formClasses.join(' ')}>
    {inputs}
    {formError}
    {props.children}
  </form>
  )
}

export default Form;