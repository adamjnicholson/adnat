import React from 'react'
import ShiftInput from '../ShiftInput/ShiftInput'


const ShiftFields = props => {

  const inputs =  Object.entries(props.inputs).map( ([name, input]) => (
    <td key={name}>
      <ShiftInput
        input={input}
        name={name}
        form={props.form}
        change={props.change}
      />
    </td>
  ))

  return  <tr className="ui form">{inputs}{props.children}</tr>

};

export default ShiftFields;