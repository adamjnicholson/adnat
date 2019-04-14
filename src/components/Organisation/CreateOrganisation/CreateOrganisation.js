import React from 'react'
import Form from '../../Form/Form'

const createOrganisation = props => (
  <div>
    <h2>Create Organisation</h2>
    <Form
      inputs={props.inputs}
      canSubmit={props.canSubmit}
      loading={props.loading}
      error={props.error}
      changed={props.changed}
      submit={props.submit}
    >
      <button className="ui button">Create and Join</button>
    </Form>
  </div>
);

export default createOrganisation;