import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import PageContent from '../../hoc/Layout/PageContent/PageContent'
import NameCard from '../../components/Dashboard/NameCard/NameCard'
import CreateOrganisation from '../../components/Organisation/CreateOrganisation/CreateOrganisation'
import ListOrganisations from '../../components/Organisation/ListOrganisations/ListOrganisations'
import UserOrganisation from '../../components/Organisation/UserOrganisation/UserOrganisation'
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

  onEditOrg = id => {
    console.log('edit' + id)
  }

  onJoinOrg = id => {
    this.props.onJoinOrg(id)
  }

  onLeaveOrg = id => {
    this.props.onLeaveOrg()
  }

 

  render() {
    let modules = null; //TODO ADD SPINNER

    if (this.props.organisations) {
      if (this.props.userOrg) {
        modules = (
          <UserOrganisation 
            org={this.props.organisations.find(org => org.id === this.props.userOrg)}
            shifts={this.props.shifts}
            edit={this.onEditOrg}
            leave={this.onLeaveOrg}
          />
        )
      } else {
        modules = (
          <Fragment>
            <ListOrganisations 
              organisations={this.props.organisations}
              edit={this.onEditOrg}
              join={this.onJoinOrg}
            />
    
            <CreateOrganisation 
              inputs={this.state.create}
              canSubmit={this.state.canSubmit}
              loading={this.props.createForm.loading}
              error={this.props.createForm.state}
              changed={this.onChangeHandler}
              submit={this.onSubmitHandler}
            />
          </Fragment>
        )
      }
    }

    return (
      <PageContent pageTitle="Dashboard">
        <NameCard name={this.props.name} />
        { modules }
      </PageContent>

    )
  }
}

const mapStateToProps = state => {
  return {
    name: state.user.name,
    createForm: state.orgs.createForm,
    organisations: state.orgs.organisations,
    userOrg: state.user.orgId
  }  
}

const mapDispatchToProps = dispatch => {
  return {
    onCreateJoinOrg: (name, rate) => dispatch(actions.orgCreateJoin(name, rate)),
    onJoinOrg: id => dispatch(actions.userJoinOrg(id)),
    onLeaveOrg: () => dispatch(actions.userLeaveOrg())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)