import React from 'react'
import { getDate, getTime } from '../../../shared/utility'

const shift = props => {
  const start = new Date(props.shift.start)
  const finish = new Date(props.shift.finish)
  const shiftLength = (finish - start) / 1000 / 60 / 60 /* -> get seconds -> get minutes -> get hours */
  const worked = shiftLength - (props.shift.breakLength / 60)
  const cost = worked * props.pay
  
  const round = num => {
    return Math.round((num + 0.00001) * 100) / 100
  }

  return (
  <tr>
    <td>{props.user.name}</td> 
    <td>{getDate(new Date(start), 'dmy')}</td>
    <td>{getTime(new Date(start), true)}</td>
    <td>{getTime(new Date(finish), true)}</td>
    <td>{props.shift.breakLength}</td>
    <td>{round(worked)}</td>
    <td>{`$${cost.toFixed(2)}`}</td>
    <td>
      <button className="ui button" onClick={props.edit}>Edit</button>
      <button className="ui button" onClick={props.delete}>Delete</button>
    </td>
  </tr>
  )
}

export default shift;