import validate from 'validate.js'


export const changeInputValue = (allInputs, input, value) => {
  const newInputs =  {
    ...allInputs,
    [input]: {
      ...allInputs[input],
      config: {
        ...allInputs[input].config,
        value: value
      }
    } 
  }

  return newInputs
}

export const checkValidity = ( allInputs, name ) => {
  let errors = null
  const inputsObj = {...allInputs}

  switch(name) {
    case 'passwordConfirmation':
      errors = validate({
          password: inputsObj.password.config.value,
          input: inputsObj[name].config.value
        }, inputsObj[name].validation)
      break;
    default:
      errors = validate( {input: inputsObj[name].config.value }, inputsObj[name].validation)
  }

  inputsObj[name] = {
    ...inputsObj[name],
    error: errors ? errors.input[0] : null
  }

  return inputsObj
}

// Check if input values are valid
export const isFormValuesValid = inputs => {
  let valid = true
  let newInputsObj = {
    ...inputs
  }

  // loop through each input and test using validate.js in utility.js
  Object.entries(inputs).forEach( ([name, input]) => {
    if ( input.validation ) {
      newInputsObj = checkValidity(newInputsObj, name)
      valid = newInputsObj[name].error && valid ? false : valid
    }
  })

  return [newInputsObj, valid]
}
