import React from 'react'
import { getDate, getTime } from '../../shared/utility'

const shift = props => {
  const start = new Date(props.shift.start)
  const finish = new Date(props.shift.finish)
  const shiftLength = (finish - start) / 1000 / 60 / 60 /* -> get seconds -> get minutes -> get hours */
  const worked = shiftLength - (props.shift.breakLength / 60)
  const cost = worked * props.pay
  
  console.log(props.shift.start)

  const round = num => {
    return Math.round((num + 0.00001) * 100) / 100
  }

  // const getHoursWorked()
  return (
  <tr>
    <td>{props.user.name}</td> 
    <td>{getDate(new Date(start))}</td>
    <td>{getTime(new Date(start))}</td>
    <td>{getTime(new Date(finish))}</td>
    <td>{props.shift.breakLength}</td>
    <td>{round(worked)}</td>
    <td>{`$${round(cost)}`}</td>
  </tr>
  )
}

export default shift;