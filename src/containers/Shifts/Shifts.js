import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from '../../axios'

import PageContent from '../../hoc/Layout/PageContent/PageContent'

class Shifts extends Component {
  state = {
    shifts: [],
    employees: []
  }

  componentDidMount() {
    axios.get('/users')
      .then(res => {
        this.setState({employees: res.data})
      })

    axios.get('/shifts')
      .then(res => {
        this.setState({shifts: res.data})
      })
  }

  render() {
    return (
      <PageContent pageTitle="Shifts">
        <table className="ui celled table">
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Shift Data</th>
              <th>Start Time</th>
              <th>Finsh Time</th>
              <th>Break Length (minutes)</th>
              <th>Hours Worked</th>
              <th>Shift Cost</th>
            </tr>
          </thead>
          <tbody>
            
          </tbody>
        </table>
      </PageContent>
    )
  }
}

const mapStateToProps = state => {
  return {
    orgId: state.user.orgId
  }
}

export default connect(mapStateToProps)(Shifts)