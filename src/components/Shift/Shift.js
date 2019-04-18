import React from 'react'

const shift = props => {
  const getDate = date => {
    const time = new Date(date)
    return `${time.getDate()}/${("0" + (time.getMonth() + 1)).slice(-2)}/${time.getFullYear()}`
  }

  const getTime = date => {
    const time = new Date(date)
    return `${(time.getHours() + 24) % 12 || 12}: ${time.getMinutes()}${time.getHours() > 11 ? 'am' : 'pm'}`
  }

  // const getHoursWorked()

  return (
  <tr>
    <td>{props.user}</td>
    <td>{getDate(props.start)}</td>
    <td>{getTime(props.start)}</td>
    <td>{getTime(props.finish)}</td>
    <td>{props.breakLength}</td>
    <td></td>
  </tr>
  )
}

export default shift;