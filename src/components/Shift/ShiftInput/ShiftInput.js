import React from 'react'
import DatePicker from 'react-datepicker'
import TimePicker from 'rc-time-picker'

import 'rc-time-picker/assets/index.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const shiftInput = props => {
  const input = props.input
  switch (input.inputType) {
    case 'input':
      return ( 
        <input 
          className="field"
          type={input.config.type} 
          value={input.config[props.form + 'Value']}
          onChange={e => props.change(e, props.form, props.name)}
        />
      )
    case 'select':
      return (
        <select
          onChange={e => props.change(e, props.form, props.name)}
          value={input.config[props.form + 'Value']}>
            {((input.options || []).map(op => <option key={op.id} value={op.id}>{op.name}</option>)) || ''}
        </select>
      )
    case 'date':
      return (
       <DatePicker
          dateFormat="dd-MM-yyy"
          selected={new Date(input.config[props.form + 'Value'])}
          onChange={date => props.change(null, props.form, props.name, date)}
       />
      )
    case 'time':
      return (
       <TimePicker
          showSecond={false}
          minuteStep={input.config.minuteStep}
          defaultValue={input.config[props.form + 'Value']} 
          onChange={time => props.change(null, props.form, props.name, time)}
        />
      )
    default: return false
  }
}

export default shiftInput;