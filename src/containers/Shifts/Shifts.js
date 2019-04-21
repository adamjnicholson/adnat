import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../store/actions'
import moment from  'moment'

import PageContent from '../../hoc/Layout/PageContent/PageContent'
import ShiftData from '../../components/Shift/ShiftData/ShiftData'
import ShiftFields from '../../components/Shift/ShiftFields/ShiftFields'

import { getDate, getTime } from '../../shared/utility'
class Shifts extends Component { 
  state = {
    inputs: {
      employee: {
        inputType: 'select',
        options: this.props.orgUsers,
        config: {
          createValue: this.props.orgUsers[0].id,
          editValue: ''
        }
      },
      startDate: {
        inputType: 'date',
        config: {
          createValue: new Date(),
          editValue: ''
        }
      },
      startTime: {
        inputType: 'time',
        config: {
          minuteStep: 15,
          createValue: moment(),
          editValue: ''
        }
      },
      finishTime: {
        inputType: 'time',
        config: {
          minuteStep: 15,
          createValue: moment(),
          editValue: ''
        }
      },
      breakLength: {
        inputType: 'input',
        config: {
          type: 'number',
          createValue: '',
          editValue: ''
        }
      }
    },
    editing: null
  }


  onChangeHandler = (e, form, input, dateObj) => {
    const value = dateObj || e.target.value
  
    const newInputObj = {
      ...this.state.inputs,
      [input]: {
        ...this.state.inputs[input],
        config: {
          ...this.state.inputs[input].config,
          [form + 'Value']: value
        }
      }
    }

    this.setState({inputs: newInputObj})
  }


  getValue(input, form) {
    return this.state.inputs[input].config[form + 'Value']
  }

  getFullDate(dateObj, timeObj) {
    return `${getDate(dateObj)} ${getTime(timeObj)}`
  }

  getShiftData = form => {
    console.log(this.getValue('startTime', form))
    let data =  {
      start: this.getFullDate(this.getValue('startDate', form), this.getValue('startTime', form)._d),
      finish: this.getFullDate(this.getValue('startDate', form), this.getValue('finishTime', form)._d),
      breakLength: this.getValue('breakLength', form)
    }

    if (form === 'create') {
      data.userId = this.getValue('employee', form)
    }
    return data
  }

  onCreateHandler = e => {
    e.preventDefault()
    this.props.onCreateShift(this.getShiftData('create'))
  }

  onUpdateHandler  = id => {
    this.setState({editing: null})
    this.props.onUpdateShift(id, this.getShiftData('edit'))
  }

  onEditHandler = id => {
    const shift = this.props.shifts.find( shift => shift.id === id)
    const inputVals = {
      employee: shift.userId,
      startDate: new Date(shift.start),
      startTime: moment(new Date(shift.start)),
      finishTime: moment(new Date(shift.finish)),
      breakLength: shift.breakLength
    }

    const inputs = Object.entries(this.state.inputs).reduce( (acc, curr) => {
      acc[curr[0]] = {
        ...curr[1],
        config: {
          ...curr[1].config,
          editValue: inputVals[curr[0]]
        }
      }

      return acc
    }, {})

    this.setState({editing: id, inputs: inputs})
  }



  render() {
    const orderedShifts = this.props.shifts.slice().sort( (a, b) => new Date(a.start) - new Date(b.start))
    const shifts = orderedShifts.map( shift => {
      if (this.state.editing === shift.id) {
        return (
          <ShiftFields
            key={shift.id}
            inputs={this.state.inputs}
            form="edit"
            change={this.onChangeHandler}>
            <td colSpan="3">
              <button onClick={ () => this.onUpdateHandler(shift.id)} className="ui button">Save</button>
            </td>
          </ShiftFields>
        )
      }
      return (
        <ShiftData 
          key={shift.id}
          user={this.props.orgUsers.find( em => em.id === shift.userId)}
          pay={this.props.userOrg.hourlyRate}
          shift={shift}
          edit={() => this.onEditHandler(shift.id)}
          delete={() => this.props.onDeleteShift(shift.id)}
        />
      )
    })

    return (
      <PageContent pageTitle="Shifts">
        <table className="ui celled table">
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Shift Date</th>
              <th>Start Time</th>
              <th>Finsh Time</th>
              <th>Break Length (minutes)</th>
              <th>Hours Worked</th>
              <th>Shift Cost</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>

            {shifts}
            <ShiftFields
              inputs={this.state.inputs}
              form="create"
              change={this.onChangeHandler}>
              <td colSpan="3">
                <button onClick={ e => this.onCreateHandler(e)} className="ui button">Create Shift</button>
              </td>
            </ShiftFields>

          </tbody>
        </table>
      </PageContent>
    )
  }
}

const mapStateToProps = state => {
  return {
    userOrg: state.orgs.organisations.find( org => org.id === state.user.orgId),
    shifts: state.shifts.shifts,
    orgUsers: state.orgs.orgUsers
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCreateShift: shift => dispatch(actions.shiftsCreate(shift)),
    onDeleteShift: id => dispatch(actions.shiftsDelete(id)),
    onUpdateShift: (id, shift) => dispatch(actions.shiftsUpdate(id, shift))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Shifts)

