import React, { Component } from 'react'
import { connect } from 'react-redux'

import PageContent from '../../hoc/Layout/PageContent/PageContent'
import NameCard from '../../components/Dashboard/NameCard/NameCard'
import CreateOrganisation from '../../components/Organisation/CreateOrganisation/CreateOrganisation'
import * as actions from '../../store/actions'
import { changeInputValue, isFormValuesValid } from '../../shared/utility'

class Dashboard extends Component {
  
  state = {
    create: {
      name: {
        label: 'Name',
        inputType: 'input',
        config: {
          type: 'text',
          value: '',
          required: true
        },
        error: null,
      },
      rate: {
        label: 'Hourly Rate: $',
        inputType: 'input',
        config: {
          type: 'text',
          value: '',
          required: true
        },
        error: null,
      }
    },
    submitForm: true
  }

  onChangeHandler = (e, input) => {
    const newInputObj = changeInputValue(this.state.create, input, e.target.value)
    this.setState({create: newInputObj})
  }

  // When the form submits
  onSubmitHandler = e => {
    e.preventDefault()
    const [newInputs, valid] = isFormValuesValid(this.state.create)
    this.setState({
      create: newInputs,
      submitForm: valid
    })

    if (this.state.submitForm) {  
      this.props.onCreateJoinOrg(
        this.state.create.name.config.value,
        this.state.create.rate.config.value
      )
    }  
  }
 

  render() {
    return (
      <PageContent pageTitle="Dashboard">
        <NameCard name={this.props.name} />
      
        <CreateOrganisation 
          inputs={this.state.create}
          canSubmit={this.state.canSubmit}
          loading={this.props.createForm.loading}
          error={this.props.createForm.state}
          changed={this.onChangeHandler}
          submit={this.onSubmitHandler}
        />
      
        
      </PageContent>

    )
  }
}

const mapStateToProps = state => {
  return {
    name: state.auth.name,
    createForm: state.orgs.createForm
  }  
}

const mapDispatchToProps = dispatch => {
  return {
    onCreateJoinOrg: (name, rate) => dispatch(actions.orgCreateJoin(name, rate))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)