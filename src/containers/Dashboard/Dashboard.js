import React, { Component } from 'react'
import { connect } from 'react-redux'

import PageContent from '../../hoc/Layout/PageContent/PageContent'
import CreateOrganisation from '../../components/Organisation/CreateOrganisation/CreateOrganisation'
import EditOrganisation from '../../components/Organisation/EditOrganisation/EditOrganisation'
import ListOrganisations from '../../components/Organisation/ListOrganisations/ListOrganisations'
import UserOrganisation from '../../components/Organisation/UserOrganisation/UserOrganisation'
import * as actions from '../../store/actions'
import { changeInputValue, isFormValuesValid } from '../../shared/utility'
import classes from './Dashboard.module.css'

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
    edit: {
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
    creating: false,
    editing: false,
    submitForm: true
  }

  onChangeCreateHandler = (e, input) => {
    const newInputObj = changeInputValue(this.state.create, input, e.target.value)
    this.setState({create: newInputObj})
  }

  onChangeEditHandler = (e, input) => {
    const newInputObj = changeInputValue(this.state.edit, input, e.target.value)
    this.setState({edit: newInputObj})
  }

  // When the form submits
  onSubmitCreateHandler = e => {
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

  onSubmitEditHandler = e => {
    e.preventDefault()
    const [newInputs, valid] = isFormValuesValid(this.state.edit)
    this.setState({
      edit: newInputs,
      submitForm: valid
    })

    if (this.state.submitForm) {  
      this.props.onEditOrg(
        this.state.editing,
        this.state.edit.name.config.value,
        this.state.edit.rate.config.value
      )
    }  
  }

  onAddNew = () => {
    this.setState({
      creating: true,
      editing: false
    })
  }

  onEditOrg = id => {
    const org = this.props.organisations.find( org => org.id === id)
    let inputs = changeInputValue(this.state.edit, 'name', org.name)
    inputs = changeInputValue(inputs, 'rate', org.hourlyRate)

    this.setState({
      edit: inputs,
      creating: false,
      editing: id
    })
  }

  onJoinOrg = id => {
    this.props.onJoinOrg(id)
  }

  onLeaveOrg = id => {
    this.props.onLeaveOrg()
  }

 

  render() {
    let modules = null; //TODO ADD SPINNER
    let actions = null
    if (this.props.organisations) {
    
      if (this.state.creating) {
        actions = (
          <CreateOrganisation 
            inputs={this.state.create}
            canSubmit={this.state.canSubmit}
            loading={this.props.createForm.loading}
            error={this.props.createForm.error}
            changed={this.onChangeCreateHandler}
            submit={this.onSubmitCreateHandler}
          />
        )
      } else if (this.state.editing) {
        actions = (
           <EditOrganisation 
            inputs={this.state.edit}
            canSubmit={this.state.canSubmit}
            loading={this.props.editForm.loading}
            error={this.props.editForm.error}
            changed={this.onChangeEditHandler}
            submit={this.onSubmitEditHandler}
          />
         
        )
      }

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
          <ListOrganisations 
            organisations={this.props.organisations}
            edit={this.onEditOrg}
            join={this.onJoinOrg}
            new={this.onAddNew}
          />
        )
      }
    }

    const firstName = this.props.name ? this.props.name.split(' ')[0] : ''
  

    return (
      <PageContent pageTitle={'Hello ' + firstName}>
        <div className={classes.Dashboard}>
          <div className={classes.Modules}>
            { modules }
          </div>
          <div className={classes.Actions}>
            { actions }
          </div>
        </div>
      </PageContent>

    )
  }
}

const mapStateToProps = state => {
  return {
    name: state.user.name,
    createForm: state.orgs.createForm,
    editForm: state.orgs.editForm,
    organisations: state.orgs.organisations,
    userOrg: state.user.orgId
  }  
}

const mapDispatchToProps = dispatch => {
  return {
    onCreateJoinOrg: (name, rate) => dispatch(actions.orgCreateJoin(name, rate)),
    onEditOrg: (id, name, rate) => dispatch(actions.orgEdit(id, name, rate)),
    onJoinOrg: id => dispatch(actions.userJoinOrg(id)),
    onLeaveOrg: () => dispatch(actions.userLeaveOrg())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)