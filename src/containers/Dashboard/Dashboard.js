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
          name: 'create',
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
          name: 'create',
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
          name: 'edit',
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
          name: 'edit',
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

  onChangeHandler = (e, input) => {
    const form = e.target.name
    const newInputObj = changeInputValue(this.state[form], input, e.target.value)
    this.setState({[form]: newInputObj})
  }

  onSubmitHandler(e, form, id) {
    e.preventDefault()
    const [newInputs, valid] = isFormValuesValid(this.state[form])
    const name = newInputs.name.config.value
    const rate = newInputs.rate.config.value

    this.setState({
      [form]: newInputs,
      submitForm: valid
    })

    if (valid) {
     if (form === 'create') this.props.onCreateJoinOrg(name, rate)
     if (form === 'edit') this.props.onEditOrg(id, name, rate)
    }

  }

  onAddNew = () => {
    this.setState({
      creating: true,
      editing: false
    })
  }

  onEditOrg = (id = this.props.userOrg.id) => {
    const org = this.props.organisations.find( org => org.id === id)
    let inputs = changeInputValue(this.state.edit, 'name', org.name)
    inputs = changeInputValue(inputs, 'rate', org.hourlyRate)

    this.setState({
      edit: inputs,
      creating: false,
      editing: id
    })
  }

  onJoinOrg = async id => {
    this.setState({
      creating: false,
      editing: false
    })
    await this.props.onJoinOrg(id)
    this.props.onGetOrgUsers()
  }

  onLeaveOrg = () => {
    this.setState({
      creating: false,
      editing: false
    })
    this.props.onLeaveOrg()
    this.props.onClearOrgUsers()
  }


  onViewShifts = () => {
    this.props.history.push('/shifts')
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
            changed={this.onChangeHandler}
            submit={(e) => this.onSubmitHandler(e, 'create')}
          />
        )
      } else if (this.state.editing) {
        actions = (
           <EditOrganisation 
            inputs={this.state.edit}
            canSubmit={this.state.canSubmit}
            loading={this.props.editForm.loading}
            error={this.props.editForm.error}
            changed={this.onChangeHandler}
            submit={(e) => this.onSubmitHandler(e, 'edit', this.state.editing)}
          />
        )
      }

      if (this.props.userOrg) {
        modules = (
          <UserOrganisation 
            org={this.props.userOrg}
            shifts={this.onViewShifts}
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

const mapStateToProps = state =>{
  return {
    name: state.user.name,
    userOrg: (state.orgs.organisations || []).find( org => org.id === state.user.orgId),
    createForm: state.orgs.createForm,
    editForm: state.orgs.editForm,
    organisations: state.orgs.organisations
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCreateJoinOrg: (name, rate) => dispatch(actions.orgCreateJoin(name, rate)),
    onEditOrg: (id, name, rate) => dispatch(actions.orgEdit(id, name, rate)),
    onJoinOrg: id => dispatch(actions.userJoinOrg(id)),
    onLeaveOrg: () => dispatch(actions.userLeaveOrg()),
    onClearOrgUsers: () => dispatch(actions.orgClearUsers()),
    onGetOrgUsers: () => dispatch(actions.orgGetUsers())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)