import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from '../../axios'

import PageContent from '../../hoc/Layout/PageContent/PageContent'
import Shift from '../../components/Shift/Shift'
import DatePicker from 'react-datepicker'
import TimePicker from 'rc-time-picker'
import { changeInputValue, getDate, getTime } from '../../shared/utility'


import 'rc-time-picker/assets/index.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';


class Shifts extends Component { 
  state = {
    shifts: [],
    employees: [],
    inputs: {
      employee: {
        inputType: 'select',
        options: null,
        config: {
          value: '',
        }
      },
      startDate: {
        inputType: 'date',
        config: {
          value: new Date()
        }
      },
      startTime: {
        inputType: 'time',
        config: {
          minuteStep: 15,
          value: ''
        }
      },
      finishTime: {
        inputType: 'time',
        config: {
          minuteStep: 15,
          value: ''
        }
      },
      breakLength: {
        inputType: 'input',
        config: {
          type: 'number',
          value: ''
        }
      }
    }
  }

  componentDidMount() {
    const inputs = {
      ...this.state.inputs,
      employee: {
        ...this.state.inputs.employee,       
        config: {
          ...this.state.inputs.employee.config
        }
      }
    }
    axios.get('/users')
      .then(res => {
        inputs.employee.options = res.data
        inputs.employee.config.value = res.data[0].id
        this.setState({
          employees: res.data,
          inputs: inputs
        })
      })
      .catch (err => {
        console.log(err.response)
      })

    axios.get('/shifts')
      .then(res => {
        
        this.setState({shifts: res.data})
      })
  }

  onChangeHandler = (e, input, dateObj) => {
    const value = dateObj || e.target.value
    const newInputObj = changeInputValue(this.state.inputs, input, value)
    this.setState({inputs: newInputObj})
  }

  getValue(input) {
    return this.state.inputs[input].config.value
  }

  getFullDate(dateObj, timeObj) {
    return `${getDate(dateObj)} ${getTime(timeObj)}`
  }

  onCreateShiftHandler = e => {
    e.preventDefault()
    const data = {
      userId: this.getValue('employee'),
      start: this.getFullDate(this.getValue('startDate'), this.getValue('startTime')._d),
      finish: this.getFullDate(this.getValue('startDate'), this.getValue('finishTime')._d),
      breakLength: this.getValue('breakLength')
    }

    console.log(data)

    axios.post('/shifts', data)
      .then( res => {
        this.setState({
          shifts: this.state.shifts.concat(res.data)
        })
      })
      .catch( err => {
        console.log(err.response)
      })
  }


  render() {
    const inputs = Object.entries(this.state.inputs).map( ([name, input]) => {
      switch (input.inputType) {
        case 'input':
          return ( 
          <td key={name}><input 
            className="field"
            type={input.config.type} 
            value={input.config.value}
            onChange={ e => this.onChangeHandler(e, name)}
          /></td>
          )
        case 'select':
          return (
            <td key={name}><select
              onChange={ e => this.onChangeHandler(e, name)}
              value={input.config.value}>
              {this.state.inputs.employee.options ? input.options.map(op => <option key={op.id} value={op.id}>{op.name}</option>) : ''}
            </select></td>
          )
        case 'date':
          return (
            <td key={name}><DatePicker
              selected={new Date(input.config.value)}
              onChange={date => this.onChangeHandler(null, name, date)}
           /></td>
          )
        case 'time':
          return (
            <td key={name}><TimePicker
              showSecond={false}
              minuteStep={input.config.minuteStep} 
              onChange={time => this.onChangeHandler(null, name, time)}
            /></td>
          )
        default: return false
      }
    })

    const orderedShifts = this.state.shifts.sort( (a, b) => new Date(a.start) - new Date(b.start))
    const shifts = orderedShifts.map( shift =>   (
      <Shift 
        key={shift.id}
        user={this.state.employees.find( em => em.id === shift.userId)}
        pay={this.props.orgPay}
        shift={shift}
      />
    ))

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
            </tr>
          </thead>
          <tbody>
            {shifts}
            <tr className="ui form">
              { inputs }
              <td colSpan="2">
                <button onClick={ e => this.onCreateShiftHandler(e)} className="ui button">Create Shift</button>
              </td>
            </tr>
          </tbody>
        </table>
      </PageContent>
    )
  }
}

const mapStateToProps = state => {
  return {
    org: state.orgs.organisations.find( org => org.id === state.user.orgId)
  }
}

export default connect(mapStateToProps)(Shifts)