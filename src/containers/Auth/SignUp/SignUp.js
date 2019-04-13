import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import * as actions from '../../../store/actions'
import axios from '../../../axios'

import PageContent from '../../../hoc/Layout/PageContent/PageContent'
import Form from '../../../components/Form/Form'

import { changeInputValue, checkValidity } from '../../../shared/utility'

class SignUp extends Component {
  state = {
    inputs: {
      name: {
        label: 'Name',
        inputType: 'input', // input, select, textarea etc
        config: { // input attributes
          type: 'text',
          value: '',
          required: true,
        },
        error: null,
        validation: { // validate.js error object
          input: { // validation needs to be wrapped in input obj
            presence: {
              allowEmpty: false,
              message: '^Please enter a name'
            }
          }
        }
      },
      email: {
        label: 'Email',
        inputType: 'input',
        config: {
          type: 'text',
          value: '',
          required: true,
        },
        error: null,
        validation: {
          input: {
            presence: {
              allowEmpty: false,
              message: '^Please enter a email'
            },
            email: {
              message: '^Please enter a valid email'
            }
          }
        }
      },
      password: {
        label: 'Password',
        inputType: 'input',
        config: {
          type: 'password',
          value: '',
          required: true,
        },
        error: null,
        validation: {
          input: {
            length: {
              minimum: 5,
              tooShort: '^Password needs to have %{count} characters or more'
            }
          }
        }
      },
      passwordConfirmation: {
        label: 'Re-enter Password',
        inputType: 'input',
        config: {
          type: 'password',
          value: '',
          required: true,
        },
        error: null,
        validation: {
          input: {
            equality: {
              attribute: 'password',
              message: '^Passwords do not match',
            }
          }
        }
      }
    },
    submitForm: true, // are all inputs valid?
  }

  // Change the state's input value
  onChangeHandler = (e, input) => {
    const newInputObj = changeInputValue(this.state.inputs, input, e.target.value)
    this.setState({inputs: newInputObj})
  }

  // When the form submits
  onSubmitHandler = e => {
    e.preventDefault()
    this.isFormValuesValid()

    if (this.state.submitForm) {
      this.props.onSignUp(
        this.state.inputs.name.config.value,
        this.state.inputs.email.config.value,
        this.state.inputs.password.config.value,
        this.state.inputs.passwordConfirmation.config.value,
      )
    } 
  }

  // Check if input values are valid
  isFormValuesValid = () => {
    let valid = true
    let newInputsObj = {
      ...this.state.inputs
    }

    // loop through each input and test using validate.js in utility.js
    Object.entries(this.state.inputs).forEach( ([name, input]) => {
      if ( input.validation ) {
        newInputsObj = checkValidity(newInputsObj, name)
        valid = newInputsObj[name].error && valid ? false : valid
      }
    })

    this.setState({
      inputs: newInputsObj,
      submitForm: valid
    })
  }


  render() {
    const redirect = this.props.isLoggedIn ? <Redirect to="/" /> : null
    
    return (
      <PageContent pageTitle="Sign Up">
       
        { redirect }
        <Form
          inputs={this.state.inputs}
          canSubmit={this.state.submitForm}
          loading={this.props.loading}
          error={this.props.error}
          changed={this.onChangeHandler}
          submit={this.onSubmitHandler}
        >
          <button className="ui button">Sign Up</button>
        </Form>
      </PageContent>
    )
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.sessionId,
    loading: state.auth.loading,
    error: state.auth.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSignUp: (name, email, password, passwordConf) => dispatch(actions.auth(name, email, password, passwordConf))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)